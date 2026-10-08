import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";
import globals from "globals";

/** Browser / DOM globals a platform-neutral module must not touch */
const BROWSER_GLOBALS = [
  "window",
  "document",
  "navigator",
  "location",
  "history",
  "localStorage",
  "sessionStorage",
  "getComputedStyle",
  "matchMedia",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "requestIdleCallback",
  "customElements",
  "HTMLElement",
  "Element",
  "Node",
  "Document",
  "ShadowRoot",
  "DocumentFragment",
  "Event",
  "CustomEvent",
  "KeyboardEvent",
  "PointerEvent",
  "MouseEvent",
  "FocusEvent",
  "MutationObserver",
  "ResizeObserver",
  "IntersectionObserver",
  "CSS",
];

export default defineConfig(
  globalIgnores(["**/dist/", "**/coverage/"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // `const { a, ...rest } = x` drops `a` on purpose
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
    },
  },
  {
    // @minerva/core is platform-neutral (React Native / Hermes, mini-program
    // engines, Node): no DOM / browser globals, no DOM or framework imports.
    // DOM code belongs in @minerva/dom. src/platform-neutral.test.ts checks
    // the same at runtime.
    files: ["packages/core/src/**/*.ts"],
    languageOptions: {
      globals: { ...globals.es2022, ...globals.node },
    },
    rules: {
      "no-restricted-globals": [
        "error",
        ...BROWSER_GLOBALS.map((name) => ({
          name,
          message: `@minerva/core is platform-neutral: "${name}" is a browser global (move DOM code to @minerva/dom).`,
        })),
      ],
      "no-restricted-properties": [
        "error",
        ...["window", "document", "navigator"].map((property) => ({
          object: "globalThis",
          property,
          message: "@minerva/core is platform-neutral (no DOM access).",
        })),
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@minerva/dom",
                "@floating-ui/*",
                "lit",
                "lit/*",
                "react",
                "react-dom",
                "react-dom/*",
                "react-native",
                "vue",
                "@angular/*",
                "@tarojs/*",
              ],
              message:
                "@minerva/core is platform-neutral: no DOM or framework imports.",
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      "packages/react/src/**/*.{ts,tsx}",
      "packages/native/src/**/*.{ts,tsx}",
      "apps/docs/src/**/*.{ts,tsx}",
    ],
    plugins: {
      "react-hooks": reactHooks,
    },
    // Full React-Compiler-era rule set (refs during render, setState in
    // effects, purity, immutability, ...) on top of the classic hook rules.
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
    },
  },
  {
    // Accessibility rules for every React source (library, docs site, e2e).
    files: [
      "packages/react/src/**/*.tsx",
      "apps/docs/src/**/*.tsx",
      "tests/e2e/**/*.tsx",
    ],
    ...jsxA11y.flatConfigs.recommended,
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      // Scrollable regions must be keyboard focusable (axe
      // "scrollable-region-focusable"): allow tabIndex on labelled regions.
      "jsx-a11y/no-noninteractive-tabindex": [
        "error",
        { tags: [], roles: ["tabpanel", "region"] },
      ],
    },
  },
  {
    files: ["apps/docs/src/**/*.{ts,tsx}"],
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Platform testing spikes of the planned renderers (packages/*/spike,
    // docs/adr): third-party runtimes with loose typings (mini-program
    // `Component` / `wx` globals, j-component, RNTL matchers).
    files: ["packages/*/spike/**/*.{js,ts,tsx}"],
    languageOptions: {
      globals: { Component: "readonly", Behavior: "readonly", wx: "readonly" },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: "^T",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  prettier,
);
