import { type ReactNode } from 'react';

import { Container, Section, Stack } from '@/components/layout';
import { PageHeader } from '@/templates/PageHeader';

/**
 * StandardPage — the default page template (Sprint 03 §08).
 *
 * Purpose:      The everyday layout: a page-width Container with a PageHeader
 *               (eyebrow + H1 + deck) over a content region. Most short,
 *               single-column pages (About, Experience, Skills, Projects index)
 *               extend this rather than inventing a layout (S03 §08 RULE).
 * Public API:   `eyebrow`, `title`, `description`, `children`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one standard rhythm.
 * States:       Static frame.
 * A11y:         PageHeader owns the single H1; the region is the page body.
 * Responsive:   Container margins step with the viewport; content reflows.
 * Composition:  Fill `children` with sections built from S02 components.
 */
interface StandardPageProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export function StandardPage({
  eyebrow,
  title,
  description,
  children,
}: StandardPageProps) {
  return (
    <Section>
      <Container>
        <Stack gap={12}>
          <PageHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          {children}
        </Stack>
      </Container>
    </Section>
  );
}
