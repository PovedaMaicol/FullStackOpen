// eslint.config.mjs
import { defineConfig } from 'eslint-define-config';
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser, // Parser de TypeScript
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins:{
      '@typescript-eslint': eslintPlugin, // Cambiado a objeto según el nuevo formato
    },
    rules: {
      // '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-case-declarations': 'off',
    },
    ignores: ['.eslintignore', 'index.js'],
  },
]);