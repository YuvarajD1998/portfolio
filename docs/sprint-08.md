# Sprint 08 — Engineering Page

**Record** (Playbook §08). Written for the engineer who joins in month six.

## Objective

Build the production-ready Engineering page at `/engineering` — the practice
above any one project. It answers a different question than the §07 case study:
not _"what did you build?"_ but _"how do you reason, and would I want you making
these calls on my team?"_ Composed from Sprint 02 components inside the Sprint 03
shell, it renders the frozen engineering & product philosophy (Content Bible,
P10A) and the architecture practices (Frontend Engineering Blueprint, P10) at
their true status. **No new component, primitive, section, claim or design
decision was introduced. S01–S07 were untouched.**

## A note on the route

The Sprint 08 brief specifies a **top-level** `/engineering` page, and the
Content Bible (P10A) lists "Engineering" as a first-class page alongside
Homepage / About / Projects / Skills / Resume. This is distinct from the
Transpahire **engineering deep-dive** at `/projects/transpahire/engineering`
(a child of the case study, from the P06 IA) — that route is untouched. The new
route was added to the single route model in `config/navigation.ts`; because the
nav is data-driven (S03 §06), it appears in the footer index, `sitemap.ts` and
route tests automatically without touching a component.

## Page architecture

- **Route:** `src/app/engineering/page.tsx` — a Server Component. Emits the
  Person + ProfilePage JSON-LD, renders the `Hero`, then the fifteen practice
  movements inside the sticky-rail grid, and closes with `CallToAction` (which
  reads into the shell `SiteFooter`).
- **Content:** `src/content/engineering.ts` — every visible string, drawn from
  an approved source. Feature components hold layout only, never a literal
  (S08 §01 RULE). The two philosophy pillar sets are reused **verbatim** from
  `@/content/about` so there is one canonical pillar text, not a variant.
- **Feature UI:** `src/features/engineering/*` — one component per movement, plus
  three shared parts:
  - `EngineeringSection` — the anchored movement wrapper (kicker + H2 + lead +
    body, entering with `Reveal`); mirrors the case study's `CaseStudySection`.
  - `PracticePanels` — the shared "titled lists side by side" layout most
    movements use; a panel carries either a bulleted `points` list or a prose
    `body`.
  - `AiFlowDiagram` — the §12 grounded-AI inline SVG.

## Narrative order (S08 §02 — load-bearing)

Philosophy first as the lens, then the practice as evidence, closing on how
decisions get made: **philosophy → frontend → design systems → state → API →
auth → backend → AI → performance → accessibility → testing → DX → CI/CD →
decision framework → tools & learning.** Reordering, merging or dropping a
movement changes the argument and is a review reject. The order is asserted by
`page.test.tsx`.

## Components used (Sprint 02)

`Section`, `Container`, `Stack`, `Grid`, `Flex` (layout) · `Heading`, `Text`,
`Subheading`, `Eyebrow`, `List` (typography) · `Card`, `Badge`, `Callout`,
`Disclosure`, `ArchitecturePanel`/`ArchitectureLayer`/`ArchitectureNode`
(data-display) · `Button` (ui) · `SectionRail` (layout wiring, S03) · `Reveal`
(motion). No new primitive was added.

## Progressive disclosure (S08 §20)

Every practice movement opens with a summary a recruiter reads straight through;
the depth an engineering manager wants sits in `Disclosure` panels beneath it
(honest-status notes, at-scale evidence, "on stated numbers"). `Disclosure` is
the S02 primitive built on native `<details>/<summary>`, so:

- collapsed content stays in the DOM (crawlable & findable — never buried);
- panels carry stable ids (`auth-honest`, `state-evidence`, `dx-honest`, …) a
  deep link can target and auto-open;
- under `prefers-reduced-motion` and when printing, panels force open so reading
  and deep detail are never gated behind an interaction.

## Diagram strategy (S08 §11, §12)

