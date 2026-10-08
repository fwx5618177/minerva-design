import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// React Native testing spike, option B: the components rendered through
// react-native-web in happy-dom (DOM output, not native semantics).
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
    include: ["spike/web/**/*.test.{ts,tsx}"],
    setupFiles: ["./spike/web/setup.ts"],
  },
});
