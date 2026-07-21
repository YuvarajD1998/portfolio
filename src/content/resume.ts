/**
 * Resume / CV-page content — the frozen, forwardable summary record (Sprint 11).
 *
 * Content lives apart from code (Blueprint §10). Every visible string on the
 * Resume page is declared here, drawn from an approved source, so the feature
 * components hold layout only and never a literal (S11 §01 RULE).
 *
 * PROVENANCE — the approved phases are the single source of truth, and the
 * Resume page is the one page most at risk of CONTENT DRIFT (S11 §08). So rather
 * than re-declare facts, this module RE-USES the same frozen exports the
 * About / Experience / Skills pages render, so a fact stated here and there
 * resolves to the SAME source string (S11 §08 RULE):
 *   - Employment history, education & certifications  → `@/content/experience`
 *     (Book A career record, verified vs. the Résumé — S09).
 *   - The skills snapshot technology set               → `@/content/skills`
 *     (Book A §06 categories — S10).
 *   - Identity, contact facts & site metadata          → `@/config/site`,
 *     `@/config/navigation` (Content Bible P10A §04/§07).
 *
 * The Resume page occupies the SUMMARY altitude (S11 §00 NOTE): the fewest facts
 * a hiring decision needs, plus the downloadable document. It is NOT the About
 * page (S05), the Experience page (S09, which owns the full chronology), or the
 * Skills page (S10, which owns the categorized capability). Where it names a
 * role, project or skill it CONDENSES and LINKS OUT to the owning page — it never
 * re-tells it (S11 governing principle).
 *
 * The freeze is absolute (S11 governing principle): this file REWRITES no
 * summary, CHANGES no employment date/title/company, MODIFIES no education
 * detail, ADDS no certification, EXPANDS no achievement, INVENTS no skill and
 * REORDERS no section beyond the approved IA. Where a fact is not on the record —
 * the exact frozen summary string (C1), certification issuers/dates (C2), the
 * résumé file & version (C3), final CTA microcopy — it is listed in `blockers` as
 * an OPEN change request (Content Required) and surfaced honestly on the page,
 * never fabricated in code (S11 §16; CLAUDE.md golden rule).
 */

import { routes } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { education as experienceEducation, roles } from '@/content/experience';
import { certifications as skillsCertifications } from '@/content/skills';

/* ========================================================================== *
 * §03 — Hero & download CTA (identity + the download, up front)
 * ========================================================================== */

/**
 * Hero & download CTA (S11 §03). Names the person and offers the download
 * immediately — the button lives in the hero so a hurried reader never has to
 * scroll to find it (S11 §03). The intro is confident but honest: the frozen
 * title and the 4+ years figure, no inflation (S11 §03 RULE, P10A tone). The
 * page title is the page's single <h1>.
 */
export const hero = {
  eyebrow: 'Résumé',
  /** The page's single <h1> — the page title the Content Bible names (S11 §03). */
  title: 'Résumé',
  /** [FROZEN] the fixed professional identity line (P10A §04). */
  positioning: 'Senior Frontend / Full-Stack Developer · Bengaluru, India',
  intro:
    'The whole case, on one page — a quick, downloadable summary of the ' +
    'qualifications for a reader who is validating and forwarding, not ' +
    'exploring. Scan it in ninety seconds, download the latest résumé, and ' +
    'follow the links out to the pages that carry the depth.',
  /** [FROZEN] identity chips, each a fact — Book A §04 (S11 §03). */
  chips: [
    'Yuvaraj D',
    'Senior Frontend / Full-Stack Developer',
    'Bengaluru, India',
    '4+ years',
  ],
} as const;

/* ========================================================================== *
 * §04 — Professional summary (who this engineer is, in a few lines)
 * ========================================================================== */

