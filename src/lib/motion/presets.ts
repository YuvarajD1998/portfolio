import { type Variants } from 'motion/react';

import { duration, easing } from '@/theme/tokens';

/**
 * Reusable motion presets (Sprint 01 §08, Blueprint §12, Bible §10).
 *
 * Motion routes through these presets — an ad-hoc animation in a component is
 * a review reject. Every preset animates only `transform` and `opacity`
 * (60fps, no layout thrash) and shares the single easing curve and the
 * duration tokens. Reduced-motion is honoured by the primitives that consume
 * these (they swap to `reducedMotion`), so meaning never rides on motion alone.
 *
 * No page uses these yet — Sprint 01 introduces the vocabulary only.
 */

const ease = [...easing] as [number, number, number, number];

/** Fade in on enter. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.standard, ease },
  },
};

/** 12px rise + fade — the section-reveal signature (Bible §10). */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.entrance, ease },
  },
};

/** Subtle scale + fade, for cards/media entrances. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.standard, ease },
  },
};

/** On-enter reveal alias — the canonical single-element entrance. */
export const reveal = slideUp;

/**
 * Stagger container — steps children 40–60ms down a section (Bible §10).
 * Pair with `slideUp`/`fade` on each child.
 */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

/** Page cross-fade with a slight rise (Bible §10). */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.standard, ease },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.micro, ease },
  },
};

/** Hover nudge — 1–2px, fast (Bible §10). */
export const hoverNudge: Variants = {
  rest: { y: 0 },
  hover: { y: -2, transition: { duration: duration.instant, ease } },
};

/**
 * Reduced-motion replacement: identical opacity change, zero movement.
 * Primitives swap to this when `useReducedMotion()` is true.
 */
export const reducedMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.instant } },
};

export const motionPresets = {
  fade,
  slideUp,
  scaleIn,
  reveal,
  stagger,
  pageTransition,
  hoverNudge,
  reducedMotion,
} as const;

export type MotionPreset = keyof typeof motionPresets;
