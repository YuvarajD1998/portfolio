import { type Metadata } from 'next';

import { Container, Section, Stack } from '@/components/layout';
import { routes } from '@/config/navigation';
import { seo } from '@/content/resume';
import {
  CallToAction,
  Certifications,
  CrossLinks,
  DownloadSection,
  Education,
  EmploymentSummary,
  Hero,
  Highlights,
  ProfessionalSummary,
  SkillsSnapshot,
} from '@/features/resume';
import { buildMetadata } from '@/lib/seo';
import { personJsonLd, serializeJsonLdGraph } from '@/lib/structured-data';

/**
 * Resume / CV — the whole case, on one page (Sprint 11).
 *
 * The production-ready Resume page at `/resume` (S11 §01). Composed from Sprint
 * 02 card + badge + button + grid primitives inside the Sprint 03 shell,
 * rendering the frozen résumé & profile record from Book A (P10A) — re-using the
 * same frozen content the About / Experience / Skills pages render so a fact
 * stated here and there resolves to the SAME source string (S11 §08). It occupies
 * the SUMMARY altitude: the fewest facts a hiring decision needs, plus the
 * downloadable document. Where it names a role, project or skill it CONDENSES and
 * LINKS OUT to the owning page — it never re-tells it (S11 governing principle).
 * It introduces no new design decisions and touches neither the shell, routing
 * nor navigation (S11 §01 out-of-scope).
 *
 * Narrative order is load-bearing (S11 §02): the questions a hiring reader asks,
 * answered top to bottom — who is this engineer (hero + professional summary),
 * what are the key qualifications (highlights), what experience & education
 * (employment + education + certifications), what are the primary strengths
 * (skills snapshot), where do I get the résumé (download section, reinforcing the
 * hero CTA), and where's the full story (cross-links, then the close). The Hero
 * owns the page's single <h1>; every section is an <h2>. The download CTA appears
 * twice by design — once in the hero, once in the dedicated section — because the
 * reader may decide to download at either moment (S11 §02).
 *
 * SEO (S11 §15): per-route metadata + a Person graph that reuses the same frozen
 * identity facts as the rest of the site — it introduces no new claim. SEO
 * strings are content-blocker C5, wired against the approved route metadata until
 * the Bible §08 supplies the final set.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: routes.resume.href,
});

/**
 * The Resume page as a Person graph (S11 §15 RULE). Reuses the frozen identity
 * facts — the page description (interim route metadata, C5) and the frozen
 * capability keywords — and introduces no new claim.
 */
const PERSON_GRAPH = personJsonLd({
  description: seo.description,
  homeLocation: 'Bengaluru, India',
  knowsAbout: seo.knowsAbout,
});

export default function ResumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLdGraph([PERSON_GRAPH]),
        }}
      />

      <Hero />

      <Section spacing="md">
        <Container>
          <Stack gap={20}>
            <ProfessionalSummary />
            <Highlights />
            <EmploymentSummary />
            <Education />
            <Certifications />
            <SkillsSnapshot />
            <DownloadSection />
            <CrossLinks />
          </Stack>
        </Container>
      </Section>

      <CallToAction />
    </>
  );
}
