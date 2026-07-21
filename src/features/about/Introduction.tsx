import Image from 'next/image';

import {
  Container,
  Eyebrow,
  Flex,
  Heading,
  Reveal,
  Section,
  Stack,
  Subheading,
  Tag,
  Text,
} from '@/components';
import { intro } from '@/content/about';

/**
 * Introduction — the person, before the résumé (Sprint 05 §03; P07/P08 §04).
 *
 * Purpose:      Set the human register the rest of the page reads in — identity,
 *               a portrait slot and a two-paragraph story. Holds the page's
 *               single <h1> (Sprint 05 §03 RULE).
 * Public API:   No props — reads all copy from `@/content/about`.
 * A11y:         The single <h1> lives here; the identity line is frozen verbatim
 *               (P10A §04). The portrait carries descriptive alt; until an
 *               approved photo asset exists the slot shows a decorative,
 *               aria-hidden datum monogram (see content note) so nothing false
 *               is rendered and the layout does not shift.
 * Responsive:   Portrait beside the text on desktop, above it on mobile; a fixed
 *               aspect ratio reserves space so there is no layout shift.
 * Composition:  Section → Container → two-column Grid (text + portrait).
 */
export function Introduction() {
  const { portrait } = intro;
  return (
    <Section spacing="lg" aria-labelledby="about-heading">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_minmax(220px,300px)] md:gap-16">
          <Reveal>
            <Stack gap={6} className="max-w-[46ch]">
              <Eyebrow as="p">{intro.eyebrow}</Eyebrow>
              <Heading as="h1" size="h1" id="about-heading">
                {intro.title}
              </Heading>
              <Text variant="label" tone="signal" as="p" className="font-mono">
                {intro.identity}
              </Text>
              <Subheading>{intro.lead}</Subheading>
              <Text variant="body" tone="graphite">
                {intro.body}
              </Text>
              <Flex wrap gap={2}>
                {intro.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Flex>
            </Stack>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="border-hairline bg-sunken relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-sm border">
              {portrait.src ? (
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(max-width: 960px) 60vw, 300px"
                  className="object-cover"
                  priority
                />
              ) : (
                // No approved portrait asset exists yet; show a decorative datum
                // monogram (aria-hidden) rather than a fabricated photo. The alt
                // contract and sizing are ready for the real asset to drop in.
                <div
                  aria-hidden
                  className="flex h-full w-full items-center justify-center"
                >
                  <span className="text-mute font-display text-display leading-none">
                    {portrait.monogram}
                  </span>
                  <span className="border-signal pointer-events-none absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2" />
                  <span className="border-signal pointer-events-none absolute right-4 bottom-4 h-6 w-6 border-r-2 border-b-2" />
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
