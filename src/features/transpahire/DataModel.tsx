import { Callout, Card, Flex, Grid, Stack, Tag, Text } from '@/components';
import { dataModel } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §13 Data model — ninety models, two deliberate patterns (Sprint 07 §13).
 *
 * The twelve domains of the ~90-model schema and the two recurring patterns that
 * show data-modelling judgment (no-FK audit tables; the canonical-alias
 * pattern). Closes on the GDPR hard-delete-of-embeddings rule, verbatim.
 */
export function DataModel() {
  return (
    <CaseStudySection
      id="data"
      index="10"
      kicker="Data model"
      title="Ninety models, two deliberate patterns."
      lead="The twelve domains of the schema, and the recurring patterns that show data-modelling judgment."
    >
      <Stack gap={3}>
        <Text variant="label" tone="mute" as="h3">
          Twelve domains
        </Text>
        <Flex gap={2} wrap>
          {dataModel.domains.map((domain) => (
            <Tag key={domain}>{domain}</Tag>
          ))}
        </Flex>
      </Stack>

      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        {dataModel.patterns.map((pattern) => (
          <Card key={pattern.title}>
            <Stack gap={2}>
              <Text as="h3" className="text-h3 leading-snug font-semibold">
                {pattern.title}
              </Text>
              <Text variant="small">{pattern.body}</Text>
            </Stack>
          </Card>
        ))}
      </Grid>

      <Callout title="GDPR & counts">{dataModel.note}</Callout>
    </CaseStudySection>
  );
}
