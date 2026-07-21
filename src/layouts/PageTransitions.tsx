'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { pageTransition, reducedMotion } from '@/lib/motion/presets';

/**
 * PageTransitions — the route-level cross-fade wired into the shell (Sprint 13 §05).
 *
 * Purpose:      Plays the approved page transition ("confirms you moved", 200ms,
 *               P09 §06) as the reader moves between the nine primary pages. It
 *               keys a `motion.div` on the App Router pathname so each route's
 *               content enters with the shared `pageTransition` preset and the
 *               outgoing content exits via `AnimatePresence`.
 * Public API:   `children` — the route content rendered inside `<main>`.
 * A11y:         Under `prefers-reduced-motion` the transition collapses to an
 *               instant opacity swap (`reducedMotion`) — never movement.
 * Performance:  Animates transform + opacity only. Navigation is NEVER gated on
 *               the animation: the default (non-"wait") AnimatePresence mounts
 *               the incoming route immediately and the transition plays over the
 *               top, so a click is never slower than a plain link (§05 RULE).
 * Composition:  Wraps the children inside AppShell's `<main>` landmark.
 *
 * Content presence: the route content is always rendered in the DOM; motion only
 * changes how it appears over time — crawlers and AT always see the content (§04).
 */
export function PageTransitions({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        variants={reduced ? reducedMotion : pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
