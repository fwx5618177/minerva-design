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
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run)[\\/]/,
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
