'use client';

import { ArrowRight } from 'lucide-react';

import {
  Button,
  Container,
  Eyebrow,
  Heading,
  Link,
  Reveal,
  Section,
  Stack,
  Subheading,
} from '@/components';
import { callToAction } from '@/content/projects';

/**
 * Closing call to action — where do I go from here? (Sprint 06 §02 close).
 *
 * Purpose:      Close the Projects overview and hand the visitor onward, then
 *               read into the Sprint 03 SiteFooter below `main`. It does not
 *               rebuild the footer.
 * Public API:   No props — reads frozen copy from `@/content/projects`.
 * A11y:         Real link styled as a button; the destination is an existing
 *               route (contact). Section labelled by its heading.
 * Composition:  Section → Container(measure) → Reveal → heading + CTA.
 *
 * NOTE: The CTA copy/destination is content-blocker C5 (unwritten in the
 * Bible); it ships wired against the frozen homepage invitation copy and the
 * approved contact route until §07 supplies the final strings.
 */
export function CallToAction() {
  return (
    <Section spacing="lg" aria-labelledby="projects-cta-heading">
      <Container width="measure">
        <Reveal>
          <Stack gap={6}>
            <Eyebrow as="p">{callToAction.eyebrow}</Eyebrow>
            <Heading as="h2" size="h1" id="projects-cta-heading">
              {callToAction.title}
            </Heading>
            <Subheading>{callToAction.lead}</Subheading>
            <div>
              <Button
                asChild
                variant="primary"
                size="lg"
                trailingIcon={ArrowRight}
              >
                <Link href={callToAction.cta.href} variant="quiet">
                  {callToAction.cta.label}
                </Link>
              </Button>
            </div>
          </Stack>
        </Reveal>
      </Container>
    </Section>
  );
}
