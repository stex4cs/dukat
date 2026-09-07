import { NextResponse } from 'next/server';
import { parseQuoteRequest } from '@/lib/quote';

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

export async function POST(request: Request): Promise<NextResponse> {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const client = forwarded.split(',')[0]?.trim() || 'unknown';

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

  // TO BE PROVIDED: forward `quote` to the desk here.

  return NextResponse.json({ ok: true }, { status: 202 });
}
