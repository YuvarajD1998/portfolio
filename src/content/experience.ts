/**
 * Experience-page content — the frozen career record (Sprint 09).
 *
 * Content lives apart from code (Blueprint §10). Every visible string on the
 * Experience page is declared here, drawn from an approved source, so the
 * feature components hold layout only and never a literal (S09 §01 RULE).
 *
 * PROVENANCE — the approved phases are the single source of truth:
 *   - Portfolio Content Bible, Book A (P10A) — the career record: the two roles
 *     (BlueRose Technologies, Concentrix), their titles, durations, locations,
 *     responsibilities, technologies and domains; the education node; the
 *     certifications; and the front-end → full-stack through-line. Every field
 *     below is rendered VERBATIM from Book A and cross-checked against the
 *     Résumé (S09 §01, §06, §07 RULE).
 *   - The career through-line callout (P10A §05) is reused verbatim from the
 *     frozen About copy (`@/content/about`) so there is ONE canonical arc text,
 *     not an Experience-only variant (S09 §04 RULE).
 *
 * The Experience page occupies the biographical altitude (S09 §00 NOTE): the
 * chronology of employment, responsibility and impact. Where it names a project
 * or a technical decision it LINKS OUT to the page that owns that detail (the
 * Transpahire case study §S07, the Engineering page §S08, the Projects overview
 * §S06) — it never re-tells them.
 *
 * The freeze is absolute (S09 governing principle): this file generates NO new
 * employment history, rewrites NO job description, invents NO responsibility,
 * modifies NO date, changes NO company name, adds NO unlisted technology and
 * rewords NO achievement. Where a fact is not recorded in Book A it is listed in
 * `blockers` as an OPEN change request (Content Required) — never fabricated in
 * code (S09 §01, §16; CLAUDE.md golden rule).
 */

import { routes } from '@/config/navigation';
import { journey as aboutJourney } from '@/content/about';

/* ========================================================================== *
 * §03 — Hero & professional summary (the frame + the page's single <h1>)
 * ========================================================================== */

/**
 * Hero & professional overview (S09 §03). Frames the professional and states the
 * arc, then hands the reader into the timeline. The summary states the
 * through-line Book A records — front-end specialist → full-stack engineer
 * owning production APIs, auth and AI recruitment workflows — confidently but
 * honestly: no overstated seniority, no unverifiable scale claim, no buzzwords
 * (S09 §03 RULE, P10A tone). The overview prose is a P10A slot not yet written
 * (blocker C1); interim source is the frozen positioning + the through-line.
 */
export const overview = {
  eyebrow: 'Experience',
  /** The page's single <h1> — the page title the Content Bible names (S09 §03). */
  title: 'Experience',
  /** C1 interim: the arc, framed from frozen positioning — not a headline. */
  positioning: 'Front-end specialist to full-stack engineer',
  intro:
    'Four-plus years across two companies, one continuous line of growth: ' +
    'from shipping React features inside enterprise teams to owning production ' +
    'APIs, authentication and AI-powered recruitment workflows end to end.',
  summary:
    'This is where the judgment was earned. Below is the career as it happened ' +
    '— the roles, the responsibilities owned, the technologies used and the ' +
    'impact delivered — told as a single arc, newest role first. The projects ' +
    'and the philosophy live on their own pages; here is the trajectory that ' +
    'produced them.',
  /** Frozen positioning chips (S09 §03, P10A) — each a fact, not a logo wall. */
  chips: [
    'Senior Frontend / Full-Stack',
    '4+ years',
    'Bengaluru, India',
    'React',
    'TypeScript',
    'NestJS',
    'FastAPI',
  ],
} as const;

/* ========================================================================== *
 * §04 — The career-arc through-line (one arc, not two entries)
 * ========================================================================== */

/**
 * The frozen through-line (S09 §04). Stated ONCE here and reinforced by the
 * timeline's visual progression — never re-argued, never dramatized beyond what
 * Book A records; the 45-day migration is a frozen fact, not rounded or
 * restated with a different number (S09 §04 RULE). The callout text is reused
 * VERBATIM from the frozen About through-line (P10A §05) so there is one
 * canonical arc string.
 */
