'use client';

import { animate, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EASE_LUX } from '@/lib/utils';

/**
 * Counts from the previous figure to the next one.
 *
 * The text is written straight to the DOM node rather than through React
 * state, so a rate change does not re-render the surrounding widget sixty
 * times a second. The initial value is captured once so React never fights
 * the animation over the same text node.
 */
export function AnimatedNumber({
  value,
  format,
  className,
  duration = 0.6,
}: {
  value: number;
  /** Must be referentially stable — wrap it in useCallback. */
  format: (value: number) => string;
  className?: string;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const nodeRef = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);
  const [initial] = useState(() => format(value));

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (reduced || previous.current === value) {
      node.textContent = format(value);
      previous.current = value;
      return;
    }

    const controls = animate(previous.current, value, {
      duration,
      ease: EASE_LUX,
      onUpdate: (current) => {
        node.textContent = format(current);
      },
      onComplete: () => {
        node.textContent = format(value);
      },
    });

    previous.current = value;
    return () => controls.stop();
  }, [value, format, reduced, duration]);

  return (
    <span ref={nodeRef} className={className}>
      {initial}
    </span>
  );
}
