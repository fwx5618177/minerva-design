# Pagination 分页

将较长的数据列表分页，并让用户在页面之间切换。

Package: minerva-design@1.22.3

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘支持

分页组件是由原生按钮组成的  地标；当前页带有 aria-current="page" 标记，不可用的项会被禁用。某一项获得焦点时，ArrowLeft/ArrowRight 切换到上一页/下一页，Home/End 跳到第一页/最后一页，焦点会跟随当前页。若获得焦点的按钮变为禁用，焦点会移到当前页。

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
