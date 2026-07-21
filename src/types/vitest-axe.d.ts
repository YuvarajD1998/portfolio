/**
 * Type augmentation for the vitest-axe `toHaveNoViolations` matcher registered
 * in `src/tests/setup.ts` (Sprint 15 §14). vitest-axe 0.1.0 does not ship a
 * working ambient declaration, so we declare it against Vitest's `Assertion`
 * interface here — this keeps `expect(results).toHaveNoViolations()` typed in
 * the co-located a11y assertions.
 */
import 'vitest';

declare module 'vitest' {
  interface Assertion {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
