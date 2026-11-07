# DescriptionList

Labeled metadata fields rendered as a native dl; rows stack on narrow screens.

Package: minerva-design@1.22.2

Renderer: weapp

Locale: en

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

## DescriptionItem

Support: n/a

Data API rather than a standalone component. DescriptionList.items: { key, label, value }; uni also exposes scoped label/value slots, and WeApp exposes a named slot for each item.key.

## DescriptionList

Support: beta

Ordered term/value rows with zero values, bordered/striped variants and native keyed content slots. Native view rows replace DOM dl/dt/dd elements. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/description-list/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "array",
    "required": false
  },
  {
    "name": "columns",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "bordered",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "striped",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### slots

```json
[
  {
    "name": "{{item.key}}"
  },
  {
    "name": "default"
  }
]
```

## CSS variables

```json
{
  "css:DescriptionList": {
    "kind": "cssVars",
    "source": "react/src/components/DescriptionList",
    "vars": [
      {
        "name": "--description-list-row-padding-y",
        "description": "Vertical padding of a row (follows the density's row padding)"
      },
      {
        "name": "--description-list-gap",
        "description": "Space between the term and the description"
      },
      {
        "name": "--description-list-term-color",
        "description": "Text color of the terms"
      },
      {
        "name": "--description-list-border-color",
        "description": "Color of the row separators"
      },
      {
        "name": "--description-list-font-size",
        "description": "Font size"
      },
      {
        "name": "--description-list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--description-list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--description-list-padding-x",
        "description": "Horizontal padding of the rows of a bordered or striped list"
      },
      {
        "name": "--description-list-stripe-background",
        "description": "Background of every other row of a striped list (defaults to --surface-subtle-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
