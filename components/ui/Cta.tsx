'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary';

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  /** Pointer-following displacement. Reserved for the leading action. */
  magnetic?: boolean;
  className?: string;
};

type AnchorProps = SharedProps & {
  href: string;
  onClick?: () => void;
  type?: never;
  disabled?: never;
};

type ButtonProps = SharedProps & {
  href?: undefined;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

/*
 * No `whitespace-nowrap`: the label is translated, and the longest of them
 * ("Запросить частную котировку", "Privates Angebot anfragen") does not fit
 * a phone-width form. Nowrap made the button push the whole document 10px
 * wider instead of wrapping.
 */
const BASE =
  'group relative inline-flex items-center justify-center gap-3 text-balance px-6 py-4 text-center font-sans text-[0.6875rem] uppercase leading-relaxed tracking-widest2 transition-colors duration-500 ease-lux sm:px-7 disabled:cursor-not-allowed disabled:opacity-50';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-bone text-ink hover:bg-white',
  secondary: 'border border-line text-bone hover:border-champagne/55 hover:text-white',
};

/**
 * The site has exactly two button treatments. Primary is a solid bone plate
 * against the near-black ground; secondary is a hairline outline. Champagne
 * appears only as the offset frame that eases in on hover, which keeps the
 * gold to a few pixels per screen.
 */
export function Cta(props: AnchorProps | ButtonProps) {
  const { children, variant = 'primary', magnetic = false, className } = props;
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.35 });

  const active = magnetic && !reduced;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!active || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.16);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -inset-px border opacity-0 transition-all duration-500 ease-lux',
          'group-hover:-inset-[5px] group-hover:opacity-100 group-focus-visible:-inset-[5px] group-focus-visible:opacity-100',
          variant === 'primary' ? 'border-champagne/45' : 'border-champagne/30',
        )}
      />
    </>
  );

  const classes = cn(BASE, VARIANTS[variant], className);
  const motionStyle = active ? { x: springX, y: springY } : undefined;

  if (props.href !== undefined) {
    return (
      <motion.a
        href={props.href}
        onClick={props.onClick}
        className={classes}
        style={motionStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
      style={motionStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {content}
    </motion.button>
  );
}
