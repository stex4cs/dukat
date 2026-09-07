import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Legal routes are placeholders until DUKAT supplies the text.
      disallow: ['/api/', '/*/legal/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
