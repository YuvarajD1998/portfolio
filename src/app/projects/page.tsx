import { type Metadata } from 'next';

import { routes } from '@/config/navigation';
import { featured, projects, seo } from '@/content/projects';
import {
  CallToAction,
  FeaturedBand,
  Hero,
  ProjectsExplorer,
} from '@/features/projects';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import {
  projectsJsonLd,
  serializeJsonLdGraph,
  type ProjectCreativeWork,
} from '@/lib/structured-data';

/**
 * Projects overview — the discovery hub (Sprint 06).
 *
 * The `/projects` index (S06 §11): the full-width featured Transpahire band
 * above a filterable, searchable grid of the four supporting projects, closing
 * into the Sprint 03 footer. Composed from Sprint 02 components inside the
 * Sprint 03 shell, rendering frozen Content-Bible copy (P10A). It introduces no
 * new design decisions and routes onward into each case study.
 *
 * Structure (S06 §02, in order): Hero → FeaturedBand → ProjectsExplorer
 * (toolbar + grid + empty state) → CallToAction.
 *
 * SEO (S06 §14): per-route metadata via the static `metadata` export, plus a
 * Person + CreativeWork-per-project JSON-LD graph (P10 §15 approved model — not
 * CollectionPage). SEO strings are content-blocker C6, wired against the
 * approved route metadata until the Bible §08 supplies the final set.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: routes.projects.href,
});

/**
 * The structured-data graph: the owner as Person, plus one CreativeWork per
 * project. The flagship (featured band) and the four supporting projects are
 * all authored works, so all appear. Every string is frozen content.
 */
const creativeWorks: ProjectCreativeWork[] = [
  {
    name: featured.name,
    description: featured.summary,
    url: absoluteUrl(featured.cta.href),
  },
  ...projects.map((project) => ({
    name: project.name,
    description: project.summary,
    url: absoluteUrl(project.href),
    keywords: project.tags,
  })),
];

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLdGraph(projectsJsonLd(creativeWorks)),
        }}
      />
      <Hero />
      <FeaturedBand />
      <ProjectsExplorer />
      <CallToAction />
    </>
  );
}
