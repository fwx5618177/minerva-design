# SplitLayout 分割レイアウト

メインコンテンツと任意のサイド領域。レイアウト自身の幅がブレークポイントに達すると横に並びます。

Package: minerva-design@1.19.3

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## SplitLayout

Support: beta

Main/aside slots, validated asideWidth, md/lg actual-container collapse breakpoint, core gap and no empty aside column. Native views replace DOM refs; React SplitLayout has no drag-resize/persistence API. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SplitLayout"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asideWidth",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "sidebarWidth",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "collapseBelow",
    "typeText": "\"md\" | \"lg\" | undefined",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "reverse",
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
  },
  {
    "name": "aside",
    "typeText": "{}"
  },
  {
    "name": "sidebar",
    "typeText": "{}"
  }
]
```

## CSS variables

```json
{
  "css:SplitLayout": {
    "kind": "cssVars",
    "source": "react/src/components/SplitLayout",
    "vars": [
      {
        "name": "--split-layout-align-items",
        "description": "Vertical alignment of the main and aside columns (default: start)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
