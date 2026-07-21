# Sprint 14 — Responsive Optimization & Cross-Device Validation

**Record** (Playbook §08). Written for the engineer who joins in month six.

## Objective

Validate and optimize the **existing** portfolio across every supported viewport
so layouts adapt gracefully, typography stays readable, navigation stays usable
by touch, media scales cleanly, motion stays smooth, and accessibility holds at
zoom and in every orientation. This is **refinement, not redesign**: no page,
layout, content string, typography scale or motion behavior changed (S03–S13 stay
frozen). Every adjustment traces to an observed responsive defect and stays
inside the approved design system. Where a responsive value was not fixed on the
record, it was drawn from the S02 breakpoint tokens (the approved-safe default),
never improvised as a new layout, breakpoint or type size.

## Responsive strategy (how the system holds every screen)

The system was **already largely responsive-correct** when this sprint began —
the audit confirmed the foundation rather than rebuilding it. The strategy that
was validated:

- **One fluid layout, capped and centered.** `Container` (`components/layout`)
  caps content at `--container` (1200px) / reading text at `--measure` (680px)
  with responsive side padding (`px-6 md:px-10 lg:px-16`). Ultra-wide is handled
  by the cap-and-center, not a separate layout — the approved design defines no
  ultra-wide-specific layout, so none was introduced (R1, R7).
- **Grids collapse to one column at base.** The `Grid` primitive always emits
  `grid-cols-1` at the base width and widens only at `md`/`lg`; sidebar grids use
  `lg:grid-cols-[…]` with no base template, so they stack below `lg`.
- **Fluid type within the closed scale.** Display type scales via
  `clamp(44px, 6vw, 72px)` (`--fs-display`); the rest of the scale is fixed by
  P05 and is **unchanged**. Reading width is bounded by `--measure`. No new size,
  weight or face was added (R2).
- **Wide content scrolls inside its own box.** Code blocks, the one data table,
  and the architecture diagrams (`SystemDiagram`, `AiFlowDiagram`) scroll on the
  x-axis inside an `overflow-x-auto` container over a scalable `viewBox` SVG —
  they never widen the page body (R5, contained-scroll default).
- **Dynamic viewport units.** Full-height surfaces use `min-h-dvh` / `100dvh`,
  not `100vh`, so mobile browser chrome never clips content (iOS Safari).
- **Sticky-header-aware anchoring.** `html { scroll-padding-top: --header-height }`
  plus `scroll-mt-[calc(var(--spacing-header)+var(--space-8))]` on every anchored
  section means in-page jumps land below the sticky header, never under it.
- **Touch parity.** Every interactive control is keyboard- and tap-operable; no
  affordance, state or content is reachable by hover alone (audited — none found).
  Touch targets meet the 44×44px minimum (CLAUDE.md / Playbook §07, S14 §10).
- **Reduced motion, everywhere.** Honoured at the S13 primitive boundary and via
  the global `@media (prefers-reduced-motion)` kill-switch — validated, unchanged.

## Breakpoints (the P10 / S02 set — unchanged)

The only widths the responsive system recognises. Defined in
`src/styles/tokens.css` (`--bp-*`), mirrored in `src/constants/breakpoints.ts`,
and exposed to Tailwind (`sm:`/`md:`/`lg:`) in `globals.css`. **No new breakpoint
was added** (R3).

| Name | Width  | Role                                  |
| ---- | ------ | ------------------------------------- |
| `sm` | 640px  | Small → standard mobile boundary      |
| `md` | 960px  | Tablet / where multi-column layouts begin |
| `lg` | 1280px | Desktop / where the section rail appears |

Components respond _within_ these, never around them. The target viewport matrix
(S14 §02) — small mobile through ultra-wide — is validated against this set;
ranges between named breakpoints are covered by the fluid layout, not by new
breakpoints.

## Layout adjustments made this sprint

Two, both overflow guardrails — no layout intent changed.

- **`layouts/AppShell.tsx`** — added `overflow-x-clip` to the shell root. This is
  a safety net against horizontal scroll: it neutralises the transient off-screen
  position of the mobile Drawer during its slide-in (`translateX(±100%)`
  keyframes) and prevents any future single-element overflow from becoming a
  whole-page sideways scroll. `clip` (not `hidden`) is used deliberately so it
  does **not** create a scroll container that would break the header's
  `position: sticky`.
- **`features/transpahire/Matching.tsx`** — wrapped the job-based weight table in
  an `overflow-x-auto` container. The current data is short (2 columns, e.g.
  "65%") so it does not overflow today; the wrapper matches the wide-content
  containment rule (§06, R5) so the table can never push the page body sideways
  if a longer axis label is ever added.

## Component refinements (touch targets, §10)

The correctable defects were icon-only controls whose glyph was reliably tappable
by mouse but whose hit box fell under 44×44px on touch, plus two compact control
rows. Each fix **expands the hit area on the token scale** (`h-11`/`w-11`/
`min-h-11` = 44px) while preserving the control's approved visual size via
negative margins — the chip/close-glyph looks the same; the tappable area grows.

