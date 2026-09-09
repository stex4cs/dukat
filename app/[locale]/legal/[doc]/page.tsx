import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/lib/i18n';
import { defaultLocale, isLocale, locales, type Locale } from '@/lib/i18n/config';
import { LEGAL_DOCS, type LegalDoc } from '@/lib/sections';
import { alternatesFor, canonicalFor } from '@/lib/site';
import { CONTACT } from '@/lib/contact';
import { Monogram } from '@/components/Logo';

/**
 * Terms, Privacy and Compliance.
 *
 * The text describes what this site actually does — the form collects those
 * fields, the enquiry travels over the Telegram Bot API, there is no
 * analytics and the only cookie remembers a language choice. It is short on
 * purpose: a notice a visitor can read is worth more than one they cannot.
 *
 * It has not been reviewed by a lawyer, and the desk serves markets where the
 * GDPR applies. Treat it as an accurate description of the system, not as a
 * substitute for legal advice.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => LEGAL_DOCS.map((doc) => ({ locale, doc })));
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
    description: page.intro,
    alternates: {
      canonical: canonicalFor(locale, `/legal/${doc}`),
      languages: alternatesFor(`/legal/${doc}`),
    },
  };
}

export default async function LegalPage({ params }: Params) {
  const { locale, doc } = await resolve(params);
  const t = getDictionary(locale);
  const page = t.legal.docs[doc];

  return (
    <main id="main" className="shell py-16 lg:py-20">
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-3 font-sans text-micro uppercase text-ash transition-colors duration-500 hover:text-bone"
      >
        <span aria-hidden="true">&larr;</span>
        {t.legal.back}
      </Link>

      <article className="mx-auto max-w-3xl py-20 lg:py-28">
        <Monogram className="h-10 w-10 text-champagne/50" />

        <h1 className="display mt-12 text-[clamp(2.25rem,6vw,4rem)] uppercase text-bone">
          {page.title}
        </h1>

        <p className="mt-8 max-w-prose2 font-sans text-base leading-relaxed text-bone/80">
          {page.intro}
        </p>

        <div className="mt-16 space-y-12">
          {page.sections.map((section, index) => (
            <section key={section.heading}>
              <h2 className="flex items-baseline gap-4">
                <span className="font-sans text-micro tnum text-champagne">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-xl text-bone lg:text-2xl">
                  {section.heading}
                </span>
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 max-w-prose2 font-sans text-sm leading-relaxed text-ash"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <footer className="mt-20 border-t border-line pt-8">
          <p className="font-sans text-sm text-bone">
            {t.legal.basedIn}
          </p>
          <p className="mt-3 font-sans text-sm text-ash">
            {CONTACT.email.href ? (
              <a href={CONTACT.email.href} className="link-underline hover:text-bone">
                {CONTACT.email.label}
              </a>
            ) : (
              CONTACT.email.label
            )}
          </p>
          <p className="mt-8 max-w-prose2 font-sans text-xs leading-relaxed text-ash">
            {t.footer.disclaimer}
          </p>
        </footer>
      </article>
    </main>
  );
}
