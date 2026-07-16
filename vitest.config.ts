import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration — Datum portfolio (Sprint 01 §11).
 *
 * jsdom environment for React Testing Library; coverage via v8. The `@/*`
 * alias mirrors tsconfig so tests import exactly as source does.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Blueprint §16: ≥90% of lib/ ; primitives covered as they land.
      include: ['src/lib/**', 'src/utils/**', 'src/components/**'],
      exclude: ['**/index.ts', '**/*.d.ts', '**/*.test.{ts,tsx}'],
    },
  },
});
