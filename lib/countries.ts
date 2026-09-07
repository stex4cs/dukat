/**
 * Markets the desk works with.
 *
 * Codes are stored and sent to the desk; the visible label is translated per
 * locale. A request from the Russian page and one from the German page then
 * arrive describing the same market in the same words.
 *
 * AE is labelled "Dubai" rather than "United Arab Emirates" because that is
 * how the market refers to itself. Change the label in the dictionaries if
 * the formal name is preferred — the code stays the same.
 */
export const COUNTRIES = [
  'RS',
  'HR',
  'ME',
  'BA',
  'AE',
  'IT',
  'ES',
  'DE',
  'AT',
  'CN',
  'OTHER',
] as const;

export type CountryCode = (typeof COUNTRIES)[number];

export function isCountry(value: string): value is CountryCode {
  return (COUNTRIES as readonly string[]).includes(value);
}

/** Names used in the desk notification, independent of the visitor's language. */
export const COUNTRY_NAMES_EN: Record<CountryCode, string> = {
  RS: 'Serbia',
  HR: 'Croatia',
  ME: 'Montenegro',
  BA: 'Bosnia and Herzegovina',
  AE: 'Dubai',
  IT: 'Italy',
  ES: 'Spain',
  DE: 'Germany',
  AT: 'Austria',
  CN: 'China',
  OTHER: 'Other',
};
