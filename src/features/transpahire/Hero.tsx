'use client';

import { ArrowRight } from 'lucide-react';

import {
  Badge,
  Button,
  Container,
  Eyebrow,
  Flex,
  Heading,
  Link,
  Reveal,
  Section,
  Stack,
  Subheading,
} from '@/components';
import { hero } from '@/content/transpahire';

/**
 * Transpahire hero — name it, position it, invite the read (Sprint 07 §03).
 *
 * Purpose:      Set the frame — an AI recruitment platform built solo from an
 *               empty repo to daily production use — and hand the reader into
 *               the story. Product title, one-line positioning, the frozen
 *               summary, a primary + secondary CTA, and the technology summary
 *               chips (S07 §03).
 * Public API:   No props — reads frozen copy from `@/content/transpahire`.
 * A11y:         Holds the page's single <h1> (S07 §03 RULE); the enclosing
 *               <section> is labelled by that heading's id. CTAs are real links
 *               with descriptive labels; chips are a labelled list.
 * Responsive:   Single measure-width column; chips wrap; no layout shift.
 * Composition:  Section → Container → Reveal → Eyebrow + h1 + summary + CTAs +
 *               tech chips. Interim CTA labels/destinations are content-blocker
 *               C1 — see the content file.
 */
export function Hero() {
  return (
    <Section spacing="lg" aria-labelledby="transpahire-heading">
      <Container>
        <Reveal>
          <Stack gap={6} className="max-w-[44ch]">
            <Eyebrow as="p">{hero.eyebrow}</Eyebrow>
            <Stack gap={3}>
              <Heading as="h1" size="display" id="transpahire-heading">
                {hero.title}
              </Heading>
              <Eyebrow as="p" className="text-signal">
                {hero.positioning}
              </Eyebrow>
            </Stack>
            <Subheading>{hero.summary}</Subheading>
            <Flex gap={3} wrap className="mt-2">
              <Button asChild variant="primary" trailingIcon={ArrowRight}>
                <Link href={hero.primaryCta.href} variant="quiet">
                  {hero.primaryCta.label}
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={hero.secondaryCta.href} variant="quiet">
                  {hero.secondaryCta.label}
                </Link>
              </Button>
            </Flex>
          </Stack>
        </Reveal>
        <Reveal delay={0.05}>
          <Stack gap={3} className="mt-10">
            <Eyebrow as="p">Built with</Eyebrow>
            <ul
              className="flex flex-wrap gap-2"
              aria-label="Technology summary"
            >
              {hero.tech.map((tech) => (
                <li key={tech}>
                  <Badge tone="neutral">{tech}</Badge>
                </li>
              ))}
            </ul>
          </Stack>
        </Reveal>
      </Container>
    </Section>
  );
}
