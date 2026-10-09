import {
  cpSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { button, input, toggle } from "../src/index.ts";
const dir = fileURLToPath(
  new URL("../../minerva-design/dist/weapp/", import.meta.url),
);
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/package.json`, '{"type":"commonjs"}\n');
writeFileSync(
  `${dir}/controls.js`,
  ts.transpileModule(
    readFileSync(new URL("../src/index.ts", import.meta.url), "utf8"),
    {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
      },
    },
  ).outputText,
);
cpSync(
  new URL("../../minerva-design/dist/core/tokens.mini.css", import.meta.url),
  `${dir}/tokens.wxss`,
);
cpSync(
  new URL("../../../tools/styles/mini-controls.css", import.meta.url),
  `${dir}/controls.wxss`,
);
for (const [name, key, component] of [
  ["button", "button", button],
  ["input", "input", input],
  ["switch", "toggle", toggle],
]) {
  mkdirSync(`${dir}/${name}`, { recursive: true });
  writeFileSync(
    `${dir}/${name}/index.js`,
    `Component(require('../controls.js').${key}.definition);\n`,
  );
  writeFileSync(`${dir}/${name}/index.json`, '{"component":true}\n');
  writeFileSync(`${dir}/${name}/index.wxml`, `${component.template}\n`);
  writeFileSync(`${dir}/${name}/index.wxss`, '@import "../controls.wxss";\n');
}
