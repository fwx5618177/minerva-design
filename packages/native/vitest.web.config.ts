import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// The same components rendered through react-native-web in happy-dom (the
// docs site's live previews run on react-native-web): DOM output, ARIA
// mapping, presses as clicks. Native semantics are covered by
// vitest.config.ts (docs/adr/0002-spike-react-native.md, option B).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^react-native$/, replacement: "react-native-web" }],
    extensions: [
      ".web.tsx",
      ".web.ts",
      ".web.js",
      ".tsx",
      ".ts",
      ".mjs",
      ".js",
      ".jsx",
      ".json",
    ],
  },
  test: {
    name: "native-web",
    environment: "happy-dom",
    include: ["src/**/*.web.test.{ts,tsx}"],
    setupFiles: ["./test/web/setup.ts"],
  },
});
