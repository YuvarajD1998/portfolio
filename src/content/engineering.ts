/**
 * Engineering page content — the frozen copy (Sprint 08).
 *
 * Content lives apart from code (Blueprint §10). Every visible string on the
 * Engineering page is declared here, drawn from an approved source, so the
 * feature components hold layout only and never a literal (S08 §01 RULE).
 *
 * PROVENANCE — the approved phases are the single source of truth:
 *   - Portfolio Content Bible (P10A) — the philosophy pillar sets and the page
 *     copy slots. The two philosophy sets below are reused VERBATIM from the
 *     frozen About copy (`@/content/about`) so there is one canonical pillar
 *     text, not an Engineering-only variant (S08 §04 RULE).
 *   - Frontend Engineering Blueprint (P10) — the architecture, prop, state and
 *     maintainability practices (composition over config, ≤7 props, the
 *     month-six-engineer test, predictable-state tie-breaker).
 *   - Transpahire Product Book (P10B) — every technical fact cited as evidence,
 *     at its TRUE status. This page cites Transpahire as evidence for a general
 *     practice; it never re-narrates the §07 case study (S08 governing NOTE).
 *
 * The Engineering page occupies the middle altitude (S08 §00 NOTE): broader than
 * one product, more narrative than a skills matrix. Where a final string or asset
 * is not yet frozen it is recorded in `blockers` (C1–C8) as an OPEN change
 * request and wired against the interim frozen source the S08 brief itself names
 * — never lorem-ipsum, never an invented metric or generic statement (S08 §01,
 * §22 RULE; CLAUDE.md golden rule).
 */

import { routes } from '@/config/navigation';
import {
  philosophy as aboutPhilosophy,
  product as aboutProduct,
} from '@/content/about';

/* ========================================================================== *
 * §03 — Engineering overview (the frame + the page's single <h1>)
 * ========================================================================== */

/**
 * Overview (S08 §03). Frames the engineer and hands the reader into the
 * philosophy. C1 pending: the final overview intro & summary prose are an
 * unwritten P10A slot; interim source is the frozen site positioning
 * (siteConfig) + the frozen through-line the Content Bible records (front-end
 * specialist → full-stack owning production APIs, auth & AI workflows).
 */
export const overview = {
  eyebrow: 'Engineering',
  /** The page's single <h1> — the page title the Content Bible names (S08 §03). */
  title: 'Engineering',
  /** C1 interim: the through-line, framed from frozen positioning — not a headline. */
  positioning: 'How this engineer thinks',
  intro:
    'This page is about judgment, not any one project. It sets out how I ' +
    'structure applications, make technical decisions, weigh trade-offs, and ' +
    'hold the line on performance, accessibility and maintainability — the ' +
    'reasoning that recurs across everything I build.',
  summary:
    'A senior frontend / full-stack engineer with 4+ years, I own production ' +
    'systems end to end: the React front end, the NestJS and FastAPI services ' +
    'behind it, the auth that guards them, and the AI recruitment workflows ' +
    'they power. What follows is the practice above the code.',
  /** Frozen positioning chips (S08 §03, P10A) — each a fact, not a logo wall. */
  chips: [
    'Senior Frontend / Full-Stack',
    '4+ years',
    'React',
    'TypeScript',
    'NestJS',
    'FastAPI',
    'Python',
  ],
} as const;

/* ========================================================================== *
 * §04 — Engineering philosophy (two frozen pillar sets, verbatim)
 * ========================================================================== */

/**
 * Philosophy (S08 §04). The lens the whole page is read through. Both sets are
 * reused VERBATIM from the frozen About philosophy so the text is canonical, not
 * re-authored (S08 §04 RULE: each pillar is a real applied sentence, never a
 * bare list of nouns). The engineering set = the eight-facet principle set; the
 * product set = the product-thinking points.
 */
export const philosophy = {
  engineering: {
    eyebrow: 'Engineering philosophy',
    title: 'The principles that govern the work.',
    lead:
      'These are non-negotiable constraints, not aspirations. §13 and §14 then ' +
      'show two of them — performance and accessibility — enforced in practice.',
    /** [FROZEN] verbatim from about.philosophy.principles. */
    pillars: aboutPhilosophy.principles,
  },
  product: {
    eyebrow: 'Product philosophy',
    title: 'Engineering in service of users.',
    lead: aboutProduct.lead,
    /** [FROZEN] verbatim from about.product.points. */
    pillars: aboutProduct.points,
  },
} as const;

