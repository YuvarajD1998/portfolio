'use client';

import { ArrowUpRight, Mail } from 'lucide-react';

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
import { callToAction } from '@/content/contact';

/**
 * §13 Final call-to-action — the last, clearest invitation (Sprint 12 §13).
 *
 * The page — and the site — closes by making the single most likely next action
 * obvious: reach out. It reinforces the primary CTA (jump to the form) and
 * restates the primary channel (email), reusing the same frozen contact facts as
 * the hero and §11 (S12 §13 RULE). Microcopy is the frozen Book A set; interim
 * wording until the closing string is frozen (C7) — warm, no urgency or scarcity.
 * Reads into the Sprint 03 SiteFooter below `main` and does not rebuild it.
 */
export function FinalCta() {
  return (
    <Section spacing="lg" aria-labelledby="contact-cta-heading">
      <Container width="measure">
        <Reveal>
          <Stack gap={8}>
            <Eyebrow as="p">{callToAction.eyebrow}</Eyebrow>
            <Heading
              as="h2"
              size="h1"
              id="contact-cta-heading"
              className="max-w-[18ch]"
            >
              {callToAction.title}
            </Heading>
            <Subheading className="max-w-[42ch]">
              {callToAction.lead}
            </Subheading>

            <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" trailingIcon={ArrowUpRight}>
                <a href={callToAction.primaryCtaHref}>
                  {callToAction.primaryCta}
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" leadingIcon={Mail}>
                <a href={callToAction.email.href}>{callToAction.email.label}</a>
              </Button>
            </div>
          </Stack>
        </Reveal>
      </Container>
    </Section>
  );
}
