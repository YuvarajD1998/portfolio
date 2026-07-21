'use client';

import * as RadixRadio from '@radix-ui/react-radio-group';
import { Search, X } from 'lucide-react';

import { Flex, IconButton, Select, SelectItem, TextInput } from '@/components';
import {
  categories,
  controls,
  SORT_OPTIONS,
  type SortValue,
} from '@/content/projects';
import { cn } from '@/lib/cn';

/**
 * Projects toolbar — filter chips + sort + search (Sprint 06 §05, §08, §09).
 *
 * Purpose:      The controls that narrow the grid: a single-select category
 *               radio-group (one active, default "All"), a quieter sort control
 *               (default "Recent"), and a labelled search field. State is owned
 *               by the parent `ProjectsExplorer`; this component is controlled.
 * A11y:         Chips are a labelled radio-group (Radix RadioGroup — roving
 *               tabindex, arrow-key operable, `aria-checked` programmatic).
 *               Search has a real associated label (not placeholder-only) and a
 *               clear button. Sort is a labelled Select, keyboard-operable.
 * Responsive:   Chip row wraps; sort + search drop below the chips on narrow
 *               widths and sit to the right on desktop (S06 §13).
 * Composition:  RadioGroup(chips) + sort Select + search TextInput.
 *
 * The chip pills compose Radix RadioGroup primitives directly rather than the
 * dot+label form Radio — a filter chip is a different surface from a form
 * radio, but it must keep the same radio semantics the brief requires (S06 §08).
 */
export function Toolbar({
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  query,
  onQueryChange,
}: {
  activeCategory: string;
  onCategoryChange: (value: string) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <Flex
      direction="column"
      align="stretch"
      gap={5}
      className="lg:flex-row lg:items-end lg:justify-between"
    >
      <RadixRadio.Root
        value={activeCategory}
        onValueChange={onCategoryChange}
        orientation="horizontal"
        aria-label={controls.filterLegend}
        className="flex flex-row flex-wrap gap-2"
      >
        {categories.map((category) => (
          <RadixRadio.Item
            key={category}
            value={category}
            className={cn(
              'text-small inline-flex min-h-11 items-center rounded-full border px-3.5 py-1.5 font-mono transition-colors duration-[var(--dur-instant)]',
              'focus-visible:outline-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              category === activeCategory
                ? 'border-ink bg-ink text-paper'
                : 'border-hairline bg-surface text-graphite hover:border-ink/40',
            )}
          >
            {category}
          </RadixRadio.Item>
        ))}
      </RadixRadio.Root>

      <Flex align="end" gap={3} wrap className="lg:shrink-0">
        <Select
          value={sort}
          onValueChange={(value) => onSortChange(value as SortValue)}
          triggerProps={{ 'aria-label': controls.sortLabel }}
        >
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>

        <div className="relative">
          <span
            aria-hidden
            className="text-mute pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
          >
            <Search size={16} />
          </span>
          <TextInput
            id="projects-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={controls.searchPlaceholder}
            aria-label={controls.searchLabel}
            className="pr-10 pl-9"
          />
          {query ? (
            <IconButton
              icon={X}
              label={controls.searchClearLabel}
              size="md"
              variant="ghost"
              onClick={() => onQueryChange('')}
              className="absolute top-1/2 right-0 -translate-y-1/2"
            />
          ) : null}
        </div>
      </Flex>
    </Flex>
  );
}
