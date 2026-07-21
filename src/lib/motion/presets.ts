import { type Variants } from 'motion/react';

import { duration, easing, staggerStep } from '@/theme/tokens';

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

/**
 * 12px rise + fade — the section-reveal signature (Bible §10).
 * 400ms "directs first read", confirmed in P09 §06.
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease },
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
    transition: { staggerChildren: staggerStep, delayChildren: staggerStep },
  },
};

/**
 * Page cross-fade with a slight rise (Bible §10) — "confirms you moved".
 * 200ms enter / faster exit, confirmed in P09 §06. Never gates navigation:
 * the route mounts immediately and this plays over the top (§05 RULE).
 */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.page, ease },
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
 * Homepage hero: the thesis rises word-by-word (P03 §00 motion), the datum
 * line draws underneath. Kept here — not inline in Hero — so the hero uses the
 * shared tokens and easing, never hard-coded numbers (§02/§03 RULE).
 */
export const heroWordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: duration.entrance },
  },
};

export const heroWord: Variants = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: {
    opacity: 1,
    y: '0em',
    transition: { duration: duration.reveal, ease },
  },
};

/** Decorative datum line that draws on load (scaleY 0 → 1). */
export const heroDatumLine: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: duration.entrance, ease },
  },
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
  heroWordContainer,
  heroWord,
  heroDatumLine,
  reducedMotion,
} as const;

export type MotionPreset = keyof typeof motionPresets;
