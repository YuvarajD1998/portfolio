import { CheckCircle2 } from 'lucide-react';
import { type ReactNode } from 'react';

import { StatePanel } from '@/components/feedback/StatePanel';

/**
 * SuccessState — the "done" confirmation panel (Bible §13, Sprint 02 §08).
 *
 * Purpose:      Confirm a completed flow (form submitted, action succeeded) with
 *               a reassuring centred panel.
 * Public API:   `title`, `description`, `action`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — success accent from the token; icon fixed (check).
 * States:       Static.
 * A11y:         role="status" (polite); the check icon is decorative because the
 *               title states success — meaning never rides on colour alone.
 * Responsive:   Centres within its container.
 * Composition:  Pass a Button as `action` for the next step.
 */
interface SuccessStateProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function SuccessState({
  title,
  description,
  action,
  className,
}: SuccessStateProps) {
  return (
    <StatePanel
      icon={CheckCircle2}
      iconTone="text-success"
      title={title}
      description={description}
      action={action}
      role="status"
      className={className}
    />
  );
}
