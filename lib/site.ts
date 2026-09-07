import { locales, localeMeta, type Locale } from './i18n/config';

/**
 * Canonical origin for hreflang alternates, the sitemap, robots and Open
 * Graph tags.
 *
 * Defaults to the live domain so a fresh deployment is already correct.
 * NEXT_PUBLIC_SITE_URL overrides it — useful for a staging origin.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dukatdesk.com'
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