| Component | File | Before | After |
| --------- | ---- | ------ | ----- |
| Dialog close | `components/overlays/Dialog.tsx` | ~20px glyph, no box | `h-11 w-11` (44px), pulled back `-mr-3 -mt-3` |
| Drawer close (mobile nav panel) | `components/overlays/Drawer.tsx` | ~20px glyph, no box | `h-11 w-11`, `-mr-3 -mt-3` |
| Toast dismiss | `components/feedback/Toast.tsx` | ~16px glyph, no box | `h-11 w-11`, `-mr-2 -mt-2` |
| Tag remove | `components/data-display/Tag.tsx` | ~16px glyph, no box | `min-h-9 min-w-9` hit box, `-my-2 -mr-2` (chip height held)\* |
| Projects filter chips | `features/projects/Toolbar.tsx` | ~30px tall | `inline-flex min-h-11 items-center` (44px) |
| Projects search clear | `features/projects/Toolbar.tsx` | `size="sm"` (36px) | `size="md"` (44px), flush `right-0` |
| Mobile nav links | `layouts/SiteHeader.tsx` + `navigation/MobileNav.tsx` | ~43px, `gap-1` | `flex min-h-11 items-center py-2.5`, list `gap-2` |
| Section rail links | `components/navigation/SectionNav.tsx` | `py-1` (~27px), `gap-1` | `py-2`, `gap-1.5` |

\* **Tag** is an inline chip; a full 44px square would force the whole chip
taller, changing its approved compact density. The remove control is expanded to
a comfortable 36px hit box (the largest that preserves the chip's height) and the
removable variant only appears in the dev component gallery today, so real-world
impact is minimal. **Section rail** links (`SectionNav`) render only at ≥`lg`
inside a `hidden lg:block` aside — a desktop, mouse-primary rail — so they were
improved proportionately toward the target rather than forced to 44px, which
would have distorted the intentional compact table-of-contents density. Both are
recorded as the honest limitation below rather than "fixed" past what the
approved design allows.

## Media & motion (validated, unchanged)

- **Media** — no raw `<img>` anywhere; the one `next/image` `fill` usage
  (`features/about/Introduction.tsx`) carries a correct `sizes` attribute inside a
  fixed-aspect box (no CLS). Its `sizes` breakpoint was aligned from `768px` to
  the design-system `960px` (`md`) for consistency — a source-selection tweak, no
  visual change. SVG diagrams scale as vectors via `viewBox` + the global
  `svg { max-width:100%; height:auto }` rule.
- **Motion** — the S13 JS presets animate only `opacity`, `y` and `scale`; no
  preset translates off-screen on the x-axis, so no preset introduces transient
  horizontal overflow. The only x-axis translate is the Drawer CSS slide, now
  covered by the shell `overflow-x-clip`. No S13 animation was modified.

## Browser-compatibility considerations

- **WebKit / iOS Safari** — `min-h-dvh` / `100dvh` (not `100vh`) keeps full-height
  surfaces correct under the collapsing mobile toolbar. No `100vw` anywhere, so no
  scrollbar-induced overflow. Sticky header + `scroll-padding-top` behave under
  WebKit's sticky implementation because the shell uses `overflow-x-clip`, which
  does not establish a scroll container (a plain `overflow: hidden` would break
  sticky on some engines — hence `clip`).
- **All engines (Blink/Gecko/WebKit)** — fixes are standards-compliant CSS
  utilities on the token scale; no per-browser fork or hack was introduced. The
  supported set is the P10 set: Chrome, Firefox, Safari, Edge (desktop + mobile).

## Remaining limitations (honest record)

- **Tag remove control is 36px, not 44px.** Bounded by the approved inline-chip
  density; only surfaced in the dev showcase today. If a removable Tag ships in
  real content at a size where the 44px floor is required, raise it as a change
  request against the chip spec (P08) rather than distorting the chip here.
- **Section rail links are ~33px.** They render desktop-only (`hidden lg:block`,
  ≥1280px, mouse-primary). Forcing 44px would change the approved compact TOC
  density. If the rail is ever surfaced on touch, its density is a P07/P08
  decision to confirm, not an implementation call.
- **Cross-device validation was performed against the code and the breakpoint
  contract**, not on a physical device lab. Real-device QA across the full matrix
  and the four browsers (S14 §12) is a manual pass to run before launch; the
  code-level contract that makes it pass is documented above.

## Sources (every decision traces to an approved phase)

- Breakpoints & container/measure caps — **P10 Frontend Blueprint / P05 Design
  Bible §05**, wired in `tokens.css` / `constants/breakpoints.ts`.
- Type scale (unchanged) — **P05 Design Bible §04, §17**.
- Responsive layout intent per page — **P07 UX & responsive wireframes / P08
  Hi-Fi**; validated behavior — **P09 prototype**.
- Touch minimum 44×44px & reduced-motion — **CLAUDE.md / Playbook §07**, S13
  primitives.
- Motion language — **S13 / Design Bible §10** (validated, not modified).

Nothing in this sprint reinterprets those phases; this record only documents how
the responsive contract is wired and where an approved-safe default was applied.