/* ========================================================================== *
 * §05 — Frontend architecture
 * ========================================================================== */

/**
 * Frontend architecture (S08 §05, P10). The reasoning behind maintainable
 * structure — convention over configuration, small typed files, composition
 * over config — with Transpahire cited as a worked example at true status
 * (~150 lazy routes gated by an `authority` array vs. `[role, orgRole]`, P10B).
 */
export const frontendArchitecture = {
  organization: [
    'Convention over configuration; strict typing; small files.',
    'The month-six engineer locates any change from the folder name alone.',
    'Composition over config: slots over boolean soup; prop count under ~7.',
    'Accept data, not styling — variants via typed `variant` unions.',
    'Pure logic in `lib/`; client behaviour in `hooks/` — no JSX in `lib/`.',
  ],
  routing: [
    'Route-level code splitting; lazy trees.',
    'Responsive by architecture, not by patching breakpoints.',
    'Empty, warning & degraded states designed, not afterthoughts.',
    'No abstraction until the third use — reuse is designed, not premature.',
  ],
  /** [FROZEN] cited as evidence, not re-narrated (S08 §05 evidence callout, P10B). */
  evidence:
    'Transpahire runs one role-gated React 19 / Vite SPA serving candidates, ' +
    'six org sub-roles and platform admins across ~150 lazy routes gated by an ' +
    '`authority` array checked against the user’s `[role, orgRole]` (P10B). It ' +
    'is a worked example of the practice — the full case study lives at §07, ' +
    'not here.',
} as const;

/* ========================================================================== *
 * §06 — Design systems
 * ========================================================================== */

/** Design systems (S08 §06, P05/P10) — reuse as a maintainability strategy. */
export const designSystems = {
  discipline: [
    'CSS-variable design tokens as the single source of scale, colour & spacing.',
    'Motion shipped as reusable primitives driven by timing tokens — never bespoke per component.',
    'One shared component library across every audience.',
    'Variants are typed unions, not ad-hoc props.',
  ],
  payoff: [
    'A token change propagates everywhere; no find-and-replace of hex values.',
    'Theme & dark-mode are a variable swap, not a fork.',
    'New surfaces compose from existing parts — predictable, reviewable.',
  ],
  /** S08 §06 NOTE: this describes the approach, not the Datum or Transpahire systems. */
  note:
    'This is the approach to design systems as a discipline — not a re-document ' +
    'of Datum’s own system (P05 / S02) or Transpahire’s Tailwind-4 + hand-built ' +
    'library. Either is cited only as an example of the practice at true status.',
} as const;

/* ========================================================================== *
 * §07 — State management
 * ========================================================================== */

/** State management (S08 §07, P10) — the right state in the right place. */
export const stateManagement = {
  separation: [
    'Domain state + the auth source of truth in a persisted store (Redux Toolkit + redux-persist).',
    'Display-only session / theme in a light store (Zustand) — deliberately dual, not accidental.',
    'Form state in React Hook Form + Zod; form state never touches the domain store.',
    'No component calls the HTTP client directly — data flows through typed thunks.',
  ],
  /** The rule that resolves conflicts (S08 §07, P10). */
  decision:
    'Global stores are for state that many surfaces share and that must survive ' +
    'reloads. Ephemeral UI state does not belong there — putting it there is the ' +
    'failure mode that makes Redux “too much”. The rule that resolves conflicts ' +
    'is predictable state over convenience: when two designs compete, the one ' +
    'with clearer state ownership wins (P10).',
  /** [FROZEN] pattern-at-scale citation, not re-catalogued (S08 §07 RULE, P10B). */
  evidence:
    'Transpahire’s 28 domain slices — each with its own `thunk.ts` — are the ' +
    'pattern at scale (P10B), cited here rather than re-catalogued.',
} as const;

/* ========================================================================== *
 * §08 — API integration
 * ========================================================================== */

