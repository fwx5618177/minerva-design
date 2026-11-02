import { describe, expect, it } from "vitest";
import {
  detectCodeLanguage,
  highlightCode,
  normalizeCodeLanguage,
  supportedCodeLanguages,
  type CodeLanguage,
} from ".";

const samples: ReadonlyArray<
  [name: string, expected: CodeLanguage, code: string]
> = [
  // JSON
  [
    "a JSON object",
    "json",
    `{
  "name": "minerva-design",
  "version": "1.2.0",
  "private": false,
  "keywords": ["ui", "react"],
  "engines": { "node": ">=18" }
}`,
  ],
  [
    "a JSON array",
    "json",
    `[{"id": 1, "done": true}, {"id": 2, "done": null}]`,
  ],
  [
    "JSON with a trailing comma",
    "json",
    `{
  "theme": "dark",
  "fontSize": 14,
}`,
  ],
  [
    "JSON with comments",
    "json",
    `{
  // editor settings
  "tabSize": 2
}`,
  ],
  // HTML / XML
  [
    "an HTML document",
    "html",
    `<!DOCTYPE html>
<html lang="en">
  <head><title>Chapter 1</title></head>
  <body><p>Hello</p></body>
</html>`,
  ],
  [
    "an HTML fragment",
    "html",
    `<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
  <button type="submit">Join &amp; continue</button>
</form>`,
  ],
  [
    "an XML document",
    "html",
    `<?xml version="1.0" encoding="UTF-8"?>
<package version="3.0"><metadata/></package>`,
  ],
  [
    "a Vue single-file component",
    "html",
    `<template>
  <ul class="list">
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>`,
  ],
  [
    "an EPUB XHTML fragment",
    "html",
    `<div class="chapter">
  <h1 id="c1">Chapter One</h1>
  <p>It begins.</p>
</div>`,
  ],
  [
    "an HTML script block",
    "html",
    `<script>
  const el = document.getElementById("app");
  el.textContent = "Hi";
</script>`,
  ],
  // JavaScript
  [
    "JavaScript with const and arrows",
    "javascript",
    `const items = await fetchItems();
const total = items.reduce((sum, item) => sum + item.price, 0);
console.log(\`Total: \${total}\`);`,
  ],
  [
    "CommonJS",
    "javascript",
    `const fs = require("fs");

function readConfig(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

module.exports = { readConfig };`,
  ],
  [
    "an ES module",
    "javascript",
    `import { createApp } from "vue";
import App from "./App.vue";

export default function mount(selector) {
  if (selector === null) throw new Error("No root");
  createApp(App).mount(selector);
}`,
  ],
  ["a single declaration", "javascript", "const answer = 42;"],
  [
    "a webpack config",
    "javascript",
    `module.exports = {
  mode: "production",
  entry: "./src/index.js",
};`,
  ],
  // TypeScript
  [
    "a TypeScript interface and function",
    "typescript",
    `interface Book {
  id: number;
  title: string;
}

export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\`/api/books/\${id}\`);
  return response.json();
}`,
  ],
  [
    "TypeScript types, enums and as const",
    "typescript",
    `export type Status = "idle" | "loading" | "done";

enum Direction {
  Up,
  Down,
}

export const sizes = ["sm", "md", "lg"] as const;`,
  ],
  [
    "a TypeScript class",
    "typescript",
    `class Store<T> {
  private items: T[] = [];
  constructor(readonly name: string) {}
  add(item: T): void {
    this.items.push(item);
  }
}`,
  ],
  [
    "a generic function",
    "typescript",
    `function identity<T>(value: T): T {
  return value;
}`,
  ],
  // JSX / TSX
  [
    "a React component (JSX)",
    "jsx",
    `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button className="counter" onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
  ],
  [
    "a React component with types (TSX)",
    "tsx",
    `interface Props {
  title: string;
  onClose?: () => void;
}

export const Dialog = ({ title, onClose }: Props) => (
  <div role="dialog">
    <h2>{title}</h2>
    <Button onClick={onClose}>Close</Button>
  </div>
);`,
  ],
  [
    "a JSX fragment",
    "jsx",
    `const list = (
  <>
    <Item label="One" />
    <Item label="Two" />
  </>
);`,
  ],
  ["a single JSX element", "jsx", "<Button onClick={save}>Save</Button>"],
  // Python
  [
    "a Python class",
    "python",
    `@dataclass
class Point:
    x: float = 0.0
    y: float = 0.0

    def norm(self) -> float:
        return math.hypot(self.x, self.y)`,
  ],
  [
    "a Python script",
    "python",
    `import os
from pathlib import Path

def walk(root):
    for path in Path(root).iterdir():
        if path.is_dir():
            walk(path)
        elif path.suffix == ".py":
            print(path)

if __name__ == "__main__":
    walk(os.getcwd())`,
  ],
  [
    "a Python REPL session",
    "python",
    `>>> numbers = [1, 2, 3]
>>> sum(numbers)
6
>>> [n * 2 for n in numbers]
[2, 4, 6]`,
  ],
  [
    "a Python shebang",
    "python",
    `#!/usr/bin/env python3
print("hi")`,
  ],
  [
    "a typed Python function",
    "python",
    `def greet(name: str) -> str:
    return f"Hello {name}"`,
  ],
  // Bash
  [
    "a shell script with a shebang",
    "bash",
    `#!/bin/bash
set -euo pipefail
echo "Building..."`,
  ],
  [
    "shell commands",
    "bash",
    `# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"`,
  ],
  [
    "a terminal session with prompts",
    "bash",
    `$ git clone https://github.com/acme/app.git
$ cd app
$ npm install`,
  ],
  [
    "a shell loop",
    "bash",
    `for file in *.png; do
  convert "$file" -resize 50% "small-$file"
done`,
  ],
  ["a single package manager command", "bash", "npm install --save-dev vitest"],
  [
    "commands with pipes and redirections",
    "bash",
    `cat access.log | grep "404" | sort | uniq -c > errors.txt
ls -la /var/log 2>&1`,
  ],
  // YAML
  [
    "a YAML workflow",
    "yaml",
    `name: CI
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm test`,
  ],
  [
    "a YAML config with a document marker",
    "yaml",
    `---
title: My book
author: Jane Doe
tags:
  - fiction
  - fantasy
published: true`,
  ],
  [
    "an OpenAPI schema",
    "yaml",
    `components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string`,
  ],
  // SQL
  [
    "an SQL query",
    "sql",
    `SELECT u.id, u.name, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.active = 1
GROUP BY u.id
ORDER BY orders DESC;`,
  ],
  [
    "lowercase SQL",
    "sql",
    "select * from books where author_id = 42 order by title;",
  ],
  [
    "SQL DDL and inserts",
    "sql",
    `CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title VARCHAR(200) NOT NULL
);
INSERT INTO books (id, title) VALUES (1, 'Dune');`,
  ],
  // CSS
  [
    "a CSS rule",
    "css",
    `.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  padding: 1rem 1.5rem;
  color: #1f2937 !important;
}`,
  ],
  [
    "CSS with media queries",
    "css",
    `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

@media (max-width: 600px) {
  .sidebar { display: none; }
}`,
  ],
  [
    "a one-line CSS rule",
    "css",
    "h1 { font-size: 2rem; margin-bottom: 0.5em; }",
  ],
  // diff
  [
    "a unified diff",
    "diff",
    `--- a/config.json
+++ b/config.json
@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }`,
  ],
  [
    "a git diff",
    "diff",
    `diff --git a/src/app.ts b/src/app.ts
index 3b18e51..a9c2f01 100644
--- a/src/app.ts
+++ b/src/app.ts
@@ -10,7 +10,7 @@ export function start() {
-  listen(3000);
+  listen(8080);`,
  ],
  [
    "a hunk without headers",
    "diff",
    `-const answer = 41;
+const answer = 42;
 export default answer;`,
  ],
  // Markdown
  [
    "a Markdown README",
    "markdown",
    `# Minerva

A component library for **React**, Vue and Web Components.

## Install

- Run the installer
- Read the [guide](https://example.com/guide)`,
  ],
  [
    "Markdown with a fence",
    "markdown",
    `## Usage

Import the component:

\`\`\`js
import { CodeBlock } from "minerva-design";
\`\`\``,
  ],
  [
    "a Markdown table",
    "markdown",
    `| Prop | Type |
| --- | --- |
| wrap | boolean |`,
  ],
];

