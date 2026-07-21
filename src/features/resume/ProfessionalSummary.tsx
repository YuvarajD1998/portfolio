import { Badge, Stack, Text } from '@/components';
import { summary } from '@/content/resume';
import { ResumeSection } from '@/features/resume/ResumeSection';

/**
 * §04 Professional summary — who this engineer is, in a few lines (Sprint 11 §04).
 *
 * A short, high-signal executive summary — a condensed statement of the
 * professional identity, not a full biography (that lives on the About page,
 * S05). The wording is a faithful CONDENSATION of the frozen profile facts; the
 * exact frozen string is Content Required (C1), reconciled before ship and never
 * rewritten for style or carrying a claim the résumé does not (S11 §04 HONEST).
 */
export function ProfessionalSummary() {
  return (
    <ResumeSection
      id="summary"
      index="04"
      kicker={summary.eyebrow}
      title={summary.title}
    >
      <Stack gap={4}>
        <Text tone="graphite" className="text-body max-w-[60ch] leading-[1.7]">
          {summary.body}
        </Text>
        <Stack gap={2}>
          <Text
            variant="small"
            tone="mute"
            as="h3"
            className="text-label font-mono tracking-[0.08em] uppercase"
          >
            Core stack
          </Text>
          <ul className="flex flex-wrap gap-2" aria-label="Core stack">
            {summary.coreStack.map((tech) => (
              <li key={tech}>
                <Badge tone="neutral">{tech}</Badge>
              </li>
            ))}
          </ul>
        </Stack>
      </Stack>
    </ResumeSection>
  );
}
