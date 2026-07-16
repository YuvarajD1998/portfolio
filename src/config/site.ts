import { env } from '@/config/env';

/**
 * Site-wide constants (Blueprint §10 — content lives apart from code).
 *
 * The single source for identity, authorship and social handles. Metadata,
 * JSON-LD and OG defaults all read from here so a change lands in one place.
 * Values reflect the Design Bible owner (Yuvaraj — Senior Frontend /
 * Full-Stack Engineer).
 */
export const siteConfig = {
  name: 'Yuvaraj',
  title: 'Yuvaraj — Senior Frontend / Full-Stack Engineer',
  shortTitle: 'Yuvaraj',
  description:
    'Portfolio of Yuvaraj, a senior frontend and full-stack engineer who builds enterprise-grade AI products — from pixel to architecture.',
  role: 'Senior Frontend / Full-Stack Engineer',
  url: env.siteUrl,
  locale: 'en_US',
  /** Flagship case study (Design Bible). */
  flagship: 'Transpahire',
  /** Social profiles — placeholders until real handles are supplied. */
  links: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:hello@example.com',
  },
} as const;

export type SiteConfig = typeof siteConfig;
