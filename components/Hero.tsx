'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CURRENCIES } from '@/lib/currencies';
import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { EASE_LUX } from '@/lib/utils';
import { HeroVisual } from './HeroVisual';
import { QuotePanel } from './QuotePanel';
import { DisplayLines, Reveal } from './ui/Reveal';
import { Cta } from './ui/Cta';
import { TelegramCta } from './ui/TelegramCta';

/**
 * Opening statement and the indicative quote widget.
 *
 * The widget sits inside the hero on large screens so the first screen both
 * states what the desk is and lets someone put a number against it.
 */
export function Hero() {
  const { t } = useLocale();
  const reduced = useReducedMotion();

  return (
    <section
      id={SECTION.top}
      className="relative overflow-hidden pb-24 pt-[calc(var(--dk-header-h)+3.5rem)] lg:min-h-[100svh] lg:pb-32 lg:pt-[calc(var(--dk-header-h)+5rem)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <HeroVisual className="absolute left-1/2 top-1/2 h-[min(165vw,44rem)] w-[min(165vw,44rem)] -translate-x-1/2 -translate-y-1/2 opacity-40 lg:left-auto lg:right-[-10%] lg:top-1/2 lg:h-[62rem] lg:w-[62rem] lg:translate-x-0 lg:opacity-90" />
      </div>

      <div className="shell relative grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal delay={0.05}>
            <p className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-8 bg-champagne/50" />
              <span className="eyebrow">{t.hero.eyebrow}</span>
            </p>
          </Reveal>

          <h1 className="display mt-10 text-[clamp(2.15rem,5.4vw,4.5rem)] uppercase text-bone">
            <DisplayLines lines={t.hero.headline} delay={0.12} />
          </h1>

          <Reveal delay={0.42} className="mt-9 max-w-xl">
            <p className="font-display text-[clamp(1.1rem,2.1vw,1.5rem)] leading-snug text-bone/80">
              {t.hero.lede}
            </p>
            <p className="mt-6 max-w-prose2 font-sans text-sm leading-relaxed text-ash sm:text-[0.9375rem]">
              {t.hero.body}
            </p>
          </Reveal>

          <Reveal delay={0.54} className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <TelegramCta label={t.common.telegram} />
            <Cta href={`#${SECTION.howItWorks}`} variant="secondary">
              {t.hero.ctaSecondary}
            </Cta>
          </Reveal>

          <Reveal delay={0.66} className="mt-11">
            <ul
              aria-label={t.hero.assetsAria}
              className="flex flex-wrap items-center gap-5"
            >
              {CURRENCIES.map((code, index) => (
                <li key={code} className="flex items-center gap-5">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="h-[3px] w-[3px] rotate-45 bg-champagne/60"
                    />
                  )}
                  <span className="font-sans text-[0.6875rem] uppercase tracking-widest2 text-ash">
                    {code}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <motion.div
          className="lg:col-span-5 lg:col-start-8"
          initial={reduced ? undefined : { opacity: 0, y: 32 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE_LUX, delay: 0.3 }}
        >
          <QuotePanel />
        </motion.div>
      </div>

    </section>
  );
}
