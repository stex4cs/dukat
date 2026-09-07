/** Minimal class joiner — avoids pulling in a dependency for one function. */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

/** Clamps a number into a range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Shared easing curve. Slow out, no overshoot — restrained by design. */
export const EASE_LUX = [0.16, 1, 0.3, 1] as const;
