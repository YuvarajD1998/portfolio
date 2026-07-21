import { Disclosure, Text } from '@/components';
import { authentication } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §09 Authentication & authorization — identity once, authority everywhere
 * (Sprint 08 §09).
 *
 * Authorization is a server concern the UI reflects, cited at scale via
 * Transpahire's single global candidate identity (P10B). The HONEST panel keeps
 * the per-controller guard gap visible — never presented as airtight (S08 §09
 * HONEST).
 */
export function Authentication() {
  return (
    <EngineeringSection
      id="auth"
      index="09"
      kicker="Authentication & authorization"
      title="Identity once, authority everywhere."
      lead="How identity, sessions and role-based access are modeled so authorization is enforced consistently."
    >
      <PracticePanels
        panels={[
          { title: 'The model', points: authentication.model },
          {
            title: 'The decision it demonstrates',
            body: authentication.decision,
          },
        ]}
      />
      <Disclosure id="auth-honest" summary="Honest status — guard coverage">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {authentication.honest}
        </Text>
      </Disclosure>
    </EngineeringSection>
  );
}
