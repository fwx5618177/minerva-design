import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { minifyTemplatesPlugin } from "./scripts/minify-templates.mjs";
import { WEB_COMPONENTS_DIST } from "../../tools/paths.mjs";

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

/**
 * Self-contained ES module for `<script type="module">` / CDN usage
 * (`minerva-design/web-components/cdn`): every element plus Lit, @minerva/core
 * and Floating UI in one minified file, production mode.
 */
export default defineConfig({
  plugins: [minifyTemplatesPlugin()],
  resolve: {
    alias: [
      {
        find: /^@react-styles\//,
        replacement: here("../react/src/"),
      },
    ],
  },
  css: {
    modules: { generateScopedName: "[local]" },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    emptyOutDir: false,
    outDir: `${WEB_COMPONENTS_DIST}/cdn`,
    sourcemap: true,
    target: "es2022",
    minify: true,
    lib: {
      entry: here("./src/index.ts"),
      formats: ["es"],
      fileName: () => "minerva.js",
    },
    rolldownOptions: {
      // Library mode keeps the whitespace of ES output (for the consumer's
      // bundler); the CDN file is loaded as-is by browsers: minify fully.
      output: { minify: true },
    },
  },
});
