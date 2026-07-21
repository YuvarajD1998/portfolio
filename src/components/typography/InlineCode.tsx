import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

/**
 * InlineCode — a monospace token inside running text (Bible §04).
 *
 * Purpose:      Render an inline code span — a prop name, path or literal —
 *               with a subtle sunken chip so it reads as code within a sentence.
 * Public API:   standard `<code>` props.
 * Props:        `className`, children; ≤ 7 total.
 * Variants:     None — one inline treatment.
 * States:       Static; no interactive states.
 * A11y:         Renders a real `<code>` element; announced as code by AT.
 * Responsive:   Inherits the surrounding text size (0.9em of body).
 * Composition:  Inline only; use Code for multi-line blocks, CodeBlock for a
 *               titled, copyable panel.
 */
export function InlineCode({
  className,
  ...rest
}: ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      className={cn(
        'bg-sunken text-ink rounded-sm px-1.5 py-0.5 font-mono text-[0.9em]',
        className,
      )}
      {...rest}
    />
  );
}
