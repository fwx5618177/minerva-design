// The web component entries of minerva-design (dist/web-components/),
// checked the way a consumer sees them: the exports map, per-element entries
// that stay independent (tree-shaking), the CDN bundle, the Custom Elements
// Manifest and the generated framework typings.
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { rolldown } from "rolldown";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  elementsOf,
  optionalEntryOf,
} from "../../web-components/scripts/manifest.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const manifest = JSON.parse(
  readFileSync(join(root, "custom-elements.json"), "utf8"),
);
const elements = elementsOf(manifest) as Array<{
  tagName: string;
  name: string;
}>;
/** Elements of the optional entries (optional peer dependencies) */
const OPTIONAL_TAGS = elements
  .filter((e) => optionalEntryOf(e))
  .map((e) => e.tagName);
const entryNames = readdirSync(join(root, "../web-components/src/elements"))
  .filter((f) => f.endsWith(".ts"))
  .map((f) => f.replace(/\.ts$/, ""));

/** Size (bytes, minified) of an app importing `specifier` (deps external) */
async function bundleSize(
  code: string,
  external: (id: string) => boolean,
  nodeEnv = "production",
) {
  const dir = mkdtempSync(join(tmpdir(), "minerva-wc-"));
  const input = join(dir, "entry.js");
  writeFileSync(input, code);
  const bundle = await rolldown({
    input,
    external,
    logLevel: "silent",
    transform: {
      define: { "process.env.NODE_ENV": JSON.stringify(nodeEnv) },
    },
  });
  const { output } = await bundle.generate({ format: "es", minify: true });
  await bundle.close();
  const js = output
    .filter((o) => o.type === "chunk")
    .map((o) => (o as { code: string }).code)
    .join("\n");
  return { size: Buffer.byteLength(js), js };
}

/** The shared core (dist/core/ and dist/dom/), imported through relative paths */
const isCore = (id: string) =>
  /(^|[\\/])(core[\\/](index|styling-hooks)|dom[\\/]index)\.js$/.test(id);
const deps = (id: string) =>
  isCore(id) ||
  /^(lit|@lit|lit-html|lit-element|@floating-ui|dompurify|jsonc-parser)(\/|$)/.test(
    id,
  );

describe("exports map", () => {
  it("has one entry per element define module", () => {
    for (const name of entryNames) {
      expect(pkg.exports[`./web-components/${name}`], name).toEqual({
        types: `./dist/web-components/elements/${name}.d.ts`,
        default: `./dist/web-components/elements/${name}.js`,
      });
    }
  });

  it("points `customElements` at the published manifest", () => {
    expect(pkg.customElements).toBe("custom-elements.json");
    expect(pkg.files).toContain("custom-elements.json");
  });

  it("ships the design tokens (minerva-design/tokens.css)", () => {
    const css = readFileSync(join(root, pkg.exports["./tokens.css"]), "utf8");
    expect(css).toContain("--primary-color");
    expect(css).toContain("[data-palette=");
    // inside the `minerva` cascade layer: unlayered app CSS wins
    expect(css.trim()).toMatch(/^@layer minerva \{[\s\S]*\}$/);
  });

  it("published modules never contain `?inline` specifiers", () => {
    const js = readFileSync(
      join(root, "dist/web-components/components/button/button.js"),
      "utf8",
    );
    expect(js).not.toContain("?inline");
    expect(js).toMatch(/styles\/Button\/button\.css\.js/);
  });
});

