'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PRIMARY_PAIRS, getRate, type CurrencyCode } from '@/lib/rates';
import { formatRate } from '@/lib/format';
import { useRates } from '@/lib/use-rates';
import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

/** Display order puts USDT between the two fiat currencies it is quoted against. */
const DISPLAY_ORDER: CurrencyCode[] = ['EUR', 'USDT', 'USD'];

const SYMBOL: Record<CurrencyCode, string> = {
  EUR: '€',
  USDT: '₮',
  USD: '$',
};

/**
 * The three instruments the desk quotes, and an indicative rate board.
 * Rates come from the same table as the hero widget, so the two can never
 * disagree.
 */
export function Assets() {
  const { locale, t } = useLocale();
  const rates = useRates();

  const cards = DISPLAY_ORDER.map(
    (code) => t.assets.cards.find((card) => card.code === code)!,
  );

  return (
    <section id={SECTION.rates} className="shell py-28 lg:py-40">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <SectionHeader
          index="03"
          eyebrow={t.assets.eyebrow}
          lines={t.assets.headline}
          className="lg:col-span-7"
        />
        <Reveal delay={0.12} className="lg:col-span-5">
          <p className="max-w-prose2 font-sans text-sm leading-relaxed text-ash sm:text-[0.9375rem]">
            {t.assets.body}
          </p>
        </Reveal>
      </div>

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

      <Reveal delay={0.1} className="mt-16">
        <div className="border border-line bg-surface/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-5 lg:px-8">
            <h3 className="font-sans text-eyebrow uppercase text-bone">
              {t.assets.board.title}
            </h3>
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-champagne animate-pulse-dot"
            />
          </div>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-6 py-4 eyebrow font-normal lg:px-8">
                  {t.assets.board.pair}
                </th>
                <th scope="col" className="px-6 py-4 eyebrow text-right font-normal lg:px-8">
                  {t.assets.board.rate}
                </th>
              </tr>
            </thead>
            <tbody>
              {PRIMARY_PAIRS.map(([from, to]) => (
                <tr key={`${from}${to}`} className="border-b border-line last:border-b-0">
                  <th
                    scope="row"
                    className="px-6 py-5 font-sans text-sm font-normal tracking-wider2 text-bone lg:px-8"
                  >
                    {from} / {to}
                  </th>
                  <td className="tnum px-6 py-5 text-right font-sans text-sm text-ash lg:px-8">
                    1 {from} = {formatRate(getRate(rates, from, to), locale)} {to}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 max-w-prose2 font-sans text-xs leading-relaxed text-ash">
          {t.assets.board.note}
        </p>
      </Reveal>
    </section>
  );
}

/** The reciprocal-quote mark that sits on the seam between two asset cards. */
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
