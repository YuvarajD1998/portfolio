import { type Metadata } from 'next';

import { Container, Section, Stack } from '@/components/layout';
import { type SectionLink } from '@/components/navigation';
import { routes } from '@/config/navigation';
import { seo } from '@/content/engineering';
import {
  Accessibility,
  AiEngineering,
  ApiIntegration,
  Authentication,
  BackendIntegration,
  CallToAction,
  CiCd,
  DecisionFramework,
  DesignSystems,
  DeveloperExperience,
  FrontendArchitecture,
  Hero,
  Performance,
  Philosophy,
  StateManagement,
  Testing,
  ToolsAndLearning,
} from '@/features/engineering';
import { SectionRail } from '@/layouts/SectionRail';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { profilePageJsonLd, serializeJsonLdGraph } from '@/lib/structured-data';

/**
 * Engineering — the practice above any one project (Sprint 08).
 *
 * The production-ready Engineering page at `/engineering` (S08 §01). Composed
 * from Sprint 02 components inside the Sprint 03 shell, rendering the frozen
 * engineering & product philosophy from the Content Bible (P10A) and the
 * architecture practices from the Frontend Engineering Blueprint (P10) and
 * Repository Intelligence Report. It occupies the middle altitude — broader than
 * one product, more narrative than a skills matrix — and cites Transpahire (from
 * the Product Book, P10B) only as evidence for a general practice, never as a
 * second copy of the §07 case study. It introduces no new design decisions and
 * touches neither the shell, routing nor navigation (S08 §01 out-of-scope).
 *
 * Narrative order is load-bearing (S08 §02): philosophy first as the lens, then
 * the practice as evidence, closing on how decisions get made. Each movement is
 * an anchored `<section id>` the sticky section rail + scroll-spy steer by
 * (S08 §21). The Hero owns the page's single <h1>; every movement is an <h2>.
 * Progressive disclosure (S08 §20) keeps the narrative approachable while depth
 * stays in accessible <details> panels that remain in the DOM.
 *
 * SEO (S08 §22): per-route metadata + a Person + ProfilePage JSON-LD graph — the
 * approved P10 §15 model for a bio / practice page (NOT CreativeWork /
 * SoftwareApplication, which belong to the case-study pages). SEO strings are
 * content-blocker C8, wired against the approved route metadata until the Bible
 * §08 supplies the final set.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: routes.engineering.href,
});

/**
 * The section rail (S08 §21). Anchors match each movement's `<section id>` so the
 * rail, scroll-spy and deep links all resolve. Order = the §02 narrative:
 * philosophy → architecture & maintainability → AI → perf & a11y → how decisions
 * get made.
 */
const SECTIONS: SectionLink[] = [
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'frontend', label: 'Frontend architecture' },
  { id: 'design', label: 'Design systems' },
  { id: 'state', label: 'State management' },
  { id: 'api', label: 'API integration' },
  { id: 'auth', label: 'Authentication' },
  { id: 'backend', label: 'Backend integration' },
  { id: 'ai', label: 'AI integration' },
  { id: 'performance', label: 'Performance' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'testing', label: 'Testing & quality' },
  { id: 'dx', label: 'Developer experience' },
  { id: 'cicd', label: 'CI/CD' },
  { id: 'decisions', label: 'Decision framework' },
  { id: 'tools', label: 'Tools & learning' },
];

/**
 * The Engineering page as a Person + ProfilePage graph (S08 §22 RULE). Every
 * string is frozen content: the page description (interim route metadata, C8)
 * and the frozen practice-area keywords.
 */
const PROFILE_GRAPH = profilePageJsonLd({
  url: absoluteUrl(routes.engineering.href),
  description: seo.description,
  knowsAbout: seo.knowsAbout,
});

export default function EngineeringPage() {
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
                <Philosophy />
                <FrontendArchitecture />
                <DesignSystems />
                <StateManagement />
                <ApiIntegration />
                <Authentication />
                <BackendIntegration />
                <AiEngineering />
                <Performance />
                <Accessibility />
                <Testing />
                <DeveloperExperience />
                <CiCd />
                <DecisionFramework />
                <ToolsAndLearning />
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
