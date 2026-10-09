import {
  cpSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { createRequire } from "node:module";
const dir = fileURLToPath(
  new URL("../../minerva-design/dist/weapp/", import.meta.url),
);
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/package.json`, '{"type":"commonjs"}\n');
await build({
  configFile: false,
  build: {
    outDir: dir,
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: fileURLToPath(new URL("../src/index.ts", import.meta.url)),
      formats: ["cjs"],
      fileName: () => "controls.js",
    },
  },
});
const controls = createRequire(import.meta.url)(`${dir}/controls.js`);

cpSync(
  new URL("../../minerva-design/dist/core/tokens.mini.css", import.meta.url),
  `${dir}/tokens.wxss`,
);
// `page` is valid in app.wxss but forbidden in isolated component WXSS.
// Providers carry mn-root themselves, so retain exactly that token scope.
writeFileSync(
  `${dir}/tokens.component.wxss`,
  readFileSync(`${dir}/tokens.wxss`, "utf8").replace(
    /^page, \.mn-root\s*\{/m,
    ".mn-root {",
  ),
);
writeFileSync(
  `${dir}/controls.wxss`,
  ["mini-controls.css", "weapp-components.css"]
    .map((name) =>
      readFileSync(
        new URL(`../../../tools/styles/${name}`, import.meta.url),
        "utf8",
      ),
    )
    .join("\n"),
);
for (const [key, component] of Object.entries(controls)) {
  if (!component?.definition || !component?.template) continue;
  const name =
    key === "toggle"
      ? "switch"
      : key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
  mkdirSync(`${dir}/${name}`, { recursive: true });
  writeFileSync(
    `${dir}/${name}/index.js`,
    `Component(require('../controls.js').${key}.definition);\n`,
  );
  writeFileSync(
    `${dir}/${name}/index.json`,
    JSON.stringify({
      component: true,
      ...(component.componentGenerics
        ? { componentGenerics: component.componentGenerics }
        : {}),
    }) + "\n",
  );
  writeFileSync(`${dir}/${name}/index.wxml`, `${component.template}\n`);
  writeFileSync(
    `${dir}/${name}/index.wxss`,
    (key === "configProvider" || key === "themeProvider"
      ? '@import "../tokens.component.wxss";\n'
      : "") + '@import "../controls.wxss";\n',
  );
}

// This source intentionally contains only structural type declarations. Copying
// it as .d.ts keeps consumers independent of internal adapters and SDK globals.
cpSync(new URL("../src/public-types.ts", import.meta.url), `${dir}/types.d.ts`);