/**
 * Professional summary (S11 §04). A short, high-signal executive summary — a
 * condensed statement of the professional identity, not a full biography (that
 * lives on the About page, S05). The wording is a faithful CONDENSATION of the
 * frozen profile facts in Book A; the EXACT frozen summary string is Content
 * Required (blocker C1) — this is reconciled against Book A & the Résumé before
 * ship, never rewritten for style and never carrying a claim the résumé does not
 * (S11 §04 HONEST).
 */
export const summary = {
  eyebrow: 'Professional summary',
  title: 'Who this engineer is, in a few lines.',
  /** C1 interim — a condensation of the frozen profile facts, reconciled before ship. */
  body:
    'A Senior Frontend / Full-Stack Developer based in Bengaluru with 4+ years ' +
    'building production web applications — a front-end specialist turned ' +
    'full-stack engineer owning React & TypeScript interfaces alongside NestJS ' +
    'and FastAPI services, authentication, multi-tenant RBAC, ' +
    'internationalization, real-time features and AI-powered recruitment ' +
    'workflows.',
  /** [FROZEN-derived] the core stack line (Book A §04). */
  coreStack: ['React', 'TypeScript', 'FastAPI', 'NestJS', 'Python'],
} as const;

/* ========================================================================== *
 * §05 — Résumé highlights (the headline facts, scannable)
 * ========================================================================== */

/**
 * Résumé highlights (S11 §05). The headline facts a recruiter reads at a glance —
 * years of experience, specialization, industries, core competencies and one
 * notable accomplishment. Only accomplishments already on the record appear; the
 * accomplishment tile stays QUALITATIVE where a number is not on the frozen
 * record — any additional metric is a change request (S11 §05 RULE). The "45
 * days" migration figure IS a frozen fact (`@/content/experience`), so it is
 * safe to state; nothing here is embellished beyond what the résumé carries.
 */
export const highlights = {
  eyebrow: 'Résumé highlights',
  title: 'The headline facts, scannable.',
  lead:
    'The qualifications made scannable — each a fact from the record, none ' +
    'expanded or invented.',
  items: [
    {
      id: 'experience',
      label: 'Experience',
      value: '4+ years',
      detail: 'React & full-stack, production',
    },
    {
      id: 'specialization',
      label: 'Specialization',
      value: 'Frontend & full-stack engineering',
    },
    {
      id: 'industries',
      label: 'Industries',
      value: 'Recruitment / HR-tech, banking',
    },
    {
      id: 'competencies',
      label: 'Core competencies',
      value: 'React · TypeScript · NestJS · FastAPI · Python · AI & real-time',
    },
  ],
  /**
   * The notable-accomplishment tile (S11 §05). Qualitative, drawn from the frozen
   * career record; the detail lives on the Experience & Projects pages.
   */
  accomplishment: {
    label: 'Notable accomplishment',
    body:
      'Led a legacy → React SPA migration and shipped AI-powered recruitment ' +
      'workflows and a POM-based automation framework at BlueRose — details on ' +
      'the Experience & Projects pages.',
    href: routes.experience.href,
    linkLabel: 'See the experience',
  },
} as const;

/* ========================================================================== *
 * §06 — Employment summary (each role, in a few lines)
 * ========================================================================== */

/**
 * Employment summary (S11 §06). A concise overview of each role — company,
 * position, duration and ONE high-level responsibility line — deliberately
 * shorter than the Experience page (S09), which owns the full chronology. The
 * company names, titles and dates are re-used VERBATIM from the frozen career
 * record (`roles`, `@/content/experience`) so the two pages can never diverge
 * (S11 §06 HONEST, §08 RULE); the responsibility summary adds no new
 * responsibility. Each links out to `/experience` for the detail.
 */
/**
 * The two frozen roles, destructured with a guard so indexed access is typed as
 * present (the repo enables `noUncheckedIndexedAccess`). The career record is a
 * fixed 2-role const; if that ever changes, this fails loudly at module load
 * rather than silently rendering `undefined` (CLAUDE.md golden rule — surface a
 * gap, never paper over it).
 */
