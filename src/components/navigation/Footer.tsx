import { type ReactNode } from 'react';

import { Container, Divider } from '@/components/layout';
import { cn } from '@/lib/cn';

/**
 * Footer — the spec-sheet title block at page end (Bible §09, Sprint 02 §05).
 *
 * Purpose:      The bottom region: a hairline top rule over link columns and a
 *               quiet meta row. Unwired shell — the caller supplies NavGroups
 *               and meta content.
 * Public API:   `columns`, `meta`, `className`.
 * Props:        Typed slots; ≤ 7 total.
 * Variants:     None.
 * States:       Static shell; NavItem children carry states.
 * A11y:         Renders the `<footer>` landmark; a top Divider marks the edge.
 * Responsive:   Columns stack on mobile, spread on desktop; meta row wraps.
 * Composition:  `columns` holds NavGroups; `meta` holds the signature row.
 */
interface FooterProps {
  columns?: ReactNode;
  meta?: ReactNode;
  className?: string;
}

export function Footer({ columns, meta, className }: FooterProps) {
  return (
    <footer className={cn('mt-auto', className)}>
      <Divider />
      <Container>
        <div className="flex flex-col gap-10 py-12">
          {columns ? (
            <div className="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:gap-16">
              {columns}
            </div>
          ) : null}
          {meta ? (
            <div className="border-hairline flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              {meta}
            </div>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
