# DescriptionList 説明リスト

ネイティブの dl で描画するラベル付きメタデータ。狭い画面では行が縦に並びます。

Package: minerva-design@1.19.3

Renderer: uni

Locale: ja

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

## DescriptionItem

Support: n/a

Data API rather than a standalone component. DescriptionList.items: { key, label, value }; uni also exposes scoped label/value slots, and WeApp exposes a named slot for each item.key.

## DescriptionList

Support: beta

Item labels/values or slots, columns, borders and striping. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "DescriptionList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "{ key?: string | undefined; label: string | number; value: string | number | null; }[] | undefined",
    "required": false
  },
  {
    "name": "columns",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "bordered",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "striped",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "label",
    "typeText": "{ item: { key?: string | undefined; label: string | number; value: string | number | null; }; index: number; }"
  },
  {
    "name": "value",
    "typeText": "{ item: { key?: string | undefined; label: string | number; value: string | number | null; }; index: number; }"
  },
  {
    "name": "default",
    "typeText": "{}"
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
