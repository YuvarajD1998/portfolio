/**
 * Transpahire flagship case-study content — the frozen copy (Sprint 07).
 *
 * Content lives apart from code (Blueprint §10). Every visible string on the
 * Transpahire case study is declared here, drawn verbatim from an approved
 * source, so the feature components hold layout only and never a literal
 * (S07 §01 RULE).
 *
 * PROVENANCE — the two frozen books are the single source of truth:
 *   - Portfolio Content Bible (P10A) — narrative copy & framework skeleton.
 *   - Transpahire Product Book (P10B) — every technical fact, weight, status
 *     glyph and locked decision. Its status legend — Implemented / Partial /
 *     Planned / Flag-gated / Deprecated — survives into the page unchanged
 *     (S07 governing principle, §01 RULE). The case study NEVER overstates a
 *     flag-gated or partial feature as shipped.
 *
 * The strings below are transcribed from the S07 brief's section boxes, which
 * quote the Product Book directly. Where the brief marks a slot unwritten, it is
 * recorded in `blockers` (C1–C8) as an OPEN change request against the books and
 * wired against the interim frozen source the brief itself names — never
 * lorem-ipsum, never an invented metric (S07 §01 RULE, §22).
 *
 * STATUS glyphs are modelled as data (`Status`) so a component renders the true
 * status and can never silently round a Partial/Flag-gated feature up to shipped.
 */

import { routes } from '@/config/navigation';
import { siteConfig } from '@/config/site';

/** The Product Book status legend (S07 governing principle). */
export type Status =
  | 'implemented' // ✅ shipped
  | 'partial' // 🟡 present but incomplete
  | 'flag-gated' // 🟠 built, OFF by default behind a flag
  | 'planned' // 🔵 intended, not built
  | 'deprecated'; // ⊘ dead / removed, named plainly

/** Human label + accessible phrasing for each status (a11y: never colour alone). */
export const STATUS_META: Record<
  Status,
  { label: string; tone: 'success' | 'warning' | 'info' | 'neutral' }
> = {
  implemented: { label: 'Implemented', tone: 'success' },
  partial: { label: 'Partial', tone: 'warning' },
  'flag-gated': { label: 'Flag-gated', tone: 'warning' },
  planned: { label: 'Planned', tone: 'info' },
  deprecated: { label: 'Deprecated', tone: 'neutral' },
};

/* ========================================================================== *
 * §03 — Hero
 * ========================================================================== */

/**
 * Hero (S07 §03). The frozen positioning line is the approved P08 case-study
 * summary — the same line the Sprint 06 featured band uses, deepened here
 * (S07 §03 note). C1 pending: hero headline treatment & exact CTA labels are an
 * unwritten P10A slot; interim source is this frozen positioning line + the
 * approved routes for CTA destinations (S07 §03 BLOCKER).
 */
export const hero = {
  eyebrow: 'Flagship case study',
  /** C1 interim: the flagship name (frozen, siteConfig). The page's single <h1>. */
  title: siteConfig.flagship,
  /** Frozen positioning line — approved P08 case-study summary (S07 §03). */
  positioning: 'AI recruitment platform',
  summary:
    'Built an AI recruitment platform from an empty repo to daily production ' +
    'use — data model, embedding pipeline, recruiter UI and nine API services.',
  /** C1 interim: neutral system microcopy naming the destination, not a headline. */
  primaryCta: {
    label: 'Read the engineering deep-dive',
    href: routes.transpahireEngineering.href,
  },
  secondaryCta: { label: 'Back to work', href: routes.projects.href },
  /** Frozen technology summary chips (S07 §03, verbatim). */
  tech: [
    'React 19',
    'TypeScript',
    'NestJS',
    'FastAPI',
    'PostgreSQL + pgvector',
    'Prisma',
    'BullMQ + Redis',
    'Gemini',
  ],
} as const;

/* ========================================================================== *
 * §04 — Product story & problem
 * ========================================================================== */

