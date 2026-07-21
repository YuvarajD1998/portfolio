# Sprint 07 — Transpahire Flagship Case Study

The centerpiece. The `/projects/transpahire` case study is the single most
important page in the portfolio: the destination the Sprint 06 featured band and
grid route into (P06 §07). It carries a complete AI recruitment platform from
vision through UX, system/frontend/backend/AI architecture, the data model, the
resume-parsing pipeline, candidate matching, the API ecosystem, scalability,
performance, accessibility and security, closing on honest challenges,
trade-offs, results and a roadmap. It is **composed** from Sprint 02 components
inside the Sprint 03 shell and renders **frozen** copy from the Content Bible
(P10A) and Transpahire Product Book (P10B) at true status — it redesigns nothing
and touches neither the shell, routing nor navigation.

- **Route:** `src/app/projects/transpahire/page.tsx` (replaced the Sprint 03
  placeholder). The Hero owns the page's single `<h1>`; every movement is an
  `<h2>`.
- **Sections:** `src/features/transpahire/*` — one file per narrative movement,
  one barrel. Order is load-bearing (S07 §02).
- **Copy:** `src/content/transpahire.ts` — every visible string,
  provenance-annotated, with the status legend as data and a content-blocker
  registry (C1–C8).
- **New primitive:** `src/components/data-display/Disclosure.tsx` — the
  progressive-disclosure depth panel (S07 §11), added to the S02 library.
- **Shell:** untouched. The page renders into `<main>`; the closing CTA reads
  into the existing `SiteFooter`. The section rail reuses the S03 `SectionRail`
  + `useActiveSection` scroll-spy.

---

## Case-study architecture

```
app/projects/transpahire/page.tsx        composes the movements + rail + JSON-LD
  ├─ <Hero/>                              §03 — h1, positioning, CTAs, tech chips
  └─ <Section><Container> two-column
       ├─ movements (Stack, in order)     §04–§20, each a <CaseStudySection>
       └─ <aside> sticky <SectionRail>    "On this page" scroll-spy (lg+)

features/transpahire/
  CaseStudySection.tsx   anchored <section> + kicker + h2 + Reveal (shared frame)
  StatusBadge.tsx        renders a feature's true Product-Book status glyph
  SystemDiagram.tsx      inline, accessible SVG (C4) — the diagram the repos lack
  Hero · ProductStory · Personas · Features · DesignProcess · UserJourney ·
  SystemArchitecture · FrontendArchitecture · BackendArchitecture · DataModel ·
  AiPipeline · Matching · ApiAuth · ScalabilitySecurity · TradeOffs · Results ·
  Roadmap
```

The section rail's anchors (`page.tsx` `SECTIONS`) match each movement's
`<section id>`, so the rail, scroll-spy and deep links all resolve.

## Progressive disclosure (S07 §11)

`Disclosure` wraps the **native `<details>/<summary>`** element, so keyboard
operation, the open/closed state exposed to AT, and content-in-DOM are inherited,
not re-implemented. Collapsed detail **stays in the DOM** (crawlable, findable) —
density is hidden from the eye, never substance from crawlers or assistive tech.
Forced-open rules: `prefers-reduced-motion` and **print** default panels open, and
a **deep link** whose hash targets a panel's `id` (or a `#id` nested inside it)
auto-opens it. Depth panels carry stable ids (`matching-weights`, `ai-honest`,
`frontend-honest`, `backend-honest`).

## Diagram strategy

The system diagram is **inline SVG** — no external image request, `viewBox`-scaled,
and it scrolls inside its own `overflow-x-auto` container so the page never
overflows horizontally. It is `role="img"` with a `<title>` + `<desc>` text
alternative and a visible `<figcaption>`; every node is also stated as text in the
surrounding section, so the figure is never the sole carrier of meaning. Colours
are `var(--token)` custom properties, so it swaps with light/dark like every other
surface. The Product Book flags that no such diagram exists in the source repos —
building it accurately here is a contribution of the case study, and a review gate
(C4).

---

## Content provenance — frozen vs. blocked (READ THIS)