export const arc = {
  eyebrow: 'The career arc',
  title: 'One arc, not two entries.',
  /** [FROZEN] verbatim from about.journey.throughLine (P10A §05). */
  throughLine: aboutJourney.throughLine,
  /** The two movements of the arc (S09 §04) — framing only frozen facts. */
  movements: [
    {
      title: 'Movement one — specialist',
      body:
        'Front-end delivery at scale: React/Redux features, REST integration, ' +
        'testing, cross-functional delivery in an enterprise SDLC. The depth ' +
        'that earns the breadth.',
    },
    {
      title: 'Movement two — full-stack',
      body:
        'Ownership across the stack: SPA migration, multi-tenant RBAC, ' +
        'real-time, AI modules, and production FastAPI / NestJS APIs. The ' +
        'breadth the seniority claims.',
    },
  ],
} as const;

/* ========================================================================== *
 * §05–§07, §09, §15 — The career record: the reusable role schema
 * ========================================================================== */

/**
 * The role-card content schema (S09 §15) — the reusable shape the Résumé page
 * and any future chronology reuse rather than rebuild. A chronology instance
 * supplies role objects; it does not restyle the component (S09 §15 NOTE).
 *
 * Every field is rendered verbatim; both cards share this one field order —
 * company, position, duration, responsibilities, technologies, domain — so the
 * reader compares like with like (S09 §07 RULE). A technology not recorded in
 * Book A for a role is NOT added, even where it appears elsewhere in the career.
 */
export interface Role {
  /** Stable anchor id — the timeline node ↔ card binding + deep-link target. */
  id: string;
  company: string;
  position: string;
  location: string;
  /** Human duration label, e.g. "Sept 2024 – present". Metadata, not a headline. */
  duration: string;
  /** Machine-readable ISO start (structured data + ordering). */
  startDate: string;
  /** Machine-readable ISO end, or null for the present role. */
  endDate: string | null;
  /** Responsibilities & work, verbatim (Book A). */
  responsibilities: readonly string[];
  /** Technologies used in THIS role, verbatim (Book A). */
  technologies: readonly string[];
  /** Business domain / products — a pointer, never a second copy of §S06/§S07. */
  domain: string;
}

/**
 * §06 & §07 — the two roles, newest first (S09 §05 chronology). BlueRose is the
 * present full-stack role; Concentrix is the first professional role where the
 * front-end specialism was built. Both are frozen Book A facts, verified vs. the
 * Résumé. Transpahire (the flagship built in the BlueRose role) is LINKED, not
 * re-narrated (S09 §06 HONEST).
 */
export const roles: readonly Role[] = [
  {
    id: 'bluerose',
    company: 'BlueRose Technologies',
    position: 'Frontend / Full-Stack Developer',
    location: 'Bengaluru',
    duration: 'Sept 2024 – present',
    startDate: '2024-09',
    endDate: null,
    responsibilities: [
      'Legacy → React SPA migration (45 days)',
      'Multi-tenant RBAC',
      'Internationalization (i18n)',
      'Real-time features',
      'AI modules for recruitment workflows',
      'Production FastAPI / NestJS APIs, auth systems',
    ],
    technologies: [
      'React',
      'TypeScript',
      'NestJS',
      'FastAPI',
      'Python',
      'Redux',
    ],
    domain:
      'AI recruitment platform. Projects: BlueRise, RATTS, Playwright ' +
      'Automation — owned on the Projects page, linked, not re-told here.',
  },
  {
    id: 'concentrix',
    company: 'Concentrix',
    position: 'Front-End Developer',
    location: 'Bengaluru',
    duration: 'Sept 2021 – Jan 2024',
    startDate: '2021-09',
    endDate: '2024-01',
    responsibilities: [
      'React / Redux application development',
      'REST API integration',
      'Cross-functional delivery',
      'Testing',
      'Enterprise SDLC / agile',
    ],
    technologies: ['React', 'Redux', 'REST', 'JavaScript'],
    domain:
      'ANZ Banking — React/Redux features for a large-scale banking ' +
      'application, delivered under enterprise SDLC / agile.',
  },
] as const;

