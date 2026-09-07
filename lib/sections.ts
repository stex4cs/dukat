/**
 * Anchor identifiers.
 *
 * Section ids are language-independent so that a link works across every
 * locale and dictionaries only ever carry the visible label. Order here is
 * the order used by the header and the footer.
 */
export const SECTION = {
  top: 'top',
  privateDesk: 'private-desk',
  howItWorks: 'how-it-works',
  currencies: 'currencies',
  quote: 'quote',
  about: 'about',
  faq: 'faq',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION)[keyof typeof SECTION];

/** Targets for the five primary navigation labels, in order. */
export const NAV_TARGETS: SectionId[] = [
  SECTION.privateDesk,
  SECTION.howItWorks,
  SECTION.currencies,
  SECTION.about,
  SECTION.faq,
];

/** Targets for the five footer navigation labels, in order. */
export const FOOTER_NAV_TARGETS: SectionId[] = [
  SECTION.privateDesk,
  SECTION.currencies,
  SECTION.howItWorks,
  SECTION.faq,
  SECTION.quote,
];

/** Legal document slugs. Each resolves to /{locale}/legal/{slug}. */
export const LEGAL_DOCS = ['terms', 'privacy', 'compliance'] as const;

export type LegalDoc = (typeof LEGAL_DOCS)[number];
