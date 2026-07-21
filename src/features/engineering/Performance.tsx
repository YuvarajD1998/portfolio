import { Disclosure, Text } from '@/components';
import { performance } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §13 Performance engineering — a default, budgeted (Sprint 08 §13).
 *
 * Performance as a standing constraint enforced against the Sprint 01 budget,
 * matching the frozen philosophy pillar. Any stated figure must be measured or
 * approved; until then it is Content Required (C4), stated honestly in the depth
 * panel — never invented (S08 §13 RULE).
 */
export function Performance() {
  return (
    <EngineeringSection
      id="performance"
      index="13"
      kicker="Performance engineering"
      title="Performance as a default, budgeted."
      lead="Rendering, code splitting, bundle strategy and Core Web Vitals — a constraint checked as work lands, not a late pass."
    >
      <PracticePanels
        panels={[
          { title: 'Techniques', points: performance.techniques },
          { title: 'The discipline', body: performance.discipline },
        ]}
      />
      <Disclosure id="performance-metrics" summary="On stated numbers">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {performance.metricsNote}
        </Text>
      </Disclosure>
    </EngineeringSection>
  );
}
