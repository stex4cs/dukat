import type { Locale } from './i18n/config';
import { locales, localeMeta } from './i18n/config';
import type { Dictionary } from './i18n/dictionaries/en';
import { TELEGRAM_URL } from './telegram';
import { SITE_URL, canonicalFor } from './site';

/**
 * JSON-LD for the desk.
 *
 * Only facts the site already states: the name, the languages it is served
 * in, and the one contact channel that exists. No address, no founding date,
 * no ratings, no claims about regulation — schema.org is a place search
 * engines take at face value, so an invention here is worse than an omission.
 */
export function organizationSchema(locale: Locale, t: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'DUKAT',
    alternateName: 'DUKAT Private Desk',
    url: canonicalFor(locale),
    logo: `${SITE_URL}/favicon.svg`,
    description: t.meta.description,
    sameAs: [TELEGRAM_URL],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        url: TELEGRAM_URL,
        availableLanguage: locales.map((code) => localeMeta[code].htmlLang),
      },
    ],
  };
}

/**
 * The FAQ, marked up as it appears on the page. Every question and answer
 * here is visible to a visitor — marking up hidden content is a guidelines
 * violation, and the accordion renders all of it into the DOM.
 */
export function faqSchema(t: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/**
 * Serialises JSON-LD for embedding. The `<` escape stops a string in the
 * data from being able to close the script tag early.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\u003c');
}
