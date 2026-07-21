'use client';

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import {
  Button,
  Container,
  Eyebrow,
  Heading,
  Reveal,
  Section,
  Stack,
  Subheading,
} from '@/components';
import { callToAction } from '@/content/engineering';

/**
 * Closing call to action — the mind, now legible (Sprint 08 §19).
 *
 * Purpose:      Close the page by inviting the reader deeper — into the
 *               Transpahire case study for the worked example, and to Contact to
 *               start a conversation (S08 §19 CTA). It reads into the Sprint 03
 *               SiteFooter below `main` and does not rebuild it.
 * A11y:         Real links styled as buttons; every destination is an existing
 *               route. Section labelled by its heading; the primary CTA at lg.
 * Composition:  Section → Container(measure) → Reveal → heading + link row.
 *               CTA strings/destinations are content-blocker C7 — interim frozen
 *               source is neutral microcopy + the approved routes.
 */
export function CallToAction() {
  return (
    <Section spacing="lg" aria-labelledby="engineering-cta-heading">
      <Container width="measure">
        <Reveal>
          <Stack gap={8}>
            <Eyebrow as="p">{callToAction.eyebrow}</Eyebrow>
            <Heading
              as="h2"
              size="h1"
              id="engineering-cta-heading"
              className="max-w-[18ch]"
            >
              {callToAction.title}
            </Heading>
            <Subheading className="max-w-[42ch]">
              {callToAction.lead}
            </Subheading>

            <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
              {callToAction.links.map((link) =>
                link.primary ? (
                  <Button
                    key={link.href}
                    asChild
                    size="lg"
                    trailingIcon={ArrowRight}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ) : (
                  <Button
                    key={link.href}
                    asChild
                    variant="link"
                    trailingIcon={ArrowUpRight}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ),
              )}
            </div>
          </Stack>
        </Reveal>
      </Container>
    </Section>
  );
}
