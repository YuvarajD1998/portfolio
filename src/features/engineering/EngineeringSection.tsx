import { type ReactNode } from 'react';

import { Heading, Reveal, Stack, Text } from '@/components';

/**
 * EngineeringSection — the anchored movement wrapper (Sprint 08 §02, §21).
 *
 * Purpose:      Every Engineering-page movement is an addressable, labelled seam
 *               the section rail and scroll-spy steer by (S08 §02, §21). This
 *               wraps one movement: an `id`ed `<section>` with a header (kicker +
 *               H2 + optional lead) and a stacked body, entering with the
 *               canonical Reveal. It keeps every movement visually and
 *               structurally identical so the long-form page reads as one
 *               document — the same discipline the flagship case study uses, not
 *               a second variant of it.
 * Public API:   `id`, `index`, `kicker`, `title`, `lead`, `children`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one movement treatment.
 * States:       Static; Reveal resolves instantly under reduced motion.
 * A11y:         The `<section>` is labelled by its H2's id; the id anchor clears
 *               the sticky header via `scroll-mt`. One H2 per movement; content
 *               headings step down to H3.
 * Responsive:   Single measure-width column; body wraps at every width.
 * Composition:  Used once per movement on the Engineering page, in narrative
 *               order; the `id` matches the section-rail anchor (S08 §21).
 */
interface EngineeringSectionProps {
  id: string;
  /** Two-digit movement number shown in the kicker (§02 order is load-bearing). */
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
}

export function EngineeringSection({
  id,
  index,
  kicker,
  title,
  lead,
  children,
}: EngineeringSectionProps) {
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
