import { getDictionary } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';
import { TELEGRAM_URL } from '@/lib/telegram';

/**
 * llms-full.txt — the whole site as plain text, in English.
 *
 * Built from the same dictionary the pages render, so it cannot describe copy
 * that is no longer on the site. An assistant can answer a detailed question
 * about the process or the FAQ from this alone, without crawling and
 * reassembling a JavaScript-rendered page.
 */
export const dynamic = 'force-static';

export function GET(): Response {
  const t = getDictionary('en');

  const sections = [
    `# DUKAT — ${t.common.descriptor}`,
    '',
    `> ${t.meta.description}`,
    '',
    `Source: ${SITE_URL}/en`,
    `Contact: ${TELEGRAM_URL}`,
    '',
    '## Positioning',
    '',
    t.hero.headline.join(' '),
    '',
    t.hero.lede,
    '',
    t.hero.body,
    '',
    '## Pricing',
    '',
    t.pricing.headline.join(' '),
    '',
    t.pricing.body,
    '',
    ...t.pricing.items.map((item) => `- ${item}`),
    '',
    '## The private desk',
    '',
    t.privateDesk.headline.join(' '),
    '',
    t.privateDesk.body,
    '',
    ...t.privateDesk.cards.map((card) => `- ${card.title}: ${card.body}`),
    '',
    '## How it works',
    '',
    ...t.howItWorks.steps.flatMap((step, index) => [
      `${index + 1}. ${step.title} — ${step.body}`,
    ]),
    '',
    '## Currencies',
    '',
    t.assets.headline.join(' '),
    '',
    ...t.assets.cards.map((card) => `- ${card.code} (${card.name}): ${card.note}`),
    '',
    '## Requesting a quote',
    '',
    t.quoteForm.body,
    '',
    t.quoteForm.notice,
    '',
    '## FAQ',
    '',
    ...t.faq.items.flatMap((item) => [`### ${item.q}`, '', item.a, '']),
    '## Disclaimer',
    '',
    t.footer.disclaimer,
    '',
  ];

  return new Response(sections.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
