import { type ElementType } from 'react';

import { Text, type TextTone } from '@/components/typography/Text';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Label — the mono, uppercase, tracked kicker (Bible §04 spec-sheet label).
 *
 * Purpose:      Render the small IBM Plex Mono kicker that tags a section — the
 *               "01 · OBJECTIVE" spec-sheet voice, not a form control label.
 * Public API:   `tone`, `as`, standard element props.
 * Props:        `tone`, `as`; ≤ 7 total.
 * Variants:     tone — mute (default) | graphite | ink | signal.
 * States:       Static text; no interactive states.
 * A11y:         A visual kicker rendered as `span`. For a form field label use
 *               forms/Label (a real `<label>`) — never this.
 * Responsive:   Fixed mono label step; tracking holds at every size.
 * Composition:  Sits above a Heading as an eyebrow; pairs with Divider rules.
 */
interface LabelOwnProps {
  tone?: TextTone;
}

export function Label<E extends ElementType = 'span'>({
  as,
  tone = 'mute',
  ...rest
}: PolymorphicProps<E, LabelOwnProps>) {
  return (
    <Text
      as={(as ?? 'span') as ElementType}
      variant="label"
      tone={tone}
      {...rest}
    />
  );
}