/** Product story (S07 §04). Frozen framing from the Product Book (P10B). */
export const productStory = {
  centralBet: {
    label: 'The central bet',
    body:
      'AI match scores are worthless unless every score comes with an ' +
      'inspectable, grounded explanation — which skills matched or are missing, ' +
      'why they were weighted, backed by real resume text, never hallucinated. ' +
      'Transpahire positions against both traditional ATS and generic job ' +
      'boards as a candidate-centric, AI-explainable marketplace.',
  },
  marketShape: {
    label: 'The market shape',
    body:
      'A three-sided marketplace: candidates, organizations with six internal ' +
      'roles, and a platform-admin SaaS-governance layer. A candidate keeps one ' +
      'global identity across every organization rather than being duplicated ' +
      'per employer.',
  },
  /** S07 §04 RULE — the honesty guard rendered on the page, not just in review. */
  note:
    'Transpahire was built solo as a portfolio-scale product. The case study ' +
    'states that honestly and never implies a team, funding, market statistics ' +
    'or a commercial deployment that no source supplies.',
} as const;

/* ========================================================================== *
 * §05 — User personas & product goals
 * ========================================================================== */

/**
 * Personas (S07 §05) — the candidate, the six organization sub-roles and the
 * platform admin, backed by the real Role / OrgRole enums (P10B), not an
 * invented taxonomy.
 */
export const personas = [
  {
    role: 'Candidate',
    body:
      'Own profile, resume upload + AI critique, search/apply, saved jobs & ' +
      'alerts, application tracking, employer reviews, GDPR self-service opt-out.',
  },
  {
    role: 'Org Admin',
    body:
      'Full org control: member invites/roles, company profile & branding, ' +
      'verification, audit log, billing tab (UI only), review responses.',
  },
  {
    role: 'JD Manager',
    body:
      'Create/edit/publish jobs, own the JD lifecycle, skill-weight tuning, ' +
      'JD optimizer, what-if simulator.',
  },
  {
    role: 'Hiring Manager',
    body:
      'JD Manager visibility + team management, decision justification, ' +
      'drop-off risk, fairness analysis.',
  },
  {
    role: 'Recruiter',
    body:
      'Candidate search, talent-pool management, resume import ' +
      '(single/bulk/CSV), outreach/invitations, pipeline moves.',
  },
  {
    role: 'Sourcer',
    body:
      'Narrower recruiter: discovery + talent-pool import only, no analytics, ' +
      'fairness or tuning.',
  },
  {
    role: 'Interviewer',
    body: 'Most restricted org role: job list + calendar only.',
  },
  {
    role: 'Platform Admin',
    body:
      'Cross-org superuser: bypasses every role/org/tenant guard, full ops ' +
      'console + time-boxed impersonation.',
  },
] as const;

/** The locked identity decision, surfaced as a product-thinking point (S07 §05). */
export const identityDecision = {
  label: 'Locked identity decision',
  body:
    'A candidate is always one global User + Profile pair, never duplicated ' +
    'per org. Recruiter resume import creates an UNCLAIMED account under that ' +
    'same global identity; a private, org-scoped OrganizationCandidate row ' +
    '(notes/tags/rating, never candidate-visible) makes the shared identity ' +
    'feel org-specific without forking it. This is the kind of decision the ' +
    'case study exists to explain.',
} as const;

/* ========================================================================== *
 * §06 — Solution overview & core features
 * ========================================================================== */

/**
 * Core features (S07 §06). Each carries its Product-Book status glyph; two facts
 * survive verbatim rather than being smoothed over: Job.qualityScore is Partial
 * (a filterable/sortable column with no scorer, permanently null) and the
 * Platform Analytics Revenue tab is a `{ available: false }` stub (S07 §06 RULE).
 */
