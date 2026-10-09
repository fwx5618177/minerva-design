// Regenerates the "exports" and "typesVersions" maps of package.json:
// - the React entries (dist/react/, ESM + CJS): `.`, `./utils`,
//   `./theme-utils`, `./monaco`, the stylesheets and the prose Sass adapter
// - the core (ESM + CJS): `./core` (dist/dom/core-web: the platform-neutral
//   dist/core/ plus the DOM primitives of dist/dom/), `./styling-hooks`,
//   `./tokens.css`
// - the React Native components (dist/native/, ESM + CJS + the TypeScript
//   sources): `./native`, with `react-native` / `source` conditions for Metro
// - the web components (dist/web-components/, ESM only): the all-in-one
//   `./web-components`, one `./web-components/<name>` entry per element
//   (packages/web-components/src/elements/*.ts), the CDN bundle, the
//   framework typings, the Custom Elements Manifest and the VS Code data.
// - the native Vue 3 renderer (dist/vue/, ESM only): `./vue` and
//   `./vue/global` typings (GlobalComponents of
//   the `app.use(MinervaVue)` plugin).
//   node scripts/sync-package.mjs          (write)
//   node scripts/sync-package.mjs --check  (exit 1 when out of date)
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const pkgPath = `${root}package.json`;
const elementsDir = fileURLToPath(
  new URL("../../web-components/src/elements", import.meta.url),
);

export function elementNames() {
  return readdirSync(elementsDir)
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))
    .map((f) => f.replace(/\.ts$/, ""))
    .sort();
}

/** ESM + CJS entry (`.d.ts` for import, `.d.cts` for require) */
const dual = (base, types = base) => ({
  import: { types: `./dist/${types}.d.ts`, default: `./dist/${base}.js` },
  require: { types: `./dist/${types}.d.cts`, default: `./dist/${base}.cjs` },
});

/** Entries with a `typesVersions` mapping (node10 type resolution) */
export const DUAL_SUBPATHS = {
  utils: ["react/utils-entry"],
  "theme-utils": ["react/theme-utils"],
  monaco: ["react/monaco"],
  core: ["dom/core-web"],
  "styling-hooks": ["core/styling-hooks", "core/styling-hooks/index"],
};

/** ESM-only entries of the Vue renderer (Are the Types Wrong? esm-only profile) */
export const VUE_SUBPATHS = ["./vue"];

/** Reserved for unimplemented platform entries; all current renderers have an initial build. */
export const PLANNED_RENDERERS = {};

/**
 * `./native` (React Native + Expo): Metro (`react-native` condition, package
 * exports on by default since RN 0.79 / Expo SDK 53) gets the ESM build,
 * `source` the TypeScript sources (opt-in `unstable_conditionNames`), Node /
 * Jest the CJS build, TypeScript the declarations of each.
 */
export const NATIVE_ENTRY = {
  source: "./dist/native/source/index.ts",
  "react-native": {
    types: "./dist/native/index.d.ts",
    default: "./dist/native/index.js",
  },
  ...dual("native/index"),
};

export function expectedExports() {
  const exports = { ".": dual("react/index") };
  for (const [name, [base, types]] of Object.entries(DUAL_SUBPATHS)) {
    exports[`./${name}`] = dual(base, types);
  }
  exports["./native"] = NATIVE_ENTRY;
  exports["./angular"] = {
    types: "./dist/angular/types/minerva-angular.d.ts",
    default: "./dist/angular/fesm2022/minerva-angular.mjs",
  };
  exports["./taro"] = {
    types: "./dist/taro/index.d.ts",
    default: "./dist/taro/index.js",
  };
  exports["./uni"] = {
    types: "./dist/uni/index.d.ts",
    default: "./dist/uni/index.js",
  };
  for (const name of ["Button", "Input", "Switch"])
    exports[`./uni/${name}.vue`] = {
      types: `./dist/uni/${name}.vue.d.ts`,
      default: `./dist/uni/${name}.vue`,
    };
  exports["./taro/style.css"] = "./dist/taro/style.css";
  exports["./uni/style.css"] = "./dist/uni/style.css";
  exports["./tokens.mini.css"] = "./dist/core/tokens.mini.css";
  Object.assign(exports, {
    "./style.css": "./dist/react/style.css",
    "./styles/*.css": "./dist/react/styles/*.css",
    "./prose.scss": "./dist/react/prose.scss",
    "./tokens.css": "./dist/core/tokens.css",
    "./web-components": {
      types: "./dist/web-components/index.d.ts",
      default: "./dist/web-components/index.js",
    },
  });
  for (const name of elementNames()) {
    exports[`./web-components/${name}`] = {
      types: `./dist/web-components/elements/${name}.d.ts`,
      default: `./dist/web-components/elements/${name}.js`,
    };
  }
  Object.assign(exports, {
    "./web-components/cdn": "./dist/web-components/cdn/minerva.js",
    "./web-components/react": {
      types: "./dist/web-components/types/react.d.ts",
    },
    "./web-components/vue": { types: "./dist/web-components/types/vue.d.ts" },
    "./web-components/svelte": {
      types: "./dist/web-components/types/svelte.d.ts",
    },
    "./web-components/solid": {
      types: "./dist/web-components/types/solid.d.ts",
    },
    "./vue": {
      types: "./dist/vue/index.d.ts",
      default: "./dist/vue/index.js",
    },
    "./vue/global": { types: "./dist/vue/global.d.ts" },
    "./custom-elements.json": "./custom-elements.json",
    "./html-custom-data.json": "./dist/web-components/html-custom-data.json",
    "./package.json": "./package.json",
  });
  return exports;
}

export function expectedTypesVersions() {
  return {
    "*": {
      ...Object.fromEntries(
        Object.entries(DUAL_SUBPATHS).map(([name, [base, types = base]]) => [
          name,
          [`./dist/${types}.d.ts`],
        ]),
      ),
      native: ["./dist/native/index.d.ts"],
    },
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  const exports = expectedExports();
  const typesVersions = expectedTypesVersions();
  if (process.argv.includes("--check")) {
    if (
      JSON.stringify(pkg.exports) !== JSON.stringify(exports) ||
      JSON.stringify(pkg.typesVersions) !== JSON.stringify(typesVersions)
    ) {
      console.error(
        "package.json exports are out of date: run `pnpm --filter minerva-design sync:package`",
      );
      process.exit(1);
    }
  } else {
    pkg.exports = exports;
    pkg.typesVersions = typesVersions;
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  }
}
