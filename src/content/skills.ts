/**
 * Skills-page content — the frozen skills & expertise record (Sprint 10).
 *
 * Content lives apart from code (Blueprint §10). Every visible string on the
 * Skills page is declared here, drawn from an approved source, so the feature
 * components hold layout only and never a literal (S10 §01 RULE).
 *
 * PROVENANCE — the approved phases are the single source of truth:
 *   - Portfolio Content Bible, Book A §06 (P10A) — the skills & philosophy
 *     record: the TWELVE frozen categories (Frontend, Backend, AI & Real-time,
 *     Databases, Architecture, Performance, Accessibility, Design systems,
 *     Testing, DevOps, Dev tools, Languages), each with a real descriptive
 *     sentence and its technology set; the core expertise; the workflow; and the
 *     "continuous learning" principle. Every field below is rendered VERBATIM
 *     from Book A §06 and cross-checked against the Résumé (S10 §01, §06 RULE).
 *   - The category descriptive sentences and technology sets are the frozen copy
 *     approved in the Sprint 10 contract (§06–§10), which renders Book A §06.
 *
 * The Skills page occupies the CAPABILITY altitude (S10 §00 NOTE): what the
 * engineer works with, grouped and contextualized. It is NOT the Engineering
 * page (S08 — the philosophy / the "why"), NOT the Experience page (S09 — the
 * chronology / the "where"). Where it names a project or a role it LINKS OUT to
 * the page that owns that detail — it never re-tells it.
 *
 * The freeze is absolute (S10 governing principle): this file ADDS no
 * technology, INFLATES no proficiency level, INVENTS no certification, REWRITES
 * no technical summary, CHANGES no skill grouping and INTRODUCES no experience
 * claim not documented. Proficiency is shown through applied context, never
 * through numeric bars or percentages (P10A RULE — no keyword stuffing). Where a
 * fact is not recorded in Book A it is listed in `blockers` as an OPEN change
 * request (Content Required) — never fabricated in code (S10 §17; CLAUDE.md
 * golden rule).
 */

import { routes } from '@/config/navigation';

/* ========================================================================== *
 * §03 — Hero & technical overview (the frame + the page's single <h1>)
 * ========================================================================== */

/**
 * Hero & technical overview (S10 §03). Frames the range — full-stack across
 * React/TypeScript frontends and NestJS/FastAPI backends, with AI and real-time
 * work — and hands the reader into core expertise. The overview states range
 * without overstating seniority: no invented technology, no "expert in
 * everything", no buzzword stacking (S10 §03 RULE, P10A tone).
 */
export const overview = {
  eyebrow: 'Skills',
  /** The page's single <h1> — the page title the Content Bible names (S10 §03). */
  title: 'Skills',
  positioning: 'What this engineer works with, and how well',
  intro:
    'Full-stack, across React/TypeScript frontends and NestJS/FastAPI ' +
    'backends, with AI and real-time work. The stack below is not a keyword ' +
    'cloud — every category earns a sentence describing how it was actually ' +
    'applied.',
  summary:
    'This is the ground the case study, the engineering philosophy and the ' +
    'career all stand on. Below is the capability grouped by category — the ' +
    'strongest areas first, then the full breadth, each tied to where it was ' +
    'used in real work. Nothing here is inflated, nothing invented; where a ' +
    'technology was applied it links to the page that owns that detail.',
  /** Frozen positioning chips (S10 §03, P10A) — each a fact, not a logo wall. */
  chips: [
    'Full-stack',
    'React',
    'TypeScript',
    'NestJS',
    'FastAPI',
    'AI & Real-time',
  ],
} as const;

/* ========================================================================== *
 * §04 — Core expertise (the strongest areas, up front)
 * ========================================================================== */

/**
 * Core expertise (S10 §04). The few areas where depth is deepest — the ones the
 * career actually turns on — stated before breadth, framed as applied
 * experience, not a label. Each links to where it was proven (S07/S08/S09). No
 * numeric proficiency; context carries the claim (S10 §04). Core expertise
 * names ONLY the strengths Book A records; a candidate strength not in Book A is
 * raised as a change request, not added here (S10 §04 HONEST).
 */
