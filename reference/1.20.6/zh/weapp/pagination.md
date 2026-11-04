# Pagination 分页

将较长的数据列表分页，并让用户在页面之间切换。

Package: minerva-design@1.20.6

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘支持

分页组件是由原生按钮组成的  地标；当前页带有 aria-current="page" 标记，不可用的项会被禁用。某一项获得焦点时，ArrowLeft/ArrowRight 切换到上一页/下一页，Home/End 跳到第一页/最后一页，焦点会跟随当前页。若获得焦点的按钮变为禁用，焦点会移到当前页。

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
