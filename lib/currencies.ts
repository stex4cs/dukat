/**
 * The instruments the desk works with.
 *
 * There is deliberately no rate model here. Pricing is quoted by the desk per
 * transaction and is never displayed on the site, so there is nothing to
 * fetch, cache or fall out of date.
 */
export const CURRENCIES = ['USDT', 'EUR', 'USD'] as const;

export type CurrencyCode = (typeof CURRENCIES)[number];

export function isCurrency(value: string): value is CurrencyCode {
  return (CURRENCIES as readonly string[]).includes(value);
}

/** The other two currencies, in the canonical display order. */
export function otherCurrencies(code: CurrencyCode): CurrencyCode[] {
  return CURRENCIES.filter((currency) => currency !== code);
}
