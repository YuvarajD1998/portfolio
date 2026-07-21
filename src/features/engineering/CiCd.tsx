import { Disclosure, Text } from '@/components';
import { cicd } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §17 CI/CD & deployment — gates that catch it before users do (Sprint 08 §17).
 *
 * The pipeline as the enforcement mechanism behind the quality philosophy: every
 * "default" is only real if a gate enforces it. Specific tooling/hosting are
 * stated only where an approved source records them — otherwise Content Required
 * (C5), held honestly in the depth panel (S08 §17 NOTE).
 */
export function CiCd() {
  return (
    <EngineeringSection
      id="cicd"
      index="17"
      kicker="CI/CD & deployment"
      title="Gates that catch it before users do."
      lead="How automated gates protect the main branch and work reaches production predictably."
    >
      <PracticePanels
        panels={[
          { title: 'The gates', points: cicd.gates },
          { title: 'The point', body: cicd.point },
        ]}
      />
      <Disclosure id="cicd-note" summary="On specific tooling & hosting">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {cicd.note}
        </Text>
      </Disclosure>
    </EngineeringSection>
  );
}
