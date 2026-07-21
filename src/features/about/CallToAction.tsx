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
import { callToAction } from '@/content/about';

/**
 * Call to action — the close, and the handoff (Sprint 05 §10; P07 §04).
 *
 * Purpose:      Lead the visitor to the next stage of the portfolio, then read
 *               into the Sprint 03 SiteFooter below `main`. It does not rebuild
 *               or duplicate the footer (Sprint 05 §10 RULE).
 * A11y:         Real links styled as buttons; every destination is an existing
 *               route (the Transpahire link points at the flagship case study).
 *               GitHub is not repeated here — it already lives in the footer.
 *               Section labelled by its heading; the primary CTA sits at lg size.
 * Composition:  Section → Container(measure) → Reveal → heading + link row.
 */
export function CallToAction() {
  return (
    <Section spacing="lg" aria-labelledby="cta-heading">
      <Container width="measure">
        <Reveal>
          <Stack gap={8}>
            <Eyebrow as="p">{callToAction.eyebrow}</Eyebrow>
            <Heading
              as="h2"
              size="h1"
              id="cta-heading"
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