Every visible string comes from a frozen book verbatim. Where the S07 brief marks
a slot unwritten, it ships **wired but pending** against an _interim frozen source_
the brief itself permits — no lorem-ipsum, no improvised copy, **no invented
metric**. `src/content/transpahire.ts` annotates each string's source; the
`blockers` export is the auditable change-request registry.

**Frozen & used verbatim today:** the flagship positioning line (P08), and every
technical fact, weight, status glyph and locked decision in the Product Book
(P10B) that fills §04–§20 — the 65/25/7/3 weight formula, the model cascade, the
8-role model, the ~90 models / 68 migrations / 148k cities scale snapshot, and so
on.

**Content blockers (C1–C8) — open change requests, interim sources in use:**

| ID | Blocked slot | Interim frozen source |
| -- | ------------ | --------------------- |
| C1 | Hero headline treatment & exact CTA labels | frozen P08 positioning line + approved route CTA destinations |
| C2 | Product-story final prose | Product Book central-bet & market-shape framing (P10B) |
| C3 | Design-process research & wireframe narrative | Product Book design-decision list (P10B) |
| C4 | Approved diagram assets (system/data-flow/AI) | inline SVG built from Product Book architecture facts |
| C5 | Approved product screenshots | text-only feature cards at true status — no mocked-up screen |
| C6 | Any quantitative result marked Content Required | qualitative copy only; no fabricated number |
| C7 | Closing CTA copy & destinations | neutral destination microcopy + approved transpahire/projects/contact routes |
| C8 | Case-study SEO title/description/OG | approved `routes.transpahire` metadata |

## The status legend survives (S07 governing principle)

`Status` + `STATUS_META` model the Product Book legend — Implemented / Partial /
Flag-gated / Planned / Deprecated — as data, rendered by `<StatusBadge>`. The
page can never silently round a partial or flag-gated feature up to shipped. Two
facts are surfaced honestly rather than smoothed over: **`Job.qualityScore` is
Partial** (a sortable column with no scorer, permanently null) and the **Revenue
tab is a Planned `{ available: false }` stub**. The **AI Match Explanation** and
the **seniority penalty** are named as **Flag-gated OFF**, not live defaults. The
dead CASL factory, the deleted semantic-search endpoint and the per-controller
guard gap are named as real engineering history.

## SEO & structured data

Per-route metadata via `buildMetadata` (canonical URL, OG, Twitter). Structured
data is **`caseStudyJsonLd`** → a `Person` + one `CreativeWork` (the approved
P10 §15 model). `SoftwareApplication` is **not** used — no source sanctions it.

## Accessibility decisions

Single `<h1>` (Hero); one `<h2>` per movement labelling its `<section>`; content
headings step to `<h3>`. Status is real text, never colour alone. The system
diagram has a text alternative + caption. Depth panels are native, keyboard-
operable, and announced. The weight formula is a real `<table>` with a `<caption>`
and `scope`d headers. The section rail is a labelled `nav`; the active item is
`aria-current="location"`. All motion routes through the S01 presets and resolves
instantly under `prefers-reduced-motion`.

## Reusable patterns introduced

- **`Disclosure`** — the accessible native-`<details>` depth panel (now S02).
- **`CaseStudySection`** — the anchored movement frame every future case-study
  interior can reuse (kicker + h2 + Reveal + scroll-margin anchor).
- **`StatusBadge`** + the `Status`/`STATUS_META` legend-as-data pattern.
- **`caseStudyJsonLd`** — the single-work Person + CreativeWork graph helper.

From here, the remaining case-study interiors (S08) follow the same framework.

---

## Tests

`src/app/projects/transpahire/page.test.tsx` (13) + `Disclosure.test.tsx` (4)
cover: single `<h1>`; all sixteen movements present, anchored and labelled by an
`<h2>`; narrative order preserved; the rail exposes an anchor per movement; the
status glyphs survive (Partial/Planned/Flag-gated/Implemented); frozen feature
summaries and all eight personas render; disclosure depth stays in the DOM while
collapsed and panels are deep-linkable; the SVG diagram is accessible; CTAs route
to real destinations; the graph is Person + CreativeWork (never
SoftwareApplication); and no fabricated metric appears. `pnpm verify`
(typecheck · lint · test · build) is green — 116 tests across 24 files.
