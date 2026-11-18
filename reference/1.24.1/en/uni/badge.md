# Badge

A small count or status indicator attached to the corner of another element.

Package: minerva-design@1.24.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.1",
  "sourceCommit": "0842512112df9e117f4b9efce6a8b1ba91350d24",
  "sourceDigest": "sha256:ddf24b058620a47363c171d7a5d941ded5095e4c61225ecdcd3c9a4f29932128",
  "referenceSourceDigest": "sha256:c18f38eab1217f616ad8f6be5a8e5115f531c7c7825f7faf41778d9ee752ae17"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Badge

Support: beta

Inline text or attached badge; content/icon slots; size, semantic color, variant, position, radius/border and decorative dot/count extensions. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Badge"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "count",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "dot",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "status",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "showZero",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"outline\" | \"solid\" | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "content",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "position",
    "typeText": "\"top-right\" | \"top-left\" | \"bottom-right\" | \"bottom-left\" | undefined",
    "required": false
  },
  {
    "name": "borderRadius",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "borderWidth",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "role",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
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
  },
  {
    "name": "icon",
    "typeText": "{}"
  },
  {
    "name": "content",
    "typeText": "{}"
  }
]
```

## CSS variables

```json
{
  "css:Badge": {
    "kind": "cssVars",
    "source": "react/src/components/Badge",
    "vars": [
      {
        "name": "--badge-bg",
        "description": "Background color (overrides the color and variant)"
      },
      {
        "name": "--badge-fg",
        "description": "Text color (overrides the color and variant)"
      },
      {
        "name": "--badge-border",
        "description": "Border color of the subtle and outline variants"
      },
      {
        "name": "--badge-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--badge-padding-y",
        "description": "Vertical padding (every size)"
      },
      {
        "name": "--badge-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--badge-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--badge-dot-size",
        "description": "Diameter of the dot badge"
      },
      {
        "name": "--badge-ring-color",
        "description": "Color of the ring separating an attached (corner) badge from its content (defaults to --surface-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
