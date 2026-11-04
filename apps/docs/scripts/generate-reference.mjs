// Static, versioned HTTP resources for tools without a browser. Build from the
// same registry, API metadata, locales and demo sources used by the live site.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { importTs } from "../../../tools/import-ts.mjs";
import { collectSourceBundle, inlineSnippets } from "./source-bundle.mjs";
import {
  referenceRecord,
  renderReferenceMarkdown,
} from "./reference-model.mjs";
import { readRecipes } from "./recipes.mjs";
import { referenceDigest, referenceInputs } from "./reference-inputs.mjs";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const DOCS = join(ROOT, "apps/docs"),
  PUBLIC = join(DOCS, "public");
const json = (path) => JSON.parse(readFileSync(path, "utf8"));
const { docPages } = await importTs(join(DOCS, "src/docs/registry.ts"));
const version = json(
  join(ROOT, "packages/minerva-design/package.json"),
).version;
const contracts = json(
  join(ROOT, "packages/core/src/contracts/components.generated.json"),
);
const metaPath = join(
  ROOT,
  "packages/core/src/contracts/metadata.generated.json",
);
const contractProvenance = existsSync(metaPath)
  ? json(metaPath)
  : {
      packageVersion: version,
      sourceCommit: execFileSync(
        "git",
        [
          "log",
          "-1",
          "--format=%H",
          "--",
          "apps/docs/src/docs",
          "packages/core/src/contracts",
        ],
        { cwd: ROOT, encoding: "utf8" },
      ).trim(),
    };
const provenance = {
  ...contractProvenance,
  referenceSourceDigest: referenceDigest(referenceInputs(ROOT)),
};
const { angularExamples, angularSource } = await importTs(
  join(DOCS, "src/docs/angular/examples.ts"),
);
const apis = {};
for (const file of readdirSync(join(DOCS, "src/docs")).filter((f) =>
  /^api(?:\.[\w-]+)?\.generated\.json$/.test(f),
))
  Object.assign(apis, json(join(DOCS, "src/docs", file)));
const renderers = [
  "react",
  "vue",
  "wc",
  "angular",
  "native",
  "taro",
  "weapp",
  "uni",
];
const locales = ["en", "zh", "ja", "fr"];
const recipes = readRecipes(version);
const outputs = new Map();
const put = (path, content) =>
  outputs.set(
    path,
    typeof content === "string"
      ? content
      : JSON.stringify(content, null, 2) + "\n",
  );
