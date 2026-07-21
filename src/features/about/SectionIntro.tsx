import { type ReactNode } from 'react';

import { Eyebrow, Heading, Reveal, Stack, Subheading } from '@/components';

/**
 * SectionIntro — the shared eyebrow + heading + lead opener for About sections
 * (Sprint 05). Mirrors the homepage feature's SectionIntro so every section's
 * opener is visually identical across pages, and the section components hold no
 * repeated markup. Feature-local — not exported from the app barrel.
 *
 * The `id` anchors the section heading so the enclosing <section> is labelled by
 * it (landmark accessibility). Headings render as <h2>; the page's single <h1>
 * lives in the Introduction.
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
