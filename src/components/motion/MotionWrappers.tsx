'use client';

import { motion, type Variants } from 'motion/react';
import { type ReactNode } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  fade,
  hoverNudge,
  pageTransition,
  reducedMotion,
  scaleIn,
  slideUp,
  stagger,
} from '@/lib/motion/presets';
import { duration } from '@/theme/tokens';

/**
 * Motion wrappers — reusable entrance/interaction animations (Sprint 02 §09).
 *
 * Purpose:      Wrap the Sprint 01 motion presets in drop-in components so a
 *               page animates by composition, never by hand-rolling an
 *               animation (a review reject, Bible §10).
 * Public API:   Fade · Slide · Scale · Reveal · Stagger · Hover · Press ·
 *               PageTransition — each takes `children` + optional `as`/`className`.
 * Props:        `children`, `className`, `delay` where meaningful; ≤ 7.
 * Variants:     Each wrapper is a named entrance/interaction.
 * States:       hidden → visible on enter (in-view); hover/press on interaction.
 * A11y:         EVERY wrapper swaps to `reducedMotion` (instant opacity, zero
 *               movement) when `prefers-reduced-motion` is set — meaning never
 *               rides on motion (Bible §10/§11).
 * Responsive:   Size-agnostic; animates transform + opacity only (60fps).
 * Composition:  Wrap Stagger around a group and Slide/Fade around each child.
 */

interface EntranceProps {
  children: ReactNode;
  className?: string;
  /** Delay the entrance (seconds). */
  delay?: number;
  /** Animate once when scrolled into view (default) vs immediately. */
  once?: boolean;
}

/** Choose the real preset, or the reduced-motion stand-in. */
function useVariants(preset: Variants): Variants {
  const reduced = useReducedMotion();
  return reduced ? reducedMotion : preset;
}

function Entrance({
  preset,
  children,
  className,
  delay,
  once = true,
}: EntranceProps & { preset: Variants }) {
  const variants = useVariants(preset);
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function Fade(props: EntranceProps) {
  return <Entrance preset={fade} {...props} />;
}

export function Slide(props: EntranceProps) {
  return <Entrance preset={slideUp} {...props} />;
}

export function Scale(props: EntranceProps) {
  return <Entrance preset={scaleIn} {...props} />;
}

/** Reveal — the canonical section entrance (alias of Slide). */
export function Reveal(props: EntranceProps) {
  return <Entrance preset={slideUp} {...props} />;
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
}

/**
 * Stagger — steps its children in sequence. Pair with StaggerItem (or Fade/
 * Slide set to inherit) on each child.
 */
export function Stagger({ children, className, once = true }: StaggerProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? reducedMotion : stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

/** A single stepped child inside <Stagger>. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const variants = useVariants(slideUp);
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

interface InteractionProps {
  children: ReactNode;
  className?: string;
}

/** Hover — a small lift on hover (skipped under reduced motion). */
export function Hover({ children, className }: InteractionProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover={reduced ? undefined : 'hover'}
      variants={hoverNudge}
    >
      {children}
    </motion.div>
  );
}

/** Press — a subtle scale-down on tap/click (skipped under reduced motion). */
export function Press({ children, className }: InteractionProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ duration: duration.instant }}
    >
      {children}
    </motion.div>
  );
}

/** PageTransition — cross-fade + slight rise for route content. */
export function PageTransition({ children, className }: InteractionProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? reducedMotion : pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
