import { type ElementType } from 'react';

import { Text, type TextTone } from '@/components/typography/Text';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Caption — small print for figures, footnotes and meta (Bible §04).
 *
 * Purpose:      Render the 13px small-text step for captions and secondary meta
 *               — a named preset of Text so intent reads at the call site.
 * Public API:   `tone`, `as`, standard element props.
 * Props:        `tone`, `as`; ≤ 7 total.
 * Variants:     tone — mute (default) | graphite | ink | signal.
 * States:       Static text; no interactive states.
 * A11y:         Defaults to `figcaption`; captioning an image? Wrap in `figure`.
 * Responsive:   Fixed small step; never below the readable floor.
 * Composition:  Sits under media/tables; pairs with Text for body copy.
 */
interface CaptionOwnProps {
  tone?: TextTone;
}

export function Caption<E extends ElementType = 'figcaption'>({
  as,
  tone = 'mute',
  ...rest
}: PolymorphicProps<E, CaptionOwnProps>) {
  return (
    <Text
      as={(as ?? 'figcaption') as ElementType}
      variant="small"
      tone={tone}
      {...rest}
    />
  );
}
