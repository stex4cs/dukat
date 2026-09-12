'use client';

import Link from 'next/link';
import { CONTACT, COPYRIGHT_YEAR } from '@/lib/contact';
import { FOOTER_NAV_TARGETS, LEGAL_DOCS, SECTION } from '@/lib/sections';
import type { ContactPoint } from '@/lib/contact';
import { useLocale } from '@/providers/locale';
import { LanguageRow } from './LanguageSwitcher';
import { Wordmark } from './Logo';

export function Footer() {
  const { locale, t } = useLocale();

  return (
    <footer id={SECTION.contact} className="border-t border-line bg-surface/40">
      <div className="shell py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Wordmark descriptor={t.common.descriptor} />
          </div>

          <nav aria-label={t.footer.navHeading} className="lg:col-span-2">
            <h2 className="eyebrow">{t.footer.navHeading}</h2>
            <ul className="mt-6 space-y-3">
              {t.footer.navLabels.map((label, index) => (
                <li key={label}>
                  <a
                    href={`#${FOOTER_NAV_TARGETS[index]}`}
                    className="link-underline font-sans text-sm text-ash transition-colors duration-400 ease-lux hover:text-bone"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.legalHeading} className="lg:col-span-2">
            <h2 className="eyebrow">{t.footer.legalHeading}</h2>
            <ul className="mt-6 space-y-3">
              {t.footer.legalLabels.map((label, index) => (
                <li key={label}>
                  <Link
                    href={`/${locale}/legal/${LEGAL_DOCS[index]}`}
                    className="link-underline font-sans text-sm text-ash transition-colors duration-400 ease-lux hover:text-bone"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="eyebrow">{t.footer.contactHeading}</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <ContactValue label={t.footer.telegram} point={CONTACT.telegram} />
              </li>
              <li>
                <ContactValue label={t.footer.whatsapp} point={CONTACT.whatsapp} />
              </li>
              <li>
                <ContactValue label={t.footer.email} point={CONTACT.email} />
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow">{t.footer.languageHeading}</h2>
            <LanguageRow className="mt-6" />
          </div>
        </div>

        <div className="mt-20 border-t border-line pt-10">
          <p className="max-w-4xl font-sans text-xs leading-relaxed text-ash">
            {t.footer.disclaimer}
          </p>
          <p className="mt-8 font-sans text-micro uppercase text-ash">
            © {COPYRIGHT_YEAR} DUKAT. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Renders a contact point as a link only once a real destination exists.
 * While the value is a placeholder it stays plain text rather than shipping
 * an anchor that goes nowhere.
 */
function ContactValue({ label, point }: { label: string; point: ContactPoint }) {
  return (
    <span className="block">
      <span className="block font-sans text-micro uppercase text-ash/70">{label}</span>
      {point.href ? (
        <a
          href={point.href}
          className="link-underline mt-1 block font-sans text-sm text-bone transition-colors duration-400 ease-lux hover:text-white"
        >
          {point.label}
        </a>
      ) : (
        <span className="mt-1 block font-sans text-sm text-ash">{point.label}</span>
      )}
    </span>
  );
}
