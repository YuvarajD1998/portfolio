import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

/**
 * Global test setup (Sprint 01 §11).
 *
 * - jest-dom matchers for readable assertions.
 * - Unmount React trees between tests.
 * - matchMedia is stubbed because jsdom omits it; theme + reduced-motion
 *   code reads it, so tests would otherwise throw.
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