export const features: ReadonlyArray<{
  title: string;
  status: Status;
  body: string;
}> = [
  {
    title: 'Jobs & lifecycle',
    status: 'implemented',
    body:
      '12-state job lifecycle, version-snapshot history, custom pipeline ' +
      'stages, screener questions, role-based assignment; JD authored manually ' +
      'or AI-extracted with Critical/Required/Preferred/Bonus skill tiers.',
  },
  {
    title: 'Candidate profile',
    status: 'implemented',
    body:
      '11-field completeness formula → 4-step onboarding; resume upload → AI ' +
      'extraction with merge-review (no silent overwrite); career-gap ' +
      'detection; PUBLIC/LIMITED/ANONYMOUS privacy; 148k-city location ' +
      'resolution.',
  },
  {
    title: 'Applications & pipeline',
    status: 'implemented',
    body:
      '8-state application machine with every transition logged; interview ' +
      'scheduling, structured feedback, activity timeline; non-blocking warning ' +
      'when advancing a LIMITED candidate with no prior recorded outreach.',
  },
  {
    title: 'ATS talent pool',
    status: 'implemented',
    body:
      'Private org-scoped candidate DB with no second identity system; ' +
      'single/bulk/CSV import, semantic duplicate detection (never ' +
      'auto-merges), invite-to-activate, GDPR retention pipeline.',
  },
  {
    title: 'Skill & role taxonomy',
    status: 'implemented',
    body:
      'Canonical skill + job-title ontologies with synonyms, hierarchy and ' +
      'cross-skill relations; LLM classifies unknown skill strings; NO_MATCH ' +
      'verdicts suppressed from scoring & search but never deleted (reversible).',
  },
  {
    title: 'Platform admin console',
    status: 'implemented',
    body:
      'A genuine internal ops product: org suspend/verify + impersonation, AI ' +
      'cost/cascade visibility, search-quality & data-quality dashboards, queue ' +
      'browser, GDPR request processing, feature-flag management. Revenue tab ' +
      'is an explicit stub.',
  },
] as const;

/** The two honesty flags §06 insists survive (S07 §06 RULE). */
export const featureHonesty = [
  {
    subject: 'Job.qualityScore',
    status: 'partial' as Status,
    body:
      'A filterable/sortable column with no scorer behind it — permanently ' +
      'null. Present in the schema, not yet computed.',
  },
  {
    subject: 'Platform Analytics · Revenue tab',
    status: 'planned' as Status,
    body:
      'A { available: false } stub pending a Billing module that was never ' +
      'built. Named as a stub, not shown as a working feature.',
  },
] as const;

/* ========================================================================== *
 * §07 — UX & design process
 * ========================================================================== */

/** Design process (S07 §07) — product thinking, not just UI. */
export const designProcess = {
  decisions: [
    'Explanation-first UI — every score is inspectable',
    'Merge-review on resume import (candidate confirms; no silent overwrite)',
    'Career gaps surfaced with candidate-annotatable reasons',
    'One shared card / component library across three audiences',
    'Empty, warning & degraded states are designed, not afterthoughts',
  ],
  ensures: [
    'Rationale framed as trade-offs, not features',
    'Wireframe / flow assets are approved artifacts',
    'Structured, scannable layout (not a wall of prose)',
    'Ties each design choice to a user pain point',
  ],
  /** S07 §07 NOTE — the template-lineage distinction, on the page. */
  note:
    "Transpahire's product UI was built from a commercial admin-dashboard " +
    'template lineage and rebuilt into a role-gated three-audience app. This ' +
    "describes Transpahire's design reasoning — distinct from the Datum " +
    "portfolio's own design system. (C3: research & wireframe narrative slots " +
    'are unwritten; see the content-blocker registry.)',
} as const;

/* ========================================================================== *
 * §08 — User journey
 * ========================================================================== */

/** User journey (S07 §08) — both sides, tracing the real state machines. */
export const journeys = {
  candidate: {
    label: 'Candidate journey',
    steps: [
      'Sign up & verify email',
      'Upload resume → AI extraction → merge-review confirm',
      'Complete profile (4-step wizard, completeness score)',
      'Search & apply, save jobs, set alerts',
      'Track application through the 8-state pipeline',
      'Reach ACCEPTED → prompted to review the employer',
    ],
  },
  recruiter: {
    label: 'Recruiter journey',
    steps: [
      'Author or AI-extract a JD; set skill tiers & weights',
      'Run matching → ranked candidates with explanations',
      'Tune weights; run the what-if simulator',
      'Import to talent pool; dedup; invite to activate',
      'Move candidates through the pipeline; log feedback',
      'Extend offer; decision justification recorded',
    ],
  },
} as const;

