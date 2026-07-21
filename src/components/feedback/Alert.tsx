import { type ReactNode } from 'react';

import { STATUS, type Status } from '@/components/feedback/status';
import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * Alert — an inline, persistent status message (Bible §11, Sprint 02 §08).
 *
 * Purpose:      Communicate a contextual info/success/warning/error message in
 *               the flow of the page — not a transient toast.
 * Public API:   `status`, `title`, `children`, `className`.
 * Props:        `status`, `title`; ≤ 7 total.
 * Variants:     status — info | success | warning | error, each with its own
 *               icon + accent + left datum rule (colour never carries meaning
 *               alone — icon and text always accompany it).
 * States:       Static; persistent until removed by the caller.
 * A11y:         role="alert" for error/warning (assertive), role="status" for
 *               info/success (polite); the status icon is decorative because the
 *               title/body already name the state.
 * Responsive:   Full-width block; content wraps naturally.
 * Composition:  `title` optional; body is free content. Pair with a Button for
 *               a recovery action.
 */
interface AlertProps {
  status?: Status;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Alert({
  status = 'info',
  title,
  children,
  className,
}: AlertProps) {
  const s = STATUS[status];
  const assertive = status === 'error' || status === 'warning';
  return (
    <div
      role={assertive ? 'alert' : 'status'}
      className={cn(
        'flex gap-3 rounded-sm border border-l-2 p-4',
        'border-hairline',
        s.border,
        s.surface,
        className,
      )}
    >
      <Icon icon={s.icon} className={cn('mt-0.5', s.accent)} />
      <div className="min-w-0 flex-1">
        {title ? (
          <p className="text-ink text-body font-sans leading-snug font-semibold">
            {title}
          </p>
        ) : null}
        {children ? (
          <div className={cn('text-graphite text-small', title && 'mt-1')}>
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
