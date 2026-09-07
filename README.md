# DUKAT — Private Desk

Marketing site for DUKAT, a private OTC desk for large digital asset
transactions (USDT ↔ EUR, USDT ↔ USD).

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS and Framer Motion.
Available in English, Serbian, Russian and German.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to a language
npm run build
npm start
npm run typecheck
```

## Deploying

Deploys to Vercel with no configuration. Import the repository, set the
environment variables below, and deploy. Note that `/api/quote` needs a Node
runtime, so a static-only host (Apache, plain shared hosting) will not work.

## Telegram is the primary action

Every leading call to action on the site opens `t.me/dukatdesk`. The chat
handle lives in `lib/telegram.ts` — change it there and it changes everywhere.

The hero panel composes the pair and amount into a draft message using
Telegram's documented `?text=` deep link, so the visitor arrives with
"DUKAT quote request: 100,000 USDT → USD" already typed, in their own
language and number format. Telegram never auto-sends; they press send.

## No rates on the site

There is no rate model, no rate table and no conversion anywhere. Pricing is
quoted by the desk per transaction, so nothing here can go stale or imply a
price that was not offered. `lib/currencies.ts` only lists the three
instruments. If a published indicative rate is ever wanted, it should be a
deliberate decision with a real source behind it, not a hard-coded constant.

## Environment variables

Copy `.env.example` to `.env.local`. Both are optional in development.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for hreflang, sitemap and Open Graph. |
| `NEXT_PUBLIC_QUOTE_ENDPOINT` | Where the written form posts. Defaults to the bundled `/api/quote`. |

## Before going live

Search the repository for `TO BE PROVIDED` — every placeholder is bracketed
and uppercase, so one grep finds them all.

1. **`app/api/quote/route.ts`** — the handler validates and logs written
   enquiries but does not deliver them anywhere yet. Forward them to a
   mailbox, CRM or bot. **Do not launch without this**: form submissions
   would exist only in the server log. (Telegram requests are unaffected —
   they go straight to the chat.)
2. **`lib/contact.ts`** — the footer email is still `[CONTACT EMAIL]`, the
   only placeholder a visitor can see on the homepage. Set it, or drop the
   row and leave Telegram as the single channel. Contact points render as
   plain text until `href` is set, so no dead links ship in the meantime.
3. **`app/[locale]/legal/[doc]/page.tsx`** — Terms, Privacy and Compliance
   are on-brand placeholder pages, excluded from indexing until real text
   lands. They are linked from the footer and the consent checkbox.

## Claims policy

The copy deliberately makes no regulatory, licensing, banking, custody,
anonymity, security or guaranteed-settlement claims, and states no volumes,
client counts, years of operation, certifications, partners or reviews. Keep
it that way unless DUKAT supplies verified information.

## Structure

```
app/[locale]/          Root layout (carries <html lang>), homepage, legal, 404
app/api/quote/         Written enquiry endpoint
components/            One file per section, plus components/ui primitives
lib/i18n/              Locale config and the four dictionaries
lib/telegram.ts        Chat handle and deep-link builder
lib/currencies.ts      The three instruments
lib/format.ts          Locale-aware number parsing and formatting
lib/quote.ts           Written request shape, validation, submission
middleware.ts          Language negotiation for locale-less URLs
providers/             Locale context, and the panel → form hand-off
```

Adding a language means adding a code to `lib/i18n/config.ts` and a dictionary
file. Dictionaries are typed against the English one, so a missing key is a
compile error rather than a silent fallback.

## Accessibility and motion

Semantic landmarks and headings throughout, a skip link, keyboard-operable
listboxes and accordion, a focus-trapped mobile menu, and visible focus rings.
Every animation is disabled under `prefers-reduced-motion`.
