# Sprint 05 — About Page Implementation

The second page. The About page is composed entirely from Sprint 02 components
inside the Sprint 03 shell, telling a cohesive professional story that
complements the homepage — identity, then growth, then how the work is made,
then a handoff. Nothing here redesigns an approved decision or invents a
component; it fills the second slot the shell already holds.

- **Route:** `src/app/about/page.tsx` (replaced the Sprint 03 placeholder).
- **Sections:** `src/features/about/*` — one file per section, one barrel.
- **Copy:** `src/content/about.ts` — every visible string, provenance-annotated.
- **Shell:** untouched. The page renders into `<main>`; the closing CTA reads
  into the existing `SiteFooter` below it (§10 RULE). GitHub is **not** repeated
  in the CTA — it already lives in the footer.

---

## Content provenance — a noted deviation from the freeze (READ THIS)

Unlike the homepage, the About page's **narrative prose does not exist verbatim
in any approved source.** Two independent audits of the Content Bible (P10A) and
the design phases (P02 Storytelling, P06 IA, P07 UX, P08 Hi-Fi) established that:

- **P10A is a content _inventory/plan_**, not finished prose — it lists what the
  About copy must contain and the freeze rules, but never writes it.
- **P06/P07/P08 give a design brief**: the About page's purpose, structure,
  tone, the five-chapter career arc (P06 §09), a portrait + identity anchor,
  philosophy stated as _a position, not a list_ (P07 §04), three-plus values one
  line each, and a `→ Contact` close. The section-level copy the Sprint 05 item
  list enumerates (8 philosophy principles, 6 product-thinking points, 5 values,
  6 working-style points, 5 learning/growth points, the CTA) was **never
  written** at that granularity.

The Sprint 05 freeze RULE says missing copy is a change request, never
fabricated in code. **That change request was raised and the owner explicitly
authorised authoring the About prose**, grounded strictly in the frozen facts.
Every string in `src/content/about.ts` is tagged in-file as one of:

| Tag          | Meaning                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| `[FROZEN]`   | Verbatim from an approved source (owner profile P10A §04/§05, contact RULE §07, the career through-line callout §05, or the four engineering principles already frozen in `home.ts`). |
| `[AUTHORED]` | Written this sprint under owner sign-off, framing only frozen facts.    |

**Guardrails honoured (so nothing contradicts what is already frozen):**

1. **`4+ years`, never `10 years`** — the P08 mockup's `"Ten years…"` specimen
   is illustrative; `home.ts` already corrected it and this page holds the line.
2. **No `founding engineer`, no invented companies** (e.g. `Fintech Co`) — only
   BlueRose Technologies and Concentrix, the frozen employers.
3. **No dates here** — the career story is told as increasing scope; the dates
   live on Experience (P06 §09; §04 RULE).
4. **Values kept to exactly the five named** — neither padded nor trimmed (§07).

Absence of the forbidden mockup facts and of any placeholder / Content-Required
/ lorem text is asserted in `page.test.tsx`.

---

## Structure — the approved narrative (§02)

Section order is load-bearing: identity earns attention, the journey earns
credibility, philosophy and values earn trust, the CTA converts it. Reordering,
merging or dropping a section changes the argument.

| # | Section (`features/about`) | Question answered              | Key S02 components                         |
| - | -------------------------- | ------------------------------ | ------------------------------------------ |
| 1 | `Introduction`             | Who is this, beyond a title?   | Section, Container, Heading (`h1`), Tag, `next/image` slot |
| 2 | `CareerJourney`            | How did they get here?         | **Timeline** (semantic `<ol>`), Callout    |
| 3 | `Philosophy`               | How do they build?             | **Quote** (`<blockquote>`), FeatureCard, Stagger |
| 4 | `ProductThinking`          | How do they weigh users?       | Grid, FeatureCard, Stagger                 |
| 5 | `CoreValues`               | What holds under pressure?     | Grid, FeatureCard, Stagger                 |
| 6 | `WorkingStyle`             | How do they work with a team?  | Grid, FeatureCard, Stagger                 |
| 7 | `LearningGrowth`           | How do they keep sharp?        | Grid, FeatureCard, Stagger                 |
| 8 | `CallToAction`             | Where should I go next?        | Heading, Button, Link                      |

`SectionIntro` is a shared feature-local part (eyebrow + `<h2>` + lead), mirrored
from the homepage feature so every section opens identically. It is intentionally
**not** exported from the app barrel (feature isolation).

## Components used

