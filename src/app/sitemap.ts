import { type MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

/**
 * sitemap.xml — placeholder (Sprint 01 §09).
 *
 * Sprint 01 ships no portfolio pages, so the sitemap lists only the root. As
 * pages land, each sprint adds its routes here (and dynamic project slugs are
 * generated from content). The machinery is in place; the entries are not yet.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
