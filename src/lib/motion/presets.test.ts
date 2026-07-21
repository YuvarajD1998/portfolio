import { describe, expect, it } from 'vitest';

import { duration, easing, staggerStep } from '@/theme/tokens';

import { motionPresets } from './presets';

/**
 * Motion preset & token tests (Sprint 13 §03, §04, §13).
 *
 * The presets are the one place motion values live. These tests enforce the
 * two non-negotiables:
 *
 *  1. Performance (§13) — every preset animates ONLY `transform`-class props
 *     (x/y/scale/scaleX/scaleY/rotate) and `opacity`. A layout property
 *     (top/left/width/height/margin/padding) in a preset is a review reject.
 *  2. Tokenisation (§03) — every duration used by a preset is one of the
 *     centralized `duration` tokens; no literal number leaks in.
 */

// The only visual props a token-safe preset may touch (transform + opacity).
const ALLOWED_PROPS = new Set([
  'opacity',
  'x',
  'y',
  'z',
  'scale',
  'scaleX',
  'scaleY',
  'rotate',
  'rotateX',
  'rotateY',
  'transformOrigin',
  // orchestration-only keys (not animatable visual props)
  'transition',
  'staggerChildren',
  'delayChildren',
]);

const TOKEN_DURATIONS = new Set<number>(Object.values(duration));

function collectAnimatedProps(variantSet: unknown): string[] {
  const props: string[] = [];
  if (!variantSet || typeof variantSet !== 'object') return props;
  for (const state of Object.values(variantSet as Record<string, unknown>)) {
    if (!state || typeof state !== 'object') continue;
    for (const key of Object.keys(state as Record<string, unknown>)) {
      props.push(key);
    }
  }
  return props;
}

function collectDurations(variantSet: unknown): number[] {
  const durations: number[] = [];
  if (!variantSet || typeof variantSet !== 'object') return durations;
  for (const state of Object.values(variantSet as Record<string, unknown>)) {
    if (!state || typeof state !== 'object') continue;
    const transition = (state as { transition?: { duration?: number } })
      .transition;
    if (transition && typeof transition.duration === 'number') {
      durations.push(transition.duration);
    }
  }
  return durations;
}

describe('motion presets — performance invariant (§13)', () => {
  it.each(Object.entries(motionPresets))(
    '%s animates only transform / opacity',
    (_name, preset) => {
      for (const prop of collectAnimatedProps(preset)) {
        expect(ALLOWED_PROPS.has(prop)).toBe(true);
      }
    },
  );
});

describe('motion presets — tokenisation (§03)', () => {
  it.each(Object.entries(motionPresets))(
    '%s uses only centralized duration tokens',
    (_name, preset) => {
      for (const value of collectDurations(preset)) {
        expect(TOKEN_DURATIONS.has(value)).toBe(true);
      }
    },
  );
});

describe('motion tokens — lockstep & shape (§03)', () => {
  it('exposes the P09-confirmed page + reveal timings', () => {
    // "confirms you moved" / "directs first read" (P09 §06).
    expect(duration.page).toBe(0.2);
    expect(duration.reveal).toBe(0.4);
  });

  it('easing is the single 4-point cubic-bezier curve (Bible §10)', () => {
    expect(easing).toHaveLength(4);
    for (const n of easing) expect(typeof n).toBe('number');
  });

  it('the stagger step is centralized, not a magic number', () => {
    expect(typeof staggerStep).toBe('number');
    expect(staggerStep).toBeGreaterThan(0);
  });
});
