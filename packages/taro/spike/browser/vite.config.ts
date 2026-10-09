import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = (value: string) => fileURLToPath(new URL(value, import.meta.url));
export default defineConfig({
  root: path("."),
  plugins: [react()],
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
      {
        find: /^@tarojs\/components$/,
        replacement: "@tarojs/components-react",
      },
      { find: /^@tarojs\/taro$/, replacement: path("./native-browser.ts") },
      {
        find: /^tlbs-map-react$/,
        replacement: path("../support/empty-module.ts"),
      },
    ],
  },
  server: {
    host: "127.0.0.1",
    port: Number(process.env.MINERVA_TARO_BROWSER_PORT ?? 4193),
    strictPort: true,
    fs: { allow: [path("../../../..")] },
  },
});
