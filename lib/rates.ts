/**
 * Indicative rate model.
 *
 * Rates are expressed as the value of one unit of each currency in a common
 * base (USD). Every pair is derived from that table, which keeps cross rates
 * internally consistent — USDT→EUR and EUR→USDT are always exact inverses.
 *
 * The values shipped here are a static demonstration table. `fetchRates`
 * already speaks to an endpoint when one is configured, so moving to live
 * desk pricing is a matter of setting NEXT_PUBLIC_RATES_ENDPOINT and
 * returning the same shape — no UI change is required.
 *
 * Nothing in this module is a quote. The UI must always label these values
 * as indicative.
 */

export const CURRENCIES = ['USDT', 'EUR', 'USD'] as const;

export type CurrencyCode = (typeof CURRENCIES)[number];

/** Currency pairs the desk quotes as primary business. */
export const PRIMARY_PAIRS: ReadonlyArray<readonly [CurrencyCode, CurrencyCode]> = [
  ['USDT', 'EUR'],
  ['USDT', 'USD'],
  ['EUR', 'USD'],
];

export type RateTable = {
  /** Value of one unit of the currency, expressed in the base unit (USD). */
  base: Record<CurrencyCode, number>;
  /** Where the numbers came from. The UI stays honest about this. */
  source: 'static' | 'desk';
};

/**
 * Static fallback. Chosen so that 1 USDT = 0.9800 USD, matching the
 * indicative example used across the site.
 */
export const FALLBACK_RATES: RateTable = {
  base: {
    USD: 1,
    USDT: 0.98,
    EUR: 1.083,
  },
  source: 'static',
};

export function isCurrency(value: string): value is CurrencyCode {
  return (CURRENCIES as readonly string[]).includes(value);
}

/** Units of `to` received for one unit of `from`. */
export function getRate(
  table: RateTable,
  from: CurrencyCode,
  to: CurrencyCode,
): number {
  if (from === to) return 1;
  return table.base[from] / table.base[to];
}

export function convert(
  table: RateTable,
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  return amount * getRate(table, from, to);
}

/** The other two currencies, in the canonical display order. */
export function otherCurrencies(code: CurrencyCode): CurrencyCode[] {
  return CURRENCIES.filter((c) => c !== code);
}

/**
 * Accepts an unknown payload and returns a usable table, or null if the
 * payload does not describe every supported currency with a positive number.
 * Keeping this strict means a malformed response degrades to the static
 * table instead of rendering a nonsensical rate.
 */
export function normalizeRates(payload: unknown): RateTable | null {
  if (typeof payload !== 'object' || payload === null) return null;
  const raw = (payload as { base?: unknown }).base;
  if (typeof raw !== 'object' || raw === null) return null;

  const record = raw as Record<string, unknown>;
  const base = {} as Record<CurrencyCode, number>;

  for (const code of CURRENCIES) {
    const value = record[code];
    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
      return null;
    }
    base[code] = value;
  }

  return { base, source: 'desk' };
}

/**
 * Reads indicative rates. Falls back to the static table whenever no endpoint
 * is configured, the request fails, or the payload is not usable — the widget
 * must never render an empty or misleading rate.
 */
export async function fetchRates(signal?: AbortSignal): Promise<RateTable> {
  const endpoint = process.env.NEXT_PUBLIC_RATES_ENDPOINT;
  if (!endpoint) return FALLBACK_RATES;

  try {
    const response = await fetch(endpoint, {
      signal,
      headers: { accept: 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) return FALLBACK_RATES;
    return normalizeRates(await response.json()) ?? FALLBACK_RATES;
  } catch {
    return FALLBACK_RATES;
  }
}
