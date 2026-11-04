# CodeBlock

Un bloc de texte préformaté en lecture seule (journaux, charges utiles, configuration) dans une région défilante nommée et focalisable au clavier.

Package: minerva-design@1.20.2

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeBlock

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/code-block",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "code",
    "typeText": "string | undefined",
    "attribute": "code",
    "required": false
  },
  {
    "name": "language",
    "typeText": "string | undefined",
    "attribute": "language",
    "required": false
  },
  {
    "name": "noHighlight",
    "typeText": "boolean",
    "attribute": "no-highlight",
    "required": false
  },
  {
    "name": "showLineNumbers",
    "typeText": "boolean",
    "attribute": "show-line-numbers",
    "required": false
  },
  {
    "name": "showLanguage",
    "typeText": "boolean",
    "attribute": "show-language",
    "required": false
  },
  {
    "name": "noWrap",
    "typeText": "boolean",
    "attribute": "no-wrap",
    "required": false
  },
  {
    "name": "maxHeight",
    "typeText": "string",
    "attribute": "max-height",
    "required": false
  },
  {
    "name": "copyable",
    "typeText": "boolean",
    "attribute": "copyable",
    "required": false
  },
  {
    "name": "marks",
    "typeText": "readonly CodeMark[] | undefined",
    "attribute": "marks",
    "required": false
  },
  {
    "name": "clickableMarks",
    "typeText": "boolean",
    "attribute": "clickable-marks",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-copy",
    "typeText": "CustomEvent<{ text: string; success: boolean; }>",
    "detailType": {
      "typeText": "{ text: string; success: boolean; }",
      "typeRef": "type:e8eb6fd95ae063912bd1"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The copy button (or `copy()`) was used: `detail: { text, success }` (`text` is the copied text; React's `onCopied` is called with it on success)."
  },
  {
    "name": "minerva-mark-click",
    "typeText": "CustomEvent<{ mark: CodeMark; originalEvent: MouseEvent; }>",
    "detailType": {
      "typeText": "{ mark: CodeMark; originalEvent: MouseEvent; }",
      "typeRef": "type:4a16aaf74a840bafdb72"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A mark was clicked (not at the end of a text selection drag): `detail: { mark, originalEvent }` (`mark` is the item of `marks`, the topmost where they overlap; React's `onMarkClick`)."
  }
]
```

## API

```json
{
  "wc:minerva-code-block": {
    "kind": "element",
    "source": "web-components/src/components/code-block/code-block.ts",
    "className": "MinervaCodeBlock",
    "summary": "Read-only, scrollable code region with syntax highlighting and an optional copy button.",
    "description": "A read-only block of preformatted text: logs, payloads, configuration (`<CodeBlock>` of React). It is a named, keyboard-focusable region so its overflow can be scrolled without a mouse. The text is the `code` property, else the element's text content (rendered verbatim, never parsed as HTML; escape `<` in markup or set `code`). `language` highlights the syntax (colored spans, see `--code-token-<type>-color`; `no-highlight` keeps plain text) and sets `class=\"language-<x>\"` / `data-language` on the `<code>` (`language=\"auto\"` detects it from the text); `show-language` shows it as a small label, `show-line-numbers` numbers the lines. With `copyable`, a copy button writes the text to the clipboard; its label switches to \"Copied\" / \"Copy failed\" for two seconds and the result is announced through a polite live region. `marks` wraps character ranges in `<mark>`s over the highlighting; `getSelectionRange()` maps the user's selection to offsets to create them.",
    "properties": [
      {
        "name": "code",
        "attribute": "code",
        "type": "string | undefined",
        "description": "Source text (default: the element's text content)"
      },
      {
        "name": "language",
        "attribute": "language",
        "type": "string | undefined",
        "description": "Language of the code: highlights its syntax (javascript / js, typescript / ts, jsx, tsx, json, css / scss, html / xml / vue, bash / sh, python / py, yaml, sql, diff, markdown / md; other names render plain text) and sets `class=\"language-<x>\"` / `data-language` on the `<code>`. `auto` detects the language from the text (`detectCodeLanguage`, \"plain\" when unsure): the `<code>` and the label then show the detected name"
      },
      {
        "name": "noHighlight",
        "attribute": "no-highlight",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the code plain (no syntax highlighting) despite `language` (the React library's `highlight={false}`)"
      },
      {
        "name": "showLineNumbers",
        "attribute": "show-line-numbers",
        "type": "boolean",
        "default": "false",
        "description": "Numbers the lines in a gutter (aria-hidden, not part of the copied text)"
      },
      {
        "name": "showLanguage",
        "attribute": "show-language",
        "type": "boolean",
        "default": "false",
        "description": "Shows the `language` as a small label in the top-right corner (e.g. \"JSON\")"
      },
      {
        "name": "noWrap",
        "attribute": "no-wrap",
        "type": "boolean",
        "default": "false",
        "description": "Scrolls long lines horizontally instead of wrapping them (the React library's `wrap={false}`)"
      },
      {
        "name": "maxHeight",
        "attribute": "max-height",
        "type": "string",
        "default": "\"24rem\"",
        "description": "Maximum height before the block scrolls (CSS value, numbers are pixels)"
      },
      {
        "name": "copyable",
        "attribute": "copyable",
        "type": "boolean",
        "default": "false",
        "description": "Shows a copy button writing the text to the clipboard"
      },
      {
        "name": "marks",
        "attribute": "marks",
        "type": "readonly CodeMark[] | undefined",
        "description": "Character ranges to mark (saved highlights, annotations, search hits), rendered as `<mark part=\"code-mark\">` over the syntax highlighting (the copied text stays the raw code). `start` / `end` are UTF-16 offsets into `text`, clamped to it; empty ranges are ignored. Marks may cross tokens and lines (with show-line-numbers a mark is cut at each line break). Where marks overlap, the later one in the array wins (its color, class, title and click). `color`: a theme color name (a translucent tint) or any CSS color (default: translucent yellow, `--code-block-mark-bg`). Set the property, or a JSON array in the `marks` attribute"
      },
      {
        "name": "clickableMarks",
        "attribute": "clickable-marks",
        "type": "boolean",
        "default": "false",
        "description": "Gives the marks a click affordance (pointer cursor, hover underline): set it when listening to `minerva-mark-click`"
      },
      {
        "name": "text",
        "type": "string",
        "readonly": true,
        "description": "The text shown (and copied)"
      }
    ],
    "methods": [
      {
        "name": "getSelectionRange",
        "signature": "(selection?: Selection | AbstractRange | null) => CodeSelectionRange | null",
        "description": "Offsets in `text` of the user's selection inside the code (to save it as a mark), `null` when nothing of the code is selected. Reads the selection through the shadow root (`getComposedRanges`, or the shadow root's own selection in Chromium); `selection` overrides it"
      },
      {
        "name": "copy",
        "signature": "() => Promise<boolean>",
        "description": "Copies the text to the clipboard; resolves with whether it worked"
      }
    ],
    "events": [
      {
        "name": "minerva-copy",
        "description": "The copy button (or `copy()`) was used: `detail: { text, success }` (`text` is the copied text; React's `onCopied` is called with it on success)."
      },
      {
        "name": "minerva-mark-click",
        "description": "A mark was clicked (not at the end of a text selection drag): `detail: { mark, originalEvent }` (`mark` is the item of `marks`, the topmost where they overlap; React's `onMarkClick`)."
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The positioned outer wrapper of the region and its actions (only when copyable, or with a language label)"
      },
      {
        "name": "region",
        "description": "The `<pre>` scroll region (role=region): the visible box of the code"
      },
      {
        "name": "code",
        "description": "The `<code>` element"
      },
      {
        "name": "line-number",
        "description": "The number of a line, in the gutter (with show-line-numbers; aria-hidden, generated content)"
      },
      {
        "name": "code-mark",
        "description": "A `<mark>` wrapping a marked character range (with marks; also has `data-mark-id`, `data-mark-color` and the mark's className)"
      },
      {
        "name": "language",
        "description": "The language label (with show-language)"
      },
      {
        "name": "copy-button",
        "description": "The copy button (while copyable)"
      }
    ],
    "cssProperties": [
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
      },
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
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

language="auto" détecte le langage d'un code non étiqueté à partir de son texte (detectCodeLanguage de minerva-design/core ; « plain » en cas de doute) ; show-language, la classe et data-language affichent le langage détecté.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/wc/auto-language.html

```html
<div id="snippets" style="display: grid; gap: 12px"></div>

```

### apps/docs/src/docs/pages/code-block/wc/auto-language.ts

```tsx
// Code without a known language (e.g. an EPUB <pre> without a class):
// language="auto" detects it from `code` (detectCodeLanguage of
// minerva-design/core); `show-language` labels the detected language.
type CodeBlock = HTMLElement & { code?: string };

const snippets = [
  `{
  "title": "The Little Prince",
  "year": 1943
}`,
  `def word_count(path):
    with open(path) as f:
        return len(f.read().split())`,
  `SELECT title, COUNT(*) AS readers
FROM books
GROUP BY title
ORDER BY readers DESC;`,
  `server:
  port: 8080
  hosts:
    - reader.example.com`,
  `It was a dark and stormy night;
the rain fell in torrents.`,
];

export function setup(root: HTMLElement) {
  const container = root.querySelector<HTMLElement>("#snippets")!;
  snippets.forEach((code, i) => {
    const block = document.createElement("minerva-code-block") as CodeBlock;
    block.setAttribute("language", "auto");
    block.setAttribute("show-language", "");
    block.setAttribute("aria-label", `Snippet ${i + 1}`);
    block.code = code;
    container.append(block);
  });
  return () => container.replaceChildren();
}

```

## Example: Utilisation de base

Le contenu texte est rendu tel quel (échappez < dans le balisage) ; language colore la syntaxe et show-language affiche une étiquette. Chaque bloc est une région nommée et focalisable.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/wc/basic.html

```html
<div style="display: grid; gap: 12px">
  <!-- prettier-ignore -->
  <minerva-code-block language="json" show-language aria-label="Response payload">{
  "id": 42,
  "title": "The Three-Body Problem",
  "tags": ["sci-fi", "classic"]
}</minerva-code-block>
  <!-- prettier-ignore -->
  <minerva-code-block language="html" show-language aria-label="Usage">&lt;minerva-button&gt;Save&lt;/minerva-button&gt;
&lt;script type="module"&gt;
  import "minerva-design/web-components";
&lt;/script&gt;</minerva-code-block>
</div>

```

## Example: Copier dans le presse-papiers

La propriété code contient le texte ; copyable ajoute un bouton de copie, copy() copie depuis l'extérieur et minerva-copy signale le résultat.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/wc/copy.html

```html
<minerva-code-block
  id="payload"
  language="json"
  copyable
  aria-label="Webhook payload"
></minerva-code-block>
<p style="display: flex; gap: 8px; align-items: center">
  <minerva-button id="copy" size="small" variant="outline" color="neutral"
    >Copy from outside</minerva-button
  >
  <output id="status"></output>
</p>

```

### apps/docs/src/docs/pages/code-block/wc/copy.ts

```tsx
// `code` holds the text (never parsed as HTML); the copy button and copy()
// write it to the clipboard. minerva-copy reports the result.
type CodeBlock = HTMLElement & { code?: string; copy(): Promise<boolean> };

export function setup(root: HTMLElement) {
  const block = root.querySelector<CodeBlock>("#payload")!;
  const button = root.querySelector<HTMLElement>("#copy")!;
  const status = root.querySelector<HTMLOutputElement>("#status")!;
  block.code = JSON.stringify(
    { event: "invoice.paid", id: "evt_1042", amount: 12900, currency: "EUR" },
    null,
    2,
  );
  const onCopy = (event: Event) => {
    const { text, success } = (
      event as CustomEvent<{ text: string; success: boolean }>
    ).detail;
    status.value = success ? `Copied ${text.length} characters` : "Failed";
  };
  const onClick = () => void block.copy();
  block.addEventListener("minerva-copy", onCopy);
  button.addEventListener("click", onClick);
  return () => {
    block.removeEventListener("minerva-copy", onCopy);
    button.removeEventListener("click", onClick);
  };
}

```

## Example: Langages

language choisit la grammaire (ts, css, html, bash, python, diff…) ; show-language ajoute une petite étiquette. La propriété code contient le texte, jamais interprété comme du HTML.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/wc/languages.html

```html
<div id="samples" style="display: grid; gap: 12px"></div>

```

### apps/docs/src/docs/pages/code-block/wc/languages.ts

```tsx
// One highlighted block per language; `code` holds the text (never parsed
// as HTML), `language` picks the grammar and `show-language` labels it.
type CodeBlock = HTMLElement & { code?: string };

const samples: Array<[language: string, code: string]> = [
  [
    "ts",
    `export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\`/api/books/\${id}\`);
  return response.json(); // typed by the caller
}`,
  ],
  [
    "css",
    `.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  color: #1f2937 !important;
}`,
  ],
  [
    "html",
    `<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
</form>`,
  ],
  [
    "bash",
    `# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"`,
  ],
  [
    "python",
    `@dataclass
class Point:
    def norm(self) -> float:
        return abs(self.x)  # distance to 0`,
  ],
  [
    "diff",
    `@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }`,
  ],
];

export function setup(root: HTMLElement) {
  const container = root.querySelector<HTMLElement>("#samples")!;
  for (const [language, code] of samples) {
    const block = document.createElement("minerva-code-block") as CodeBlock;
    block.setAttribute("language", language);
    block.setAttribute("show-language", "");
    block.setAttribute("aria-label", `${language} example`);
    block.code = code;
    container.append(block);
  }
  return () => container.replaceChildren();
}

```

## Example: Numéros de ligne

show-line-numbers numérote les lignes dans une marge masquée aux lecteurs d'écran ; la copie copie toujours le texte brut.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/wc/line-numbers.html

```html
<!-- prettier-ignore -->
<minerva-code-block language="python" show-line-numbers show-language copyable aria-label="Fibonacci">def fibonacci(n: int) -&gt; list[int]:
    """The first n Fibonacci numbers."""
    numbers = [0, 1]
    while len(numbers) &lt; n:
        numbers.append(numbers[-1] + numbers[-2])
    return numbers[:n]

print(fibonacci(10))</minerva-code-block>

```

## Example: Marques (surlignages enregistrés)

marks pose des plages de caractères sur la coloration syntaxique ; getSelectionRange() convertit la sélection en positions et minerva-mark-click signale la marque cliquée (ici : elle est supprimée).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/wc/marks.html

```html
<minerva-code-block
  id="annotated"
  language="ts"
  show-line-numbers
  copyable
  clickable-marks
  aria-label="Annotated function"
></minerva-code-block>
<p style="display: flex; gap: 8px; align-items: center">
  <minerva-button id="highlight" size="small" variant="outline"
    >Highlight selection</minerva-button
  >
  <minerva-button id="clear" size="small" variant="ghost">Clear</minerva-button>
  <output id="status"></output>
</p>

```

### apps/docs/src/docs/pages/code-block/wc/marks.ts

```tsx
// `marks` lays saved highlights over the syntax colors (offsets into
// `code`); getSelectionRange() maps the user's selection to such offsets and
// minerva-mark-click reports the clicked mark (here: removes it).
interface CodeMark {
  start: number;
  end: number;
  color?: string;
  id?: string;
  title?: string;
}
type CodeBlock = HTMLElement & {
  code?: string;
  marks?: CodeMark[];
  getSelectionRange(): { start: number; end: number; text: string } | null;
};

export function setup(root: HTMLElement) {
  const block = root.querySelector<CodeBlock>("#annotated")!;
  const highlight = root.querySelector<HTMLElement>("#highlight")!;
  const clear = root.querySelector<HTMLElement>("#clear")!;
  const status = root.querySelector<HTMLOutputElement>("#status")!;
  block.code = `export async function fetchUser(id: string) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}`;
  block.marks = [
    { id: "n1", start: 71, end: 96, title: "Template literal URL" },
    {
      id: "n2",
      start: 104,
      end: 116,
      color: "danger",
      title: "Check the status",
    },
  ];
  // keep the selection: do not move the focus on press
  const keepSelection = (event: Event) => event.preventDefault();
  const onHighlight = () => {
    const range = block.getSelectionRange();
    if (!range) {
      status.value = "Select some code first";
      return;
    }
    block.marks = [
      ...(block.marks ?? []),
      {
        id: `n${Date.now()}`,
        start: range.start,
        end: range.end,
        color: "success",
      },
    ];
    status.value = `Highlighted “${range.text}” (${range.start}–${range.end})`;
  };
  const onClear = () => (block.marks = []);
  const onMarkClick = (event: Event) => {
    const { mark } = (event as CustomEvent<{ mark: CodeMark }>).detail;
    block.marks = (block.marks ?? []).filter((m) => m.id !== mark.id);
    status.value = `Removed ${mark.title ?? "highlight"}`;
  };
  highlight.addEventListener("mousedown", keepSelection);
  highlight.addEventListener("click", onHighlight);
  clear.addEventListener("click", onClear);
  block.addEventListener("minerva-mark-click", onMarkClick);
  return () => {
    highlight.removeEventListener("mousedown", keepSelection);
    highlight.removeEventListener("click", onHighlight);
    clear.removeEventListener("click", onClear);
    block.removeEventListener("minerva-mark-click", onMarkClick);
  };
}

```

## Example: Lignes longues et hauteur

no-wrap fait défiler les longues lignes horizontalement et max-height limite la hauteur ; la région défile aussi au clavier.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/wc/overflow.html

```html
<div style="display: grid; gap: 12px">
  <minerva-code-block
    id="log"
    language="log"
    no-wrap
    max-height="160"
    aria-label="Build log"
  ></minerva-code-block>
  <minerva-code-block
    id="wrapped"
    max-height="8rem"
    aria-label="Wrapped log"
    style="--code-block-bg: var(--primary-color-subtle)"
  ></minerva-code-block>
</div>

```

### apps/docs/src/docs/pages/code-block/wc/overflow.ts

```tsx
// Long lines scroll horizontally with no-wrap; max-height caps the block.
// The region is focusable, so it scrolls with the keyboard too.
type CodeBlock = HTMLElement & { code?: string };

export function setup(root: HTMLElement) {
  const lines = Array.from(
    { length: 20 },
    (_, i) =>
      `[12:00:${String(i).padStart(2, "0")}] step ${i + 1}/20 ok ` +
      "-- compiled packages/web-components/src/components with no warnings",
  ).join("\n");
  root.querySelector<CodeBlock>("#log")!.code = lines;
  root.querySelector<CodeBlock>("#wrapped")!.code = lines;
}

```
