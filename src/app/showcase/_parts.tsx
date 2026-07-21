import { type ReactNode } from 'react';

import { Divider, Stack } from '@/components';

/**
 * Showcase-only presentational helpers (Sprint 02 §12).
 *
 * These live under `app/showcase/` and are NOT part of the component library —
 * they exist purely to lay out the demo surface. They are excluded from
 * production with the rest of the showcase route.
 */

export function DemoSection({
  id,
  title,
  meta,
  children,
}: {
  id: string;
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--spacing-header)+var(--space-8))]"
    >
      <div className="border-ink mb-6 flex items-baseline justify-between border-t-2 pt-3">
        <h2 className="font-display text-h2 text-ink">{title}</h2>
        {meta ? (
          <span className="text-mute text-label font-mono tracking-[0.14em] uppercase">
            {meta}
          </span>
        ) : null}
      </div>
      <Stack gap={8}>{children}</Stack>
    </section>
  );
}

export function Demo({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-mute text-label font-mono tracking-[0.14em] uppercase">
        {label}
      </span>
      <div className="border-hairline bg-paper flex flex-wrap items-start gap-4 rounded-sm border border-dashed p-5">
        {children}
      </div>
      <Divider />
    </div>
  );
}
