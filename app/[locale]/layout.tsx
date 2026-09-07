import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import '../globals.css';
import { getDictionary } from '@/lib/i18n';
import {
  defaultLocale,
  isLocale,
  locales,
  localeMeta,
  type Locale,
} from '@/lib/i18n/config';
import { alternatesFor, canonicalFor, SITE_URL } from '@/lib/site';
import { LocaleProvider } from '@/providers/locale';
import { QuoteDraftProvider } from '@/providers/quote-draft';

/**
 * Root layout. The app has no /app/layout.tsx on purpose: the locale segment
 * is the top of the tree, which lets <html lang> carry the real language
 * instead of a hard-coded default.
 */

const display = Playfair_Display({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500'],
});

const sans = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

/** Only the four known locales are served; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0A0A09',
  colorScheme: 'dark',
};

/**
 * Next types route params as plain strings, so each entry point narrows the
 * segment back to a Locale. `dynamicParams = false` means the fallback is
 * unreachable in practice; it exists to keep the type honest.
 */
function toLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: canonicalFor(locale),
      languages: alternatesFor(),
    },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/favicon.svg' }],
    },
    openGraph: {
      type: 'website',
      siteName: 'DUKAT',
      title: t.meta.title,
      description: t.meta.description,
      url: canonicalFor(locale),
      locale: localeMeta[locale].intl.replace('-', '_'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${display.variable} ${sans.variable}`}
    >
      <body className="bg-ink font-sans text-bone antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:border focus:border-champagne focus:bg-ink focus:px-5 focus:py-3 focus:font-sans focus:text-micro focus:uppercase focus:text-bone"
        >
          {dictionary.common.skipToContent}
        </a>

        <LocaleProvider locale={locale} dictionary={dictionary}>
          <QuoteDraftProvider>{children}</QuoteDraftProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
