import type { Locale } from './i18n/config';
import { localeMeta } from './i18n/config';

/**
 * Locale-aware number handling for the quote widget.
 *
 * Amounts are displayed with the visitor's own grouping and decimal marks
 * (100,000 / 100.000 / 100 000). Parsing uses the same marks, so a value can
 * round-trip through the input without ambiguity: only the locale's decimal
 * separator starts a fractional part, every other non-digit is discarded.
 */

const formatterCache = new Map<string, Intl.NumberFormat>();

function formatter(tag: string, options: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = tag + JSON.stringify(options);
  let cached = formatterCache.get(key);
  if (!cached) {
    cached = new Intl.NumberFormat(tag, options);
    formatterCache.set(key, cached);
  }
  return cached;
}

export function intlTag(locale: Locale): string {
  return localeMeta[locale].intl;
}

export type Separators = { group: string; decimal: string };

const separatorCache = new Map<string, Separators>();

export function separatorsFor(locale: Locale): Separators {
  const tag = intlTag(locale);
  let cached = separatorCache.get(tag);
  if (!cached) {
    const parts = formatter(tag, {}).formatToParts(12345.6);
    cached = {
      group: parts.find((p) => p.type === 'group')?.value ?? ',',
      decimal: parts.find((p) => p.type === 'decimal')?.value ?? '.',
    };
    separatorCache.set(tag, cached);
  }
  return cached;
}

/** Digits kept in the integer part — well inside safe-integer territory. */
const MAX_INTEGER_DIGITS = 15;
const MAX_FRACTION_DIGITS = 2;

type Split = { integer: string; fraction: string | null };

/**
 * Reduces free typing to an integer part and, if the visitor typed the
 * locale's decimal mark, a fractional part. The fraction is `null` when no
 * decimal mark was typed, which lets the caller keep a trailing separator
 * visible while the visitor is mid-entry.
 */
function splitInput(raw: string, locale: Locale): Split {
  const { decimal } = separatorsFor(locale);
  let integer = '';
  let fraction: string | null = null;

  for (const char of raw) {
    if (char >= '0' && char <= '9') {
      if (fraction === null) {
        if (integer.length < MAX_INTEGER_DIGITS) integer += char;
      } else if (fraction.length < MAX_FRACTION_DIGITS) {
        fraction += char;
      }
      continue;
    }
    // A decimal mark only counts once, and only after at least one digit.
    if (char === decimal && fraction === null && integer.length > 0) {
      fraction = '';
    }
  }

  return { integer, fraction };
}

/** Formats what the visitor typed, preserving an in-progress decimal mark. */
export function formatAmountInput(raw: string, locale: Locale): string {
  const { integer, fraction } = splitInput(raw, locale);
  if (integer === '') return '';

  const { decimal } = separatorsFor(locale);
  const grouped = formatter(intlTag(locale), {
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(Number(integer));

  if (fraction === null) return grouped;
  return grouped + decimal + fraction;
}

/** Returns the numeric value of an input string, or 0 when it is empty. */
export function parseAmountInput(raw: string, locale: Locale): number {
  const { integer, fraction } = splitInput(raw, locale);
  if (integer === '') return 0;
  const value = Number(integer + '.' + (fraction ?? '0'));
  return Number.isFinite(value) ? value : 0;
}

/** Display formatting for a settled amount, e.g. 98,000.00 */
export function formatAmount(
  value: number,
  locale: Locale,
  fractionDigits = 2,
): string {
  return formatter(intlTag(locale), {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

/** Compact form used for large figures inside dense UI. */
export function formatInteger(value: number, locale: Locale): string {
  return formatAmount(value, locale, 0);
}

/**
 * Renders a numeric amount as the string an amount input expects, using the
 * locale's own separators so it can be parsed straight back.
 */
export function amountToInput(value: number, locale: Locale): string {
  if (!Number.isFinite(value) || value <= 0) return '';
  return formatAmount(value, locale, Number.isInteger(value) ? 0 : 2);
}