const prefix = `reference/${version}`;
const index = {
  schemaVersion: 1,
  packageVersion: version,
  provenance,
  renderers,
  locales,
  pages: [],
  recipes: recipes.map(({ files, ...recipe }) => recipe),
  typeGraph: `/minerva-design/${prefix}/types.json`,
};
put(
  `${prefix}/types.json`,
  json(join(ROOT, "packages/core/src/contracts/types.generated.json")),
);
for (const recipe of recipes) {
  for (const [file, source] of Object.entries(recipe.files))
    put(`${prefix}/recipes/${recipe.id}/${file}`, source);
  put(`${prefix}/recipes/${recipe.id}.json`, recipe);
}
function sources(page, renderer) {
  if (renderer === "angular")
    return (angularExamples[page.id] ?? []).map((example) => ({
      id: example.id,
      title: example.title,
      description: example.description,
      kind: "internal-demo",
      entry: "example.ts",
      files: { "example.ts": angularSource(example) },
      dependencies: ["@angular/core", "minerva-design"],
      contextImports: example.monaco
        ? ["./engine (Monaco worker setup in the documentation)"]
        : [],
    }));
  const directory = {
    react: "demos",
    vue: "vue",
    wc: "wc",
    native: "native",
    angular: "angular",
    taro: "taro",
    uni: "uni",
    weapp: "weapp",
  }[renderer];
  const root = join(DOCS, "src/docs/pages", page.id, directory);
  if (!existsSync(root)) return [];
  const expected =
    renderer === "react"
      ? page.demos
      : renderer === "wc"
        ? page.wc?.demos
        : renderer === "native"
          ? page.native?.demos
          : null;
  return readdirSync(root)
    .filter((file) => /\.(?:tsx|vue|html)$/.test(file))
    .filter(
      (file) => !expected || expected.includes(file.replace(/\.[^.]+$/, "")),
    )
    .sort()
    .map((file) => {
      const bundle = collectSourceBundle(join(root, file), ROOT);
      if (
        file.endsWith(".html") &&
        existsSync(join(root, file.replace(/\.html$/, ".ts")))
      ) {
        const script = collectSourceBundle(
          join(root, file.replace(/\.html$/, ".ts")),
          ROOT,
        );
        Object.assign(bundle.files, script.files);
        bundle.dependencies = [
          ...new Set([...bundle.dependencies, ...script.dependencies]),
        ].sort();
        bundle.contextImports = [
          ...new Set([...bundle.contextImports, ...script.contextImports]),
        ].sort();
      }
      return { id: file.replace(/\.[^.]+$/, ""), ...bundle };
    });
}
const sourceCache = new Map();
for (const page of docPages) {
  for (const renderer of renderers)
    sourceCache.set(`${page.id}:${renderer}`, sources(page, renderer));
  for (const locale of locales) {
    const stringsPath = join(
      DOCS,
      "src/i18n/locales",
      locale,
      "docs",
      `${page.id}.json`,
    );
    if (!existsSync(stringsPath))
      throw new Error(`Missing locale ${stringsPath}`);
    const strings = json(stringsPath);
    for (const renderer of renderers) {
      const demos = sourceCache.get(`${page.id}:${renderer}`).map((demo) => {
        const text = (
          renderer === "wc"
            ? strings.wc?.demos
            : renderer === "vue"
              ? strings.vue?.demos
              : strings.demos
        )?.[demo.id];
        return {
          ...demo,
          title: text?.title ?? demo.title ?? demo.id,
          description: text?.description ?? demo.description ?? "",
        };
      });
      const record = referenceRecord({
        version,
        locale,
        renderer,
        page,
        strings,
        contracts,
        apis,
        demos,
        provenance,
        recipes,
      });
      const pageSource = join(DOCS, "src/docs/pages", page.id, "index.tsx");
      record.snippets = existsSync(pageSource)
        ? inlineSnippets(readFileSync(pageSource, "utf8"), {
            DOCS_PACKAGE_VERSION: version,
          })
        : [];
      record.installation = "./setup.md";
      record.typeGraph = index.typeGraph;
      record.documentationContext = { translationResources: strings };
      const path = `${prefix}/${locale}/${renderer}/${page.id}`;
      put(`${path}.json`, record);
      put(`${path}.md`, renderReferenceMarkdown(record));
      index.pages.push({
        page: page.id,
        locale,
        renderer,
        title: record.title,
        markdown: `/minerva-design/${path}.md`,
        json: `/minerva-design/${path}.json`,
      });
    }
  }
}
const install = {
  react:
    'import "minerva-design/style.css";\nimport { ConfigProvider, ToastProvider } from "minerva-design";\n// Mount ConfigProvider and ToastProvider once near the React application root.',
  vue: 'import "minerva-design/style.css";\nimport { ConfigProvider } from "minerva-design/vue";\n// Wrap the application template in ConfigProvider.',
  wc: 'import "minerva-design/tokens.css";\nimport "minerva-design/web-components";\n// Use <minerva-config> at the application root.',
  angular:
    'import "minerva-design/style.css";\n// Import standalone components from minerva-design/angular into the consuming component imports.',
  native:
    "// Import components and ConfigProvider from minerva-design/native.\n// Native uses provider-generated styles; do not import browser CSS.",
  taro: 'import "minerva-design/taro/style.css";\n// Import components and ConfigProvider from minerva-design/taro.',
  uni: 'import "minerva-design/uni/style.css";\n// Import Vue components from minerva-design/uni.',
  weapp:
    "// Copy dist/weapp from minerva-design into miniprogram_npm or a local component directory.\n// Register component paths in usingComponents; import tokens.mini.css as documented in the WeChat guide.",
};
for (const locale of locales)
  for (const renderer of renderers)
    put(
      `${prefix}/${locale}/${renderer}/setup.md`,
      `# ${renderer} setup\n\nPackage: minerva-design@${version}\n\n\`\`\`sh\npnpm add minerva-design@${version}\n\`\`\`\n\n\`\`\`ts\n${install[renderer]}\n\`\`\`\n\nUse the matching renderer API and its platform support limitations. See the versioned recipes for complete React and Vue project entry, configuration and dependency manifests. These documents use locale ${locale}; API identifiers remain unchanged.\n`,
    );
put("reference/index.json", index);
put(
  "llms.txt",
  `# Minerva Design ${version}\n\nStatic API and source references; no JavaScript is required.\n\n- [Machine index](reference/index.json)\n- [Standalone recipes](${prefix}/recipes/react-form/README.md)\n\n` +
    index.pages
      .filter((p) => p.locale === "en")
      .map((p) => `- [${p.title} (${p.renderer})](${p.markdown})`)
      .join("\n") +
    "\n",
);
const check = process.argv.includes("--check");
if (check) {
  const stale = [...outputs]
    .filter(
      ([path, content]) =>
        !existsSync(join(PUBLIC, path)) ||
        readFileSync(join(PUBLIC, path), "utf8") !== content,
    )
    .map(([path]) => path);
  if (stale.length)
    throw new Error(
      `Stale static reference (${stale.length} files): ${stale.slice(0, 5).join(", ")}`,
    );
} else {
  // Only the generator-owned version tree is replaced; other public assets stay intact.
  rmSync(join(PUBLIC, prefix), { recursive: true, force: true });
  for (const [path, content] of outputs) {
    mkdirSync(dirname(join(PUBLIC, path)), { recursive: true });
    writeFileSync(join(PUBLIC, path), content);
  }
}
console.log(
  `${check ? "Checked" : "Generated"} ${outputs.size} static reference files for ${version}`,
);
