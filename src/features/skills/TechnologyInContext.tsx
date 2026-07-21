import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Card, Grid, Icon, Stack, Text } from '@/components';
import { technologyInContext } from '@/content/skills';
import { SkillsSection } from '@/features/skills/SkillsSection';

/**
 * §11 Technology in context — application, not just familiarity (Sprint 10 §11).
 *
 * Ties capabilities to the projects and career where they were applied — the
 * skills shown in real work — and links OUT to the pages that own the detail
 * (the case study §S07, the Experience page §S09). It invents no new project,
 * outcome or responsibility; context is qualitative and honest, with no
 * fabricated metric (S10 §11 RULE, blocker C-metric).
 */
export function TechnologyInContext() {
  return (
    <SkillsSection
      id="in-context"
      index="11"
      kicker={technologyInContext.eyebrow}
      title={technologyInContext.title}
      lead={technologyInContext.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {technologyInContext.groups.map((group) => (
          <Card key={group.id}>
            <Stack gap={3}>
              <Text variant="label" tone="mute" as="h3">
                {group.label}
              </Text>
              <Text variant="small" tone="graphite" className="leading-[1.6]">
                {group.body}
              </Text>
              <Link
                href={group.href}
                className="text-signal text-label inline-flex items-center gap-1 font-mono tracking-[0.08em] uppercase hover:underline"
              >
                {group.linkLabel}
                <Icon icon={ArrowUpRight} size="sm" />
              </Link>
            </Stack>
          </Card>
        ))}
      </Grid>
    </SkillsSection>
  );
}
