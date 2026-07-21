import { type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * MaxWidth — a constrained, centred max-width box (Bible §05).
 *
 * Purpose:      Cap content width to a named measure and centre it, without the
 *               responsive side padding a Container carries — the low-level
 *               width primitive Container itself is a preset of.
 * Public API:   `size`, `center`, `as`, standard element props.
 * Props:        `size`, `center`; ≤ 7 total.
 * Variants:     size — measure (680px reading width) | page (1200px) | prose
 *               (a touch wider than measure) | full (no cap).
 * States:       Structural; no interactive states.
 * A11y:         Transparent wrapper; renders semantic `as` (default div).
 * Responsive:   Width caps hold; below the cap the box is fluid (100%).
 * Composition:  Sits inside padded regions (PageWrapper/Section); Container is
 *               the padded page preset built on this.
 */
export type MaxWidthSize = 'measure' | 'prose' | 'page' | 'full';

interface MaxWidthOwnProps {
  size?: MaxWidthSize;
  /** Centre the box horizontally. Default true. */
  center?: boolean;
}

const SIZE: Record<MaxWidthSize, string> = {
  measure: 'max-w-[var(--measure)]',
  prose: 'max-w-[calc(var(--measure)+var(--space-16))]',
  page: 'max-w-[var(--container)]',
  full: 'max-w-none',
};

export function MaxWidth<E extends ElementType = 'div'>({
  as,
  size = 'measure',
  center = true,
  className,
  ...rest
}: PolymorphicProps<E, MaxWidthOwnProps>) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      className={cn('w-full', center && 'mx-auto', SIZE[size], className)}
      {...rest}
    />
  );
}
