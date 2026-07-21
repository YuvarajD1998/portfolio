import { type Metadata } from 'next';

import { Container, Section, Stack } from '@/components/layout';
import { type SectionLink } from '@/components/navigation';
import { routes } from '@/config/navigation';
import { seo } from '@/content/skills';
import {
  CallToAction,
  Certifications,
  CoreExpertise,
  Hero,
  Learning,
  SkillCategories,
  TechnologyInContext,
  Workflow,
} from '@/features/skills';
import { SectionRail } from '@/layouts/SectionRail';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { profilePageJsonLd, serializeJsonLdGraph } from '@/lib/structured-data';

/**
 * Skills & Expertise — the capability, told as context (Sprint 10).
 *
 * The production-ready Skills page at `/skills` (S10 §01). Composed from Sprint
 * 02 card + badge + grid primitives inside the Sprint 03 shell, rendering the
 * frozen skills & philosophy record from Book A §06 of the Content Bible (P10A)
 * — the twelve categories, the core expertise, the workflow and the
 * "continuous learning" principle — verified against the Résumé. It occupies
 * the CAPABILITY altitude: what the engineer works with, grouped and
 * contextualized. Where it names a project (Transpahire §S07) or the Engineering
 * / Experience pages it LINKS OUT to the page that owns that detail — it never
 * re-tells it (S10 governing NOTE). It introduces no new design decisions and
 * touches neither the shell, routing nor navigation (S10 §01 out-of-scope), adds
 * no technology, inflates no proficiency and invents no certification.
 *
 * Narrative order is load-bearing (S10 §02): the five questions a technical
 * reader asks, answered in sequence — what does this engineer work with (hero +
 * category cards), what are the strongest areas (core expertise), how are the
 * skills applied (technology in context), what tools & workflow support delivery
 * (development workflow), what is being explored next (currently learning), then
 * the proof (certifications) and the close (CTA). Each section is an anchored
 * `<section id>` the sticky section rail + scroll-spy steer by (S10 §16). The
 * Hero owns the page's single <h1>; every section is an <h2>, category cards
 * <h3>. Proficiency is shown through applied context, never numeric bars (S10
 * §05 RULE, P10A).
 *
 * SEO (S10 §17): per-route metadata + a Person + ProfilePage JSON-LD graph with
 * `knowsAbout` — the approved P10 §15 model for a page about the person (NOT
 * CreativeWork / SoftwareApplication, which belong to the case-study pages). SEO
 * strings are content-blocker C5, wired against the approved route metadata
 * until the Bible §08 supplies the final set.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: routes.skills.href,
});

/**
 * The section rail (S10 §16). Anchors match each section's `<section id>` so the
 * rail, scroll-spy and deep links all resolve. Order = the §02 narrative.
 */
const SECTIONS: SectionLink[] = [
  { id: 'core-expertise', label: 'Core expertise' },
  { id: 'categories', label: 'Skills by category' },
  { id: 'in-context', label: 'Technology in context' },
  { id: 'workflow', label: 'Development workflow' },
  { id: 'learning', label: 'Currently learning' },
  { id: 'certifications', label: 'Certifications' },
];

/**
 * The Skills page as a Person + ProfilePage graph (S10 §17 RULE). Every string
 * is frozen content: the page description (interim route metadata, C5) and the
 * frozen capability keywords.
 */
const PROFILE_GRAPH = profilePageJsonLd({
  url: absoluteUrl(routes.skills.href),
  description: seo.description,
  knowsAbout: seo.knowsAbout,
});

export default function SkillsPage() {
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
                <CoreExpertise />
                <SkillCategories />
                <TechnologyInContext />
                <Workflow />
                <Learning />
                <Certifications />
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
