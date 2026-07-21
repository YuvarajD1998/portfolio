import { type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * PageWrapper — the outermost vertical frame for a page's content (Bible §06).
 *
 * Purpose:      Give a route a full-height flex column so sticky headers and
 *               bottom-anchored footers sit correctly and the main region grows
 *               to fill. The structural root a page composes into.
 * Public API:   `as`, standard element props.
 * Props:        `as`; ≤ 7 total.
 * Variants:     None — one structural behaviour.
 * States:       Structural; no interactive states.
 * A11y:         Transparent; landmarks (header/main/footer) are the caller's.
 * Responsive:   Min-height tracks the dynamic viewport (`dvh`) so mobile chrome
 *               never clips the footer.
 * Composition:  Wraps header + main + footer regions; ContentWrapper caps the
 *               reading measure inside main.
 */
export function PageWrapper<E extends ElementType = 'div'>({
  as,
  className,
  ...rest
}: PolymorphicProps<E, object>) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component className={cn('flex min-h-dvh flex-col', className)} {...rest} />
  );
}
