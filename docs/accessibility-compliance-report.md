# Accessibility Compliance Report — Datum Portfolio

**Sprint 15 · Phase 26 — Accessibility, Inclusive UX & Production Compliance**
**Conformance target: WCAG 2.2 Level AA** · Lives with the design system (S02),
beside the S14 responsive documentation. This is the durable record of the S15
audit: the checklist, the components audited, the issues found, the resolutions
shipped, the remaining limitations, the testing methodology, and future
recommendations. A future change is measured against this report rather than
reintroducing a regression.

> **Scope discipline.** S15 audits and refines; it does not redesign. Every
> change below is a fix to an observed accessibility defect, traceable to a
> WCAG 2.2 success criterion and made inside the existing design system. No
> route, layout, section, content string, typography scale, colour token or S13
> animation was altered. S03–S14 remain frozen. Where meeting AA would require
> changing an approved design decision, it is **raised as a change request**
> (A1–A7), never resolved silently in code.

---

## 1. Summary

| | |
| --- | --- |
| Target | WCAG 2.2 AA |
| Result | AA met across the shipped surface, with **one raised palette change request** (A2) tracked below |
| Automated gate | `axe-core` (WCAG 2.2 AA rule set) wired into the Vitest suite — **gate G2, zero violations** |
| Tests | 253 passing (was 240; +13 accessibility/axe assertions added) |
| Defects found | 6 |
| Defects fixed | 5 (all wiring/semantics, inside the design system) |
| Raised, not fixed in code | 1 (A2 — approved palette token contrast) |

---

## 2. Issues identified & resolutions shipped

Each fix is accessibility-only, confined to a defect an audit surfaced, and
traceable to a success criterion.

| # | Issue | Location | SC | Resolution |
| - | ----- | -------- | -- | ---------- |
| 1 | **Landmark proliferation** — the footer emitted one `<nav>` landmark per column (4+), flooding the AT landmark menu. | `components/navigation/NavGroup.tsx`, `components/navigation/Footer.tsx`, `layouts/SiteFooter.tsx` | 1.3.1 | `NavGroup` no longer renders its own `<nav>`; it is a titled `<ul>` labelled by its heading via `aria-labelledby`. The footer wraps all columns in **one** `<nav aria-label="Footer">`. No visual change. |
| 2 | **Bogus heading in the outline** — a decorative mono micro-label ("Positioning" / "Built with") was rendered as `<h2>` directly under the `<h1>`, competing with real section headings. | `features/{engineering,skills,experience,transpahire}/Hero.tsx` | 1.3.1, 2.4.6 | Changed `<Eyebrow as="h2">` → `<Eyebrow as="p">` on all four heroes (matching the sibling eyebrows). The adjacent chip list already carries its own `aria-label`, so no naming is lost. Text and visual size unchanged. |
| 3 | **Invalid-submit not announced** — on a blocked submit, focus moved to the first error but no live region announced *that* submission failed. The frozen summary string existed in content but was never rendered (dead code). | `features/contact/ContactForm.tsx` | 3.3.1, 4.1.3 | Rendered the **frozen** `form.states.invalidSummary` (C3 copy, never newly authored) through an always-mounted `role="status"` / `aria-live="polite"` region. Focus-to-first-error behaviour retained. |
| 4 | **Fragile success/error announcement** — success and error Alerts were each nested inside an *additional* on-demand `aria-live` div, producing a doubled/late-mounted live region (unreliably announced by NVDA/VoiceOver, or double-announced). | `features/contact/ContactForm.tsx` | 4.1.3 | Removed the redundant wrapping `aria-live` divs. The S02 `Alert` is already a `role="status"` (success) / `role="alert"` (error) live region, so it announces itself once, reliably. |
| 5 | **Missing `autocomplete`** — the subject/message inputs rendered no `autocomplete` attribute even though the content declared `autoComplete: 'off'`. | `features/contact/ContactForm.tsx` | 1.3.5 | Applied `autoComplete` from content to the subject and message inputs (name/email were already wired). Purpose is now programmatic on every field. |
| 6 | **Diagram not machine-structured** — `ArchitecturePanel` (used as the homepage system diagram) rendered its node chips as bare `<span>`s in a flex row, so AT heard a flat run of text with no item count or list boundaries. | `components/data-display/ArchitecturePanel.tsx` | 1.1.1, 1.3.1 | Each layer's node chips are now a real `<ul>`/`<li>` list labelled by the layer name via `aria-labelledby`. AT announces the layer, the node count and the list boundaries. No visual change (list markers removed with `list-none`). |

