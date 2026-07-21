import { Card, Grid, Heading, Stack, Text } from '@/components';
import { philosophy } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';

/**
 * §04 Engineering philosophy — the lens the page is read through (Sprint 08 §04).
 *
 * The two frozen pillar sets, rendered as real applied sentences (never a bare
 * list of nouns, S08 §04 RULE). Both sets are the verbatim About philosophy
 * text (P10A) — one canonical copy, not an Engineering-only variant.
 */
function PillarSet({
  title,
  lead,
  pillars,
}: {
  title: string;
  lead: string;
  pillars: readonly { title: string; body: string }[];
}) {
  return (
    <Stack gap={4}>
      <Stack gap={2}>
        <Heading as="h3" size="h3">
          {title}
        </Heading>
        <Text
          tone="graphite"
          variant="small"
          className="max-w-[46ch] leading-[1.6]"
        >
          {lead}
        </Text>
      </Stack>
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={4}>
        {pillars.map((pillar) => (
          <Card key={pillar.title}>
            <Stack gap={2}>
              <Text variant="label" tone="mute" as="h4">
                {pillar.title}
              </Text>
              <Text variant="small" tone="graphite" className="leading-[1.6]">
                {pillar.body}
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}

export function Philosophy() {
  return (
    <EngineeringSection
      id="philosophy"
      index="04"
      kicker="Engineering philosophy"
      title="The principles that govern the work."
      lead={philosophy.engineering.lead}
    >
      <Stack gap={10}>
        <PillarSet
          title={philosophy.engineering.eyebrow}
          lead="How the work gets made — non-negotiable constraints, not aspirations."
          pillars={philosophy.engineering.pillars}
        />
        <PillarSet
          title={philosophy.product.eyebrow}
          lead={philosophy.product.lead}
          pillars={philosophy.product.pillars}
        />
      </Stack>
    </EngineeringSection>
  );
}
