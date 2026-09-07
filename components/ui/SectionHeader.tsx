import type { ReactNode } from 'react';
import { DisplayLines, Reveal } from './Reveal';
import { cn } from '@/lib/utils';

/**
 * The shared opening of every numbered section: index, eyebrow, headline.
 * Using one component keeps the vertical rhythm and the gold index identical
 * from the second section down to the FAQ.
 */
export function SectionHeader({
  index,
  eyebrow,
  lines,
  size = 'default',
  className,
  children,
}: {
  index: string;
  eyebrow: string;
  lines: readonly string[];
  size?: 'default' | 'large';
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn('max-w-4xl', className)}>
      <Reveal>
        <p className="flex items-center gap-4">
          <span className="font-sans text-micro tnum text-champagne">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-champagne/35" />
          <span className="eyebrow">{eyebrow}</span>
        </p>
      </Reveal>

      <h2
        className={cn(
          'display mt-8 uppercase text-bone',
          size === 'large'
            ? 'text-[clamp(2.25rem,7vw,5.5rem)]'
            : 'text-[clamp(1.9rem,5.2vw,4rem)]',
        )}
      >
        <DisplayLines lines={lines} delay={0.05} />
      </h2>

      {children}
    </div>
  );
}
