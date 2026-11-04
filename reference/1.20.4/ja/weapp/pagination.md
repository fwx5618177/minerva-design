# Pagination ページネーション

長いデータの一覧をページに分割し、ページ間を移動できるようにします。

Package: minerva-design@1.20.4

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボード操作

ページネーションはネイティブボタンで構成された  ランドマークです。現在のページには aria-current="page" が付与され、利用できない項目は無効になります。項目にフォーカスがあるとき、ArrowLeft/ArrowRight で前/次のページ、Home/End で最初/最後のページに移動し、フォーカスは現在のページに追従します。フォーカス中のボタンが無効になった場合は、現在のページにフォーカスが移ります。

## Pagination

Support: beta

Shared core page windows, jump items/compact ellipses, controlled/default current and pageSize, quick jump, size changer/reset, visible range, simple/hidden-number layouts, sizes/shapes/variants, labels and total/range slots. Native configure({itemRender,totalRender}) returns text; ReactNode render callbacks are represented by text and named slots. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/pagination/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "current",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "total",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "pageSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "showTotal",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "defaultCurrent",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "defaultPageSize",
    "typeText": "number",
    "required": false,
    "default": 10
  },
  {
    "name": "showQuickJumper",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showSizeChanger",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "pageSizeOptions",
    "typeText": "array",
    "required": false
  },
  {
    "name": "simple",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "siblingCount",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "boundaryCount",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hideEdges",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "hideNumbers",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "responsive",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "shape",
    "typeText": "string",
    "required": false,
    "default": "rounded"
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "solid"
  },
  {
    "name": "labels",
    "typeText": "object",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "{ current: number; pageSize: number }",
    "description": "Requested page/size; changing size resets the requested page to one."
  }
]
```

### slots

```json
[
  {
    "name": "total"
  },
  {
    "name": "range"
  },
  {
    "name": "default"
  }
]
```

## CSS variables

```json
{
  "css:Pagination": {
    "kind": "cssVars",
    "source": "react/src/components/Pagination",
    "vars": [
      {
        "name": "--pagination-item-size",
        "description": "Height and minimum width of the page buttons (every size; defaults to the density's control height)"
      },
      {
        "name": "--pagination-item-radius",
        "description": "Corner radius of the page buttons (defaults to --radius-md; the shape prop wins)"
      },
      {
        "name": "--pagination-gap",
        "description": "Space between the items"
      },
      {
        "name": "--pagination-font-size",
        "description": "Font size"
      },
      {
        "name": "--pagination-active-background",
        "description": "Background of the current page (solid variant)"
      },
      {
        "name": "--pagination-active-color",
        "description": "Text color of the current page (solid variant)"
      },
      {
        "name": "--pagination-hover-background",
        "description": "Background of a hovered page button (defaults to --hover-color)"
      },
      {
        "name": "--pagination-subtle-background",
        "description": "Background of the current page of the ghost variant (defaults to --primary-color-subtle)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
