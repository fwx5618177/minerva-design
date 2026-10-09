import { defineConfig } from "vitest/config";

// Real native definitions and templates under miniprogram-simulate.
// These host tests do not replace WeChat device validation.
export default defineConfig({
  test: {
    name: "weapp",
    setupFiles: ["./src/native-test-setup.ts"],
    // miniprogram-simulate needs a DOM (happy-dom or jsdom); importing it
    // installs the Component / Behavior / wx globals.
    environment: "happy-dom",
    include: ["spike/**/*.test.ts", "src/**/*.test.ts"],
  },
});
