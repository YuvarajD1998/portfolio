import {
  ArchitectureLayer,
  ArchitectureNode,
  ArchitecturePanel,
  Callout,
  Text,
} from '@/components';
import { apiIntegration } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §08 API integration — one boundary, typed and centralized (Sprint 08 §08).
 *
 * The client talks to services through a single typed boundary; auth, retries,
 * validation and error shape are solved once. The data-flow is drawn as an
 * accessible ArchitecturePanel (real text, no image-of-code) — S08 §11 diagram
 * strategy.
 */
export function ApiIntegration() {
  return (
    <EngineeringSection
      id="api"
      index="08"
      kicker="API integration"
      title="One boundary, typed and centralized."
      lead="How the client talks to services through a single typed boundary, with errors, loading and validation handled uniformly."
    >
      <PracticePanels
        panels={[
          {
            title: 'The integration boundary',
            points: apiIntegration.boundary,
          },
          {
            title: 'Data flow & error handling',
            points: apiIntegration.dataFlow,
          },
        ]}
      />
      <ArchitecturePanel title="Request path — solved once, at the boundary">
        <ArchitectureLayer label="Outbound">
          <ArchitectureNode>request</ArchitectureNode>
          <ArchitectureNode>interceptor · auth</ArchitectureNode>
          <ArchitectureNode>typed service / thunk</ArchitectureNode>
        </ArchitectureLayer>
        <ArchitectureLayer label="Inbound">
          <ArchitectureNode>validate · Zod</ArchitectureNode>
          <ArchitectureNode>store</ArchitectureNode>
          <ArchitectureNode>UI</ArchitectureNode>
        </ArchitectureLayer>
      </ArchitecturePanel>
      <Callout title="Why one boundary">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {apiIntegration.decision}
        </Text>
      </Callout>
    </EngineeringSection>
  );
}
