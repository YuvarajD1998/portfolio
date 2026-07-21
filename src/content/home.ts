/**
 * Homepage content — the frozen copy (Sprint 04, Content Bible P10A).
 *
 * Content lives apart from code (Blueprint §10). Every visible string on the
 * homepage is declared here, verbatim from an approved source, so the section
 * components hold layout only and never a literal.
 *
 * Provenance of every string in this file:
 *   - Hero headline & CTAs …… P08 High-Fidelity Design (the latest approved
 *     hero surface): "I build production-ready software, end to end."
 *   - Named facts (role, years, employers, projects, contact) …… P10A Content
 *     Bible §04/§05/§07 (the freeze). Where P08's hi-fi mockup showed
 *     illustrative narrative that contradicts the Bible (e.g. "10 years",
 *     "founding engineer", "Fintech Co"), the Bible governs — it is the
 *     content freeze and forbids overstated or unverifiable claims.
 *   - Section narrative & order …… P03 Homepage Experience §"Section
 *     specifications 01–10" and P08 §homepage sections.
 *
 * Nothing here is invented. A gap is a change request against the books, never
 * an improvisation in code (P10A freeze rule).
 */

import { siteConfig } from '@/config/site';

/** The single flagship project, teased on the homepage (P03 §02, P08). */
export const flagship = {
  eyebrow: 'Flagship · TranspaHire',
  /** P08 hero for the flagship reveal. */
  title: 'Hiring that understands meaning.',
  /** P08 overview line, phrased to reflect development status (not shipped). */
  summary:
    'An AI recruitment platform that parses, embeds and ranks résumés by ' +
    'semantic fit — with a recruiter workflow built around it. Built end to ' +
    'end: data model, embedding pipeline, recruiter UI and the API services ' +
    'behind them.',
  /** Key value proposition (P03 §05 "AI that reads like a recruiter"). */
  value:
    'Keyword filters reject strong people on vocabulary, not ability. ' +
    'TranspaHire ranks every candidate by meaning and shows why each match ' +
    'scored — judgement at scale, made explainable.',
  cta: { label: 'Read the case study', href: '/projects/transpahire' },
} as const;

/**
 * The three portals — breadth of ownership (P03 §03 "Three portals. One
 * system of record."). Names traced to the Transpahire Product Book (8 roles,
 * 3 surfaces).
 */
export const platform = {
  eyebrow: '02 — Inside the platform',
  title: 'Three portals. One system of record.',
  lead: 'Recruiter, candidate and admin surfaces — one multi-tenant system, unified by role- and permission-based access.',
  portals: [
    {
      name: 'Recruiter',
      description:
        'Semantic search, talent pool and the hiring pipeline — ranked by fit, not keywords.',
    },
    {
      name: 'Candidate',
      description:
        'One profile, applied everywhere — with résumé parsing and AI critique.',
    },
    {
      name: 'Admin',
      description:
        'Tenancy, roles and the taxonomy that the whole platform reads from.',
    },
  ],
} as const;

/**
 * Architecture teaser — a hint, not the diagram (Sprint 04 §04 RULE; P03 §04).
 * Layers/nodes traced to the Product Book (four repos, one Postgres DB,
 * NestJS + FastAPI, vector layer).
 */
export const architecture = {
  eyebrow: '03 — The architecture',
  title: 'The blueprint, drawn to scale.',
  lead: 'Two backends over one database, a dedicated AI service, and a typed React frontend. The full diagram lives in the case study.',
  layers: [
    { label: 'Client', nodes: ['React · TypeScript', 'Design system'] },
    { label: 'Services', nodes: ['NestJS API', 'FastAPI · AI'] },
    { label: 'Data', nodes: ['PostgreSQL', 'Vector search'] },
  ],
} as const;

/**
 * The intelligence — AI as engineered judgement (P03 §05, P08). A teaser of
 * the four-stage pipeline; the live re-rank lives in the case study.
 */
