'use client';

import { useLocale } from '@/providers/locale';
import { DisplayLines, Reveal } from './ui/Reveal';

/**
 * The pricing statement.
 *
 * This is the desk's leading commercial message, so it gets a band of its
 * own directly beneath the hero — unnumbered, so it reads as a statement
 * rather than as another section in the sequence.
 *
 * The three items name what is *not* charged. They are specific and
 * checkable against a settled transaction, which is what keeps the claim
 * from being decoration.
 */
export function Pricing() {
  const { t } = useLocale();

  return (
    <section
      aria-labelledby="pricing-heading"
      className="relative border-y border-line bg-surface/45"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-px w-24 bg-champagne/70"
      />

      <div className="shell grid gap-12 py-20 lg:grid-cols-12 lg:items-end lg:gap-16 lg:py-28">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-8 bg-champagne/50" />
              <span className="eyebrow">{t.pricing.eyebrow}</span>
            </p>
          </Reveal>

          <h2
            id="pricing-heading"
            className="display mt-8 text-[clamp(2rem,5vw,4rem)] uppercase text-bone"
          >
            <DisplayLines lines={t.pricing.headline} delay={0.05} />
          </h2>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.14}>
            <p className="max-w-prose2 font-sans text-sm leading-relaxed text-ash sm:text-[0.9375rem]">
              {t.pricing.body}
            </p>

            {/* Stacked rather than inline: the German and Serbian items are
                long enough to wrap, which would leave a separator orphaned at
                the end of a line. */}
            <ul className="mt-8 space-y-3">
              {t.pricing.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-[3px] w-[3px] shrink-0 rotate-45 bg-champagne/70"
                  />
                  <span className="font-sans text-[0.625rem] uppercase tracking-widest2 text-bone">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
