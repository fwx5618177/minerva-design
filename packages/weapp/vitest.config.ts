import { defineConfig } from "vitest/config";

// Planned WeChat mini-program renderer. For now: the testing spike (native
// custom components under miniprogram-simulate, object-form load), see
// docs/adr/0004-spike-wechat-miniprogram.md.
export default defineConfig({
  test: {
    name: "weapp",
    // miniprogram-simulate needs a DOM (happy-dom or jsdom); importing it
    // installs the Component / Behavior / wx globals.
    environment: "happy-dom",
    include: ["spike/**/*.test.ts", "src/**/*.test.ts"],
  },
});