const plain: ReadonlyArray<[name: string, code: string]> = [
  ["empty text", ""],
  ["whitespace", "   \n\t\n"],
  ["a word", "hello"],
  ["a number", "42"],
  ["a sentence", "The quick brown fox jumps over the lazy dog."],
  [
    "prose paragraphs",
    `It was a bright cold day in April, and the clocks were striking thirteen.
Winston Smith slipped quickly through the glass doors of Victory Mansions.`,
  ],
  ["an assignment", "x = 1"],
  ["a call", "foo()"],
  ["a single key: value", "Note: see below"],
  ["an empty object", "{}"],
  ["a version string", "v1.2.3"],
  ["a URL", "https://example.com/books/42"],
  [
    "a log excerpt",
    `2024-05-01 12:00:01 INFO  Server started on port 8080
2024-05-01 12:00:05 WARN  Slow request /api/books (1532 ms)`,
  ],
  [
    "a poem",
    "Roses are red,\nViolets are blue,\nSugar is sweet,\nAnd so are you.",
  ],
  [
    "a prose sentence starting with a keyword",
    "Select the file from the menu and press OK.",
  ],
  ["a lone print call", 'print("hello world")'],
  ["a lone heading", "# Title"],
  ["two YAML-like lines", "name: test\nversion: 1"],
  // unsupported languages stay plain rather than mislabelled
  [
    "C",
    '#include <stdio.h>\n\nint main(void) {\n  printf("hi\\n");\n  return 0;\n}',
  ],
  [
    "Java",
    'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hi");\n  }\n}',
  ],
  [
    "Go",
    'package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("hi")\n}',
  ],
  ["Ruby", "class Dog\n  def bark\n    puts 'Woof'\n  end\nend"],
  ["an INI file", "[server]\nport = 8080\nhost = localhost"],
];

