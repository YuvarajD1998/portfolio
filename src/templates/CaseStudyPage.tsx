import { type ReactNode } from 'react';

import { Container, Section, Stack } from '@/components/layout';
import { type Crumb, type SectionLink } from '@/components/navigation';
import { BreadcrumbTrail } from '@/layouts/BreadcrumbTrail';
import { SectionRail } from '@/layouts/SectionRail';
import { PageHeader } from '@/templates/PageHeader';

/**
 * CaseStudyPage — the case-study reading template (Sprint 03 §08).
 *
 * Purpose:      The layout the Transpahire case study (and future `/projects/
 *               [slug]` studies) extend: an optional breadcrumb, a PageHeader,
 *               and a two-column body with a sticky section rail beside the
 *               long-form content. The rail is scoped to this template — the
 *               only place the UX Blueprint defines one (P06 §04).
 * Public API:   `eyebrow`, `title`, `description`, `sections`, `crumbs`,
 *               `children`.
 * Props:        Typed; conceptually ≤ 7.
 * Variants:     With/without a section rail (`sections`) and breadcrumb
 *               (`crumbs`).
 * States:       Static frame; the rail tracks the active section.
 * A11y:         PageHeader owns the H1; the rail is a labelled nav; the
 *               breadcrumb is a labelled nav with a current final crumb.
 * Responsive:   Single column below lg (rail hidden); two columns at lg+.
 * Composition:  Content sections carry `id`s matching `sections[].id` so the
 *               rail's anchors and scroll-spy resolve.
 */
interface CaseStudyPageProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  sections?: SectionLink[];
  crumbs?: Crumb[];
  children?: ReactNode;
}

export function CaseStudyPage({
  eyebrow,
  title,
  description,
  sections,
  crumbs,
  children,
}: CaseStudyPageProps) {
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
            <div className="min-w-0">{children}</div>
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
