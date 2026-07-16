import { type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Heading — display/section headings on the closed type scale (Bible §04).
 *
 * Purpose:      Render headings in Newsreader at a scale step, decoupling the
 *               semantic level (`as`) from the visual size (`size`).
 * Public API:   `size`, `as`, standard element props.
 * Props:        `size`, `as`; ≤ 7 total.
 * Variants:     size — display | h1 | h2 | h3 (every step maps to a scale row).
 * States:       Static text; no interactive states.
 * A11y:         `as` sets the real heading level; keep one h1 per page and a
 *               logical order (Bible §11). Size never dictates level.
 * Responsive:   `display` uses a fluid clamp; the rest are fixed steps.
 * Composition:  Pairs with Text for body; never bold Newsreader (Bible §04).
 */
export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3';

interface HeadingOwnProps {
  size?: HeadingSize;
}

const SIZE: Record<HeadingSize, string> = {
  display:
    'font-display text-display font-normal leading-[1.03] tracking-[-0.015em]',
  h1: 'font-display text-h1 font-normal leading-[1.08] tracking-[-0.01em]',
  h2: 'font-display text-h2 font-normal leading-[1.1] tracking-[-0.01em]',
  h3: 'font-sans text-h3 font-semibold leading-[1.25]',
};

export function Heading<E extends ElementType = 'h2'>({
  as,
  size = 'h2',
  className,
  ...rest
}: PolymorphicProps<E, HeadingOwnProps>) {
  const Component = (as ?? 'h2') as ElementType;
  return (
    <Component
      className={cn('text-ink text-balance', SIZE[size], className)}
      {...rest}
    />
  );
}
