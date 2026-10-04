import { NextResponse } from 'next/server';
import { consentRequiredFor } from '@/lib/consent';

/**
 * Tells the client whether this visitor must be asked before anything is
 * loaded. Kept as a tiny endpoint rather than read in the layout on purpose:
 * calling headers() there would make every page dynamic and throw away the
 * static rendering the whole site depends on.
 *
 * Vercel sets x-vercel-ip-country on every request. Locally it is absent,
 * which reads as "not required" — set the header by hand to test the banner.
 */
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export function GET(request: Request): NextResponse {
  const country = request.headers.get('x-vercel-ip-country');

  return NextResponse.json(
    { country, consentRequired: consentRequiredFor(country) },
    { headers: { 'cache-control': 'private, no-store' } },
  );
}
