import { type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Badge — a small status/label pill (Bible §09, Sprint 02 §07).
 *
 * Purpose:      A compact, non-interactive marker for status or category — a
 *               count, a state, a short label.
 * Public API:   `tone`, `children`, `className`.
 * Props:        `tone`; ≤ 7 total.
 * Variants:     tone — neutral (default) | info | success | warning | danger |
 *               signal. Each pairs a tinted background with readable text.
 * States:       Static.
 * A11y:         Decorative text by default; if it conveys state not otherwise
 *               present, the caller adds an accessible label in context.
 * Responsive:   Inline; inherits nearby size.
 * Composition:  Sits beside titles/rows; use Tag for a bordered chip form.
 */
type BadgeTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'signal';

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

const TONE: Record<BadgeTone, string> = {
  neutral: 'bg-neutral-tag text-graphite',
  info: 'bg-surface text-info',
  success: 'bg-surface text-success',
  warning: 'bg-surface text-warning',
  danger: 'bg-surface text-danger',
  signal: 'bg-signal-tint text-signal',
};

export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'text-label inline-flex items-center rounded-sm px-2 py-0.5 font-mono tracking-[0.08em] uppercase',
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
