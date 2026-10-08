// Compiled CSS of the libraries, for the stylesheet rule checks
// (css-rules.test.ts, focus-rules.test.ts). Nothing needs a prior build:
// every SCSS source is compiled with `sass` at test time, the design tokens
// are the committed generated stylesheet, and the inline
// Lit `css` templates of the web components are read from their sources.
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { compile } from "sass";
import { at, walk } from "./utils";

export interface Declaration {
  /** Repository-relative source file */
  file: string;
  /** Enclosing at-rules and selector, outermost first (e.g. `@media (x)`, `.a:hover`) */
  context: string[];
  /** The innermost selector (or at-rule prelude) */
  selector: string;
  property: string;
  value: string;
}

export interface Stylesheet {
  file: string;
  css: string;
}

const LIB_CORE_SRC = "packages/react/src/";

/** Compiles one SCSS entry (the web components `@react-styles/` alias included) */
export function compileScss(file: string): string {
  return compile(at(file), {
    style: "expanded",
    loadPaths: [at("packages/react/src"), at("packages")],
    importers: [
      {
        findFileUrl(url) {
          if (!url.startsWith("@react-styles/")) return null;
          return new URL(
            url.replace("@react-styles/", ""),
            pathToFileURL(at(LIB_CORE_SRC)),
          );
        },
      },
    ],
    silenceDeprecations: ["import"],
  }).css;
}

const isScssEntry = (file: string) =>
  file.endsWith(".scss") && !/\/_[^/]+\.scss$/.test(file);

/** The design tokens (generated from @minerva/core's token data) */
export const TOKENS_CSS = "packages/core/src/theme/tokens.css";

/** Every component stylesheet (React + web components) and the design tokens */
export function libraryStylesheets(): Stylesheet[] {
  const scss = [
    ...walk("packages/react/src", isScssEntry),
    ...walk("packages/web-components/src", isScssEntry),
  ].map((file) => ({ file, css: compileScss(file) }));
  const tokens = {
    file: TOKENS_CSS,
    css: readFileSync(at(TOKENS_CSS), "utf8"),
  };
  return [...scss, tokens, ...litStylesheets()];
}

/** The inline `css\`\`` templates of the web components (one entry per template) */
export function litStylesheets(): Stylesheet[] {
  return walk(
    "packages/web-components/src",
    (f) => f.endsWith(".ts") && !f.endsWith(".test.ts"),
  ).flatMap((file) =>
    Array.from(
      readFileSync(at(file), "utf8").matchAll(/\bcss`([\s\S]*?)`/g),
      (m) => ({ file, css: m[1].replace(/\$\{[^}]*\}/g, "var(--x)") }),
    ),
  );
}

/** Flat list of the declarations of a stylesheet, with their selector context */
export function declarations({ file, css }: Stylesheet): Declaration[] {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const out: Declaration[] = [];
  const stack: string[] = [];
  let buffer = "";
  let quote: string | null = null;
  let parens = 0;
  const flush = () => {
    const decl = buffer.trim();
    buffer = "";
    const colon = decl.indexOf(":");
    if (!decl || colon < 0 || stack.length === 0) return;
    out.push({
      file,
      context: [...stack],
      selector: stack[stack.length - 1],
      property: decl.slice(0, colon).trim().toLowerCase(),
      value: decl
        .slice(colon + 1)
        .trim()
        .replace(/\s+/g, " "),
    });
  };
  for (const ch of text) {
    if (quote) {
      buffer += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      buffer += ch;
    } else if (ch === "(") {
      parens += 1;
      buffer += ch;
    } else if (ch === ")") {
      parens -= 1;
      buffer += ch;
    } else if (parens > 0) {
      buffer += ch;
    } else if (ch === "{") {
      stack.push(buffer.trim().replace(/\s+/g, " "));
      buffer = "";
    } else if (ch === "}") {
      flush();
      stack.pop();
    } else if (ch === ";") {
      flush();
    } else {
      buffer += ch;
    }
  }
  return out;
}

/** The declarations of every library stylesheet (compiled once per test file) */
export function libraryDeclarations(): Declaration[] {
  return libraryStylesheets().flatMap(declarations);
}

/** Splits a comma-separated value at the top level (not inside parentheses) */
export function splitTopLevel(value: string, separator = ","): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of value) {
    if (ch === "(") depth += 1;
    if (ch === ")") depth -= 1;
    if (ch === separator && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/** Top-level whitespace-separated tokens of a value */
export function tokens(value: string): string[] {
  return splitTopLevel(value.replace(/\s+/g, " "), " ").filter(Boolean);
}
