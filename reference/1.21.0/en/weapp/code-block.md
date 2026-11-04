# CodeBlock

A read-only block of preformatted text (logs, payloads, config) in a named, keyboard-focusable scroll region.

Package: minerva-design@1.21.0

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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
