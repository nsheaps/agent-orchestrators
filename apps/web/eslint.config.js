import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

// Minimal browser global set — avoids pulling in the `globals` package for
// the handful of DOM types this app's event handlers actually reference.
const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  console: 'readonly',
  Event: 'readonly',
  HTMLElement: 'readonly',
  HTMLInputElement: 'readonly',
  URL: 'readonly',
  fetch: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
};

export default [
  { ignores: ['dist/'] },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      globals: browserGlobals,
    },
  },
  {
    // Plain .ts files need the TS parser set directly.
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    // .vue files keep vue-eslint-parser (set by flat/recommended) as the outer
    // parser, but delegate <script> block parsing to the TS parser.
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