`AiFlowDiagram` is inline, optimized SVG — no external image request. It draws
only frozen Product-Book facts (the grounded-AI path: NestJS → FastAPI cascade →
re-ground & re-validate → `ai_call_log` → inspectable result). Accessibility:
`role="img"` + `<title>`/`<desc>` text alternative, a visible `<figcaption>`
caption, and every node is also stated as text in the surrounding section, so
the figure is never the sole carrier of meaning. All colours are `var(--token)`
so it swaps with the theme. It scrolls within its own `overflow-x-auto`
container and never forces page overflow. The §08 request path uses the
text-based `ArchitecturePanel` (real text, no image-of-code).

## Responsive considerations (S08 §21)

- Two-column content + sticky rail at `lg`; single column below, where the rail
  is hidden and sections stay reachable via their in-page anchors.
- `PracticePanels` grids collapse to one column below `md`.
- Diagrams, code and tables scroll within their own container — no horizontal
  page overflow at any width.

## Accessibility decisions (S08 §14, §22 — the page meets WCAG 2.2 AA)

- One `<h1>` (the overview title); every movement is an `<h2>`; panel titles step
  down to `<h3>`/`<h4>`. Order is logical and asserted in tests.
- The section rail is a `<nav aria-label="On this page">`; the active link is
  `aria-current="location"` via the S03 scroll-spy; anchor jumps clear the
  sticky header via `scroll-mt` (honours reduced motion through global
  `scroll-padding-top`).
- Diagram has a text equivalent; disclosure state is exposed by the native
  element; focus ring is the global `:focus-visible`.

## Content provenance — frozen vs. blocked (READ THIS)

Frozen and used today: both philosophy pillar sets (P10A, reused verbatim), the
architecture / prop / state / maintainability practices (P10), and every
technical fact, status and locked decision in the Transpahire Product Book
(P10B) **cited as evidence, never re-narrated as the §07 case study**. Where a
final string or asset is not yet frozen it is an OPEN change request wired
against the interim source the brief names — never improvised, never a generic
statement, never an invented metric. The open blockers (`content/engineering.ts`
→ `blockers`):

- **C1** overview intro & summary final prose → interim: frozen site positioning
  + the Content Bible through-line.
- **C2** per-pillar applied-sentence copy → interim: the frozen About pillars.
- **C3** approved architecture / data-flow / AI-pipeline diagram SVGs → interim:
  inline SVG from Product-Book facts.
- **C4** any performance / coverage metric marked Content Required → interim:
  qualitative copy only, no fabricated number (stated honestly in §13/§15
  depth panels).
- **C5** CI/CD tooling & hosting not in P11 / RIR → interim: gates/principles
  only, no named tool/host.
- **C6** approved supporting visual for the overview → interim: text-only.
- **C7** closing CTA copy & destinations → interim: neutral microcopy + approved
  transpahire/contact routes.
- **C8** Engineering-page SEO title/description/OG → interim: `routes.engineering`
  metadata + frozen site identity.

## SEO & structured data (S08 §22)

Per-route metadata via `buildMetadata` (canonical + OG + Twitter). Structured
data is **Person + ProfilePage** — the approved P10 §15 model for a bio /
practice page. A project-scoped `CreativeWork` / `SoftwareApplication` schema
belongs to the case-study pages and is deliberately **not** emitted here
(asserted in tests). Added `profilePageJsonLd` to `lib/structured-data.ts`.

## Reusable patterns introduced

- `EngineeringSection` — the anchored-movement wrapper for any future long-form
  practice/bio page.
- `PracticePanels` — the titled-lists-side-by-side layout.
- `AiFlowDiagram` — the first grounded-AI figure; the diagram/caption/text-alt
  recipe the remaining case-study interiors reuse.
- `profilePageJsonLd` — Person + ProfilePage for any bio/practice page.

## Tests

`src/app/engineering/page.test.tsx` covers: single `<h1>`, every movement as an
anchored labelled `<section>`, the load-bearing order, philosophy-first, the
section rail's anchor-per-movement, both frozen pillar sets rendered in full,
disclosure depth present while collapsed, native deep-linkable `<details>`, the
accessible AI SVG, the verbatim AI principle, accessibility-as-principle, CTA
destinations, the Person + ProfilePage graph (never CreativeWork /
SoftwareApplication), and a guard against any fabricated metric.
