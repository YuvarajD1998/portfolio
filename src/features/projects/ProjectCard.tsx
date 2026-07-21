'use client';

import { ArrowUpRight } from 'lucide-react';

import {
  Card,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
  Tag,
  Text,
} from '@/components';
import { type Project } from '@/content/projects';

/**
 * Project card — one card, reused everywhere (Sprint 06 §07; P07 §05, P08 §05).
 *
 * Purpose:      A single supporting project as a scannable tile: thumbnail,
 *               title, category, tech tags, summary and a CTA into its case
 *               study. Reuses the S02 Card — no bespoke grid card (S06 §06/§07).
 * Public API:   `project` — a frozen `Project` from `@/content/projects`.
 * A11y:         The whole card is one accessible link target; its accessible
 *               name (`aria-label`) names the project and destination so it is
 *               meaningful out of context (not "read more"). The thumbnail
 *               monogram and the trailing glyph are decorative (aria-hidden).
 * Responsive:   Fills its grid cell; consistent height via `h-full` so cards
 *               align as columns collapse (S06 §13).
 * Composition:  Card(as=Link) → thumbnail + category/org + h3 + summary + tags.
 *
 * Thumbnail: until an approved image asset exists, a decorative monogram stands
 * in (S06 §07) — no fabricated screenshot; the alt is empty because the card's
 * text already names the project.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      as={Link}
      href={project.href}
      variant="quiet"
      interactive
      padding="lg"
      aria-label={`View ${project.name} — ${project.category} project at ${project.org}`}
      className="group focus-visible:outline-signal flex h-full flex-col no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Stack gap={5} className="h-full">
        {/* Decorative monogram thumbnail — no approved asset yet (S06 §07). */}
        <div
          aria-hidden
          className="border-hairline bg-sunken flex aspect-[16/9] items-center justify-center rounded-sm border"
        >
          <span className="text-h3 text-mute font-mono">
            {project.name.charAt(0)}
          </span>
        </div>

        <Flex justify="between" align="start" gap={4}>
          {/* Category only — the org is already named in the Bible §10 summary. */}
          <Text variant="small" tone="mute" as="span" className="font-mono">
            {project.category}
          </Text>
          <Icon
            icon={ArrowUpRight}
            size="sm"
            className="text-mute group-hover:text-signal shrink-0 transition-colors"
            aria-hidden
          />
        </Flex>

        <Stack gap={3}>
          <Heading as="h3" size="h3">
            {project.name}
          </Heading>
          <Text variant="body" tone="graphite">
            {project.summary}
          </Text>
        </Stack>

        <Flex wrap gap={2} className="mt-auto pt-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Flex>
      </Stack>
    </Card>
  );
}
