# Pagination ページネーション

長いデータの一覧をページに分割し、ページ間を移動できるようにします。

Package: minerva-design@1.20.5

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボード操作

ページネーションはネイティブボタンで構成された  ランドマークです。現在のページには aria-current="page" が付与され、利用できない項目は無効になります。項目にフォーカスがあるとき、ArrowLeft/ArrowRight で前/次のページ、Home/End で最初/最後のページに移動し、フォーカスは現在のページに追従します。フォーカス中のボタンが無効になった場合は、現在のページにフォーカスが移ります。

## Pagination

Support: beta

Shared core page lists and visible ranges; controlled/default page and page size, quick jumper, native size picker, numbered/compact/simple/read-only layouts, labels, item/total slots, semantic variants/shapes/sizes and H5 navigation keys. ReactNode rendering is expressed by item/total scoped slots. Native picker styling follows its host. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Pagination"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "current",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "defaultCurrent",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "total",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "pageSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "defaultPageSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showTotal",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showQuickJumper",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showSizeChanger",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "pageSizeOptions",
    "typeText": "number[] | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"rounded\" | \"circle\" | \"square\" | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"outline\" | \"solid\" | \"ghost\" | undefined",
    "required": false
  },
  {
    "name": "simple",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "siblingCount",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "boundaryCount",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "hideEdges",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "hideNumbers",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "responsive",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Labels | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[page: number, size: number]",
    "parameters": [
      {
        "name": "page",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      },
      {
        "name": "size",
        "position": 1,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:current",
    "typeText": "[page: number]",
    "parameters": [
      {
        "name": "page",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:pageSize",
    "typeText": "[size: number]",
    "parameters": [
      {
        "name": "size",
        "position": 0,
        "typeText": "number",
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
    "name": "total",
    "typeText": "{ total: number; range: [number, number]; }"
  },
  {
    "name": "item",
    "typeText": "{ page: number; type: string; }"
  }
]
```

### bindings

```json
[
  {
    "prop": "current",
    "event": "update:current",
    "syntax": "v-model:current"
  },
  {
    "prop": "pageSize",
    "event": "update:pageSize",
    "syntax": "v-model:pageSize"
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