Every visible element is an existing Sprint 02 component or a plain S02 `layout/`
primitive. No About-only component or primitive was created (§01 out-of-scope).

- **Career journey** reuses the S02 `Timeline` (`<ol>`/`<li>` with a Signal
  node rail) — the accessible ordered structure the §04 RULE requires. Chapter
  markers are labels (`Chapter 01…`, `Next`), not dates.
- **Philosophy** leads with `typography/Quote` (a real `<blockquote>`) for the
  quotable position (P07 §04 "a position, not a list"), then the principle set
  as `FeatureCard`s.
- **Values / product / working-style / learning** all reuse `FeatureCard` in a
  responsive grid — the shared component, not a bespoke About variant (§07 RULE).
- **Portrait:** no approved image asset exists. Rendering a fabricated photo
  would itself be an invented asset, so the slot shows a decorative, `aria-hidden`
  datum monogram; the `alt` contract and fixed `aspect-[3/4]` sizing (no layout
  shift) are ready for the real asset to drop into `intro.portrait.src`.

## Animation decisions (§11)

Only the approved prototype interactions (P09), all routed through the S02 motion
wrappers (never hand-rolled), all reduced-motion aware:

- **Section reveal** — `Reveal` (slide-up + fade, once on scroll-in view).
- **Staggered groups** — `Stagger` / `StaggerItem` for the card grids.
- **CTA / button interactions** — inherited from the S02 Button.

The **Timeline is fully static** — the career narrative is never gated behind
motion. Under `prefers-reduced-motion`, every wrapper swaps to instant opacity;
reveals resolve to their final state immediately (the wrappers call
`useReducedMotion` internally). Motion animates transform + opacity only.

## Responsive considerations (§12)

- Card grids collapse via Tailwind grid utilities: 3→2→1 (product, values,
  working style, learning), 2→1 (philosophy).
- Introduction is a two-column `1fr / portrait` grid on desktop that stacks to a
  single column on mobile; the portrait sits above the text.
- Measured line lengths (`max-w-[36–60ch]`) preserve comfortable reading; no
  horizontal overflow at any width; the section order/argument holds across all
  four breakpoints.

## Accessibility considerations (§13)

- **One `<h1>`** (the Introduction heading); every section heading is an `<h2>`
  (`<h3>` for cards). Logical order top to bottom.
- Each `<section>` is `aria-labelledby` its heading id (8 labelled landmarks,
  asserted in `page.test.tsx`).
- The career journey is a semantic `<ol>` so AT announces sequence and position
  (§04 RULE). The philosophy position is a real `<blockquote>`.
- The portrait carries descriptive `alt` (when an asset lands); the current
  monogram placeholder is `aria-hidden` and the frozen identity line is rendered
  verbatim, not paraphrased.
- CTAs are real links styled as buttons; every destination is an existing route
  (Transpahire → the flagship case study). GitHub is not duplicated (§10 RULE).
- Colour is never the only cue; contrast inherits the token system (both themes
  work with no branching).

## SEO & structured data (§13)

- `metadata` via `buildMetadata` — About title/description (no frozen About SEO
  block existed; authored from the frozen facts, consistent with the homepage
  voice), canonical, Open Graph and Twitter cards.
- **Person** JSON-LD: the base graph ships site-wide from the root layout; this
  page emits an **enriched** Person graph via `personJsonLd(personExtra)`, adding
  only frozen facts — `description`, `homeLocation` (Bengaluru, P10A §04) and
  `knowsAbout`. `personJsonLd` gained an optional `PersonExtras` argument for
  this; the bare call is unchanged.

## Tests (§14)

`src/app/about/page.test.tsx` — single-`<h1>` hierarchy, the approved 8-section
order, the frozen identity line, the career journey as an accessible `<ol>` with
no duplicated dates, exactly the frozen value set (no padding/trimming), CTA
targets (all real routes), GitHub not repeated in the CTA, absence of the P08
mockup fiction (`ten years` / `founding engineer` / `fintech co`), no placeholder
content, and 8 labelled section landmarks.

## Definition of done

About page fully implemented from approved parts inside the shell; every section
matches the approved structure and order; the professional narrative is preserved
(and its provenance recorded above); approved motion works and respects reduced
motion; responsive across four widths; single-`<h1>` hierarchy with labelled
landmarks; SEO metadata + enriched Person structured data; tests pass and no
placeholder content remains. `pnpm verify` green (a clean build; note the
intermittent Next.js build-trace flakiness on repeated back-to-back builds is
resolved by clearing `.next`).
