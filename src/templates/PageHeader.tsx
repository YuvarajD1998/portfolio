import { type ReactNode } from 'react';

import { Stack } from '@/components/layout';
import { Heading, Label, Subheading } from '@/components/typography';
import { cn } from '@/lib/cn';

/**
 * PageHeader — the shared title block for page templates (Sprint 03 §08).
 *
 * Purpose:      Render a page's eyebrow + H1 + optional deck consistently, so
 *               every template opens the same way. It carries the single H1
 *               (S03 §13: one H1 per page) — templates never emit their own.
 * Public API:   `eyebrow`, `title`, `description`, `align`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     align — start (default) | center.
 * States:       Static.
 * A11y:         Emits the page's one `<h1>`; the deck is a `<p>`, not a heading.
 * Responsive:   Caps to the reading measure via its container (caller's).
 * Composition:  First child of a template's main region.
 */
interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  align = 'start',
  className,
}: PageHeaderProps) {
  return (
    <Stack
      gap={4}
      className={cn(
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? <Label as="p">{eyebrow}</Label> : null}
      <Heading as="h1" size="h1">
        {title}
      </Heading>
      {description ? (
        <Subheading className="max-w-[var(--measure)]">
          {description}
        </Subheading>
      ) : null}
    </Stack>
  );
}
