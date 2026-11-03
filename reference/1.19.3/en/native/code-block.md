# CodeBlock

A read-only block of preformatted text (logs, payloads, config) in a named, keyboard-focusable scroll region.

Package: minerva-design@1.19.3

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeBlock

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "wrap",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "maxHeight",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 384,
    "required": false
  },
  {
    "name": "copyable",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "copyText",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "function",
    "typeText": "((text: string) => void | Promise<void>) | undefined",
    "typeRef": "type:3b3abe5cac564932d5d7",
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
      "typeText": "void | Promise<void>",
      "typeRef": "type:3c4871f2062b3b734ba0"
    },
    "required": false,
    "description": "Native clipboard adapter, e.g. Expo Clipboard.setStringAsync."
  },
  {
    "name": "language",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Language of the code: highlights its syntax (nested colored Text, `code-token-<type>-color` tokens). Without it the text is plain. `\"auto\"` detects it from the code (`detectCodeLanguage`, memoized per text; \"plain\" when unsure), shown by the label too"
  },
  {
    "name": "highlight",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Highlights the syntax of `language` (false: plain text)"
  },
  {
    "name": "showLineNumbers",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Numbers the lines in a gutter hidden from assistive technology (each line is then its own selectable Text)"
  },
  {
    "name": "showLanguage",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the `language` as a small label (e.g. \"JSON\")"
  },
  {
    "name": "marks",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "array",
    "typeText": "readonly CodeMark[] | undefined",
    "typeRef": "type:e3bf662d746e3e0cae53",
    "required": false,
    "description": "Character ranges to mark (saved highlights, annotations): nested Text with the mark's background over the token colors (the copied text stays the raw code). `start` / `end` are UTF-16 offsets into `children`, clamped to it; empty ranges are ignored. Where marks overlap, the later one wins. `color`: a theme color name (a translucent tint of its token) or any color string (default: translucent yellow)"
  }
]
```

### events

```json
[
  {
    "name": "onCopied",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "function",
    "typeText": "((text: string) => void) | undefined",
    "typeRef": "type:47a0cb592be515394db2",
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
    "required": false
  },
  {
    "name": "onCopyError",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "function",
    "typeText": "((error: unknown) => void) | undefined",
    "typeRef": "type:55337f553222b97fe15f",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "unknown",
        "typeRef": "type:dc96c0cac9f2d6c9a926"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onMarkClick",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "function",
    "typeText": "((mark: CodeMark) => void) | undefined",
    "typeRef": "type:4936faf24d27f73177bf",
    "parameters": [
      {
        "name": "mark",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CodeMark",
        "typeRef": "type:b9f2b083b85896c2884a"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "A mark was pressed: the item of `marks` (the topmost where they overlap)"
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
  "native:CodeBlockProps": {
    "source": "native/src/components/Editors/index.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "string",
        "required": true
      },
      {
        "name": "wrap",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "maxHeight",
        "type": "number",
        "required": false,
        "default": "384"
      },
      {
        "name": "copyable",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "copyText",
        "type": "(text: string) => Promise<void> | void",
        "required": false,
        "description": "Native clipboard adapter, e.g. Expo Clipboard.setStringAsync."
      },
      {
        "name": "onCopied",
        "type": "(text: string) => void",
        "required": false
      },
      {
        "name": "onCopyError",
        "type": "(error: unknown) => void",
        "required": false
      },
      {
        "name": "language",
        "type": "string",
        "required": false,
        "description": "Language of the code: highlights its syntax (nested colored Text, `code-token-<type>-color` tokens). Without it the text is plain. `\"auto\"` detects it from the code (`detectCodeLanguage`, memoized per text; \"plain\" when unsure), shown by the label too"
      },
      {
        "name": "highlight",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Highlights the syntax of `language` (false: plain text)"
      },
      {
        "name": "showLineNumbers",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Numbers the lines in a gutter hidden from assistive technology (each line is then its own selectable Text)"
      },
      {
        "name": "showLanguage",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the `language` as a small label (e.g. \"JSON\")"
      },
      {
        "name": "marks",
        "type": "readonly CodeMark[]",
        "required": false,
        "description": "Character ranges to mark (saved highlights, annotations): nested Text with the mark's background over the token colors (the copied text stays the raw code). `start` / `end` are UTF-16 offsets into `children`, clamped to it; empty ranges are ignored. Where marks overlap, the later one wins. `color`: a theme color name (a translucent tint of its token) or any color string (default: translucent yellow)"
      },
      {
        "name": "onMarkClick",
        "type": "(mark: CodeMark) => void",
        "required": false,
        "description": "A mark was pressed: the item of `marks` (the topmost where they overlap)"
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

## Example: Basic usage

Text is rendered verbatim and long lines wrap by default; language="json" highlights the syntax.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/native/basic.tsx

```tsx
import { CodeBlock } from "minerva-design/native";

const payload = JSON.stringify(
  { id: 42, title: "The Three-Body Problem", tags: ["sci-fi", "classic"] },
  null,
  2,
);

export default function Basic() {
  return <CodeBlock language="json" showLanguage children={payload} />;
}

```

## Example: Marks (saved highlights)

marks lays character ranges over the syntax colors (offsets into the code; overlapping marks: the later one wins). getCodeSelectionRange of minerva-design/core turns the user's selection into offsets to save; onMarkClick reports the clicked mark (here: removes it). Copy still copies the raw code.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/code-block/native/marks.tsx

```tsx
import { useState } from "react";
import { Text } from "react-native";
import { CodeBlock, type CodeMark } from "minerva-design/native";

const payload = JSON.stringify(
  { id: 42, title: "The Three-Body Problem", tags: ["sci-fi", "classic"] },
  null,
  2,
);

// offsets are UTF-16 offsets into `payload`
const initial: CodeMark[] = [
  { id: "title", start: 16, end: 49, title: "Title" },
  { id: "tags", start: 53, end: 94, color: "info", title: "Tags" },
];

export default function Marks() {
  const [pressed, setPressed] = useState("Tap a highlight");
  return (
    <>
      <CodeBlock
        language="json"
        showLineNumbers
        marks={initial}
        onMarkClick={(mark) => setPressed(`Pressed: ${mark.title}`)}
        children={payload}
      />
      <Text>{pressed}</Text>
    </>
  );
}

```
