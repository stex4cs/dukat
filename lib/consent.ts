/**
 * Cookie consent.
 *
 * Google Analytics and the Meta Pixel are loaded only after the visitor
 * accepts. Nothing is requested from Google or Meta before that — not the
 * script, not a pixel, nothing. Declaring trackers in a privacy notice is not
 * enough under the ePrivacy Directive: consent has to come first, and loading
 * before consent is the part that actually gets enforced.
 *
 * Reject is presented as prominently as Accept. An "Accept" button that is
 * easier to reach than its refusal is itself the violation regulators have
 * fined over.
 */
export const CONSENT_COOKIE = 'dukat_consent';

export type ConsentState = 'granted' | 'denied';

/** Six months, after which the question is asked again. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 182;

export function readConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`),
  );
  return (match?.[1] as ConsentState | undefined) ?? null;
}

export function writeConsent(state: ConsentState): void {
  document.cookie = `${CONSENT_COOKIE}=${state};path=/;max-age=${MAX_AGE_SECONDS};samesite=lax`;
}

export function clearConsent(): void {
  document.cookie = `${CONSENT_COOKIE}=;path=/;max-age=0;samesite=lax`;
}

/**
 * Measurement ids. Both are public by nature — they appear in the page source
 * of every site that uses them — so the Pixel id is defaulted here and the
 * env var only exists to switch accounts without a code change. An empty id
 * means that tracker is never loaded at all.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-P8J3RMJZ3X';

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '1648076870178255';

/**
 * Where consent is legally required before anything is loaded.
 *
 * The EEA plus the UK and Switzerland. Not Germany alone: Austria, Italy,
 * Spain and Croatia sit in the desk's own country list and are under the same
 * rule, and the obligation follows the visitor's location rather than the
 * language they happen to be reading.
 *
 * Serbia's own ZZPL asks for much the same thing. It is left out here as a
 * deliberate, reversible decision — add 'RS' to this list to cover it.
 */
export const CONSENT_REQUIRED_COUNTRIES = new Set([
  // EU
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE',
  // EEA
  'IS', 'LI', 'NO',
  // Equivalent regimes
  'GB', 'CH',
]);

export function consentRequiredFor(country: string | null): boolean {
  if (!country) return false;
  return CONSENT_REQUIRED_COUNTRIES.has(country.toUpperCase());
}

/**
 * Whether the trackers may load.
 *
 * An explicit refusal is honoured everywhere, including where no banner was
 * ever shown — the footer lets anyone opt out.
 */
export function mayLoadTrackers(
  consent: ConsentState | null,
  required: boolean,
): boolean {
  if (consent === 'denied') return false;
  if (consent === 'granted') return true;
  return !required;
}
