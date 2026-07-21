# Sprint 06 — Projects Overview Implementation

The discovery hub. The `/projects` overview is composed entirely from Sprint 02
components inside the Sprint 03 shell: a full-width featured band for Transpahire
above a filterable, searchable card grid of the four supporting projects, closing
into the existing footer. Nothing here redesigns an approved decision or invents a
component; it fills the `/projects` slot the shell already held as a placeholder.

- **Route:** `src/app/projects/page.tsx` (replaced the Sprint 03 placeholder).
- **Sections:** `src/features/projects/*` — one file per section, one barrel.
- **Copy:** `src/content/projects.ts` — every visible string, provenance-annotated,
  with an explicit content-blocker registry.
- **Shell:** untouched. The page renders into `<main>`; the closing CTA reads into
  the existing `SiteFooter` below it. Routing/nav from S03 is not touched.

---

## Content provenance — frozen vs. blocked (READ THIS)

The Projects overview mixes **fully frozen** copy with **six content blockers**
(C1–C6) that the Content Bible (P10A) names as slots but has **not yet written**.
The S06 brief is explicit: a blocked slot ships **wired but pending**, against an
_interim frozen source_ the brief itself permits — **no improvised marketing copy
stands in**. Every string in `src/content/projects.ts` is annotated with its
source; the `blockers` export is the auditable change-request registry.

**Frozen & used verbatim today:**

- The **four supporting-project summaries** — P10A §10 (used exactly, neither
  padded nor trimmed). Sourced through `home.ts` `work.projects`, which already
  holds them frozen.
- The **empty-state** message `"No projects match that filter."` + the
  **`"Clear filters"`** action — P08 §05.
- The **search placeholder** `"Search projects…"` — P08 §05.
- The **Transpahire flagship summary line** — the P08 case-study summary, quoted
  in S06 §04.

**Content blockers (C1–C6) — open change requests, interim sources in use:**

| ID | Blocked slot | Interim frozen source |
| -- | ------------ | --------------------- |
| C1 | Hero title & intro | approved `routes.projects` title/description (shipped on the S03 placeholder) |
| C2 | Canonical category chip names (P07 vs P08 conflict) | **derived** from the frozen `work.projects` categories — no hand-authored taxonomy |
| C3 | Featured headline & CTA label | the frozen `home.ts` `flagship` block (title + CTA) + the P08 summary one-liner |
| C4 | Card CTA label & per-card tech descriptions | neutral sr-only `"View <project> …"` label; frozen §10 summaries already in use |
| C5 | Closing CTA copy & destination | the frozen `home.ts` `invitation` copy + the approved contact route |
| C6 | Projects-page SEO title/description/OG | approved `routes.projects` metadata |

**Guardrails honoured:**

1. **The four real projects only** — BlueRise, RATTS, ANZ Banking, Playwright
   Automation. The Phase 08 wireframe fillers (`Ledger UI`, `Atlas CLI`) never
   ship (asserted in `page.test.tsx`); the forbidden names `AI Products` /
   `Enterprise Applications` (in no source) are never used.
2. **Transpahire is never a grid card** and is never removed by a filter/search —
   it lives in its own band above the interactive explorer (asserted in tests).
3. **No `/work` route** — the P08 mockup chrome showing `/work` is a design
   artifact; the page is `/projects` (P06/P10).
4. **No query string for filter state** — the IA forbids it (P06); state lives in
   client memory only.

When the Bible supplies a final string, update the referenced `const` in
`src/content/projects.ts` and delete the `blockers` entry — no layout change.

---

## Structure — the approved narrative (§02)

Section order is load-bearing: the featured band earns the first click for the
flagship; the grid proves breadth without diluting it; the CTA hands the visitor
onward. Reordering, merging or dropping a section is a review reject.

| # | Section (`features/projects`) | Question answered | Key S02 components |
| - | ----------------------------- | ----------------- | ------------------ |
| 1 | `Hero` | What is this collection? | Section, Container, Heading (`h1`), Subheading |
| 2 | `FeaturedBand` | Which one should I open first? | Card (`sunken`), Button, Link, Divider |
| 3 | `ProjectsExplorer` → `Toolbar` | How do I narrow this? | Radix RadioGroup (chips), Select, TextInput, IconButton |
| 4 | `ProjectsExplorer` → grid | What else has been built? | Grid utilities, `ProjectCard` (S02 Card), semantic `<ul>` |
| 5 | `ProjectsExplorer` → empty | What if nothing matches? | S02 `EmptyState` (`role="status"`), Button |
| 6 | `CallToAction` | Where do I go from here? | Heading, Button, Link |

`ProjectsExplorer` is the single `'use client'` boundary — it owns the
filter/sort/search state and renders the toolbar, grid and empty state. Everything
else is a server component; the client boundary lives inside the S02 motion
wrappers (`Reveal`/`Stagger`) exactly as on the homepage/about pages.

## Components used

Every visible element is an existing Sprint 02 component or a plain `layout/`
primitive. No Projects-only component or primitive was created (§01 out-of-scope).

- **`ProjectCard`** reuses the S02 `Card as={Link}` — the same whole-card-is-one-
  link pattern as the homepage `Work` section, so hover is enhancement, not the
  only affordance. No bespoke grid card (§06/§07 RULE).
- **Category chips** compose Radix `RadioGroup` primitives directly (feature-layer
  composition) styled as pills. The S02 form `Radio` is a dot+label control — a
  different surface from a filter chip — but the chips keep the same radio
  semantics the brief requires (single-select, arrow-key operable, `aria-checked`).
