import { type CSSProperties } from 'react';

import { cn } from '@/lib/cn';

/**
 * Skeleton — a content placeholder while data loads (Bible §13, Sprint 02 §08).
 *
 * Purpose:      Reserve the shape of not-yet-loaded content with a low-contrast
 *               shimmer, so layout does not jump when data arrives.
 * Public API:   `variant`, `width`, `height`, `className`.
 * Props:        `variant`, `width`, `height`; ≤ 7 total.
 * Variants:     variant — text (a line, rounded, 1em tall) | rect (a block) |
 *               circle (an avatar/media placeholder).
 * States:       Perpetual pulse; frozen under reduced-motion (global query).
 * A11y:         `aria-hidden` — a placeholder carries no meaning; the busy state
 *               is announced by the surrounding LoadingState/region, not here.
 * Responsive:   Fills its box; width/height accept token or fluid values.
 * Composition:  Compose several to mock a card/list while loading.
 */
type SkeletonVariant = 'text' | 'rect' | 'circle';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const VARIANT: Record<SkeletonVariant, string> = {
  text: 'h-[1em] w-full rounded-sm',
  rect: 'w-full rounded-sm',
  circle: 'rounded-full aspect-square',
};

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
}: SkeletonProps) {
  const style: CSSProperties = { width, height };
  return (
    <span
      aria-hidden
      style={style}
      className={cn(
        'bg-sunken block motion-safe:animate-pulse',
        VARIANT[variant],
        className,
      )}
    />
  );
}
