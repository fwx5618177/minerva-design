// Vite plugins of the docs site (used by vite.config.ts, unit tested in
// src/i18n/buildPlugins.test.ts).
//
// - docsMetaPlugin: `virtual:docs-meta/<lng>` exports the title and the
//   description of every documentation page of a language. The sidebar, the
//   ⌘K search, the pager and the landing page only need those, so the full
//   page strings (locales/<lng>/docs/<page>.json) are loaded per page.
// - bundleBudgetPlugin: fails the build when a chunk exceeds its budget
//   (locale strings: 250 kB, anything else: Vite's 500 kB warning limit).
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const LOCALES_DIR = join(here, "../src/i18n/locales");

const PREFIX = "virtual:docs-meta/";
const RESOLVED = `\0${PREFIX}`;

/** Keys of a page's strings needed outside the page itself */
export const META_KEYS = ["title", "description"];

/** `{ [page]: { title, description } }` of one language */
export const readDocsMeta = (lng, dir = LOCALES_DIR) => {
  const docsDir = join(dir, lng, "docs");
  const files = readdirSync(docsDir)
    .filter((file) => file.endsWith(".json"))
    .sort();
  const meta = {};
  for (const file of files) {
    const messages = JSON.parse(readFileSync(join(docsDir, file), "utf8"));
    const entry = {};
    for (const key of META_KEYS) {
      if (typeof messages[key] === "string") entry[key] = messages[key];
    }
    meta[file.replace(/\.json$/, "")] = entry;
  }
  return { meta, files: files.map((file) => join(docsDir, file)) };
};

export const docsMetaPlugin = (dir = LOCALES_DIR) => ({
  name: "minerva-docs-meta",
  resolveId(id) {
    return id.startsWith(PREFIX) ? `\0${id}` : undefined;
  },
  load(id) {
    if (!id.startsWith(RESOLVED)) return undefined;
    const lng = id.slice(RESOLVED.length);
    if (!/^[a-z]{2}$/.test(lng)) {
      this.error(`Unknown docs language "${lng}"`);
    }
    const { meta, files } = readDocsMeta(lng, dir);
    for (const file of files) this.addWatchFile(file);
    return `export default JSON.parse(${JSON.stringify(JSON.stringify(meta))});`;
  },
});

export const KB = 1024;
/** Chunks made of locale strings */
export const LOCALE_BUDGET = 250 * KB;
/** Every other chunk (Vite warns above 500 kB) */
export const DEFAULT_BUDGET = 500 * KB;

const isLocaleModule = (id) =>
  /[\\/]i18n[\\/]locales[\\/]/.test(id) || id.startsWith(RESOLVED);

/**
 * Chunks over budget, as human-readable messages.
 * @param {{ fileName: string, code: string, moduleIds: string[] }[]} chunks
 */
export const overBudget = (chunks) => {
  const errors = [];
  for (const chunk of chunks) {
    const size = Buffer.byteLength(chunk.code, "utf8");
    const locale = chunk.moduleIds.some(isLocaleModule);
    const budget = locale ? LOCALE_BUDGET : DEFAULT_BUDGET;
    if (size > budget) {
      errors.push(
        `${chunk.fileName}: ${(size / KB).toFixed(1)} kB > ${budget / KB} kB` +
          (locale ? " (locale strings)" : ""),
      );
    }
  }
  return errors;
};

export const bundleBudgetPlugin = () => ({
  name: "minerva-bundle-budget",
  apply: "build",
  generateBundle(_options, bundle) {
    const chunks = Object.values(bundle).filter(
      (output) => output.type === "chunk",
    );
    const errors = overBudget(chunks);
    if (errors.length > 0) {
      this.error(`Chunks over budget:\n  ${errors.join("\n  ")}`);
    }
  },
});
