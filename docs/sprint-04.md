# Sprint 04 — Homepage Implementation

The first page that speaks. The homepage is composed entirely from Sprint 02
components inside the Sprint 03 shell, rendering the frozen copy from the
Content Bible (P10A). Nothing here redesigns an approved decision or invents a
component — it fills the first slot the shell already holds.

- **Route:** `src/app/page.tsx` (replaced the Sprint 01 foundation placeholder).
- **Sections:** `src/features/home/*` — one file per section, one barrel.
- **Copy:** `src/content/home.ts` — every visible string, sourced and frozen.
- **Shell:** untouched. The page renders into `<main>`; the final CTA reads
  into the existing `SiteFooter` below it (§10 RULE).

---

## Content provenance (the freeze)

Copy is not authored here — it is consolidated from approved sources and
declared once in `src/content/home.ts`, so section components hold layout only.

| Surface                         | Source                                          |
| ------------------------------- | ----------------------------------------------- |
| Hero headline & CTAs            | P08 High-Fidelity Design (latest hero surface)  |
| Named facts (role, years, jobs) | P10A Content Bible §04/§05 (the freeze)         |
| Section narrative & order       | P03 Homepage Experience + P08 homepage sections |
| Contact handles                 | P10A §07 RULE → `siteConfig.links` (single src) |

**Two approved sources conflicted and were reconciled explicitly** (decision
recorded, not guessed):

1. **Hero line** — P08 (`"I build production-ready software, end to end."`)
   supersedes P03's earlier thesis; P08 is the latest, highest-fidelity hero.
2. **Career facts** — P08's hi-fi mockup showed illustrative narrative
   (`"10 years"`, `"founding engineer"`, `"Fintech Co"`) that contradicts the
   frozen Content Bible. The **Bible governs facts** (4+ years, Senior Frontend
   / Full-Stack Developer, BlueRose Technologies & Concentrix, real projects) —
   the freeze forbids overstated or unverifiable claims. P08 narrative was
   layout placeholder.

No placeholder, lorem-ipsum, or Content-Required text remains (asserted in
`page.test.tsx`).

---

## Structure — the approved narrative (§02)

Section order is load-bearing: it is the argument the page makes. Each section
answers the visitor's next question, top to bottom (P03).

| # | Section (`features/home`)   | Question answered            | Key S02 components                       |
| - | --------------------------- | ---------------------------- | ---------------------------------------- |
| 0 | `Hero`                      | Who is this engineer?        | Section, Container, Subheading, Button   |
| 1 | `FeaturedTranspahire`       | What have they built?        | Card, Divider, Button, Eyebrow, Heading  |
| 2 | `Platform`                  | How broad is the ownership?  | Grid, FeatureCard, Stagger               |
| 3 | `Architecture`             | Can they architect?          | ArchitecturePanel (+ Layer / Node)       |
| 4 | `Intelligence`              | How does the AI work?        | Grid, Card, Heading, Text                |
| 5 | `Philosophy`                | How do they think?           | Grid, FeatureCard, Stagger               |
| 6 | `Craft`                     | What do they work with?      | Card, Tag, Flex, Heading                 |
| 7 | `Work`                      | What else have they built?   | Card (`as={Link}`), Tag, Icon, Button    |
| 8 | `Highlights`                | What's the track record?     | StatisticBlock, Grid                     |
| 9 | `Invitation`                | Why contact them?            | Heading, Button, Icon, Flex, Link        |

`SectionIntro` is a shared internal part (eyebrow + `<h2>` + lead) so every
section opens identically. The Transpahire (§04), Architecture (§04) and
Intelligence (§05) blocks are **teasers**, not the case study — depth lands in
a later sprint.

## Components used

Every visible element is an existing Sprint 02 component (or a plain layout
primitive from the S02 `layout/` set). No homepage-only component or primitive
was created. There is no `ProjectCard` in S02, so project tiles reuse `Card`
with `interactive` and `as={Link}` — the whole card is one link.

## Animation decisions (§11)

Only the approved prototype interactions (P09), all routed through the S02
motion wrappers (never hand-rolled), and all reduced-motion aware:

- **Hero reveal** — datum hairline draws in, then the headline rises
  word-by-word (40 ms stagger, P03 §00). Bespoke `motion` in `Hero.tsx`.
- **Section reveal** — `Reveal` (slide-up + fade, once on scroll-in view).
- **Staggered groups** — `Stagger` / `StaggerItem` for card grids.
- **Card hover** — the `interactive` Card lift + arrow colour shift on Work.
- **Button interactions** — inherited from the S02 Button.

Under `prefers-reduced-motion`, every wrapper swaps to instant opacity and the
hero resolves to its final state immediately — **content is never gated behind
motion** (asserted in `Hero.test.tsx`). Motion animates transform + opacity
only.

## Responsive considerations (§12)

- Column counts collapse via `Grid cols={{ base, md, lg }}` and Tailwind grid
  utilities: 3→1 (platform, craft), 4→2→1 (intelligence, highlights), 2→1
  (philosophy, work).
- Hero is left-anchored with open space on desktop, single column on mobile;
  type scales via the `text-display` token.
- No horizontal overflow at any width; touch targets stay ≥ 44px (S02 Button
  `md`/`lg`, whole-card links). The section order holds across all four widths.

## Accessibility considerations (§13)

- **One `<h1>`** (the hero thesis); every section heading is an `<h2>` (`<h3>`
  for cards). Logical order top to bottom.
- Each `<section>` is `aria-labelledby` its heading id (landmark labelling,
  asserted in `page.test.tsx`).
- CTAs are real links/buttons; Work project tiles are whole-card links
  (keyboard-reachable, hover is enhancement only). External profile links set
  `target="_blank" rel="noopener noreferrer"`.
- Decorative datum lines, the coordinate readout and glyph icons are
  `aria-hidden`; skills tags and stat figures read as text.
- Colour is never the only cue; contrast inherits the token system (both
  themes work with no branching).

## SEO & structured data (§13)

- `metadata` via `buildMetadata` — frozen homepage title/description (P10A §08),
  canonical, Open Graph and Twitter cards. The homepage title is `absolute`
  (no `%s · Yuvaraj` suffix).
- **Person** JSON-LD ships from the root layout; **WebSite** JSON-LD
  (`websiteJsonLd`) is emitted on the homepage. Structured data reflects only
  approved facts.

## Tests (§14)

- `src/app/page.test.tsx` — rendering, single-`<h1>` hierarchy, section order,
  hero copy + CTA targets, flagship link, frozen contact facts, frozen career
  facts (and absence of the P08 mockup narrative), no placeholder content,
  whole-card project links, landmark labelling.
- `src/features/home/Hero.test.tsx` — full headline renders as the single
  `<h1>`, identical under `prefers-reduced-motion`.

## Definition of done

Homepage fully implemented from approved parts and frozen copy; every section
matches the approved narrative and order; approved motion works and respects
reduced motion; responsive across four widths; single-`<h1>` heading hierarchy
with labelled landmarks; SEO metadata + Person/WebSite structured data; tests
pass and no placeholder content remains. `pnpm verify` green.