/* ========================================================================== *
 * §09 — System architecture
 * ========================================================================== */

/** System architecture (S07 §09) — four repos, one database, clear authority. */
export const systemArchitecture = {
  repos: [
    {
      name: 'transpahire-backend',
      tech: 'NestJS 11',
      body:
        'Single source of truth — owns every write, every migration, all ' +
        'authorization. Prisma 6 + PostgreSQL/pgvector, BullMQ + Redis, JWT.',
    },
    {
      name: 'transpahire-fastapi-backend',
      tech: 'Python',
      body:
        'Stateless AI compute layer. No authority; called only by NestJS via ' +
        'an internal API key, never by the frontend. NestJS re-validates & ' +
        're-grounds its output.',
    },
    {
      name: 'frontend',
      tech: 'React 19 / Vite 6',
      body:
        'One role-gated SPA serving candidates, six org sub-roles and platform ' +
        'admins. ~150 routes across 17 top-level view dirs.',
    },
    {
      name: 'transpahire-landing',
      tech: 'static SPA',
      body:
        'Fully disconnected marketing site — zero API calls, no shared code, ' +
        'no real pricing.',
    },
  ],
  /** The subtle bit the diagram must make legible (S07 §09 callout). */
  sharedDb:
    'FastAPI and NestJS share one physical Postgres database. FastAPI ' +
    'reads/writes a few tables (embeddings, ai_call_log) via raw SQLAlchemy, ' +
    'but Prisma is the sole owner of schema migrations even for those tables. ' +
    'No such architecture diagram exists in the source repos — building it ' +
    'clearly here is a genuine contribution of the case study.',
  /** Scale snapshot rendered verbatim from the Product Book (S07 §09 RULE). */
  scale: [
    { value: '~90', caption: 'Prisma models' },
    { value: '68', caption: 'migrations' },
    { value: '50+', caption: 'enums' },
    { value: '148k', caption: 'seeded cities' },
    { value: '~150', caption: 'frontend routes' },
    { value: '~30', caption: 'NestJS modules' },
  ],
} as const;

/* ========================================================================== *
 * §10 — Frontend architecture
 * ========================================================================== */

/** Frontend architecture (S07 §10) — one SPA, three audiences, role-gated. */
export const frontendArchitecture = {
  stack: [
    'React 19 / Vite 6 / TypeScript (strict)',
    'react-router-dom v6, fully lazy tree, ~150 routes',
    "Routes gated by an authority array vs. the user's [role, orgRole]",
    'Tailwind 4 + hand-built component library + CSS-variable design system (no MUI/AntD)',
    '7 static navigation trees selected purely from [role, orgRole]',
  ],
  state: [
    'Redux Toolkit + redux-persist (domain state, auth source of truth)',
    'Zustand for display-only session/theme — deliberately dual',
    '28 slices, each with a thunk.ts; no component calls Axios directly',
    'React Hook Form + Zod; form state never touches Redux',
    'Axios interceptor with a silent-refresh queue',
  ],
  /** S07 §10 HONEST — template-lineage leftovers named, not hidden. */
  honest:
    'Template-lineage leftovers are named, not hidden: the package is still ' +
    'called "ecme" from its admin-dashboard origin; two unused legacy folders ' +
    '(views/customers, views/demo) and two parallel theme mechanisms reflect an ' +
    'in-progress design-system migration. Some nav entries are forward-declared ' +
    'to routes not yet in the config. The case study presents these as real ' +
    'engineering context, not defects to conceal.',
} as const;

/* ========================================================================== *
 * §12 — Backend architecture
 * ========================================================================== */