export const coreExpertise = {
  eyebrow: 'Core expertise',
  title: 'The strongest areas, up front.',
  lead:
    'Specialization before breadth — the areas where the depth is deepest, ' +
    'framed as applied engineering experience, not familiarity.',
  /** [FROZEN] primary strengths (P10A §06), each pointing at where it was proven. */
  items: [
    {
      title: 'Front-end engineering at scale',
      body:
        'React & TypeScript interfaces built and maintained under production ' +
        'load — the specialism the career was built on.',
      href: routes.experience.href,
      linkLabel: 'See where it was built',
    },
    {
      title: 'Full-stack API ownership',
      body:
        'NestJS & FastAPI services owned end to end — authentication, ' +
        'multi-tenant RBAC and the contracts other teams depend on.',
      href: routes.engineering.href,
      linkLabel: 'How I approach the stack',
    },
    {
      title: 'AI & real-time recruitment workflows',
      body:
        'Semantic matching, an LLM model-cascade and live updates — the AI ' +
        'work proven in the Transpahire flagship.',
      href: routes.transpahire.href,
      linkLabel: 'Read the case study',
    },
    {
      title: 'Clean architecture & maintainable systems',
      body:
        'Clear module boundaries and shared contracts across a multi-service ' +
        'system — decisions made for change, not just for today.',
      href: routes.engineering.href,
      linkLabel: 'How I think about architecture',
    },
    {
      title: 'Accessibility & performance as defaults',
      body:
        'WCAG-aligned, performance-budgeted work from the first commit — ' +
        'treated as a baseline requirement, not a retrofit.',
      href: routes.engineering.href,
      linkLabel: 'The disciplines, argued',
    },
  ],
} as const;

/* ========================================================================== *
 * §05–§10 — The twelve frozen skill categories (the reusable card schema)
 * ========================================================================== */

/**
 * The skill-category card schema (S10 §05) — the ONE presentation pattern every
 * one of the twelve categories reuses so the reader compares like with like. A
 * category name, a real descriptive sentence of how it was applied, and its
 * technologies as text badges (S10 §05). Forbidden: numeric proficiency bars /
 * percentages, star ratings, bare noun lists with no sentence, third-party logo
 * images (S10 §05 Forbidden). `technologies` may be empty for the cross-cutting
 * qualities (Architecture, Performance, Accessibility) — the sentence carries
 * the card there (S10 §08).
 */
export interface SkillCategory {
  /** Stable anchor / key. */
  id: string;
  /** Category name, verbatim (Book A §06). Rendered as a card <h3>. */
  name: string;
  /** One-line framing shown beside the name. */
  tagline: string;
  /** The real descriptive sentence — HOW it was applied (S10 §05 RULE). */
  description: string;
  /** Technologies attributed to THIS category, verbatim (Book A §06). */
  technologies: readonly string[];
}

/**
 * The twelve frozen categories (S10 §06–§10), in the frozen Book A §06 grouping
 * and naming. NONE is added, renamed, split or merged (S10 §10 RULE). The
 * grouping is frozen; the page renders it, it does not reorganize it. Each
 * `description` is the approved Sprint 10 copy (§06–§10); each `technologies`
 * set lists only what Book A attributes to that category — no framework added
 * because it is fashionable (S10 §06 RULE).
 */
