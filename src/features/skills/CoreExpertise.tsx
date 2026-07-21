import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Card, Grid, Icon, Stack, Text } from '@/components';
import { coreExpertise } from '@/content/skills';
import { SkillsSection } from '@/features/skills/SkillsSection';

/**
 * §04 Core expertise — the strongest areas, up front (Sprint 10 §04).
 *
 * The few areas where depth is deepest, stated before breadth so the reader
 * sees specialization first (S10 §04). Each strength is a short summary card,
 * framed as applied experience (not a label), linking out to where it was
 * proven — the case study (§S07), the Engineering page (§S08) or the Experience
 * page (§S09). No numeric proficiency; the context carries the claim (S10 §04
 * RULE). It names ONLY the strengths Book A records (S10 §04 HONEST).
 */
export function CoreExpertise() {
  return (
    <SkillsSection
      id="core-expertise"
      index="04"
      kicker={coreExpertise.eyebrow}
      title={coreExpertise.title}
      lead={coreExpertise.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {coreExpertise.items.map((item) => (
          <Card key={item.title}>
            <Stack gap={3}>
              <Text variant="label" tone="ink" as="h3">
                {item.title}
              </Text>
              <Text variant="small" tone="graphite" className="leading-[1.6]">
                {item.body}
              </Text>
              <Link
                href={item.href}
                className="text-signal text-label inline-flex items-center gap-1 font-mono tracking-[0.08em] uppercase hover:underline"
              >
                {item.linkLabel}
                <Icon icon={ArrowUpRight} size="sm" />
              </Link>
            </Stack>
          </Card>
        ))}
      </Grid>
    </SkillsSection>
  );
}
