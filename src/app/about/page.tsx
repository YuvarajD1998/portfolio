import { type Metadata } from 'next';

import { routes } from '@/config/navigation';
import { personExtra, seo } from '@/content/about';
import {
  CallToAction,
  CareerJourney,
  CoreValues,
  Introduction,
  LearningGrowth,
  Philosophy,
  ProductThinking,
  WorkingStyle,
} from '@/features/about';
import { buildMetadata } from '@/lib/seo';
import { personJsonLd, serializeJsonLd } from '@/lib/structured-data';

/**
 * About page (Sprint 05).
 *
 * The second real page — composed from Sprint 02 components inside the Sprint 03
 * shell, rendering the About narrative from `@/content/about` (frozen owner
 * facts + owner-signed-off prose; see that file's provenance note). The section
 * order is the approved P02/P06/P07/P08 narrative and is load-bearing
 * (Sprint 05 §02): Introduction → Career journey → Engineering philosophy →
 * Product thinking → Core values → Working style → Learning & growth → Call to
 * action. The final section reads into the shell's SiteFooter below `main`;
 * this page does not touch the shell (Sprint 05 out-of-scope).
 *
 * SEO: About title/description (P10A had no frozen About SEO block — authored
 * from frozen facts, Sprint 05 §13). The base Person JSON-LD ships from the root
 * layout; this page adds an enriched Person graph with only frozen extras
 * (description, homeLocation, knowsAbout).
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: routes.about.href,
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(personJsonLd(personExtra)),
        }}
      />
      <Introduction />
      <CareerJourney />
      <Philosophy />
      <ProductThinking />
      <CoreValues />
      <WorkingStyle />
      <LearningGrowth />
      <CallToAction />
    </>
  );
}
