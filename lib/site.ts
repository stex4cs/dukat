import { locales, localeMeta, type Locale } from './i18n/config';

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in the deployment environment —
 * hreflang alternates, the sitemap and Open Graph tags all derive from it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dukat.example'
).replace(/\/$/, '');

export function canonicalFor(locale: Locale, path = ''): string {
  return `${SITE_URL}/${locale}${path}`;
}

/** hreflang map for a given path, including x-default. */
export function alternatesFor(path = ''): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeMeta[locale].htmlLang] = canonicalFor(locale, path);
  }
  languages['x-default'] = canonicalFor('en', path);
  return languages;
}
