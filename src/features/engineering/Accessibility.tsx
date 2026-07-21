import { accessibility } from '@/content/engineering';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §14 Accessibility engineering — a core principle, not a checklist
 * (Sprint 08 §14).
 *
 * Accessibility woven through the build, matching the frozen "accessibility as a
 * default" pillar. The page must itself meet WCAG 2.2 AA (S08 §14 RULE, §22) —
 * so this section is principle-in-practice, and the page around it lives up to
 * the claim.
 */
export function Accessibility() {
  return (
    <EngineeringSection
      id="accessibility"
      index="14"
      kicker="Accessibility engineering"
      title="A core principle, not a checklist."
      lead="Semantic HTML, keyboard navigation, reduced motion and contrast — built in, not bolted on."
    >
      <PracticePanels
        panels={[
          { title: 'How it’s built in', points: accessibility.builtIn },
          { title: 'Why it’s a principle', body: accessibility.principle },
        ]}
      />
    </EngineeringSection>
  );
}
