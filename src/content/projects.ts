/**
 * Projects overview content — the frozen copy (Sprint 06, Content Bible P10A).
 *
 * Content lives apart from code (Blueprint §10). Every visible string on the
 * Projects overview is declared here, verbatim from an approved source, so the
 * feature components hold layout only and never a literal.
 *
 * PROVENANCE — what is frozen vs. what is a pending content blocker (S06 §15):
 *
 *   Frozen & usable today:
 *     - The four supporting-project summaries …… P10A Content Bible §10 (used
 *       verbatim — neither padded nor trimmed).
 *     - The empty-state message and "Clear filters" action …… P08 §05.
 *     - The search placeholder "Search projects…" …… P08 §05.
 *     - The Transpahire flagship summary line …… P08 case-study summary.
 *
 *   Content blockers (C1–C6) — logged as change requests against the Bible,
 *   NOT fabricated. Each ships wired against an *interim frozen source* the
 *   S06 brief itself permits, so the layout is complete and the final string
 *   drops in without a code change. The `blockers` export below records each
 *   one, its interim source and what it is waiting on. No lorem-ipsum, no
 *   improvised marketing copy stands in (S06 §01 RULE, §15).
 *
 *   Interim sources actually in use:
 *     - Hero title & SEO (C1, C6) …… the approved `routes.projects` metadata
 *       already shipped with the Sprint 03 placeholder page.
 *     - Category names (C2) …… the frozen category values already attached to
 *       each project in `@/content/home` `work.projects` (Platform · Frontend ·
 *       Enterprise · Tooling). P07/P08 conflict on chip labels and P10A defers
 *       them, so the code derives chips from the frozen data rather than
 *       inventing a taxonomy (S06 §05).
 *     - Featured headline & CTA (C3) …… the frozen flagship block in
 *       `@/content/home` (`flagship`), whose title, summary and CTA are already
 *       approved copy; the projects band reuses them so nothing is re-explained
 *       (P06 "each mention deepens rather than repeats").
 *     - Card CTA label (C4) …… neutral, non-marketing system microcopy that
 *       names the destination ("View <project>"); it is a screen-reader label,
 *       not a headline, and is replaced when the Bible supplies §07 CTA text.
 *     - Closing CTA (C5) …… reuses the frozen homepage invitation copy and the
 *       already-approved contact route.
 *
 * Nothing here is invented. A gap is a change request against the books, never
 * an improvisation in code (P10A freeze rule).
 */

import { routes } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { flagship, invitation, work } from '@/content/home';

/**
 * Hero & introduction (S06 §03). C1 pending — title/intro are P10A §07 slots
 * not yet written. Interim source: the approved `routes.projects` metadata
 * shipped on the Sprint 03 placeholder page (frozen route copy, not invented).
 */
export const hero = {
  eyebrow: 'Work',
  /** C1 — interim: the approved route title. */
  title: routes.projects.title,
  /** C1 — interim: the approved route description. */
  lead: routes.projects.description,
} as const;

/**
 * Featured Transpahire band (S06 §04). C3 pending — headline/CTA are P10A §07
 * slots. Interim source: the frozen homepage `flagship` block (already approved
 * copy) plus the P08 case-study summary as the one-liner. Reused, not
 * re-explained (P06). Routes to the real `/projects/transpahire` case study.
 */
export const featured = {
  /** The featured label named in S06 §04. */
  label: 'Featured project',
  /** Frozen flagship name + positioning (S06 §04 "Transpahire — AI recruitment platform"). */
  name: siteConfig.flagship,
  kicker: `${siteConfig.flagship} — AI recruitment platform`,
  /** C3 interim: the approved flagship headline (home `flagship.title`). */
  title: flagship.title,
  /**
   * Frozen flagship summary line (P08 case-study summary, quoted in S06 §04).
   * This is the interim frozen one-liner the brief names explicitly.
   */
  summary:
    'Built an AI recruitment platform from an empty repo to daily production ' +
    'use — data model, embedding pipeline, recruiter UI and nine API services.',
  /** C3 interim: the approved flagship CTA (home `flagship.cta`). */
  cta: flagship.cta,
} as const;

/**
 * Category chips (S06 §05). C2 pending — canonical chip names conflict across
 * P07/P08 and P10A defers them. The mechanism is built against a config so the
 * final names drop in without a layout change; the chip set is DERIVED from the
 * frozen categories already attached to each supporting project (below), never
 * a hand-authored taxonomy. "All" is always first and always active by default.
 */
export const ALL_CATEGORY = 'All' as const;

/**
 * Card summaries VERBATIM from the Content Bible §10 (S06 §06/§07 RULE — used
 * exactly, neither padded nor trimmed). These are the canonical Projects-grid
 * strings; the homepage `work` paraphrases them for homepage prose, but the
 * Projects index renders the Bible text literally, keyed by project name.
 */
const BIBLE_SUMMARIES: Record<string, string> = {
  BlueRise:
    'BlueRose Technologies · React/TS SPA migration, multi-tenant RBAC, i18n, ' +
    'FastAPI/Node APIs, AI resume screening & interview micro-frontends.',
  RATTS:
    'BlueRose Technologies · Legacy UI to React SPA, reusable test-execution ' +
    'components, Redux state, Robot Framework alignment.',
  'ANZ Banking':
    'Concentrix · React/Redux features for a large-scale banking app, REST ' +
    'integration, enterprise SDLC & agile.',
  'Playwright Automation':
    'BlueRose Technologies · POM-based E2E/API/visual/a11y framework, Allure ' +
    'reporting, adoption docs.',
};

