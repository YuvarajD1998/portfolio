import { Breadcrumb, type Crumb } from '@/components/navigation';

/**
 * BreadcrumbTrail — a labelled breadcrumb built from explicit crumbs
 * (Sprint 03 §09).
 *
 * Purpose:      Wrap the Sprint 02 Breadcrumb with the sprint's usage rule.
 *               Breadcrumbs are shown only two levels deep and beyond — inside
 *               the engineering deep-dive (P06 §04); shallower pages never carry
 *               them. Callers pass the trail; this stays a thin, testable seam.
 * Public API:   `items`, `className`.
 * Props:        `items`, `className`; ≤ 7 total.
 * Variants:     None.
 * States:       Inherited from Breadcrumb (link hover/focus; last is current).
 * A11y:         Breadcrumb renders `<nav aria-label="Breadcrumb">`; the last
 *               crumb is `aria-current="page"` and not a link.
 * Responsive:   Wraps (from Breadcrumb).
 * Composition:  Sits above a template's PageHeader on level-two+ routes.
 */
export function BreadcrumbTrail({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return <Breadcrumb items={items} className={className} />;
}
