import { type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Stack — vertical (or horizontal) flow with token-scale gaps (Bible §06).
 *
 * Purpose:      Lay out children in one direction with a spacing-scale gap, so
 *               vertical rhythm is never a magic number.
 * Public API:   `gap`, `direction`, `align`, `as`, standard element props.
 * Props:        `gap` (scale step), `direction`, `align`; ≤ 7 total.
 * Variants:     direction — column (default) | row; align — start/center/end/stretch.
 * States:       Structural; no interactive states.
 * A11y:         Transparent wrapper; no roles added.
 * Responsive:   Size-agnostic; gap is fixed, layout inherited from container.
 * Composition:  General-purpose; prefer over ad-hoc margin utilities.
 */
export type SpaceStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

interface StackOwnProps {
  gap?: SpaceStep;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
}

/** Map a scale step to its `gap` utility (values from the spacing token set). */
export const GAP: Record<SpaceStep, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
  24: 'gap-24',
};

const ALIGN = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const;

export function Stack<E extends ElementType = 'div'>({
  as,
  gap = 4,
  direction = 'column',
  align = 'stretch',
  className,
  ...rest
}: PolymorphicProps<E, StackOwnProps>) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      className={cn(
        'flex',
        direction === 'column' ? 'flex-col' : 'flex-row',
        GAP[gap],
        ALIGN[align],
        className,
      )}
      {...rest}
    />
  );
}
