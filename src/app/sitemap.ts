import { type MetadataRoute } from 'next';

import { allRoutePaths } from '@/config/navigation';
import { absoluteUrl } from '@/lib/seo';

/**
 * sitemap.xml (Sprint 03 §02).
 *
 * Generated from the single route model (`config/navigation`), so every route
 * that exists is listed and a new route appears here automatically. Dynamic
 * `/projects/[slug]` studies are added by a later sprint when their content
 * (and slugs) land. Home gets top priority; the rest inherit a sensible default.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return allRoutePaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