/** Backend architecture (S07 §12) — controllers, services, queues, guards. */
export const backendArchitecture = {
  structure: [
    '~30 feature modules; heaviest are matching/ (20 services, 9 phases), modules/jobs/, platform-admin/',
    'Every controller declares its own Swagger; full docs at /api/docs',
    '13 BullMQ queues + 5 crons; busiest are debounced embedding generation and email',
    'Two GDPR anonymization crons (90-day / 30-day), idempotent, hard-delete embeddings',
  ],
  guardsEmail: [
    'Three composable per-route guards: RolesGuard, OrgRolesGuard, TenantGuard (PLATFORM_ADMIN bypasses)',
    '16 live Handlebars email templates through a single MailService chokepoint',
    'bcrypt via one sanctioned utility; global 100/min rate limit, stricter on auth/AI',
  ],
  /** S07 §12 HONEST — the two things the Product Book insists survive. */
  honest:
    'Two things survive into the narrative: guards are applied per-controller, ' +
    'not globally — a new controller can forget @UseGuards(JwtAuthGuard) with no ' +
    'framework backstop, a real known gap. And a fully-built CASL ability factory ' +
    'exists with zero call sites (dead); guard-based auth is what actually runs. ' +
    'Their trade-offs are discussed in Challenges, not glossed.',
} as const;

/* ========================================================================== *
 * §13 — Data model
 * ========================================================================== */

/** Data model (S07 §13) — ninety models, two deliberate patterns. */
export const dataModel = {
  domains: [
    'Identity',
    'Organization',
    'Jobs',
    'Skill/Role Taxonomy',
    'Applications',
    'Candidate Profile',
    'Matching/Embeddings',
    'Search',
    'ATS Talent Pool',
    'Reviews',
    'Platform Admin',
    'Locations',
  ],
  patterns: [
    {
      title: 'No FK on audit tables',
      body:
        'MatchAuditLog, SearchAuditLog, RecruiterOutreach, AiCallLog carry no ' +
        'foreign key: fire-and-forget audit writes where FK latency is not ' +
        'worth it.',
    },
    {
      title: 'Canonical-alias pattern',
      body:
        'A row points to a canonical row instead of being deleted ' +
        '(Bangalore→Bengaluru; SkillTaxonomy mergedIntoId): no destructive ' +
        'migration ever needed to fix a naming collision.',
    },
  ],
  /** S07 §13 RULE — GDPR hard-delete of embeddings, verbatim. */
  note:
    'Five separate embedding vectors are stored per candidate; embedding ' +
    'vectors are hard-deleted on GDPR anonymization (Art. 17 personal data), ' +
    'not nulled. Model counts render verbatim from the Product Book.',
} as const;

/* ========================================================================== *
 * §14 — AI architecture & resume-parsing pipeline
 * ========================================================================== */

/** AI architecture (S07 §14) — the AI that never simply fails. */
export const aiPipeline = {
  cascade: {
    label: 'Model cascade (cost-first)',
    body:
      'Every generative call tries up to three Gemini tiers cheapest-first, ' +
      'then rotates to the next API key and retries the same three-model ' +
      'sequence. Resume parsing degrades further: Gemini → OpenAI → ' +
      'HuggingFace → regex → bare stub. It never throws — upload cannot fail ' +
      'outright, only degrade to a low-confidence stub.',
  },
  perCapability: [
    'JD parsing — Gemini cascade only; raises on total failure',
    'Embeddings — gemini-embedding-001, 768-dim; local sentence-transformer fallback on the JD path',
    'Semantic search — pure pgvector cosine, no LLM, deterministic SQL',
    'Match explanation — forced JSON schema; “grounded-empty” on failure, never fabricates',
    'Duplicate detection — pgvector ≥0.85, never auto-merges',
  ],
  /** The anti-hallucination spine (S07 §14 callout). */
  antiHallucination:
    "Anti-hallucination is the product's spine. The AI Match Explanation runs " +
    'a 4-layer defence: the LLM must cite verbatim snippets; a Pydantic schema ' +
    'enforces structure; NestJS re-verifies each cited snippet is an actual ' +
    "substring of the candidate's real profile text; failed claims are silently " +
    'dropped. Every AI call — win or lose — writes one fire-and-forget row to ' +
    'ai_call_log (endpoint, model attempted vs. actual, cascade position, ' +
    'tokens, latency, success), visible in the platform-admin AI Ops console ' +
    'with a hardcoded price table that is explicitly “not billing-grade.”',
  /** S07 §14 HONEST — the flag-gated status and the vendor-churn lesson. */
  honest:
    'The AI Match Explanation feature is flag-gated OFF by default — built and ' +
    'gated, not a live default. Operational fragility is named too: Google ' +
    'retired gemini-2.0-flash and newer tiers began 404ing for new API users, ' +
    'each forcing reactive edits to the hardcoded cascade — a recurring ' +
    'maintenance cost, presented as a real lesson.',
} as const;

