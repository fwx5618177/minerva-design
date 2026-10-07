// Regenerates the "exports" map of package.json from src/elements/*.ts:
// one `@minerva/lib-web-components/<name>` entry per element, plus the
// all-in-one entry, the CDN bundle, the design tokens, the manifest and the
// framework typings.
//   node scripts/sync-package.mjs          (write)
//   node scripts/sync-package.mjs --check  (exit 1 when out of date)
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const pkgPath = `${root}package.json`;

export function elementNames() {
  return readdirSync(`${root}src/elements`)
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))
    .map((f) => f.replace(/\.ts$/, ""))
    .sort();
}

export function expectedExports() {
  const exports = {
    ".": { types: "./dist/index.d.ts", default: "./dist/index.js" },
  };
  for (const name of elementNames()) {
    exports[`./${name}`] = {
      types: `./dist/elements/${name}.d.ts`,
      default: `./dist/elements/${name}.js`,
    };
  }
  Object.assign(exports, {
    "./cdn": "./dist/cdn/minerva.js",
    "./tokens.css": "./dist/tokens.css",
    "./custom-elements.json": "./custom-elements.json",
    "./html-custom-data.json": "./dist/html-custom-data.json",
    "./react": { types: "./dist/types/react.d.ts" },
    "./vue": { types: "./dist/types/vue.d.ts" },
    "./svelte": { types: "./dist/types/svelte.d.ts" },
    "./solid": { types: "./dist/types/solid.d.ts" },
    "./package.json": "./package.json",
  });
  return exports;
}

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const next = expectedExports();
if (process.argv.includes("--check")) {
  if (JSON.stringify(pkg.exports) !== JSON.stringify(next)) {
    console.error(
      "package.json exports are out of date: run `node scripts/sync-package.mjs`",
    );
    process.exit(1);
  }
} else if (process.argv[1] === fileURLToPath(import.meta.url)) {
  pkg.exports = next;
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}
