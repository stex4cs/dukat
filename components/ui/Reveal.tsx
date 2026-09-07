'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE_LUX, cn } from '@/lib/utils';

const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const;

const LINE_VARIANTS = {
  hidden: { y: '118%' },
  visible: { y: '0%' },
} as const;

/**
 * Fade and lift on first entry. One shared curve and duration is used across
 * the whole page so the motion reads as a single system rather than a set of
 * individual effects.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE_LUX, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial line reveal for display headlines: each line rises out of its own
 * clipping box. The vertical padding keeps accents and descenders — Ü, č, ц,
 * y — inside the clip once the line has settled.
 *
 * The viewport observer sits on the clipping wrapper, not on the line itself.
 * IntersectionObserver intersects a target against its ancestors' overflow
 * clips, and the line starts translated fully outside that clip, so observing
 * it directly would report it as permanently off-screen and it would never
 * animate. The wrapper triggers, and variants carry the state to the line.
 */
export function DisplayLines({
  lines,
  delay = 0,
  stagger = 0.085,
  className,
}: {
  lines: readonly string[];
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <>
      {lines.map((line, index) => (
        <motion.span
          key={line + index}
          className={cn(
            'block overflow-hidden py-[0.14em] -my-[0.14em]',
            className,
          )}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={VIEWPORT}
        >
          <motion.span
            className="block"
            variants={LINE_VARIANTS}
            transition={{
              duration: 1.05,
              ease: EASE_LUX,
              delay: delay + index * stagger,
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </>
  );
}

/** A hairline that draws itself in when it enters the viewport. */
export function DrawRule({
  className,
  delay = 0,
  vertical = false,
}: {
  className?: string;
  delay?: number;
  vertical?: boolean;
}) {
  const reduced = useReducedMotion();
  const axis = vertical ? 'scaleY' : 'scaleX';

  return (
    <motion.span
      aria-hidden="true"
      className={cn('block bg-line', vertical ? 'w-px' : 'h-px', className)}
      style={{ transformOrigin: vertical ? 'top' : 'left' }}
      initial={reduced ? undefined : { [axis]: 0 }}
      whileInView={reduced ? undefined : { [axis]: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EASE_LUX, delay }}
    />
  );
}
