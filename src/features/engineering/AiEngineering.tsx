import { Callout, Text } from '@/components';
import { aiEngineering } from '@/content/engineering';
import { AiFlowDiagram } from '@/features/engineering/AiFlowDiagram';
import { EngineeringSection } from '@/features/engineering/EngineeringSection';
import { PracticePanels } from '@/features/engineering/PracticePanels';

/**
 * §12 AI integration engineering — a grounded, governed component
 * (Sprint 08 §12).
 *
 * AI treated as an engineering subsystem with guardrails, not a magic box. The
 * load-bearing principle (a score is worthless without a grounded, inspectable
 * explanation) is verbatim Product-Book fact (P10B); the grounded-AI path is
 * drawn as an accessible inline SVG whose accuracy is a review gate (S08 §12).
 */
export function AiEngineering() {
  return (
    <EngineeringSection
      id="ai"
      index="12"
      kicker="AI integration engineering"
      title="AI as a grounded, governed component."
      lead="AI-integration philosophy, LLM workflows and the architecture principles behind them."
    >
      <PracticePanels
        panels={[
          {
            title: 'AI-integration philosophy',
            points: aiEngineering.philosophy,
          },
          { title: 'The workflows', points: aiEngineering.workflows },
        ]}
      />
      <AiFlowDiagram />
      <Callout title="The load-bearing principle">
        <Text variant="small" tone="graphite" className="leading-[1.6]">
          {aiEngineering.principle}
        </Text>
      </Callout>
    </EngineeringSection>
  );
}
