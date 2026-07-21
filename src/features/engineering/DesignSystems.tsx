import { Callout, Text } from '@/components';
import { designSystems } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §06 Design systems — reuse designed, not discovered (Sprint 08 §06).
 *
 * Design systems as a maintainability strategy, not a styling detail. The NOTE
 * keeps this the *approach*, not a re-document of Datum's or Transpahire's own
 * system (S08 §06 NOTE).
 */
export function DesignSystems() {
  return (
    <EngineeringSection
      id="design"
      index="06"
      kicker="Design systems"
      title="Reuse designed, not discovered."
      lead="How tokens, one component library and a consistent prop philosophy serve many surfaces without drift."
    >
      <PracticePanels
        panels={[
          { title: 'System discipline', points: designSystems.discipline },
          { title: 'Why it holds up', points: designSystems.payoff },
        ]}
      />
      <Callout title="Scope of this section">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {designSystems.note}
        </Text>
      </Callout>
    </EngineeringSection>
  );
}
