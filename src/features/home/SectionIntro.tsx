import { type ReactNode } from 'react';

import { Eyebrow, Heading, Reveal, Stack, Subheading } from '@/components';

/**
 * SectionIntro — the shared eyebrow + heading + lead block for homepage
 * sections (Sprint 04). Keeps every section's opener visually identical and
 * the section components free of repeated markup. Not exported from the app
 * barrel — internal to the homepage feature.
 *
 * The `id` anchors the section heading so the enclosing <section> can be
 * labelled by it (landmark accessibility). Headings render as <h2> (the hero
 * owns the single <h1>).
 */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  id: string;
}) {
  return (
    <Reveal>
      <Stack gap={4} className="max-w-[36ch]">
        <Eyebrow as="p">{eyebrow}</Eyebrow>
        <Heading as="h2" size="h2" id={id}>
          {title}
        </Heading>
        {lead ? <Subheading>{lead}</Subheading> : null}
      </Stack>
    </Reveal>
  );
}
