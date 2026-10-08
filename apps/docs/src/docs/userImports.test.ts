// What users copy from the docs installs and imports the published package,
// `minerva-design`: the `@minerva/*` names are private workspace packages
// (never published) and must never reach a user-facing snippet.
// Checked: every docs page, demo, guide and translation (apps/docs/src), the
// framework setup snippets and the demo sources generated for every
// framework by the transformer, the READMEs and the Custom Elements Manifest
// (its descriptions are shown in the docs and in IDEs).
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { FRAMEWORKS } from "./frameworks";
import { WC_FRAMEWORKS, transformWcDemo } from "./frameworks/transform";
import { docPages } from "./registry";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, "..");
const REPO = join(SRC, "../../..");
const PAGES = join(SRC, "docs/pages");

/** An import / install / typings reference of a `@minerva/*` package */
const PRIVATE_SPECIFIER = [
  /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*|@use\s+|@import\s+)["'`]@minerva\//,
  /\b(?:pnpm\s+add|npm\s+(?:install|i|add)|yarn\s+add|bun\s+add)\b[^\n]*@minerva\//,
  /reference\s+types=["']@minerva\//,
  /"types"\s*:\s*\[[^\]]*"@minerva\//,
  /(?:jsdelivr\.net\/npm|unpkg\.com|esm\.sh)\/@minerva\//,
  /node_modules\/@minerva\//,
];
const privateSpecifiers = (text: string) =>
  text
    .split("\n")
    .filter((line) => PRIVATE_SPECIFIER.some((re) => re.test(line)));

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

/** Every file of the docs site but the tests */
const docsFiles = walk(SRC).filter(
  (file) =>
    /\.(tsx?|json|html|md|scss)$/.test(file) && !/\.test\.tsx?$/.test(file),
);

describe("user-facing snippets use minerva-design", () => {
  it("the docs site never mentions a @minerva/* package", () => {
    expect(docsFiles.length).toBeGreaterThan(300);
    const offenders = docsFiles.filter((file) =>
      readFileSync(file, "utf8").includes("@minerva/"),
    );
    expect(offenders.map((file) => relative(REPO, file))).toEqual([]);
  });

  it("the docs import, install and reference minerva-design entries", () => {
    const text = docsFiles.map((file) => readFileSync(file, "utf8")).join("\n");
    for (const snippet of [
      "pnpm add minerva-design",
      'from "minerva-design"',
      'import "minerva-design/style.css"',
      'import "minerva-design/web-components"',
      'import "minerva-design/tokens.css"',
      'from "minerva-design/theme-utils"',
      'from "minerva-design/monaco"',
    ]) {
      expect(text, snippet).toContain(snippet);
    }
    // every module specifier of the published package is a real entry
    const pkg = JSON.parse(
      readFileSync(join(REPO, "packages/minerva-design/package.json"), "utf8"),
    ) as { exports: Record<string, unknown> };
    const entries = Object.keys(pkg.exports).map((key) =>
      key === "." ? "minerva-design" : `minerva-design/${key.slice(2)}`,
    );
    const isEntry = (specifier: string) =>
      entries.some((entry) =>
        entry.includes("*")
          ? new RegExp(
              `^${entry.replace(/[.]/g, "\\.").replace("*", "[\\w-]+")}$`,
            ).test(specifier)
          : entry === specifier ||
            // per-element entries written with a .js extension (import maps)
            entry === specifier.replace(/\.js$/, ""),
      );
    const specifiers = new Set(
      Array.from(
        text.matchAll(
          /(?:\bfrom\s*|\bimport\s*\(?\s*|@use\s+|reference\s+types=)["'`](minerva-design(?:\/[\w./-]*)?)["'`]/g,
        ),
        (m) => m[1],
      ),
    );
    expect(specifiers.size).toBeGreaterThan(10);
    expect([...specifiers].filter((s) => !isEntry(s))).toEqual([]);
  });

  it("the Installation page installs the one package", () => {
    const page = readFileSync(join(PAGES, "installation/index.tsx"), "utf8");
    expect(page).toContain("const installPnpm = `pnpm add minerva-design`;");
    expect(page).toContain("const installNpm = `npm install minerva-design`;");
    expect(page).toContain("const installYarn = `yarn add minerva-design`;");
    expect(page).not.toMatch(/(add|install) minerva-design\//);
  });

  it("the framework setup snippets of every component page", () => {
    const pages = docPages.filter((page) => page.wc);
    expect(pages.length).toBeGreaterThan(30);
    for (const page of pages) {
      for (const framework of FRAMEWORKS) {
        const snippets = framework.setup(page.wc!);
        for (const { code } of snippets) {
          expect(privateSpecifiers(code), `${page.id} ${framework.id}`).toEqual(
            [],
          );
        }
        // the registration step imports the element entry of the page
        if (framework.renderer === "web-components") {
          expect(
            snippets.map((snippet) => snippet.code).join("\n"),
            `${page.id} ${framework.id}`,
          ).toContain(`minerva-design/web-components/${page.wc!.entry}`);
        }
      }
    }
  });

  it("the demo sources generated for every framework", () => {
    let checked = 0;
    for (const page of docPages.filter((p) => p.wc)) {
      for (const demo of page.wc!.demos) {
        const file = join(PAGES, page.id, "wc", `${demo}.html`);
        const scriptFile = file.replace(/\.html$/, ".ts");
        const { sources } = transformWcDemo({
          page: page.id,
          demo,
          html: readFileSync(file, "utf8"),
          script: existsSync(scriptFile)
            ? readFileSync(scriptFile, "utf8")
            : undefined,
        });
        for (const framework of WC_FRAMEWORKS) {
          const code = sources[framework];
          expect(code, `${page.id}/${demo} ${framework}`).not.toContain(
            "@minerva/",
          );
          checked++;
        }
      }
    }
    expect(checked).toBeGreaterThan(100);
  });

  it.each([
    "README.md",
    "README_ZH.md",
    "README_JP.md",
    "packages/minerva-design/README.md",
  ])("%s", (file) => {
    const text = readFileSync(join(REPO, file), "utf8");
    expect(privateSpecifiers(text)).toEqual([]);
    expect(text).toContain("minerva-design");
  });

  it("the Custom Elements Manifest and the generated API tables", () => {
    for (const file of [
      "packages/minerva-design/custom-elements.json",
      "apps/docs/src/docs/api.generated.json",
      "apps/docs/src/docs/api.wc.generated.json",
    ]) {
      expect(readFileSync(join(REPO, file), "utf8"), file).not.toMatch(
        /@minerva\/(?!core\b)/,
      );
    }
  });

  it("the checker reports private specifiers", () => {
    expect(
      privateSpecifiers(
        [
          'import { Button } from "@minerva/react";',
          "pnpm add @minerva/web-components",
          '/// <reference types="@minerva/web-components/react" />',
          '<script src="https://cdn.jsdelivr.net/npm/@minerva/core"></script>',
          'import { Button } from "minerva-design";',
        ].join("\n"),
      ),
    ).toHaveLength(4);
  });
});