export const categories: readonly SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    tagline: 'Interfaces built to scale, accessibly.',
    description:
      'React and TypeScript SPAs delivered under production load — component ' +
      'architecture, Redux domain state, internationalization and accessible, ' +
      'performant UI. The depth built at Concentrix and extended into ' +
      'full-stack ownership at BlueRose.',
    technologies: [
      'React',
      'TypeScript',
      'Redux',
      'Next.js',
      'Tailwind CSS',
      'i18n',
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    tagline: 'The stack behind the interface.',
    description:
      'Production APIs owned end to end — NestJS and FastAPI services, ' +
      'authentication systems, multi-tenant RBAC and REST integration, ' +
      'running against a shared data layer.',
    technologies: ['NestJS', 'FastAPI', 'Python', 'REST', 'BullMQ'],
  },
  {
    id: 'ai-realtime',
    name: 'AI & Real-time',
    tagline: 'Matching, cascades and live updates.',
    description:
      'AI-powered recruitment workflows and real-time features — semantic ' +
      'matching over vector embeddings, an LLM model-cascade with fallbacks, ' +
      'and live updates surfaced to users. Owned in the Transpahire flagship.',
    technologies: [
      'Vector embeddings',
      'Semantic matching',
      'LLM cascade',
      'WebSocket',
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    tagline: 'Relational data through a typed layer.',
    description:
      'Relational data modelled and queried through a typed layer — ' +
      'PostgreSQL as the shared store, Prisma for schema and access, Redis for ' +
      'caching and queues.',
    technologies: ['PostgreSQL', 'Prisma', 'Redis'],
  },
  {
    id: 'architecture',
    name: 'Architecture',
    tagline: 'Made for change, not just today.',
    description:
      'Maintainable code and clean architecture across a multi-service system ' +
      '— clear module boundaries, shared contracts between frontend and ' +
      'backend, and decisions made for scalability and change.',
    technologies: [],
  },
  {
    id: 'performance',
    name: 'Performance',
    tagline: 'A default, not a phase.',
    description:
      'Performance treated as a default, not a phase — Core Web Vitals, render ' +
      'and query cost considered from the first commit rather than retrofitted ' +
      'before launch.',
    technologies: [],
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    tagline: 'A baseline requirement.',
    description:
      'Accessibility as a baseline requirement — semantic structure, keyboard ' +
      'operability and WCAG-aligned contrast built in, verified with automated ' +
      'and manual checks in the delivery loop.',
    technologies: [],
  },
  {
    id: 'design-systems',
    name: 'Design systems',
    tagline: 'Component-driven, coherent at scale.',
    description:
      'Component-driven UI built on a shared design system — reusable ' +
      'primitives, consistent tokens and accessible patterns that keep a ' +
      'growing product coherent.',
    technologies: ['Design tokens', 'Component libraries', 'Tailwind CSS'],
  },
  {
    id: 'testing',
    name: 'Testing',
    tagline: 'Checks inside the delivery loop.',
    description:
      'A Page-Object-Model E2E, API, visual and accessibility test framework ' +
      'with Allure reporting, built for the recruitment platform — automated ' +
      'checks as part of the delivery loop, not an afterthought.',
    technologies: ['Playwright', 'POM', 'Allure', 'Vitest'],
  },
  {
    id: 'devops',
    name: 'DevOps',
    tagline: 'Reproducible environments, safe releases.',
    description:
      'Containerized services and CI/CD awareness — Docker for reproducible ' +
      'environments and automated pipelines carrying tests and builds through ' +
      'to deploy.',
    technologies: ['Docker', 'CI/CD', 'Git'],
  },
  {
    id: 'dev-tools',
    name: 'Dev tools',
    tagline: 'The everyday toolchain.',
    description:
      'The everyday toolchain that supports delivery — version control with ' +
      'Git, code review, and editor/debugging tooling that keeps iteration ' +
      'fast and changes reviewable.',
    technologies: ['Git', 'GitHub', 'VS Code'],
  },
  {
    id: 'languages',
    name: 'Languages',
    tagline: 'What the work is written in.',
    description:
      'The languages the work is written in — TypeScript and JavaScript across ' +
      'the frontend and Node services, Python for the AI backend, and SQL for ' +
      'the data layer.',
    technologies: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
  },
] as const;

/** Section framing for the category grid (S10 §06–§10). */
export const categoriesSection = {
  eyebrow: 'Skills by category',
  title: 'Twelve categories, one system.',
  lead:
    'Each category is a card with the same anatomy — a name, a real sentence ' +
    'on how it was applied, and the technologies that belong to it. No ' +
    'proficiency bars, no logo wall; the reader compares like with like.',
} as const;

/* ========================================================================== *
 * §11 — Technology in context (application, not just familiarity)
 * ========================================================================== */

/**
 * Technology in context (S10 §11). Associates technologies with the projects,
 * domains and responsibilities they were used for — the skills applied in real
 * work, linking outward to the pages that own the detail, not a second listing.
 * This section invents NO new project, outcome or responsibility; where a
 * measurable product outcome is not recorded in Book A it is not stated — the
 * context is qualitative and honest (S10 §11 RULE).
 */
