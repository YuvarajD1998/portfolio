import { type Metadata } from 'next';

import { routes } from '@/config/navigation';
import { seo } from '@/content/home';
import {
  Architecture,
  Craft,
  FeaturedTranspahire,
  Hero,
  Highlights,
  Intelligence,
  Invitation,
  Philosophy,
  Platform,
  Work,
} from '@/features/home';
import { buildMetadata } from '@/lib/seo';
import { serializeJsonLd, websiteJsonLd } from '@/lib/structured-data';

/**
 * Homepage (Sprint 04).
 *
 * The first real page — composed from Sprint 02 components inside the Sprint 03
 * shell, rendering the frozen copy from the Content Bible (P10A). The section
 * order is the approved P03 narrative and is load-bearing (Sprint 04 §02):
 * Hero → Featured Transpahire → Platform → Architecture → Intelligence →
 * Philosophy → Craft → Work → Highlights → Invitation. The final section reads
 * into the shell's SiteFooter below `main`; this page does not touch the shell.
 *
 * SEO: frozen homepage title/description (P10A §08); Person JSON-LD ships from
 * the root layout, WebSite JSON-LD is added here (Sprint 04 §13).
 */
const base = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: routes.home.href,
});

export const metadata: Metadata = {
  ...base,
  // The homepage title is the full brand line and must NOT take the
  // "%s · Yuvaraj" template suffix the root layout applies to inner pages.
  title: { absolute: seo.title },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd()) }}
      />
      <Hero />
      <FeaturedTranspahire />
      <Platform />
      <Architecture />
      <Intelligence />
      <Philosophy />
      <Craft />
      <Work />
      <Highlights />
      <Invitation />
    </>
  );
}
