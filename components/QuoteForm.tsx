'use client';

import Link from 'next/link';
import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { CONTACT_METHODS, isEmail, submitQuoteRequest, type ContactMethod } from '@/lib/quote';
import { convert, getRate, otherCurrencies, type CurrencyCode } from '@/lib/rates';
import { amountToInput, formatAmount, formatAmountInput, parseAmountInput } from '@/lib/format';
import { useRates } from '@/lib/use-rates';
import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { useQuoteDraft } from '@/providers/quote-draft';
import { cn } from '@/lib/utils';
import { CurrencySelect } from './ui/CurrencySelect';
import { Cta } from './ui/Cta';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

type FieldKey = 'pair' | 'size' | 'name' | 'contact' | 'consent';

/**
 * The private quote request.
 *
 * Collects only what the desk needs to open a conversation. Onboarding and
 * verification happen afterwards, directly with a representative — nothing
 * sensitive is asked for here.
 */
export function QuoteForm() {
  const { locale, t } = useLocale();
  const rates = useRates();
  const { draft, revision } = useQuoteDraft();
  const ids = useId();

  const [have, setHave] = useState<CurrencyCode>(draft.have);
  const [want, setWant] = useState<CurrencyCode>(draft.want);
  const [sizeRaw, setSizeRaw] = useState(() => amountToInput(draft.amount, locale));
  const [name, setName] = useState('');
  const [method, setMethod] = useState<ContactMethod>('telegram');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const sizeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const seenRevision = useRef(revision);

  // Adopt the figures handed over by the hero widget, but never overwrite
  // something already typed here on an unrelated re-render.
  useEffect(() => {
    if (revision === seenRevision.current) return;
    seenRevision.current = revision;
    setHave(draft.have);
    setWant(draft.want);
    setSizeRaw(amountToInput(draft.amount, locale));
  }, [revision, draft, locale]);

  const amount = parseAmountInput(sizeRaw, locale);
  const rate = getRate(rates, have, want);
  const receive = convert(rates, amount, have, want);

  function chooseHave(next: CurrencyCode) {
    setHave(next);
    if (next === want) setWant(otherCurrencies(next)[0]!);
  }

  function chooseWant(next: CurrencyCode) {
    setWant(next);
    if (next === have) setHave(otherCurrencies(next)[0]!);
  }

  function validate(): Partial<Record<FieldKey, string>> {
    const next: Partial<Record<FieldKey, string>> = {};
    if (have === want) next.pair = t.quoteForm.errors.samePair;
    if (!(amount > 0)) next.size = t.quoteForm.errors.size;
    if (name.trim().length === 0) next.name = t.quoteForm.errors.name;
    if (contact.trim().length === 0) {
      next.contact = t.quoteForm.errors.contact;
    } else if (method === 'email' && !isEmail(contact)) {
      next.contact = t.quoteForm.errors.email;
    }
    if (!consent) next.consent = t.quoteForm.errors.consent;
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const focusOrder: Array<[FieldKey, HTMLElement | null]> = [
        ['size', sizeRef.current],
        ['name', nameRef.current],
        ['contact', contactRef.current],
        ['consent', consentRef.current],
      ];
      focusOrder.find(([key, node]) => found[key] && node)?.[1]?.focus();
      setStatus('idle');
      return;
    }

    setStatus('sending');
    const result = await submitQuoteRequest(
      {
        have,
        want,
        amount,
        name: name.trim(),
        method,
        contact: contact.trim(),
        message: message.trim() || undefined,
        locale,
        indicative: { rate, receive },
      },
      { honeypot },
    );

    setStatus(result.ok ? 'sent' : 'error');
  }

  function reset() {
    setStatus('idle');
    setErrors({});
    setName('');
    setContact('');
    setMessage('');
    setConsent(false);
  }

  return (
    <section id={SECTION.quote} className="border-y border-line bg-surface/50">
      <div className="shell py-28 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              index="04"
              eyebrow={t.quoteForm.eyebrow}
              lines={t.quoteForm.headline}
            />
            <Reveal delay={0.12} className="mt-10">
              <p className="max-w-prose2 font-sans text-sm leading-relaxed text-ash sm:text-[0.9375rem]">
                {t.quoteForm.body}
              </p>
              <p className="mt-9 max-w-prose2 border-l border-champagne/40 pl-5 font-sans text-xs leading-relaxed text-ash">
                {t.quoteForm.notice}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.16}>
              {status === 'sent' ? (
                <div
                  className="border border-line bg-surface-raised/50 p-8 lg:p-10"
                  role="status"
                >
                  <span aria-hidden="true" className="block h-px w-16 bg-champagne/70" />
                  <h3 className="mt-8 font-display text-3xl text-bone">
                    {t.quoteForm.success.title}
                  </h3>
                  <p className="mt-5 max-w-prose2 font-sans text-sm leading-relaxed text-ash">
                    {t.quoteForm.success.body}
                  </p>

                  <dl className="mt-10 border-t border-line pt-6">
                    <dt className="eyebrow">{t.quoteForm.success.summary}</dt>
                    <dd className="tnum mt-4 font-sans text-sm text-bone">
                      {formatAmount(amount, locale, 0)} {have} → {want}
                    </dd>
                    <dd className="mt-2 font-sans text-sm text-ash">
                      {t.quoteForm.methods[method]} · {contact}
                    </dd>
                  </dl>

                  <button
                    type="button"
                    onClick={reset}
                    className="link-underline mt-9 font-sans text-[0.6875rem] uppercase tracking-widest2 text-ash transition-colors duration-400 ease-lux hover:text-bone"
                  >
                    {t.quoteForm.success.again}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="border border-line bg-surface-raised/40 p-6 sm:p-8 lg:p-10"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <span className="eyebrow block">{t.quoteForm.fields.have}</span>
                      <CurrencySelect
                        value={have}
                        onChange={chooseHave}
                        label={t.quoteForm.fields.have}
                        className="mt-3"
                      />
                    </div>
                    <div>
                      <span className="eyebrow block">{t.quoteForm.fields.want}</span>
                      <CurrencySelect
                        value={want}
                        onChange={chooseWant}
                        label={t.quoteForm.fields.want}
                        className="mt-3"
                      />
                    </div>
                  </div>
                  {errors.pair && <FieldError>{errors.pair}</FieldError>}

                  <div className="mt-6">
                    <label htmlFor={`${ids}-size`} className="eyebrow block">
                      {t.quoteForm.fields.size}
                    </label>
                    <div className="relative mt-3">
                      <input
                        ref={sizeRef}
                        id={`${ids}-size`}
                        value={sizeRaw}
                        onChange={(event) =>
                          setSizeRaw(formatAmountInput(event.target.value, locale))
                        }
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder={t.quoteForm.placeholders.size}
                        aria-invalid={Boolean(errors.size)}
                        aria-describedby={errors.size ? `${ids}-size-error` : undefined}
                        className={cn(inputClass, 'tnum pr-20')}
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-sans text-xs tracking-wider2 text-ash">
                        {have}
                      </span>
                    </div>
                    {errors.size ? (
                      <FieldError id={`${ids}-size-error`}>{errors.size}</FieldError>
                    ) : (
                      amount > 0 && (
                        <p className="tnum mt-3 font-sans text-xs text-ash">
                          {t.calculator.indicativeRate}: {formatAmount(receive, locale, 2)}{' '}
                          {want}
                        </p>
                      )
                    )}
                  </div>

                  <div className="mt-6">
                    <label htmlFor={`${ids}-name`} className="eyebrow block">
                      {t.quoteForm.fields.name}
                    </label>
                    <input
                      ref={nameRef}
                      id={`${ids}-name`}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      placeholder={t.quoteForm.placeholders.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? `${ids}-name-error` : undefined}
                      className={cn(inputClass, 'mt-3')}
                    />
                    {errors.name && (
                      <FieldError id={`${ids}-name-error`}>{errors.name}</FieldError>
                    )}
                  </div>

                  <fieldset className="mt-6">
                    <legend className="eyebrow">{t.quoteForm.fields.method}</legend>
                    <div className="mt-3 grid grid-cols-3 gap-px border border-line bg-line">
                      {CONTACT_METHODS.map((option) => (
                        <label
                          key={option}
                          className={cn(
                            'flex cursor-pointer items-center justify-center px-2 py-3.5 text-center font-sans text-[0.625rem] uppercase tracking-widest2 transition-colors duration-400 ease-lux focus-within:outline focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-champagne',
                            option === method
                              ? 'bg-bone text-ink'
                              : 'bg-ink text-ash hover:text-bone',
                          )}
                        >
                          <input
                            type="radio"
                            name={`${ids}-method`}
                            value={option}
                            checked={option === method}
                            onChange={() => setMethod(option)}
                            className="sr-only"
                          />
                          {t.quoteForm.methods[option]}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-6">
                    <label htmlFor={`${ids}-contact`} className="eyebrow block">
                      {t.quoteForm.fields.contact}
                    </label>
                    <input
                      ref={contactRef}
                      id={`${ids}-contact`}
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      type={method === 'email' ? 'email' : method === 'whatsapp' ? 'tel' : 'text'}
                      inputMode={method === 'whatsapp' ? 'tel' : undefined}
                      autoComplete={method === 'email' ? 'email' : method === 'whatsapp' ? 'tel' : 'off'}
                      placeholder={t.quoteForm.placeholders[method]}
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? `${ids}-contact-error` : undefined}
                      className={cn(inputClass, 'mt-3')}
                    />
                    {errors.contact && (
                      <FieldError id={`${ids}-contact-error`}>{errors.contact}</FieldError>
                    )}
                  </div>

                  <div className="mt-6">
                    <label htmlFor={`${ids}-message`} className="eyebrow flex items-center gap-3">
                      {t.quoteForm.fields.message}
                      <span className="normal-case tracking-normal text-ash/70">
                        ({t.common.optional})
                      </span>
                    </label>
                    <textarea
                      id={`${ids}-message`}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      rows={3}
                      maxLength={2000}
                      placeholder={t.quoteForm.placeholders.message}
                      className={cn(inputClass, 'mt-3 resize-y')}
                    />
                  </div>

                  {/* Honeypot. Hidden from people, irresistible to bots. */}
                  <div aria-hidden="true" className="h-0 w-0 overflow-hidden">
                    <label htmlFor={`${ids}-company`}>Company</label>
                    <input
                      id={`${ids}-company`}
                      name="company"
                      value={honeypot}
                      onChange={(event) => setHoneypot(event.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="mt-8 flex items-start gap-4">
                    <input
                      ref={consentRef}
                      id={`${ids}-consent`}
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? `${ids}-consent-error` : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 appearance-none border border-line-strong bg-transparent transition-colors duration-300 checked:border-champagne checked:bg-champagne"
                    />
                    <label
                      htmlFor={`${ids}-consent`}
                      className="font-sans text-xs leading-relaxed text-ash"
                    >
                      <ConsentText
                        locale={locale}
                        consent={t.quoteForm.consent}
                      />
                    </label>
                  </div>
                  {errors.consent && (
                    <FieldError id={`${ids}-consent-error`}>{errors.consent}</FieldError>
                  )}

                  <Cta type="submit" disabled={status === 'sending'} className="mt-9 w-full">
                    {status === 'sending' ? t.quoteForm.submitting : t.quoteForm.submit}
                  </Cta>

                  <p aria-live="polite" className="mt-4 min-h-[1.25rem] font-sans text-xs text-champagne">
                    {status === 'error'
                      ? t.quoteForm.errors.failed
                      : Object.keys(errors).length > 0
                        ? t.quoteForm.errors.title
                        : ''}
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  'block w-full border border-line bg-surface/60 px-4 py-3.5 font-sans text-sm text-bone outline-none transition-colors duration-500 ease-lux placeholder:text-ash/45 focus:border-champagne/55 aria-[invalid=true]:border-champagne/70';

function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 font-sans text-xs text-champagne">
      {children}
    </p>
  );
}

/**
 * Renders the consent sentence with the two legal links spliced into the
 * {privacy} and {terms} slots, so every language keeps its own word order.
 */
function ConsentText({
  locale,
  consent,
}: {
  locale: string;
  consent: { text: string; privacy: string; terms: string };
}) {
  const linkClass =
    'link-underline text-bone transition-colors duration-400 ease-lux hover:text-white';

  const parts: Record<string, ReactNode> = {
    '{privacy}': (
      <Link href={`/${locale}/legal/privacy`} className={linkClass}>
        {consent.privacy}
      </Link>
    ),
    '{terms}': (
      <Link href={`/${locale}/legal/terms`} className={linkClass}>
        {consent.terms}
      </Link>
    ),
  };

  return (
    <>
      {consent.text.split(/(\{privacy\}|\{terms\})/g).map((segment, index) => (
        <Fragment key={index}>{parts[segment] ?? segment}</Fragment>
      ))}
    </>
  );
}
