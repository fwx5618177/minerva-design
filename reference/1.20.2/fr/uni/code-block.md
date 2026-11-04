# CodeBlock

Un bloc de texte préformaté en lecture seule (journaux, charges utiles, configuration) dans une région défilante nommée et focalisable au clavier.

Package: minerva-design@1.20.2

Renderer: uni

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

Support: beta

Syntax highlighting (core highlightCode, nested text with code-token colors; language="auto" detects it with detectCodeLanguage), opt-in line numbers and language label, character-range marks (nested text backgrounds, mark-click on tap), wrapped/unwrapped text, bounded scrolling maxHeight, native clipboard copy of the raw text with callbacks and localized feedback with cleanup. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "language",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "copyable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "maxHeight",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "highlight",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showLineNumbers",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showLanguage",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "marks",
    "typeText": "readonly CodeMark[] | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "error",
    "typeText": "[error: unknown]",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "copied",
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
    "name": "copy",
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
    "typeText": "[mark: CodeMark]",
    "parameters": [
      {
        "name": "mark",
        "position": 0,
        "typeText": "CodeMark",
        "required": true,
        "rest": false
      }
    ]
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
