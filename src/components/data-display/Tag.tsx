import { X } from 'lucide-react';
import { type ReactNode } from 'react';

import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * Tag — a bordered chip, optionally removable (Bible §09, Sprint 02 §07).
 *
 * Purpose:      A hairline-bordered chip for keywords, filters and tech-stack
 *               labels — the bordered counterpart to Badge's tinted pill.
 * Public API:   `onRemove`, `removeLabel`, `children`, `className`.
 * Props:        `onRemove`, `removeLabel`; ≤ 7 total.
 * Variants:     None; presence of `onRemove` adds the remove control.
 * States:       Static, or static + a focusable remove button.
 * A11y:         When removable, the remove control is a real <button> with a
 *               required accessible label (`removeLabel`, defaults to
 *               "Remove {children}" when children is a string).
 * Responsive:   Inline; wraps within a Flex/wrap row.
 * Composition:  Rows of Tags in a wrapping Flex; use Badge for status pills.
 */
interface TagProps {
  onRemove?: () => void;
  removeLabel?: string;
  children: ReactNode;
  className?: string;
}

export function Tag({ onRemove, removeLabel, children, className }: TagProps) {
  const label =
    removeLabel ??
    (typeof children === 'string' ? `Remove ${children}` : 'Remove');
  return (
    <span
      className={cn(
        'border-hairline text-graphite text-small inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-sans',
        className,
      )}
    >
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={label}
          className="text-mute hover:text-ink -my-2 -mr-2 inline-flex min-h-9 min-w-9 shrink-0 items-center justify-center rounded-sm transition-colors"
        >
          <Icon icon={X} size="sm" />
        </button>
      ) : null}
    </span>
  );
}
