import NextLink from 'next/link';
import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

/**
 * Link — the single navigation/link primitive (Bible §03, §13).
 *
 * Purpose:      Render internal and external links consistently, with Signal
 *               colour, a visible focus ring and safe `rel` for new tabs.
 * Public API:   next/link props + `variant`, `external`.
 * Props:        `variant`, `external`, `href`, children; ≤ 7 total.
 * Variants:     variant — default (Signal, underline on hover) | quiet (inherits
 *               colour, for nav) | inline (underlined body link).
 * States:       Default/hover/focus handled via classes; focus ring is global.
 * A11y:         External links get rel="noopener noreferrer"; focus-visible ring
 *               inherited from globals; keyboard-operable by nature.
 * Responsive:   Size-agnostic; inherits type from context.
 * Composition:  Wraps next/link so client routing + prefetch come for free.
 */
type LinkVariant = 'default' | 'quiet' | 'inline';

interface LinkProps extends ComponentPropsWithoutRef<typeof NextLink> {
  variant?: LinkVariant;
  /** Force external-link treatment (target + rel). Auto-detected for http(s). */
  external?: boolean;
}

const VARIANT: Record<LinkVariant, string> = {
  default:
    'text-signal transition-colors duration-[var(--dur-instant)] hover:underline underline-offset-2',
  quiet:
    'text-ink transition-colors duration-[var(--dur-instant)] hover:text-signal no-underline',
  inline: 'text-signal underline underline-offset-2 hover:opacity-80',
};

export function Link({
  variant = 'default',
  external,
  href,
  className,
  ...rest
}: LinkProps) {
  const isExternal =
    external ?? (typeof href === 'string' && /^https?:\/\//.test(href));

  return (
    <NextLink
      href={href}
      className={cn('rounded-sm outline-offset-2', VARIANT[variant], className)}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    />
  );
}
