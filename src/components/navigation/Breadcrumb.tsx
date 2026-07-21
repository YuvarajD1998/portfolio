import { ChevronRight } from 'lucide-react';
import { Fragment, type ReactNode } from 'react';

import { Icon } from '@/components/icons';
import { Link } from '@/components/typography';
import { cn } from '@/lib/cn';

/**
 * Breadcrumb — a hierarchical trail of ancestors (Bible §13, Sprint 02 §05).
 *
 * Purpose:      Show the path to the current page as a separated trail; the last
 *               crumb is the current location. Unwired — the caller passes items.
 * Public API:   `items` ({ label, href }[]), `className`.
 * Props:        `items`; ≤ 7 total.
 * Variants:     None.
 * States:       Links: hover / focus; the final crumb is static + current.
 * A11y:         `<nav aria-label="Breadcrumb">` with an ordered list; the last
 *               item carries `aria-current="page"` and is not a link. Separators
 *               are decorative (aria-hidden).
 * Responsive:   Wraps; separators keep the trail legible.
 * Composition:  Standalone; the last item is the current page.
 */
export interface Crumb {
  label: ReactNode;
  /** Omit on the final (current) crumb. */
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="text-small flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li className="flex items-center">
                {last || !item.href ? (
                  <span
                    aria-current={last ? 'page' : undefined}
                    className={cn(last ? 'text-ink font-medium' : 'text-mute')}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} variant="quiet" className="text-mute">
                    {item.label}
                  </Link>
                )}
              </li>
              {!last ? (
                <li aria-hidden className="text-hairline flex items-center">
                  <Icon icon={ChevronRight} size="sm" />
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
