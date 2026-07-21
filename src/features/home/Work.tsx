'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  Reveal,
  Section,
  Stack,
  Stagger,
  StaggerItem,
  Tag,
  Text,
} from '@/components';
import { work } from '@/content/home';

import { SectionIntro } from './SectionIntro';

/**
 * Featured projects — the grid that invites (Sprint 04 §06; P03 §08).
 *
 * A responsive grid of project tiles reusing the S02 Card. Each tile carries a
 * category label, technology tags and is entirely keyboard-reachable: the whole
 * card is one link (`Card as={Link}`), so hover is enhancement, not the only
 * affordance (Sprint 04 §06 RULE). Every project is from the frozen set
 * (P10A §10). All four link to the Projects index until per-project pages ship.
 *
 * A11y:  One link per card (whole-card target ≥44px); consistent card heights;
 *        section labelled by its heading; the trailing glyph is decorative.
 */
export function Work() {
  return (
    <Section aria-labelledby="work-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="work-heading"
            eyebrow={work.eyebrow}
            title={work.title}
            lead={work.lead}
          />

          <Stagger className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
            {work.projects.map((project) => (
              <StaggerItem key={project.name} className="h-full">
                <Card
                  as={Link}
                  href={work.cta.href}
                  interactive
                  padding="lg"
                  className="group focus-visible:outline-signal flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <Stack gap={5} className="h-full">
                    <Flex justify="between" align="start" gap={4}>
                      <Text
                        variant="small"
                        tone="mute"
                        as="span"
                        className="font-mono"
                      >
                        {project.category}
                        <span className="text-hairline"> · </span>
                        {project.org}
                      </Text>
                      <Icon
                        icon={ArrowUpRight}
                        size="sm"
                        className="text-mute group-hover:text-signal shrink-0 transition-colors"
                        aria-hidden
                      />
                    </Flex>
                    <Stack gap={3}>
                      <Heading as="h3" size="h3">
                        {project.name}
                      </Heading>
                      <Text variant="body" tone="graphite">
                        {project.summary}
                      </Text>
                    </Stack>
                    <Flex wrap gap={2} className="mt-auto pt-2">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </Flex>
                  </Stack>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <Button asChild variant="secondary" trailingIcon={ArrowUpRight}>
              <Link href={work.cta.href}>{work.cta.label}</Link>
            </Button>
          </Reveal>
        </Stack>
      </Container>
    </Section>
  );
}
