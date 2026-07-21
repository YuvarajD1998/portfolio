import {
  Container,
  Section,
  Stack,
  Stagger,
  StaggerItem,
  StatisticBlock,
} from '@/components';
import { highlights } from '@/content/home';

import { SectionIntro } from './SectionIntro';

/**
 * Career highlights — the track record, briefly (Sprint 04 §09; P03 §08,
 * P10A §04/§05). Concise, factual, from the frozen owner profile: four figures
 * that read as increasing scope, not a job list. Every number traces to a
 * source and none is rounded up (Sprint 04 §09 RULE); the full history lives
 * on Experience and the Resume.
 *
 * A11y:  Each figure reads value-then-caption in source order, so a screen
 *        reader hears "4+ — years building for the web". Section labelled by
 *        its heading.
 */
export function Highlights() {
  return (
    <Section spacing="sm" aria-labelledby="highlights-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="highlights-heading"
            eyebrow={highlights.eyebrow}
            title={highlights.title}
            lead={highlights.lead}
          />
          <Stagger>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {highlights.stats.map((stat) => (
                <StaggerItem key={stat.caption}>
                  <StatisticBlock value={stat.value} caption={stat.caption} />
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </Stack>
      </Container>
    </Section>
  );
}
