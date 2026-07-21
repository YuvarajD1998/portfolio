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
import { callToAction } from '@/content/experience';

/**
 * §13 Closing call to action & cross-links — hand the reader onward (Sprint 09
 * §13).
 *
 * The Experience page complements the rest of the portfolio; it routes the reader
 * to the pages that own the detail it only pointed at — the Transpahire case
 * study, the Engineering page, the Projects overview, the Résumé and Contact. CTA
 * copy is a P10A slot not yet frozen (blocker C4); interim source is neutral
 * microcopy + the approved routes. Every destination is an existing/approved-IA
 * route — never dropped or pointed at a placeholder (S09 §13 RULE). It reads into
 * the Sprint 03 SiteFooter below `main` and does not rebuild it.
 */
export function CallToAction() {
  return (
    <Section spacing="lg" aria-labelledby="experience-cta-heading">
      <Container width="measure">
        <Reveal>
          <Stack gap={8}>
            <Eyebrow as="p">{callToAction.eyebrow}</Eyebrow>
            <Heading
              as="h2"
              size="h1"
              id="experience-cta-heading"
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
