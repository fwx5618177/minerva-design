import { createRequire } from "node:module";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const src = (path: string) => fileURLToPath(new URL(path, import.meta.url));
// The React Native toolchain is a dependency of packages/native (React 19.2
// of Expo SDK 57): resolve it from there (one React for the flows, RNTL and
// the components).
const nativeRequire = createRequire(src("../../packages/native/package.json"));
const fromNative = (id: string) =>
  dirname(nativeRequire.resolve(`${id}/package.json`));

// User flows across minerva-design/native components (forms, overlays,
// tabs, pickers, theming) on the React Native renderer, with the Vitest
// environment of packages/native (ADR 0002). Snapshot-free.
export default defineConfig({
  resolve: {
    alias: [
      { find: /^react$/, replacement: fromNative("react") },
      { find: /^react\/(.*)$/, replacement: `${fromNative("react")}/$1` },
      {
        find: /^@testing-library\/react-native(\/.*)?$/,
        replacement: `${fromNative("@testing-library/react-native")}$1`,
      },
      { find: /^test-renderer$/, replacement: fromNative("test-renderer") },
    ],
  },
  test: {
    name: "e2e-native",
    root: src("."),
    environment: src("../../packages/native/test/rn-environment.ts"),
    globals: true,
    include: ["**/*.test.tsx"],
    pool: "forks",
    execArgv: ["--no-experimental-detect-module"],
    passWithNoTests: true,
    server: {
      deps: {
        external: ["react-native", "@react-native"],
      },
    },
  },
});
