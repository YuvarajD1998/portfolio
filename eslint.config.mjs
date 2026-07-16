import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * ESLint flat config — Datum portfolio.
 *
 * Extends Next.js core-web-vitals + TypeScript, then layers the project
 * standards from Playbook §04 and Blueprint §17:
 *   - import ordering & no deep relative imports
 *   - architecture import boundaries (§03): a layer never imports a higher one
 *   - no hardcoded design values is enforced by review + the token discipline
 *     (a pure-lint rule for raw hex/px is added in Sprint 02 with the DS).
 */
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {},
    rules: {
      // Import hygiene (Blueprint §17).
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',

      // No deep relative imports — reach for the @/* alias instead (Sprint 01 §03).
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*'],
              message:
                'Deep relative imports are not allowed. Use the "@/*" path alias.',
            },
          ],
        },
      ],

      // Strict typing discipline (Blueprint §17): no `any` without an explicit
      // acknowledgement in a comment; the rule warns so review can catch it.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
  {
    // Architecture import boundaries (Blueprint §03): primitives never reach up
    // into features or app; the token/util layers stay leaf-level.
    files: ['src/components/primitives/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*', '@/app/*', '@/layouts/*'],
              message:
                'Primitives must not import from features, layouts or app — data flows down, never up (Blueprint §04).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', 'src/tests/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'coverage/**',
      'next-env.d.ts',
      'public/**',
    ],
  },
];

export default eslintConfig;
