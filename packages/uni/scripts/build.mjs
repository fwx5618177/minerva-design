// Preserve SFCs: uni-app's own compiler must transform native view/input/switch tags.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import ts from "typescript";
import { resolve } from "node:path";
import { rewriteSpecifiers } from "../../../tools/dual-declarations.mjs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const dir = fileURLToPath(
  new URL("../../minerva-design/dist/uni/", import.meta.url),
);
// Charts: only the DOM-free canvas entry of @minerva/charts. dist/charts has
// no `canvas.js` entry, so `charts-canvas.js` re-exports its preserved
// engine modules (never the WebGPU / WebGL2 renderers).
const CHARTS = "@minerva/charts/canvas";
const chartsSpecifier = (source) =>
  source.replaceAll(`"${CHARTS}"`, '"./charts-canvas.js"');
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
execFileSync("pnpm", ["exec", "vue-tsc", "-p", "tsconfig.build.json"], {
  stdio: "inherit",
});
for (const name of readdirSync(new URL("../src/", import.meta.url))) {
  if (name.endsWith(".ts") && !name.endsWith(".test.ts")) {
    const source = readFileSync(
      new URL(`../src/${name}`, import.meta.url),
      "utf8",
    );
    const js = chartsSpecifier(
      ts
        .transpileModule(source, {
          compilerOptions: {
            target: ts.ScriptTarget.ES2022,
            module: ts.ModuleKind.ESNext,
          },
        })
        .outputText.replaceAll("@minerva/core", "../core/index.js")
        .replaceAll("@minerva/dom", "../dom/index.js")
        .replace(/from (["'])(\.\/[^"']+)(["'])/g, (all, q, path) =>
          path.endsWith(".vue") || path.endsWith(".js")
            ? all
            : `from ${q}${path}.js${q}`,
        ),
    );
    writeFileSync(`${dir}/${name.replace(/\.ts$/, ".js")}`, js);
  }
  if (name.endsWith(".vue"))
    writeFileSync(
      `${dir}/${name}`,
      chartsSpecifier(
        readFileSync(new URL(`../src/${name}`, import.meta.url), "utf8")
          .replaceAll('from "@minerva/dom"', 'from "../dom/index.js"')
          .replaceAll('from "@minerva/core"', 'from "../core/index.js"')
          .replaceAll("from '@minerva/core'", "from '../core/index.js'")
          .replace(/from (["'])(\.\/[^"']+)(["'])/g, (all, q, path) =>
            path.endsWith(".vue") || path.endsWith(".js")
              ? all
              : `from ${q}${path}.js${q}`,
          ),
      ),
    );
}

{
  const source = readFileSync(
    new URL("../../charts/src/canvas.ts", import.meta.url),
    "utf8",
  );
  const js = ts
    .transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    })
    .outputText.replace(
      /from (["'])\.\/(engine\/[^"']+)(["'])/g,
      (_, q, path) => {
        const target = resolve(dir, `../charts/${path}.js`);
        if (!existsSync(target))
          throw new Error(
            `${target} is missing: build @minerva/charts first (pnpm --filter @minerva/charts build)`,
          );
        return `from ${q}../charts/${path}.js${q}`;
      },
    );
  writeFileSync(`${dir}/charts-canvas.js`, js);
  writeFileSync(
    `${dir}/charts-canvas.d.ts`,
    'export * from "../charts/canvas.js";\n',
  );
}

const { rewriteCoreDeclarations } =
  await import("../../../tools/core-imports.mjs");
rewriteCoreDeclarations(dir);
// Explicit .js suffix resolves each *.vue.d.ts in both NodeNext and bundler
// type resolution; runtime imports above remain SFCs for the uni compiler.
const declarations = new Set();
for (const scope of [dir, resolve(dir, "../core"), resolve(dir, "../charts")])
  for (const entry of readdirSync(scope, { recursive: true }))
    if (String(entry).endsWith(".d.ts"))
      declarations.add(resolve(scope, String(entry)));
for (const entry of readdirSync(dir, { recursive: true })) {
  if (!String(entry).endsWith(".d.ts")) continue;
  const path = resolve(dir, String(entry));
  writeFileSync(
    path,
    rewriteSpecifiers(
      chartsSpecifier(readFileSync(path, "utf8")),
      path,
      declarations,
      ".js",
    ),
  );
}

writeFileSync(
  `${dir}/style.css`,
  [
    "mini-controls.css",
    "uni-components.css",
    "uni-primitives.css",
    "uni-dialogs.css",
  ]
    .map((name) =>
      readFileSync(
        new URL(`../../../tools/styles/${name}`, import.meta.url),
        "utf8",
      ),
    )
    .join("\n"),
);
