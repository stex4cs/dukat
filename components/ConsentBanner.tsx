'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from '@/providers/locale';
import { useConsent } from '@/providers/consent';
import { EASE_LUX } from '@/lib/utils';

/**
 * Cookie choice, shown only where the law requires asking first.
 *
 * Accept and Decline are drawn identically and sit side by side. A refusal
 * that is smaller, greyer or one click further away than acceptance is the
 * specific pattern European regulators have fined over, so the two are
 * deliberately indistinguishable apart from their labels.
 *
 * It renders nothing until the region and any stored choice are known, which
 * keeps it from flashing at visitors who will never need to see it.
 */
export function ConsentBanner() {
  const { t, locale } = useLocale();
  const { consent, required, ready, decide } = useConsent();
  const reduced = useReducedMotion();

  const open = ready && required && consent === null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label={t.consent.aria}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE_LUX }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/95 backdrop-blur-xl"
        >
          <div className="shell flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <p className="max-w-2xl font-sans text-xs leading-relaxed text-ash">
              {t.consent.text}{' '}
              <Link
                href={`/${locale}/legal/privacy`}
                className="link-underline text-bone transition-colors duration-400 ease-lux hover:text-white"
              >
                {t.consent.policy}
              </Link>
            </p>

            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => decide('granted')}
                className="flex-1 whitespace-nowrap border border-line-strong px-7 py-3 font-sans text-[0.625rem] uppercase tracking-widest2 text-bone transition-colors duration-400 ease-lux hover:border-champagne/55 hover:text-white lg:flex-none"
              >
                {t.consent.accept}
              </button>
              <button
                type="button"
                onClick={() => decide('denied')}
                className="flex-1 whitespace-nowrap border border-line-strong px-7 py-3 font-sans text-[0.625rem] uppercase tracking-widest2 text-bone transition-colors duration-400 ease-lux hover:border-champagne/55 hover:text-white lg:flex-none"
              >
                {t.consent.reject}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Footer control that reopens the choice, for anyone, anywhere. */
export function ConsentReopen({ className }: { className?: string }) {
  const { t } = useLocale();
  const { reopen } = useConsent();

  return (
    <button type="button" onClick={reopen} className={className}>
      {t.consent.manage}
    </button>
  );
}
