import { type ReactNode } from 'react';

import { Heading, Reveal, Stack, Text } from '@/components';

/**
 * ContactSection — the anchored section wrapper (Sprint 12 §02).
 *
 * Purpose:      Every Contact-page section is an addressable, labelled seam so
 *               the page reads top-to-bottom in the approved conversion order
 *               (S12 §02 — five questions, then an action). This wraps one
 *               section: an `id`ed `<section>` with a header (kicker + H2 +
 *               optional lead) and a stacked body, entering with the canonical
 *               Reveal. It keeps every section structurally identical — the same
 *               discipline the Resume page uses (S11 §02), not a new variant.
 * Public API:   `id`, `index`, `kicker`, `title`, `lead`, `children`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one section treatment.
 * States:       Static; Reveal resolves instantly under reduced motion.
 * A11y:         The `<section>` is labelled by its H2's id; the id anchor clears
 *               the sticky header via `scroll-mt`. One H2 per section; content
 *               headings step down to H3.
 * Responsive:   Single measure-width header; body wraps at every width.
 * Composition:  Used once per section on the Contact page, in narrative order.
 */
interface ContactSectionProps {
  id: string;
  /** Two-digit section number shown in the kicker (§02 order is load-bearing). */
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
}

export function ContactSection({
  id,
  index,
  kicker,
  title,
  lead,
  children,
}: ContactSectionProps) {
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
