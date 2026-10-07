import { defineConfig } from "vitest/config";
import type { Alias } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import tsconfig from "./tsconfig.json" with { type: "json" };

// App path aliases are defined once, in tsconfig.json "paths".
// The @minerva/* entries there only point tsc at workspace sources for
// type-checking; at runtime Vite resolves the built packages instead.
const alias: Alias[] = Object.entries(tsconfig.compilerOptions.paths)
  .filter(([key]) => !key.startsWith("@minerva/"))
  .map(([key, [target]]) => ({
    find: new RegExp(`^${key.replace("*", "")}`),
    replacement: fileURLToPath(
      new URL(target.replace("*", ""), import.meta.url),
    ),
  }));

export default defineConfig({
  base: "/minerva/",
  plugins: [react()],
  resolve: { alias },
  server: {
    port: 3000,
    host: "127.0.0.1",
  },
  build: {
    // Each docs page is its own chunk; keep vendor code in a stable chunk
    rolldownOptions: {
      output: {
        // Split chunks (the Monaco engine below) must still evaluate their
        // modules in import order, across chunk boundaries.
        strictExecutionOrder: true,
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|scheduler|react-router|@remix-run)[\\/]/,
            },
            {
              // Every Minerva custom element (lazy-loaded by the "Web
              // Components" tabs): split into cacheable chunks below 500 kB.
              name: "minerva-web-components",
              test: /lib-web-components[\\/]dist[\\/]/,
              maxSize: 400 * 1024,
            },
            {
              // The Monaco engine (lazy-loaded by the Monaco demo only) is
              // ~2 MB: split it into cacheable chunks below the 500 kB limit.
              name: "monaco-engine",
              test: /node_modules[\\/]monaco-editor[\\/]/,
              maxSize: 450 * 1024,
            },
          ],
        },
      },
    },
  },
  test: {
    name: "sample",
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
