# CLAUDE.md — Conventions & Architecture

Guidance for engineers (and AI agents) working in this repository. It captures
the conventions Sprint 01 established, so the engineer who joins in month six
can locate any change from the folder name alone.

**The golden rule:** this codebase _implements_ an approved design. It
introduces **no new design decisions**. The source of truth is the approved
phases — the Design Bible (P05), the Frontend Blueprint (P10) and the
Production Playbook (P11). A perceived gap is raised as a question, never
resolved by inventing a value in code.

---

## Folder architecture

Find code by **what it does**, not what it is. Every folder has one
responsibility (Sprint 01 §03).

```
src/
├─ app/          Routes, layouts, route-level metadata (App Router).
├─ components/   Reusable, generic UI.
│  ├─ primitives/  Layout & text primitives (Container, Text, …).
│  └─ icon/        The single Icon wrapper.
├─ features/     Page- & domain-specific composed UI. (empty until S04+)
├─ layouts/      Structural wrappers & region composition (Header, Footer, shell).
├─ lib/          Framework-adjacent helpers & integrations (cn, seo, motion).
├─ hooks/        Reusable React hooks.
├─ providers/    Context providers (theme, …).
├─ styles/       Global CSS, resets & token declarations.
├─ theme/        Token definitions, theme config, fonts, FOUC script.
├─ utils/        Pure, framework-agnostic helpers (a11y math, …).
├─ types/        Shared TypeScript types.
├─ constants/    Fixed values & enumerations (breakpoints, …).
├─ config/       App & environment configuration (env, site).
├─ content/      Structured content & data. (empty until S02+)
└─ tests/        Test setup & shared utilities.
```

### Import boundaries (lint-enforced)

- Import via the **`@/*`** alias — never deep relative paths (`../../..`).
- **Data flows down, events flow up.** No layer imports a higher one.
  Primitives must not import from `features/`, `layouts/` or `app/` (enforced by
  an ESLint `no-restricted-imports` rule).
- Rule of placement: if two features use it, move it down a layer.

## The token discipline (non-negotiable)

- Every literal value lives in **`src/styles/tokens.css`** — and nowhere else.
- Components read tokens **by name** through Tailwind utilities (`bg-paper`,
  `text-ink`, `gap-6`) or `var(--token)`.
- A raw hex, px or ms literal in a component is a defect. See **DESIGN.md**.
- No value outside the spacing/type/radius scales. The scales are closed.

## Theming

- Light is the default, canonical mode; dark is a deliberate companion.
- The dark theme is a **value remap** on `[data-theme="dark"]` in `tokens.css`.
  Components never branch on a theme flag — they read tokens that swap.
- A pre-hydration script (`theme/theme-script.ts`) sets the attribute before
  first paint → no flash (FOUC).
- State is owned by a single provider (`providers/theme-provider.tsx`).
- Adding a third theme = a new value block in `tokens.css` + one config entry.

## Components

### The eight facets (Playbook §05)

No component is merged until its JSDoc header declares all eight:
**Purpose · Public API · Props · Variants · States · Accessibility ·
Responsive · Composition.** Every primitive in `components/primitives/` follows
this template — copy it.

### Conventions (Blueprint §04, §17)

- Server by default; add `'use client'` only where interaction demands it.
- PascalCase component + one component per file; barrel export via `index.ts`.
- Accept **data, not styling**. Variants via typed unions, never boolean soup.
- ≤ 7 props; if you need more, split the component.
- Files ≤ 200 lines; components ≤ 150.
- Compose classes only with `cn()` (`lib/cn.ts`).
- Icons route through `<Icon>`; motion routes through the presets
  (`lib/motion/presets.ts`). A raw Lucide import or ad-hoc animation is a reject.

## Accessibility (maintained on every merge, Playbook §07)

- Semantic HTML first; one `<h1>` per page; logical heading order.
- Every interactive element is keyboard-operable with a visible focus ring
  (global `:focus-visible`, 2px Signal, 2px offset).
- Skip link is the first tab stop; landmarks (`header`/`main`/`footer`) resolve.
- `prefers-reduced-motion` is honoured globally; no meaning by motion/colour alone.
- Touch targets ≥ 44×44px.

## Testing (Sprint 01 §11)

- Vitest + React Testing Library, jsdom environment.
- Co-locate tests: `Thing.tsx` → `Thing.test.tsx`.
- `lib/` targets ≥ 90% coverage (a floor, accrued as code lands).
- A green suite must mean the real flows still work — coverage is not a vanity
  metric.

## How future sprints add a component

1. Decide the layer: generic → `components/`, domain → `features/`.
2. Create `Thing.tsx` with the **eight-facet** JSDoc header.
3. Style **only** from tokens (Tailwind utilities / `var(--token)`).
4. Handle all applicable states (Bible §13) and both themes (no branch).
5. Add `Thing.test.tsx` (render + a11y assertions) and export from `index.ts`.
6. Run `pnpm verify`. All gates green before merge.

## Quality gates (Playbook §09 — all must be green)

`G1` design fidelity · `G2` zero axe violations · `G3` responsive across four
breakpoints · `G4` performance targets · `G5` lint/types/standards ·
`G6` no duplicated logic · `G7` no console errors · `G8` no visual regressions.

`pnpm verify` covers G4/G5/G7 mechanically; G1/G3/G6/G8 and axe are verified in
review / added in the hardening sprints.
