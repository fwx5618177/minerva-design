# CodeBlock

Un bloc de texte préformaté en lecture seule (journaux, charges utiles, configuration) dans une région défilante nommée et focalisable au clavier.

Package: minerva-design@1.22.0

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeBlock

Support: beta

Verbatim selectable source with syntax highlighting (core highlightCode rendered as nested text, never markup; language="auto" detects it with detectCodeLanguage), opt-in line numbers and language label, character-range marks (nested text backgrounds, markclick event on tap), wrap/horizontal scrolling, maxHeight, opt-in native clipboard copy of the raw text with status/copied/error events. Native clipboard replaces document clipboard permissions; no DOM pre/ref/keyboard-scroll event objects. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/code-block/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "code",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "language",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "copyable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "maxHeight",
    "typeText": "unknown",
    "required": false,
    "default": "24rem"
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "highlight",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "showLineNumbers",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showLanguage",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "marks",
    "typeText": "unknown",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "copy"
  },
  {
    "name": "copied"
  },
  {
    "name": "error"
  },
  {
    "name": "markclick"
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
