# CodeBlock コードブロック

読み取り専用の整形済みテキスト（ログ、ペイロード、設定）を、名前付きでキーボードフォーカス可能なスクロール領域に表示します。

Package: minerva-design@1.22.2

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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
