'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CurrencyCode } from '@/lib/currencies';
import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

/** USDT sits between the two fiat currencies it is quoted against. */
const DISPLAY_ORDER: CurrencyCode[] = ['EUR', 'USDT', 'USD'];

const SYMBOL: Record<CurrencyCode, string> = { EUR: '€', USDT: '₮', USD: '$' };

/**
 * The three instruments, and nothing else. No rate board: pricing is quoted
 * by the desk per transaction and is never published here.
 */
export function Currencies() {
  const { t } = useLocale();

  const cards = DISPLAY_ORDER.map(
    (code) => t.assets.cards.find((card) => card.code === code)!,
  );

  return (
    <section id={SECTION.currencies} className="shell py-28 lg:py-40">
      <SectionHeader
        index="03"
        eyebrow={t.assets.eyebrow}
        lines={t.assets.headline}
      />

      <div className="relative mt-20 lg:mt-28">
        <ul
          aria-label={t.assets.flowAria}
          className="grid gap-px border border-line bg-line md:grid-cols-3"
        >
          {cards.map((card, index) => (
            <li key={card.code} className="bg-ink">
              <Reveal delay={index * 0.08} className="h-full">
                <article className="group relative h-full overflow-hidden bg-surface/25 p-8 transition-colors duration-700 ease-lux hover:bg-surface/70 lg:p-12">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[9rem] leading-none text-white/[0.025] transition-transform duration-[1200ms] ease-lux group-hover:-translate-y-1 lg:text-[11rem]"
                  >
                    {SYMBOL[card.code as CurrencyCode]}
                  </span>
                  <p className="relative font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-none tracking-tight text-bone">
                    {card.code}
                  </p>
                  <p className="relative mt-6 font-sans text-[0.6875rem] uppercase tracking-widest2 text-champagne/80">
                    {card.name}
                  </p>
                  <p className="relative mt-3 font-sans text-sm text-ash">{card.note}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <ExchangeMark className="left-1/3" />
        <ExchangeMark className="left-2/3" delay={1.4} />
      </div>
    </section>
  );
}

/** The reciprocal-quote mark that sits on the seam between two cards. */
function ExchangeMark({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduced = useReducedMotion();

  return (
    <span
      aria-hidden="true"
      className={`absolute top-1/2 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-line bg-ink text-ash md:flex ${className ?? ''}`}
    >
      <svg viewBox="0 0 20 14" className="h-3.5 w-5" fill="none">
        <motion.path
          d="M7 1L2 4.5L7 8"
          stroke="currentColor"
          strokeWidth="1.1"
          animate={reduced ? undefined : { x: [0, -1.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay }}
        />
        <path d="M2 4.5H18" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.5" />
        <motion.path
          d="M13 6L18 9.5L13 13"
          stroke="currentColor"
          strokeWidth="1.1"
          animate={reduced ? undefined : { x: [0, 1.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay }}
        />
        <path d="M18 9.5H2" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.5" />
      </svg>
    </span>
  );
}
