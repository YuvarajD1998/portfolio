'use client';

import { ArrowRight } from 'lucide-react';

import {
  Button,
  Card,
  Flex,
  Heading,
  Link,
  List,
  Stack,
  Text,
} from '@/components';
import { roadmap } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §20 Product roadmap & final CTA — where it goes, and where you go
 * (Sprint 07 §20).
 *
 * The roadmap is drawn from real Planned / Flag-gated items in the Product
 * Book, presented as intentions — never as shipped or with an invented date
 * (S07 §20 RULE). The closing CTA routes the reader onward (deep-dive, all
 * work, contact) and closes into the Sprint 03 footer. CTA copy is C7 — neutral
 * destination microcopy against approved routes.
 */
export function Roadmap() {
  return (
    <CaseStudySection
      id="roadmap"
      index="17"
      kicker="Product roadmap & final CTA"
      title="Where it goes, and where you go."
      lead="The roadmap is real Planned and Flag-gated work — intentions, never shipped promises or invented dates."
    >
      <Card>
        <Stack gap={3}>
          <Text variant="label" tone="signal" as="h3">
            Roadmap (from real status)
          </Text>
          <List>
            {roadmap.items.map((item) => (
              <li key={item}>
                <Text as="span" variant="small">
                  {item}
                </Text>
              </li>
            ))}
          </List>
        </Stack>
      </Card>

      <Card level="sunken" padding="lg">
        <Stack gap={4}>
          <Stack gap={2}>
            <Text variant="label" tone="signal" as="p">
              {roadmap.cta.eyebrow}
            </Text>
            <Heading as="h3" size="h3">
              {roadmap.cta.title}
            </Heading>
          </Stack>
          <Flex gap={3} wrap>
            <Button asChild variant="primary" trailingIcon={ArrowRight}>
              <Link href={roadmap.cta.primary.href} variant="quiet">
                {roadmap.cta.primary.label}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={roadmap.cta.secondary.href} variant="quiet">
                {roadmap.cta.secondary.label}
              </Link>
            </Button>
            <Button asChild variant="tertiary">
              <Link href={roadmap.cta.tertiary.href} variant="quiet">
                {roadmap.cta.tertiary.label}
              </Link>
            </Button>
          </Flex>
        </Stack>
      </Card>
    </CaseStudySection>
  );
}
