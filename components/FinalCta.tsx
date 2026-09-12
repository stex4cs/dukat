'use client';

import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { DisplayLines, Reveal } from './ui/Reveal';
import { TelegramCta } from './ui/TelegramCta';
import { WhatsAppCta } from './ui/WhatsAppCta';

/**
 * Closing statement. The only centred composition on the page, so it reads as
 * an ending rather than another section.
 */
export function FinalCta() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden border-t border-line py-32 lg:py-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(circle, rgba(184,154,94,0.10) 0%, rgba(184,154,94,0.03) 45%, transparent 72%)',
        }}
      />

      <div className="shell relative flex flex-col items-center text-center">
        <h2 className="display text-[clamp(2.75rem,10vw,8rem)] uppercase text-bone">
          <DisplayLines lines={t.finalCta.headline} />
        </h2>

        <Reveal delay={0.24} className="mt-10">
          <p className="max-w-md font-sans text-sm leading-relaxed text-ash sm:text-base">
            {t.finalCta.body}
          </p>
        </Reveal>

        <Reveal delay={0.34} className="mt-12 flex flex-col items-center">
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-stretch">
            <TelegramCta label={t.common.telegram} size="large" />
            <WhatsAppCta ariaLabel={t.common.whatsappAria} size="large" />
          </div>
          <a
            href={`#${SECTION.quote}`}
            className="link-underline mt-8 font-sans text-micro uppercase text-ash transition-colors duration-400 ease-lux hover:text-bone"
          >
            {t.finalCta.secondary}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
