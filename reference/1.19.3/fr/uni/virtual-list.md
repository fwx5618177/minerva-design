# VirtualList

Affiche efficacement de longues listes en ne montant que les lignes visibles dans le conteneur défilant.

Package: minerva-design@1.19.3

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
