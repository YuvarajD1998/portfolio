import { Callout, Text } from '@/components';
import { frontendArchitecture } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §05 Frontend architecture — structure you can navigate by name (Sprint 08 §05).
 *
 * The reasoning that makes a codebase maintainable (convention over config,
 * small typed files, composition over config), with Transpahire cited as a
 * worked example at true status (P10B) — never re-narrated as the §07 study.
 */
export function FrontendArchitecture() {
  return (
    <EngineeringSection
      id="frontend"
      index="05"
      kicker="Frontend architecture"
      title="Structure you can navigate by name."
      lead="How a codebase is made maintainable — the reasoning, not just the framework."
    >
      <PracticePanels
        panels={[
          {
            title: 'Component & code organization',
            points: frontendArchitecture.organization,
          },
          {
            title: 'Routing & responsive',
            points: frontendArchitecture.routing,
          },
        ]}
      />
      <Callout title="Evidence, cited — not re-narrated">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {frontendArchitecture.evidence}
        </Text>
      </Callout>
    </EngineeringSection>
  );
}
