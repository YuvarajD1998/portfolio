# Sprint 02 — Design System & Component Library

The complete, reusable component library that powers the portfolio. Every future
page is assembled by composing what is built here — no sprint should have to
invent a foundational primitive again.

- **Stack:** React 19 + TypeScript · Tailwind v4 · Radix UI · Motion.
- **Entry point:** `import { … } from '@/components'` — one tree-shakeable barrel.
- **Contract:** every component carries the eight-facet JSDoc header (Purpose ·
  Public API · Props · Variants · States · Accessibility · Responsive ·
  Composition). Read the file for the authoritative per-component spec; this doc
  is the map.
- **Token discipline:** no hardcoded values — every colour, space, radius and
  duration is a token (`src/styles/tokens.css`). Both themes work with no
  branching (`[data-theme="dark"]` remaps token values).

Live, inspectable examples of every component (both themes, all variants) live
in the development showcase at **`/showcase`** — a validation surface, excluded
from production (see §Showcase).

---

## Folder hierarchy (§03)

A component lives in exactly one category. Predict the folder from what it does.

| Folder             | Responsibility                                              |
| ------------------ | ----------------------------------------------------------- |
| `ui/`              | Core interactive primitives — the button system.            |
| `layout/`          | Structural primitives — container, grid, stack, wrappers.   |
| `typography/`      | The type scale as semantic components.                      |
| `navigation/`      | Header, nav bar, breadcrumb, mobile nav (unwired).          |
| `feedback/`        | Alert, toast, skeleton, progress, state panels.             |
| `forms/`           | Inputs, select, checkbox, field wrapper.                    |
| `data-display/`    | Card, surface, badge, avatar, metric, timeline, …           |
| `overlays/`        | Dialog, drawer, popover, tooltip, menus (Radix).            |
| `icons/`           | The single Icon wrapper + sizing scale.                     |
| `utility/`         | Theme toggle, copy, scroll, skip-nav, responsive, external. |
| `motion/`          | Reusable motion wrappers on the S01 presets.                |
| `index.ts`         | Tree-shakeable barrel — named exports only.                 |

---

## Layout (§04)

| Component        | Purpose                                                        |
| ---------------- | -------------------------------------------------------------- |
| `Container`      | Centred max-width page wrapper (page \| measure) with gutters. |
| `Section`        | Vertical page region carrying between-section rhythm.          |
| `Stack`          | One-axis flow with a token-scale gap.                          |
| `Flex`           | Explicit flexbox row/column with justify/align/wrap.           |
| `Grid`           | Responsive column grid (1→2→3 across breakpoints).             |
| `Spacer`         | Explicit whitespace on the spacing scale.                      |
| `Divider`        | The datum rule (hairline \| rule \| datum).                    |
| `MaxWidth`       | Low-level width cap (measure \| prose \| page \| full).        |
| `PageWrapper`    | Outermost full-height flex column for a page.                  |
| `ContentWrapper` | Reading column with responsive side gutters.                   |

## Typography (§04)

`Display` · `Heading` (display\|h1\|h2\|h3) · `Subheading` · `Text`
(body\|small\|label\|code) · `Caption` · `Label` (mono kicker — re-exported as
`Eyebrow` from the top barrel to avoid clashing with the forms `Label`) · `Code`
(block) · `InlineCode` · `Quote` · `List` (+ `List.Item`) · `Link`
(internal/external/quiet/inline).

Semantic level (`as`) is chosen independently of visual size. Colour is a token
tier, never a literal.

## UI — button system (§06)

- **`Button`** — one variant-driven button: `variant` (primary \| secondary \|
  tertiary \| ghost \| link), `size` (sm \| md \| lg), `leadingIcon`,
  `trailingIcon`, `loading`, `fullWidth`, `asChild`. Loading shows a spinner and
  sets `aria-busy` + disabled — communicated beyond colour. `asChild` renders a
  Link that looks like a button. Icon-only? Use `IconButton`.
- **`IconButton`** — square, icon-only, with a **required** `label` (becomes
  `aria-label`); md/lg meet the 44px touch target.

