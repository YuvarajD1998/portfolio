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
  /** Social profiles — the frozen contact facts (Content Bible P10A §07). */
  links: {
    github: 'https://github.com/YuvarajD1998',
    linkedin: 'https://www.linkedin.com/in/yuvarajd8892',
    email: 'mailto:yuviy0881@gmail.com',
  },
  /**
   * The frozen contact facts as their DISPLAY strings (Content Bible P10A §07),
   * single-sourced so the Contact, Resume and footer render the identical text.
   * The email/GitHub/LinkedIn/phone VALUES are frozen; whether the phone is
   * surfaced on the public page, and how, is the approved-design gap C2 governed
   * by `@/content/contact` — this only holds the fact, never the placement.
   */
  contact: {
    emailAddress: 'yuviy0881@gmail.com',
    githubHandle: 'github.com/YuvarajD1998',
    linkedinHandle: 'linkedin.com/in/yuvarajd8892',
    /** [FROZEN] the phone fact, tel: href + display (P10A §07). */
    phone: '+91 70266 72211',
    phoneHref: 'tel:+917026672211',
  },
} as const;

export type SiteConfig = typeof siteConfig;
