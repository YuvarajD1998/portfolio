import { type MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

/**
 * Web app manifest (Sprint 01 §09 — favicon & social-preview placeholders).
 *
 * A minimal, on-brand manifest. Full icon sizes and screenshots are added when
 * real brand assets are produced; the structure is in place now.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.shortTitle,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F4',
    theme_color: '#FAF8F4',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
