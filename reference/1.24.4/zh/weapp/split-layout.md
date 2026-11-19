# SplitLayout 分栏布局

主内容加可选侧栏，布局自身宽度达到断点后并排显示。

Package: minerva-design@1.24.4

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.4",
  "sourceCommit": "580bc03aa319a78f6f653ee0f9610fe236a93d38",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:25c00e4ed9c1ea1a2744aa521b6deba862ac402384cb19f4e7d069b72a5172c6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.4/types.json) or getType() from minerva-design/contracts.

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
