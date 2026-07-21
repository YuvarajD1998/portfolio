import * as RadixVisuallyHidden from '@radix-ui/react-visually-hidden';
import { type ComponentPropsWithoutRef } from 'react';

/**
 * VisuallyHidden — hide from sight, keep for screen readers (Bible §11, §09).
 *
 * Purpose:      Render text/content that is available to assistive tech but not
 *               visible — accessible names, live-region text, off-screen labels.
 * Public API:   Radix VisuallyHidden props (`asChild`, children).
 * Props:        passthrough; ≤ 7 total.
 * Variants:     None.
 * States:       Static.
 * A11y:         Uses the robust Radix clip technique (not `display:none`, which
 *               would remove it from the a11y tree). The counterpart to the
 *               `.sr-only` utility, as a component.
 * Responsive:   N/A — never visible.
 * Composition:  Wrap the text an icon-only control needs, or a heading a modal
 *               requires but should not show.
 */
export function VisuallyHidden(
  props: ComponentPropsWithoutRef<typeof RadixVisuallyHidden.Root>,
) {
  return <RadixVisuallyHidden.Root {...props} />;
}
