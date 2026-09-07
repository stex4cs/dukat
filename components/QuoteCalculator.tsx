'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useId, useMemo, useState, type ReactNode } from 'react';
import { convert, getRate, otherCurrencies, type CurrencyCode } from '@/lib/rates';
import { formatAmount, formatAmountInput, formatRate, parseAmountInput } from '@/lib/format';
import { useRates } from '@/lib/use-rates';
import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { useQuoteDraft } from '@/providers/quote-draft';
import { cn } from '@/lib/utils';
import { AnimatedNumber } from './ui/AnimatedNumber';
import { CurrencySelect } from './ui/CurrencySelect';
import { Cta } from './ui/Cta';

/**
 * Indicative quote widget.
 *
 * A front-end demonstration only: it reads a rate table (static today, an
 * endpoint tomorrow — see lib/rates.ts) and shows what an amount would come
 * to. It prices nothing and executes nothing. The action hands the figures to
 * the private quote form further down the page.
 */
export function QuoteCalculator({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const rates = useRates();
  const { handOff } = useQuoteDraft();
  const reduced = useReducedMotion();
  const fieldId = useId();

  const [sendRaw, setSendRaw] = useState(() => formatAmountInput('100000', locale));
  const [send, setSend] = useState<CurrencyCode>('USDT');
  const [receive, setReceive] = useState<CurrencyCode>('USD');
  const [swaps, setSwaps] = useState(0);

  const amount = useMemo(() => parseAmountInput(sendRaw, locale), [sendRaw, locale]);
  const rate = getRate(rates, send, receive);
  const received = convert(rates, amount, send, receive);

  const formatReceived = useCallback(
    (value: number) => formatAmount(value, locale, 2),
    [locale],
  );

  function chooseSend(next: CurrencyCode) {
    setSend(next);
    if (next === receive) setReceive(otherCurrencies(next)[0]!);
  }

  function chooseReceive(next: CurrencyCode) {
    setReceive(next);
    if (next === send) setSend(otherCurrencies(next)[0]!);
  }

  function swap() {
    setSend(receive);
    setReceive(send);
    setSwaps((count) => count + 1);
  }

  return (
    <div
      className={cn(
        'relative border border-line bg-surface/85 p-6 shadow-card backdrop-blur-xl sm:p-8',
        className,
      )}
    >
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-16 bg-champagne/70" />

      <div className="flex items-center justify-between gap-4">
        <h2 className="font-sans text-eyebrow uppercase text-bone">
          {t.calculator.title}
        </h2>
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-champagne animate-pulse-dot" />
      </div>

      <div className="mt-7 space-y-3">
        <Field label={t.calculator.youSend} htmlFor={`${fieldId}-send`}>
          <input
            id={`${fieldId}-send`}
            value={sendRaw}
            onChange={(event) => setSendRaw(formatAmountInput(event.target.value, locale))}
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            placeholder="0"
            className="tnum w-full min-w-0 bg-transparent text-[clamp(1.5rem,4.5vw,2rem)] font-light tracking-tight text-bone outline-none"
          />
          <CurrencySelect
            value={send}
            onChange={chooseSend}
            label={t.calculator.selectCurrency}
            className="w-[7.5rem] shrink-0"
          />
        </Field>

        <div className="relative flex items-center py-1">
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          <motion.button
            type="button"
            onClick={swap}
            aria-label={t.calculator.swap}
            animate={reduced ? undefined : { rotate: swaps * 180 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-surface-raised text-ash transition-colors duration-400 ease-lux hover:border-champagne/50 hover:text-bone"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
              <path d="M4 2.5V13M4 13L1.5 10.5M4 13L6.5 10.5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M12 13.5V3M12 3L14.5 5.5M12 3L9.5 5.5" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </motion.button>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>

        <Field label={t.calculator.youReceive}>
          <output
            aria-label={t.calculator.receiveAria}
            className="tnum block w-full min-w-0 truncate text-[clamp(1.5rem,4.5vw,2rem)] font-light tracking-tight text-bone"
          >
            <AnimatedNumber value={received} format={formatReceived} />
          </output>
          <CurrencySelect
            value={receive}
            onChange={chooseReceive}
            label={t.calculator.selectCurrency}
            className="w-[7.5rem] shrink-0"
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-5">
        <span className="eyebrow">{t.calculator.indicativeRate}</span>
        <span className="tnum font-sans text-sm text-bone">
          1 {send} = {formatRate(rate, locale)} {receive}
        </span>
      </div>

      <p className="mt-4 max-w-prose2 font-sans text-xs leading-relaxed text-ash">
        {t.calculator.note}
      </p>

      <Cta
        href={`#${SECTION.quote}`}
        onClick={() => handOff({ have: send, want: receive, amount })}
        className="mt-7 w-full"
      >
        {t.calculator.cta}
      </Cta>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-line bg-surface-raised/35 p-4 transition-colors duration-500 ease-lux focus-within:border-line-strong sm:p-5">
      {/* The label sits beside the controls rather than wrapping them: the row
          contains a listbox trigger, which must not be nested inside a label. */}
      {htmlFor ? (
        <label htmlFor={htmlFor} className="eyebrow block w-fit cursor-text">
          {label}
        </label>
      ) : (
        <span className="eyebrow block">{label}</span>
      )}
      <div className="mt-3 flex items-center gap-4">{children}</div>
    </div>
  );
}
