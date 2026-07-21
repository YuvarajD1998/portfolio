import { type ReactNode } from 'react';

import { Heading, Reveal, Stack, Text } from '@/components';

/**
 * SkillsSection — the anchored section wrapper (Sprint 10 §02, §16).
 *
 * Purpose:      Every Skills-page section is an addressable, labelled seam the
 *               section rail and scroll-spy steer by (S10 §02, §16). This wraps
 *               one section: an `id`ed `<section>` with a header (kicker + H2 +
 *               optional lead) and a stacked body, entering with the canonical
 *               Reveal. It keeps every section visually and structurally
 *               identical so the long-form page reads as one document — the same
 *               discipline the Experience and Engineering pages use, not a third
 *               variant of it (S10 §05).
 * Public API:   `id`, `index`, `kicker`, `title`, `lead`, `children`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one section treatment.
 * States:       Static; Reveal resolves instantly under reduced motion.
 * A11y:         The `<section>` is labelled by its H2's id; the id anchor clears
 *               the sticky header via `scroll-mt`. One H2 per section; content
 *               headings step down to H3.
 * Responsive:   Single measure-width header; body wraps at every width.
 * Composition:  Used once per section on the Skills page, in narrative order;
 *               the `id` matches the section-rail anchor (S10 §16).
 */
interface SkillsSectionProps {
  id: string;
  /** Two-digit section number shown in the kicker (§02 order is load-bearing). */
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
}

export function SkillsSection({
  id,
  index,
  kicker,
  title,
  lead,
  children,
}: SkillsSectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-[calc(var(--spacing-header)+var(--space-8))]"
    >
      <Reveal>
        <Stack gap={6}>
          <Stack gap={3}>
            <span className="text-mute text-label font-mono tracking-[0.14em] uppercase">
              <span aria-hidden="true">{index} — </span>
              {kicker}
            </span>
            <Heading as="h2" size="h2" id={headingId}>
              {title}
            </Heading>
            {lead ? (
              <Text
                tone="graphite"
                className="text-body max-w-[46ch] leading-[1.6]"
              >
                {lead}
              </Text>
            ) : null}
          </Stack>
          {children}
        </Stack>
      </Reveal>
    </section>
  );
}
