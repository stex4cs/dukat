import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n';
import {
  CASH_CITIES,
  LANDING_CONTENT,
  LANDING_KEYS,
  LANDING_LOCALES,
  LANDING_SLUG,
  isLandingLocale,
  landingKeyFor,
  type LandingLocale,
} from '@/lib/landing';
import { canonicalFor, SITE_URL } from '@/lib/site';
import { faqSchemaFrom, jsonLd, serviceSchema } from '@/lib/structured-data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/ui/Reveal';
import { TelegramCta } from '@/components/ui/TelegramCta';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';

/**
 * Serbian search landing pages, served at /sr/<slug>.
 *
 * Deliberately absent from the main navigation — the browsing experience
 * stays as designed — but linked from the footer and listed in the sitemap,
 * because an orphan page is discovered late and carries no internal weight.
 * They are fully indexable; hiding them from Google would defeat the point.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  // Only the locales that have landing pages — English and German do not.
  return LANDING_LOCALES.flatMap((locale) =>
    LANDING_KEYS.map((key) => ({ locale, service: LANDING_SLUG[locale][key] })),
  );
}

/**
 * The Serbian and Russian versions of a page are translations of each other,
 * aimed at the same market. Declaring them as alternates keeps Google from
 * reading them as two pages competing for one place.
 */
function alternatesForKey(key: (typeof LANDING_KEYS)[number]) {
  return {
    'sr-Latn': canonicalFor('sr', `/${LANDING_SLUG.sr[key]}`),
    ru: canonicalFor('ru', `/${LANDING_SLUG.ru[key]}`),
    'x-default': canonicalFor('sr', `/${LANDING_SLUG.sr[key]}`),
  };
}

function resolve(locale: string, service: string) {
  if (!isLandingLocale(locale)) return null;
  const key = landingKeyFor(locale, service);
  if (!key) return null;
  return { locale: locale as LandingLocale, key, page: LANDING_CONTENT[locale][key] };
}

type Params = { params: Promise<{ locale: string; service: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, service } = await params;
  const found = resolve(locale, service);
  if (!found) return {};
  const { page } = found;
  const url = canonicalFor(found.locale, `/${service}`);

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url, languages: alternatesForKey(found.key) },
    openGraph: {
      type: 'website',
      siteName: 'DUKAT',
      title: page.h1,
      description: page.description,
      url,
      locale: found.locale === 'sr' ? 'sr_RS' : 'ru_RU',
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { locale, service } = await params;
  const found = resolve(locale, service);
  if (!found) notFound();

  const { page } = found;
  const t = getDictionary(found.locale);

  return (
    <>
      <Header />
      <main id="main">
        <article className="shell py-28 lg:py-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-8 bg-champagne/50" />
                <span className="eyebrow">{CASH_CITIES[found.locale].join(' · ')}</span>
              </p>
            </Reveal>

            <h1 className="display mt-10 text-[clamp(2.15rem,5.4vw,4rem)] uppercase text-bone">
              {page.h1}
            </h1>

            <Reveal delay={0.1}>
              <p className="mt-9 max-w-prose2 font-sans text-base leading-relaxed text-bone/80">
                {page.intro}
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-11 flex flex-col gap-4 sm:flex-row">
              <TelegramCta label={t.common.telegram} />
              <WhatsAppCta ariaLabel={t.common.whatsappAria} />
            </Reveal>
          </div>

          <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-2 lg:gap-x-16">
            {page.sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 0.06}>
                <section>
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
              </Reveal>
            ))}
          </div>

          <div className="mt-24 border-t border-line pt-14">
            <h2 className="eyebrow">{t.faq.eyebrow}</h2>
            <dl className="mt-10 max-w-3xl space-y-10">
              {page.faq.map((item) => (
                <Reveal key={item.q}>
                  <dt className="font-display text-lg text-bone sm:text-xl">{item.q}</dt>
                  <dd className="mt-4 max-w-prose2 font-sans text-sm leading-relaxed text-ash">
                    {item.a}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <p className="mt-20 max-w-prose2 border-t border-line pt-8 font-sans text-xs leading-relaxed text-ash">
            {t.footer.disclaimer}
          </p>
        </article>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(serviceSchema(page.h1, page.description, `${SITE_URL}/${found.locale}/${service}`)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchemaFrom(page.faq)) }}
      />
    </>
  );
}
