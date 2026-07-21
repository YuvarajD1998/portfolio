'use client';

import { ArrowUpRight, Mail } from 'lucide-react';

import {
  Badge,
  Button,
  Container,
  Eyebrow,
  Heading,
  Reveal,
  Section,
  Stack,
  Subheading,
} from '@/components';
import { hero } from '@/content/contact';

/**
 * Contact hero — an open door, stated plainly (Sprint 12 §03).
 *
 * Purpose:      Name the page, invite contact, frame what a good conversation
 *               looks like, and put the primary CTA up front so a ready reader
 *               never scrolls to act (S12 §03). Holds the page title (the single
 *               <h1>), the frozen identity line, the invitation intro, the
 *               identity chips, the primary CTA (jump to the form) and a
 *               secondary CTA (email directly). Copy is confident but honest —
 *               it adds no availability or response-time claim (S12 §03 RULE, C1).
 * Public API:   No props — reads frozen copy from `@/content/contact`.
 * A11y:         Holds the page's single <h1> (S12 §03 RULE); the <section> is
 *               labelled by that heading's id. Chips are a labelled list; both
 *               CTAs are real, keyboard-operable controls with accessible names.
 * Responsive:   Single measure-width column; chips wrap; CTAs stack then row.
 * Composition:  Section → Container → Reveal → Eyebrow + h1 + positioning +
 *               intro + chips + CTAs. Text-only — no logo wall.
 */
export function Hero() {
  return (
    <Section spacing="lg" aria-labelledby="contact-heading">
      <Container>
        <Reveal>
          <Stack gap={6} className="max-w-[46ch]">
            <Eyebrow as="p">{hero.eyebrow}</Eyebrow>
            <Stack gap={3}>
              <Heading as="h1" size="display" id="contact-heading">
                {hero.title}
              </Heading>
              <Eyebrow as="p" className="text-signal">
                {hero.positioning}
              </Eyebrow>
            </Stack>
            <Subheading>{hero.intro}</Subheading>
            <ul className="flex flex-wrap gap-2" aria-label="Profile summary">
              {hero.chips.map((chip) => (
                <li key={chip}>
                  <Badge tone="neutral">{chip}</Badge>
                </li>
              ))}
            </ul>
          </Stack>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" trailingIcon={ArrowUpRight}>
              <a href={hero.primaryCtaHref}>{hero.primaryCta}</a>
            </Button>
            <Button asChild size="lg" variant="secondary" leadingIcon={Mail}>
              <a href={hero.secondaryCtaHref}>{hero.secondaryCta}</a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
