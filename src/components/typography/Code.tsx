import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

/**
 * Code — a multi-line preformatted code block (Bible §04).
 *
 * Purpose:      Render raw, monospace, preformatted text on a surface panel —
 *               the low-level `<pre><code>` block. For a titled, copyable panel
 *               with a language chip, use data-display/CodeBlock.
 * Public API:   standard `<pre>` props.
 * Props:        `className`, children; ≤ 7 total.
 * Variants:     None — one block treatment.
 * States:       Static; no interactive states.
 * A11y:         Real `<pre><code>`; horizontal scroll keeps long lines reachable
 *               by keyboard rather than clipping them.
 * Responsive:   Scrolls on the x-axis; never forces the page wider.
 * Composition:  Wraps children in `<code>`; CodeBlock composes this with a
 *               header + CopyButton.
 */
export function Code({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre
      className={cn(
        'bg-surface border-hairline text-ink text-code overflow-x-auto rounded-sm border p-4 font-mono leading-[1.6]',
        className,
      )}
      {...rest}
    >
      <code>{children}</code>
    </pre>
  );
}
