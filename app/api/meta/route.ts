import { NextResponse } from 'next/server';
import { CONSENT_COOKIE } from '@/lib/consent';
import { isCapiConfigured, sendMetaEvent } from '@/lib/meta';

/**
 * Relays a browser event to the Conversions API, adding the things only the
 * server sees: the visitor's IP and user agent.
 *
 * The client already refuses to call this without consent. The cookie is
 * checked here as well, so a refusal holds even if something calls the
 * endpoint directly.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_EVENTS = new Set(['PageView', 'Lead', 'Contact']);

export async function POST(request: Request): Promise<NextResponse> {
  // Nothing to do, and nothing to say about it: 204 carries no body.
  if (!isCapiConfigured()) {
    return new NextResponse(null, { status: 204 });
  }

  const cookies = request.headers.get('cookie') ?? '';
  if (new RegExp(`${CONSENT_COOKIE}=denied`).test(cookies)) {
    return new NextResponse(null, { status: 204 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { eventName, eventId, eventSourceUrl } = (body ?? {}) as Record<string, unknown>;
  if (
    typeof eventName !== 'string' ||
    !ALLOWED_EVENTS.has(eventName) ||
    typeof eventId !== 'string' ||
    typeof eventSourceUrl !== 'string'
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const read = (name: string) =>
    cookies.match(new RegExp(`(?:^|; )${name}=([^;]+)`))?.[1] ?? null;

  await sendMetaEvent(
    { eventName, eventId, eventSourceUrl: eventSourceUrl.slice(0, 500) },
    {
      clientIp: (request.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || null,
      userAgent: request.headers.get('user-agent'),
      fbp: read('_fbp'),
      fbc: read('_fbc'),
    },
  );

  return NextResponse.json({ ok: true }, { status: 202 });
}
