'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Engraved globe.
 *
 * Deliberately not the glowing-arc globe every exchange ships. This is drawn
 * the way a globe appears on a banknote or a share certificate: hairline
 * graticule, no fill, no gradient, no glow. The champagne routes draw
 * themselves one at a time over several seconds and fade out, rather than
 * pulsing all at once.
 *
 * Geometry is orthographic, viewed from the equator. Parallels project to
 * horizontal chords; meridians project to ellipses whose width sweeps as the
 * sphere turns (see .dk-meridian in globals.css).
 */

const R = 220;
const CX = 300;
const CY = 300;

/** Latitude chords: [y offset from centre, half-width]. */
const PARALLELS: Array<[number, number]> = [
  [0, 220],
  [75.2, 206.7],
  [-75.2, 206.7],
  [141.4, 168.5],
  [-141.4, 168.5],
  [190.5, 110],
  [-190.5, 110],
  [212.5, 56.9],
  [-212.5, 56.9],
];

/** Resting ellipse widths, R·|sin f| at 22.5° steps. */
const MERIDIANS = [84, 156, 203, 220, 203, 156, 84];

/** Points on the visible face, and the routes drawn between them. */
const NODES: Array<[number, number]> = [
  [245, 205],
  [370, 250],
  [200, 300],
  [300, 340],
  [395, 355],
  [270, 415],
];

const ROUTES = [
  'M245 205 Q390 230 395 355',
  'M200 300 Q280 215 370 250',
  'M270 415 Q185 315 245 205',
];

export function GlobeVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 600 600"
      role="presentation"
      aria-hidden="true"
      className={cn('pointer-events-none select-none', className)}
    >
      <defs>
        <clipPath id="dk-globe-clip">
          <circle cx={CX} cy={CY} r={R} />
        </clipPath>
      </defs>

      {/* Limb. */}
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.14"
      />

      <g clipPath="url(#dk-globe-clip)">
        {/* Parallels. */}
        <g stroke="#FFFFFF" strokeOpacity="0.07">
          {PARALLELS.map(([offset, halfWidth]) => (
            <line
              key={offset}
              x1={CX - halfWidth}
              y1={CY + offset}
              x2={CX + halfWidth}
              y2={CY + offset}
            />
          ))}
        </g>

        {/* Polar axis, always edge on. */}
        <line
          x1={CX}
          y1={CY - R}
          x2={CX}
          y2={CY + R}
          stroke="#FFFFFF"
          strokeOpacity="0.07"
        />

        {/* Meridians. */}
        <g fill="none" stroke="#FFFFFF" strokeOpacity="0.07">
          {MERIDIANS.map((rx, index) => (
            <ellipse
              key={index}
              cx={CX}
              cy={CY}
              rx={rx}
              ry={R}
              className={reduced ? undefined : 'dk-meridian'}
              style={
                reduced
                  ? undefined
                  : { animationDelay: `${-index * 9}s` }
              }
            />
          ))}
        </g>
      </g>

      {/* Nodes. Small diamonds, matching the separator motif used elsewhere. */}
      <g fill="#B89A5E" fillOpacity="0.55">
        {NODES.map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x - 2.5}
            y={y - 2.5}
            width="5"
            height="5"
            transform={`rotate(45 ${x} ${y})`}
          />
        ))}
      </g>

      {/* Routes: drawn, held, faded — one at a time. */}
      <g fill="none" stroke="#B89A5E" strokeWidth="1" strokeLinecap="round">
        {ROUTES.map((d, index) =>
          reduced ? (
            <path key={d} d={d} strokeOpacity="0.28" />
          ) : (
            <motion.path
              key={d}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.7, 0] }}
              transition={{
                duration: 11,
                times: [0, 0.35, 1],
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 5,
                delay: index * 5.5,
              }}
            />
          ),
        )}
      </g>
    </svg>
  );
}