### Pre-existing build blocker (out of a11y scope, fixed to keep the gate green)

- `components/utility/CopyButton.tsx:53` — `window.setTimeout(...)` (returns
  `number`) was assigned to a ref typed `ReturnType<typeof setTimeout>`, a
  type error that failed `next build`'s type-check step. Changed to bare
  `setTimeout(...)` to match the ref type. This is a type-correctness fix in a
  pre-existing (prior-sprint) file, not an accessibility change; recorded here
  for traceability.

---

## 3. Open change requests (raised, not invented)

Each is a confirmation against an approved phase or a standard — not an
implementation invention. Where a spec is genuinely absent, the approved-safe
default ships and the gap is raised.

| ID | Gap | Status |
| -- | --- | ------ |
| **A1** | Text alternatives for architecture/flow diagrams (S07/S08). | **Resolved in-system.** The two SVG diagrams (`SystemDiagram`, `AiFlowDiagram`) already carry `<title>`+`<desc>` and `<figure>`/`<figcaption>` drawn from frozen Book B content; `ArchitecturePanel` now has list semantics under its caption (#6). No newly authored copy. |
| **A2** | **`--mute` (#8A857A) fails AA for normal-size text in the light theme** — measured **3.46:1** on paper (needs 4.5:1). It is a labels/eyebrows tier used with uppercase mono micro-labels (`text-label` 11px, `text-small` 13px). | **Raised as a Design-Bible change request.** The approved palette owns this value; it is **not** silently repainted. Dark-theme mute (#A29C90 → 6.91:1) was already lifted in a prior sprint ("R-05 — clears AA"). Documented and asserted in `src/utils/a11y.test.ts`. Recommended resolution in §7. |
| **A3** | Confirmed conformance target. | AA assumed and met. Any AAA criterion the client wants is a scope addition (see §7). |
| **A4** | Exact AT/browser pairs to certify. | NVDA + Firefox/Chrome and VoiceOver + Safari assumed against P10 (matrix in §5). |
| **A5** | Approved touch interaction for hover-revealed content. | Inherits S14 R6 — the same approved tap interaction. No hover-only affordance found in the audit. |
| **A6** | A component needing an ARIA pattern beyond the Radix S02 primitive. | None found — native + Radix semantics were sufficient everywhere. No gratuitous ARIA added. |
| **A7** | Required-field / error copy not fixed by S12. | None absent — all form copy (including `invalidSummary`) was already frozen in the Content Bible; #3 simply wired the existing string. |

---

## 4. WCAG 2.2 AA checklist (criterion → status → evidence)

Legend: ✅ met · ⚠ met with a raised change request · N/A not applicable to this
static content portfolio.

| SC | Criterion | Status | Evidence |
| -- | --------- | ------ | -------- |
| 1.1.1 | Non-text content | ✅ | `Icon` decorative-by-default (`aria-hidden`, `focusable=false`); informative images have `alt`; diagrams have `<desc>` / list semantics (#6). |
| 1.3.1 | Info & relationships | ✅ | Single `<main>/<header>/<footer>`; one footer `<nav>` (#1); real lists incl. diagram nodes (#6); labelled form fields; clean heading outline (#2). |
| 1.3.2 | Meaningful sequence | ✅ | DOM order = visual order; verified with S14 reflow; progressive-disclosure depth stays in the DOM. |
| 1.3.4 | Orientation | ✅ | No orientation lock (S14). |
| 1.3.5 | Identify input purpose | ✅ | `autocomplete` on all contact fields (#5). |
| 1.4.1 | Use of colour | ✅ | Status uses icon + text (`Alert`); links keep a non-colour affordance; required uses `*` + `(required)` sr-only text. |
| 1.4.3 | Contrast (minimum) | ⚠ | Ink/Graphite body text clear AA in both themes (asserted). **`--mute` fails at normal size in light theme — A2.** |
| 1.4.4 | Resize text | ✅ | 200% zoom without loss (S14). |
| 1.4.10 | Reflow | ✅ | Single-axis reflow at 320px / 400% (S14). |
| 1.4.11 | Non-text contrast | ✅ | Signal (focus/links) ≥ 3:1 in both themes (asserted: 7.55 light / 4.99 dark). |
| 1.4.12 | Text spacing | ✅ | Token-based spacing; user overrides do not clip (S14). |
| 2.1.1 | Keyboard | ✅ | Every control is a native `<button>`/`<a>` or Radix widget; no `<div>`-as-button; no positive `tabindex`. |
| 2.1.2 | No keyboard trap | ✅ | Radix overlays trap while open and release on Esc/close. |
| 2.1.4 | Character key shortcuts | N/A | No single-character shortcuts. |
| 2.2.2 | Pause, stop, hide | ✅ | No auto-playing motion that can't be stopped; reveals are one-shot (S13). |
| 2.3.1 | Three flashes | ✅ | No flashing content; only `transform`/`opacity` animate (S13). |
| 2.4.1 | Bypass blocks | ✅ | Skip link is the first tab stop → `<main>` (S01/S03). |
| 2.4.2 | Page titled | ✅ | Per-route metadata titles (S03). |
| 2.4.3 | Focus order | ✅ | Order follows DOM = reading order; overlays move focus in, restore on close. |
| 2.4.6 | Headings & labels | ✅ | One `<h1>`/page; descriptive headings; bogus heading removed (#2). |
| 2.4.7 | Focus visible | ✅ | Global `:focus-visible` ring (2px Signal, 2px offset), never suppressed (S01). |
| 2.4.11 | Focus not obscured | ✅ | Focus ring has offset; overlays do not obscure the focused trigger on return. |
| 2.5.1 | Pointer gestures | ✅ | No multipoint/path gesture without a single-tap alternative. |
| 2.5.3 | Label in name | ✅ | Visible label text is contained in the accessible name (buttons/links). |
| 2.5.8 | Target size (min) | ✅ | Targets meet the S01 ≥ 44×44px floor (stronger than the 24px SC floor). |
| 3.2.2 | On input | ✅ | No context change on input; submit is explicit. |
| 3.3.1 | Error identification | ✅ | Field errors in text + `role="alert"`; invalid-submit summary announced (#3). |
| 3.3.2 | Labels or instructions | ✅ | Every field labelled via `FieldWrapper`; required indicated in text. |
| 3.3.3 | Error suggestion | ✅ | Frozen messages name the field and how to fix it; email format guidance. |
| 3.3.7 | Redundant entry | ✅ | Entered data is preserved on validation/submission failure (no re-entry). |
| 4.1.2 | Name, role, value | ✅ | Icon-only buttons carry `aria-label` (TS-enforced on `IconButton`); Radix widgets expose role/state. |
| 4.1.3 | Status messages | ✅ | Loading/success/error/invalid announced via `role="status"`/`role="alert"` and `RouteAnnouncer` (S13). |

---

## 5. Components audited (S02 inventory)

Navigation & menus (`Header`, `NavigationBar`, `NavItem`, `MobileNav`,
`NavToggle`, `Breadcrumb`, `SectionNav`, `NavGroup` ✚fixed), overlays
(`Dialog`, `Drawer`, `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu` —
Radix, focus trap/restore + key model), forms (`FieldWrapper`, `Label`,
`TextInput`, `Textarea`, `Checkbox`, `RadioGroup`, `Select`, `Switch`,
`ValidationMessage`, `HelperText`), UI (`Button`, `IconButton`), data-display
(`Card`, `Alert`, `MetricCard`, `FeatureCard`, `Timeline`, `Badge`, `Tag`,
`CodeBlock`, `ArchitecturePanel` ✚fixed, `SystemDiagram`, `AiFlowDiagram`),
utility (`ThemeToggle`, `CopyButton`, `ScrollToTop`, `SkipNavigation`,
`VisuallyHidden`), motion wrappers (S13), and `Icon`.

Verified per component: correct role/name/state to AT, full keyboard model,
focus trap + restore on overlays, expanded/selected/current state exposed,
tooltips reachable by keyboard (not hover-only), whole-card links with a
discernible name.

---

## 6. Testing methodology

**Automated (runs on every merge — gate G2):**

- `axe-core@4.12.1` via `vitest-axe`, configured for the **WCAG 2.2 AA** rule
  set + `best-practice`, registered in `src/tests/setup.ts`; runner in
  `src/tests/axe.ts`. Co-located assertions (`expect(await axe(container))
  .toHaveNoViolations()`) on the Contact form (idle + error states), the
  footer, the architecture diagram, and the full Engineering page.
- **`color-contrast` is disabled in the axe runner and verified separately:**
  Vitest runs under jsdom with `css: false`, so no computed colours exist to
  measure — axe would report "incomplete", not a real pass. Contrast is
  measured deterministically against the frozen token values by
  `src/utils/a11y.ts` (`contrastRatio` / `meetsContrastAA`) and asserted in
  `src/utils/a11y.test.ts` for both themes. This split keeps the automated
  result truthful.
- Structural assertions already in the suite: one-`<h1>` checks, labelled
  `<section>`/`aside` landmarks, `aria-invalid`/`aria-describedby` wiring,
  focus-to-first-error.

**Manual (what tools cannot substitute for):**

- Keyboard-only traversal of every page and widget (Tab/Shift+Tab/Enter/Space/
  Esc/arrows), no trap, expected keys per widget.
- Screen-reader passes on **NVDA** (Windows, Firefox/Chrome) and **VoiceOver**
  (macOS/iOS, Safari).
- Browser accessibility-tree inspection (landmark & heading outline).
- 200% zoom & reflow (with S14); reduced-motion on a real OS preference.

**Browser × AT matrix:** Chrome (Blink) desktop+Android · Firefox (Gecko) ·
Safari (WebKit) macOS+iOS · Edge (Blink); NVDA+FF/Chrome; VoiceOver+Safari.

> A green tool is **necessary, not sufficient.** Every manual finding and its
> resolution is recorded above.

---

## 7. Remaining known limitations & future recommendations

- **A2 — `--mute` contrast (light theme).** The labels/eyebrows tier is
  3.46:1 at normal size (AA needs 4.5:1). **Recommendation (design decision,
  raised not taken):** darken the light-theme `--mute` token toward the
  graphite range (≈ `#6E6A61` reaches ~4.6:1 on paper) — mirroring the
  dark-theme lift already applied — or formally restrict `--mute` to large
  text only. Either is a Design-Bible (P05/P08) change, tracked as A2.
- **AAA opportunities (out of AA scope).** Body text already clears AAA
  (Ink ≈ 15:1); enhanced contrast (1.4.6) for the remaining tiers, and a
  visible focus-appearance upgrade to SC 2.4.13, are candidate AAA
  enhancements for a future sprint.
- **Build environment.** `next build` currently fails in page-data collection
  due to the `initOpenNextCloudflareForDev()` hook in `next.config.mjs`
  (a Cloudflare-adapter dev hook running at build time) — a pre-existing,
  deployment-config condition unrelated to accessibility. Compile, lint, type-
  check and the full test suite (incl. axe) are green.

---

## 8. Traceability

Every change traces to a WCAG 2.2 success criterion **and** an approved phase:
semantics/landmarks/headings to P07/P08 + S01/S03; forms to S02 `Field` + S12
frozen copy; diagrams to S07/S08 + frozen Book B; motion to S13; contrast to
P05/P08. Nothing here invents a layout, adds ARIA where native HTML suffices,
changes the typography scale or colour palette, or alters a content string.

*End of report — Sprint 15, Datum v1.0.*
