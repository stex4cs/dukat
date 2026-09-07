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

## Environment variables

Copy `.env.example` to `.env.local`. All are optional in development.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for hreflang, sitemap and Open Graph. |
| `NEXT_PUBLIC_QUOTE_ENDPOINT` | Where quote requests are sent. Defaults to the bundled `/api/quote`. |
| `NEXT_PUBLIC_RATES_ENDPOINT` | Returns `{ "base": { "USD": 1, "USDT": 0.98, "EUR": 1.083 } }`. Falls back to the static table when unset. |

## Before going live

Search the repository for `TO BE PROVIDED` — every placeholder is bracketed
and uppercase, so one grep finds them all.

1. **`app/api/quote/route.ts`** — the handler validates and logs enquiries but
   does not deliver them anywhere yet. Forward them to a mailbox, CRM or
   Telegram bot. **Do not launch without this**: quote requests would exist
   only in the server log.
2. **`lib/contact.ts`** — Telegram handle, email, legal entity, jurisdiction.
   Contact points render as plain text until `href` is set, so no dead links
   ship in the meantime.
3. **`lib/i18n/dictionaries/*.ts`** — FAQ answers about transaction sizes,
   settlement and compliance carry placeholders. Bracketed placeholders are
   left in English in all four languages on purpose: they are notes for the
   desk, not visitor copy.
4. **`app/[locale]/legal/[doc]/page.tsx`** — Terms, Privacy and Compliance are
   on-brand placeholder pages, excluded from indexing until real text lands.
5. **`lib/rates.ts`** — replace the static table with a live endpoint.

## Claims policy

The copy deliberately makes no regulatory, licensing, banking, custody,
anonymity, security or guaranteed-settlement claims, and states no volumes,
client counts, years of operation, certifications, partners or reviews.
Rates are labelled indicative everywhere they appear. Keep it that way unless
DUKAT supplies verified information.

## Structure

```
app/[locale]/          Root layout (carries <html lang>), homepage, legal, 404
app/api/quote/         Quote enquiry endpoint
components/            One file per section, plus components/ui primitives
lib/i18n/              Locale config and the four dictionaries
lib/rates.ts           Rate model — swap the static table for an API
lib/format.ts          Locale-aware number parsing and formatting
lib/quote.ts           Quote request shape, validation, submission
middleware.ts          Language negotiation for locale-less URLs
providers/             Locale context, and the calculator → form hand-off
```

Adding a language means adding a code to `lib/i18n/config.ts` and a dictionary
file. Dictionaries are typed against the English one, so a missing key is a
compile error rather than a silent fallback.

## Accessibility and motion

Semantic landmarks and headings throughout, a skip link, keyboard-operable
listboxes and accordion, a focus-trapped mobile menu, and visible focus rings.
Every animation is disabled under `prefers-reduced-motion`.
