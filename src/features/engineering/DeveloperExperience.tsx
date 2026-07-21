import { Disclosure, Text } from '@/components';
import { developerExperience } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §16 Developer experience — make the right thing the easy thing
 * (Sprint 08 §16).
 *
 * How the codebase is shaped so the next engineer is fast and safe, benchmarked
 * by the month-six-engineer test (P10). The template-lineage honesty ("ecme"
 * package) is DX maturity, held in a depth panel (S08 §16 → progressive
 * disclosure).
 */
export function DeveloperExperience() {
  return (
    <EngineeringSection
      id="dx"
      index="16"
      kicker="Developer experience"
      title="Make the right thing the easy thing."
      lead="Folder organization, documentation, automation and tooling — shaped for the engineer who joins in month six."
    >
      <PracticePanels
        panels={[
          { title: 'The ergonomics', points: developerExperience.ergonomics },
          { title: 'The maintainability test', body: developerExperience.test },
        ]}
      />
      <Disclosure id="dx-honest" summary="Honest status — template lineage">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {developerExperience.honest}
        </Text>
      </Disclosure>
    </EngineeringSection>
  );
}
