import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("reference identity excludes Angular compiler outputs but tracks authored and API sources", async () => {
  const { referenceInputs, referenceDigest } =
    await import("./reference-inputs.mjs");
  const root = mkdtempSync(join(tmpdir(), "minerva-reference-inputs-"));
  const write = (path, content = "source") => {
    const file = join(root, path);
    mkdirSync(join(file, ".."), { recursive: true });
    writeFileSync(file, content);
  };
  try {
    for (const path of [
      "apps/docs/src/docs/angular/examples.ts",
      "apps/docs/src/docs/api.generated.json",
      "apps/docs/src/i18n/locales/en.ts",
      "apps/docs/recipes/react-form/src/main.tsx",
      "apps/docs/scripts/generate-reference.mjs",
      "tools/import-ts.mjs",
      "packages/minerva-design/package.json",
      "packages/core/src/contracts/components.generated.json",
      "packages/core/src/contracts/types.generated.json",
      "packages/core/src/contracts/metadata.generated.json",
    ])
      write(path);
    const initial = referenceInputs(root);
    const digest = referenceDigest(initial);
    for (const path of [
      "apps/docs/src/docs/angular/.aot/examples.js",
      "apps/docs/src/docs/angular/.aot/examples.d.ts",
      "apps/docs/src/docs/angular/.aot-source/examples.ts",
      "apps/docs/src/docs/angular/.aot-source/tsconfig.json",
    ])
      write(path, "compiler output");
    assert.deepEqual(referenceInputs(root), initial);
    assert.equal(referenceDigest(referenceInputs(root)), digest);
    write("apps/docs/src/docs/angular/examples.ts", "updated authored example");
    const authoredDigest = referenceDigest(referenceInputs(root));
    assert.notEqual(authoredDigest, digest);
    write("apps/docs/src/docs/api.generated.json", "updated API");
    assert.notEqual(referenceDigest(referenceInputs(root)), authoredDigest);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("demo source bundle includes transitive local files and external dependencies, and labels docs context", async () => {
  const { collectSourceBundle } = await import("./source-bundle.mjs");
  const root = mkdtempSync(join(tmpdir(), "minerva-bundle-test-"));
  try {
    mkdirSync(join(root, "demos"));
    writeFileSync(
      join(root, "demos/basic.tsx"),
      'import { seed } from "../data"; import { Button } from "minerva-design"; import { t } from "@/i18n"; export default seed;',
    );
    writeFileSync(join(root, "data.ts"), 'export { seed } from "./seed";');
    writeFileSync(join(root, "seed.ts"), "export const seed = 7;");
    const bundle = collectSourceBundle(join(root, "demos/basic.tsx"), root);
    assert.deepEqual(Object.keys(bundle.files).sort(), [
      "data.ts",
      "demos/basic.tsx",
      "seed.ts",
    ]);
    assert.deepEqual(bundle.dependencies, ["minerva-design"]);
    assert.deepEqual(bundle.contextImports, ["@/i18n"]);
    assert.equal(bundle.kind, "internal-demo");
    writeFileSync(join(root, "demos/bad.ts"), 'import "../../outside";');
    assert.throws(
      () => collectSourceBundle(join(root, "demos/bad.ts"), root),
      /outside|escape/i,
    );
    writeFileSync(
      join(root, "demos/missing.ts"),
      'import "./missing-dependency";',
    );
    assert.throws(
      () => collectSourceBundle(join(root, "demos/missing.ts"), root),
      /resolve/i,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("reference text preserves renderer-specific APIs, limitations, required callbacks and all supplied sources", async () => {
  const { renderReferenceMarkdown, referenceRecord } =
    await import("./reference-model.mjs");
  const record = referenceRecord({
    version: "1.2.3",
    locale: "en",
    renderer: "vue",
    page: { id: "upload", exports: ["Upload"], api: ["UploadProps"] },
    strings: { title: "Upload", description: "Controlled files", demos: {} },
    contracts: [
      {
        name: "Upload",
        platforms: { vue: { status: "beta", notes: "Host coverage only" } },
        renderers: {
          vue: {
            import: { specifier: "minerva-design/vue", exports: ["Upload"] },
            props: [
              { name: "modelValue", typeText: "UploadItem[]", required: false },
            ],
            events: [
              {
                name: "filesSelected",
                required: true,
                parameters: [{ name: "files", typeText: "File[]" }],
              },
            ],
            slots: [{ name: "default" }],
            bindings: [
              {
                prop: "modelValue",
                event: "update:modelValue",
                syntax: "v-model",
              },
            ],
          },
        },
      },
    ],
    apis: {
      UploadProps: {
        kind: "interface",
        props: [
          {
            name: "onFilesSelected",
            type: "(files: File[]) => void",
            required: true,
          },
        ],
      },
    },
    demos: [
      {
        id: "basic",
        kind: "internal-demo",
        files: {
          "basic.vue": "<template><Upload /></template>",
          "data.ts": "export const files = [];",
        },
        dependencies: ["vue", "minerva-design"],
        contextImports: [],
      },
    ],
    provenance: { schemaVersion: "1", sourceCommit: "abc" },
    recipes: [],
  });
  const markdown = renderReferenceMarkdown(record);
  for (const text of [
    "1.2.3",
    "vue",
    "minerva-design/vue",
    "modelValue",
    "filesSelected",
    "File[]",
    "v-model",
    "Host coverage only",
    "data.ts",
    "export const files",
  ])
    assert.ok(markdown.includes(text), text);
  assert.equal(record.renderer, "vue");
  assert.equal(record.components[0].api.events[0].required, true);
  assert.equal(record.examples[0].kind, "internal-demo");
});

test("recipe generation supplies complete entry/config/data files with the current package version", async () => {
  const { readRecipes } = await import("./recipes.mjs");
  const recipes = readRecipes("9.8.7");
  assert.deepEqual(
    recipes.map((r) => r.id),
    ["react-form", "trading-chart", "vue-form"],
  );
  for (const recipe of recipes) {
    assert.equal(recipe.kind, "standalone-recipe");
    assert.equal(recipe.packageVersion, "9.8.7");
    assert.equal(
      JSON.parse(recipe.files["package.json"]).dependencies["minerva-design"],
      "9.8.7",
    );
    assert.ok(recipe.files["index.html"]);
    assert.ok(recipe.files["tsconfig.json"]);
    assert.ok(
      Object.values(recipe.files).some((s) =>
        s.includes("minerva-design/style.css"),
      ),
    );
    assert.ok(
      !Object.values(recipe.files).some(
        (s) => s.includes("@minerva/") || s.includes("@/"),
      ),
    );
  }
  assert.ok(recipes.find((r) => r.id === "trading-chart").files["src/data.ts"]);
  assert.ok(recipes.find((r) => r.id === "vue-form").files["vite.config.ts"]);
});

test("source bundles reject symlinks that lead outside their canonical source root", async () => {
  const { symlinkSync } = await import("node:fs");
  const { collectSourceBundle } = await import("./source-bundle.mjs");
  const parent = mkdtempSync(join(tmpdir(), "minerva-symlink-"));
  try {
    mkdirSync(join(parent, "root"));
    writeFileSync(join(parent, "private.ts"), "export const secret=1;");
    symlinkSync(join(parent, "private.ts"), join(parent, "root/alias.ts"));
    assert.throws(
      () =>
        collectSourceBundle(
          join(parent, "root/alias.ts"),
          join(parent, "root"),
        ),
      /outside|escape/i,
    );
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});

test("Markdown keeps authored guide sections alongside renderer contracts", async () => {
  const { renderReferenceMarkdown, referenceRecord } =
    await import("./reference-model.mjs");
  const record = referenceRecord({
    version: "1.2.3",
    locale: "en",
    renderer: "react",
    page: { id: "theming" },
    strings: {
      title: "Theming",
      description: "Themes",
      builtIn: {
        title: "Built-in themes",
        text: "Select light, dark or github-dark.",
      },
      custom: {
        title: "Custom theme",
        code: "const theme = { ...themes.light };",
      },
    },
    contracts: [],
    apis: {},
    demos: [],
    provenance: {},
    recipes: [],
  });
  const text = renderReferenceMarkdown(record);
  assert.ok(text.includes("Select light, dark or github-dark."));
  assert.ok(text.includes("const theme = { ...themes.light };"));
});

test("recipe URLs resolve from both the machine index and component page locations", async () => {
  const { readRecipes } = await import("./recipes.mjs");
  for (const recipe of readRecipes("9.8.7"))
    for (const owner of [
      "https://example.test/minerva-design/reference/index.json",
      "https://example.test/minerva-design/reference/9.8.7/zh/react/input.json",
    ])
      assert.equal(
        new URL(recipe.url, owner).pathname,
        `/minerva-design/reference/9.8.7/recipes/${recipe.id}/README.md`,
      );
});

test("reference identity covers locale, demo and recipe inputs and ignores traversal order", async () => {
  const { referenceDigest } = await import("./reference-inputs.mjs");
  const baseline = {
    "locale.json": "English",
    "demo.tsx": "Button",
    "recipe.tsx": "Input",
  };
  assert.equal(
    referenceDigest(baseline),
    referenceDigest(Object.fromEntries(Object.entries(baseline).reverse())),
  );
  for (const key of Object.keys(baseline))
    assert.notEqual(
      referenceDigest(baseline),
      referenceDigest({ ...baseline, [key]: "changed" }),
    );
});

test("inline guide code is extracted from the same CodeBlock literals and variables the page renders", async () => {
  const { inlineSnippets } = await import("./source-bundle.mjs");
  const snippets = inlineSnippets(
    'const coreCode = `import { Button } from "minerva-design";`; const unused = "not a snippet"; export default () => <><CodeBlock code={coreCode} language="ts"/><CodeBlock code={`pnpm add minerva-design`} language="sh"/></>;',
  );
  assert.deepEqual(snippets, [
    { source: 'import { Button } from "minerva-design";', language: "ts" },
    { source: "pnpm add minerva-design", language: "sh" },
  ]);
});

test("guide templates resolve package-version bindings and local CDN constants without executing code", async () => {
  const { inlineSnippets } = await import("./source-bundle.mjs");
  const source =
    'const CDN = `https://cdn.jsdelivr.net/npm/minerva-design@${DOCS_PACKAGE_VERSION}/dist`; const example = `<script src="${CDN}/web-components/cdn/minerva.js"></script>`; const dynamic = dangerous(); export default () => <><CodeBlock code={example} language="html"/><CodeBlock code={dynamic}/><CodeBlock code={`${unknown}`}/></>;';
  assert.deepEqual(inlineSnippets(source, { DOCS_PACKAGE_VERSION: "9.8.7" }), [
    {
      source:
        '<script src="https://cdn.jsdelivr.net/npm/minerva-design@9.8.7/dist/web-components/cdn/minerva.js"></script>',
      language: "html",
    },
  ]);
});