/** API integration (S08 §08, P10) — one boundary, typed and centralized. */
export const apiIntegration = {
  boundary: [
    'A single HTTP client (Axios) with request / response interceptors.',
    'A silent-refresh queue on the interceptor so token expiry never surfaces as a raw 401.',
    'All requests flow through typed service / thunk functions — never inline in components.',
    'Zod validation at the boundary; the type system trusts nothing off the wire.',
    'Uniform error, loading and degraded states.',
  ],
  dataFlow: [
    'Request → interceptor (auth) → service → validate → store → UI.',
    'Errors normalized to a shape the UI can render consistently.',
    'Retriable vs. terminal failures distinguished, not collapsed.',
  ],
  /** The maintainability decision (S08 §08 RULE). */
  decision:
    'The point of a single boundary is that auth, retries, validation and error ' +
    'shape are solved once — the reason no component ever calls the network ' +
    'directly. It is a maintainability decision, not an API reference.',
} as const;

/* ========================================================================== *
 * §09 — Authentication & authorization
 * ========================================================================== */

/** Auth (S08 §09, P10/P10B) — identity once, authority everywhere. */
export const authentication = {
  model: [
    'JWT sessions; the backend is the single source of authority.',
    'Silent token refresh queued at the HTTP interceptor.',
    'Route access gated by an `authority` array checked against `[role, orgRole]`.',
    'Client-side gates are UX; the server re-checks every write.',
  ],
  /** [FROZEN] the decision it demonstrates, cited at scale (S08 §09, P10B). */
  decision:
    'Authorization is not a UI concern that happens to also live on the server — ' +
    'it is a server concern the UI reflects. Hiding a button is convenience; the ' +
    'guard that actually protects the write is on the backend. Transpahire’s ' +
    'single global candidate identity — one User + Profile pair, never ' +
    'duplicated per org, with a platform-admin superuser that bypasses every ' +
    'guard (P10B) — is the model at scale.',
  /** S08 §09 HONEST: guard coverage is per-controller with a known gap (P10B). */
  honest:
    'The Transpahire Product Book records that guard coverage is enforced ' +
    'per-controller with a known gap pattern (P10B). Cited here at that true ' +
    'status — never presented as uniformly airtight.',
} as const;

/* ========================================================================== *
 * §10 — Backend integration
 * ========================================================================== */

/** Backend integration (S08 §10, P10/P10B) — clear ownership across services. */
export const backendIntegration = {
  ownership: [
    'One service owns all writes, migrations and authorization — the source of truth.',
    'A compute service stays stateless: no authority, called only server-to-server.',
    'Validation at every boundary; DTOs typed end to end.',
    'Background work (queues) offloads long-running jobs from the request path.',
  ],
  /** [FROZEN] evidence at scale (S08 §10, P10B). */
  evidence:
    'Transpahire runs NestJS 11 (Prisma 6 + PostgreSQL / pgvector, BullMQ + ' +
    'Redis) as the sole authority and a stateless FastAPI compute layer called ' +
    'only by NestJS via an internal key. Both share one physical Postgres ' +
    'database, yet Prisma owns schema migrations even for the tables FastAPI ' +
    'reads — a deliberate ownership boundary, cited here as a pattern and ' +
    'detailed in §07.',
  /** The reusable principle (S08 §10 RULE). */
  principle:
    'The takeaway is the principle — single authority, stateless compute, one ' +
    'owner of the schema — a reusable integration pattern. Repo-scale figures ' +
    'come verbatim from the Product Book & Repository Intelligence Report; none ' +
    'are estimated.',
} as const;

/* ========================================================================== *
 * §12 — AI integration engineering
 * ========================================================================== */

