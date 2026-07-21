import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Card, Heading, Icon, List, Stack, Tag, Text } from '@/components';
import { type Role } from '@/content/experience';

/**
 * RoleCard — one employment record, one shared anatomy (Sprint 09 §06, §07, §15).
 *
 * Purpose:      Render a single role from the frozen career record — company,
 *               position, duration, responsibilities, technologies, domain — in
 *               ONE field order both cards share, so the reader compares like
 *               with like (S09 §07 RULE). Every field is rendered verbatim;
 *               nothing is added, dropped or reworded (S09 §06 RULE). This is the
 *               reusable role-card schema the Résumé page reuses (S09 §15) — it
 *               accepts a role object, not styling.
 * Public API:   `role` (the frozen data), optional `link` (a cross-link OUT to
 *               the page that owns a named project/flagship — never a re-telling,
 *               S09 §06 HONEST).
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one card treatment for every role (consistency is part of
 *               the argument, S09 §07).
 * States:       Static.
 * A11y:         Composed under the timeline's `<ol>`; the card's title is an H3
 *               (sections own the single H2). Responsibilities & technologies are
 *               real lists; the card's `id` is the deep-link target the timeline
 *               node anchors to. The optional cross-link is a descriptive link.
 * Responsive:   Header wraps; the two inner columns reflow to a single column on
 *               narrow widths (S09 §14).
 * Composition:  One per role inside CareerTimeline; fed frozen content.
 */
export function RoleCard({
  role,
  link,
}: {
  role: Role;
  link?: { href: string; label: string };
}) {
  return (
    <Card
      padding="none"
      id={role.id}
      className="scroll-mt-[calc(var(--spacing-header)+var(--space-8))] overflow-hidden"
    >
      <div className="border-hairline flex flex-wrap items-baseline justify-between gap-2 border-b p-5">
        <Stack gap={1}>
          <Heading as="h3" size="h3">
            {role.company}
          </Heading>
          <Text variant="small" tone="graphite">
            {role.position}
          </Text>
        </Stack>
        <span className="text-mute text-label font-mono tracking-[0.08em] uppercase">
          {role.location} · {role.duration}
        </span>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-2">
        <Stack gap={2}>
          <Text variant="label" tone="mute" as="h4">
            Responsibilities &amp; work
          </Text>
          <List>
            {role.responsibilities.map((item) => (
              <li key={item}>
                <Text as="span" variant="small">
                  {item}
                </Text>
              </li>
            ))}
          </List>
        </Stack>

        <Stack gap={4}>
          <Stack gap={2}>
            <Text variant="label" tone="mute" as="h4">
              Technologies
            </Text>
            <ul
              className="flex flex-wrap gap-1.5"
              aria-label={`${role.company} technologies`}
            >
              {role.technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </Stack>

          <Stack gap={2}>
            <Text variant="label" tone="mute" as="h4">
              Domain / products
            </Text>
            <Text variant="small" tone="graphite" className="leading-[1.6]">
              {role.domain}
            </Text>
            {link ? (
              <Link
                href={link.href}
                className="text-signal text-small inline-flex w-fit items-center gap-1 font-medium hover:underline"
              >
                {link.label}
                <Icon icon={ArrowUpRight} size="sm" aria-hidden />
              </Link>
            ) : null}
          </Stack>
        </Stack>
      </div>
    </Card>
  );
}