/* ========================================================================== *
 * §15 — Candidate matching & semantic search
 * ========================================================================== */

/** Candidate matching (S07 §15) — two engines, never unified. */
export const matching = {
  jobBased: {
    label: 'Job-based matching (RankerService)',
    body:
      'Scores a candidate vs. a specific requisition: skill-coverage 65% / ' +
      'semantic similarity 25% / experience 7% / location 3%. Hard gate: ' +
      'missing any Critical skill zeroes the score. Skill tiers: Critical / ' +
      'Required / Preferred / Bonus.',
  },
  jdLess: {
    label: 'JD-less search (SearchRankerService)',
    body:
      'Scores a candidate vs. free-text search with no job context; ' +
      'redistributes weight only across the tiers the recruiter actually ' +
      'specified. A separate engine by design — the two are never unified ' +
      '(locked decision).',
  },
  /** The weight formula, as explicit data for the depth panel. */
  weights: [
    { axis: 'Skill coverage', weight: '65%' },
    { axis: 'Semantic similarity', weight: '25%' },
    { axis: 'Experience', weight: '7%' },
    { axis: 'Location', weight: '3%' },
  ],
  shipped: [
    '6-axis explainability + confidence + missing/partial skills',
    'Per-job per-skill weight tuning 0.1×–5.0×; JD optimizer',
    'What-if simulator: re-scores cached pool in ~5ms, no re-query, no AI call',
    'Hidden-talent detection; career & seniority intelligence',
    'Full audit trail — every score logged with its exact weight snapshot',
  ],
  flagGated: [
    'Seniority penalty (SENIORITY_MODIFIER_ENABLED=false) — the 8–15% penalty held pending ≥100 confirmed hires across 10+ jobs to validate it',
    'Ranked-snapshot pagination (freezes ranked set in Redis 10min)',
    'AI Match Explanation (grounded, on-demand)',
  ],
  /** S07 §15 RULE — unified search + deleted endpoint, verbatim. */
  note:
    'Candidate search is one unified endpoint (structured filters + free-text ' +
    'NL + hybrid semantic+keyword); an older separate semantic-search endpoint ' +
    'was deleted for leaking privacy-protected candidates and skipping audit ' +
    'logging — a deliberate deletion worth telling. Full-text = GIN-indexed ' +
    'tsvector (sub-100ms at 1M+ profiles); semantic = pgvector ANN fused with ' +
    'keyword via reciprocal rank fusion. Privacy modes PUBLIC / LIMITED / ' +
    'ANONYMOUS govern search visibility.',
} as const;

/* ========================================================================== *
 * §16 — API ecosystem & authentication
 * ========================================================================== */

/** API ecosystem & auth (S07 §16) — REST, JWT, and a re-grounding boundary. */
export const apiAuth = {
  authentication: [
    'JWT bearer (effective 15-min expiry) + httpOnly-cookie refresh token',
    'Refresh token SHA-256 hashed at rest — raw JWT never persisted',
    'Axios silent-refresh queue on the frontend',
    'Three composable guards; all let PLATFORM_ADMIN bypass',
  ],
  boundary: [
    'REST over GraphQL (locked decision); Swagger at /api/docs',
    'FastAPI reachable only by NestJS via internal API key — never the frontend',
    'Impersonation: hardcoded 15-min expiry, cannot target another platform admin, 10/hour rate limit, immediately revocable (token blacklisted)',
  ],
  /** S07 §16 RULE — nine-services phrasing + removed isSuperAdmin, verbatim. */
  note:
    'The “nine API services” phrasing from the positioning line refers to the ' +
    'NestJS service surface; this describes the real REST boundary and does not ' +
    'invent endpoint counts or a public API the product does not expose. The ' +
    'isSuperAdmin field/flow was removed — every check now uses ' +
    'Role.PLATFORM_ADMIN directly.',
} as const;

