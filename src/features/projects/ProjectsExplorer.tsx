'use client';

import { useMemo, useState } from 'react';

import {
  Button,
  Container,
  EmptyState,
  Section,
  Stack,
  VisuallyHidden,
} from '@/components';
import {
  ALL_CATEGORY,
  DEFAULT_SORT,
  emptyState,
  projects,
  resultsAnnouncement,
  type SortValue,
} from '@/content/projects';

import { ProjectCard } from './ProjectCard';
import { Toolbar } from './Toolbar';

/**
 * Projects explorer — the filterable, searchable supporting-project grid
 * (Sprint 06 §06, §08, §09, §10).
 *
 * Purpose:      Owns the client-side filter/sort/search state and renders the
 *               toolbar, the result grid and the empty state. The featured
 *               Transpahire band is rendered ABOVE this by the page and is
 *               never part of this data set — the grid holds only the four
 *               supporting projects (S06 §06).
 * A11y:         The visible result count is announced through a polite live
 *               region on every filter/search change (S06 §08/§09). The empty
 *               state is `role="status"` (from the S02 EmptyState).
 * State:        Client memory only — NO query string (IA forbids it, S06 §08).
 * Responsive:   Grid is 1 → 2 → 3 columns (S06 §06/§13); the toolbar reflows.
 * Composition:  Section → Container → intro + Toolbar + live region + grid|empty.
 */
export function ProjectsExplorer() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [sort, setSort] = useState<SortValue>(DEFAULT_SORT);
  const [query, setQuery] = useState('');

  const isFiltering = activeCategory !== ALL_CATEGORY || query.trim() !== '';

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matched = projects.filter((project) => {
      const inCategory =
        activeCategory === ALL_CATEGORY || project.category === activeCategory;
      if (!inCategory) return false;
      if (!needle) return true;
      const haystack = [
        project.name,
        project.org,
        project.category,
        project.summary,
        ...project.tags,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });

    // "Recent" = the frozen source order (P10A §10); "A–Z" sorts by name.
    return sort === 'az'
      ? [...matched].sort((a, b) => a.name.localeCompare(b.name))
      : matched;
  }, [activeCategory, sort, query]);

  const clear = () => {
    setActiveCategory(ALL_CATEGORY);
    setQuery('');
  };

  return (
    <Section spacing="md" aria-labelledby="all-work-heading">
      <Container>
        <Stack gap={10}>
          {/*
           * The grid region needs an accessible name for the landmark, but the
           * Bible has not written a grid heading (part of C1). Rather than
           * improvise a marketing headline, name the region with a structural,
           * visually-hidden heading (S06 §01 — no improvised copy).
           */}
          <VisuallyHidden>
            <h2 id="all-work-heading">Supporting projects</h2>
          </VisuallyHidden>

          <Toolbar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sort={sort}
            onSortChange={setSort}
            query={query}
            onQueryChange={setQuery}
          />

          {/* Polite live region — announces the visible count (S06 §08/§09). */}
          <VisuallyHidden aria-live="polite" role="status">
            {resultsAnnouncement(visible.length)}
          </VisuallyHidden>

          {visible.length > 0 ? (
            /*
             * A plain list, NOT a Stagger/whileInView reveal. Filtering re-mounts
             * these cards while the grid is already on-screen; a scroll-triggered
             * reveal would leave the re-mounted cards stuck at opacity 0 (the
             * "grid becomes empty on filter change" bug). Per S06 §12, filtering
             * and reading are never gated behind motion — the cards are always
             * visible; card hover remains the interactive affordance.
             */
            <ul
              className="grid list-none grid-cols-1 items-stretch gap-6 p-0 md:grid-cols-2 lg:grid-cols-3"
              aria-label="Projects"
            >
              {visible.map((project) => (
                <li key={project.slug} className="h-full">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title={emptyState.message}
              action={
                isFiltering ? (
                  <Button variant="secondary" onClick={clear}>
                    {emptyState.action}
                  </Button>
                ) : undefined
              }
            />
          )}
        </Stack>
      </Container>
    </Section>
  );
}
