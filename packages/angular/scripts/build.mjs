// Builds minerva-design/angular (Angular Package Format) into
// packages/minerva-design/dist/angular with ng-packagr (partial Ivy
// compilation: the Angular linker of the consuming application finishes it,
// so one build serves every Angular 22.x application).
//
// Runs after the core, dom and React builds (`pnpm --filter minerva-design
// build`):
// 1. stages the sources into build/stage (gitignored) with the scoped class
//    names of the React build (src/internal/styles.ts, see ./styles.mjs), so
//    the components use the classes of `minerva-design/style.css`;
// 2. compiles the primary entry (`minerva-design/angular`) and the
//    secondary entry (`minerva-design/angular/monaco`) with ng-packagr,
//    type-checking @minerva/core / @minerva/dom against their built
//    declarations (dist/core, dist/dom);
// 3. rewrites the `@minerva/core` / `@minerva/dom` imports of the FESM
//    bundles and typings to the shared copies in dist/core and dist/dom
//    (tools/core-imports.mjs: the core ships once), and the secondary entry's
//    import of the primary one to a relative path;
// 4. drops the files ng-packagr writes for a standalone npm package
//    (package.json, README): the entries are published through the exports
//    map of minerva-design (scripts/sync-package.mjs).
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { rewriteCoreImports } from "../../../tools/core-imports.mjs";
import { DIST_DIR } from "../../../tools/paths.mjs";
import { scopedStylesSource } from "./styles.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, "..");
const STAGE = join(ROOT, "build/stage");
export const ANGULAR_DIST = join(DIST_DIR, "angular");
const PRIMARY = "@minerva/angular";
/** FESM / typings file names ng-packagr derives from the package name */
const FILE = "minerva-angular";

const json = (path, value) =>
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

const reactDist = join(DIST_DIR, "react");
for (const required of ["core/index.d.ts", "dom/index.d.ts", "react/index.js"])
  if (!existsSync(join(DIST_DIR, required)))
    throw new Error(
      `dist/${required} is missing: build @minerva/core, @minerva/dom and @minerva/react first`,
    );

// 1. stage
rmSync(join(ROOT, "build"), { recursive: true, force: true });
mkdirSync(STAGE, { recursive: true });
const skipTests = (src) =>
  !/\.(test|spec)\.ts$|test-setup\.ts$|[\\/]testing[\\/]/.test(src);
cpSync(join(ROOT, "src"), join(STAGE, "src"), {
  recursive: true,
  filter: skipTests,
});
cpSync(join(ROOT, "monaco"), join(STAGE, "monaco"), {
  recursive: true,
  filter: skipTests,
});
writeFileSync(
  join(STAGE, "src/internal/styles.ts"),
  await scopedStylesSource(reactDist),
);
const own = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const published = JSON.parse(
  readFileSync(join(DIST_DIR, "../package.json"), "utf8"),
);
json(join(STAGE, "package.json"), {
  name: PRIMARY,
  version: published.version,
  sideEffects: false,
  peerDependencies: own.peerDependencies,
  peerDependenciesMeta: own.peerDependenciesMeta,
  dependencies: { "@minerva/core": "0.0.0", "@minerva/dom": "0.0.0" },
});
json(join(STAGE, "ng-package.json"), {
  dest: ANGULAR_DIST,
  deleteDestPath: true,
  lib: { entryFile: "src/index.ts" },
  allowedNonPeerDependencies: ["@minerva/core", "@minerva/dom"],
});
json(join(STAGE, "monaco/ng-package.json"), {
  lib: { entryFile: "index.ts" },
});
const declarations = (path) => [relative(STAGE, join(DIST_DIR, path))];
json(join(STAGE, "tsconfig.lib.json"), {
  compilerOptions: {
    target: "ES2022",
    module: "ES2022",
    moduleResolution: "bundler",
    lib: ["ES2023", "DOM", "DOM.Iterable"],
    strict: true,
    noImplicitOverride: true,
    skipLibCheck: true,
    declaration: true,
    declarationMap: false,
    sourceMap: true,
    inlineSources: true,
    experimentalDecorators: true,
    useDefineForClassFields: false,
    importHelpers: true,
    isolatedModules: true,
    types: [],
    paths: {
      "@minerva/core": declarations("core/index.d.ts"),
      "@minerva/core/styling-hooks": declarations(
        "core/styling-hooks/index.d.ts",
      ),
      "@minerva/dom": declarations("dom/index.d.ts"),
    },
  },
  angularCompilerOptions: {
    compilationMode: "partial",
    strictTemplates: true,
    strictInjectionParameters: true,
    strictInputAccessModifiers: true,
  },
});

// 2. compile
const { ngPackagr } = await import("ng-packagr");
await ngPackagr()
  .forProject(join(STAGE, "ng-package.json"))
  .withTsConfig(join(STAGE, "tsconfig.lib.json"))
  .build();

// 3. imports of the workspace packages and of the primary entry
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
const toPosix = (path) => path.split(sep).join("/");
for (const file of walk(ANGULAR_DIST)) {
  const kind = file.endsWith(".mjs")
    ? "js"
    : file.endsWith(".d.ts")
      ? "d.ts"
      : null;
  if (!kind) continue;
  let code = readFileSync(file, "utf8");
  code = rewriteCoreImports(code, file, kind);
  const primary =
    kind === "js"
      ? join(ANGULAR_DIST, `fesm2022/${FILE}.mjs`)
      : join(ANGULAR_DIST, `types/${FILE}.d.ts`);
  let target = toPosix(relative(dirname(file), primary));
  if (!target.startsWith(".")) target = `./${target}`;
  code = code.replace(/(["'])@minerva\/angular\1/g, `$1${target}$1`);
  if (/["']@minerva\//.test(code))
    throw new Error(`${file}: unresolved @minerva/ import`);
  writeFileSync(file, code);
}

// 4. standalone package files
for (const file of [
  "package.json",
  "README.md",
  ".npmignore",
  "monaco/package.json",
])
  rmSync(join(ANGULAR_DIST, file), { force: true });
rmSync(join(ANGULAR_DIST, "monaco"), { recursive: true, force: true });
console.log(`Built ${relative(process.cwd(), ANGULAR_DIST)}`);