/**
 * The role that names the flagship, so the §06 card can LINK to the case study
 * rather than re-narrating it (S09 §06 HONEST). Data, not styling.
 */
export const flagshipLink = {
  roleId: 'bluerose',
  label: 'Read the Transpahire case study',
  href: routes.transpahire.href,
} as const;

/* ========================================================================== *
 * §05 — Career timeline (chronology with visual hierarchy)
 * ========================================================================== */

/** Timeline framing (S09 §05). The chronology is the page's spine. */
export const timeline = {
  eyebrow: 'Career timeline',
  title: 'Chronology with visual hierarchy.',
  lead:
    'The career in order, newest first — each role a node on the rail, linked ' +
    'to its full card below. Progression is conveyed by hierarchy, not by ' +
    'shouting dates.',
} as const;

/* ========================================================================== *
 * §08 — Achievements (impact, stated with credibility)
 * ========================================================================== */

/**
 * Achievements (S09 §08). Each is one specific sentence drawn verbatim from the
 * career record (P10A), tied to the role that produced it, quantified only
 * where Book A supplies the number (S09 §08 RULE). The 45-day migration and the
 * Playwright framework are real career record; no percentage, user count or
 * performance figure is claimed unless an approved source supplies it — unbacked
 * metrics are Content Required (blocker C1), never estimated (S09 §08 HONEST).
 */
export const achievements = {
  eyebrow: 'Achievements',
  title: 'Impact, stated with credibility.',
  lead:
    'Product launches, engineering and process improvements, and technical ' +
    'leadership — each drawn from the career record, presented with clarity, ' +
    'not superlatives.',
  /** [FROZEN] recorded achievements (P10A career record), each role-anchored. */
  items: [
    {
      title: 'Legacy-to-React SPA migration completed in 45 days',
      role: 'BlueRose Technologies',
      kind: 'Engineering',
    },
    {
      title: 'Multi-tenant RBAC delivered for a production platform',
      role: 'BlueRose Technologies',
      kind: 'Engineering',
    },
    {
      title: 'Production FastAPI / NestJS APIs and auth owned end to end',
      role: 'BlueRose Technologies',
      kind: 'Ownership',
    },
    {
      title: 'AI-powered recruitment workflows shipped',
      role: 'BlueRose Technologies',
      kind: 'Launch',
    },
    {
      title:
        'POM-based E2E / API / visual / a11y test framework with Allure reporting',
      role: 'BlueRose Technologies',
      kind: 'Leadership',
    },
  ],
} as const;

/* ========================================================================== *
 * §09 — Technology by experience (where the tech was actually used)
 * ========================================================================== */

/**
 * Technology by role (S09 §09). Not a generic skills list — that belongs on the
 * future Skills page (S09 §09 RULE, blocker C-skills). Each entry ties the tech
 * to the role and work where it was applied, so the reader sees context, not a
 * keyword cloud. The chips trace back to the §06/§07 role cards.
 */
export const technologyByRole = {
  eyebrow: 'Technology by experience',
  title: 'Where the tech was actually used.',
  lead:
    'Each technology tied to the role and the work where it was applied — ' +
    'context, not a keyword cloud. This does not pre-empt the Skills page.',
  groups: [
    {
      roleId: 'bluerose',
      company: 'BlueRose Technologies',
      applied:
        'React & TypeScript for the SPA; NestJS & FastAPI for production APIs; ' +
        'Python; Redux for domain state — applied to migration, RBAC, ' +
        'real-time and AI recruitment modules.',
    },
    {
      roleId: 'concentrix',
      company: 'Concentrix',
      applied:
        'React & Redux with REST integration — applied to features for a ' +
        'large-scale banking application under enterprise SDLC / agile.',
    },
  ],
} as const;

/* ========================================================================== *
 * §10 — Collaboration & ownership (professional maturity, shown)
 * ========================================================================== */

