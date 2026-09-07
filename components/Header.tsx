'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_TARGETS } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { Wordmark } from './Logo';
import { TelegramCta } from './ui/TelegramCta';

/**
 * Sticky header. Transparent over the hero, then settles into a blurred dark
 * surface with a hairline once the page moves. A champagne progress line sits
 * on that hairline — the only permanently visible gold on the page.
 */
export function Header() {
  const { locale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-lux',
          scrolled ? 'bg-ink/72 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div className="shell flex h-[var(--dk-header-h)] items-center justify-between gap-6">
          <Link
            href={`/${locale}`}
            aria-label={`DUKAT ${t.common.descriptor}`}
            className="shrink-0"
          >
            <Wordmark descriptor={t.common.descriptor} />
          </Link>

          <nav aria-label={t.nav.aria} className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {t.nav.labels.map((label, index) => (
                <li key={label}>
                  <a
                    href={`#${NAV_TARGETS[index]}`}
                    className="link-underline font-sans text-[0.6875rem] uppercase tracking-widest2 text-ash transition-colors duration-400 ease-lux hover:text-bone"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher className="hidden sm:block" />

            <TelegramCta
              label={t.common.telegram}
              size="compact"
              className="hidden lg:inline-flex"
            />

            <button
              type="button"
              aria-label={t.common.openMenu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="-mr-2 flex h-10 w-10 items-center justify-center text-bone lg:hidden"
            >
              <svg viewBox="0 0 22 12" className="h-3 w-6" aria-hidden="true">
                <path d="M0 1H22M0 11H14" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={cn(
            'relative h-px w-full transition-colors duration-700 ease-lux',
            scrolled ? 'bg-line' : 'bg-transparent',
          )}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-full origin-left bg-champagne/60"
            style={{ scaleX: progress }}
          />
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