export const intelligence = {
  eyebrow: '04 — The intelligence',
  title: 'AI that reads like a recruiter.',
  lead: 'Not a black box — a pipeline you can trace. Every résumé and job spec lands in one vector space; matches rank by fit, and each score explains itself.',
  stages: [
    { step: '01', label: 'Parse', detail: 'Résumé → structured entities' },
    { step: '02', label: 'Embed', detail: 'Entities → one vector space' },
    { step: '03', label: 'Rank', detail: 'Cosine fit → ordered matches' },
    { step: '04', label: 'Explain', detail: 'Every score, made legible' },
  ],
} as const;

/**
 * Engineering philosophy — capability as principles, not a list (P03 §06
 * "Engineering capability, as principles"; P10A §06 engineering philosophy).
 */
export const philosophy = {
  eyebrow: '05 — How I think',
  title: 'Engineering, as principles.',
  lead: 'One system taught me how I approach all of them. These are defaults, not slogans.',
  principles: [
    {
      title: 'User-first, product-minded',
      body: 'Start from the problem and the person on the other side of the screen, then build the software that answers it.',
    },
    {
      title: 'Clean, maintainable architecture',
      body: 'Code the engineer who joins in month six can navigate from the folder name alone. Structure is a feature.',
    },
    {
      title: 'Accessibility & performance as defaults',
      body: 'WCAG and Core Web Vitals are not a late pass. They are how the work is built from the first commit.',
    },
    {
      title: 'Scalable, reviewed, always learning',
      body: 'Systems that hold up under real data, decisions made in the open through review, and a standard that keeps rising.',
    },
  ],
} as const;

/**
 * The craft — skills grouped by intent, no progress bars (P03 §07 "Skills,
 * without a single progress bar"; P08 "Grouped by capability"; P10A §06).
 * Each group is anchored by a one-line proof, per the Bible's skills rule.
 */
export const craft = {
  eyebrow: '06 — The craft',
  title: 'Grouped by capability. No progress bars.',
  lead: 'What the tools let me build — each group anchored to how it shipped, not a self-rated percentage.',
  groups: [
    {
      name: 'Frontend',
      proof: 'Interfaces that stay fast under real data.',
      tools: ['React', 'TypeScript', 'Redux', 'CSS architecture'],
    },
    {
      name: 'Backend',
      proof: 'Services and schemas that hold up in production.',
      tools: ['NestJS', 'FastAPI', 'Node', 'Python'],
    },
    {
      name: 'AI & real-time',
      proof: 'Retrieval and ranking that earn trust.',
      tools: ['Embeddings', 'Vector search', 'WebSockets'],
    },
    {
      name: 'Data',
      proof: 'Relational and document stores, modelled to last.',
      tools: ['PostgreSQL', 'MongoDB', 'Prisma'],
    },
    {
      name: 'Quality',
      proof: 'Ship it right, then ship it again.',
      tools: ['Testing', 'CI/CD', 'Accessibility'],
    },
    {
      name: 'System design',
      proof: 'Multi-tenant systems and the APIs that connect them.',
      tools: ['RBAC / PBAC', 'REST APIs', 'Architecture'],
    },
  ],
} as const;

/**
 * Selected work — range without diluting the flagship (P03 §08 "A career, read
 * as increasing scope"). Projects & framing traced to P10A §10 (same
 * ten-part framework) and §05 (employers, dates). No metric invented.
 */
