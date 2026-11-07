# SplitLayout 分割レイアウト

メインコンテンツと任意のサイド領域。レイアウト自身の幅がブレークポイントに達すると横に並びます。

Package: minerva-design@1.22.3

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## SplitLayout

Support: beta

Main/aside slots, finite positive asideWidth capped to half container, md/lg container stacking, token/CSS gap and optional aside. Native slot presence is declared with hasAside; non-window host size changes call measure(width). Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/split-layout/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "sidebarWidth",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": 6
  },
  {
    "name": "reverse",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "asideWidth",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "collapseBelow",
    "typeText": "string",
    "required": false,
    "default": "md"
  },
  {
    "name": "hasAside",
    "typeText": "boolean",
    "required": false,
    "default": true
  }
]
```

### slots

```json
[
  {
    "name": "default"
  },
  {
    "name": "aside"
  },
  {
    "name": "sidebar"
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
