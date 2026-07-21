import { type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Quote — a block quotation in the editorial voice (Bible §04, §07).
 *
 * Purpose:      Set an extended quotation apart with a Signal datum rule, larger
 *               Newsreader italic, and an optional attribution line.
 * Public API:   `cite`, `attribution`, `className`, children.
 * Props:        `cite`, `attribution`; ≤ 7 total.
 * Variants:     None — one editorial treatment (see data-display/QuoteBlock for
 *               a card-framed pull-quote).
 * States:       Static; no interactive states.
 * A11y:         Real `<blockquote>`; `cite` maps to the element's cite URL, and
 *               attribution renders in a `<footer><cite>` so AT reads the source.
 * Responsive:   Scales with its container; caps to the reading measure.
 * Composition:  Inline in prose; attribution is optional.
 */
interface QuoteProps {
  /** Source URL for the quotation (maps to the `cite` attribute). */
  cite?: string;
  /** Visible attribution line, e.g. "— Name, Role". */
  attribution?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Quote({ cite, attribution, className, children }: QuoteProps) {
  return (
    <blockquote
      cite={cite}
      className={cn('border-signal border-l-2 pl-6', className)}
    >
      <p className="font-display text-h3 text-ink leading-[1.4] text-balance italic">
        {children}
      </p>
      {attribution ? (
        <footer className="mt-3">
          <cite className="text-mute text-small font-sans not-italic">
            {attribution}
          </cite>
        </footer>
      ) : null}
    </blockquote>
  );
}
