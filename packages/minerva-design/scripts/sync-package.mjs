// Regenerates the "exports" and "typesVersions" maps of package.json:
// - the React entries (dist/react/, ESM + CJS): `.`, `./utils`,
//   `./theme-utils`, `./monaco`, the stylesheets and the prose Sass adapter
// - the core (ESM + CJS): `./core` (dist/dom/core-web: the platform-neutral
//   dist/core/ plus the DOM primitives of dist/dom/), `./styling-hooks`,
//   `./tokens.css`
// - the React Native components (dist/native/, ESM + CJS + the TypeScript
//   sources): `./native`, with `react-native` / `source` conditions for Metro,
//   and `./native/icons` (icon components, the only entry importing the
//   optional react-native-svg peer)
// - the web components (dist/web-components/, ESM only): the all-in-one
//   `./web-components`, one `./web-components/<name>` entry per element
//   (packages/web-components/src/elements/*.ts), the CDN bundle, the
//   framework typings, the Custom Elements Manifest and the VS Code data.
// - the native Vue 3 renderer (dist/vue/, ESM only): `./vue`, the optional
//   `./vue/monaco`, `./vue/charts` (chart components + the opt-in
//   `MinervaVueCharts` plugin) and `./vue/icons` (icon components + the
//   opt-in `MinervaVueIcons` plugin), and the `./vue/global` /
//   `./vue/charts-global` / `./vue/icons-global` typings (GlobalComponents
//   of the `app.use(MinervaVue)` / `app.use(MinervaVueCharts)` /
//   `app.use(MinervaVueIcons)` plugins).
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

/**
 * Deprecated `./uni/<old>.vue` subpaths kept after a rename (old name ->
 * current SFC); the old names are also exported by the uni entry.
 */
export const DEPRECATED_UNI_SFCS = {
  // KanbanBoard was renamed DashboardColumns
  KanbanBoard: "DashboardColumns",
  KanbanCard: "DashboardCard",
  KanbanColumn: "DashboardColumn",
};

/** Entries with a `typesVersions` mapping (node10 type resolution) */
export const DUAL_SUBPATHS = {
  "media-player": ["media-player/index"],
  "media-player/engines": [
    "media-player/engines",
    "media-player/engines/index",
  ],
  ...Object.fromEntries(
    ["hls", "dash", "flv", "native"].map((name) => [
      `media-player/engines/${name}`,
      [`media-player/engines/${name}`],
    ]),
  ),
  utils: ["react/utils-entry"],
  "theme-utils": ["react/theme-utils"],
  monaco: ["react/monaco"],
  core: ["dom/core-web"],
  contracts: ["core/contracts", "core/contracts/index"],
  "styling-hooks": ["core/styling-hooks", "core/styling-hooks/index"],
  // GPU charts: React components and the framework-free engine
  charts: ["charts/index"],
  "charts/core": ["charts/core"],
  // icon set: React components and the framework-free core
  icons: ["icons/index"],
  "icons/core": ["icons/core"],
};

/** ESM-only entries of the Vue renderer (Are the Types Wrong? esm-only profile) */
export const VUE_SUBPATHS = [
  "./vue",
  "./vue/monaco",
  "./vue/charts",
  "./vue/icons",
];

/** Reserved for unimplemented platform entries; all current renderers have an initial build. */
export const PLANNED_RENDERERS = {};

/**
 * `./native` (React Native + Expo): Metro (`react-native` condition, package
 * exports on by default since RN 0.79 / Expo SDK 53) gets the ESM build,
 * `source` the TypeScript sources (opt-in `unstable_conditionNames`), Node /
 * Jest the CJS build, TypeScript the declarations of each.
 */
export const NATIVE_ENTRY = nativeEntry("index");

/** `./native/icons`: the icon components, same conditions as `./native` */
export const NATIVE_ICONS_ENTRY = nativeEntry("icons");

function nativeEntry(name) {
  return {
    source: `./dist/native/source/${name}.ts`,
    "react-native": {
      types: `./dist/native/${name}.d.ts`,
      default: `./dist/native/${name}.js`,
    },
    ...dual(`native/${name}`),
  };
}

export function expectedExports() {
  const exports = { ".": dual("react/index") };
  for (const [name, [base, types]] of Object.entries(DUAL_SUBPATHS)) {
    exports[`./${name}`] = dual(base, types);
  }
  exports["./native"] = NATIVE_ENTRY;
  exports["./native/icons"] = NATIVE_ICONS_ENTRY;
  exports["./angular"] = {
    types: "./dist/angular/types/minerva-angular.d.ts",
    default: "./dist/angular/fesm2022/minerva-angular.mjs",
  };
  exports["./angular/monaco"] = {
    types: "./dist/angular/types/minerva-angular-monaco.d.ts",
    default: "./dist/angular/fesm2022/minerva-angular-monaco.mjs",
  };
  exports["./taro"] = {
    types: "./dist/taro/index.d.ts",
    default: "./dist/taro/index.js",
  };
  exports["./taro/monaco"] = {
    types: "./dist/taro/monaco.d.ts",
    default: "./dist/taro/monaco.js",
  };
  exports["./taro/icons"] = {
    types: "./dist/taro/icons.d.ts",
    default: "./dist/taro/icons.js",
  };
  exports["./uni"] = {
    types: "./dist/uni/index.d.ts",
    default: "./dist/uni/index.js",
  };
  exports["./uni/monaco"] = {
    types: "./dist/uni/monaco.d.ts",
    default: "./dist/uni/monaco.js",
  };
  // Internal SFCs are bundled for relative imports but are not public entries.
  const uniSource = readFileSync(
    new URL("../../uni/src/index.ts", import.meta.url),
    "utf8",
  );
  for (const name of [
    ...uniSource.matchAll(
      /export\s+\{\s*default\s+as\s+\w+\s*\}\s+from\s+["']\.\/([^"']+)\.vue["']/g,
    ),
  ]
    .map((match) => match[1])
    .sort())
    exports[`./uni/${name}.vue`] = {
      types: `./dist/uni/${name}.vue.d.ts`,
      default: `./dist/uni/${name}.vue`,
    };
  // Deprecated subpaths of renamed SFCs, pointing at the new files
  for (const [name, target] of Object.entries(DEPRECATED_UNI_SFCS))
    exports[`./uni/${name}.vue`] = {
      types: `./dist/uni/${target}.vue.d.ts`,
      default: `./dist/uni/${target}.vue`,
    };
  exports["./weapp/types"] = { types: "./dist/weapp/types.d.ts" };
  exports["./taro/style.css"] = "./dist/taro/style.css";
  exports["./uni/style.css"] = "./dist/uni/style.css";
  exports["./tokens.mini.css"] = "./dist/core/tokens.mini.css";
  Object.assign(exports, {
    "./media-player/style.css": "./dist/media-player/style.css",
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
    "./vue/monaco": {
      types: "./dist/vue/monaco.d.ts",
      default: "./dist/vue/monaco.js",
    },
    "./vue/charts": {
      types: "./dist/vue/charts.d.ts",
      default: "./dist/vue/charts.js",
    },
    "./vue/icons": {
      types: "./dist/vue/icons.d.ts",
      default: "./dist/vue/icons.js",
    },
    "./vue/global": { types: "./dist/vue/global.d.ts" },
    "./vue/charts-global": { types: "./dist/vue/charts-global.d.ts" },
    "./vue/icons-global": { types: "./dist/vue/icons-global.d.ts" },
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
      "native/icons": ["./dist/native/icons.d.ts"],
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
