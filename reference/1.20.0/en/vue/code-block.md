# CodeBlock

A read-only block of preformatted text (logs, payloads, config) in a named, keyboard-focusable scroll region.

Package: minerva-design@1.20.0

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeBlock

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "name": "code",
    "type": "string",
    "required": false,
    "description": "Source text, rendered verbatim (never parsed as HTML). Without it, the\ntext of the default slot (templates condense whitespace in static text:\nprefer this prop or `{{ source }}` for multi-line code)",
    "typeText": "string"
  },
  {
    "name": "wrap",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Wraps long lines (pre-wrap) instead of scrolling horizontally",
    "typeText": "boolean"
  },
  {
    "name": "maxHeight",
    "type": "string | number",
    "default": "\"24rem\"",
    "required": false,
    "description": "Maximum height before the block scrolls (numbers are pixels)",
    "typeText": "string | number"
  },
  {
    "name": "copyable",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a copy button in the top-right corner that writes the text to the\nclipboard; its label switches to \"Copied\" / \"Copy failed\" for about two\nseconds and the result is announced through a polite live region. When\nset, the <pre> is wrapped in a <div> (see the interface description)",
    "typeText": "boolean"
  },
  {
    "name": "language",
    "type": "string",
    "required": false,
    "description": "Language of the code: highlights its syntax and sets\n`class=\"language-<x>\"` / `data-language` on the <code>. Supported:\njavascript (js, mjs, cjs), typescript (ts), jsx, tsx, json (jsonc,\njson5), css (scss, less), html (xml, svg, vue), bash (sh, shell, zsh,\nconsole), python (py), yaml (yml), sql, diff, markdown (md); other\nnames render plain text. `\"auto\"` detects the language from the text\n(`detectCodeLanguage` of minerva-design/core, \"plain\" when unsure): the\nclass, `data-language` and the label show the detected name. Without it\nthe text is not highlighted",
    "typeText": "string"
  },
  {
    "name": "highlight",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Highlights the syntax of `language` (false: plain text, the language is\nstill set on the <code> and shown by `showLanguage`)",
    "typeText": "boolean"
  },
  {
    "name": "showLineNumbers",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Numbers the lines in a gutter (hidden from assistive technology, not\npart of the copied or selected text)",
    "typeText": "boolean"
  },
  {
    "name": "showLanguage",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the `language` as a small label in the top-right corner (e.g.\n\"JSON\"); the <pre> is then wrapped in a <div> like with `copyable`",
    "typeText": "boolean"
  },
  {
    "name": "marks",
    "type": "readonly CodeMark[]",
    "required": false,
    "description": "Character ranges to mark (saved highlights, annotations, search hits),\nrendered as <mark> elements over the syntax highlighting (the token\ncolors are kept; the copied text stays the raw code). `start` / `end`\nare UTF-16 offsets into the code string, clamped to it; empty ranges\nare ignored. Marks may cross tokens and lines (with `showLineNumbers` a\nmark is cut at each line break). Where marks overlap, the later one in\nthe array wins (its color, class, title and click). Each element gets\n`data-mark-id` and the mark's `className` / `title`; `color` is a theme\ncolor name (a translucent tint) or any CSS color (default: translucent\nyellow, `--code-block-mark-bg`). The `mark-click` event reports clicks.\nTo create one from the user's selection, see `getCodeSelectionRange`\nof `minerva-design/core`",
    "typeText": "readonly CodeMark[]"
  }
]
```

### events

```json
[
  {
    "name": "copied",
    "type": "[text: string]",
    "typeText": "[text: string]",
    "parameters": [
      {
        "name": "text",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "mark-click",
    "type": "[mark: CodeMark, event: MouseEvent]",
    "typeText": "[mark: CodeMark, event: MouseEvent]",
    "parameters": [
      {
        "name": "mark",
        "position": 0,
        "typeText": "CodeMark",
        "required": true,
        "rest": false
      },
      {
        "name": "event",
        "position": 1,
        "typeText": "MouseEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Source text (when the `code` prop is not set)",
    "typeText": "any"
  }
]
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

## Example: auto-language

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/vue/auto-language.vue

```vue
<script setup lang="ts">
import { CodeBlock, VStack } from "minerva-design/vue";

// Code without a known language (e.g. an EPUB <pre> without a class):
// language="auto" detects it (detectCodeLanguage of minerva-design/core).
const snippets = [
  '{\n  "title": "The Little Prince",\n  "year": 1943\n}',
  "def word_count(path):\n    with open(path) as f:\n        return len(f.read().split())",
  "SELECT title, COUNT(*) AS readers\nFROM books\nGROUP BY title\nORDER BY readers DESC;",
  "server:\n  port: 8080\n  hosts:\n    - reader.example.com",
  "It was a dark and stormy night;\nthe rain fell in torrents.",
];
</script>
<template>
  <VStack :gap="3" align="stretch">
    <CodeBlock
      v-for="(snippet, i) in snippets"
      :key="i"
      :code="snippet"
      language="auto"
      show-language
      :aria-label="`Snippet ${i + 1}`"
    />
  </VStack>
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/vue/basic.vue

```vue
<script setup lang="ts">
import { CodeBlock } from "minerva-design/vue";
const code = JSON.stringify(
  { id: 42, title: "The Three-Body Problem", tags: ["sci-fi", "classic"] },
  null,
  2,
);
</script>
<template>
  <CodeBlock :code="code" language="json" aria-label="Response payload" />
</template>

```

## Example: copy

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/vue/copy.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { CodeBlock, VStack } from "minerva-design/vue";
const copied = ref(false);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><CodeBlock
      code="npm install minerva-design"
      copyable
      @copied="copied = true"
    /><output>{{
      copied ? "Copied command" : "Copy the command to your clipboard"
    }}</output></VStack
  >
</template>

```

## Example: languages

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/vue/languages.vue

```vue
<script setup lang="ts">
import { CodeBlock, VStack } from "minerva-design/vue";

const samples = [
  {
    language: "ts",
    code: "export const double = (n: number): number => n * 2; // pure",
  },
  { language: "css", code: ".card:hover {\n  color: #1f2937 !important;\n}" },
  {
    language: "html",
    code: '<!-- Form -->\n<input name="email" type="email" required>',
  },
  {
    language: "bash",
    code: '# Install\npnpm add minerva-design && echo "Done in $PWD"',
  },
  {
    language: "python",
    code: "@cache\ndef square(x: int) -> int:\n    return x * x  # memoized",
  },
  {
    language: "diff",
    code: '@@ -1 +1 @@\n-  "theme": "light"\n+  "theme": "dark"',
  },
];
</script>
<template>
  <VStack :gap="3" align="stretch">
    <CodeBlock
      v-for="sample in samples"
      :key="sample.language"
      :code="sample.code"
      :language="sample.language"
      show-language
      :aria-label="`${sample.language} example`"
    />
  </VStack>
</template>

```

## Example: line-numbers

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/vue/line-numbers.vue

```vue
<script setup lang="ts">
import { CodeBlock } from "minerva-design/vue";
const code = `def fibonacci(n: int) -> list[int]:
    """The first n Fibonacci numbers."""
    numbers = [0, 1]
    while len(numbers) < n:
        numbers.append(numbers[-1] + numbers[-2])
    return numbers[:n]

print(fibonacci(10))`;
</script>
<template>
  <CodeBlock
    :code="code"
    language="python"
    show-line-numbers
    show-language
    copyable
    aria-label="Fibonacci"
  />
</template>

```

## Example: marks

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/vue/marks.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Button, CodeBlock, type CodeMark } from "minerva-design/vue";
import { getCodeSelectionRange } from "minerva-design/core";

const code = `def fibonacci(n: int) -> list[int]:
    """The first n Fibonacci numbers."""
    numbers = [0, 1]
    while len(numbers) < n:
        numbers.append(numbers[-1] + numbers[-2])
    return numbers[:n]

print(fibonacci(10))`;

// offsets are UTF-16 offsets into `code` (e.g. from getCodeSelectionRange)
const marks = ref<CodeMark[]>([
  { id: "doc", start: 40, end: 76, color: "info", title: "Docstring" },
  { id: "sum", start: 149, end: 174, title: "The recurrence" },
]);
const container = ref<HTMLElement>();
const status = ref("");

function highlightSelection() {
  const range = container.value && getCodeSelectionRange(container.value);
  if (!range) {
    status.value = "Select some code first";
    return;
  }
  marks.value = [
    ...marks.value,
    {
      id: `n${Date.now()}`,
      start: range.start,
      end: range.end,
      color: "success",
    },
  ];
  status.value = `Highlighted “${range.text}” (${range.start}–${range.end})`;
}

function remove(mark: CodeMark) {
  marks.value = marks.value.filter((m) => m.id !== mark.id);
  status.value = `Removed ${mark.title ?? "highlight"}`;
}
</script>
<template>
  <div style="display: grid; gap: 8px">
    <div ref="container">
      <CodeBlock
        :code="code"
        language="python"
        show-line-numbers
        copyable
        aria-label="Annotated Fibonacci"
        :marks="marks"
        @mark-click="remove"
      />
    </div>
    <div style="display: flex; gap: 8px; align-items: center">
      <Button
        size="small"
        variant="outline"
        @mousedown.prevent
        @click="highlightSelection"
      >
        Highlight selection
      </Button>
      <Button size="small" variant="ghost" @click="marks = []">Clear</Button>
      <output>{{ status }}</output>
    </div>
  </div>
</template>

```

## Example: overflow

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/vue/overflow.vue

```vue
<script setup lang="ts">
import { CodeBlock } from "minerva-design/vue";
const code = Array.from(
  { length: 16 },
  (_, i) =>
    `const line${i + 1} = "A long line of code demonstrates horizontal and vertical scrolling in the code block.";`,
).join("\n");
</script>
<template>
  <CodeBlock :code="code" max-height="160px" :wrap="false" />
</template>

```
