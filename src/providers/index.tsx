'use client';

import { type ReactNode } from 'react';

import { ThemeProvider } from '@/providers/theme-provider';

/**
 * Providers — the single app-level context composition (Sprint 01 §06).
 *
 * All global providers mount here in one place, so the root layout wires a
 * single boundary. Sprint 01 ships the theme provider; a motion/analytics
 * provider is added here (not in the layout) when a later sprint needs it.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
