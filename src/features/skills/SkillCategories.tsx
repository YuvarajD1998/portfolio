import { Card, Grid, Stack, Tag, Text } from '@/components';
import { categories, categoriesSection } from '@/content/skills';
import { SkillsSection } from '@/features/skills/SkillsSection';

/**
 * §06–§10 Skill categories — twelve cards, one system (Sprint 10 §05–§10).
 *
 * Renders all TWELVE frozen Book A §06 categories with the single shared card
 * anatomy (S10 §05): a category name (semantic <h3>), a real descriptive
 * sentence of how it was applied, and its technologies as text badges. NONE is
 * added, renamed, split or merged — the grouping is frozen (S10 §10 RULE).
 * Cross-cutting qualities (Architecture, Performance, Accessibility) carry no
 * technology set; the sentence carries the card there (S10 §08). Badges are
 * text with accessible names — no proficiency bars, no logo images (S10 §05
 * Forbidden). A running `nn / 12` index reinforces that the whole set ships.
 */
export function SkillCategories() {
  const total = categories.length;

  return (
    <SkillsSection
      id="categories"
      index="05"
      kicker={categoriesSection.eyebrow}
      title={categoriesSection.title}
      lead={categoriesSection.lead}
    >
      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {categories.map((category, i) => (
          <Card
            key={category.id}
            as="article"
            aria-labelledby={`cat-${category.id}`}
          >
            <Stack gap={3}>
              <div className="flex items-baseline justify-between gap-3">
                <Text
                  as="h3"
                  variant="label"
                  tone="ink"
                  id={`cat-${category.id}`}
                  className="text-body font-semibold tracking-normal normal-case"
                >
                  {category.name}
                </Text>
                <span
                  className="text-mute text-label shrink-0 font-mono"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')} / {total}
                </span>
              </div>
              <Text variant="small" tone="mute" className="leading-[1.4]">
                {category.tagline}
              </Text>
              <Text variant="small" tone="graphite" className="leading-[1.6]">
                {category.description}
              </Text>
              {category.technologies.length > 0 ? (
                <ul
                  className="mt-1 flex flex-wrap gap-1.5"
                  aria-label={`${category.name} technologies`}
                >
                  {category.technologies.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Stack>
          </Card>
        ))}
      </Grid>
    </SkillsSection>
  );
}
