import {
  Callout,
  Card,
  Disclosure,
  Grid,
  List,
  Stack,
  Text,
} from '@/components';
import { aiPipeline } from '@/content/transpahire';
import { CaseStudySection } from '@/features/transpahire/CaseStudySection';

/**
 * §14 AI architecture & resume-parsing pipeline — the AI that never simply
 * fails (Sprint 07 §14).
 *
 * The section that makes the product unique: the cost-first model cascade, the
 * per-capability fallback, and the anti-hallucination spine. The HONEST note —
 * the AI Match Explanation is flag-gated OFF, and vendor model churn is a
 * recurring cost — is in a Disclosure depth panel (S07 §11, §14 HONEST).
 */
export function AiPipeline() {
  return (
    <CaseStudySection
      id="ai"
      index="11"
      kicker="AI architecture & pipeline"
      title="The AI that never simply fails."
      lead="The resume-parsing pipeline, model orchestration, embeddings and telemetry — clear and precise, because this is what makes the product unique."
    >
      <Grid cols={{ base: 1, md: 2, lg: 2 }} gap={6}>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="signal" as="h3">
              {aiPipeline.cascade.label}
            </Text>
            <Text variant="small">{aiPipeline.cascade.body}</Text>
          </Stack>
        </Card>
        <Card>
          <Stack gap={3}>
            <Text variant="label" tone="signal" as="h3">
              Per-capability fallback
            </Text>
            <List>
              {aiPipeline.perCapability.map((item) => (
                <li key={item}>
                  <Text as="span" variant="small">
                    {item}
                  </Text>
                </li>
              ))}
            </List>
          </Stack>
        </Card>
      </Grid>

      <Callout title="Anti-hallucination is the spine">
        {aiPipeline.antiHallucination}
      </Callout>

      <Disclosure id="ai-honest" summary="Flag-gated status & vendor churn">
        {aiPipeline.honest}
      </Disclosure>
    </CaseStudySection>
  );
}
