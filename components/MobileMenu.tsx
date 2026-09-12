'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { NAV_TARGETS } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { EASE_LUX } from '@/lib/utils';
import { LanguageRow } from './LanguageSwitcher';
import { Wordmark } from './Logo';
import { TelegramCta } from './ui/TelegramCta';
import { WhatsAppCta } from './ui/WhatsAppCta';

/**
 * Full-height navigation panel for small screens.
 *
 * Behaves like a dialog: the page behind it stops scrolling, focus moves in
 * and is kept inside while it is open, Escape closes it, and focus returns to
 * whatever opened it.
 *
 * It sits above the header rather than below it. Underneath, the header's
 * hamburger stayed on top of the panel's close button — a tap on the X landed
 * on the hamburger instead, and the menu could not be dismissed. Being above
 * also makes the dialog self-contained, so it carries its own wordmark rather
 * than relying on the header showing through.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.common.menu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_LUX }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur-xl lg:hidden"
        >
          <div className="flex h-[var(--dk-header-h)] shrink-0 items-center justify-between gap-6 px-6 sm:px-8">
            <Wordmark descriptor={t.common.descriptor} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.common.closeMenu}
              className="-mr-2 p-2 text-ash transition-colors duration-400 ease-lux hover:text-bone"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>

          <nav
            aria-label={t.nav.aria}
            className="flex flex-1 flex-col justify-center px-6 sm:px-8"
          >
            <ul className="flex flex-col gap-1">
              {t.nav.labels.map((label, index) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: EASE_LUX,
                    delay: 0.08 + index * 0.06,
                  }}
                  className="border-b border-line"
                >
                  <a
                    href={`#${NAV_TARGETS[index]}`}
                    onClick={onClose}
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="font-sans text-micro tnum text-champagne">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-2xl text-bone sm:text-3xl">
                      {label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 space-y-6 px-6 pb-10 sm:px-8">
            <div className="space-y-3">
              <TelegramCta label={t.common.telegram} className="w-full py-5" />
              <WhatsAppCta ariaLabel={t.common.whatsappAria} className="w-full" />
            </div>
            <div className="flex items-center justify-between">
              <span className="eyebrow">{t.common.language}</span>
              <LanguageRow onNavigate={onClose} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
