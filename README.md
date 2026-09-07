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
| `NEXT_PUBLIC_SITE_URL` | Overrides the canonical origin. Production defaults to `https://dukatdesk.com`. |
| `NEXT_PUBLIC_QUOTE_ENDPOINT` | Where the written form posts. Defaults to the bundled `/api/quote`. |

## Before going live

Search the repository for `TO BE PROVIDED` — every placeholder is bracketed
and uppercase, so one grep finds them all.

1. **Telegram notifications** — set `TELEGRAM_BOT_TOKEN` and
   `TELEGRAM_CHAT_ID` in the deployment environment (see below). Without
   them the endpoint answers 503 in production rather than accepting an
   enquiry it cannot deliver.
2. **`lib/contact.ts`** — the footer email is still `[CONTACT EMAIL]`, the
   only placeholder a visitor can see on the homepage. Set it, or drop the
   row and leave Telegram as the single channel. Contact points render as
   plain text until `href` is set, so no dead links ship in the meantime.
3. **`app/[locale]/legal/[doc]/page.tsx`** — Terms, Privacy and Compliance
   are on-brand placeholder pages, excluded from indexing until real text
   lands. They are linked from the footer and the consent checkbox.

## Search Console

The site is verified with the HTML-tag method already — the token is in
`app/[locale]/layout.tsx` under `verification.google`.

Prefer a **Domain property** over a URL-prefix property. It covers apex and
`www`, http and https, and every subdomain in one place, which matters here
because both hosts resolve. Add this TXT record on the apex in Vercel →
Domains → dukatdesk.com → DNS Records:

```
Type: TXT   Name: @
Value: google-site-verification=QnvbgSe3OzkdKfF-PM589v0nOTu-SRdAVq-kkoX2Spc
```

Then submit `https://dukatdesk.com/sitemap.xml` under Sitemaps.

Worth adding for this audience: Bing Webmaster Tools (imports from Search
Console in one click) and Yandex Webmaster, since a quarter of the copy is
Russian. Both take a verification token — add them beside `google` in the
`verification` block.

## What is already in place for search

- Per-locale `title`, `description`, canonical and full hreflang alternates
  including `x-default`
- `sitemap.xml` listing all four locale homepages with their alternates.
  `lastModified` is a constant, bumped by hand — using the build date would
  claim a content change on every deploy
- `robots.txt` allows the legal routes on purpose. They carry `noindex`, and
  a disallowed page can still be indexed URL-only because the crawler never
  fetches it and so never reads the noindex
- Organization JSON-LD on every page, FAQPage JSON-LD on the homepage. Both
  contain only what the page itself states
- A generated 1200x630 Open Graph image at `app/[locale]/opengraph-image.tsx`.
  It is Latin-only and identical in every language: the generator falls back
  to a default font and Cyrillic would risk rendering as empty boxes

## Telegram notifications for the written form

Written quote requests are delivered to the desk by a bot. A bot is required:
a personal Telegram account cannot send messages from a server.

The bot is `@dukat_private_desk_bot`.

1. Get the token from [@BotFather](https://t.me/BotFather) (`/mybots` → the
   bot → API Token). **Never commit it.** This repository is public; the token
   belongs in the deployment environment only. If it leaks, `/revoke` in
   BotFather issues a new one and invalidates the old.
2. In Vercel → Settings → Environment Variables, add `TELEGRAM_BOT_TOKEN` for
   Production and Preview.
3. Open the bot and press **Start**. Telegram does not let a bot message
   someone who has never messaged it, so this step is mandatory.
4. Read the chat id from
   `https://api.telegram.org/bot<TOKEN>/getUpdates` — it is
   `result[0].message.chat.id`.
5. Add it as `TELEGRAM_CHAT_ID` and redeploy. Environment variables are read
   at request time but a redeploy is needed for them to be attached.

To have the whole desk receive enquiries rather than one person: add the bot
to a group, post a message there, and use that chat id instead — group ids are
negative numbers.

The message carries the pair, amount, name, language, any note, and a tappable
link back to the sender built from their chosen method (`t.me/`, `mailto:` or
`wa.me/`), so a reply is one tap away.

If delivery fails, the endpoint answers 502 and the form shows its failure
message, which tells the visitor to contact the desk directly — the Telegram
button is right there. The enquiry is also written to the platform log before
delivery is attempted, so nothing is lost if Telegram is unreachable.

## AI assistants

Two files describe the desk to language models and AI crawlers:

- `/llms.txt` — the short brief. Written as constraints rather than
  marketing, because the failure mode that matters is an assistant
  confidently inventing a DUKAT rate or implying the desk is regulated. It
  states plainly what DUKAT is not and what must not be inferred.
- `/llms-full.txt` — the whole site as plain text in English, so an assistant
  can answer a detailed question about the process or the FAQ without
  crawling and reassembling a JavaScript-rendered page.

Both are route handlers (`app/llms.txt/`, `app/llms-full.txt/`) generated from
the same dictionary and config the pages use, so they cannot drift from what
the site actually says. Edit the copy, not these files.

`robots.txt` allows every crawler including GPTBot, ClaudeBot and
PerplexityBot, which is the intent — the desk wants to be described
accurately when someone asks an assistant where to move size. To block them
instead, add a rule group per user agent in `app/robots.ts`.

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
