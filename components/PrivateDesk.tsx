'use client';

import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

/**
 * What the desk is, and the three things that follow from it.
 */
export function PrivateDesk() {
  const { t } = useLocale();

  return (
    <section id={SECTION.privateDesk} className="shell py-28 lg:py-40">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <SectionHeader
          index="01"
          eyebrow={t.privateDesk.eyebrow}
          lines={t.privateDesk.headline}
          className="lg:col-span-7"
        />

        <Reveal delay={0.12} className="lg:col-span-5">
          <p className="max-w-prose2 font-sans text-sm leading-relaxed text-ash sm:text-[0.9375rem]">
            {t.privateDesk.body}
          </p>
        </Reveal>
      </div>

      <ul className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-28 lg:grid-cols-3">
        {t.privateDesk.cards.map((card, index) => (
          <li key={card.title} className="bg-ink">
            <Reveal delay={index * 0.09} className="h-full">
              <article className="group relative flex h-full flex-col bg-surface/25 p-8 transition-colors duration-700 ease-lux hover:bg-surface/70 lg:p-10">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-champagne/70 transition-transform duration-[900ms] ease-lux group-hover:scale-x-100"
                />
                <span className="font-sans text-micro tnum text-champagne">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-10 font-display text-2xl leading-tight text-bone lg:text-[1.75rem]">
                  {card.title}
                </h3>
                <p className="mt-5 font-sans text-sm leading-relaxed text-ash">
                  {card.body}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