describe("detectCodeLanguage", () => {
  it.each(samples)("detects %s", (_name, expected, code) => {
    expect(detectCodeLanguage(code)).toBe(expected);
  });

  it.each(plain)("keeps %s plain", (_name, code) => {
    expect(detectCodeLanguage(code)).toBe("plain");
  });

  it("covers every supported language", () => {
    const detected = new Set<string>(samples.map(([, language]) => language));
    detected.add("plain");
    expect([...detected].sort()).toEqual([...supportedCodeLanguages].sort());
  });

  it("is deterministic and ignores Windows line breaks", () => {
    for (const [, expected, code] of samples) {
      expect(detectCodeLanguage(code.replace(/\n/g, "\r\n"))).toBe(expected);
    }
  });

  it("only reads the head of long code", () => {
    const python = samples.find(([name]) => name === "a Python script")![2];
    const long = `${python}\n${"# padding line\n".repeat(5000)}`;
    expect(detectCodeLanguage(long)).toBe("python");
    // what follows the first 4 KB does not count
    const tail = `${"plain words here\n".repeat(400)}def f(self):\n    pass\n`;
    expect(detectCodeLanguage(tail)).toBe("plain");
  });

  it("detects large or truncated JSON from its shape", () => {
    const rows = Array.from(
      { length: 400 },
      (_, i) => `  {"id": ${i}, "title": "Book ${i}", "read": ${i % 2 === 0}}`,
    );
    expect(detectCodeLanguage(`[\n${rows.join(",\n")}\n]`)).toBe("json");
    expect(detectCodeLanguage(`{"items": [${"1, ".repeat(3000)}1]}`)).toBe(
      "json",
    );
  });

  it("stays fast on large and adversarial input", () => {
    const inputs = [
      "a".repeat(1_000_000),
      `${"<a ".repeat(2000)}`,
      `select ${"x, ".repeat(5000)}`,
      `${"(".repeat(4000)}`,
      `def f(${"a, ".repeat(3000)}`,
      `${" ".repeat(4000)}:`,
    ];
    const start = performance.now();
    for (const input of inputs) detectCodeLanguage(input);
    expect(performance.now() - start).toBeLessThan(500);
  });

  it("never throws on non-string input", () => {
    expect(detectCodeLanguage(undefined as unknown as string)).toBe("plain");
    expect(detectCodeLanguage(42 as unknown as string)).toBe("plain");
  });
});

describe('language "auto"', () => {
  const ts = samples.find(([name]) => name.startsWith("a TypeScript i"))![2];

  it("normalizes to the detected language of the code, else plain", () => {
    expect(normalizeCodeLanguage("auto", ts)).toBe("typescript");
    expect(normalizeCodeLanguage(" AUTO ", "SELECT * FROM t;")).toBe("sql");
    expect(normalizeCodeLanguage("auto")).toBe("plain");
    expect(normalizeCodeLanguage("auto", "hello")).toBe("plain");
    // the code is ignored for explicit languages
    expect(normalizeCodeLanguage("py", ts)).toBe("python");
  });

  it("highlights with the detected language", () => {
    expect(highlightCode(ts, "auto")).toEqual(highlightCode(ts, "typescript"));
    expect(highlightCode("hello", "auto")).toEqual([
      { type: null, text: "hello" },
    ]);
  });
});