const [currentRole, previousRole] = roles;
if (!currentRole || !previousRole) {
  throw new Error(
    'resume.ts: expected the two frozen career roles to be present.',
  );
}

export const employment = {
  eyebrow: 'Employment summary',
  title: 'Each role, in a few lines.',
  lead:
    'A summary, not the full chronology — company, position, duration and a ' +
    'high-level responsibility line. The detail links out.',
  /**
   * [FROZEN] the two roles, newest first, re-used from the career record. Only
   * the summary line is Resume-page copy; company/position/duration are the same
   * frozen strings the Experience page renders.
   */
  roles: [
    {
      id: currentRole.id,
      company: currentRole.company,
      position: currentRole.position,
      location: currentRole.location,
      duration: currentRole.duration,
      summary:
        'Owns front-end and full-stack delivery — legacy → React SPA ' +
        'migration, multi-tenant RBAC, i18n, real-time and AI modules, NestJS ' +
        '& FastAPI production APIs.',
    },
    {
      id: previousRole.id,
      company: previousRole.company,
      position: previousRole.position,
      location: previousRole.location,
      duration: previousRole.duration,
      summary:
        'Built React / Redux features for a large-scale banking application ' +
        'with REST integration and testing, under an enterprise SDLC / agile ' +
        'cadence.',
    },
  ],
  /** Every summarised role points at the page that owns its detail (S11 §06). */
  detailHref: routes.experience.href,
  detailLabel: 'Full chronology on the Experience page',
} as const;

/* ========================================================================== *
 * §07 — Education (the degree, as recorded)
 * ========================================================================== */

/**
 * Education (S11 §07). Institution, degree, dates and CGPA rendered EXACTLY as
 * the frozen record carries them — re-used from the career record's education
 * node (`@/content/experience`) so the Resume and Experience pages state the
 * identical degree (S11 §07 RULE, §08). No distinction is added that the résumé
 * does not list.
 */
export const education = {
  eyebrow: 'Education',
  title: 'The degree, as recorded.',
  lead: 'Only what the record carries — nothing added.',
  /** [FROZEN] the education node, verbatim from the career record. */
  degree: experienceEducation.degree,
} as const;

/* ========================================================================== *
 * §09 — Certifications (only what's on the record)
 * ========================================================================== */

/**
 * Certifications (S11 §09). The two certification NAMES are frozen in Book A;
 * their issuers, dates and verification links are NOT on the record — Content
 * Required (blocker C2). Each card renders the name and shows the missing fields
 * as pending, never inventing an issuer or a date. The Resume and Skills pages
 * use the IDENTICAL frozen certification data (`skillsCertifications.items`) so
 * the two never diverge (S11 §09 HONEST, §08). This mirrors the Skills-page
 * certifications treatment exactly.
 */
export const certifications = {
  eyebrow: 'Certifications',
  title: 'Only what’s on the record.',
  lead:
    'Certification names as recorded. Issuers, completion dates and links are ' +
    'not on the record — shown pending, never invented.',
  /** [FROZEN] the same certification items the Skills page renders (C2 for the rest). */
  items: skillsCertifications.items,
} as const;

/* ========================================================================== *
 * §10 — Skills snapshot (primary strengths, then a link)
 * ========================================================================== */

/**
 * Skills snapshot (S11 §10). A compact snapshot of the primary technical
 * strengths — names only, no proficiency bars or scores — the smaller sibling of
 * the Skills page, never a copy of it (S11 §10 RULE). The link to `/skills` does
 * the work of "more detail". Every technology listed is one the frozen Skills
 * record carries; the list is drawn from the same content domain so the two
 * pages never disagree (S11 §10, §08).
 */
