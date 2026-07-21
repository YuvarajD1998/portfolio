import { type ReactNode } from 'react';

import { Container, Section, Stack } from '@/components/layout';
import { type Crumb, type SectionLink } from '@/components/navigation';
import { BreadcrumbTrail } from '@/layouts/BreadcrumbTrail';
import { SectionRail } from '@/layouts/SectionRail';
import { PageHeader } from '@/templates/PageHeader';

/**
 * DocumentationPage — the technical deep-dive template (Sprint 03 §08).
 *
 * Purpose:      The layout the Transpahire engineering deep-dive extends. It
 *               reuses the case-study rail + breadcrumb model (P07 §07: "reuses
 *               the case-study rail and tier model") but renders its body as an
 *               `<article>` for long, structured technical prose. Distinct from
 *               CaseStudyPage only in body semantics and default emphasis.
 * Public API:   `eyebrow`, `title`, `description`, `sections`, `crumbs`,
 *               `children`.
 * Props:        Typed; conceptually ≤ 7.
 * Variants:     With/without rail (`sections`) and breadcrumb (`crumbs`).
 * States:       Static frame; the rail tracks the active section.
 * A11y:         PageHeader owns the H1; body is an `<article>`; rail + crumb are
 *               labelled navs. Breadcrumb is expected here (level-two route).
 * Responsive:   Single column below lg (rail hidden); two columns at lg+.
 * Composition:  Content sections carry `id`s matching `sections[].id`.
 */
interface DocumentationPageProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  sections?: SectionLink[];
  crumbs?: Crumb[];
  children?: ReactNode;
}

export function DocumentationPage({
  eyebrow,
  title,
  description,
  sections,
  crumbs,
  children,
}: DocumentationPageProps) {
  const hasRail = sections && sections.length > 0;

  return (
    <Section>
      <Container>
        <Stack gap={12}>
          {crumbs && crumbs.length > 0 ? (
            <BreadcrumbTrail items={crumbs} />
          ) : null}
          <PageHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <div
            className={
              hasRail
                ? 'grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16'
                : undefined
            }
          >
            <article className="min-w-0">{children}</article>
            {hasRail ? (
              <aside
                aria-label="Section navigation"
                className="hidden lg:block"
              >
                <div className="sticky top-[calc(var(--header-height)+var(--space-8))]">
                  <SectionRail items={sections} />
                </div>
              </aside>
            ) : null}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
