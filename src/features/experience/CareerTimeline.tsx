import { Heading, Reveal, Stack, Text } from '@/components';
import { education, flagshipLink, roles, timeline } from '@/content/experience';
import { RoleCard } from '@/features/experience/RoleCard';

/**
 * CareerTimeline — the chronology that is the page's spine (Sprint 09 §05, §15).
 *
 * Purpose:      Render the frozen chronology, newest first, as a connected
 *               vertical rail with one node per role — each node bound to its
 *               full role card and to the section-rail anchor (S09 §05). The
 *               education node is a supporting node at the end that links down to
 *               the full §12 section (S09 §05, §12). Progression is conveyed by
 *               hierarchy, not by shouting dates (S09 §05 RULE). This is the
 *               reusable chronology primitive the Résumé page reuses — it accepts
 *               role data, not styling (S09 §15).
 * Public API:   No props — reads frozen career data from `@/content/experience`.
 * A11y:         An accessible ordered structure, NOT a decorative graphic
 *               (S09 §05 RULE): a real `<ol>` with an `<li>` per node, so AT
 *               announces the sequence and each node's position; the rail/node
 *               dot is `aria-hidden`. The `<section>` owns one H2; each role card
 *               owns an H3; dates are node metadata, not headings. Fully keyboard-
 *               & screen-reader-navigable; the `id` anchors the section rail.
 * Responsive:   A vertical rail at every width; role cards reflow to one column
 *               on narrow widths (S09 §14).
 * Composition:  Anchored `<section>` (matching ExperienceSection's shape) →
 *               header + `<ol>` of nodes (RoleCard bodies) + compact education
 *               node. Rendered inside the page's narrative column beside the rail.
 */
function TimelineNode({
  marker,
  children,
  last = false,
}: {
  marker: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <li
      className={`border-hairline relative border-l pl-8 ${last ? 'pb-0' : 'pb-10'}`}
    >
      <span
        aria-hidden
        className="border-signal bg-paper absolute top-1 -left-[6px] h-3 w-3 rounded-full border-2"
      />
      <Stack gap={3}>
        <span className="text-mute text-label font-mono tracking-[0.14em] uppercase">
          {marker}
        </span>
        {children}
      </Stack>
    </li>
  );
}

export function CareerTimeline() {
  const { degree } = education;

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="scroll-mt-[calc(var(--spacing-header)+var(--space-8))]"
    >
      <Reveal>
        <Stack gap={10}>
          <Stack gap={3}>
            <span className="text-mute text-label font-mono tracking-[0.14em] uppercase">
              <span aria-hidden="true">05 — </span>
              {timeline.eyebrow}
            </span>
            <Heading as="h2" size="h2" id="timeline-heading">
              {timeline.title}
            </Heading>
            <Text
              tone="graphite"
              className="text-body max-w-[46ch] leading-[1.6]"
            >
              {timeline.lead}
            </Text>
          </Stack>

          <ol className="flex flex-col">
            {roles.map((role) => (
              <TimelineNode key={role.id} marker={role.duration}>
                <RoleCard
                  role={role}
                  link={
                    role.id === flagshipLink.roleId
                      ? { href: flagshipLink.href, label: flagshipLink.label }
                      : undefined
                  }
                />
              </TimelineNode>
            ))}

            {/*
              §05 — education as a supporting node on the same timeline. It is a
              compact reference here (marker + degree, linking down to the full
              §12 Education section) so the chronology stays complete without
              duplicating the education content twice on the page.
            */}
            <TimelineNode marker={degree.duration} last>
              <Stack gap={1}>
                <Text
                  as="a"
                  href={`#${degree.id}`}
                  variant="body"
                  className="text-ink leading-snug font-semibold hover:underline"
                >
                  {degree.title}
                </Text>
                <Text variant="small" tone="graphite">
                  {degree.institution}
                </Text>
              </Stack>
            </TimelineNode>
          </ol>
        </Stack>
      </Reveal>
    </section>
  );
}
