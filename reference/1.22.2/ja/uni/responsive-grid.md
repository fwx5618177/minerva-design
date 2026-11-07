# ResponsiveGrid レスポンシブグリッド

列数がビューポートではなく自身の幅（コンテナクエリ）に従う等幅カラムのグリッド。

Package: minerva-design@1.22.2

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## GridItem

Support: beta

Native grid child with full row and optional column/row spans. Native wrapper replaces DOM asChild cloning. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "GridItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "fullWidth",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "columnSpan",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "rowSpan",
    "typeText": "number | undefined",
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

## ResponsiveGrid

Support: beta

Validated one-to-twelve column count or inherited base/sm/md/lg map, actual container measurement, core gap/rowGap/columnGap props. Native measurement requires the renderer selector-query API; arbitrary DOM as-element/ref targets map to a native view. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "ResponsiveGrid"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "columns",
    "typeText": "number | { base?: number | undefined; sm?: number | undefined; md?: number | undefined; lg?: number | undefined; } | undefined",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "rowGap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "columnGap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "minChildWidth",
    "typeText": "number | undefined",
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
  "css:ResponsiveGrid": {
    "kind": "cssVars",
    "source": "react/src/components/ResponsiveGrid",
    "vars": [
      {
        "name": "--responsive-grid-align-items",
        "description": "Vertical alignment of the items in their row (default: stretch)"
      },
      {
        "name": "--responsive-grid-justify-items",
        "description": "Horizontal alignment of the items in their column (default: stretch)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
