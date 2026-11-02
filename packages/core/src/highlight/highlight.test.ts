import { describe, expect, it } from "vitest";
import {
  codeLanguageLabel,
  highlightCode,
  highlightTokenTypes,
  normalizeCodeLanguage,
  splitHighlightLines,
  supportedCodeLanguages,
  type HighlightToken,
} from ".";

const join = (tokens: readonly HighlightToken[]) =>
  tokens.map((t) => t.text).join("");

/** Texts of the tokens of a type. */
const of = (code: string, language: string, type: string) =>
  highlightCode(code, language)
    .filter((t) => t.type === type)
    .map((t) => t.text.trim());

const aliases = [
  "js",
  "mjs",
  "cjs",
  "ts",
  "jsonc",
  "json5",
  "scss",
  "less",
  "xml",
  "svg",
  "vue",
  "sh",
  "shell",
  "zsh",
  "console",
  "py",
  "yml",
  "md",
  "text",
];

/** Deterministic PRNG (mulberry32). */
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const alphabet = [
  ..."abcXYZ019 _$@#.,:;=+-*/%!?&|^~<>()[]{}'\"`\\\n\t",
  "${",
  "*/",
  "/*",
  "//",
  "<!--",
  "-->",
  "</",
  "/>",
  "```",
  '"""',
  "@@ ",
  "---",
  "**",
  "é",
  "😀",
  "\r\n",
  "const ",
  "function ",
  "<div ",
  "<script>",
  "</script>",
  "<style>",
  "SELECT ",
  "def ",
  "key: ",
  "- ",
];

describe("normalizeCodeLanguage", () => {
  it.each([
    ["js", "javascript"],
    ["JavaScript", "javascript"],
    ["mjs", "javascript"],
    ["ts", "typescript"],
    [" TSX ", "tsx"],
    ["jsonc", "json"],
    ["scss", "css"],
    ["less", "css"],
    ["xml", "html"],
    ["vue", "html"],
    ["sh", "bash"],
    ["zsh", "bash"],
    ["console", "bash"],
    ["py", "python"],
    ["yml", "yaml"],
    ["md", "markdown"],
    ["language-js", "javascript"],
    ["text", "plain"],
    ["cobol", "plain"],
    ["", "plain"],
    [undefined, "plain"],
    ["constructor", "plain"],
    ["__proto__", "plain"],
  ])("%s -> %s", (input, expected) => {
    expect(normalizeCodeLanguage(input)).toBe(expected);
  });

  it("labels languages", () => {
    expect(codeLanguageLabel(" json ")).toBe("JSON");
  });
});

