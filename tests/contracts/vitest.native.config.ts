import { createRequire } from "node:module";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const src = (path: string) => fileURLToPath(new URL(path, import.meta.url));
// The React Native toolchain is a dependency of packages/native (React
// 19.2 of Expo SDK 57): resolve it from there, so the driver, RNTL and the
// components share one React.
const nativeRequire = createRequire(src("../../packages/native/package.json"));
const fromNative = (id: string) =>
  dirname(nativeRequire.resolve(`${id}/package.json`));

// The contract suites against minerva-design/native (drivers/native.tsx) on
// the React Native renderer: the Vitest environment of packages/native
// (react-native-testing-mocks + @testing-library/react-native, ADR 0002).
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
    name: "contracts-native",
    root: src("."),
    environment: src("../../packages/native/test/rn-environment.ts"),
    globals: true,
    include: ["native.test.tsx"],
    pool: "forks",
    execArgv: ["--no-experimental-detect-module"],
    server: {
      deps: {
        external: ["react-native", "@react-native"],
      },
    },
  },
});
