import { cn } from '@/lib/utils';

/**
 * DUKAT monogram — a geometric D built from a stem and two concentric arcs.
 *
 * Drawn in `currentColor` with no fills or gradients, so the same mark works
 * reversed out of the dark ground, embossed on card stock, foiled in gold, or
 * reduced to a 16px favicon without redrawing.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('h-full w-full', className)}
    >
      <path
        d="M13 7V33"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
      <path
        d="M13 7A13 13 0 0 1 13 33"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
      <path
        d="M13 12.5A7.5 7.5 0 0 1 13 27.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.4"
      />
    </svg>
  );
}

/**
 * Full brand lockup. The descriptor stays in English in every locale: it is
 * part of the mark rather than copy.
 */
export function Wordmark({
  descriptor,
  className,
  compact = false,
}: {
  descriptor: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <Monogram
        className={cn(
          'shrink-0 text-champagne',
          compact ? 'h-7 w-7' : 'h-8 w-8 lg:h-9 lg:w-9',
        )}
      />
      <span className="flex flex-col justify-center leading-none">
        <span
          className={cn(
            'font-display tracking-[0.18em] text-bone',
            compact ? 'text-lg' : 'text-xl lg:text-[1.4rem]',
          )}
        >
          DUKAT
        </span>
        <span className="mt-[0.35em] font-sans text-[0.5rem] uppercase tracking-widest3 text-ash">
          {descriptor}
        </span>
      </span>
    </span>
  );
}
