// Generates src/docs/api.vue.generated.json: the API of every component of
// the native Vue renderer (minerva-design/vue), read from the single-file
// components' types with vue-component-meta (the Volar language service):
// props (type, default, required, description), emits (with their payload
// signature) and slots (with their slot props).
//
//   node scripts/generate-vue-api.mjs          -> writes the JSON
//   node scripts/generate-vue-api.mjs --check  -> exits 1 when it is stale
//
// Run by `pnpm --filter @minerva/docs build` / `gen:api`; tests/docs checks
// that the committed file is up to date.
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createChecker } from "vue-component-meta";
import { readVue } from "../../../tools/generate-contracts.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const VUE = join(ROOT, "packages/vue");
export const VUE_API_OUTPUT = join(
  ROOT,
  "apps/docs/src/docs/api.vue.generated.json",
);

/**
 * Export name -> single-file component, from the barrels of the renderer
 * (`import Button from "./Button.vue"` / `export { default as X } from
 * "./X.vue"`), restricted to the public exports.
 */
export function vueComponentFiles() {
  const exported = readVue();
  const files = new Map();
  const scan = (file) => {
    const text = readFileSync(file, "utf8");
    for (const [, name, path] of text.matchAll(
      /import\s+(\w+)\s+from\s+["'](\.[^"']+\.vue)["']/g,
    ))
      files.set(name, join(dirname(file), path));
    for (const [, name, path] of text.matchAll(
      /export\s+\{\s*default\s+as\s+(\w+)\s*\}\s+from\s+["'](\.[^"']+\.vue)["']/g,
    ))
      files.set(name, join(dirname(file), path));
  };
  const components = join(VUE, "src/components");
  for (const dir of readdirSync(components)) {
    const index = join(components, dir, "index.ts");
    if (existsSync(index)) scan(index);
  }
  for (const barrel of readdirSync(join(VUE, "src/groups")))
    scan(join(VUE, "src/groups", barrel));
  scan(join(VUE, "src/monaco.ts"));
  return new Map(
    [...files]
      .filter(([name]) => exported.has(name))
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

const clean = (text) =>
  text
    ?.replace(/\s*\|\s*undefined$/, "")
    .replace(/^undefined\s*\|\s*/, "")
    .replace(/\s+/g, " ")
    .trim();

/** The API of every Vue component, by export name */
export function generateVueApi() {
  const checker = createChecker(join(VUE, "tsconfig.json"), {
    forceUseTs: true,
    printer: { newLine: 1 },
  });
  const api = {};
  for (const [name, file] of vueComponentFiles()) {
    const meta = checker.getComponentMeta(file);
    api[name] = {
      file: relative(ROOT, file),
      props: meta.props
        .filter((prop) => !prop.global)
        .map((prop) => ({
          name: prop.name,
          type: clean(prop.type),
          ...(prop.default !== undefined && prop.default !== "undefined"
            ? { default: prop.default }
            : {}),
          required: prop.required,
          ...(prop.description ? { description: prop.description } : {}),
        })),
      events: meta.events.map((event) => ({
        name: event.name,
        type: clean(event.type) || "[]",
        ...(event.description ? { description: event.description } : {}),
      })),
      slots: meta.slots.map((slot) => ({
        name: slot.name,
        type: clean(slot.type),
        ...(slot.description ? { description: slot.description } : {}),
      })),
    };
  }
  return api;
}

export async function serializeVueApi(api = generateVueApi()) {
  const prettier = await import("prettier");
  const options = (await prettier.resolveConfig(VUE_API_OUTPUT)) ?? {};
  return prettier.format(JSON.stringify(api), {
    ...options,
    filepath: VUE_API_OUTPUT,
  });
}

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const next = await serializeVueApi();
  const name = relative(ROOT, VUE_API_OUTPUT);
  if (process.argv.includes("--check")) {
    const current = existsSync(VUE_API_OUTPUT)
      ? readFileSync(VUE_API_OUTPUT, "utf8")
      : "";
    if (current !== next) {
      console.error(
        `${name} is out of date. Run: pnpm --filter @minerva/docs gen:api`,
      );
      process.exit(1);
    }
    console.log(`${name} is up to date`);
  } else {
    writeFileSync(VUE_API_OUTPUT, next);
    console.log(`Wrote ${name}`);
  }
}
