'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import {
  Button,
  Card,
  Container,
  Divider,
  Eyebrow,
  Heading,
  Reveal,
  Section,
  Stack,
  Subheading,
  Text,
} from '@/components';
import { flagship } from '@/content/home';

/**
 * Featured Transpahire — the flagship, teased (Sprint 04 §04; P03 §02).
 *
 * Purpose:      The homepage's centre of gravity. Overview, key value
 *               proposition and a CTA that earns the click into the full case
 *               study. A teaser, not the case study — depth lives there
 *               (Sprint 04 §04 RULE).
 * A11y:         Labelled <section> via its heading id; the CTA is a real link
 *               with a descriptive label; no meaning by colour alone.
 * Responsive:   Single measure-width column; the value prop reads as an
 *               emphasised aside on a bordered card.
 * Composition:  Section → Container → Reveal → intro + value card + CTA.
 */
export function FeaturedTranspahire() {
  return (
    <Section aria-labelledby="transpahire-heading">
      <Container>
        <Reveal>
          <Stack gap={6} className="max-w-[46ch]">
            <Eyebrow as="p">{flagship.eyebrow}</Eyebrow>
            <Heading as="h2" size="h2" id="transpahire-heading">
              {flagship.title}
            </Heading>
            <Subheading>{flagship.summary}</Subheading>
          </Stack>
        </Reveal>

        <Reveal delay={0.05}>
          <Card level="sunken" padding="lg" className="mt-10 max-w-[52ch]">
            <Stack gap={4}>
              <Text variant="label" tone="signal" as="p">
                Why it matters
              </Text>
              <Text variant="body" tone="ink">
                {flagship.value}
              </Text>
              <Divider />
              <Button asChild variant="link" trailingIcon={ArrowRight}>
                <Link href={flagship.cta.href}>{flagship.cta.label}</Link>
              </Button>
            </Stack>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