/** AI engineering (S08 §12, P10B) — a grounded, governed component. */
export const aiEngineering = {
  /** [FROZEN] the AI-integration philosophy (S08 §12, P10B). */
  philosophy: [
    'Every AI output is inspectable & grounded in real source text — never a bare score.',
    'The application layer re-validates and re-grounds model output; the model is never trusted blind.',
    'A model cascade with per-capability fallback, not a single hard-wired model.',
    'Every call logged to `ai_call_log` for cost & cascade visibility.',
  ],
  workflows: [
    'Resume parsing → extraction with merge-review (no silent overwrite).',
    'Semantic search over pgvector embeddings.',
    'Explainable candidate matching — which skills matched / missing & why weighted.',
    'Interview automation & JD extraction as bounded, reviewable steps.',
  ],
  /** The load-bearing principle, verbatim (S08 §12 RULE, P10B). */
  principle:
    'An AI match score is worthless unless every score ships with an ' +
    'inspectable, grounded explanation backed by real resume text — never ' +
    'hallucinated. Anti-hallucination grounding is the central AI engineering ' +
    'decision, not an add-on.',
} as const;

/* ========================================================================== *
 * §13 — Performance engineering
 * ========================================================================== */

/** Performance (S08 §13, P10) — a default, budgeted. */
export const performance = {
  techniques: [
    'Route-level code splitting & lazy loading below the fold.',
    'Rendering optimization — avoid needless re-renders, memoize deliberately.',
    'Image optimization & responsive assets; inline optimized SVG.',
    'Bundle strategy: no heavy UI kit; hand-built primitives keep the tree small.',
    'Caching at the data boundary; no layout shift on disclosure toggle.',
  ],
  discipline:
    'Core Web Vitals sit within the Sprint 01 performance budget. Performance ' +
    'is not a late optimization pass — it is a constraint checked as work ' +
    'lands, which is what “performance as a default” means concretely. Motion ' +
    'cost is budgeted; every animation earns its frame.',
  /** S08 §13 RULE: any stated number must be measured/approved — none invented (C4). */
  metricsNote:
    'Any performance number stated on the page (bundle size, Vitals target, ' +
    'load time) must come from an approved source or a measured build. Until ' +
    'those figures are supplied they are Content Required (C4) — never invented.',
} as const;

/* ========================================================================== *
 * §14 — Accessibility engineering
 * ========================================================================== */

/** Accessibility (S08 §14, P07/P10) — a core principle, not a checklist. */
export const accessibility = {
  builtIn: [
    'Semantic HTML first; ARIA only where semantics fall short.',
    'Full keyboard operability; visible, managed focus.',
    '`prefers-reduced-motion` honored — motion never gates content.',
    'Colour contrast meets WCAG 2.2 AA in light & dark.',
    'Inclusive states: empty, error, loading all reachable non-visually.',
  ],
  principle:
    'Accessibility as a default means the accessible path is the only path ' +
    'built — not a parallel one. A diagram has a text equivalent because that ' +
    'is how it ships, not because an audit demanded it. This is the same ' +
    'conviction the philosophy pillar names in §04, shown here as engineering ' +
    'practice.',
} as const;

/* ========================================================================== *
 * §15 — Testing & quality
 * ========================================================================== */

/** Testing (S08 §15, P10) — confidence you can ship on. */
export const testing = {
  layers: [
    'Unit tests for pure logic in `lib/` & hooks.',
    'Component tests for behaviour & accessibility of shared UI.',
    'Integration / E2E for the flows that matter (Playwright, POM-based).',
    'Static analysis: strict TypeScript, lint, type-check gate in CI.',
    'Code review & manual QA on the paths tests can’t cheaply reach.',
  ],
  philosophy:
    'Tests exist to make change safe, not to chase a number. Test behaviour, ' +
    'not implementation; the highest-value tests cover the flows a regression ' +
    'would hurt most. The type system is the first test — strict typing catches ' +
    'a whole class of bugs before a test ever runs.',
  /** S08 §15 HONEST: the Playwright practice is real career record; no coverage % claimed. */
  honest:
    'The Playwright automation practice comes from real work — a POM-based ' +
    'E2E / API / visual / a11y framework with Allure reporting (P10A career ' +
    'record). No coverage percentage is claimed unless an approved source ' +
    'supplies it; unbacked figures are Content Required (C4).',
} as const;

/* ========================================================================== *
 * §16 — Developer experience
 * ========================================================================== */

