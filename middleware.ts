import { NextResponse, type NextRequest } from 'next/server';
import { LOCALE_COOKIE, defaultLocale, isLocale, locales } from '@/lib/i18n/config';

/**
 * Sends locale-less requests to a language.
 *
 * An explicit choice, stored in a cookie by the language switcher, always
 * wins. Otherwise the Accept-Language header decides, and English is the
 * fallback. Requests that already carry a locale segment pass straight
 * through.
 */
export const config = {
  matcher: [
    // Everything except Next internals, the API, and files with an extension.
    '/((?!_next/|api/|.*\.).*)',
  ],
};

function negotiate(request: NextRequest) {
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  if (remembered && isLocale(remembered)) return remembered;

  const header = request.headers.get('accept-language');
  if (!header) return defaultLocale;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, quality] = part.trim().split(';q=');
      const weight = quality === undefined ? 1 : Number.parseFloat(quality);
      return { tag: (tag ?? '').toLowerCase(), weight };
    })
    .filter((entry) => entry.tag.length > 0 && Number.isFinite(entry.weight))
    .sort((a, b) => b.weight - a.weight);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0] ?? '';
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const alreadyLocalised = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (alreadyLocalised) return NextResponse.next();

  const locale = negotiate(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}