export const technologyInContext = {
  eyebrow: 'Technology in context',
  title: 'Application, not just familiarity.',
  lead:
    'Each capability tied to the work where it was applied — pointing outward ' +
    'to the pages that own the detail, never re-telling them here.',
  groups: [
    {
      id: 'flagship',
      label: 'Applied in the flagship',
      body:
        'React/TypeScript SPA, NestJS + FastAPI APIs, PostgreSQL/Prisma, and ' +
        'AI matching — the whole stack proven in Transpahire.',
      href: routes.transpahire.href,
      linkLabel: 'Read the Transpahire case study',
    },
    {
      id: 'career',
      label: 'Applied across the career',
      body:
        'React/Redux at Concentrix for a large-scale banking application; ' +
        'full-stack ownership at BlueRose. The chronology lives on the ' +
        'Experience page, not here.',
      href: routes.experience.href,
      linkLabel: 'See the career in full',
    },
  ],
} as const;

/* ========================================================================== *
 * §12 — Development workflow (how the delivery actually happens)
 * ========================================================================== */

/**
 * Development workflow (S10 §12). Version control, code review, branching,
 * CI/CD awareness, documentation and agile collaboration — kept concise and
 * practical (four statements, not a process manifesto that competes with the
 * Engineering page). Drawn from what Book A and the Résumé record; no tool or
 * ceremony added for effect (S10 §12 RULE).
 */
export const workflow = {
  eyebrow: 'Development workflow',
  title: 'How the delivery actually happens.',
  lead:
    'How the skills are actually shipped — concise and practical, not a ' +
    'methodology essay.',
  items: [
    {
      title: 'Version control & review',
      body:
        'Git-based branching with pull requests and code review as the gate ' +
        'to main — changes stay reviewable and reversible.',
    },
    {
      title: 'CI/CD awareness',
      body:
        'Automated pipelines carry tests and builds through to deploy, so ' +
        'regressions are caught before release.',
    },
    {
      title: 'Documentation',
      body:
        'Decisions, contracts and setup written down — documentation as part ' +
        'of delivery, not a follow-up.',
    },
    {
      title: 'Agile collaboration',
      body:
        'Cross-functional delivery under an enterprise SDLC / agile cadence — ' +
        'iterating with product, design and QA.',
    },
  ],
} as const;

/* ========================================================================== *
 * §13 — Currently learning & growth (continuous learning, stated plainly)
 * ========================================================================== */

/**
 * Currently learning & growth (S10 §13). Book A records "continuous learning"
 * as a principle but does NOT enumerate a specific currently-learning
 * technology list. The page renders the philosophy VERBATIM and marks the
 * explicit list as a blocker (C4) — it does not fabricate trendy technology
 * names to fill the section (S10 §13 HONEST).
 */
export const learning = {
  eyebrow: 'Currently learning & growth',
  title: 'Continuous learning, stated plainly.',
  lead:
    'One of the recorded engineering principles — the stack treated as ' +
    'something to keep deepening.',
  /** [FROZEN] the learning philosophy (P10A §06). */
  philosophy: {
    label: 'Learning philosophy',
    body:
      '“Continuous learning” is one of the recorded engineering principles — ' +
      'treating the stack as something to keep deepening, and staying current ' +
      'with the AI and web platform the work depends on.',
  },
  /** The explicit "now learning" list is Content Required (blocker C4). */
  currentlyExploring: {
    label: 'Currently exploring',
    /** Interim, honest status — never a guessed technology list (S10 §13). */
    pending:
      'The specific list of technologies currently being explored is Content ' +
      'Required (blocker C4). This section ships the frozen learning ' +
      'philosophy; the explicit “now learning” badges are added once the ' +
      'content owner supplies them — never guessed.',
  },
} as const;

/* ========================================================================== *
 * §14 — Certifications (only what's on the record)
 * ========================================================================== */

/**
 * Certifications (S10 §14), verbatim from Book A, verified vs. the Résumé. The
 * two certification NAMES are frozen; their issuers, dates and verification
 * links are NOT in Book A — Content Required (blocker C2). The card renders the
 * name and shows the missing fields as pending, never inventing an issuer or a
 * date (S10 §14 HONEST).
 */
