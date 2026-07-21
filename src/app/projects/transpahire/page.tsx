import { type Metadata } from 'next';

import { Container, Section, Stack } from '@/components/layout';
import { type SectionLink } from '@/components/navigation';
import { routes } from '@/config/navigation';
import { hero, seo } from '@/content/transpahire';
import {
  AiPipeline,
  ApiAuth,
  BackendArchitecture,
  DataModel,
  DesignProcess,
  Features,
  FrontendArchitecture,
  Hero,
  Matching,
  Personas,
  ProductStory,
  Results,
  Roadmap,
  ScalabilitySecurity,
  SystemArchitecture,
  TradeOffs,
  UserJourney,
} from '@/features/transpahire';
import { SectionRail } from '@/layouts/SectionRail';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { caseStudyJsonLd, serializeJsonLdGraph } from '@/lib/structured-data';

/**
 * Transpahire — the flagship case study (Sprint 07).
 *
 * The destination the Sprint 06 featured band and grid route into (P06 §07):
 * the complete long-form case study at `/projects/transpahire`. Composed from
 * Sprint 02 components inside the Sprint 03 shell, rendering the frozen copy
 * from the Content Bible (P10A) and Transpahire Product Book (P10B) at true
 * status. It introduces no new design decisions and touches neither the shell,
 * routing nor navigation.
 *
 * Narrative order is load-bearing (S07 §02) — the movements answer, in
 * sequence, the questions a recruiter and an engineering manager ask. Each
 * movement is an anchored `<section id>` the sticky section rail + scroll-spy
 * steer by (S07 §21). The Hero owns the page's single <h1>; every movement is
 * an <h2>. Progressive disclosure (S07 §11) keeps the narrative approachable
 * while depth stays in accessible <details> panels that remain in the DOM.
 *
 * SEO (S07 §22): per-route metadata + a Person + CreativeWork JSON-LD graph
 * (the approved P10 §15 model — NOT SoftwareApplication). SEO strings are
 * content-blocker C8, wired against the approved route metadata until the Bible
 * §08 supplies the final set.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: routes.transpahire.href,
});

/**
 * The section rail (S07 §21). Anchors match each movement's `<section id>` so
 * the rail, scroll-spy and deep links all resolve. Order = the §02 narrative.
 */
const SECTIONS: SectionLink[] = [
  { id: 'problem', label: 'Product story' },
  { id: 'users', label: 'Users' },
  { id: 'solution', label: 'Solution' },
  { id: 'design', label: 'Design process' },
  { id: 'journey', label: 'User journey' },
  { id: 'system', label: 'System' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'data', label: 'Data model' },
  { id: 'ai', label: 'AI pipeline' },
  { id: 'matching', label: 'Matching' },
  { id: 'api', label: 'API & auth' },
  { id: 'scale', label: 'Scale & security' },
  { id: 'tradeoffs', label: 'Trade-offs' },
  { id: 'results', label: 'Results' },
  { id: 'roadmap', label: 'Roadmap' },
];

/**
 * The flagship as a schema.org CreativeWork authored by the site owner. Every
 * string is frozen content (S07 §22): the positioning summary and the frozen
 * technology summary as keywords.
 */
const CASE_STUDY_GRAPH = caseStudyJsonLd({
  name: hero.title,
  description: hero.summary,
  url: absoluteUrl(routes.transpahire.href),
  keywords: hero.tech,
});

export default function TranspahirePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLdGraph(CASE_STUDY_GRAPH),
        }}
      />

      <Hero />

      <Section spacing="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
            <div className="min-w-0">
              <Stack gap={20}>
                <ProductStory />
                <Personas />
                <Features />
                <DesignProcess />
                <UserJourney />
                <SystemArchitecture />
                <FrontendArchitecture />
                <BackendArchitecture />
                <DataModel />
                <AiPipeline />
                <Matching />
                <ApiAuth />
                <ScalabilitySecurity />
                <TradeOffs />
                <Results />
                <Roadmap />
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
    </>
  );
}
