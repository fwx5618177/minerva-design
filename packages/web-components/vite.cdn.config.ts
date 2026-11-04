import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { minifyTemplatesPlugin } from "./scripts/minify-templates.mjs";
import { CDN_OPTIONAL_ENTRIES } from "./scripts/cdn-entries.mjs";
import { WEB_COMPONENTS_DIST } from "../../tools/paths.mjs";

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

/**
 * File built by this run, set by scripts/build-cdn.mjs: `minerva` (default)
 * or an optional entry of scripts/cdn-entries.mjs. One file per run: library
 * mode inlines everything only for a single entry, and each CDN file must be
 * self-contained.
 */
const name = process.env.MINERVA_CDN_ENTRY ?? "minerva";
if (name !== "minerva" && !CDN_OPTIONAL_ENTRIES.includes(name)) {
  throw new Error(`Unknown CDN entry "${name}"`);
}
const entry =
  name === "minerva"
    ? here("./src/index.ts")
    : here(`./src/elements/${name}.ts`);

/**
 * Self-contained ES modules for `<script type="module">` / CDN usage
 * (`dist/web-components/cdn/<name>.js`): `minerva.js` has every element of
 * the all-in-one entry, `<entry>.js` the elements of an optional entry with
 * their engine. Each bundles Lit, @minerva/core and Floating UI in one
 * minified file, production mode.
 */
export default defineConfig({
  plugins: [minifyTemplatesPlugin()],
  resolve: {
    alias: [
      {
        find: /^@react-styles\//,
        replacement: here("../react/src/"),
      },
      // the engines of the optional entries, bundled from their sources
      {
        find: /^minerva-design\/charts\/core$/,
        replacement: here("../charts/src/core.ts"),
      },
      {
        find: /^minerva-design\/icons\/core$/,
        replacement: here("../icons/src/core.ts"),
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
      entry,
      formats: ["es"],
      fileName: () => `${name}.js`,
    },
    rolldownOptions: {
      // Library mode keeps the whitespace of ES output (for the consumer's
      // bundler); the CDN file is loaded as-is by browsers: minify fully.
      output: { minify: true },
    },
  },
});
