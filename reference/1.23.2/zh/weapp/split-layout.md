# SplitLayout 分栏布局

主内容加可选侧栏，布局自身宽度达到断点后并排显示。

Package: minerva-design@1.23.2

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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
