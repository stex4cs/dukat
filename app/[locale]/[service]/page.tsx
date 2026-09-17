import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n';
import {
  CASH_CITIES,
  LANDING_SLUGS,
  LANDING_SR,
  isLandingSlug,
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
  // Serbian only: these target Serbian search terms and have no counterpart
  // in the other locales.
  return LANDING_SLUGS.map((service) => ({ locale: 'sr', service }));
}

type Params = { params: Promise<{ locale: string; service: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service } = await params;
  if (!isLandingSlug(service)) return {};
  const page = LANDING_SR[service];

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: canonicalFor('sr', `/${service}`) },
    openGraph: {
      type: 'website',
      siteName: 'DUKAT',
      title: page.h1,
      description: page.description,
      url: canonicalFor('sr', `/${service}`),
      locale: 'sr_RS',
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { locale, service } = await params;
  if (locale !== 'sr' || !isLandingSlug(service)) notFound();

  const page = LANDING_SR[service];
  const t = getDictionary('sr');

  return (
    <>
      <Header />
      <main id="main">
        <article className="shell py-28 lg:py-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-8 bg-champagne/50" />
                <span className="eyebrow">{CASH_CITIES.join(' · ')}</span>
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
          __html: jsonLd(serviceSchema(page.h1, page.description, `${SITE_URL}/sr/${service}`)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchemaFrom(page.faq)) }}
      />
    </>
  );
}