/** DX (S08 §16, P10) — make the right thing the easy thing. */
export const developerExperience = {
  ergonomics: [
    'Predictable folder structure — findable by name, not by grep.',
    'Documentation that lives next to the code it explains.',
    'Automation for the repetitive & error-prone (lint, format, type-check, CI).',
    'Reusability designed at the third use, never speculatively.',
  ],
  test:
    'The benchmark, from the Blueprint: the month-six engineer can locate any ' +
    'change from the folder name alone (P10). When two designs compete, the one ' +
    'that better serves maintainability and predictable state wins — a ' +
    'long-lived codebase is optimized for the reader, not the writer.',
  /** [FROZEN] template-lineage honesty as DX maturity (S08 §16, P10B). */
  honest:
    'Honesty about template lineage is part of DX maturity: Transpahire’s ' +
    'package is still named “ecme” from its admin-dashboard origin, with legacy ' +
    'folders reflecting an in-progress design-system migration (P10B). Naming ' +
    'that real context honestly is a sign of engineering maturity, not ' +
    'something to hide.',
} as const;

/* ========================================================================== *
 * §17 — CI/CD & deployment
 * ========================================================================== */

/** CI/CD (S08 §17, P10/P11) — gates that catch it before users do. */
export const cicd = {
  gates: [
    'Type-check, lint & tests run on every change.',
    'Accessibility & performance budgets checked where automatable.',
    'Preview builds for review before merge.',
    'Reproducible builds; no “works on my machine” deploys.',
  ],
  point:
    'CI/CD is where the philosophy stops being aspirational. Every “default” — ' +
    'accessibility, performance, typing — is only real if a gate enforces it. ' +
    'The pipeline turns principles into conditions of merge.',
  /** S08 §17 NOTE: tooling/hosting stated only where an approved source records it (C5). */
  note:
    'Specific pipeline tooling and hosting are stated only where an approved ' +
    'source (Production Implementation Playbook / Repository Intelligence ' +
    'Report) records them. Anything unrecorded is Content Required (C5), never ' +
    'assumed.',
} as const;

/* ========================================================================== *
 * §18 — Technical decision framework
 * ========================================================================== */

/** Decision framework (S08 §18, P01/P10) — how the calls actually get made. */
export const decisionFramework = {
  weighed: [
    'Fit to the problem before novelty — boring where boring is correct.',
    'Long-term maintainability & predictable state as the tie-breaker.',
    'Bundle & runtime cost vs. the value delivered.',
    'Team productivity & onboarding, not just personal preference.',
    'Reversibility — how expensive is it to unwind if wrong?',
  ],
  /** [FROZEN] worked trade-offs — real, cited (S08 §18, P10/P10B). */
  tradeoffs: [
    {
      choice: 'Hand-built component library over MUI / AntD',
      why: 'control & bundle size over out-of-the-box speed',
    },
    {
      choice: 'Dual store (Redux + Zustand)',
      why: 'correct state boundaries over one-store simplicity',
    },
    {
      choice: 'NestJS authority + stateless FastAPI compute',
      why: 'clear ownership over a single monolith',
    },
    {
      choice: 'Grounded, explainable AI',
      why: 'inspectable trust over a faster black-box score',
    },
  ],
  rule:
    'Every trade-off named here is one I actually made, drawn from the frozen ' +
    'books — not a textbook example. The governing rule holds: when rulings ' +
    'compete, the one that better serves maintainability and predictable state ' +
    'wins (P10). No generic “it depends” filler survives review.',
} as const;

/* ========================================================================== *
 * §19 — Tools, workflows & continuous learning + the close (CTA)
 * ========================================================================== */

/** Tools & continuous learning (S08 §19, P10A/P10) — the daily craft, and next. */
export const toolsAndLearning = {
  /** Each tool earns a sentence on how it is used — no bare logo wall (P10A rule). */
  tools: [
    {
      name: 'TypeScript (strict)',
      use: 'The first test — types catch a class of bugs before a test runs.',
    },
    {
      name: 'React / Vite',
      use: 'The front-end runtime and the fast dev/build toolchain under it.',
    },
    {
      name: 'NestJS · FastAPI',
      use: 'The authority service and the stateless AI compute layer beside it.',
    },
    {
      name: 'Prisma · PostgreSQL',
      use: 'One owner of the schema and migrations, over a shared database.',
    },
    {
      name: 'Playwright',
      use: 'POM-based E2E / API / visual / a11y coverage of the flows that matter.',
    },
    {
      name: 'Git',
      use: 'Small, reviewable changes made and discussed in the open.',
    },
  ],
  learning: [
    'The through-line: front-end specialist → full-stack owning production APIs, auth & AI workflows.',
    'Depth chosen deliberately — going deep on the systems that matter, not chasing every framework.',
    'Certifications & ongoing study named at their real status (React / Web Developer).',
  ],
} as const;