/**
 * The four approved supporting projects (S06 §06; P10A §10 verbatim summaries).
 * Transpahire is NEVER one of these — it lives in the featured band above.
 *
 * `category` and `tags` are the frozen values from `@/content/home` `work`; the
 * `summary` is the Bible §10 verbatim string (above). `href` routes to the
 * projects index until a per-project `/projects/:slug` page exists (S06 §11
 * RULE — no dead case-study links, mirrors the homepage `Work` section).
 * `thumbnail: null` uses the approved monogram fallback — no fabricated image
 * asset (S06 §07).
 */
export const projects = work.projects.map((project) => ({
  ...project,
  /** Bible §10 verbatim summary (falls back to the frozen home copy). */
  summary: BIBLE_SUMMARIES[project.name] ?? project.summary,
  /** Stable slug for keys and future `/projects/:slug` wiring. */
  slug: project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  /** No approved thumbnail asset yet → monogram fallback (S06 §07). */
  thumbnail: null as string | null,
  /** Until a per-project page ships, the card routes to the index (S06 §11). */
  href: routes.projects.href,
})) satisfies ReadonlyArray<{
  name: string;
  org: string;
  category: string;
  summary: string;
  tags: readonly string[];
  slug: string;
  thumbnail: string | null;
  href: string;
}>;

export type Project = (typeof projects)[number];

/** The chip list: "All" first, then each distinct frozen category, in order. */
export const categories = [
  ALL_CATEGORY,
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;

/** Sort options (S06 §08). Default "Recent" — the source order of P10A §10. */
export const SORT_OPTIONS = [
  { value: 'recent', label: 'Recent' },
  { value: 'az', label: 'A–Z' },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];
export const DEFAULT_SORT: SortValue = 'recent';

/**
 * Filter, search & control microcopy. Frozen strings are marked; the rest are
 * accessible-name microcopy (labels, not headlines) that name their control.
 */
export const controls = {
  /** Accessible name for the category radio-group (S06 §08 a11y). */
  filterLegend: 'Filter projects by category',
  /** Accessible name for the sort control (S06 §08). */
  sortLabel: 'Sort projects',
  /** Visible + accessible label for the search field (S06 §09 — real label). */
  searchLabel: 'Search projects',
  /** Frozen placeholder microcopy (P08 §05, verbatim). */
  searchPlaceholder: 'Search projects…',
  /** Clear-search control name. */
  searchClearLabel: 'Clear search',
} as const;

/**
 * Live-region result-count announcements (S06 §08/§09 — announced via a live
 * region). System microcopy naming the observable count; not page headline copy.
 */
export function resultsAnnouncement(count: number): string {
  if (count === 0) return 'No projects match your filter.';
  return `${count} ${count === 1 ? 'project' : 'projects'} shown.`;
}

/**
 * Empty state (S06 §10). The one piece of FULLY FROZEN Projects copy: the
 * message and the "Clear filters" action, verbatim (P08 §05).
 */
export const emptyState = {
  message: 'No projects match that filter.',
  action: 'Clear filters',
} as const;

/**
 * Closing call to action (S06 §02 close). C5 pending — Projects-page CTA copy &
 * destinations are unwritten (P10A §07). Interim source: the frozen homepage
 * `invitation` copy and the already-approved contact route.
 */
export const callToAction = {
  eyebrow: invitation.eyebrow,
  title: invitation.title,
  lead: invitation.lead,
  cta: { label: 'Get in touch', href: routes.contact.href },
} as const;

/**
 * SEO set for the Projects page (S06 §14). C6 pending — Projects-page SEO
 * title/description/OG are P10A §08 slots not yet written. Interim source: the
 * approved `routes.projects` metadata (frozen route copy).
 */
export const seo = {
  title: routes.projects.title,
  description: routes.projects.description,
} as const;

/**
 * Content-blocker registry (S06 §15). Each entry is an OPEN change request
 * against the Content Bible, recorded in code so the pending slot is auditable
 * and the interim source is explicit. When the Bible supplies the final string,
 * update the referenced `const` above and delete the entry — no layout change.
 */
export const blockers = [
  {
    id: 'C1',
    slot: 'Hero title & supporting introduction',
    bibleRef: 'P10A §07',
    interim: 'routes.projects.title / .description (approved route metadata)',
  },
  {
    id: 'C2',
    slot: 'Canonical category chip names',
    bibleRef: 'P07 vs P08 conflict; P10A §07 defers',
    interim: 'derived from frozen work.projects categories',
  },
  {
    id: 'C3',
    slot: 'Featured-band headline & CTA label',
    bibleRef: 'P10A §07',
    interim: 'home flagship block + P08 case-study summary line',
  },
  {
    id: 'C4',
    slot: 'Card CTA label & per-card technology descriptions',
    bibleRef: 'P10A §07',
    interim: 'neutral "View <project>" sr-label; frozen §10 summaries in use',
  },
  {
    id: 'C5',
    slot: 'Closing CTA copy & destination',
    bibleRef: 'P10A §07',
    interim: 'home invitation copy + contact route',
  },
  {
    id: 'C6',
    slot: 'Projects-page SEO title, description & OG',
    bibleRef: 'P10A §08',
    interim: 'routes.projects metadata',
  },
] as const;
