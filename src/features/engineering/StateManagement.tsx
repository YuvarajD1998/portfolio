import { Disclosure, Text } from '@/components';
import { stateManagement } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §07 State management — the right state in the right place (Sprint 08 §07).
 *
 * Why domain, session/display and form state are deliberately separated — a
 * dual-store decision, not a default. The at-scale evidence (28 slices) lives in
 * a Disclosure depth panel (S08 §07 RULE, §20 progressive disclosure).
 */
export function StateManagement() {
  return (
    <EngineeringSection
      id="state"
      index="07"
      kicker="State management"
      title="The right state in the right place."
      lead="How state is partitioned so it stays predictable — the reasoning behind a dual-store choice."
    >
      <PracticePanels
        panels={[
          { title: 'The separation', points: stateManagement.separation },
          {
            title: 'Why it’s a decision, not a default',
            body: stateManagement.decision,
          },
        ]}
      />
      <Disclosure id="state-evidence" summary="The pattern at scale">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {stateManagement.evidence}
        </Text>
      </Disclosure>
    </EngineeringSection>
  );
}
