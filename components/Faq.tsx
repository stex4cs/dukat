'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useId, useState } from 'react';
import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { EASE_LUX, cn } from '@/lib/utils';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

/**
 * Accordion. One panel open at a time, headings are real headings, and each
 * trigger owns its panel through aria-controls, so the section reads
 * correctly with a screen reader as well as with a mouse.
 *
 * Answers that would require regulatory or business-specific detail carry
 * bracketed placeholders rather than an invented answer.
 */
export function Faq() {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const ids = useId();

  return (
    <section id={SECTION.faq} className="border-t border-line bg-surface/30">
      <div className="shell py-28 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <SectionHeader
            index="06"
            eyebrow={t.faq.eyebrow}
            lines={t.faq.headline}
            className="lg:col-span-4"
          />

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-line">
              {t.faq.items.map((item, index) => {
                const open = openIndex === index;
                const panelId = `${ids}-panel-${index}`;
                const buttonId = `${ids}-button-${index}`;

                return (
                  <li key={item.q} className="border-b border-line">
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(open ? null : index)}
                        className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                      >
                        <span
                          className={cn(
                            'font-display text-lg leading-snug transition-colors duration-500 ease-lux sm:text-xl',
                            open ? 'text-bone' : 'text-bone/75 group-hover:text-bone',
                          )}
                        >
                          {item.q}
                        </span>
                        <span
                          aria-hidden="true"
                          className="relative mt-2 h-3 w-3 shrink-0"
                        >
                          <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-champagne" />
                          <span
                            className={cn(
                              'absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-champagne transition-transform duration-500 ease-lux',
                              open ? 'scale-y-0' : 'scale-y-100',
                            )}
                          />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduced ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: EASE_LUX }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-prose2 pb-8 pr-8 font-sans text-sm leading-relaxed text-ash">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