- **Sort** is the S02 `Select` (default "Recent" = the frozen §10 source order).
- **Search** is the S02 `TextInput` + `IconButton` clear control.
- **Empty state** is the S02 `EmptyState` (`role="status"`), rendering the frozen
  message and a `Clear filters` Button.
- **Thumbnails:** no approved image asset exists. Rendering a fabricated screenshot
  would itself be an invented asset, so each card shows a decorative, `aria-hidden`
  monogram in a fixed `aspect-[16/9]` box (no layout shift); `thumbnail: null` is
  ready for the real asset to drop in.

## Structured data (§14)

The approved model is **Person + CreativeWork per project** (P10 §15) — **not**
`CollectionPage`, which appears in no source. `src/lib/structured-data.ts` gained
`projectsJsonLd(works)` (+ `serializeJsonLdGraph`), emitting one JSON-LD array:
the owner as `Person`, then one `CreativeWork` per project (the flagship + the four
supporting), each with the owner as `creator` and its tech tags as `keywords`.
Asserted in `page.test.tsx`.

## Filtering, search & routing

- **Client-side, instant, single-select.** One active category (default "All") +
  a free-text search that combines with it. Filter state is **client memory, never
  the URL** (IA forbids query strings for content, §08 RULE).
- **Result count** is announced on every change through a polite `aria-live`
  region (visually hidden).
- **Routing (§11):** the featured band CTA routes to the real
  `/projects/transpahire` case study. Supporting cards route to the `/projects`
  index — **not** to `/projects/:slug`, because no per-project interior exists yet
  (`KNOWN_SLUGS` is empty); a card links live only once its page ships. This
  mirrors the homepage `Work` section and avoids dead case-study links / hard 404s.

## Animation decisions (§12)

Only the approved prototype interactions (P09), all routed through the S02 motion
wrappers (never hand-rolled), all reduced-motion aware:

- **Section reveal** — `Reveal` (slide-up + fade, once on scroll-in view) on the
  static Hero / FeaturedBand / CallToAction only.
- **Card hover / CTA / button states** — inherited from the S02 Card/Button.
- **Filter transition** — the grid re-flows via React re-render; there is no
  layout-jump animation gating the scan.

> **The results grid is deliberately NOT wrapped in `Stagger`/`whileInView`.**
> The cards re-mount on every filter/search change. A scroll-triggered reveal
> starts each mount at `opacity: 0` and only reveals on scroll-into-view — but a
> card that re-mounts while already on-screen never re-triggers the observer, so
> it stays invisible and the grid "becomes empty" on a category switch. Per §12
> ("filtering and reading are never gated behind motion") the grid is a plain
> semantic `<ul>` whose cards are always visible; only hover animates. This is
> guarded by two regression tests in `page.test.tsx`.

## Responsive considerations (§13)

- The card grid collapses via Tailwind grid utilities: **3 → 2 → 1**
  (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) with consistent card heights
  (`h-full`) as columns collapse.
- The toolbar stacks on narrow widths (chips row wraps; sort + search drop below)
  and sits chips-left / controls-right on desktop (`lg:flex-row`).
- Measured line lengths (`max-w-[42–52ch]`) keep the hero and featured band
  comfortable; no horizontal overflow at any width; the flagship-first hierarchy
  and section order hold across all four breakpoints.

## Accessibility considerations (§14)

- **One `<h1>`** (the Hero); section headings are `<h2>` (`<h3>` for cards).
- Every `<section>` is `aria-labelledby` its heading id (≥4 labelled landmarks,
  asserted). The grid region's heading is a structural, visually-hidden `<h2>`
  ("Supporting projects") because the Bible has not written a grid headline — a
  landmark name without improvised marketing copy.
- **Chips** are a labelled `radiogroup` (Radix — roving tabindex, arrow-key
  operable, active state programmatic via `aria-checked`, not colour alone).
- **Search** carries a real accessible name (not placeholder-only), is keyboard-
  operable and clearable; **sort** is a labelled, keyboard-operable Select.
- **Result count** announced via a polite live region.
- Each **card** is one link target whose accessible name names the project and
  destination (`"View <project> — <category> project at <org>"`) — meaningful out
  of context, never "read more". The monogram thumbnail and glyph are `aria-hidden`.
- Colour is never the only cue; contrast inherits the token system (both themes,
  no branching).

## Tests (§14)

`src/app/projects/page.test.tsx` — single-`<h1>` hierarchy; featured band above
the grid; the flagship never a grid card; exactly the four supporting projects
with frozen summaries; the P08 wireframe fillers never ship; card routing (real
existing destinations) and the featured CTA → `/projects/transpahire`; the filter
as a labelled radio-group defaulting to "All"; single-category filtering; search
narrowing (combining with the filter); the frozen empty state + clear-to-restore;
the polite live region; every section landmark resolving to a heading; and the
Person + CreativeWork JSON-LD graph (no `CollectionPage`).

## Definition of done

Projects overview fully implemented from approved parts inside the shell; the
featured Transpahire band correctly positioned above the grid; cards reuse the S02
Card; filtering + search work client-side, single-select, no query string;
navigation to real destinations with correct back/forward; responsive across four
widths; single-`<h1>` hierarchy with labelled landmarks; SEO metadata + Person /
CreativeWork structured data; tests pass; all content is from the Bible with the
C1–C6 blockers logged (not fabricated). `pnpm verify` green.
