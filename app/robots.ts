import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The legal routes are noindex. They are deliberately NOT disallowed:
      // a blocked page can still be indexed URL-only, because the crawler
      // never fetches it and so never sees the noindex.
      disallow: ['/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
