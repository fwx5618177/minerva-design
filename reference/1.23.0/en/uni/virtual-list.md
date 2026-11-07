# VirtualList

Renders long lists efficiently by only mounting the rows that are visible in the scroll container.

Package: minerva-design@1.23.0

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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
