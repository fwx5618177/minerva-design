# Divider

A thin line that separates content, horizontally or vertically, optionally with text.

Package: minerva-design@1.24.3

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.3",
  "sourceCommit": "bbcef3f0abff568d08e734ec3e117c8cd10b017e",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:aa4b50ed4e7a53906ab6f39a3da2bbb4024583714e780e0cf99a262437a2babd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Divider

Support: beta

Horizontal/vertical solid/dashed/dotted separators with thickness/length/spacing/text alignment/elevation/flexItem and optional label. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/divider/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "vertical",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": "horizontal"
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "solid"
  },
  {
    "name": "thickness",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "length",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "spacing",
    "typeText": "number",
    "required": false,
    "default": 16
  },
  {
    "name": "textAlign",
    "typeText": "string",
    "required": false,
    "default": "center"
  },
  {
    "name": "elevation",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "flexItem",
    "typeText": "boolean",
    "required": false,
    "default": false
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
