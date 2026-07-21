import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';
// axe-core matcher (`toHaveNoViolations`) for the automated a11y gate G2
// (Sprint 15 §14). Registered explicitly — vitest-axe 0.1.0 ships an empty
// `extend-expect` entry, so we wire the matcher ourselves. Co-located a11y
// assertions call `axe()` from `@/tests/axe` and assert against this matcher,
// so a structural WCAG regression fails the suite on every merge.
import * as axeMatchers from 'vitest-axe/matchers';

expect.extend(axeMatchers);

/**
 * Global test setup (Sprint 01 §11).
 *
 * - jest-dom matchers for readable assertions.
 * - Unmount React trees between tests.
 * - matchMedia is stubbed because jsdom omits it; theme + reduced-motion
 *   code reads it, so tests would otherwise throw.
 * - IntersectionObserver is stubbed because jsdom omits it; the motion
 *   primitives (`whileInView` reveals, S13 §06) construct one on mount, and it
 *   drives `useActiveSection` scroll-spy — tests would otherwise throw. The
 *   stub reports the element as immediately in view so revealed content is
 *   present and assertable (reveals are progressive enhancement — content
 *   exists regardless of the observer, S13 §06).
 */
afterEach(() => {
  cleanup();
});

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

if (typeof window.IntersectionObserver === 'undefined') {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    constructor(private readonly callback: IntersectionObserverCallback) {}
    // Report the target as intersecting immediately, so `whileInView` reveals
    // resolve to their visible state in tests (content is present regardless).
    observe = (target: Element): void => {
      this.callback(
        [{ isIntersecting: true, target } as IntersectionObserverEntry],
        this,
      );
    };
    unobserve = (): void => {};
    disconnect = (): void => {};
    takeRecords = (): IntersectionObserverEntry[] => [];
  }
  window.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}
