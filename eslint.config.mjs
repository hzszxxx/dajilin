import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const browserGlobals = {
  console: 'readonly',
  window: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  localStorage: 'readonly',
  sessionStorage: 'readonly',
  fetch: 'readonly',
  crypto: 'readonly',
  WebSocket: 'readonly',
  FormData: 'readonly',
  File: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  IntersectionObserver: 'readonly',
  CustomEvent: 'readonly',
  HTMLElement: 'readonly',
  Element: 'readonly',
  NodeList: 'readonly',
  Event: 'readonly',
  EventTarget: 'readonly',
  process: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
};

export default [
  // Global ignores
  {
    ignores: [
      '**/*.astro',
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'ghost/**',
      'public/**',
      'ai-proxy/dist/**',
    ],
  },

  // Base JS rules for plain JS/MJS files
  {
    ...js.configs.recommended,
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: browserGlobals,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-irregular-whitespace': 'error',
    },
  },

  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: browserGlobals,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'off',
      'no-irregular-whitespace': 'error',
    },
  },
];
