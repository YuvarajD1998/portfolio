import { type ElementType } from 'react';

import { GAP, type SpaceStep } from '@/components/primitives/Stack';
import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Flex — a thin, explicit flexbox row/column primitive (Bible §05).
 *
 * Purpose:      Flexible one-dimensional layout with full control over justify
 *               and align, without hand-writing flex utilities inline.
 * Public API:   `direction`, `justify`, `align`, `wrap`, `gap`, `as`.
 * Props:        7 layout props; data not styling.
 * Variants:     direction, justify, align, wrap enumerated as unions.
 * States:       Structural; no interactive states.
 * A11y:         Transparent; no roles.
 * Responsive:   Size-agnostic; wrap enables graceful reflow.
 * Composition:  For toolbars/rows; use Stack for simple one-axis spacing.
 */
interface FlexOwnProps {
  direction?: 'row' | 'column';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  wrap?: boolean;
  gap?: SpaceStep;
}

const JUSTIFY = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
} as const;

const ALIGN = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

export function Flex<E extends ElementType = 'div'>({
  as,
  direction = 'row',
  justify = 'start',
  align = 'center',
  wrap = false,
  gap = 4,
  className,
  ...rest
}: PolymorphicProps<E, FlexOwnProps>) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      className={cn(
        'flex',
        direction === 'column' ? 'flex-col' : 'flex-row',
        JUSTIFY[justify],
        ALIGN[align],
        wrap && 'flex-wrap',
        GAP[gap],
        className,
      )}
      {...rest}
    />
  );
}