/* ========================================================================== *
 * §17 — Scalability, performance & security
 * ========================================================================== */

/** Scalability / performance / security (S07 §17). Transpahire's posture. */
export const scalabilitySecurity = {
  scalability: [
    'pgvector in Postgres, not a separate vector DB — one transactional query for metadata + similarity',
    'GIN tsvector full-text, sub-100ms at 1M+ profiles',
    'Debounced embedding generation via BullMQ',
    'Redis caches (experience score, ranked snapshots)',
  ],
  performance: [
    'What-if simulator ~5ms on cached pool, no AI call',
    'Cost-first model cascade minimises spend per call',
    'Reciprocal-rank-fusion hybrid ranking',
    'Fully lazy-loaded frontend route tree',
  ],
  security: [
    'bcrypt (one sanctioned utility)',
    'Rate limits: 100/min global, stricter on auth/AI',
    'Tenant isolation via TenantGuard',
    'GDPR: opt-out cascade, hard-delete of embeddings, two anonymization crons',
  ],
  /** S07 §17 RULE — product metrics ≠ page metrics; no invented SLAs. */
  note:
    "This describes Transpahire's posture, distinct from the Datum page's own " +
    'a11y/perf/SEO obligations. No load-test numbers or uptime SLAs are claimed ' +
    'beyond what the Product Book supplies.',
} as const;

/* ========================================================================== *
 * §18 — Engineering challenges & trade-offs
 * ========================================================================== */

/** Challenges & trade-offs (S07 §18) — the hard choices, named plainly. */
export const tradeOffs = [
  {
    title: 'Postgres + pgvector over a dedicated vector DB',
    body:
      'One transactional query for metadata + similarity; simpler ops. ' +
      'Trade-off: gives up specialised vector-DB tuning.',
  },
  {
    title: 'Two scoring engines, never unified',
    body:
      'Job-context and JD-less search have different weight semantics; forcing ' +
      'one engine would corrupt both. Trade-off: two codepaths to maintain.',
  },
  {
    title: 'Stateless FastAPI over in-NestJS AI',
    body:
      'AI compute isolated and independently deployable; NestJS re-grounds ' +
      'output. Trade-off: a shared-DB, two-language boundary.',
  },
  {
    title: 'Per-controller guards, no global backstop',
    body:
      'Explicit per-route authz; a known gap where a new controller can forget ' +
      'its guard. A built CASL factory sits unused. Honest debt.',
  },
  {
    title: 'Redux Toolkit thunks over React Query/SWR',
    body:
      'One state model, persisted, auth as source of truth. SWR is an ' +
      'installed-but-unused dep. Trade-off: more boilerplate per slice.',
  },
  {
    title: 'Seniority penalty held behind a flag',
    body:
      'Refused to ship an unvalidated 8–15% penalty; gated OFF pending ≥100 ' +
      'confirmed hires. Product restraint over a feature that reads well.',
  },
] as const;

/* ========================================================================== *
 * §19 — Results & lessons learned
 * ========================================================================== */

/** Results & lessons (S07 §19) — what it became, what it taught. */
export const results = {
  outcomes: [
    'An empty repo → a daily-production-use AI recruitment platform, built solo',
    '~90 models, ~30 modules, ~150 routes, 9-phase matching engine — all shipped',
    'A genuine internal ops product (platform-admin console) alongside the marketplace',
    'Maturity stated honestly: some features Partial / Planned / Flag-gated',
  ],
  lessons: [
    'Ground every AI claim or it is worthless — anti-hallucination as spine',
    'Vendor model churn is a real, recurring cost (Gemini tier retirements)',
    'Ship restraint: hold unvalidated scoring behind flags',
    'Explicit per-route authz needs a backstop; name the debt',
  ],
  /** S07 §19 BLOCKER — quantitative results are Content Required (C6). */
  note:
    'Any quantitative result (users, hires, latency-in-production, adoption) ' +
    'must come verbatim from an approved source. Where the books mark a metric ' +
    'Content Required, the copy stays qualitative rather than fabricating a ' +
    'number (C6).',
} as const;

