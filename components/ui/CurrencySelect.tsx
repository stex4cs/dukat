'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { CURRENCIES, type CurrencyCode } from '@/lib/currencies';
import { cn } from '@/lib/utils';

/**
 * Listbox for the three supported currencies.
 *
 * A native <select> cannot be styled to match the rest of the widget, so this
 * implements the listbox pattern properly instead: roving focus with the
 * arrow keys, Home/End, Enter and Space to choose, Escape to dismiss, and
 * focus returned to the trigger afterwards.
 */
export function CurrencySelect({
  value,
  onChange,
  label,
  options = CURRENCIES,
  size = 'lg',
  className,
}: {
  value: CurrencyCode;
  onChange: (value: CurrencyCode) => void;
  label: string;
  options?: readonly CurrencyCode[];
  size?: 'lg' | 'sm';
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.indexOf(value)),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [open]);

  function choose(next: CurrencyCode) {
    onChange(next);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case 'Escape':
        if (open) {
          event.preventDefault();
          setOpen(false);
          buttonRef.current?.focus();
        }
        return;
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        if (!open) {
          setActiveIndex(Math.max(0, options.indexOf(value)));
          setOpen(true);
          return;
        }
        const step = event.key === 'ArrowDown' ? 1 : -1;
        setActiveIndex((index) =>
          (index + step + options.length) % options.length,
        );
        return;
      }
      case 'Home':
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        return;
      case 'End':
        if (open) {
          event.preventDefault();
          setActiveIndex(options.length - 1);
        }
        return;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (!open) {
          setActiveIndex(Math.max(0, options.indexOf(value)));
          setOpen(true);
          return;
        }
        const next = options[activeIndex];
        if (next) choose(next);
        return;
      }
      default:
    }
  }

  const large = size === 'lg';

  return (
    <div ref={rootRef} className={cn('relative', className)} onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={`${label}: ${value}`}
        onClick={() => {
          setActiveIndex(Math.max(0, options.indexOf(value)));
          setOpen((state) => !state);
        }}
        className={cn(
          'flex w-full items-center justify-between gap-3 border border-line bg-surface-raised/60 text-bone transition-colors duration-400 ease-lux hover:border-line-strong',
          large ? 'px-4 py-3 text-sm tracking-wider2' : 'px-3 py-2.5 text-xs tracking-wider2',
        )}
      >
        <span className="font-sans">{value}</span>
        <Chevron open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-label={label}
            aria-activedescendant={`${listboxId}-${activeIndex}`}
            tabIndex={-1}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 border border-line-strong bg-surface-raised shadow-lifted"
          >
            {options.map((option, index) => {
              const selected = option === value;
              return (
                <li
                  key={option}
                  id={`${listboxId}-${index}`}
                  role="option"
                  aria-selected={selected}
                  onClick={() => choose(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between px-4 py-3 font-sans text-xs tracking-wider2 transition-colors duration-200',
                    index === activeIndex ? 'bg-white/[0.05] text-bone' : 'text-ash',
                  )}
                >
                  {option}
                  {selected && (
                    <span aria-hidden="true" className="h-1 w-1 bg-champagne" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 8"
      aria-hidden="true"
      className={cn(
        'h-2 w-3 shrink-0 text-ash transition-transform duration-400 ease-lux',
        open && 'rotate-180',
      )}
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}
