import { type ElementType } from 'react';

import { type MaxWidthSize } from '@/components/layout/MaxWidth';
import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * ContentWrapper — the reading column with responsive side gutters (Bible §05).
 *
 * Purpose:      Hold long-form or article content at a comfortable measure with
 *               the same responsive side padding as Container — the "prose"
 *               region a page's body text lives in.
 * Public API:   `width`, `as`, standard element props.
 * Props:        `width`, `as`; ≤ 7 total.
 * Variants:     width — measure (default reading width) | prose | page.
 * States:       Structural; no interactive states.
 * A11y:         Renders `as` (default div); pass `as="article"` for long-form.
 * Responsive:   Side gutters grow with the viewport (6 → 10 → 16 token steps).
 * Composition:  Container centres a full-page shell; ContentWrapper is the
 *               narrower reading column inside it (shares MaxWidth's caps).
 */
interface ContentWrapperOwnProps {
  width?: MaxWidthSize;
}

const WIDTH: Record<MaxWidthSize, string> = {
  measure: 'max-w-[var(--measure)]',
  prose: 'max-w-[calc(var(--measure)+var(--space-16))]',
  page: 'max-w-[var(--container)]',
  full: 'max-w-none',
};

export function ContentWrapper<E extends ElementType = 'div'>({
  as,
  width = 'measure',
  className,
  ...rest
}: PolymorphicProps<E, ContentWrapperOwnProps>) {
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