/* ========================================================================== *
 * §20 — Product roadmap & final CTA
 * ========================================================================== */

/** Roadmap & final CTA (S07 §20). Roadmap = real Planned / Flag-gated items. */
export const roadmap = {
  /** S07 §20 RULE — presented as intentions, never as shipped or dated. */
  items: [
    'Billing / subscriptions module (revenue tab is a stub today)',
    'Validate & enable the seniority penalty after enough confirmed hires',
    'Enable ranked-snapshot pagination & grounded AI explanation',
    'Build the Job.qualityScore scorer behind the existing column',
    'Global auth backstop; retire the dead CASL factory or wire it in',
  ],
  /** C7 interim: neutral destination microcopy + approved routes (S07 §20 RULE). */
  cta: {
    eyebrow: 'The work now speaks',
    title: 'Explore the depth, or get in touch.',
    primary: {
      label: 'Read the engineering deep-dive',
      href: routes.transpahireEngineering.href,
    },
    secondary: { label: 'Back to all work', href: routes.projects.href },
    tertiary: { label: 'Get in touch', href: routes.contact.href },
  },
} as const;

/* ========================================================================== *
 * SEO (S07 §22)
 * ========================================================================== */

/**
 * SEO set (S07 §22). C8 pending — case-study SEO title/description/OG are a
 * P10A §08 slot not yet written. Interim source: the approved routes.transpahire
 * metadata already shipped on the Sprint 03 placeholder page (frozen route copy).
 * Structured data is CreativeWork (the approved P10 §15 model) — never
 * SoftwareApplication (S07 §22 RULE).
 */
export const seo = {
  title: routes.transpahire.title,
  description: routes.transpahire.description,
  /** CreativeWork keywords: the frozen technology summary (S07 §03). */
  keywords: hero.tech,
} as const;

/* ========================================================================== *
 * Content-blocker registry (S07 §22)
 * ========================================================================== */

/**
 * Content-blocker registry (S07 §22, C1–C8). Each entry is an OPEN change
 * request against the frozen books, recorded in code so the pending slot is
 * auditable and its interim source explicit. When the Bible supplies the final
 * string/asset, update the referenced const above and delete the entry — no
 * layout change. No improvised copy or invented metric stands in (S07 §22 RULE).
 */
export const blockers = [
  {
    id: 'C1',
    slot: 'Hero headline treatment & exact CTA labels',
    bibleRef: 'P10A §07',
    interim: 'frozen P08 positioning line + approved route CTA destinations',
  },
  {
    id: 'C2',
    slot: 'Product-story prose (vision/opportunity/market-context final copy)',
    bibleRef: 'P10A §07',
    interim: 'Product Book central-bet & market-shape framing (P10B)',
  },
  {
    id: 'C3',
    slot: 'Design-process research & wireframe narrative slots',
    bibleRef: 'P10A §07',
    interim: 'Product Book design-decision list (P10B)',
  },
  {
    id: 'C4',
    slot: 'Approved diagram assets (system / data-flow / AI pipeline SVGs)',
    bibleRef: 'S07 §22 C4',
    interim: 'inline SVG built from the Product Book architecture facts (P10B)',
  },
  {
    id: 'C5',
    slot: 'Approved product screenshots for the feature showcase',
    bibleRef: 'S07 §22 C5',
    interim: 'text-only feature cards at true status — no mocked-up screen',
  },
  {
    id: 'C6',
    slot: 'Any quantitative result / metric marked Content Required',
    bibleRef: 'P10A / P10B Content Required',
    interim: 'qualitative copy only; no fabricated number',
  },
  {
    id: 'C7',
    slot: 'Closing CTA copy & destinations for the case study',
    bibleRef: 'P10A §07',
    interim:
      'neutral destination microcopy + approved transpahire/projects/contact routes',
  },
  {
    id: 'C8',
    slot: 'Case-study SEO title, description & OG values',
    bibleRef: 'P10A §08',
    interim: 'routes.transpahire metadata',
  },
] as const;
