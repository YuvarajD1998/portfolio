'use client';

import { ArrowRight } from 'lucide-react';

import {
  Button,
  Card,
  Container,
  Divider,
  Eyebrow,
  Heading,
  Link,
  Reveal,
  Section,
  Stack,
  Subheading,
  Text,
} from '@/components';
import { featured } from '@/content/projects';

/**
 * Featured project band — the flagship, in its own band (Sprint 06 §04;
 * P07 §05, P08 §05).
 *
 * Purpose:      Transpahire's full-width treatment ABOVE the grid, so it never
 *               competes as a peer and is always first, never filtered out. It
 *               creates curiosity and routes into the case study — it does not
 *               reproduce it.
 * Public API:   No props — reads frozen copy from `@/content/projects`.
 * A11y:         Labelled <section> via its heading id; the CTA is a real link
 *               with a descriptive label; the sunken card is a visual band, not
 *               an interactive target (the CTA is the only affordance).
 * Responsive:   Measure-width intro over a bordered value card; reflows without
 *               cropping key content at any width (S06 §13).
 * Composition:  Section → Container → Reveal → intro + featured card + CTA.
 *
 * NOTE: This band is NEVER rendered inside the grid and is NEVER removed by a
 * filter or search — it lives outside the interactive explorer entirely.
 */
export function FeaturedBand() {
  return (
    <Section spacing="md" aria-labelledby="featured-heading">
      <Container>
        <Reveal>
          <Stack gap={5} className="max-w-[46ch]">
            <Eyebrow as="p">{featured.kicker}</Eyebrow>
            <Heading as="h2" size="h2" id="featured-heading">
              {featured.title}
            </Heading>
            <Subheading>{featured.summary}</Subheading>
          </Stack>
        </Reveal>

        <Reveal delay={0.05}>
          <Card level="sunken" padding="lg" className="mt-10 max-w-[52ch]">
            <Stack gap={4}>
              <Text variant="label" tone="signal" as="p">
                {featured.label}
              </Text>
              <Text variant="body" tone="ink">
                {featured.kicker}
              </Text>
              <Divider />
              <Button asChild variant="link" trailingIcon={ArrowRight}>
                <Link href={featured.cta.href} variant="quiet">
                  {featured.cta.label}
                </Link>
              </Button>
            </Stack>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
