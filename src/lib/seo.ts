import { type Metadata } from 'next';

import { siteConfig } from '@/config/site';

/**
 * SEO helpers (Sprint 01 §09, Blueprint §15).
 *
 * Centralises the Metadata API defaults so every route inherits canonical
 * URLs, Open Graph and Twitter cards without repeating boilerplate. Pages call
 * `buildMetadata()` in `generateMetadata`; the root layout uses
 * `defaultMetadata`. No page is built in Sprint 01 — this is the reusable
 * machinery pages will draw on.
 */

export interface PageSeo {
  title?: string;
  description?: string;
  /** Path (leading slash) this page canonicalises to. */
  path?: string;
  /** Override the OG image; defaults to the templated social preview. */
  ogImage?: string;
  /** Discourage indexing (e.g. drafts). */
  noindex?: boolean;
}

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

/** Build a route's Metadata, merging page overrides onto the site defaults. */
export function buildMetadata(seo: PageSeo = {}): Metadata {
  const title = seo.title ?? siteConfig.title;
  const description = seo.description ?? siteConfig.description;
  const canonical = absoluteUrl(seo.path ?? '/');
  const ogImage = seo.ogImage ?? absoluteUrl('/og/default.png');

  return {
    title,
    description,
    alternates: { canonical },
    robots: seo.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Root-level defaults for the layout. Adds `metadataBase` (so relative OG URLs
 * resolve) and a title template every page title slots into.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.shortTitle}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  ...buildMetadata(),
};
