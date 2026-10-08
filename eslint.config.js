import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";
import globals from "globals";

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
    files: [
      "packages/lib-core/src/**/*.{ts,tsx}",
      "packages/sample/src/**/*.{ts,tsx}",
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
      "packages/lib-core/src/**/*.tsx",
      "packages/sample/src/**/*.tsx",
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
    files: ["packages/sample/src/**/*.{ts,tsx}"],
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
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  prettier,
);
