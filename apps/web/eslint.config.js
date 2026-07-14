import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  { ignores: ['dist/'] },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    // Layer the TS parser into .vue <script> blocks; eslint-plugin-vue's
    // flat/recommended already sets the outer vue-eslint-parser.
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
