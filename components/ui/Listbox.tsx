'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

export type ListboxOption<T extends string> = { value: T; label: string };

/**
 * Accessible listbox.
 *
 * A native <select> cannot be styled to match the rest of the form, so this
 * implements the pattern properly: roving focus with the arrow keys, Home and
 * End, Enter and Space to choose, Escape to dismiss, focus returned to the
 * trigger, and the active option kept scrolled into view for longer lists.
 */
export function Listbox<T extends string>({
  value,
  onChange,
  options,
  label,
  size = 'lg',
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<ListboxOption<T>>;
  label: string;
  size?: 'lg' | 'sm';
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const selected = options[selectedIndex];

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

  // Keeps the highlighted option visible when the list is taller than its box.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  function choose(next: T) {
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
          setActiveIndex(selectedIndex);
          setOpen(true);
          return;
        }
        const step = event.key === 'ArrowDown' ? 1 : -1;
        setActiveIndex((index) => (index + step + options.length) % options.length);
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
          setActiveIndex(selectedIndex);
          setOpen(true);
          return;
        }
        const next = options[activeIndex];
        if (next) choose(next.value);
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
        aria-label={`${label}: ${selected?.label ?? ''}`}
        onClick={() => {
          setActiveIndex(selectedIndex);
          setOpen((state) => !state);
        }}
        className={cn(
          'flex w-full items-center justify-between gap-3 border border-line bg-surface-raised/60 text-left text-bone transition-colors duration-400 ease-lux hover:border-line-strong',
          large ? 'px-4 py-3 text-sm tracking-wider2' : 'px-3 py-2.5 text-xs tracking-wider2',
        )}
      >
        <span className="truncate font-sans">{selected?.label}</span>
        <Chevron open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={label}
            aria-activedescendant={`${listboxId}-${activeIndex}`}
            tabIndex={-1}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-64 overflow-y-auto border border-line-strong bg-surface-raised shadow-lifted"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  id={`${listboxId}-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => choose(option.value)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-3 px-4 py-3 font-sans text-xs tracking-wider2 transition-colors duration-200',
                    index === activeIndex ? 'bg-white/[0.05] text-bone' : 'text-ash',
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-champagne" />
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
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
