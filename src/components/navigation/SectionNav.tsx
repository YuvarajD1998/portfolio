import { Link } from '@/components/typography';
import { cn } from '@/lib/cn';

/**
 * SectionNav — an in-page "on this page" anchor list (Bible §13, Sprint 02 §05).
 *
 * Purpose:      A vertical list of same-page anchors with an active marker — the
 *               table-of-contents rail. Unwired: the caller passes items and the
 *               active id (scroll-spy is a later sprint's concern).
 * Public API:   `items` ({ id, label }[]), `activeId`, `label`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None.
 * States:       default · hover · focus · active (Signal + rule) — active is
 *               caller-controlled, not derived here.
 * A11y:         `<nav aria-label>` with anchor links to `#id`; the active link
 *               carries `aria-current="location"`. Active is shown by weight +
 *               a rule as well as colour.
 * Responsive:   Vertical rail; typically hidden below lg by the caller.
 * Composition:  Beside long-form content; pair with scroll-spy later.
 */
export interface SectionLink {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionLink[];
  activeId?: string;
  /** Accessible name for the landmark, e.g. "On this page". */
  label?: string;
  className?: string;
}

export function SectionNav({
  items,
  activeId,
  label = 'On this page',
  className,
}: SectionNavProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="border-hairline flex flex-col gap-1.5 border-l">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id} className="-ml-px">
              <Link
                href={`#${item.id}`}
                variant="quiet"
                aria-current={active ? 'location' : undefined}
                className={cn(
                  'text-small block border-l-2 py-2 pl-4 transition-colors duration-[var(--dur-instant)]',
                  active
                    ? 'border-signal text-signal font-medium'
                    : 'text-mute hover:text-ink border-transparent',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
