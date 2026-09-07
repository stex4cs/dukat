'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { PointerEvent } from 'react';
import { telegramLink } from '@/lib/telegram';
import { cn } from '@/lib/utils';

/**
 * The desk button.
 *
 * Telegram is where pricing actually happens, so this is the strongest
 * element on any screen it appears on. It keeps the site palette rather than
 * Telegram blue — the glyph carries the recognition, and brand blue on this
 * ground would read as a widget rather than as the desk.
 */
export function TelegramCta({
  label,
  draft,
  size = 'default',
  className,
}: {
  label: string;
  /** Pre-entered into the Telegram input bar. The visitor still presses send. */
  draft?: string;
  size?: 'default' | 'large' | 'compact';
  className?: string;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.35 });
  const magnetic = size !== 'compact' && !reduced;

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (!magnetic || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.1);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.22);
  }

  return (
    <motion.a
      href={telegramLink(draft)}
      target="_blank"
      rel="noopener noreferrer"
      style={magnetic ? { x: springX, y: springY } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-3 bg-bone font-sans uppercase tracking-widest2 text-ink transition-colors duration-500 ease-lux hover:bg-white',
        size === 'large' && 'px-10 py-6 text-xs sm:px-14 sm:py-7 sm:text-sm',
        size === 'default' && 'px-7 py-4 text-[0.6875rem]',
        size === 'compact' && 'px-5 py-3 text-[0.625rem]',
        className,
      )}
    >
      <TelegramGlyph
        className={cn(
          'relative z-10 shrink-0 transition-transform duration-500 ease-lux group-hover:translate-x-0.5',
          size === 'large' ? 'h-5 w-5' : 'h-3.5 w-3.5',
        )}
      />
      <span className="relative z-10">{label}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px border border-champagne/45 opacity-0 transition-all duration-500 ease-lux group-hover:-inset-[6px] group-hover:opacity-100 group-focus-visible:-inset-[6px] group-focus-visible:opacity-100"
      />
    </motion.a>
  );
}

function TelegramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.94 4.3 18.9 19.06c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.78 8.7-7.86c.38-.34-.08-.53-.59-.19L6.98 13.1 2.34 11.65c-1.01-.32-1.03-1.01.21-1.5l18.14-6.99c.84-.31 1.57.19 1.25 1.14Z" />
    </svg>
  );
}
