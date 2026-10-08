import { defineConfig } from "vitest/config";

// Planned React Native + Expo renderer. For now: the testing spike, option A
// (react-native-testing-mocks + @testing-library/react-native 14 in a custom
// Vitest environment), see docs/adr/0002-spike-react-native.md. Option B
// (react-native-web + happy-dom) is vitest.web.config.ts.
export default defineConfig({
  test: {
    name: "native",
    // installs react-native-testing-mocks (@babel/register + RN native mocks)
    environment: "./spike/rn-environment.ts",
    // RNTL registers its matchers and auto-cleanup only with globals
    globals: true,
    include: ["spike/*.test.{ts,tsx}"],
    pool: "forks",
    // RN ships untranspiled Flow `.js` with `import` syntax: Node >= 22.7
    // would load it as ESM before @babel/register sees it
    execArgv: ["--no-experimental-detect-module"],
    server: {
      deps: {
        // never let Vite transform RN: Node `require`s it through
        // @babel/register (Flow strip + @react-native/babel-preset)
        external: ["react-native", "@react-native"],
      },
    },
  },
});
