import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";
import ts from "typescript";
const root = fileURLToPath(new URL("../../../", import.meta.url));
const docs = join(root, "apps/docs/src/docs/angular");
const generated = join(docs, ".aot-source");
const output = join(docs, ".aot");
const require = createRequire(new URL("../package.json", import.meta.url));
export async function compileAngularExamples() {
  const source = ts.transpileModule(
    readFileSync(join(docs, "examples.ts"), "utf8"),
    {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    },
  ).outputText;
  const { angularExamples } = await import(
    `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
  );
  mkdirSync(generated, { recursive: true });
  mkdirSync(output, { recursive: true });
  const all = Object.entries(angularExamples).flatMap(([page, examples]) =>
    examples.map((example) => ({ ...example, key: `${page}:${example.id}` })),
  );
  const imports = [
    ...new Set(all.flatMap((example) => example.imports)),
  ].filter((name) => name !== "MnMonacoCodeEditor" && name !== "MnConfig");
  const expression = (value) =>
    value instanceof Date
      ? `new Date(${value.getTime()})`
      : JSON.stringify(value);
  const classes = all
    .map(
      (example, index) =>
        `@Component({selector:'mn-docs-example', imports:[MnConfig,${example.imports.join(",")}], template:${JSON.stringify(`<mn-config [theme]="theme()" [palette]="palette()" [locale]="language()" (themeChange)="onTheme($event)" (paletteChange)="onPalette($event)">${example.template}</mn-config>`)}})\nexport class Example${index} {\nreadonly theme=signal<ConfigTheme>('light');\nreadonly palette=signal<ConfigPalette>(null);\nreadonly language=signal<'en'|'zh'>('en');\nonTheme: (theme:ConfigTheme)=>void = ()=>{};\nonPalette: (palette:ConfigPalette)=>void = ()=>{};\nmonaco: typeof import('monaco-editor') | undefined;\n${Object.entries(
          example.state,
        )
          .map(
            ([key, value]) =>
              `${key}${example.stateTypes?.[key] ? `: ${example.stateTypes[key]}` : ""} = ${expression(value)};`,
          )
          .join("\n")}\n}`,
    )
    .join("\n");
  const code = `// Generated from authored examples.ts. Do not edit.\nimport { Component, signal, type Type } from '@angular/core';\nimport { MnConfig, ${imports.join(",")}, type ConfigTheme, type MinervaScope } from 'minerva-design/angular';\nimport { MnMonacoCodeEditor } from 'minerva-design/angular/monaco';\ntype ConfigPalette = Parameters<MinervaScope['setPalette']>[0];\n${classes}\nexport const compiledExamples: Record<string,Type<Pick<Example0,'theme'|'palette'|'language'|'onTheme'|'onPalette'|'monaco'>>> = {${all.map((example, index) => `${JSON.stringify(example.key)}:Example${index}`).join(",")}};\n`;
  writeFileSync(join(generated, "examples.ts"), code);
  const config = {
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      strict: true,
      skipLibCheck: true,
      experimentalDecorators: true,
      useDefineForClassFields: false,
      declaration: true,
      rootDir: generated,
      outDir: output,
      lib: ["ES2023", "DOM"],
      types: [],
    },
    angularCompilerOptions: {
      compilationMode: "full",
      strictTemplates: true,
      strictInjectionParameters: true,
    },
    files: [join(generated, "examples.ts")],
  };
  writeFileSync(
    join(generated, "tsconfig.json"),
    JSON.stringify(config, null, 2),
  );
  const { readConfiguration, performCompilation, formatDiagnostics } =
    await import(pathToFileURL(require.resolve("@angular/compiler-cli")).href);
  const { rootNames, options, errors } = readConfiguration(
    join(generated, "tsconfig.json"),
  );
  const result = performCompilation({ rootNames, options });
  const diagnostics = [...errors, ...result.diagnostics].filter(
    (d) => d.category === ts.DiagnosticCategory.Error,
  );
  if (diagnostics.length) throw new Error(formatDiagnostics(diagnostics));
  console.log(
    `Angular docs AOT: ${all.length} examples compiled with strict templates`,
  );
}
export async function angularLinker() {
  const linkerPath = require.resolve("@angular/compiler-cli/linker/babel");
  const babelRequire = createRequire(linkerPath);
  const { transformAsync } = await import(
    pathToFileURL(babelRequire.resolve("@babel/core")).href
  );
  const { default: linker } = await import(pathToFileURL(linkerPath).href);
  return async (code, id) => {
    if (!/\.m?js(?:\?|$)/.test(id) || !code.includes("ɵɵngDeclare"))
      return null;
    const result = await transformAsync(code, {
      filename: id.split("?")[0],
      configFile: false,
      babelrc: false,
      plugins: [[linker, { linkerJitMode: false }]],
      sourceMaps: true,
      compact: false,
    });
    return result?.code
      ? {
          code: result.code,
          map: result.map ? JSON.stringify(result.map) : null,
        }
      : null;
  };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1])
  await compileAngularExamples();
