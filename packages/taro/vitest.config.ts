import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Planned Taro renderer. For now: the testing spike (Taro components under
// happy-dom through the H5 React implementation), see
// docs/adr/0003-spike-taro.md.
export default defineConfig({
  plugins: [react()],
  // Build-time flags that Taro's own bundler injects. @tarojs/runtime reads
  // them as bare globals at module-eval time; it is pulled in by the Stencil
  // bundle that @tarojs/components-react re-exports.
  define: {
    DEPRECATED_ADAPTER_COMPONENT: "false",
    ENABLE_INNER_HTML: "true",
    ENABLE_ADJACENT_HTML: "true",
    ENABLE_SIZE_APIS: "false",
    ENABLE_TEMPLATE_CONTENT: "true",
    ENABLE_CLONE_NODE: "true",
    ENABLE_CONTAINS: "true",
    ENABLE_MUTATION_OBSERVER: "true",
    "process.env.TARO_ENV": JSON.stringify("h5"),
    "process.env.TARO_PLATFORM": JSON.stringify("web"),
    "process.env.FRAMEWORK": JSON.stringify("react"),
    "process.env.SUPPORT_TARO_POLYFILL": JSON.stringify("disabled"),
  },
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: [
      // Exact match only: components-react itself imports
      // "@tarojs/components/lib/react" and "@tarojs/components/dist/components"
      {
        find: /^@tarojs\/components$/,
        replacement: "@tarojs/components-react",
      },
      {
        find: /^@tarojs\/taro$/,
        replacement: r("./spike/support/taro-mock.ts"),
      },
      // Only used by <Map>; ships only a "module" field and fails to resolve
      {
        find: /^tlbs-map-react$/,
        replacement: r("./spike/support/empty-module.ts"),
      },
    ],
  },
  test: {
    name: "taro",
    exclude: ["spike/device/**", "**/node_modules/**"],
    environment: "happy-dom",
    setupFiles: ["./spike/support/setup.ts"],
    include: ["spike/**/*.test.tsx", "src/**/*.test.{ts,tsx}"],
  },
});
