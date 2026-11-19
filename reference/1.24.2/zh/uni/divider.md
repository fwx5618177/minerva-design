# Divider 分割线

用于分隔内容的细线，可水平或垂直，并可带文字。

Package: minerva-design@1.24.2

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.2",
  "sourceCommit": "2d9157080afa96d568e1ab5dd5ebf85bbe169957",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:a10f6d21015b35fa6d9df069d49549a386ecb8a45ce2df880f926336f66209d5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Divider

Support: beta

Horizontal/vertical, solid/dashed/dotted, thickness/length/spacing, label slot and text alignment, elevation and flex-item geometry. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Divider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\" | undefined",
    "required": false
  },
  {
    "name": "vertical",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"solid\" | \"dashed\" | \"dotted\" | undefined",
    "required": false
  },
  {
    "name": "thickness",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "length",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "spacing",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "textAlign",
    "typeText": "\"left\" | \"right\" | \"center\" | undefined",
    "required": false
  },
  {
    "name": "elevation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "flexItem",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## CSS variables

```json
{
  "css:Divider": {
    "kind": "cssVars",
    "source": "react/src/components/Divider",
    "vars": [
      {
        "name": "--divider-color",
        "description": "Line color (defaults to --border-color)"
      },
      {
        "name": "--divider-thickness",
        "description": "Line thickness"
      },
      {
        "name": "--divider-spacing",
        "description": "Inline margin around a vertical divider"
      },
      {
        "name": "--divider-text-gap",
        "description": "Space between the text and the lines"
      },
      {
        "name": "--divider-text-font-size",
        "description": "Font size of the text"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
