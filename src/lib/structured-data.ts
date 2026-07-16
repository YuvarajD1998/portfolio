import { siteConfig } from '@/config/site';

/**
 * Structured-data (JSON-LD) helpers (Sprint 01 §09, Blueprint §15).
 *
 * Produces schema.org objects for embedding via a <script type="application/
 * ld+json">. Sprint 01 ships the Person graph the whole site shares; per-project
 * CreativeWork graphs arrive with the case study (later sprint).
 */

export interface JsonLd {
  '@context': 'https://schema.org';
  [key: string]: unknown;
}

/** The site owner as a schema.org Person. */
export function personJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };
}

/** Serialise a JSON-LD object for safe inlining in a script tag. */
export function serializeJsonLd(data: JsonLd): string {
  // Escape `<` to prevent breaking out of the <script> context.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
