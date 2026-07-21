import {
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Stack,
  Stagger,
  StaggerItem,
  Tag,
  Text,
} from '@/components';
import { craft } from '@/content/home';

import { SectionIntro } from './SectionIntro';

/**
 * The craft — technical expertise preview (Sprint 04 §08; P03 §07, P08).
 *
 * Capability, not a checklist: each domain is one group with a one-line proof
 * of how it shipped, plus its tools as neutral tags. No progress bars, no
 * self-rated percentages, no exhaustive tool dump (Sprint 04 §08 RULE). The
 * full breakdown lives on the Skills page.
 *
 * A11y:  Groups are cards with an <h3> name; tags are non-interactive labels;
 *        section labelled by its heading.
 */
export function Craft() {
  return (
    <Section spacing="sm" aria-labelledby="craft-heading">
      <Container>
        <Stack gap={12}>
          <SectionIntro
            id="craft-heading"
            eyebrow={craft.eyebrow}
            title={craft.title}
            lead={craft.lead}
          />
          <Stagger>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {craft.groups.map((group) => (
                <StaggerItem key={group.name}>
                  <Card padding="md" className="h-full">
                    <Stack gap={4}>
                      <Heading as="h3" size="h3">
                        {group.name}
                      </Heading>
                      <Text variant="body" tone="graphite">
                        {group.proof}
                      </Text>
                      <Flex wrap gap={2} className="mt-auto">
                        {group.tools.map((tool) => (
                          <Tag key={tool}>{tool}</Tag>
                        ))}
                      </Flex>
                    </Stack>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </Stack>
      </Container>
    </Section>
  );
}
