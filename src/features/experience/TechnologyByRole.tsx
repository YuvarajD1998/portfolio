import { Card, Stack, Tag, Text } from '@/components';
import { roles, technologyByRole } from '@/content/experience';
import { ExperienceSection } from '@/features/experience/ExperienceSection';

/**
 * §09 Technology by experience — where the tech was actually used (Sprint 09 §09).
 *
 * Groups technologies by the role and work where they were applied — context,
 * not a keyword cloud (S09 §09 RULE). It reuses the same technology chips as the
 * §06/§07 role cards so a reader can trace each tool back to its role, and it does
 * NOT duplicate or pre-empt the future Skills page (blocker C-skills).
 */
export function TechnologyByRole() {
  const techByRoleId = new Map(
    roles.map((role) => [role.id, role.technologies]),
  );

  return (
    <ExperienceSection
      id="technology"
      index="09"
      kicker={technologyByRole.eyebrow}
      title={technologyByRole.title}
      lead={technologyByRole.lead}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {technologyByRole.groups.map((group) => (
          <Card key={group.roleId}>
            <Stack gap={3}>
              <Text variant="label" tone="mute" as="h3">
                {group.company}
              </Text>
              <ul
                className="flex flex-wrap gap-1.5"
                aria-label={`${group.company} technologies`}
              >
                {(techByRoleId.get(group.roleId) ?? []).map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
              <Text variant="small" tone="graphite" className="leading-[1.6]">
                {group.applied}
              </Text>
            </Stack>
          </Card>
        ))}
      </div>
    </ExperienceSection>
  );
}
