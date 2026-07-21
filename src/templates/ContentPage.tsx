import { type ReactNode } from 'react';

import { ContentWrapper, Section, Stack } from '@/components/layout';
import { PageHeader } from '@/templates/PageHeader';

/**
 * ContentPage — the content-heavy / long-form reading template (Sprint 03 §08).
 *
 * Purpose:      Hold running prose at a comfortable reading measure — the
 *               template for text-dense pages (a written Resume, policy pages)
 *               where line length, not grid width, governs the layout.
 * Public API:   `eyebrow`, `title`, `description`, `children`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None.
 * States:       Static frame.
 * A11y:         Renders the body as an `<article>`; PageHeader owns the H1.
 * Responsive:   ContentWrapper caps the measure; gutters step with the viewport.
 * Composition:  Fill `children` with prose/typography components.
 */
interface ContentPageProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export function ContentPage({
  eyebrow,
  title,
  description,
  children,
}: ContentPageProps) {
  return (
    <Section>
      <ContentWrapper as="article" width="prose">
        <Stack gap={10}>
          <PageHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          {children}
        </Stack>
      </ContentWrapper>
    </Section>
  );
}