/**
 * Collaboration & ownership (S09 §10). Maturity shown through concrete acts —
 * writing adoption docs so a framework is actually used, owning the API contract
 * others depend on — not adjectives. Each statement is anchored to a role and
 * traceable to Book A (S09 §10). Where Book A records no specific detail (team
 * size, mentorship, stakeholder cadence) it is NOT manufactured — those gaps are
 * Content Required (blocker C3); the section never pads with generic teamwork
 * language (S09 §10 HONEST).
 */
export const collaboration = {
  eyebrow: 'Collaboration & ownership',
  title: 'Professional maturity, shown.',
  lead:
    'How this engineer works with others — drawn from the recorded career, not ' +
    'invented soft-skill claims.',
  /** [FROZEN] recorded in the career, each anchored to a role. */
  points: [
    {
      title: 'Cross-functional delivery',
      body:
        'Cross-functional delivery in an enterprise SDLC / agile setting — ' +
        'across design, product and backend.',
    },
    {
      title: 'Product ownership',
      body: 'Product ownership of recruitment workflows end to end.',
    },
    {
      title: 'Enabling the team',
      body:
        'Adoption documentation for the test framework — enabling the team, ' +
        'not just shipping code.',
    },
    {
      title: 'Accountable beyond the front end',
      body:
        'Owning production APIs and auth — accountable for the contract others ' +
        'depend on, beyond the front end.',
    },
  ],
  note:
    'Maturity is shown through concrete acts — writing adoption docs so a ' +
    'framework is actually used, owning the API contract others depend on — not ' +
    'through adjectives. Each statement is anchored to a role and traceable to ' +
    'the career record.',
} as const;

/* ========================================================================== *
 * §11 — Career highlights (the milestones, emphasized)
 * ========================================================================== */

/**
 * Career highlights (S09 §11). A curated VIEW of facts already stated in
 * §06–§09 — not new claims (S09 §11 RULE). Book A records no formal promotion or
 * title change between the two employers, so none is asserted; the "growth"
 * milestone describes the documented specialist → full-stack scope change. Any
 * promotion detail would be Content Required, not assumed.
 */
export const highlights = {
  eyebrow: 'Career highlights',
  title: 'The milestones, emphasized.',
  lead:
    'The timeline distilled for a fast reader — key milestones already stated ' +
    'above, given emphasis, never new claims.',
  items: [
    {
      title: 'Front-end → full-stack',
      body:
        'Grew from React/Redux delivery into owning production APIs, auth and ' +
        'AI workflows.',
    },
    {
      title: '45-day SPA migration',
      body: 'Legacy application migrated to a React SPA in 45 days.',
    },
    {
      title: 'AI recruitment platform',
      body:
        'Built and shipped AI-powered recruitment workflows — the Transpahire ' +
        'flagship.',
      /** Highlight that points at the flagship case study (S09 §11, links out). */
      href: routes.transpahire.href,
      linkLabel: 'Read the Transpahire case study',
    },
    {
      title: 'Test-framework leadership',
      body: 'POM-based E2E/API/visual/a11y framework with Allure and adoption docs.',
    },
  ],
} as const;

/* ========================================================================== *
 * §12 — Education & certifications (the foundation, stated plainly)
 * ========================================================================== */

/**
 * Education & certifications (S09 §12), verbatim from Book A, verified vs. the
 * Résumé, presented factually and without inflation — a supporting node on the
 * timeline. The degree is in Mechanical Engineering; the page states it as
 * recorded and lets the self-taught-to-software arc speak for itself; it is not
 * disguised or reframed (S09 §12 HONEST). Certification issuers/dates are not in
 * Book A — they are Content Required (blocker C2), not invented.
 */
