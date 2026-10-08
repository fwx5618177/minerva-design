import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
export const at = (...parts: string[]) => join(ROOT, ...parts);
export const read = (...parts: string[]) => readFileSync(at(...parts), "utf8");
export const readJson = <T = Record<string, unknown>>(...parts: string[]): T =>
  JSON.parse(read(...parts)) as T;
export const exists = (...parts: string[]) => existsSync(at(...parts));

/** The packages published to npm (directory under packages/ -> name) */
export const PUBLISHED = {
  core: "@minerva/core",
  "lib-core": "@minerva/lib-core",
  "lib-web-components": "@minerva/lib-web-components",
} as const;

/** Markdown files whose links and code blocks are checked */
export const MARKDOWN = [
  "README.md",
  "README_ZH.md",
  "README_JP.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "CODE_OF_CONDUCT.md",
  ".changeset/README.md",
  ...Object.keys(PUBLISHED).map((dir) => `packages/${dir}/README.md`),
];

export interface CodeBlock {
  file: string;
  /** 1-based line of the opening fence */
  line: number;
  lang: string;
  code: string;
}

/** Fenced code blocks of a markdown file */
export function codeBlocks(file: string): CodeBlock[] {
  const text = read(file);
  return Array.from(text.matchAll(/^```(\w*)\n([\s\S]*?)^```/gm), (m) => ({
    file,
    line: text.slice(0, m.index).split("\n").length,
    lang: m[1],
    code: m[2],
  }));
}

/** Docs site page ids (one folder per page, checked against the registry by the sample tests) */
export const docPageIds = () =>
  new Set(
    readdirSync(at("packages/sample/src/docs/pages"), {
      withFileTypes: true,
    })
      .filter((d) => d.isDirectory())
      .map((d) => d.name),
  );

/** Files under `dir` (recursive) matching `test` */
export function walk(dir: string, test: (file: string) => boolean): string[] {
  return readdirSync(at(dir), { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      return entry.name === "node_modules" || entry.name === "dist"
        ? []
        : walk(path, test);
    }
    return test(path) ? [path] : [];
  });
}
