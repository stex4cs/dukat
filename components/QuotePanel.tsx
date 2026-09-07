'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useId, useMemo, useState, type ReactNode } from 'react';
import { otherCurrencies, type CurrencyCode } from '@/lib/currencies';
import { formatAmountInput, formatInteger, parseAmountInput } from '@/lib/format';
import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { useQuoteDraft } from '@/providers/quote-draft';
import { cn } from '@/lib/utils';
import { CurrencySelect } from './ui/CurrencySelect';
import { TelegramCta } from './ui/TelegramCta';

/**
 * Composes a quote request and opens it in Telegram.
 *
 * No rate is shown or calculated anywhere on this site. Pricing is quoted by
 * the desk per transaction, so this panel only captures the pair and the
 * amount and carries them into the chat as a draft message.
 */
export function QuotePanel({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const { handOff } = useQuoteDraft();
  const reduced = useReducedMotion();
  const fieldId = useId();

  const [have, setHave] = useState<CurrencyCode>('USDT');
  const [want, setWant] = useState<CurrencyCode>('USD');
  const [amountRaw, setAmountRaw] = useState(() => formatAmountInput('100000', locale));
  const [swaps, setSwaps] = useState(0);

  const amount = useMemo(() => parseAmountInput(amountRaw, locale), [amountRaw, locale]);

  const draft = useMemo(() => {
    const pair = `${have} → ${want}`;
    return amount > 0
      ? `${t.panel.draft}: ${formatInteger(amount, locale)} ${pair}`
      : `${t.panel.draft}: ${pair}`;
  }, [amount, have, want, locale, t.panel.draft]);

  function chooseHave(next: CurrencyCode) {
    setHave(next);
    if (next === want) setWant(otherCurrencies(next)[0]!);
  }

  function chooseWant(next: CurrencyCode) {
    setWant(next);
    if (next === have) setHave(otherCurrencies(next)[0]!);
  }

  return (
    <div
      className={cn(
        'relative border border-line bg-surface/85 p-6 shadow-card backdrop-blur-xl sm:p-8',
        className,
      )}
    >
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-16 bg-champagne/70" />

      <h2 className="font-sans text-eyebrow uppercase text-bone">{t.panel.title}</h2>

      <div className="mt-7 flex items-end gap-3">
        <Field label={t.panel.have} className="flex-1">
          <CurrencySelect
            value={have}
            onChange={chooseHave}
            label={t.panel.have}
          />
        </Field>

        <motion.button
          type="button"
          onClick={() => {
            setHave(want);
            setWant(have);
            setSwaps((count) => count + 1);
          }}
          aria-label={t.panel.swap}
          animate={reduced ? undefined : { rotate: swaps * 180 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-surface-raised text-ash transition-colors duration-400 ease-lux hover:border-champagne/50 hover:text-bone"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
            <path d="M2 5.5H13M13 5.5L10.5 3M13 5.5L10.5 8" stroke="currentColor" strokeWidth="1.1" />
            <path d="M14 10.5H3M3 10.5L5.5 8M3 10.5L5.5 13" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        </motion.button>

        <Field label={t.panel.want} className="flex-1">
          <CurrencySelect
            value={want}
            onChange={chooseWant}
            label={t.panel.want}
          />
        </Field>
      </div>

      <div className="mt-4 border border-line bg-surface-raised/35 p-4 transition-colors duration-500 ease-lux focus-within:border-line-strong sm:p-5">
        <label htmlFor={`${fieldId}-amount`} className="eyebrow block w-fit cursor-text">
          {t.panel.amount}
        </label>
        <div className="mt-3 flex items-baseline gap-4">
          <input
            id={`${fieldId}-amount`}
            value={amountRaw}
            onChange={(event) => setAmountRaw(formatAmountInput(event.target.value, locale))}
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            placeholder="0"
            className="tnum w-full min-w-0 bg-transparent text-[clamp(1.5rem,4.5vw,2rem)] font-light tracking-tight text-bone outline-none"
          />
          <span className="shrink-0 font-sans text-sm tracking-wider2 text-ash">{have}</span>
        </div>
      </div>

      <p className="mt-6 font-sans text-xs leading-relaxed text-ash">{t.panel.note}</p>

      <TelegramCta
        label={t.common.telegram}
        draft={draft}
        className="mt-7 w-full py-5"
      />

      <a
        href={`#${SECTION.quote}`}
        onClick={() => handOff({ have, want, amount })}
        className="link-underline mx-auto mt-6 block w-fit font-sans text-micro uppercase text-ash transition-colors duration-400 ease-lux hover:text-bone"
      >
        {t.panel.alt}
      </a>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <span className="eyebrow block">{label}</span>
      <div className="mt-3">{children}</div>
    </div>
  );
}
