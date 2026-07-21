import { Hammer } from 'lucide-react';
import { type ReactNode } from 'react';

import { EmptyState } from '@/components/feedback';

/**
 * FutureContent — the labelled seam a later sprint fills (Sprint 03 §11).
 *
 * Purpose:      Mark the region on a placeholder page where real content will
 *               attach. It reuses the EmptyState panel so the placeholder reads
 *               as a calm, in-system "present, not populated" state — not a
 *               broken page. A later sprint replaces this region's contents;
 *               nothing else about the page changes (S03 §11).
 * Public API:   `label`, `note`.
 * Props:        `label`, `note`; ≤ 7 total.
 * Variants:     None.
 * States:       Static (EmptyState role="status").
 * A11y:         Inherits EmptyState's polite status; the icon is decorative.
 * Responsive:   Centres within its container.
 * Composition:  Drop inside a template's content slot on placeholder pages.
 */
export function FutureContent({
  label = 'Content arrives in a later sprint',
  note,
}: {
  label?: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="border-hairline rounded-md border border-dashed py-4">
      <EmptyState
        icon={Hammer}
        title={label}
        description={
          note ??
          'This page’s structure is in place. Its content is filled in a future sprint — the shell, routing and navigation are done.'
        }
      />
    </div>
  );
}
