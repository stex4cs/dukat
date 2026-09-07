import { CURRENCIES, type CurrencyCode } from './currencies';

/**
 * The private quote request.
 *
 * This is an enquiry, not an order. Nothing here creates, prices or executes
 * a transaction: the payload reaches the desk and a representative replies.
 *
 * Only what the desk needs to open a conversation is collected. No identity
 * documents, account numbers, wallet addresses or payment credentials are
 * requested at this stage, and none should be added to this type without a
 * corresponding review of how the endpoint stores them.
 */

export const CONTACT_METHODS = ['telegram', 'whatsapp', 'email'] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type QuoteRequest = {
  have: CurrencyCode;
  want: CurrencyCode;
  amount: number;
  name: string;
  method: ContactMethod;
  contact: string;
  message?: string;
  /** Language the request was written in, so the desk can reply in kind. */
  locale: string;
};

export type QuoteResponse = { ok: true } | { ok: false; error: string };

/**
 * Defaults to the bundled route handler in app/api/quote. Point
 * NEXT_PUBLIC_QUOTE_ENDPOINT at a CRM, form service or desk inbox to
 * deliver requests somewhere else.
 */
export const QUOTE_ENDPOINT =
  process.env.NEXT_PUBLIC_QUOTE_ENDPOINT || '/api/quote';

export function isEmail(value: string): boolean {
  // Deliberately permissive: the desk confirms the address by replying to it.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isContactMethod(value: string): value is ContactMethod {
  return (CONTACT_METHODS as readonly string[]).includes(value);
}

/** Server-side shape check, shared by the route handler. */
export function parseQuoteRequest(payload: unknown): QuoteRequest | null {
  if (typeof payload !== 'object' || payload === null) return null;
  const body = payload as Record<string, unknown>;

  const have = body.have;
  const want = body.want;
  const amount = body.amount;
  const name = body.name;
  const method = body.method;
  const contact = body.contact;

  const currencies = CURRENCIES as readonly string[];
  if (typeof have !== 'string' || !currencies.includes(have)) return null;
  if (typeof want !== 'string' || !currencies.includes(want)) return null;
  if (have === want) return null;
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
    return null;
  }
  if (typeof name !== 'string' || name.trim().length === 0) return null;
  if (typeof method !== 'string' || !isContactMethod(method)) return null;
  if (typeof contact !== 'string' || contact.trim().length === 0) return null;
  if (method === 'email' && !isEmail(contact)) return null;

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const locale = typeof body.locale === 'string' ? body.locale : 'en';

  return {
    have: have as CurrencyCode,
    want: want as CurrencyCode,
    amount,
    name: name.trim().slice(0, 120),
    method,
    contact: contact.trim().slice(0, 160),
    message: message ? message.slice(0, 2000) : undefined,
    locale: locale.slice(0, 12),
  };
}

export async function submitQuoteRequest(
  request: QuoteRequest,
  options: { signal?: AbortSignal; honeypot?: string } = {},
): Promise<QuoteResponse> {
  try {
    const response = await fetch(QUOTE_ENDPOINT, {
      method: 'POST',
      signal: options.signal,
      headers: { 'content-type': 'application/json' },
      // `company` is the honeypot: the field is hidden from real visitors,
      // so any value in it marks the submission as automated.
      body: JSON.stringify({ ...request, company: options.honeypot ?? '' }),
    });

    if (!response.ok) {
      return { ok: false, error: `status_${response.status}` };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'network' };
  }
}
