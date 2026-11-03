# CodeBlock 代码块

只读的预格式化文本块（日志、请求体、配置），位于有名称且可键盘聚焦的滚动区域中。

Package: minerva-design@1.20.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeBlock

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "CodeBlock"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "aria-label",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the scrollable code region (the native `aria-label` / `aria-labelledby` attributes also work)"
  },
  {
    "name": "wrap",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Wraps long lines (pre-wrap) instead of scrolling horizontally"
  },
  {
    "name": "maxHeight",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "24rem",
    "required": false,
    "description": "Maximum height before the block scrolls (numbers are pixels)"
  },
  {
    "name": "tabIndex",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Tab order of the region; it is focusable by default so keyboard users can scroll it"
  },
  {
    "name": "copyable",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a copy button in the top-right corner that writes the text to the clipboard; its label switches to \"Copied\" / \"Copy failed\" for about two seconds and the result is announced through a polite live region. When set, the <pre> is wrapped in a <div> (see the interface description)"
  },
  {
    "name": "language",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Language of the code: highlights its syntax and sets `class=\"language-<x>\"` / `data-language` on the <code>. Supported: javascript (js, mjs, cjs), typescript (ts), jsx, tsx, json (jsonc, json5), css (scss, less), html (xml, svg, vue), bash (sh, shell, zsh, console), python (py), yaml (yml), sql, diff, markdown (md); other names render plain text. `\"auto\"` detects the language from the text (`detectCodeLanguage` of minerva-design/core, \"plain\" when unsure): the class, `data-language` and the label show the detected name. Without it the text is not highlighted"
  },
  {
    "name": "highlight",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Highlights the syntax of `language` (false: plain text, the language is still set on the <code> and shown by `showLanguage`)"
  },
  {
    "name": "showLineNumbers",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Numbers the lines in a gutter (hidden from assistive technology, not part of the copied or selected text)"
  },
  {
    "name": "showLanguage",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the `language` as a small label in the top-right corner (e.g. \"JSON\"); the <pre> is then wrapped in a <div> like with `copyable`"
  },
  {
    "name": "marks",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "array",
    "typeText": "readonly CodeMark[] | undefined",
    "typeRef": "type:e3bf662d746e3e0cae53",
    "required": false,
    "description": "Character ranges to mark (saved highlights, annotations, search hits), rendered as <mark> elements over the syntax highlighting (the token colors are kept; the copied text stays the raw code). `start` / `end` are UTF-16 offsets into the code string (`children`), clamped to it; empty ranges are ignored. Marks may cross tokens and lines (with `showLineNumbers` a mark is cut at each line break). Where marks overlap, the later one in the array wins (its color, class, title and click); the earlier one is cut around it. Each element gets `data-mark-id` (the mark's `id`) and the mark's `className` / `title`; `color` is a theme color name (a translucent tint) or any CSS color (default: translucent yellow, `--code-block-mark-bg`). To create one from the user's selection, see `getCodeSelectionRange` of `minerva-design/core`"
  }
]
```

### events

```json
[
  {
    "name": "onCopied",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "function",
    "typeText": "((text: string) => void) | undefined",
    "typeRef": "type:d655eaa090c1e416e713",
    "parameters": [
      {
        "name": "text",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the copied text after the copy button wrote it to the clipboard (not on failure). The counterpart of the `minerva-copy` event of `<minerva-code-block>` (`detail.text`, with `detail.success`); named `onCopied` so it does not replace the native `onCopy` clipboard event handler, which still goes to the element"
  },
  {
    "name": "onMarkClick",
    "source": "packages/react/src/components/CodeBlock/types.ts",
    "kind": "function",
    "typeText": "((mark: CodeMark, event: MouseEvent<HTMLElement, MouseEvent>) => void) | undefined",
    "typeRef": "type:2349b96de7a1a56edfc3",
    "parameters": [
      {
        "name": "mark",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CodeMark",
        "typeRef": "type:b9f2b083b85896c2884a"
      },
      {
        "name": "event",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLElement, MouseEvent>",
        "typeRef": "type:8a31e3515c88e9f54069"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is clicked (not at the end of a text selection drag), with the mark object of `marks` (the topmost one where marks overlap). Marks are not focusable: offer a keyboard path to the same action (a list of the highlights, for example)"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## API

```json
{
  "CodeBlockProps": {
    "source": "react/src/components/CodeBlock/types.ts",
    "description": "DOM placement: without `copyable` / `showLanguage` the root is the <pre> region and it receives `className`, `style`, `ref` and every native attribute. With `copyable` or a shown language label the <pre> is wrapped in a positioned <div> (the copy button and the label cannot live inside <pre>); `className`, `style` (including the `maxHeight` cap) and native attributes then go to that outermost <div>, while `ref`, `tabIndex`, `aria-label`, `aria-labelledby` and `aria-describedby` stay on the <pre> region.",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLPreElement>, \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "string",
        "required": true,
        "description": "Source text, rendered verbatim (never parsed as HTML)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Code\" (localized)",
        "description": "Accessible name of the scrollable code region (the native `aria-label` / `aria-labelledby` attributes also work)"
      },
      {
        "name": "wrap",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Wraps long lines (pre-wrap) instead of scrolling horizontally"
      },
      {
        "name": "maxHeight",
        "type": "string | number",
        "required": false,
        "default": "\"24rem\"",
        "description": "Maximum height before the block scrolls (numbers are pixels)"
      },
      {
        "name": "tabIndex",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Tab order of the region; it is focusable by default so keyboard users can scroll it"
      },
      {
        "name": "copyable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a copy button in the top-right corner that writes the text to the clipboard; its label switches to \"Copied\" / \"Copy failed\" for about two seconds and the result is announced through a polite live region. When set, the <pre> is wrapped in a <div> (see the interface description)"
      },
      {
        "name": "onCopied",
        "type": "(text: string) => void",
        "required": false,
        "description": "Called with the copied text after the copy button wrote it to the clipboard (not on failure). The counterpart of the `minerva-copy` event of `<minerva-code-block>` (`detail.text`, with `detail.success`); named `onCopied` so it does not replace the native `onCopy` clipboard event handler, which still goes to the element"
      },
      {
        "name": "language",
        "type": "string",
        "required": false,
        "description": "Language of the code: highlights its syntax and sets `class=\"language-<x>\"` / `data-language` on the <code>. Supported: javascript (js, mjs, cjs), typescript (ts), jsx, tsx, json (jsonc, json5), css (scss, less), html (xml, svg, vue), bash (sh, shell, zsh, console), python (py), yaml (yml), sql, diff, markdown (md); other names render plain text. `\"auto\"` detects the language from the text (`detectCodeLanguage` of minerva-design/core, \"plain\" when unsure): the class, `data-language` and the label show the detected name. Without it the text is not highlighted"
      },
      {
        "name": "highlight",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Highlights the syntax of `language` (false: plain text, the language is still set on the <code> and shown by `showLanguage`)"
      },
      {
        "name": "showLineNumbers",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Numbers the lines in a gutter (hidden from assistive technology, not part of the copied or selected text)"
      },
      {
        "name": "showLanguage",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the `language` as a small label in the top-right corner (e.g. \"JSON\"); the <pre> is then wrapped in a <div> like with `copyable`"
      },
      {
        "name": "marks",
        "type": "readonly CodeMark[]",
        "required": false,
        "description": "Character ranges to mark (saved highlights, annotations, search hits), rendered as <mark> elements over the syntax highlighting (the token colors are kept; the copied text stays the raw code). `start` / `end` are UTF-16 offsets into the code string (`children`), clamped to it; empty ranges are ignored. Marks may cross tokens and lines (with `showLineNumbers` a mark is cut at each line break). Where marks overlap, the later one in the array wins (its color, class, title and click); the earlier one is cut around it. Each element gets `data-mark-id` (the mark's `id`) and the mark's `className` / `title`; `color` is a theme color name (a translucent tint) or any CSS color (default: translucent yellow, `--code-block-mark-bg`). To create one from the user's selection, see `getCodeSelectionRange` of `minerva-design/core`"
      },
      {
        "name": "onMarkClick",
        "type": "(mark: CodeMark, event: MouseEvent<HTMLElement>) => void",
        "required": false,
        "description": "Called when a mark is clicked (not at the end of a text selection drag), with the mark object of `marks` (the topmost one where marks overlap). Marks are not focusable: offer a keyboard path to the same action (a list of the highlights, for example)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLPreElement>",
        "required": false,
        "description": "Ref to the <pre> element (also when copyable)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:CodeBlock": {
    "kind": "cssVars",
    "source": "react/src/components/CodeBlock",
    "vars": [
      {
        "name": "--code-block-padding",
        "description": "Inner padding"
      },
      {
        "name": "--code-block-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--code-block-bg",
        "description": "Background color"
      },
      {
        "name": "--code-block-border-color",
        "description": "Border color"
      },
      {
        "name": "--code-block-font-size",
        "description": "Font size of the code"
      },
      {
        "name": "--code-block-max-height",
        "description": "Maximum height before the block scrolls (default: none)"
      },
      {
        "name": "--code-block-line-number-color",
        "description": "Color of the line numbers"
      },
      {
        "name": "--code-block-mark-bg",
        "description": "Default background of the marks (default: a translucent yellow)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 自动识别语言

对语言未知的代码（例如没有 class 的 EPUB <pre>），language="auto" 通过快速启发式（只读取前 4 KB）从文本识别语言，再高亮并在标签中显示识别结果；无法确定时为 "plain"。标记（marks）照常可用。minerva-design/core 的 detectCodeLanguage 可单独执行同样的识别。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/demos/auto-language.tsx

```tsx
import { useState } from "react";
import { CodeBlock, Textarea } from "minerva-design";

// Code extracted without a language (e.g. an EPUB <pre> without a class):
// language="auto" detects it from the text (detectCodeLanguage of
// minerva-design/core) and the label shows what was detected.
const snippets = [
  `{
  "title": "The Little Prince",
  "year": 1943,
  "tags": ["novella", "classic"]
}`,
  `def word_count(path):
    with open(path) as f:
        return len(f.read().split())

print(word_count("book.txt"))`,
  `SELECT title, COUNT(*) AS readers
FROM books
JOIN reads ON reads.book_id = books.id
GROUP BY title
ORDER BY readers DESC;`,
  `$ mkdir -p out && cd out
$ curl -sSL https://example.com/book.epub -o book.epub
$ unzip -q book.epub | grep -v META-INF`,
  `server:
  port: 8080
  hosts:
    - reader.example.com
    - api.example.com`,
  `It was a dark and stormy night;
the rain fell in torrents.`,
];

export default function AutoLanguageDemo() {
  const [code, setCode] = useState(
    "const total = items.reduce((sum, item) => sum + item.price, 0);",
  );
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {snippets.map((snippet, i) => (
        <CodeBlock
          key={i}
          aria-label={`Snippet ${i + 1}`}
          language="auto"
          showLanguage
        >
          {snippet}
        </CodeBlock>
      ))}
      <Textarea
        aria-label="Code to detect"
        rows={4}
        placeholder="Paste some code"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <CodeBlock aria-label="Pasted code" language="auto" showLanguage>
        {code}
      </CodeBlock>
    </div>
  );
}

```

## Example: 基础用法

文本按原样渲染，默认长行自动换行；language="json" 开启语法高亮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/demos/basic.tsx

```tsx
import { CodeBlock } from "minerva-design";

const payload = JSON.stringify(
  { id: 42, title: "The Three-Body Problem", tags: ["sci-fi", "classic"] },
  null,
  2,
);

export default function BasicDemo() {
  return (
    <CodeBlock aria-label="Response payload" language="json">
      {payload}
    </CodeBlock>
  );
}

```

## Example: 复制按钮

copyable 在右上角添加复制按钮；结果（“已复制” / “复制失败”）显示在按钮上并播报给屏幕阅读器。复制成功后，onCopied 会收到被复制的文本。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/demos/copyable.tsx

```tsx
import { useState } from "react";
import { CodeBlock } from "minerva-design";

const command = "pnpm add minerva-design minerva-design/core";

export default function CopyableDemo() {
  const [copied, setCopied] = useState("");
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <CodeBlock
        aria-label="Install command"
        copyable
        onCopied={(text) => setCopied(`Copied ${text.length} characters`)}
      >
        {command}
      </CodeBlock>
      <output>{copied}</output>
    </div>
  );
}

```

## Example: 多种语言

language 选择语法：JavaScript / TypeScript（JSX、TSX）、JSON、CSS、HTML、Bash、Python、YAML、SQL、diff 与 Markdown（支持 ts、sh、py、yml、md 等常用别名）。showLanguage 显示小标签；其他语言按纯文本渲染。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/demos/languages.tsx

```tsx
import { CodeBlock } from "minerva-design";

const samples = [
  {
    language: "ts",
    code: `interface Book {
  id: number;
  title: string;
}

export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\`/api/books/\${id}\`);
  return response.json(); // typed by the caller
}`,
  },
  {
    language: "css",
    code: `.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  padding: 1rem 1.5rem;
  color: #1f2937 !important;
}`,
  },
  {
    language: "html",
    code: `<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
  <button type="submit">Join &amp; continue</button>
</form>`,
  },
  {
    language: "bash",
    code: `# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"`,
  },
  {
    language: "python",
    code: `@dataclass
class Point:
    x: float = 0.0

    def norm(self) -> float:
        return abs(self.x)  # distance to 0`,
  },
  {
    language: "diff",
    code: `--- a/config.json
+++ b/config.json
@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }`,
  },
];

export default function LanguagesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {samples.map(({ language, code }) => (
        <CodeBlock
          key={language}
          aria-label={`${language} example`}
          language={language}
          showLanguage
        >
          {code}
        </CodeBlock>
      ))}
    </div>
  );
}

```

## Example: 行号

showLineNumbers 在左侧显示行号，行号对屏幕阅读器隐藏，选择或复制代码时不会包含行号。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/demos/line-numbers.tsx

```tsx
import { CodeBlock } from "minerva-design";

const source = `import { useState } from "react";
import { Button } from "minerva-design";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount((n) => n + 1)}>
      Clicked {count} times
    </Button>
  );
}`;

export default function LineNumbersDemo() {
  return (
    <CodeBlock
      aria-label="Counter component"
      language="tsx"
      showLineNumbers
      showLanguage
      copyable
    >
      {source}
    </CodeBlock>
  );
}

```

## Example: 标记（已保存的高亮）

marks 在语法高亮之上叠加字符范围（代码中的偏移量；重叠时数组中靠后的标记优先）。minerva-design/core 的 getCodeSelectionRange 将用户的选区转换为可保存的偏移量；onMarkClick 报告被点击的标记（此处为删除）。复制仍复制原始代码。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/demos/marks.tsx

```tsx
import { useRef, useState } from "react";
import { Button, CodeBlock, type CodeMark } from "minerva-design";
import { getCodeSelectionRange } from "minerva-design/core";

const source = `export async function fetchUser(id: string) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}`;

// offsets are UTF-16 offsets into `source` (e.g. from getCodeSelectionRange)
const initial: CodeMark[] = [
  { id: "n1", start: 71, end: 96, title: "Template literal URL" },
  {
    id: "n2",
    start: 104,
    end: 116,
    color: "danger",
    title: "Check the status",
  },
];

export default function MarksDemo() {
  const ref = useRef<HTMLPreElement>(null);
  const [marks, setMarks] = useState(initial);
  const [status, setStatus] = useState("");

  const highlightSelection = () => {
    const range = ref.current && getCodeSelectionRange(ref.current);
    if (!range) return setStatus("Select some code first");
    const id = `n${Date.now()}`;
    setMarks((list) => [
      ...list,
      { id, start: range.start, end: range.end, color: "success" },
    ]);
    setStatus(`Highlighted “${range.text}” (${range.start}–${range.end})`);
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <CodeBlock
        ref={ref}
        aria-label="Annotated function"
        language="ts"
        showLineNumbers
        copyable
        marks={marks}
        onMarkClick={(mark) => {
          setMarks((list) => list.filter((m) => m.id !== mark.id));
          setStatus(`Removed ${mark.title ?? "highlight"}`);
        }}
      >
        {source}
      </CodeBlock>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Button
          size="small"
          variant="outline"
          // keep the selection: do not move the focus on press
          onMouseDown={(event) => event.preventDefault()}
          onClick={highlightSelection}
        >
          Highlight selection
        </Button>
        <Button size="small" variant="ghost" onClick={() => setMarks([])}>
          Clear
        </Button>
        <output>{status}</output>
      </div>
    </div>
  );
}

```

## Example: 滚动日志

wrap={false} 保持行完整并水平滚动；maxHeight 限制高度。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/demos/no-wrap.tsx

```tsx
import { CodeBlock } from "minerva-design";

const log = [
  "2026-10-07T09:12:01Z INFO  request id=7f3a path=/api/books?page=1&size=20&sort=rating",
  "2026-10-07T09:12:02Z WARN  slow query took=1834ms table=reviews",
].join("\n");

export default function NoWrapDemo() {
  return (
    <CodeBlock aria-label="Server log" wrap={false} maxHeight={160}>
      {log}
    </CodeBlock>
  );
}

```
