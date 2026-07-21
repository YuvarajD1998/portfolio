# Sprint 15 — Accessibility, Inclusive UX & Production Compliance

**Record** (Playbook §08). Written for the engineer who joins in month six.

## Objective

Audit and refine the whole portfolio until it is **WCAG 2.2 AA compliant** —
fully keyboard accessible, screen-reader friendly, usable with assistive
technologies, and consistent across every page (S04–S12), the shell (S03), the
motion system (S13) and the responsive work (S14). **No page, layout, content
string, typography scale, colour palette or token changed. No new feature or
page was added.** Accessibility improvements *enhance* the existing
implementation only. Native HTML first; ARIA only where native semantics are
insufficient. Where meeting AA would require changing an approved design
decision, it is raised as a change request (A1–A7), never resolved silently in
code. The deliverable is a verified inclusive experience **and** an
Accessibility Compliance Report.

## What was already true (verify, don't rebuild)

Accessibility has been a quality gate since S01, so much of this sprint is
*verification at production depth*, not new construction:

- **G2 zero-axe** ran on every merge (Playbook §09).
- **Semantic-first, one `<h1>`, logical heading order** — S01 convention.
- **Skip link is the first tab stop; `header`/`main`/`footer` landmarks resolve** — S03.
- **`:focus-visible` ring — 2px Signal, 2px offset** — S01 global.
- **`prefers-reduced-motion` honoured at three boundaries** (primitive,
  framework, CSS reset) and no meaning by motion/colour alone — S13.
