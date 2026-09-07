'use client';

import { Fragment } from 'react';
import { useLocale } from '@/providers/locale';
import { Reveal } from './ui/Reveal';

/**
 * A statement of how the desk works, directly beneath the quote widget.
 * Deliberately holds no figures: no volumes, client counts, years or
 * certifications are claimed anywhere on this site.
 */
export function TrustStrip() {
  const { t } = useLocale();

  return (
    <section aria-label={t.trust.aria} className="border-y border-line bg-surface/40">
      <Reveal distance={12}>
        <ul className="shell grid grid-cols-2 gap-x-6 gap-y-5 py-8 sm:gap-x-10 lg:flex lg:items-center lg:justify-between lg:gap-x-6 lg:py-7">
          {t.trust.items.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && (
                <li
                  aria-hidden="true"
                  className="hidden h-[3px] w-[3px] rotate-45 bg-champagne/55 lg:block"
                />
              )}
              <li className="font-sans text-[0.625rem] uppercase leading-relaxed tracking-widest2 text-ash">
                {item}
              </li>
            </Fragment>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
