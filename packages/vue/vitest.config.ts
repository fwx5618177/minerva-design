import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

// Planned native Vue 3 renderer. For now: the testing spike (Vue SFCs +
// Vue Test Utils under happy-dom), see docs/adr/0006-spike-vue.md.
export default defineConfig({
  plugins: [vue()],
  test: {
    name: "vue",
    environment: "happy-dom",
    include: ["spike/**/*.test.ts", "src/**/*.test.ts"],
  },
});