/**
 * Closing CTA (S08 §19). C7 pending: exact strings/destinations for the
 * Engineering-page CTA are an unwritten P10A slot; interim source is neutral
 * destination microcopy + the approved routes (Transpahire case study for the
 * worked example, Contact to start a conversation).
 */
export const callToAction = {
  eyebrow: 'Where to next',
  title: 'The mind, now legible. Above any one project.',
  lead:
    'That is how I reason. To see it worked end to end on a real product, read ' +
    'the Transpahire case study — or reach out and let’s talk.',
  links: [
    {
      href: routes.transpahire.href,
      label: 'Read the Transpahire case study',
      primary: true,
    },
    {
      href: routes.contact.href,
      label: 'Start a conversation',
      primary: false,
    },
  ],
} as const;

/* ========================================================================== *
 * §22 — SEO
 * ========================================================================== */

/**
 * Engineering-page SEO (S08 §22). C8 pending: the final title / description / OG
 * values are an unwritten P10A §08 slot; interim source is the approved route
 * metadata (`routes.engineering`) + the frozen site identity. Structured data is
 * Person + ProfilePage — the approved P10 §15 model for a bio / practice page;
 * a CreativeWork / SoftwareApplication schema belongs to the case-study pages,
 * not here (S08 §22 RULE).
 */
export const seo = {
  title: routes.engineering.title,
  description: routes.engineering.description,
  /** Frozen practice keywords for the ProfilePage graph — a fact set, not a claim. */
  knowsAbout: [
    'Frontend architecture',
    'React',
    'TypeScript',
    'State management',
    'API integration',
    'Authentication & authorization',
    'AI integration engineering',
    'Performance engineering',
    'Accessibility engineering',
    'Testing & quality',
  ],
} as const;

/* ========================================================================== *
 * Content blockers — OPEN change requests, never fabricated (S08 §22 C1–C8)
 * ========================================================================== */

export const blockers = [
  {
    id: 'C1',
    slot: 'Engineering-overview intro & summary final prose',
    bibleRef: 'P10A §08',
    interim:
      'frozen site positioning (siteConfig) + the Content Bible through-line',
  },
  {
    id: 'C2',
    slot: 'Per-pillar applied-sentence copy for both philosophy sets',
    bibleRef: 'P10A',
    interim: 'the frozen About philosophy pillar text, reused verbatim',
  },
  {
    id: 'C3',
    slot: 'Approved architecture / data-flow / AI-pipeline diagram SVGs',
    bibleRef: 'S08 §22 C3',
    interim: 'inline SVG built from the Product Book architecture facts (P10B)',
  },
  {
    id: 'C4',
    slot: 'Any performance / coverage metric marked Content Required',
    bibleRef: 'P10 / P10B Content Required',
    interim: 'qualitative copy only; no fabricated number',
  },
  {
    id: 'C5',
    slot: 'CI/CD pipeline & deployment specifics not in P11 / RIR',
    bibleRef: 'S08 §22 C5',
    interim:
      'the pipeline described as gates/principles only — no named tool/host',
  },
  {
    id: 'C6',
    slot: 'Approved supporting visual for the overview (if any)',
    bibleRef: 'S08 §22 C6',
    interim: 'no supporting image — the overview ships text-only',
  },
  {
    id: 'C7',
    slot: 'Closing CTA copy & destinations for the Engineering page',
    bibleRef: 'P10A §08',
    interim:
      'neutral destination microcopy + approved transpahire/contact routes',
  },
  {
    id: 'C8',
    slot: 'Engineering-page SEO title, description & OG values',
    bibleRef: 'P10A §08',
    interim: 'routes.engineering metadata + frozen site identity (siteConfig)',
  },
] as const;
