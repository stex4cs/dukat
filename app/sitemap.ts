import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { alternatesFor, canonicalFor } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: canonicalFor(locale),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 1 : 0.9,
    alternates: { languages: alternatesFor() },
  }));
}

