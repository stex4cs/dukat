import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { alternatesFor, canonicalFor } from '@/lib/site';

/**
 * Bumped by hand when the page content actually changes. Using the build
 * date would tell search engines the page changed on every deploy.
 */
const LAST_MODIFIED = new Date('2026-09-07');

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: canonicalFor(locale),
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 1 : 0.9,
    alternates: { languages: alternatesFor() },
  }));
}

