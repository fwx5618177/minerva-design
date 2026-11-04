# VirtualList 虚拟列表

只挂载滚动容器中可见的行，从而高效渲染长列表。

Package: minerva-design@1.20.5

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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
