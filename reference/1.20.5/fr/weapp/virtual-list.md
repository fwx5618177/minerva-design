# VirtualList

Affiche efficacement de longues listes en ne montant que les lignes visibles dans le conteneur défilant.

Package: minerva-design@1.20.5

Renderer: weapp

Locale: fr

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