## Forms (§07)

Every control is labelled, describable and validatable. `FieldWrapper` generates
ids and wires `aria-describedby` / `aria-invalid` / `aria-required` via a render
prop — no placeholder-as-label, no colour-only errors.

`FieldWrapper` · `Label` (real `<label>`) · `HelperText` · `ValidationMessage`
(icon + text) · `TextInput` · `Textarea` · `Checkbox` · `Switch` · `RadioGroup`
(+ `Radio`) · `Select` (+ `SelectItem`).

```tsx
<FieldWrapper label="Email" required helperText="Work address." error={err}>
  {(props) => <TextInput type="email" {...props} />}
</FieldWrapper>
```

## Data display (§07)

Generic, project-agnostic. `Surface` · `Card` · `Badge` · `Tag` (removable) ·
`Avatar` · `MetricCard` · `StatisticBlock` · `Timeline` (+ `Timeline.Item`) ·
`FeatureCard` · `CodeBlock` (copyable) · `Callout` · `QuoteBlock` ·
`ArchitecturePanel` (+ `.Layer`, `.Node`).

## Feedback (§08)

`Spinner` · `Skeleton` (text\|rect\|circle) · `Progress` (Radix) · `Alert`
(info\|success\|warning\|error) · `ToastProvider` + `useToast()` · `EmptyState` ·
`LoadingState` · `SuccessState` · `ErrorState`.

Every status is carried by an **icon + text** as well as colour. Mount
`<ToastProvider>` once; call `toast({ status, title, description })` beneath it.

## Overlays (§08) — Radix-based

Styling is ours; focus-trap, dismissal, keyboard and labelling are Radix's, never
re-implemented. `Dialog` · `Drawer` (left\|right) · `Popover` · `Tooltip` (+
`TooltipProvider`) · `DropdownMenu` · `ContextMenu` — each with its `*Trigger` /
`*Content` / item parts. Heavy overlays can be `next/dynamic`-split at the call
site (§11 lazy loading).

## Navigation (§05) — unwired

Full interaction states (hover / focus / active / current / open) with **no route
wiring** — a later sprint mounts them. `Header` · `Footer` · `NavigationBar` ·
`NavItem` (`current`) · `NavGroup` · `NavToggle` (`aria-expanded`) · `Logo` ·
`Breadcrumb` · `SectionNav` · `MobileNav` (on Drawer).

## Utility (§09)

`ThemeToggle` · `CopyButton` · `SkipNavigation` · `VisuallyHidden` (Radix) ·
`ExternalLink` · `Show` / `Hide` (breakpoint visibility) · `ScrollToTop` ·
`ScrollIndicator`.

## Icons (§09)

`Icon` — the single wrapper over Lucide. Fixed size scale (sm 16 / md 20 /
lg 24), 1.5px stroke, `currentColor`, decorative by default and `role="img"` +
`aria-label` when `label` is given. **No raw Lucide import outside this wrapper.**

## Motion (§09)

Wrappers over the S01 presets, all honouring `prefers-reduced-motion` (swap to
instant opacity): `Fade` · `Slide` · `Scale` · `Reveal` · `Stagger` (+
`StaggerItem`) · `Hover` · `Press` · `PageTransition`. Animate transform +
opacity only. **No ad-hoc animation in a component.**

---

## Showcase

`/showcase` renders every component in both themes with all variants and states
exercised — the visual validation surface. It is **excluded from production**:
`middleware.ts` returns 404 for `/showcase*` when `NODE_ENV === 'production'`,
and the route is `noindex`. It is not part of the portfolio and imports no
page-specific code.

## Testing (§13)

Vitest + React Testing Library. Components carry rendering, variant, a11y,
keyboard, focus and interaction tests as applicable; overlays are tested for
open/close, focus behaviour and dismissal. `pnpm verify` runs typecheck + lint +
tests + build.

## Definition of done (§14)

A1 all foundational UI implemented · A2 reusable & composable · A3 light & dark
consistent · A4 WCAG 2.2 AA · A5 responsive · A6 documented · A7 tests pass ·
A8 no page-specific code.
