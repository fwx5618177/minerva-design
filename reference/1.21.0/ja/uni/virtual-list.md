# VirtualList 仮想リスト

スクロールコンテナ内で表示されている行だけをマウントし、長いリストを効率よく描画します。

Package: minerva-design@1.21.0

Renderer: uni

Locale: ja

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

## VirtualList

Support: beta

Real scroll viewport, maxHeight, itemHeight or first-row measurement with itemPadding, overscan, focused-row retention, loading, near-end async loadMore locking and raf/idle/immediate scheduling with cleanup. DOM scroll/focus observation uses H5 APIs; native hosts use scoped selector queries and window resize hooks. Device behavior remains unverified. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "VirtualList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "any[] | undefined",
    "required": false
  },
  {
    "name": "itemHeight",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "maxHeight",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "overscan",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "itemPadding",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "loadMoreThreshold",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "onLoadMore",
    "typeText": "(() => void | Promise<void>) | undefined",
    "required": false
  },
  {
    "name": "highPerformance",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "scroll",
    "typeText": "[top: number, event: unknown]",
    "parameters": [
      {
        "name": "top",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      },
      {
        "name": "event",
        "position": 1,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "[item: any, index: number, event: unknown]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "any",
        "required": true,
        "rest": false
      },
      {
        "name": "index",
        "position": 1,
        "typeText": "number",
        "required": true,
        "rest": false
      },
      {
        "name": "event",
        "position": 2,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "loadError",
    "typeText": "[error: unknown]",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{ item: any; index: number; }"
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
