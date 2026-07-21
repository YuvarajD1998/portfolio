'use client';

import { useMemo } from 'react';

import { SectionNav, type SectionLink } from '@/components/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';

/**
 * SectionRail — the case-study "on this page" rail with scroll-spy
 * (Sprint 03 §09, §10).
 *
 * Purpose:      Wire the Sprint 02 SectionNav to live active-section detection.
 *               Scoped to long case studies (P06 §04) — it is not added
 *               speculatively to routes without anchored sections. Anchor jumps
 *               use native `#id` links; the sticky offset is the global
 *               `scroll-padding-top`, so it honours reduced motion.
 * Public API:   `items`, `label`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None.
 * States:       Delegates to SectionNav; the active item follows the viewport.
 * A11y:         SectionNav renders `<nav aria-label>`; the active link is
 *               `aria-current="location"`. Marked as a complementary region.
 * Responsive:   The caller hides it below lg; on small screens the sections
 *               remain reachable via the in-page anchors themselves.
 * Composition:  Beside long-form case-study content, in a sticky column.
 */
export function SectionRail({
  items,
  label,
  className,
}: {
  items: SectionLink[];
  label?: string;
  className?: string;
}) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveSection(ids);

  return (
    <SectionNav
      items={items}
      activeId={activeId}
      label={label}
      className={className}
    />
  );
}
