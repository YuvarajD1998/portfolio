import { type ReactNode } from 'react';

import { Container, Section, Stack } from '@/components/layout';
import { PageHeader } from '@/templates/PageHeader';

/**
 * ContactPage — the contact template (Sprint 03 §08).
 *
 * Purpose:      A focused, centred layout for the single "get in touch" moment:
 *               a PageHeader over a narrow region that a form or contact detail
 *               block fills later. Kept distinct from StandardPage because the
 *               contact page is intentionally centred and narrow, not a
 *               left-aligned document.
 * Public API:   `eyebrow`, `title`, `description`, `children`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None.
 * States:       Static frame.
 * A11y:         PageHeader owns the H1; the region holds the (later) form.
 * Responsive:   Narrow measure, centred; content reflows.
 * Composition:  Fill `children` with the contact form / details.
 */
interface ContactPageProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export function ContactPage({
  eyebrow,
  title,
  description,
  children,
}: ContactPageProps) {
  return (
    <Section>
      <Container width="measure">
        <Stack gap={10}>
          <PageHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />
          {children}
        </Stack>
      </Container>
    </Section>
  );
}
