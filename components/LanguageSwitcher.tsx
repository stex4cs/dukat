'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LOCALE_COOKIE, locales, localeMeta, type Locale } from '@/lib/i18n/config';
import { useLocale } from '@/providers/locale';
import { cn } from '@/lib/utils';

/** Remembers the choice so the middleware honours it on the next visit. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
}

/** Swaps the locale segment while keeping the rest of the path intact. */
function useLocalisedPath() {
  const pathname = usePathname();
  return (next: Locale) => {
    const segments = pathname.split('/');
    segments[1] = next;
    const path = segments.join('/');
    return path.length > 1 ? path : `/${next}`;
  };
}

/** Compact popover used in the header. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathFor = useLocalisedPath();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t.common.language}: ${localeMeta[locale].native}`}
        onClick={() => setOpen((state) => !state)}
        className="flex items-center gap-2 px-2 py-2 font-sans text-micro uppercase text-ash transition-colors duration-400 ease-lux hover:text-bone"
      >
        {localeMeta[locale].short}
        <span
          aria-hidden="true"
          className={cn(
            'h-1 w-1 bg-champagne transition-transform duration-400 ease-lux',
            open && 'scale-150',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={t.common.language}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[9.5rem] border border-line-strong bg-surface-raised shadow-lifted"
          >
            {locales.map((option) => (
              <Link
                key={option}
                role="menuitem"
                href={pathFor(option)}
                hrefLang={localeMeta[option].htmlLang}
                onClick={() => {
                  rememberLocale(option);
                  setOpen(false);
                }}
                className={cn(
                  'flex items-center justify-between gap-6 px-4 py-3 font-sans text-xs transition-colors duration-200 hover:bg-white/[0.05]',
                  option === locale ? 'text-bone' : 'text-ash hover:text-bone',
                )}
              >
                <span>{localeMeta[option].native}</span>
                <span className="text-micro uppercase">{localeMeta[option].short}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Inline row used inside the mobile menu and the footer. */
export function LanguageRow({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const { locale } = useLocale();
  const pathFor = useLocalisedPath();

  return (
    <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      {locales.map((option) => (
        <li key={option}>
          <Link
            href={pathFor(option)}
            hrefLang={localeMeta[option].htmlLang}
            aria-current={option === locale ? 'true' : undefined}
            onClick={() => {
              rememberLocale(option);
              onNavigate?.();
            }}
            className={cn(
              'link-underline font-sans text-micro uppercase transition-colors duration-400 ease-lux',
              option === locale ? 'text-bone' : 'text-ash hover:text-bone',
            )}
            data-active={option === locale}
          >
            {localeMeta[option].short}
          </Link>
        </li>
      ))}
    </ul>
  );
}
