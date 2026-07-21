import { type ElementType } from 'react';

import { Heading } from '@/components/typography/Heading';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Display — the largest editorial headline on the type scale (Bible §04).
 *
 * Purpose:      Render the fluid display headline (clamp 44–72px) used for hero
 *               and chapter openers — a named preset of Heading so the display
 *               step has a first-class component, not a size string on call.
 * Public API:   `as`, standard element props.
 * Props:        `as`; ≤ 7 total.
 * Variants:     None — one visual step (`display`); level set by `as`.
 * States:       Static text; no interactive states.
 * A11y:         Defaults to `h1`; keep one per page and a logical order.
 * Responsive:   Fluid clamp scales with the viewport (Bible §04).
 * Composition:  Pairs with Subheading/Text beneath; never bold Newsreader.
 */
export function Display<E extends ElementType = 'h1'>({
  as,
  ...rest
}: PolymorphicProps<E, object>) {
  return <Heading as={(as ?? 'h1') as ElementType} size="display" {...rest} />;
}
