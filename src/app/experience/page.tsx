import { type Metadata } from 'next';

import { Container, Section, Stack } from '@/components/layout';
import { type SectionLink } from '@/components/navigation';
import { routes } from '@/config/navigation';
import { seo } from '@/content/experience';
import {
  Achievements,
  Arc,
  CallToAction,
  CareerTimeline,
  Collaboration,
  Education,
  Hero,
  Highlights,
  TechnologyByRole,
} from '@/features/experience';
import { SectionRail } from '@/layouts/SectionRail';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { profilePageJsonLd, serializeJsonLdGraph } from '@/lib/structured-data';

/**
 * Experience — the career, told as growth (Sprint 09).
 *
 * The production-ready Experience page at `/experience` (S09 §01). Composed from
 * Sprint 02 timeline + card primitives inside the Sprint 03 shell, rendering the
 * frozen career story from Book A of the Content Bible (P10A) — two roles, the
 * front-end → full-stack arc, education and certifications — verified against the
 * Résumé. It occupies the biographical altitude: the chronology of employment,
 * responsibility and impact. Where it names a project (Transpahire, the §S06
 * projects) or the Engineering practice, it LINKS OUT to the page that owns that
 * detail — it never re-tells it (S09 governing NOTE). It introduces no new design
 * decisions and touches neither the shell, routing nor navigation (S09 §01
 * out-of-scope), and generates no new employment history, dates or claims.
 *
 * Narrative order is load-bearing (S09 §02): the six questions a recruiter asks,
 * answered in sequence — where has this engineer worked (hero + timeline), how
 * has the career progressed (arc), which products & domains (role cards), what
 * was owned & which tech (responsibilities + technology by role), what impact
 * (achievements + highlights), how they work with others (collaboration), then
 * the close. Each section is an anchored `<section id>` the sticky section rail +
 * scroll-spy steer by (S09 §14). The Hero owns the page's single <h1>; every
 * section is an <h2>. Dates are metadata on the timeline node, never the headline
 * (S09 §05 RULE, P06).
 *
 * SEO (S09 §16): per-route metadata + a Person + ProfilePage JSON-LD graph — the
 * approved P10 §15 model for a biographical page (NOT CreativeWork /
 * SoftwareApplication, which belong to the case-study pages). SEO strings are
 * content-blocker C5, wired against the approved route metadata until the Bible
 * §08 supplies the final set.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: routes.experience.href,
});

/**
 * The section rail (S09 §14). Anchors match each section's `<section id>` so the
 * rail, scroll-spy and deep links all resolve. Order = the §02 narrative.
 */
const SECTIONS: SectionLink[] = [
  { id: 'arc', label: 'The career arc' },
  { id: 'timeline', label: 'Career timeline' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'technology', label: 'Technology by role' },
  { id: 'collaboration', label: 'Collaboration & ownership' },
  { id: 'highlights', label: 'Career highlights' },
  { id: 'education', label: 'Education' },
];

/**
 * The Experience page as a Person + ProfilePage graph (S09 §16 RULE). Every
 * string is frozen content: the page description (interim route metadata, C5)
 * and the frozen career keywords.
 */
const PROFILE_GRAPH = profilePageJsonLd({
  url: absoluteUrl(routes.experience.href),
  description: seo.description,
  knowsAbout: seo.knowsAbout,
});

export default function ExperiencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLdGraph(PROFILE_GRAPH),
        }}
      />

      <Hero />

      <Section spacing="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
            <div className="min-w-0">
              <Stack gap={20}>
                <Arc />
                <CareerTimeline />
                <Achievements />
                <TechnologyByRole />
                <Collaboration />
                <Highlights />
                <Education />
              </Stack>
            </div>
            <aside aria-label="Section navigation" className="hidden lg:block">
              <div className="sticky top-[calc(var(--header-height)+var(--space-8))]">
                <SectionRail items={SECTIONS} label="On this page" />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <CallToAction />
    </>
  );
}
