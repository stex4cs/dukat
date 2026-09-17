import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { LANDING_KEYS, LANDING_LOCALES, LANDING_SLUG } from '@/lib/landing';
import { alternatesFor, canonicalFor } from '@/lib/site';

/**
 * Bumped by hand when the page content actually changes. Using the build
 * date would tell search engines the page changed on every deploy.
 */
const LAST_MODIFIED = new Date('2026-09-07');

export default function sitemap(): MetadataRoute.Sitemap {
  const homepages = locales.map((locale) => ({
    url: canonicalFor(locale),
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 1 : 0.9,
    alternates: { languages: alternatesFor() },
  }));

  // Serbian search landing pages. They are kept out of the navigation, so the
  // sitemap and the footer are how Google reaches them.
  const landing = LANDING_LOCALES.flatMap((locale) =>
    LANDING_KEYS.map((key) => ({
      url: canonicalFor(locale, `/${LANDING_SLUG[locale][key]}`),
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          'sr-Latn': canonicalFor('sr', `/${LANDING_SLUG.sr[key]}`),
          ru: canonicalFor('ru', `/${LANDING_SLUG.ru[key]}`),
        },
      },
    })),
  );

  return [...homepages, ...landing];
}

