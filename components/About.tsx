'use client';

import { CONTACT } from '@/lib/contact';
import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { Monogram } from './Logo';
import { DrawRule, Reveal } from './ui/Reveal';

/**
 * The brand statement. Deliberately the quietest section on the page: a
 * wordmark, one idea, and the two legal facts a visitor is entitled to know
 * once DUKAT supplies them.
 */
export function About() {
  const { t } = useLocale();

  return (
    <section id={SECTION.about} className="shell py-32 lg:py-48">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="flex items-center gap-4">
              <span className="font-sans text-micro tnum text-champagne">05</span>
              <span aria-hidden="true" className="h-px w-8 bg-champagne/35" />
              <span className="eyebrow">{t.about.eyebrow}</span>
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <p className="display text-[clamp(3.75rem,13vw,9rem)] uppercase leading-[0.85] text-bone">
              DUKAT
            </p>
            <p className="mt-6 font-sans text-[0.625rem] uppercase tracking-widest3 text-ash">
              {t.common.descriptor}
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-14 hidden lg:block">
            <Monogram className="h-14 w-14 text-champagne/45" />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.1}>
            <p className="max-w-2xl font-display text-[clamp(1.35rem,2.6vw,1.85rem)] leading-snug text-bone">
              {t.about.lead}
            </p>
          </Reveal>

          {t.about.body.map((paragraph, index) => (
            <Reveal key={index} delay={0.16 + index * 0.06} className="mt-8">
              <p className="max-w-prose2 font-sans text-sm leading-relaxed text-ash sm:text-[0.9375rem]">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <DrawRule className="mt-14" delay={0.2} />

          <Reveal delay={0.24}>
            <dl className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">{t.about.entityLabel}</dt>
                <dd className="mt-3 font-sans text-sm text-ash">{CONTACT.legalEntity}</dd>
              </div>
              <div>
                <dt className="eyebrow">{t.about.jurisdictionLabel}</dt>
                <dd className="mt-3 font-sans text-sm text-ash">{CONTACT.jurisdiction}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