export const skillsSnapshot = {
  eyebrow: 'Skills snapshot',
  title: 'Primary strengths, then a link.',
  lead:
    'A compact snapshot of the primary technical strengths — the full ' +
    'categorized breakdown lives on the Skills page.',
  /** [FROZEN] primary strengths, drawn from the Skills record (S10 / Book A §06). */
  technologies: [
    'React',
    'TypeScript',
    'Redux',
    'Next.js',
    'NestJS',
    'FastAPI',
    'Python',
    'PostgreSQL',
    'Prisma',
    'AI & Real-time',
  ],
  fullBreakdown: {
    href: routes.skills.href,
    label: 'Full breakdown → /skills',
  },
} as const;

/* ========================================================================== *
 * §11 — Résumé download experience (the download must always work)
 * ========================================================================== */

/**
 * Résumé download experience (S11 §11) — the single most important function on
 * the page. It must never silently fail: a real anchor with a `download`
 * attribute and explicit file name, the correct MIME type, keyboard-operable
 * with an accessible name that states the format, and a graceful error if the
 * file is unavailable (S11 §11).
 *
 * The final résumé ASSET, its canonical file name and its displayed version
 * string are Content Required (blocker C3): until the content owner supplies the
 * file and places it in `/public`, the page renders the wired control and the
 * honest "not yet available" state — it does NOT ship a placeholder file and does
 * NOT invent a version string (S11 §11 HONEST). `available` flips to `true` (and
 * `version` is filled) only when the real asset lands.
 */
export const download = {
  eyebrow: 'Download the résumé',
  title: 'The download must always work.',
  lead:
    'The latest résumé, ready to circulate — a real, keyboard-operable ' +
    'download with a graceful fallback if the file is not yet available.',
  /**
   * Canonical static asset path under `/public`. The href is wired now so the
   * control, MIME type and failure path are all testable; the file itself is C3.
   */
  href: '/resume/yuvaraj-d-resume.pdf',
  /** Explicit download file name (the `download` attribute value). */
  fileName: 'Yuvaraj-D-Resume.pdf',
  /** Accessible control label — states the format (S11 §03, §11 RULE). */
  cta: 'Download résumé (PDF)',
  /** Short CTA used in the hero and closing where space is tight. */
  ctaShort: 'Download résumé',
  /**
   * C3 gate. While `false`, the page shows the honest "not yet available" state
   * instead of a dead link to a missing file, and no version string is shown.
   * Flip to `true` and set `version` only when the approved asset is in `/public`.
   */
  available: false,
  /** Displayed version string — Content Required (C3); never invented. */
  version: null as string | null,
  /** Honest status shown while the asset is Content Required (C3). */
  pending:
    'The final résumé file is being prepared. The download will be enabled ' +
    'here the moment the latest version is published — in the meantime, the ' +
    'summary above and the linked pages carry the full picture.',
} as const;

/* ========================================================================== *
 * §12 — Cross-linking (the depth lives one click away)
 * ========================================================================== */

/**
 * Cross-linking (S11 §12). Contextual navigation to the pages that own the full
 * detail — About, Experience, Skills, Projects, Engineering, Contact. The Resume
 * page summarizes and routes; it adds no information already available elsewhere
 * (S11 §12 RULE). Every destination resolves to a canonical, approved-IA route.
 */
export const crossLinks = {
  eyebrow: 'The depth lives one click away',
  title: 'The full story, one click away.',
  lead:
    'Every condensed section above points to the page that owns the full ' +
    'detail — the Resume page summarizes and routes, it never duplicates.',
  links: [
    {
      href: routes.about.href,
      label: 'About',
      blurb: 'The full story behind the summary',
    },
    {
      href: routes.experience.href,
      label: 'Experience',
      blurb: 'Full chronology & responsibilities',
    },
    {
      href: routes.skills.href,
      label: 'Skills',
      blurb: 'Categorized capability in context',
    },
    {
      href: routes.projects.href,
      label: 'Projects',
      blurb: 'Transpahire & the wider work',
    },
    {
      href: routes.engineering.href,
      label: 'Engineering',
      blurb: 'How this engineer thinks',
    },
    {
      href: routes.contact.href,
      label: 'Contact',
      blurb: 'Get in touch',
    },
  ],
} as const;

