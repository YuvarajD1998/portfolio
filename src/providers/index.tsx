'use client';

import { MotionConfig } from 'motion/react';
import { type ReactNode } from 'react';

import { ToastProvider } from '@/components/feedback';
import { ThemeProvider } from '@/providers/theme-provider';

/**
 * Providers — the single app-level context composition (Sprint 03 §03).
 *
 * All global providers mount here in one place, so the root layout wires a
 * single boundary. Theme owns light/dark app-wide; the ToastProvider makes the
 * `useToast()` notification surface available to every route.
 *
 * `MotionConfig reducedMotion="user"` (S13 §12) makes the Motion library honour
 * `prefers-reduced-motion` at the framework boundary — a structural backstop so
 * no `motion.*` element can ship movement that ignores the OS setting, on top of
 * the per-primitive `useReducedMotion()` gate.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
