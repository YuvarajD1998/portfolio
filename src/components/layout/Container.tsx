import { type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Container — the centered max-width wrapper (Bible §05).
 *
 * Purpose:      Hold page content within the 1200px container (or 680px reading
 *               measure) and centre it, with responsive side margins.
 * Public API:   `width`, `as`, standard element props.
 * Props:        `width` ('page' | 'measure'), ≤ 7 total.
 * Variants:     width — page (1200px) | measure (680px reading width).
 * States:       Structural; no interactive states.
 * A11y:         None inherent; renders semantic `as` (default div).
 * Responsive:   Margins grow with the viewport; width caps hold (Bible §05).
 * Composition:  Wraps Section/Stack/etc.; never nests inside another Container.
 */
export type ContainerWidth = 'page' | 'measure';

interface ContainerOwnProps {
  width?: ContainerWidth;
}

const WIDTH: Record<ContainerWidth, string> = {
  page: 'max-w-[var(--container)]',
  measure: 'max-w-[var(--measure)]',
};

export function Container<E extends ElementType = 'div'>({
  as,
  width = 'page',
  className,
  ...rest
}: PolymorphicProps<E, ContainerOwnProps>) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      className={cn(
        'mx-auto w-full px-6 md:px-10 lg:px-16',
        WIDTH[width],
        className,
      )}
      {...rest}
    />
  );
}