- **Touch targets ≥ 44×44px** — S01 (stronger than SC 2.5.8's 24px floor).
- **Radix-based overlays** (Dialog, Drawer, Popover, Tooltip, Menus) — S02,
  carrying focus trap/restore and the WAI-ARIA key model out of the box.
- **Reflow to a single axis at 320px / 400%, 200% zoom, orientation** — S14.

S15's job is to prove these hold *end-to-end for every page and widget*, close
the gaps automation can't see, and write it all down.

## The thirteen audits (§02–§13)

Each maps to WCAG 2.2 success criteria; each fixes defects inside the design
system, never by restyling or rewording.

| §  | Audit | Governing SC | The bar |
| -- | ----- | ------------ | ------- |
| 02 | Semantic HTML | 1.3.1, 4.1.2 | Right native element; ARIA only where HTML can't express the role; repeated landmarks named |
| 03 | Heading structure | 1.3.1, 2.4.6 | One `<h1>`, no skipped levels; visual size (token) decoupled from level; **text frozen** |
| 04 | Keyboard navigation | 2.1.1, 2.1.2, 2.1.4 | Everything operable; Tab/Shift+Tab/Enter/Space/Esc/arrows; **no trap** (modal releases on Esc); no positive `tabindex` |
| 05 | Focus management | 2.4.3, 2.4.7, 2.4.11, 3.2.2 | Order = reading order; visible ring; overlay moves focus in & restores to trigger; skip-nav; route focus; error focus |
| 06 | Screen-reader experience | 1.1.1, 1.3.1, 4.1.2, 4.1.3 | Names/labels/relationships; live regions; decorative hidden; diagrams have a text alternative |
| 07 | Forms | 1.3.1, 1.3.5, 3.3.1–3.3.3, 4.1.2 | Programmatic labels; required not colour-only; `aria-describedby` errors; `aria-invalid`; `autocomplete`; success via live region |
| 08 | Colour & contrast | 1.4.1, 1.4.3, 1.4.11 | Text ≥ 4.5:1 (large ≥ 3:1), UI/graphics ≥ 3:1, both themes & all states; colour never the only signal |
| 09 | Motion accessibility | 2.2.2, 2.3.1 | Reduced-motion honoured; ≤ 3 flashes/sec; no motion trap; content in DOM regardless of motion |
| 10 | Interactive components | 4.1.2 | Correct role/name/state + key model per S02 primitive (fix once, applies everywhere) |
| 11 | Touch accessibility | 1.3.4, 1.4.4, 1.4.10, 2.5.1, 2.5.8 | Targets ≥ 44px (S01 floor); gesture alternatives; no orientation lock; 200% text; reflow (S14) |
| 12 | Content readability | 1.3.2, 1.4.8, 1.4.12 | DOM order = visual order; text-spacing overrides don't clip; **typography & copy frozen** |
| 13 | Error prevention & recovery | 3.3.1, 3.3.3, 3.3.4, 3.3.7 | Contact form validates, keeps entered data on error, describes the fix; no destructive action exists |

## Screen-reader & diagrams (§06)

Every control exposes a correct name/role/value. State changes not tied to a
focus move are announced through the existing S13 `aria-live` pattern (Contact
success/error, `RouteAnnouncer`) — no new live-region machinery invented. The
S07/S08 architecture diagrams carry a text alternative or an adjacent described
summary **drawn from the frozen Book B content** (A1) — never newly authored
copy. Decorative art is `aria-hidden` / empty `alt`; informative imagery gets a
meaningful description.

## Forms (§07) — Contact (S12) is the main surface

The S02 `Field` wrapper is already a11y-wired; S15 verifies it end-to-end in
context: label associated, required in text (not colour), error tied via
`aria-describedby` + `aria-invalid`, focus moves to the first error on invalid
submit, success announced via the S13 `Fade` + `aria-live` confirmation. The
form's copy is frozen (S12) — **wiring only**.

## Contrast (§08) — measure, don't repaint

Contrast is a property of the approved palette (P05/P08). This pass *measures*
every text/control/state/icon pair in **both themes**. Where a token passes, it
is recorded; where a token fails AA, it is raised as a change request against
the Design Bible (**A2**) — an approved colour is **not** silently altered.
Colour is never the sole signal (SC 1.4.1): status uses icon + text, links keep
a non-colour affordance.

## Testing (§14)

- **Automated:** Lighthouse Accessibility; `axe-core` in the Vitest suite;
  per-component a11y assertions co-located with the S02 primitives (a
  regression fails the suite); automated heading-outline & landmark checks.
  Gate **G2 — zero axe violations** across every page.
- **Manual (what tools can't do):** keyboard-only traversal of every page and
  widget; screen-reader passes on **NVDA** (Windows, FF/Chrome) and
  **VoiceOver** (macOS/iOS, Safari); accessibility-tree inspection; 200% zoom &
  reflow (with S14); reduced-motion on a real OS preference.
- A green tool is **necessary, not sufficient** — every manual finding and its
  resolution is logged in the compliance report.

**Browser × AT matrix:** Chrome (Blink) desktop+Android · Firefox (Gecko) ·
Safari (WebKit) macOS+iOS · Edge (Blink); NVDA+FF/Chrome; VoiceOver+Safari.

## Deliverable: Accessibility Compliance Report (§15)

**Produced:** [`docs/accessibility-compliance-report.md`](./accessibility-compliance-report.md).
Lives with the design system (S02), beside the S14 responsive docs. Records:
WCAG 2.2 AA checklist (criterion → status → evidence), components audited (S02
inventory), issues identified, resolutions implemented, remaining known
limitations (honestly), testing methodology (automated + manual + AT matrix),
future recommendations (incl. AAA opportunities), and traceability from each
decision back to a success criterion and an approved phase.

## What this sprint changed

Fixes are accessibility-only and confined to the six defects the audits
surfaced — each traceable to a WCAG SC and made inside the existing design
system. The full record is in
[`accessibility-compliance-report.md`](./accessibility-compliance-report.md) §2:

1. **Footer landmark proliferation** → `NavGroup` no longer renders a `<nav>`
   per column; one `<nav aria-label="Footer">` wraps all columns; each column
   is a `<ul>` labelled by its title (SC 1.3.1).
2. **Bogus `<h2>` in the outline** → the decorative eyebrow micro-labels on
   four heroes moved from `as="h2"` to `as="p"`; text unchanged (SC 1.3.1,
   2.4.6).
3. **Invalid-submit not announced** → the *frozen* `invalidSummary` string is
   now surfaced through an always-mounted `role="status"` live region, in
   addition to focus-to-first-error (SC 3.3.1, 4.1.3).
4. **Fragile Contact success/error announcement** → removed the redundant
   wrapping `aria-live` divs; the S02 `Alert` (already `role="status"`/`alert`)
   announces once, reliably (SC 4.1.3).
5. **Missing `autocomplete`** → applied to the subject/message inputs from the
   content config (SC 1.3.5).
6. **Diagram not machine-structured** → `ArchitecturePanel` node chips are now
   a real `<ul>`/`<li>` list labelled by the layer name (SC 1.1.1, 1.3.1).

Also: `axe-core` (WCAG 2.2 AA rule set) was wired into the Vitest suite via
`vitest-axe` (`src/tests/axe.ts` + `src/tests/setup.ts`) — the automated **gate
G2** the record had assumed but that was not yet present — with co-located
assertions on the Contact form, footer, diagram and Engineering page. Contrast
is measured against the token values in `src/utils/a11y.test.ts` (both themes).
Test count 240 → 253.

**No route, layout, section, content string, typography scale, colour token or
S13 animation was altered. S03–S14 remain frozen.**

## Open gaps (raised, not invented)

| ID | Gap | Resolution shipped |
| -- | --- | ------------------ |
| A1 | Diagram/chart text alternatives not fixed on the record | Derived from frozen Book B summary; never newly authored |
| A2 | An approved palette token fails AA in some state | Raised as a Design-Bible change request; colour not silently altered |
| A3 | Confirmed conformance target | AA assumed; any AAA ask is a scope addition |
| A4 | Exact AT/browser pairs to certify | NVDA+FF/Chrome, VoiceOver+Safari assumed against P10 |
| A5 | Approved touch interaction for hover-revealed content | Inherits S14 R6; same approved tap interaction |
| A6 | Component needing ARIA beyond the Radix S02 primitive | Added only if native + Radix semantics are insufficient |
| A7 | Required-field / error copy not fixed by S12 | Drawn from frozen Content Bible; raised if genuinely absent |

## Definition of done

WCAG 2.2 AA satisfied · every page keyboard accessible (no trap) · forms
accessible · interactive components support AT · focus managed (visible,
ordered, restored, skip-nav, routes) · SR verified on NVDA + VoiceOver · motion
respects reduced-motion, no flashing · contrast met in both themes · testing
documented (automated + manual + AT matrix) · **Accessibility Compliance Report
produced** · no approved design or content altered (S03–S14 frozen). After S15
the portfolio is accessible and compliant; S16–S18 harden performance,
discoverability and launch readiness.
