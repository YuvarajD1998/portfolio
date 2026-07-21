import { Callout, Text } from '@/components';
import { backendIntegration } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §10 Backend integration — clear ownership across services (Sprint 08 §10).
 *
 * The engineering decisions that keep multiple services coherent: single
 * authority, stateless compute, one owner of the schema. Repo-scale evidence is
 * verbatim Product-Book fact (P10B), held in a Disclosure — never estimated
 * (S08 §10 RULE).
 */
export function BackendIntegration() {
  return (
    <EngineeringSection
      id="backend"
      index="10"
      kicker="Backend integration"
      title="Clear ownership across services."
      lead="API design, data flow, validation and integration patterns — the decisions that keep services coherent."
    >
      <PracticePanels
        panels={[
          {
            title: 'API & ownership decisions',
            points: backendIntegration.ownership,
          },
          { title: 'Evidence at scale', body: backendIntegration.evidence },
        ]}
      />
      <Callout title="The reusable principle">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {backendIntegration.principle}
        </Text>
      </Callout>
    </EngineeringSection>
  );
}
