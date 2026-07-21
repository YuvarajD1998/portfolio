import { type ReactNode } from 'react';

import { Avatar } from '@/components/data-display/Avatar';
import { Card } from '@/components/data-display/Card';
import { cn } from '@/lib/cn';

/**
 * QuoteBlock — a carded testimonial / pull-quote (Bible §07, Sprint 02 §07).
 *
 * Purpose:      Present a quotation with attribution inside a card — the
 *               testimonial form, as opposed to typography/Quote's inline prose
 *               blockquote.
 * Public API:   `quote`, `authorName`, `authorRole`, `avatarSrc`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one carded treatment.
 * States:       Static.
 * A11y:         Uses `<blockquote>` + `<figcaption>` so the quote and its source
 *               are semantically linked; the avatar's name is its alt text.
 * Responsive:   Fills its container; footer wraps on narrow widths.
 * Composition:  Generic — quote/author are props; never hardcodes a person.
 */
interface QuoteBlockProps {
  quote: ReactNode;
  authorName: string;
  authorRole?: ReactNode;
  avatarSrc?: string;
  className?: string;
}

export function QuoteBlock({
  quote,
  authorName,
  authorRole,
  avatarSrc,
  className,
}: QuoteBlockProps) {
  return (
    <Card as="figure" className={cn('flex flex-col gap-5', className)}>
      <blockquote className="text-ink font-display text-h3 leading-[1.4] text-balance italic">
        {quote}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar src={avatarSrc} name={authorName} size="sm" />
        <span className="flex flex-col">
          <span className="text-ink text-small font-sans font-semibold">
            {authorName}
          </span>
          {authorRole ? (
            <span className="text-mute text-small font-sans">{authorRole}</span>
          ) : null}
        </span>
      </figcaption>
    </Card>
  );
}
