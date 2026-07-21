import { Link } from '@/components/typography';
import { cn } from '@/lib/cn';

/**
 * Logo — the wordmark / brand lockup (Bible §09, Sprint 02 §05).
 *
 * Purpose:      Render the brand wordmark in the spec-sheet mono voice, either
 *               as a static mark or a link to a destination the caller supplies.
 * Public API:   `label`, `href`, `className`.
 * Props:        `label`, `href`; ≤ 7 total.
 * Variants:     linked (when `href` given) | static wordmark.
 * States:       When linked: hover / focus from Link; otherwise static.
 * A11y:         The label is the accessible name; as a link it is the home
 *               affordance. Unwired — caller decides the `href`.
 * Responsive:   Size-agnostic; tracking holds.
 * Composition:  Sits at the head of Header / Footer.
 */
interface LogoProps {
  /** The wordmark text. */
  label: string;
  /** Optional destination — omit for a static mark. */
  href?: string;
  className?: string;
}

export function Logo({ label, href, className }: LogoProps) {
  const mark = (
    <span
      className={cn(
        'text-ink text-label font-mono tracking-[0.14em] uppercase',
        className,
      )}
    >
      {label}
    </span>
  );

  if (!href) return mark;
  return (
    <Link href={href} variant="quiet" aria-label={label} className="rounded-sm">
      {mark}
    </Link>
  );
}
