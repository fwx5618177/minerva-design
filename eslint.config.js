import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
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
