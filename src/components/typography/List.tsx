import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

/**
 * List — ordered/unordered lists with token rhythm (Bible §04).
 *
 * Purpose:      Render bulleted or numbered lists with the correct marker,
 *               indent and vertical rhythm — the semantic list primitive.
 * Public API:   `variant`, `marker`, standard list-element props.
 * Props:        `variant`, `marker`; ≤ 7 total.
 * Variants:     variant — unordered (default) | ordered.
 *               marker — default (disc/decimal) | none (flush, for nav/menus).
 * States:       Static; no interactive states.
 * A11y:         Renders a real `<ul>`/`<ol>`; children are `List.Item` (`<li>`),
 *               so AT announces item counts and position.
 * Responsive:   Size-agnostic; inherits body type and colour.
 * Composition:  `List` + `List.Item`; nest for sub-lists.
 */
type ListVariant = 'unordered' | 'ordered';
type ListMarker = 'default' | 'none';

interface ListProps
  extends Omit<
    ComponentPropsWithoutRef<'ul'> & ComponentPropsWithoutRef<'ol'>,
    'type'
  > {
  variant?: ListVariant;
  marker?: ListMarker;
}

const MARKER: Record<ListVariant, Record<ListMarker, string>> = {
  unordered: { default: 'list-disc pl-5', none: 'list-none pl-0' },
  ordered: { default: 'list-decimal pl-5', none: 'list-none pl-0' },
};

function ListItem({ className, ...rest }: ComponentPropsWithoutRef<'li'>) {
  return (
    <li
      className={cn('text-graphite marker:text-mute font-sans', className)}
      {...rest}
    />
  );
}

export function List({
  variant = 'unordered',
  marker = 'default',
  className,
  ...rest
}: ListProps) {
  const Component = variant === 'ordered' ? 'ol' : 'ul';
  return (
    <Component
      className={cn(
        'text-body flex flex-col gap-2 leading-[1.6]',
        MARKER[variant][marker],
        className,
      )}
      {...rest}
    />
  );
}

List.Item = ListItem;
