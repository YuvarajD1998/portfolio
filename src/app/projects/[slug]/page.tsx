import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Stack } from '@/components/layout';
import { type Crumb, type SectionLink } from '@/components/navigation';
import { Heading, Text } from '@/components/typography';
import { FutureContent } from '@/components/utility';
import { routes } from '@/config/navigation';
import { buildMetadata } from '@/lib/seo';
import { CaseStudyPage } from '@/templates';

/**
 * Project detail — the dynamic case-study route (Sprint 03 §02, §11).
 *
 * `/projects/[slug]` is the spine every case study slots into (P06 §15). The
 * flagship `transpahire` has its own dedicated folder (which wins over this
 * dynamic segment), so this route serves *future* studies. Until content lands,
 * no other slug is known: an unknown slug renders the not-found page, so the
 * route resolves without ever showing an empty page.
 *
 * The known slugs are declared in `KNOWN_SLUGS`; a later sprint replaces this
 * list (and this placeholder) with the real content source.
 */

/** Case studies served by the dynamic route (Transpahire is a dedicated folder). */
const KNOWN_SLUGS: Record<string, { title: string; description: string }> = {
  // Reserved for future case studies; populated in a later sprint.
};

/**
 * Prerender the known slugs at build time and 404 anything else statically
 * (S16 §09). The content is frozen, so the set is closed — there is no genuine
 * need for on-demand rendering. `dynamicParams = false` turns any unknown slug
 * into the segment's not-found page at the edge, without a server render, so
 * the whole route is served as static HTML like every other page.
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return Object.keys(KNOWN_SLUGS).map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = KNOWN_SLUGS[slug];
  // Unknown slug: the component calls notFound() to render the segment's
  // not-found UI; mark the metadata noindex so crawlers don't index it.
  if (!project) return buildMetadata({ noindex: true });
  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `${routes.projects.href}/${slug}`,
  });
}

const SECTIONS: SectionLink[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'results', label: 'Results' },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = KNOWN_SLUGS[slug];
  if (!project) notFound();

  const crumbs: Crumb[] = [
    { label: routes.projects.label, href: routes.projects.href },
    { label: project.title },
  ];

  return (
    <CaseStudyPage
      eyebrow="Case study"
      title={project.title}
      description={project.description}
      crumbs={crumbs}
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
        <FutureContent />
      </Stack>
    </CaseStudyPage>
  );
}
