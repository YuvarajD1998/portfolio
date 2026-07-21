import { Inbox, type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

import { StatePanel } from '@/components/feedback/StatePanel';

/**
 * EmptyState — the "nothing here yet" panel (Bible §13, Sprint 02 §08).
 *
 * Purpose:      Fill an empty region with a calm, informative placeholder and
 *               (optionally) the action that would populate it.
 * Public API:   `icon`, `title`, `description`, `action`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one calm treatment; `icon` customises the glyph.
 * States:       Static.
 * A11y:         role="status" (polite); the icon is decorative.
 * Responsive:   Centres within its container.
 * Composition:  Pass a Button as `action` to offer the create/import path.
 */
interface EmptyStateProps {
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <StatePanel
      icon={icon}
      iconTone="text-mute"
      title={title}
      description={description}
      action={action}
      role="status"
      className={className}
    />
  );
}