export const education = {
  eyebrow: 'Education & certifications',
  title: 'The foundation, stated plainly.',
  lead:
    'Presented factually and without inflation — the career, not the ' +
    'credential, carries the page.',
  /** [FROZEN] education node (P10A). */
  degree: {
    id: 'education',
    title: 'B.E. Mechanical Engineering',
    institution: 'Sir M. Visvesvaraya Institute of Technology',
    duration: 'Sept 2017 – Oct 2020',
    startDate: '2017-09',
    endDate: '2020-10',
    detail: 'CGPA 7.1/10',
  },
  /** [FROZEN] certifications (P10A). Issuers & dates are Content Required (C2). */
  certifications: [
    'React Developer Certification',
    'Web Developer Certification',
  ],
} as const;

/* ========================================================================== *
 * §13 — CTA & cross-links (hand the reader onward)
 * ========================================================================== */

/**
 * Closing CTA (S09 §13). The Experience page complements the rest of the
 * portfolio; it routes the reader to the pages that own the detail it only
 * pointed at. CTA copy is a P10A slot not yet frozen (blocker C4); interim
 * source is neutral destination microcopy + the approved routes. Links to
 * later-sprint pages (Résumé, Contact) are wired to their approved IA routes —
 * never dropped or pointed at a placeholder (S09 §13 RULE).
 */
export const callToAction = {
  eyebrow: 'Where to next',
  title: 'The trajectory, now legible. See where it led.',
  lead:
    'That is the career. To see the flagship built in it worked end to end, ' +
    'read the Transpahire case study — or see how the judgment behind it works.',
  links: [
    {
      href: routes.transpahire.href,
      label: 'Read the Transpahire case study',
      primary: true,
    },
    { href: routes.engineering.href, label: 'See how I think', primary: false },
    {
      href: routes.projects.href,
      label: 'Explore all projects',
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
 * Experience-page SEO (S09 §16). The final title / description / OG values are an
 * unwritten P10A slot (blocker C5); interim source is the approved route
 * metadata (`routes.experience`) + the frozen site identity. Structured data is
 * Person + ProfilePage — the approved P10 §15 model for a biographical page; a
 * CreativeWork / SoftwareApplication schema belongs to the case-study pages, not
 * here.
 */
export const seo = {
  title: routes.experience.title,
  description: routes.experience.description,
  /** Frozen career keywords for the ProfilePage graph — a fact set, not a claim. */
  knowsAbout: [
    'React',
    'TypeScript',
    'NestJS',
    'FastAPI',
    'Python',
    'Redux',
    'Full-stack engineering',
    'AI recruitment workflows',
    'Multi-tenant RBAC',
    'Frontend architecture',
  ],
} as const;

/* ========================================================================== *
 * Content blockers — OPEN change requests, never fabricated (S09 §16)
 * ========================================================================== */

export const blockers = [
  {
    id: 'C1',
    slot: 'Quantified impact metrics per role (users, latency, adoption %)',
    bibleRef: 'P10A — not in Book A',
    interim: 'qualitative achievement copy only; no fabricated number',
  },
  {
    id: 'C2',
    slot: 'Certification issuers & dates',
    bibleRef: 'P10A — not in Book A',
    interim: 'certification names only, as recorded',
  },
  {
    id: 'C3',
    slot: 'Collaboration specifics: team size, mentorship, stakeholder cadence',
    bibleRef: 'P10A — not in Book A',
    interim: 'only the recorded, role-anchored collaboration acts',
  },
  {
    id: 'C4',
    slot: 'Approved CTA microcopy strings & final Résumé/Contact routes',
    bibleRef: 'P10A §08',
    interim: 'neutral destination microcopy + approved IA routes',
  },
  {
    id: 'C5',
    slot: 'Experience-page SEO title, description & OG values',
    bibleRef: 'P10A §08',
    interim: 'routes.experience metadata + frozen site identity (siteConfig)',
  },
  {
    id: 'C6',
    slot: 'Business-domain labels beyond “AI recruitment” / “banking”',
    bibleRef: 'P10A — not in Book A',
    interim: 'the two recorded domain labels only',
  },
  {
    id: 'C7',
    slot: 'Company logos — licensed/approved assets',
    bibleRef: 'S09 §16',
    interim: 'no logos ship — the timeline & cards are text-only',
  },
] as const;
