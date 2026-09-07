import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/lib/i18n';
import { defaultLocale, isLocale, locales, type Locale } from '@/lib/i18n/config';
import { LEGAL_DOCS, type LegalDoc } from '@/lib/sections';
import { alternatesFor, canonicalFor } from '@/lib/site';
import { Monogram } from '@/components/Logo';

/**
 * Placeholder legal pages.
 *
 * The footer and the consent checkbox link here, so the routes exist and are
 * on-brand rather than pointing at nothing. Each one states plainly that the
 * text is outstanding — no invented terms, privacy or compliance language.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    LEGAL_DOCS.map((doc) => ({ locale, doc })),
  );
}

type Params = { params: Promise<{ locale: string; doc: string }> };

/** Narrows the route segments back to the unions the dictionary is keyed by. */
async function resolve(params: Params['params']): Promise<{
  locale: Locale;
  doc: LegalDoc;
}> {
  const { locale, doc } = await params;
  return {
    locale: isLocale(locale) ? locale : defaultLocale,
    doc: (LEGAL_DOCS as readonly string[]).includes(doc)
      ? (doc as LegalDoc)
      : 'terms',
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, doc } = await resolve(params);
  const t = getDictionary(locale);
  const page = t.legal.docs[doc];

  return {
    title: `${page.title} — DUKAT`,
    description: t.legal.notice,
    alternates: {
      canonical: canonicalFor(locale, `/legal/${doc}`),
      languages: alternatesFor(`/legal/${doc}`),
    },
    // Placeholders carry no value for search; index them once real text lands.
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: Params) {
  const { locale, doc } = await resolve(params);
  const t = getDictionary(locale);
  const page = t.legal.docs[doc];

  return (
    <main id="main" className="shell flex min-h-[100svh] flex-col py-16 lg:py-20">
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-3 self-start font-sans text-micro uppercase text-ash transition-colors duration-500 hover:text-bone"
      >
        <span aria-hidden="true">&larr;</span>
        {t.legal.back}
      </Link>

      <div className="flex flex-1 flex-col justify-center py-20">
        <Monogram className="h-10 w-10 text-champagne/50" />

        <h1 className="display mt-12 text-[clamp(2.5rem,8vw,5rem)] uppercase text-bone">
          {page.title}
        </h1>

        <p className="mt-10 font-sans text-sm tracking-wider2 text-bone">
          {page.body}
        </p>

        <p className="mt-6 max-w-prose2 font-sans text-xs leading-relaxed text-ash">
          {t.legal.notice}
        </p>
      </div>

      <p className="border-t border-line pt-8 font-sans text-xs leading-relaxed text-ash">
        {t.footer.disclaimer}
      </p>
    </main>
  );
}
