# Divider 分割线

用于分隔内容的细线，可水平或垂直，并可带文字。

Package: minerva-design@1.19.3

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
