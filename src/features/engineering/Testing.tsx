import { Disclosure, Text } from '@/components';
import { testing } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §15 Testing & quality — confidence you can ship on (Sprint 08 §15).
 *
 * What earns a test and why — not a coverage-percentage boast. The real
 * Playwright automation practice is honest career record (P10A); no coverage
 * number is claimed unless a source supplies it (S08 §15 HONEST → depth panel).
 */
export function Testing() {
  return (
    <EngineeringSection
      id="testing"
      index="15"
      kicker="Testing & quality"
      title="Confidence you can ship on."
      lead="Unit, component and integration testing framed by a clear quality philosophy — tests exist to make change safe."
    >
      <PracticePanels
        panels={[
          { title: 'The layers', points: testing.layers },
          { title: 'Quality philosophy', body: testing.philosophy },
        ]}
      />
      <Disclosure
        id="testing-honest"
        summary="Honest status — automation & coverage"
      >
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {testing.honest}
        </Text>
      </Disclosure>
    </EngineeringSection>
  );
}
