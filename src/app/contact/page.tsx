import { type Metadata } from 'next';

import { Container, Section, Stack } from '@/components/layout';
import { routes } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { seo } from '@/content/contact';
import {
  Availability,
  ContactFormSection,
  ContactMethods,
  CrossLinks,
  Faq,
  FinalCta,
  Hero,
  ResumeAccess,
  SocialLinks,
} from '@/features/contact';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { contactPageJsonLd, serializeJsonLdGraph } from '@/lib/structured-data';

/**
 * Contact & Conversion — the last page, and the first message (Sprint 12).
 *
 * The production-ready Contact page at `/contact` (S12 §01). Composed from Sprint
 * 02 card + badge + button + input + grid primitives inside the Sprint 03 shell,
 * rendering the frozen contact facts & copy from Book A (P10A). It is the
 * portfolio's primary CONVERSION point — the fewest, clearest paths to start a
 * conversation, plus a gentle exit for a reader not yet ready (S12 §00 NOTE). It
 * reuses the S11 résumé download and links back to the deeper pages; it re-tells
 * none of them, and touches neither the shell, routing nor navigation (S12 §01
 * out-of-scope).
 *
 * Narrative order is load-bearing (S12 §02): the five questions a reader asks
 * before reaching out, answered top to bottom, then the action made obvious —
 * how do I contact this engineer (hero + methods), what channels exist (methods +
 * social), how do I continue (form), what fits (availability), where are the
 * resources (résumé), and where do I go if not ready yet (cross-links), closed by
 * the final CTA. The Hero owns the page's single <h1>; every section is an <h2>.
 * The primary CTA appears in the hero and again at the close by design (S12 §02).
 *
 * Every visible string is drawn from `@/content/contact`; where a required
 * string is not yet frozen it is honest interim copy against a numbered blocker
 * (C1–C7), never a placeholder (S12 §01 RULE; CLAUDE.md golden rule). The FAQ is
 * content-gated and self-omits while Book A carries no Q&A (C6).
 *
 * SEO (S12 §15): per-route metadata + a Person + ContactPage graph that reuses
 * the same frozen identity and contact facts as the rest of the site — it
 * introduces no new claim.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: routes.contact.href,
});

/**
 * The Contact page as a Person + ContactPage graph (S12 §15 RULE). Carries the
 * frozen email & phone facts as contact points — the same channels the page
 * renders — and introduces no new claim.
 */
const CONTACT_GRAPH = contactPageJsonLd({
  url: absoluteUrl(routes.contact.href),
  description: seo.description,
  email: siteConfig.contact.emailAddress,
  // The phone is a frozen fact surfaced on the page (C2); mirror it in the graph.
  telephone: siteConfig.contact.phone,
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLdGraph(CONTACT_GRAPH),
        }}
      />

      <Hero />

      <Section spacing="md">
        <Container>
          <Stack gap={20}>
            <ContactMethods />
            <ContactFormSection />
            <Availability />
            <SocialLinks />
            <ResumeAccess />
            <Faq />
            <CrossLinks />
          </Stack>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