/* ========================================================================== *
 * §13 — CTA & closing (download, or get in touch)
 * ========================================================================== */

/**
 * Closing CTA (S11 §13). The page closes by making the two most likely actions
 * obvious — download the résumé (reinforced) and get in touch. Final CTA
 * microcopy is a P10A slot not yet frozen (blocker C-cta); interim source is
 * neutral microcopy + the approved routes. Contact facts, if surfaced, are the
 * fixed ones in Book A (`siteConfig.links`) — never edited here (S11 §13 RULE).
 */
export const callToAction = {
  eyebrow: 'Download, or get in touch',
  title: 'Download the résumé, or start a conversation.',
  lead:
    'That is the summary. Take the latest résumé to circulate, or reach out ' +
    'to talk about the work.',
  contactHref: routes.contact.href,
  contactLabel: 'Start a conversation',
  /** [FROZEN] the fixed contact facts (Book A §07) — surfaced, never edited. */
  contacts: [
    {
      label: 'Email',
      href: siteConfig.links.email,
      value: 'yuviy0881@gmail.com',
    },
    {
      label: 'GitHub',
      href: siteConfig.links.github,
      value: 'github.com/YuvarajD1998',
    },
    {
      label: 'LinkedIn',
      href: siteConfig.links.linkedin,
      value: 'linkedin.com/in/yuvarajd8892',
    },
  ],
} as const;

/* ========================================================================== *
 * §15 — SEO
 * ========================================================================== */

/**
 * Resume-page SEO (S11 §15). The final title / description / OG values are an
 * unwritten P10A slot (blocker C5); interim source is the approved route metadata
 * (`routes.resume`) + the frozen site identity. Structured data is a Person graph
 * that reuses the same frozen identity facts as the rest of the site — it
 * introduces no new claim (S11 §15 RULE).
 */
export const seo = {
  title: routes.resume.title,
  description: routes.resume.description,
  /** Frozen capability keywords for the Person graph — a fact set, not a claim. */
  knowsAbout: [
    'React',
    'TypeScript',
    'Redux',
    'Next.js',
    'NestJS',
    'FastAPI',
    'Python',
    'PostgreSQL',
    'Prisma',
    'Full-stack engineering',
    'AI recruitment workflows',
  ],
} as const;

/* ========================================================================== *
 * Content blockers — OPEN change requests, never fabricated (S11 §16)
 * ========================================================================== */

export const blockers = [
  {
    id: 'C1',
    slot: 'The exact frozen professional-summary string',
    bibleRef: 'P10A — on-page condensation reconciled vs. Book A & the Résumé',
    interim: 'a faithful condensation of the recorded profile facts',
  },
  {
    id: 'C2',
    slot: 'Certification issuers, completion dates & verification links',
    bibleRef: 'P10A §06 — names only on record',
    interim: 'certification names only, missing fields shown as pending',
  },
  {
    id: 'C3',
    slot: 'The final résumé file, its canonical file name & displayed version',
    bibleRef: 'P10A / P10 — asset supplied by the content owner into /public',
    interim:
      'the download control & failure path are wired against a stub; no ' +
      'placeholder file ships and no version string is invented',
  },
  {
    id: 'C-cta',
    slot: 'Approved final CTA microcopy strings & the Contact route',
    bibleRef: 'P10A §07/§08',
    interim: 'neutral microcopy + approved IA routes',
  },
  {
    id: 'C5',
    slot: 'Resume-page SEO title, description & OG values',
    bibleRef: 'P10A §08',
    interim: 'routes.resume metadata + frozen site identity (siteConfig)',
  },
] as const;
