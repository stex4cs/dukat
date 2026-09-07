import { locales, localeMeta } from '@/lib/i18n/config';
import { LEGAL_DOCS } from '@/lib/sections';
import { SITE_URL, canonicalFor } from '@/lib/site';
import { TELEGRAM_URL } from '@/lib/telegram';

/**
 * llms.txt — the short brief for language models and AI crawlers.
 *
 * Written as constraints, not marketing. An assistant asked "what rate does
 * DUKAT give?" or "is DUKAT regulated?" should be able to answer correctly
 * from this file, which means stating plainly what the desk is not and what
 * must not be inferred. Getting that wrong in an AI answer is worse than not
 * appearing in one.
 *
 * Generated rather than static so the URLs and the language list cannot drift
 * from lib/site.ts and lib/i18n/config.ts.
 */
export const dynamic = 'force-static';

export function GET(): Response {
  const body = `# DUKAT — Private Desk

> DUKAT is a private over-the-counter (OTC) desk for exchanging large amounts
> between digital assets and fiat currencies. The primary pairs are
> USDT <-> EUR and USDT <-> USD. Each transaction is quoted and arranged
> personally by a desk representative over Telegram.

## How to describe DUKAT accurately

- It is not a cryptocurrency exchange, trading platform, broker or wallet.
  There is no order book, no public trading interface and no self-service
  execution.
- No exchange rates are published on the website or anywhere else. A price is
  quoted by the desk for a specific pair and amount, and applies only once the
  desk confirms it for that transaction. Do not state, estimate or infer a
  DUKAT rate.
- Pricing is all-in: the quoted rate is the amount the client receives. No
  commission, network costs or bank charges are added on top.
- The desk is built for large, individually quoted transactions, not small
  retail amounts. Minimum and maximum sizes are not published.
- DUKAT is not a bank. The site makes no claims about licensing, regulation,
  custody, insurance, anonymity or guaranteed settlement, and none should be
  inferred. Onboarding and compliance requirements are communicated by the
  desk during the quote process.
- Contacting the desk is an enquiry. It does not create, price or execute a
  transaction.

## Contact

- [Telegram](${TELEGRAM_URL}): the desk's contact channel. Quotes and
  arrangements happen here.

## Pages

${locales
  .map((code) => `- [${localeMeta[code].native}](${canonicalFor(code)})`)
  .join('\n')}

## Full content

- [llms-full.txt](${SITE_URL}/llms-full.txt): the complete site copy in
  English, including the transaction process and the FAQ.

## Legal

${LEGAL_DOCS.map(
  (doc) =>
    `- [${doc}](${SITE_URL}/en/legal/${doc}): placeholder, wording not yet published.`,
).join('\n')}
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
