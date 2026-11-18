# VirtualList 仮想リスト

スクロールコンテナ内で表示されている行だけをマウントし、長いリストを効率よく描画します。

Package: minerva-design@1.23.2

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "6c540b5293a3b5d4cb8d1c38c6d3c462f6e8d1b1",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:de9407f9acf37f670db2dc646bbdcb8b05067fae0b4c7fd4ec79011e933f6519"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## VirtualList

Support: beta

Core fixed-row virtualization with native first-row measurement, explicit item height/padding, overscan, maxHeight, async loadMore lock/threshold/loading, scrollToIndex, itemclick, configured text renderer and native row-renderer generic. Rows have one shared measured or explicit height, matching the React fixed-row contract; DOM renderer/focus targets use native generic Components. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/virtual-list/index",
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
    "name": "itemHeight",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "height",
    "typeText": "number",
    "required": false,
    "default": 300
  },
  {
    "name": "overscan",
    "typeText": "number",
    "required": false,
    "default": 5
  },
  {
    "name": "maxHeight",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "itemPadding",
    "typeText": "number",
    "required": false,
    "default": 8
  },
  {
    "name": "loadMoreThreshold",
    "typeText": "number",
    "required": false,
    "default": 100
  },
  {
    "name": "highPerformance",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "customRowRenderer",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### events

```json
[
  {
    "name": "scroll",
    "typeText": "{ scrollTop: number }",
    "description": "Native scroll offset."
  },
  {
    "name": "itemclick",
    "typeText": "{ item: Record<string, unknown>; index: number }",
    "description": "Original row and absolute item index."
  },
  {
    "name": "loadmore",
    "typeText": "{}",
    "description": "Near-bottom downward scrolling requested more rows; completeLoadMore releases event-only requests."
  },
  {
    "name": "loaderror",
    "typeText": "{ message: string }",
    "description": "Configured asynchronous loader rejected; a later scroll may retry."
  }
]
```

### slots

```json
[
  {
    "name": "footer"
  }
]
```

## CSS variables

```json
{
  "css:VirtualList": {
    "kind": "cssVars",
    "source": "react/src/components/VirtualList",
    "vars": [
      {
        "name": "--virtual-list-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--virtual-list-shadow",
        "description": "Shadow at rest (defaults to --shadow-sm)"
      },
      {
        "name": "--virtual-list-hover-shadow",
        "description": "Shadow while hovered (defaults to --shadow-md)"
      },
      {
        "name": "--virtual-list-scrollbar-size",
        "description": "Width of the scrollbar (WebKit / Blink)"
      },
      {
        "name": "--virtual-list-loading-padding",
        "description": "Padding of the loading indicator row"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
