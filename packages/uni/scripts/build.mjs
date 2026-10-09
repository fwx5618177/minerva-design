// Preserve SFCs: uni-app's own compiler must transform native view/input/switch tags.
import {
  cpSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const dir = fileURLToPath(
  new URL("../../minerva-design/dist/uni/", import.meta.url),
);
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
execFileSync("pnpm", ["exec", "vue-tsc", "-p", "tsconfig.build.json"], {
  stdio: "inherit",
});
for (const name of readdirSync(new URL("../src/", import.meta.url))) {
  if (name.endsWith(".vue"))
    cpSync(new URL(`../src/${name}`, import.meta.url), `${dir}/${name}`);
}
writeFileSync(
  `${dir}/index.js`,
  [
    'export { default as Button } from "./Button.vue";',
    'export { default as Input } from "./Input.vue";',
    'export { default as Switch } from "./Switch.vue";',
    'export { miniTokenClassNames } from "../core/index.js";',
    "",
  ].join("\n"),
);
const { rewriteCoreDeclarations } =
  await import("../../../tools/core-imports.mjs");
rewriteCoreDeclarations(dir);
// Explicit .js suffix resolves each *.vue.d.ts in both NodeNext and bundler
// type resolution; runtime imports above remain SFCs for the uni compiler.
const declarationEntry = `${dir}/index.d.ts`;
writeFileSync(
  declarationEntry,
  readFileSync(declarationEntry, "utf8").replace(
    /from "(\.\/[^"]+\.vue)"/g,
    'from "$1.js"',
  ),
);
cpSync(
  new URL("../../../tools/styles/mini-controls.css", import.meta.url),
  `${dir}/style.css`,
);
