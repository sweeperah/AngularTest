import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import angular from 'angular-eslint'
import stylistic from '@stylistic/eslint-plugin'
import localRules from './eslint-local-rules/index.js'

export default defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      stylistic.configs.recommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: { '@stylistic': stylistic },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@stylistic/block-spacing': ['error'],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    plugins: { local: localRules },
    rules: {
      'local/blank-line-between-blocks': 'error',
    },
  },
])
