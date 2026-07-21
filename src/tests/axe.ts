import { configureAxe } from 'vitest-axe';

/**
 * Shared axe-core runner for the automated accessibility gate (Sprint 15 §14,
 * Playbook gate G2 — zero axe violations).
 *
 * Co-located component/page tests call `await axe(container)` and assert
 * `expect(results).toHaveNoViolations()`. A structural WCAG regression
 * (missing label, bad ARIA relationship, non-unique landmark, invalid role,
 * skipped heading level, list markup, …) then fails the suite on every merge.
 *
 * Scope & honesty (§14 "a green tool is necessary, not sufficient"):
 *
 * - Rule set is pinned to the **WCAG 2.2 AA** tags so the gate matches the
 *   sprint's conformance target (A3), plus axe's `best-practice` tag for the
 *   landmark/heading hygiene the audits (§02–§03) fixed.
 * - `color-contrast` is **disabled here** and verified separately: Vitest runs
 *   under jsdom with `css: false`, so no computed colours exist to measure —
 *   axe would silently report "incomplete", not a real pass. Contrast is
 *   measured deterministically against the token values by
 *   `src/utils/a11y.ts` (`contrastRatio`/`meetsContrastAA`) and recorded in the
 *   Accessibility Compliance Report (docs/accessibility-compliance-report.md,
 *   §08). This split keeps the automated result truthful.
 */
export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
  },
  rules: {
    // Not measurable under jsdom (`css: false`) — covered by the token-level
    // contrast tests in `src/utils/a11y.test.ts` and the compliance report.
    'color-contrast': { enabled: false },
  },
});
