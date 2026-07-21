import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Card, Grid, Heading, Icon, Stack, Text } from '@/components';
import { highlights } from '@/content/experience';
import { ExperienceSection } from '@/features/experience/ExperienceSection';

/**
 * §11 Career highlights — the milestones, emphasized (Sprint 09 §11).
 *
 * A curated VIEW of facts already stated in §06–§09 — not new claims (S09 §11
 * RULE). No promotion is asserted (Book A records none between the two
 * employers); the "growth" milestone describes the documented specialist →
 * full-stack scope change. The AI-platform highlight LINKS OUT to the Transpahire
 * case study rather than re-telling it.
 */
export function Highlights() {
  return (
    <ExperienceSection
      id="highlights"
      index="11"
      kicker={highlights.eyebrow}
      title={highlights.title}
      lead={highlights.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {highlights.items.map((item) => (
          <Card key={item.title}>
            <Stack gap={2}>
              <Heading as="h3" size="h3">
                {item.title}
              </Heading>
              <Text variant="small" tone="graphite" className="leading-[1.6]">
                {item.body}
              </Text>
              {'href' in item && item.href ? (
                <Link
                  href={item.href}
                  className="text-signal text-small inline-flex w-fit items-center gap-1 font-medium hover:underline"
                >
                  {item.linkLabel}
                  <Icon icon={ArrowUpRight} size="sm" aria-hidden />
                </Link>
              ) : null}
            </Stack>
          </Card>
        ))}
      </Grid>
    </ExperienceSection>
  );
}
