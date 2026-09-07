'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * The hero geometry.
 *
 * An architectural reading of a struck coin: concentric rules, a milled edge
 * of fine ticks, and the DUKAT arc drawn at scale. Everything is stroke work
 * on the page background — no photography, no fills, no coin.
 *
 * Motion is limited to one rotation measured in minutes and a reflection that
 * crosses the disc every few seconds. Both stop entirely under
 * prefers-reduced-motion.
 */
export function HeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const spin = { transformBox: 'view-box', transformOrigin: '300px 300px' } as const;

  return (
    <svg
      viewBox="0 0 600 600"
      role="presentation"
      aria-hidden="true"
      className={cn('pointer-events-none select-none', className)}
    >
      <defs>
        <radialGradient id="dk-glow" cx="50%" cy="45%" r="52%">
          <stop offset="0%" stopColor="#B89A5E" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#B89A5E" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#B89A5E" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="dk-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F1EEE6" stopOpacity="0" />
          <stop offset="45%" stopColor="#F1EEE6" stopOpacity="0.10" />
          <stop offset="55%" stopColor="#C9AE78" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#F1EEE6" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="dk-grid-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        <mask id="dk-grid-mask">
          <rect width="600" height="600" fill="url(#dk-grid-fade)" />
        </mask>

        <mask id="dk-disc-mask">
          <circle cx="300" cy="300" r="212" fill="#fff" />
        </mask>
      </defs>

      <circle cx="300" cy="300" r="290" fill="url(#dk-glow)" />

      {/* Fine financial grid, dissolving at the edges. */}
      <g mask="url(#dk-grid-mask)" stroke="#FFFFFF" strokeOpacity="0.045" strokeWidth="1">
        {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((offset) => (
          <line key={`v${offset}`} x1={offset} y1="0" x2={offset} y2="600" />
        ))}
        {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((offset) => (
          <line key={`h${offset}`} x1="0" y1={offset} x2="600" y2={offset} />
        ))}
      </g>

      {/* Concentric rules. */}
      <g fill="none" stroke="#FFFFFF" strokeOpacity="0.1">
        <circle cx="300" cy="300" r="212" />
        <circle cx="300" cy="300" r="176" strokeOpacity="0.06" />
        <circle cx="300" cy="300" r="118" strokeOpacity="0.05" />
      </g>

      {/* Milled edge. One slow rotation, roughly three minutes. */}
      <motion.g
        style={spin}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={
          reduced ? undefined : { duration: 190, repeat: Infinity, ease: 'linear' }
        }
      >
        <circle
          cx="300"
          cy="300"
          r="196"
          fill="none"
          stroke="#B89A5E"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="1 13"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Counter-rotating quadrant marks. */}
      <motion.g
        style={spin}
        animate={reduced ? undefined : { rotate: -360 }}
        transition={
          reduced ? undefined : { duration: 320, repeat: Infinity, ease: 'linear' }
        }
      >
        <circle
          cx="300"
          cy="300"
          r="240"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.09"
          strokeWidth="1"
          strokeDasharray="34 344"
          strokeDashoffset="17"
        />
      </motion.g>

      {/* The DUKAT arc, drawn at architectural scale. */}
      <g fill="none" strokeLinecap="square">
        <path d="M243 168V432" stroke="#F1EEE6" strokeOpacity="0.5" strokeWidth="1.5" />
        <path
          d="M243 168A132 132 0 0 1 243 432"
          stroke="#F1EEE6"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <path
          d="M243 213A87 87 0 0 1 243 387"
          stroke="#B89A5E"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
      </g>

      {/* Champagne reflection crossing the disc. */}
      {!reduced && (
        <g mask="url(#dk-disc-mask)">
          <motion.rect
            x="-260"
            y="60"
            width="220"
            height="480"
            fill="url(#dk-sheen)"
            transform="rotate(14 300 300)"
            animate={{ x: [-260, 640] }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              repeatDelay: 6,
              ease: 'easeInOut',
            }}
          />
        </g>
      )}
    </svg>
  );
}
