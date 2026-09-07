/**
 * Locale configuration.
 *
 * The site is served from /{locale}. Adding a language means adding a code
 * here plus a dictionary in ./dictionaries — nothing else in the UI layer
 * needs to change.
 */
export const locales = ['en', 'sr', 'ru', 'de'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export type LocaleMeta = {
  /** Two-letter label used in the switcher. */
  short: string;
  /** Endonym, shown next to the label. */
  native: string;
  /** Value for the <html lang> attribute and hreflang. */
  htmlLang: string;
  /** BCP 47 tag handed to Intl for number and currency formatting. */
  intl: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { short: 'EN', native: 'English', htmlLang: 'en', intl: 'en-US' },
  sr: { short: 'SR', native: 'Srpski', htmlLang: 'sr-Latn', intl: 'sr-Latn-RS' },
  ru: { short: 'RU', native: 'Русский', htmlLang: 'ru', intl: 'ru-RU' },
  de: { short: 'DE', native: 'Deutsch', htmlLang: 'de', intl: 'de-DE' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Cookie remembering an explicit language choice, honoured by the middleware. */
export const LOCALE_COOKIE = 'dukat_locale';
