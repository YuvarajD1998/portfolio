import { Badge } from '@/components';
import { STATUS_META, type Status } from '@/content/transpahire';

/**
 * StatusBadge — a feature's Product-Book status glyph (Sprint 07 §01, §06).
 *
 * Purpose:      Render a feature/subsystem's true status from the Product Book
 *               legend — Implemented / Partial / Flag-gated / Planned /
 *               Deprecated — so the page can never silently round a partial or
 *               flag-gated feature up to shipped (S07 governing principle).
 * Public API:   `status`.
 * A11y:         The status word is real text (never colour alone); the Badge
 *               tone reinforces but does not replace it.
 * Composition:  Beside a feature title, on a card header or a list row.
 */
export function StatusBadge({ status }: { status: Status }) {
  const meta = STATUS_META[status];
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}
