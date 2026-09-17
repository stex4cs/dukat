import type { Locale } from './i18n/config';
import { locales, localeMeta } from './i18n/config';
import type { Dictionary } from './i18n/dictionaries/en';
import { CASH_CITIES_SCHEMA } from './landing';
import { TELEGRAM_URL } from './telegram';
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from './whatsapp';
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
    sameAs: [TELEGRAM_URL, WHATSAPP_URL],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        url: TELEGRAM_URL,
        telephone: WHATSAPP_DISPLAY,
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
export function faqSchemaFrom(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function faqSchema(t: Dictionary) {
  return faqSchemaFrom(t.faq.items);
}

/**
 * Marks a landing page as a service with the cities it covers.
 *
 * Service with areaServed rather than LocalBusiness: LocalBusiness expects a
 * street address and opening hours, and claiming a storefront the desk does
 * not have would be worse than the weaker markup.
 */
export function serviceSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    serviceType: 'Over-the-counter digital asset exchange',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: CASH_CITIES_SCHEMA.map((city) => ({ '@type': 'City', name: city })),
    availableChannel: [
      { '@type': 'ServiceChannel', serviceUrl: TELEGRAM_URL },
      { '@type': 'ServiceChannel', serviceUrl: WHATSAPP_URL },
    ],
  };
}

/**
 * Serialises JSON-LD for embedding. The `<` escape stops a string in the
 * data from being able to close the script tag early.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\u003c');
}
