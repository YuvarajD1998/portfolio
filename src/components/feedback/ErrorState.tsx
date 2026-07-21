import { AlertOctagon } from 'lucide-react';
import { type ReactNode } from 'react';

import { StatePanel } from '@/components/feedback/StatePanel';

/**
 * ErrorState — the "something went wrong" panel (Bible §13, Sprint 02 §08).
 *
 * Purpose:      Communicate a failed load or action and offer a recovery path —
 *               the region-level error counterpart to an inline Alert.
 * Public API:   `title`, `description`, `action`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — danger accent from the token; icon fixed.
 * States:       Static.
 * A11y:         role="alert" (assertive) so AT surfaces the failure promptly;
 *               the icon is decorative because the title names the error.
 * Responsive:   Centres within its container.
 * Composition:  Pass a Button as `action` (e.g. "Try again").
 */
interface ErrorStateProps {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  action,
  className,
}: ErrorStateProps) {
  return (
    <StatePanel
      icon={AlertOctagon}
      iconTone="text-danger"
      title={title}
      description={description}
      action={action}
      role="alert"
      className={className}
    />
  );
}
