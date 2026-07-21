import { type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * ArchitecturePanel — a stacked systems-diagram panel (Bible §09, Sprint 02 §07).
 *
 * Purpose:      Render a layered architecture sketch — named tiers, each with a
 *               row of node chips — in the spec-sheet voice. Generic: it draws
 *               whatever layers/nodes it is given, never a specific system.
 * Public API:   <ArchitecturePanel title> wrapping <ArchitectureLayer label>
 *               with node children.
 * Props:        panel — `title`; layer — `label`; ≤ 7 total.
 * Variants:     None — one diagram treatment.
 * States:       Static.
 * A11y:         Renders as a titled group (`<figure>`+`<figcaption>`); each layer
 *               is a labelled row whose node chips are a real `<ul>`/`<li>` list
 *               (S15 §02, SC 1.3.1), so AT announces the layer name, the node
 *               count and the list boundaries — not a flat run of text.
 * Responsive:   Node chips wrap; the rail stays legible at every width.
 * Composition:  `<ArchitecturePanel>` + one `<ArchitectureLayer>` per tier;
 *               node chips are plain children.
 */
interface ArchitecturePanelProps {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ArchitecturePanel({
  title,
  children,
  className,
}: ArchitecturePanelProps) {
  return (
    <figure
      className={cn(
        'border-hairline overflow-hidden rounded-md border',
        className,
      )}
    >
      {title ? (
        <figcaption className="border-hairline bg-surface text-label text-mute border-b px-4 py-2 font-mono tracking-[0.14em] uppercase">
          {title}
        </figcaption>
      ) : null}
      <div className="bg-paper flex flex-col">{children}</div>
    </figure>
  );
}

interface ArchitectureLayerProps {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ArchitectureLayer({
  label,
  children,
  className,
}: ArchitectureLayerProps) {
  const labelId = useId();
  return (
    <div
      className={cn(
        'border-hairline flex flex-col gap-2 border-b p-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4',
        className,
      )}
    >
      <span
        id={labelId}
        className="text-mute text-label font-mono tracking-[0.14em] uppercase sm:w-32 sm:shrink-0"
      >
        {label}
      </span>
      {/* The nodes are a real list labelled by the layer name (SC 1.3.1). */}
      <ul
        aria-labelledby={labelId}
        className="flex list-none flex-wrap gap-2 p-0"
      >
        {children}
      </ul>
    </div>
  );
}

interface ArchitectureNodeProps {
  children: ReactNode;
  className?: string;
}

export function ArchitectureNode({
  children,
  className,
}: ArchitectureNodeProps) {
  return (
    <li
      className={cn(
        'border-hairline bg-surface text-ink text-small inline-flex items-center rounded-sm border px-3 py-1.5 font-sans',
        className,
      )}
    >
      {children}
    </li>
  );
}

ArchitecturePanel.Layer = ArchitectureLayer;
ArchitecturePanel.Node = ArchitectureNode;
