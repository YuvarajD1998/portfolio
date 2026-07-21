import { type Metadata } from 'next';

import { Stack } from '@/components/layout';
import { type Crumb, type SectionLink } from '@/components/navigation';
import { Heading, Text } from '@/components/typography';
import { FutureContent } from '@/components/utility';
import { routes } from '@/config/navigation';
import { buildMetadata } from '@/lib/seo';
import { DocumentationPage } from '@/templates';

/**
 * Transpahire · Engineering — deep-dive placeholder (Sprint 03 §11).
 *
 * A child of the Transpahire case study, not a top-level nav item (P06 §03).
 * As a level-two route it is the one place breadcrumbs appear (P06 §04), and it
 * reuses the case-study rail (P07 §07). Structure only; content lands later.
 */
export const metadata: Metadata = buildMetadata({
  title: routes.transpahireEngineering.title,
  description: routes.transpahireEngineering.description,
  path: routes.transpahireEngineering.href,
});

/** Breadcrumb trail — Projects › Transpahire › Engineering (current). */
const CRUMBS: Crumb[] = [
  { label: routes.projects.label, href: routes.projects.href },
  { label: routes.transpahire.label, href: routes.transpahire.href },
  { label: routes.transpahireEngineering.label },
];

const SECTIONS: SectionLink[] = [
  { id: 'architecture', label: 'Architecture' },
  { id: 'stack', label: 'Stack' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'outcomes', label: 'Outcomes' },
];

export default function TranspahireEngineeringPage() {
  return (
    <DocumentationPage
      eyebrow="Engineering deep-dive"
      title="Transpahire — Engineering"
      description={routes.transpahireEngineering.description}
      crumbs={CRUMBS}
      sections={SECTIONS}
    >
      <Stack gap={16}>
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-[calc(var(--header-height)+var(--space-8))]"
          >
            <Stack gap={4}>
              <Heading id={`${section.id}-heading`} as="h2" size="h2">
                {section.label}
              </Heading>
              <Text tone="mute">
                Section reserved — filled in a later sprint.
              </Text>
            </Stack>
          </section>
        ))}
        <FutureContent note="The engineering deep-dive is written in a later sprint. Its breadcrumb, rail and section structure are in place now." />
      </Stack>
    </DocumentationPage>
  );
}
