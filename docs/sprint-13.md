# Sprint 13 — Global Motion System & Micro-Interactions

**Record** (Playbook §08). Written for the engineer who joins in month six.

## Objective

Unify motion into **one system** across the whole portfolio — a single set of
primitives, tokens and interaction patterns applied consistently to every page
(S04–S12) and the shell (S03), so a Homepage reveal, a page transition into
Transpahire and a Contact success all feel like the same hand. **No page, layout
or content string changed. No new animation or interaction pattern was invented**
— only the motion language already approved in the design phases (P05 motion
specs, P07/P08, the P09 prototype, the P10 blueprint) ships, centralized and made
reusable. Where a required value was not fixed on the record, it is centralized as
a token with a sensible default and the gap is raised (M1–M6), never improvised.

## The `motion/` module (architecture, P10)

Motion lives in one place; pages consume it and never define their own keyframes
or timing.

```
src/theme/tokens.ts        Motion timings & easing, numeric (Motion takes seconds)
src/styles/tokens.css      The runtime source of truth (--dur-*, --ease, --stagger-step)
src/lib/motion/presets.ts  The Variants vocabulary (fade / slideUp / scaleIn / stagger /
                           pageTransition / hoverNudge / hero* / reducedMotion)
src/components/motion/      The drop-in wrappers pages actually use
  MotionWrappers.tsx        Fade · Slide · Scale · Reveal · Stagger · StaggerItem ·
                            Hover · Press · PageTransition
src/hooks/useReducedMotion.ts  The single reduced-motion gate
src/layouts/PageTransitions.tsx  Route-level cross-fade wired into the shell
src/providers/index.tsx     MotionConfig reducedMotion="user" — framework backstop
```

**Rule:** a page imports a primitive; it never hand-rolls an animation. Any
duplicated or inline animation logic is a review reject (§02).

## Tokens (§03 — no hard-coded values)

Every animation value is a token. Literals in a component are a defect.

| Token (CSS)        | Value  | Seconds (`duration.*`) | Role (source)                              |
| ------------------ | ------ | ---------------------- | ------------------------------------------ |
| `--dur-instant`    | 100ms  | `instant` 0.1          | press / hover feedback                     |
| `--dur-micro`      | 160ms  | `micro` 0.16           | small state changes, transition exit       |
| `--dur-page`       | 200ms  | `page` 0.2             | page transition — "confirms you moved" (P09 §06) |
| `--dur-standard`   | 240ms  | `standard` 0.24        | fades, theme swap, drawer/dialog           |
| `--dur-entrance`   | 360ms  | `entrance` 0.36        | hero datum-line draw                       |
| `--dur-reveal`     | 400ms  | `reveal` 0.4           | section reveal — "directs first read" (P09 §06) |
| `--stagger-step`   | 50ms   | `staggerStep` 0.05     | sequenced-content step (Bible §10; M1)     |
| `--ease`           | `cubic-bezier(0.2,0.8,0.2,1)` | `easing`  | the single default curve (Bible §10)       |

The CSS (ms) and JS (seconds) tokens are hand-kept in lockstep; `presets.test.ts`
asserts every preset uses only these `duration` values, so a stray literal fails
the suite.

## Primitives (§04) — contract of every wrapper

Each wrapper: reads only tokens · animates transform/opacity only · honours
reduced-motion internally · renders its children in the DOM before/around motion
(content is present regardless — crawlers and AT always see it) · one
implementation, imported everywhere.

- **Fade / Slide / Scale / Reveal** — on-enter (`whileInView`, fires once).
  `Reveal` is the canonical section entrance (alias of `Slide`/`slideUp`).
- **Stagger / StaggerItem** — sequenced group reveal, stepped by `--stagger-step`.
- **Hover / Press** — interaction feedback (skipped under reduced motion).
- **PageTransition** — route cross-fade (see below).

Shared-element transitions (**M2**) are **omitted**: the P09 prototype does not
validate them, so they are not built.

## Page transitions (§05)

`PageTransitions` (in the shell's `<main>`) keys a `motion.div` on the App Router
pathname inside `AnimatePresence`. It uses the `pageTransition` preset (200ms
enter, P09 §06). **Navigation is never gated:** the incoming route mounts
immediately and the cross-fade plays over the top; under reduced motion it
collapses to an instant opacity swap. No approved bespoke per-route effect exists
on the record (**M3**) → the base cross-fade is used, not an invented one.

## Reveals (§06) & scroll (§09)

Reveals are progressive enhancement — content is fully rendered and readable
without JS; the animation only affects how it appears, once, on enter, via an
IntersectionObserver inside the primitive. Smooth anchor scrolling is the global
`scroll-behavior: smooth` (disabled by the reduced-motion reset). The scroll
**progress indicator (M4)** is **not** approved in P07/P09 → `ScrollIndicator`
exists but is intentionally **not wired**; it ships only if approved.

## Diagrams (§10) & loading (§11)

Diagram motion is limited to the approved reveal-on-scroll (the shared `Reveal`);
no flow/expand animation not on the record was invented (**M5**) — diagrams render
statically and stay keyboard-operable with content in the DOM. Loading uses the
approved skeleton shimmer (`Skeleton`, `motion-safe:animate-pulse`, stilled under
reduced motion) sized to reserve space (CLS ~0); no invented animated placeholder
(**M6**).

## Accessibility (§12) & performance (§13)

- `prefers-reduced-motion` is enforced at the primitive boundary
  (`useReducedMotion()`) **and** at the framework boundary
  (`MotionConfig reducedMotion="user"`) **and** in the global CSS reset. A page
  cannot ship motion that ignores it.
- No meaning rides on motion alone; state changes are announced via `aria-live`
  (Contact success/error, `RouteAnnouncer`). Focus survives every transition.
- Only `transform` and `opacity` animate — enforced by `presets.test.ts`. Scroll
  work is observer/passive-listener based, never per-frame layout reads.

## What this sprint changed

- Added `--dur-page` / `--dur-reveal` / `--stagger-step` / `--ease-enter` /
  `--ease-exit` tokens (mirrored in `theme/tokens.ts`) and pointed `slideUp`,
  `pageTransition` and `stagger` at them.
- Wired `PageTransitions` into `AppShell`; added `MotionConfig` to `Providers`.
- De-inlined `features/home/Hero.tsx` — its word-rise and datum-line motion now
  come from `heroWord` / `heroWordContainer` / `heroDatumLine` presets (the
  hard-coded `0.36` / `cubic-bezier` literals are gone).
- Migrated the Contact success confirmation onto the shared `Fade` primitive.
- Polyfilled `IntersectionObserver` in the test setup so reveals are assertable.
- Added `MotionWrappers.test.tsx`, `presets.test.ts`, `PageTransitions.test.tsx`.

**No route, layout, section or content string was altered. S03–S12 remain frozen.**

## Open gaps (raised, not invented)

| ID | Gap | Resolution shipped |
| -- | --- | ------------------ |
| M1 | Timings not fixed by P05 | Centralized as tokens; page/reveal confirmed against P09 §06 |
| M2 | Shared-element transitions approved? | Not in P09 → omitted |
| M3 | Approved page-transition pattern | None specified → base cross-fade |
| M4 | Scroll progress indicator approved? | Not in P07/P09 → `ScrollIndicator` left unwired |
| M5 | Approved diagram behaviors | Reveal-on-scroll only; static otherwise |
| M6 | Skeleton styling per surface | Approved shimmer; reserved-space placeholder otherwise |