export const certifications = {
  eyebrow: 'Certifications',
  title: 'Only what’s on the record.',
  lead:
    'Certification names as recorded. Issuers, completion dates and links are ' +
    'not in Book A — marked pending, never invented.',
  /** [FROZEN] certification names (P10A §06). Issuer & date = Content Required (C2). */
  items: [
    {
      name: 'React Developer Certification',
      pending: 'Issuer & date — Content Required (C2)',
    },
    {
      name: 'Web Developer Certification',
      pending: 'Issuer & date — Content Required (C2)',
    },
  ],
} as const;

/* ========================================================================== *
 * §15 — CTA & cross-links (hand the reader onward)
 * ========================================================================== */

/**
 * Closing CTA (S10 §15). The Skills page ends by pointing to where these skills
 * were proven — the Transpahire case study, the Engineering page, the
 * Experience page — and to the Résumé and Contact routes. CTA microcopy is a
 * P10A slot not yet frozen (blocker C4); interim source is neutral destination
 * microcopy + the approved routes. Every destination is an existing/approved-IA
 * route — never dropped or pointed at a placeholder (S10 §15 RULE).
 */
export const callToAction = {
  eyebrow: 'Where to next',
  title: 'That’s the capability. See where it was proven.',
  lead:
    'The list is only credible because it was used in anger. Follow it to the ' +
    'flagship it built, the philosophy behind it, or the career that earned it.',
  links: [
    {
      href: routes.transpahire.href,
      label: 'Read the Transpahire case study',
      primary: true,
    },
    { href: routes.engineering.href, label: 'See how I think', primary: false },
    {
      href: routes.experience.href,
      label: 'See the experience',
      primary: false,
    },
    { href: routes.resume.href, label: 'View the résumé', primary: false },
    {
      href: routes.contact.href,
      label: 'Start a conversation',
      primary: false,
    },
  ],
} as const;

/* ========================================================================== *
 * §16 — SEO
 * ========================================================================== */

/**
 * Skills-page SEO (S10 §17). The final title / description / OG values are an
 * unwritten P10A slot (blocker C5); interim source is the approved route
 * metadata (`routes.skills`) + the frozen site identity. Structured data is
 * Person + ProfilePage with `knowsAbout` — the approved P10 §15 model for a page
 * about the person; a CreativeWork / SoftwareApplication schema belongs to the
 * case-study pages, NOT here.
 */
export const seo = {
  title: routes.skills.title,
  description: routes.skills.description,
  /** Frozen capability keywords for the ProfilePage graph — a fact set, not a claim. */
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
    'Redis',
    'Playwright',
    'Docker',
    'Full-stack engineering',
    'AI recruitment workflows',
    'Accessibility',
    'Performance',
  ],
} as const;

/* ========================================================================== *
 * Content blockers — OPEN change requests, never fabricated (S10 §17)
 * ========================================================================== */

export const blockers = [
  {
    id: 'C2',
    slot: 'Certification issuers, completion dates & verification links',
    bibleRef: 'P10A §06 — names only in Book A',
    interim: 'certification names only, missing fields shown as pending',
  },
  {
    id: 'C4',
    slot: 'The explicit “currently learning” technology list',
    bibleRef: 'P10A §06 — only the learning philosophy is frozen',
    interim: 'the frozen learning philosophy ships; the list is marked pending',
  },
  {
    id: 'C5',
    slot: 'Skills-page SEO title, description & OG values',
    bibleRef: 'P10A §08',
    interim: 'routes.skills metadata + frozen site identity (siteConfig)',
  },
  {
    id: 'C-cta',
    slot: 'Approved final CTA microcopy strings & Résumé/Contact routes',
    bibleRef: 'P10A §07/§08',
    interim: 'neutral destination microcopy + approved IA routes',
  },
  {
    id: 'C-metric',
    slot: 'Any technology-to-outcome metric for §11',
    bibleRef: 'P10A — not in Book A',
    interim: 'qualitative, honest context only until a number is supplied',
  },
] as const;
