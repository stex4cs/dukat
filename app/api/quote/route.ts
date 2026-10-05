import { NextResponse } from 'next/server';
import { parseQuoteRequest } from '@/lib/quote';
import { isTelegramConfigured, notifyTelegram } from '@/lib/notify-telegram';
import { CONSENT_COOKIE } from '@/lib/consent';
import { hashedLocation, isCapiConfigured, sendMetaEvent } from '@/lib/meta';

/**
 * Receives private quote enquiries from the site.
 *
 * What it does today: validates the payload, rejects obvious spam and records
 * the enquiry in the server log so nothing is silently lost.
 *
 * TO BE PROVIDED — delivery. Forward the validated `request` to wherever the
 * desk actually works: a mailbox, a CRM, a Telegram bot, a ticket queue.
 * Until that is wired up, enquiries exist only in the server log, so do not
 * take this site live without completing it.
 *
 * Note on data: the payload deliberately contains no identity documents,
 * account numbers or payment credentials. Keep it that way — anything more
 * sensitive belongs in the desk's own onboarding process, not in a public
 * web form.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Coarse in-memory throttle. It only protects a single running instance and
 * resets on deploy — replace with a shared store (Redis, Upstash, a WAF rule)
 * before relying on it in production.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

/**
 * Reports the enquiry to Meta as a Lead.
 *
 * It carries the city and country the visitor chose, hashed — nothing else.
 * The name, the contact detail, the amount and the message stay with the desk;
 * they are the reason someone uses a private desk rather than a form.
 *
 * Skipped entirely where tracking was declined, and where the browser sent no
 * event id, which is how it says the visitor is not being tracked.
 */
async function reportLead(
  quote: ReturnType<typeof parseQuoteRequest> & object,
  request: Request,
  cookies: string,
): Promise<void> {
  if (!quote.eventId || !isCapiConfigured()) return;
  if (new RegExp(`${CONSENT_COOKIE}=denied`).test(cookies)) return;

  const read = (name: string) =>
    cookies.match(new RegExp(`(?:^|; )${name}=([^;]+)`))?.[1] ?? null;

  await sendMetaEvent(
    {
      eventName: 'Lead',
      eventId: quote.eventId,
      eventSourceUrl: request.headers.get('referer') ?? '',
    },
    {
      clientIp: (request.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || null,
      userAgent: request.headers.get('user-agent'),
      fbp: read('_fbp'),
      fbc: read('_fbc'),
    },
    hashedLocation(quote.city, quote.country),
  );
}

export async function POST(request: Request): Promise<NextResponse> {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const client = forwarded.split(',')[0]?.trim() || 'unknown';
  const cookies = request.headers.get('cookie') ?? '';

  if (rateLimited(client)) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: a real visitor never fills a field they cannot see.
  if (
    typeof payload === 'object' &&
    payload !== null &&
    typeof (payload as { company?: unknown }).company === 'string' &&
    (payload as { company: string }).company.length > 0
  ) {
    // Answer as if accepted so automated submitters learn nothing.
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const quote = parseQuoteRequest(payload);
  if (!quote) {
    return NextResponse.json({ ok: false, error: 'invalid_request' }, { status: 400 });
  }

  // Logged before delivery is attempted, so an enquiry is recoverable from
  // the platform logs even if Telegram is unreachable.
  console.info(
    '[dukat] quote request',
    JSON.stringify({
      receivedAt: new Date().toISOString(),
      locale: quote.locale,
      pair: `${quote.have}->${quote.want}`,
      amount: quote.amount,
      method: quote.method,
    }),
  );

  if (!isTelegramConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      console.error(
        '[dukat] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set — the ' +
          'enquiry was not delivered. Set them in the deployment environment.',
      );
      return NextResponse.json(
        { ok: false, error: 'delivery_unavailable' },
        { status: 503 },
      );
    }
    console.warn('[dukat] Telegram not configured; enquiry logged only.');
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  // The desk notification decides the response. The Lead event is
  // best-effort and runs alongside it, so a slow advertising API never delays
  // the person waiting on the form.
  const [delivered] = await Promise.all([
    notifyTelegram(quote),
    reportLead(quote, request, cookies),
  ]);

  if (!delivered) {
    return NextResponse.json(
      { ok: false, error: 'delivery_failed' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 202 });
}