export const work = {
  eyebrow: '07 — Selected work',
  title: 'A career, read as increasing scope.',
  lead: 'From front-end specialist to full-stack engineer — each project a wider slice of the system owned.',
  projects: [
    {
      name: 'BlueRise',
      org: 'BlueRose Technologies',
      category: 'Platform',
      summary:
        'A React/TypeScript SPA migration with multi-tenant RBAC, i18n, FastAPI/Node APIs and AI résumé-screening micro-frontends.',
      tags: ['React', 'TypeScript', 'FastAPI', 'RBAC'],
    },
    {
      name: 'RATTS',
      org: 'BlueRose Technologies',
      category: 'Frontend',
      summary:
        'Legacy UI rebuilt as a React SPA — reusable test-execution components, Redux state and Robot Framework alignment.',
      tags: ['React', 'Redux', 'Test tooling'],
    },
    {
      name: 'ANZ Banking',
      org: 'Concentrix',
      category: 'Enterprise',
      summary:
        'React/Redux features for a large-scale banking application, REST integration inside an enterprise SDLC and agile delivery.',
      tags: ['React', 'Redux', 'REST'],
    },
    {
      name: 'Playwright Automation',
      org: 'BlueRose Technologies',
      category: 'Tooling',
      summary:
        'A POM-based end-to-end, API, visual and accessibility test framework with Allure reporting and adoption docs.',
      tags: ['Playwright', 'E2E', 'Accessibility'],
    },
  ],
  cta: { label: 'See all work', href: '/projects' },
} as const;

/**
 * Career highlights — concise, factual, from the frozen owner profile
 * (Sprint 04 §09; P10A §04/§05). Every claim traces to a source; nothing
 * rounded up for effect (specificity over superlatives).
 */
export const highlights = {
  eyebrow: '08 — Career highlights',
  title: 'The track record, briefly.',
  lead: 'The full history lives on Experience and the Resume. In short:',
  stats: [
    { value: '4+', caption: 'Years building for the web, React & full-stack' },
    { value: '2', caption: 'Companies — BlueRose Technologies, Concentrix' },
    { value: '45', caption: 'Days to migrate a legacy app to a React SPA' },
    {
      value: '1',
      caption: 'AI recruitment platform, TranspaHire, built end to end',
    },
  ],
} as const;

/**
 * The invitation — the close (P03 §10 "If you're building something
 * ambitious, let's talk."; P08 "Conversation first"). Contact facts fixed by
 * P10A §07 RULE (verbatim).
 */
export const invitation = {
  eyebrow: '09 — The invitation',
  title: "If you're building something ambitious, let's talk.",
  lead: 'A conversation, peer-to-peer — not a form dump. The fastest way to reach me is email.',
} as const;

/**
 * Contact facts for the homepage — derived from the single source in
 * `siteConfig.links`, which now holds the frozen Content Bible handles
 * (P10A §07 RULE). Kept here as a display-ready shape (bare email, profile
 * URLs) so the section component holds no literals and nothing is duplicated.
 */
export const contact = {
  /** Bare address for display; siteConfig stores the mailto: form. */
  email: siteConfig.links.email.replace(/^mailto:/, ''),
  github: siteConfig.links.github,
  linkedin: siteConfig.links.linkedin,
} as const;

/** Hero — the single above-the-fold block (P08; role from P10A §04). */
export const hero = {
  /** Mono kicker above the thesis (P03 datum coordinate treatment). */
  coordinate: 'datum 0,0 — start here',
  /** P08 hero headline, verbatim (the latest approved hero surface). */
  headline: 'I build production-ready software, end to end.',
  /** Role — P10A §04 fixed title (governs over P08's illustrative subtitle). */
  role: 'Senior Frontend / Full-Stack Developer · React · AI',
  /**
   * Supporting line, adapted from P08. The P08 mockup's "serving real
   * recruiters in production" overstates reality — TranspaHire is in active
   * development, not shipped — so the claim is corrected to what is true
   * (freeze rule: no overstated or unverifiable claims, P10A §11).
   */
  support:
    'From data model to pixel. My flagship, TranspaHire, is an AI ' +
    'recruitment platform I am building end to end — not a demo.',
  primaryCta: {
    label: 'Read the Transpahire case',
    href: '/projects/transpahire',
  },
  secondaryCta: { label: 'See all work', href: '/projects' },
} as const;

/** SEO set for the homepage (P10A §08; honest, specific, not keyword-stuffed). */
export const seo = {
  title: 'Yuvaraj — Senior Frontend / Full-Stack Developer',
  description:
    'Yuvaraj D — a frontend and full-stack developer who builds software ' +
    'end to end. Flagship: TranspaHire, an AI recruitment platform built ' +
    'from data model to interface.',
} as const;
