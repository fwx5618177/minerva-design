# VirtualList

Affiche efficacement de longues listes en ne montant que les lignes visibles dans le conteneur défilant.

Package: minerva-design@1.21.1

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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