describe("per-element entries (tree-shaking)", () => {
  it("importing one element does not pull the others", async () => {
    const { size, js } = await bundleSize(
      `import "${join(root, "dist/web-components/elements/button.js")}";`,
      deps,
    );
    console.info(`single element (minerva-button, deps external): ${size} B`);
    expect(size).toBeLessThan(30_000);
    const others = elements
      .map((e) => e.tagName)
      .filter((tag) => tag !== "minerva-button");
    expect(others.filter((tag) => js.includes(`"${tag}"`))).toEqual([]);
  });

  it("the shared core is tree-shakable (no top-level side effects pulled in)", async () => {
    // e.g. the dev-message helper alone must not drag the i18n bundles,
    // theme tables or theme init script along
    const { size, js } = await bundleSize(
      `import { formatDevMessage } from "${join(root, "dist/core/index.js")}"; console.log(formatDevMessage);`,
      () => false,
    );
    expect(size).toBeLessThan(500);
    expect(js).not.toContain("primary-color");
  });

  it("the all-in-one entry registers every element but the optional ones", async () => {
    const { size, js } = await bundleSize(
      `import "${join(root, "dist/web-components/index.js")}";`,
      deps,
    );
    console.info(`all-in-one (deps external): ${size} B`);
    // ~543 kB after the richer component styles (MonthCalendar, Steps, List,
    // DescriptionList...), the separator / focus-ring rules and the new
    // variants; raised deliberately from 540 kB, with headroom for one release
    expect(size).toBeLessThan(560_000);
    for (const { tagName } of elements) {
      if (OPTIONAL_TAGS.includes(tagName)) expect(js).not.toContain(tagName);
      else expect(js).toContain(tagName);
    }
    expect(js).not.toContain("monaco-editor");
  });

  it("production bundles drop the development warnings (DEV folds to false)", async () => {
    const entry = `import "${join(root, "dist/web-components/index.js")}";`;
    const message = "width is ignored when full is set";
    const development = await bundleSize(entry, deps, "development");
    const production = await bundleSize(entry, deps, "production");
    console.info(
      `all-in-one development: ${development.size} B, production: ${production.size} B`,
    );
    expect(development.js).toContain(message);
    expect(production.js).not.toContain(message);
    expect(production.js).not.toContain("process.env");
  });

  it("the optional code-editor entry keeps monaco-editor out of the bundle", async () => {
    const { size, js } = await bundleSize(
      `import "${join(root, "dist/web-components/elements/code-editor.js")}";`,
      deps,
    );
    console.info(`code-editor entry (deps external): ${size} B`);
    expect(js).toContain("minerva-code-editor");
    // the engine is injected (`editor.monaco = monaco`), never imported
    expect(js).not.toMatch(/from\s*["']monaco-editor/);
    expect(js).not.toMatch(/import\(["']monaco-editor/);
  });
});

describe("CDN bundle", () => {
  it("is self-contained and production-mode", () => {
    const js = readFileSync(
      join(root, "dist/web-components/cdn/minerva.js"),
      "utf8",
    );
    console.info(
      `CDN bundle (all elements + lit + core): ${Buffer.byteLength(js)} B`,
    );
    expect(js).not.toMatch(/from\s*["'](lit|@minerva\/core|\.)/);
    expect(js).not.toContain('"minerva-code-editor"');
    expect(js).not.toContain("process.env.NODE_ENV");
    // fully minified (whitespace too), development warnings dropped
    expect(Buffer.byteLength(js)).toBeLessThan(700_000);
    // (template whitespace of <pre> / <textarea> templates is content)
    expect(js).not.toMatch(/\n\t/);
    expect(js).not.toContain("width is ignored when full is set");
  });
});

describe("custom-elements.json and typings", () => {
  it("lists every element with its tag", () => {
    expect(elements.length).toBeGreaterThan(0);
    for (const element of elements) {
      expect(element.tagName).toMatch(/^minerva-[a-z-]+$/);
    }
  });

  it("generates syntactically valid framework typings with every tag", () => {
    for (const name of ["react", "vue", "svelte", "solid"]) {
      const file = join(root, `dist/web-components/types/${name}.d.ts`);
      const text = readFileSync(file, "utf8");
      const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest);
      const diagnostics = (
        source as unknown as { parseDiagnostics: ts.Diagnostic[] }
      ).parseDiagnostics;
      expect(diagnostics, name).toEqual([]);
      for (const { tagName } of elements) expect(text).toContain(tagName);
    }
  });

  it("React JSX typings type-check against @types/react", () => {
    const fixture = join(root, "tests/fixtures/react-usage.tsx");
    const program = ts.createProgram([fixture], {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.ES2022,
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      types: [],
      lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
    });
    const errors = ts
      .getPreEmitDiagnostics(program)
      .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
    expect(errors).toEqual([]);
  });

  it("VS Code custom data lists every tag", () => {
    const data = JSON.parse(
      readFileSync(
        join(root, "dist/web-components/html-custom-data.json"),
        "utf8",
      ),
    );
    expect(data.tags.map((t: { name: string }) => t.name).sort()).toEqual(
      elements.map((e) => e.tagName).sort(),
    );
  });
});
