# CodeBlock

Un bloc de texte préformaté en lecture seule (journaux, charges utiles, configuration) dans une région défilante nommée et focalisable au clavier.

Package: minerva-design@1.20.3

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

## Example: Langage automatique

Pour du code dont le langage est inconnu (par ex. un <pre> d'EPUB sans classe), language="auto" le détecte à partir du texte par une heuristique rapide sur ses 4 premiers Ko, puis le colore et affiche le langage détecté dans l'étiquette ; en cas de doute il reste « plain ». Les marques fonctionnent toujours. detectCodeLanguage de minerva-design/core effectue la même détection seule.

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

## Example: Utilisation de base

Le texte est rendu tel quel et les longues lignes reviennent à la ligne par défaut ; language="json" colore la syntaxe.

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

## Example: Bouton de copie

copyable ajoute un bouton de copie en haut à droite ; le résultat (« Copié » / « Échec de la copie ») s'affiche sur le bouton et est annoncé aux lecteurs d'écran. onCopied reçoit le texte copié après une copie réussie.

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

## Example: Langages

language choisit la grammaire : JavaScript / TypeScript (JSX, TSX), JSON, CSS, HTML, Bash, Python, YAML, SQL, diff et Markdown (les alias courants comme ts, sh, py, yml, md fonctionnent). showLanguage ajoute une petite étiquette ; les autres langages sont rendus en texte brut.

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

## Example: Numéros de ligne

showLineNumbers numérote les lignes dans une marge masquée aux lecteurs d'écran ; les numéros ne sont ni sélectionnés ni copiés avec le code.

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

## Example: Marques (surlignages enregistrés)

marks pose des plages de caractères sur la coloration syntaxique (positions dans le code ; en cas de chevauchement, la dernière marque l'emporte). getCodeSelectionRange de minerva-design/core convertit la sélection de l'utilisateur en positions à enregistrer ; onMarkClick signale la marque cliquée (ici : elle est supprimée). La copie copie toujours le code brut.

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

## Example: Journaux défilants

wrap={false} garde les lignes intactes avec défilement horizontal ; maxHeight limite la hauteur.

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
