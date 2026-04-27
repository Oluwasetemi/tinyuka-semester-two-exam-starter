import setemiojo from '@setemiojo/eslint-config'
import vitestPlugin from '@vitest/eslint-plugin'

export default setemiojo(
  {
    react: true,
    test: true,
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
    ignores: ['.claude/'],
  },
  {
    // type-aware rules that require strictNullChecks — not enabled in this project
    rules: {
      'ts/strict-boolean-expressions': 'off',
      // TypeScript covers undefined-variable checks; no-undef has false positives
      // with @typescript-eslint/parser on JS files (e.g. React 19 `use` hook)
      'no-undef': 'off',
    },
  },
  {
    // type-aware react rules don't apply to plain .jsx files
    files: ['**/*.{js,jsx}'],
    rules: {
      'react/no-implicit-key': 'off',
    },
  },
  {
    // node globals for vite/vitest config files
    files: ['vite.config.*', 'vitest.config.*'],
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
  {
    // vitest globals for test files and setup
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', 'src/testing/**'],
    languageOptions: {
      globals: vitestPlugin.environments.env.globals,
    },
  },
  {
    // exam stubs: function args are intentionally unused until students implement them
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'unused-imports/no-unused-vars': ['error', { args: 'none' }],
    },
  },
)
