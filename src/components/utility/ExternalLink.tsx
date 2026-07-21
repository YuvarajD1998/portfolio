import { ArrowUpRight } from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';

import { Icon } from '@/components/icons';
import { Link } from '@/components/typography';
import { cn } from '@/lib/cn';

/**
 * ExternalLink — a link that leaves the site, marked as such (Bible §13, §09).
 *
 * Purpose:      A link to another origin that safely opens a new tab, shows an
 *               outward arrow and announces "opens in a new tab" to AT.
 * Public API:   `href`, `showIcon`, `children`, plus Link props.
 * Props:        `showIcon`; ≤ 7 total.
 * Variants:     Inherits Link variants (default | inline | quiet).
 * States:       hover / focus from Link; the arrow is decorative.
 * A11y:         Sets target + rel via Link's external handling and appends a
 *               visually-hidden "(opens in a new tab)" so the behaviour is not a
 *               surprise; the arrow icon is decorative.
 * Responsive:   Inline; size-agnostic.
 * Composition:  Use for any off-site link; internal links use typography/Link.
 */
interface ExternalLinkProps
  extends Omit<ComponentPropsWithoutRef<typeof Link>, 'external'> {
  /** Show the trailing outward arrow. Default true. */
  showIcon?: boolean;
}

export function ExternalLink({
  showIcon = true,
  className,
  children,
  ...rest
}: ExternalLinkProps) {
  return (
    <Link
      external
      variant="inline"
      className={cn('inline-flex items-center gap-0.5', className)}
      {...rest}
    >
      {children}
      {showIcon ? (
        <Icon icon={ArrowUpRight} size="sm" className="align-text-top" />
      ) : null}
      <span className="sr-only"> (opens in a new tab)</span>
    </Link>
  );
}