describe("highlightCode", () => {
  it("round-trips random input for every language", () => {
    const next = random(42);
    for (const language of [...supportedCodeLanguages, ...aliases, "unknown"]) {
      for (let n = 0; n < 150; n++) {
        let code = "";
        const length = Math.floor(next() * 80);
        for (let i = 0; i < length; i++)
          code += alphabet[Math.floor(next() * alphabet.length)];
        const tokens = highlightCode(code, language);
        expect(join(tokens), `${language}: ${JSON.stringify(code)}`).toBe(code);
        for (const token of tokens) {
          expect(token.text).not.toBe("");
          expect(
            token.type === null || highlightTokenTypes.includes(token.type),
          ).toBe(true);
        }
      }
    }
  });

  it("returns plain text without a known language", () => {
    expect(highlightCode("const a = 1", undefined)).toEqual([
      { type: null, text: "const a = 1" },
    ]);
    expect(highlightCode("const a = 1", "plain")).toEqual([
      { type: null, text: "const a = 1" },
    ]);
    expect(highlightCode("", "js")).toEqual([]);
  });

  it("never throws on unexpected input", () => {
    expect(() =>
      highlightCode(undefined as unknown as string, "js"),
    ).not.toThrow();
    expect(highlightCode(42 as unknown as string, "json")).toEqual([
      { type: "number", text: "42" },
    ]);
    expect(highlightCode(null as unknown as string, "js")).toEqual([]);
  });

  it("falls back to plain text over 200,000 characters", () => {
    const code = "a".repeat(200_001);
    expect(highlightCode(code, "js")).toEqual([{ type: null, text: code }]);
  });

  it("highlights JSON keys and values", () => {
    const code =
      '{\n  "id": 42,\n  "name": "Ada",\n  "ok": true,\n  "x": null, "n": -1.5e3\n}';
    expect(of(code, "json", "property")).toEqual([
      '"id"',
      '"name"',
      '"ok"',
      '"x"',
      '"n"',
    ]);
    expect(of(code, "json", "string")).toEqual(['"Ada"']);
    expect(of(code, "json", "number")).toEqual(["42", "-1.5e3"]);
    expect(of(code, "json", "boolean")).toEqual(["true"]);
    expect(of(code, "json", "null")).toEqual(["null"]);
    expect(of('{ "a" : 1 } // note', "jsonc", "comment")).toEqual(["// note"]);
  });

  it("highlights JavaScript / TypeScript", () => {
    const code = [
      "/* block",
      "   comment */",
      "import { a } from 'mod';",
      "const greet = (name: string) => `Hi ${name.toUpperCase()}!`;",
      "const re = /a[/]b/g; const half = 4 / 2;",
      "const obj = { key: 1, other: true };",
      "@Component()",
      "export interface Props { size?: number }",
    ].join("\n");
    const tokens = highlightCode(code, "ts");
    expect(join(tokens)).toBe(code);
    expect(of(code, "ts", "comment")).toEqual(["/* block\n   comment */"]);
    expect(of(code, "ts", "keyword")).toEqual(
      expect.arrayContaining([
        "import",
        "from",
        "const",
        "export",
        "interface",
      ]),
    );
    expect(of(code, "ts", "string")).toEqual(["'mod'", "`Hi", "!`"]);
    expect(of(code, "ts", "function")).toEqual(["toUpperCase", "@Component"]);
    expect(of(code, "ts", "regex")).toEqual(["/a[/]b/g"]);
    expect(of(code, "ts", "property")).toEqual(["key", "other", "size"]);
    expect(of(code, "ts", "builtin")).toEqual(["string", "Props", "number"]);
    expect(of(code, "ts", "boolean")).toEqual(["true"]);
    // `${` and `}` of the interpolation are punctuation, `/ 2` a division.
    expect(of(code, "ts", "punctuation")).toContain("${");
    expect(of(code, "ts", "operator")).toContain("/");
  });

  it("highlights JSX elements", () => {
    const code =
      'const el = <Button kind="primary" onClick={() => go(1)}>Go {name}</Button>;';
    expect(of(code, "jsx", "tag")).toEqual(["Button", "Button"]);
    expect(of(code, "jsx", "attr-name")).toEqual(["kind", "onClick"]);
    expect(of(code, "jsx", "attr-value")).toEqual(['"primary"']);
    expect(of(code, "jsx", "function")).toEqual(["go"]);
    expect(of(code, "tsx", "tag")).toEqual(["Button", "Button"]);
    expect(of("a < b", "jsx", "tag")).toEqual([]);
  });

  it("highlights HTML", () => {
    const code =
      '<!doctype html>\n<!-- note -->\n<a href="/x" data-id=3 hidden>Link &amp; more</a>\n<script>const n = 1;</script>\n<style>p { color: red }</style>';
    expect(of(code, "html", "comment")).toEqual(["<!-- note -->"]);
    expect(of(code, "html", "keyword")).toEqual(
      expect.arrayContaining(["<!doctype html>", "const"]),
    );
    expect(of(code, "html", "tag")).toEqual([
      "a",
      "a",
      "script",
      "script",
      "style",
      "p",
      "style",
    ]);
    expect(of(code, "html", "attr-name")).toEqual([
      "href",
      "data-id",
      "hidden",
    ]);
    expect(of(code, "html", "attr-value")).toEqual(['"/x"', "3"]);
    expect(of(code, "html", "builtin")).toEqual(["&amp;"]);
    expect(of(code, "html", "number")).toContain("1");
    expect(of(code, "html", "property")).toEqual(["color"]);
  });

  it("highlights CSS", () => {
    const code =
      "/* c */\n.card > a:hover, #main {\n  --gap: 4px;\n  color: #fff !important;\n  background: url(img.png);\n  margin: calc(1rem + 2px);\n}\n@media (max-width: 600px) { p { top: 0 } }";
    expect(of(code, "css", "comment")).toEqual(["/* c */"]);
    expect(of(code, "css", "attr-name")).toEqual([".card", ":hover", "#main"]);
    expect(of(code, "css", "tag")).toEqual(["a", "p"]);
    expect(of(code, "css", "variable")).toEqual(["--gap"]);
    expect(of(code, "css", "property")).toEqual([
      "color",
      "background",
      "margin",
      "max-width",
      "top",
    ]);
    expect(of(code, "css", "number")).toEqual([
      "4px",
      "#fff",
      "1rem",
      "2px",
      "600px",
      "0",
    ]);
    expect(of(code, "css", "keyword")).toEqual(["!important", "@media"]);
    expect(of(code, "css", "function")).toEqual(["url", "calc"]);
    expect(of(code, "css", "string")).toEqual(["img.png"]);
  });

  it("highlights bash", () => {
    const code =
      '# install\nexport NODE_ENV=production\npnpm add minerva-design && echo "Done in $HOME/${DIR}" | tee log.txt\nif [ -f "$FILE" ]; then rm -rf dist; fi';
    expect(of(code, "bash", "comment")).toEqual(["# install"]);
    expect(of(code, "bash", "keyword")).toEqual(["export", "if", "then", "fi"]);
    expect(of(code, "bash", "variable")).toEqual([
      "NODE_ENV",
      "$HOME",
      "${DIR}",
      "$FILE",
    ]);
    expect(of(code, "bash", "function")).toEqual(["pnpm", "echo", "tee", "rm"]);
    expect(of(code, "bash", "string")).toEqual([
      '"Done in',
      "/",
      '"',
      '"',
      '"',
    ]);
    expect(of("echo a#b", "bash", "comment")).toEqual([]);
  });

  it("highlights Python", () => {
    const code =
      '@dataclass\nclass Point:\n    """Doc."""\n    def norm(self) -> float:\n        return abs(self.x) if True else None  # c';
    expect(of(code, "python", "function")).toEqual([
      "@dataclass",
      "norm",
      "abs",
    ]);
    expect(of(code, "python", "keyword")).toEqual([
      "class",
      "def",
      "return",
      "if",
      "else",
    ]);
    expect(of(code, "python", "builtin")).toEqual([
      "Point",
      "self",
      "float",
      "self",
    ]);
    expect(of(code, "python", "string")).toEqual(['"""Doc."""']);
    expect(of(code, "python", "boolean")).toEqual(["True"]);
    expect(of(code, "python", "null")).toEqual(["None"]);
    expect(of(code, "python", "comment")).toEqual(["# c"]);
  });

  it("highlights YAML", () => {
    const code =
      "# c\nname: minerva\nversion: 1.2\nprivate: true\nlist:\n  - a: ~\n    b: 'x'\n";
    expect(of(code, "yaml", "comment")).toEqual(["# c"]);
    expect(of(code, "yaml", "property")).toEqual([
      "name",
      "version",
      "private",
      "list",
      "a",
      "b",
    ]);
    expect(of(code, "yaml", "string")).toEqual(["minerva", "'x'"]);
    expect(of(code, "yaml", "number")).toEqual(["1.2"]);
    expect(of(code, "yaml", "boolean")).toEqual(["true"]);
    expect(of(code, "yaml", "null")).toEqual(["~"]);
  });

  it("highlights SQL", () => {
    const code =
      "SELECT id, count(*) FROM users WHERE name = 'a' AND age > 18; -- c";
    expect(of(code, "sql", "keyword")).toEqual([
      "SELECT",
      "FROM",
      "WHERE",
      "AND",
    ]);
    expect(of(code, "sql", "function")).toEqual(["count"]);
    expect(of(code, "sql", "string")).toEqual(["'a'"]);
    expect(of(code, "sql", "number")).toEqual(["18"]);
    expect(of(code, "sql", "comment")).toEqual(["-- c"]);
  });

  it("highlights diffs", () => {
    const code = "--- a/x\n+++ b/x\n@@ -1,2 +1,2 @@\n context\n-old\n+new";
    expect(of(code, "diff", "keyword")).toEqual(["--- a/x", "+++ b/x"]);
    expect(of(code, "diff", "heading")).toEqual(["@@ -1,2 +1,2 @@"]);
    expect(of(code, "diff", "deleted")).toEqual(["-old"]);
    expect(of(code, "diff", "inserted")).toEqual(["+new"]);
  });

  it("highlights Markdown", () => {
    const code =
      '# Title\n\nSome **bold**, _em_ and `code` with a [link](https://x.y).\n\n- item\n\n```json\n{ "a": 1 }\n```\n';
    expect(of(code, "md", "heading")).toEqual(["# Title"]);
    expect(of(code, "md", "keyword")).toEqual(["**bold**", "_em_"]);
    expect(of(code, "md", "string")).toEqual(["`code`"]);
    // The fenced block is highlighted as JSON.
    expect(of(code, "md", "property")).toEqual(["[link]", '"a"']);
    expect(of(code, "md", "attr-value")).toEqual(["(https://x.y)"]);
    expect(of(code, "md", "punctuation")).toEqual(
      expect.arrayContaining(["-", "```json", "```"]),
    );
    expect(of(code, "md", "number")).toEqual(["1"]);
    expect(of("snake_case_name", "md", "keyword")).toEqual([]);
  });

  it("stays fast on pathological input", () => {
    const n = 100_000;
    const cases: [string, string][] = [
      ["/*".repeat(n / 2), "js"],
      ['"'.repeat(n), "js"],
      ["`${".repeat(n / 3), "ts"],
      ["{".repeat(n), "tsx"],
      ["(/[".repeat(n / 3), "js"],
      ["(/".repeat(n / 2), "js"],
      ["<a ".repeat(n / 3), "jsx"],
      ["<a>".repeat(n / 3), "jsx"],
      ["<a{".repeat(n / 3), "tsx"],
      ["<!--".repeat(n / 4), "html"],
      ["<script>".repeat(n / 8), "html"],
      ['"\\'.repeat(n / 2), "json"],
      ['"a"'.repeat(n / 3), "json"],
      ["**a".repeat(n / 3), "md"],
      ["_a ".repeat(n / 3), "md"],
      ["[".repeat(n), "md"],
      ["```".repeat(n / 3), "md"],
      ["\n```".repeat(n / 4), "md"],
      ["{a".repeat(n / 2), "yaml"],
      ["a:a".repeat(n / 3), "yaml"],
      ["key: value\n".repeat(n / 11), "yaml"],
      [" ".repeat(n), "yaml"],
      ["$".repeat(n), "bash"],
      ['"$'.repeat(n / 2), "bash"],
      ["'''".repeat(n / 3), "python"],
      ["@".repeat(n), "python"],
      ["url(".repeat(n / 4), "css"],
      ["{a:".repeat(n / 3), "css"],
      ["'".repeat(n), "sql"],
      ["@@".repeat(n / 2), "diff"],
      ["a".repeat(n), "js"],
    ];
    for (const [code, language] of cases) {
      const start = performance.now();
      const tokens = highlightCode(code, language);
      const elapsed = performance.now() - start;
      expect(join(tokens), `${language}: ${code.slice(0, 12)}`).toBe(code);
      expect(elapsed, `${language}: ${code.slice(0, 12)}`).toBeLessThan(1500);
    }
  });
});

describe("splitHighlightLines", () => {
  it("splits tokens into lines without the breaks", () => {
    const lines = splitHighlightLines(
      highlightCode('{\n  "a": 1\n}\n', "json"),
    );
    expect(lines.map((line) => line.map((t) => t.text).join(""))).toEqual([
      "{",
      '  "a": 1',
      "}",
    ]);
    expect(lines[1].find((t) => t.type === "property")?.text).toBe('"a"');
    expect(splitHighlightLines([])).toEqual([[]]);
    expect(splitHighlightLines([{ type: null, text: "a\n\nb" }]).length).toBe(
      3,
    );
  });
});
