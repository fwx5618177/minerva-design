# SplitLayout 分栏布局

主内容加可选侧栏，布局自身宽度达到断点后并排显示。

Package: minerva-design@1.21.0

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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
