# Pagination ページネーション

長いデータの一覧をページに分割し、ページ間を移動できるようにします。

Package: minerva-design@1.20.2

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボード操作

ページネーションはネイティブボタンで構成された  ランドマークです。現在のページには aria-current="page" が付与され、利用できない項目は無効になります。項目にフォーカスがあるとき、ArrowLeft/ArrowRight で前/次のページ、Home/End で最初/最後のページに移動し、フォーカスは現在のページに追従します。フォーカス中のボタンが無効になった場合は、現在のページにフォーカスが移ります。

## Pagination

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "type": "number",
    "required": false,
    "description": "Current page (1-based, controlled: `v-model:current`)",
    "typeText": "number"
  },
  {
    "name": "defaultCurrent",
    "type": "number",
    "required": false,
    "description": "Initial page when uncontrolled (current not set)",
    "typeText": "number"
  },
  {
    "name": "total",
    "type": "number",
    "default": "0",
    "required": false,
    "description": "Total number of items",
    "typeText": "number"
  },
  {
    "name": "pageSize",
    "type": "number",
    "required": false,
    "description": "Number of items per page (controlled: `v-model:pageSize`)",
    "typeText": "number"
  },
  {
    "name": "defaultPageSize",
    "type": "number",
    "required": false,
    "description": "Initial number of items per page when uncontrolled (pageSize not set)",
    "typeText": "number"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the pagination",
    "typeText": "boolean"
  },
  {
    "name": "showQuickJumper",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows an input to jump to a page",
    "typeText": "boolean"
  },
  {
    "name": "showSizeChanger",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a page size selector",
    "typeText": "boolean"
  },
  {
    "name": "pageSizeOptions",
    "type": "number[]",
    "default": "[10, 20, 50, 100]",
    "required": false,
    "description": "Options of the page size selector",
    "typeText": "number[]"
  },
  {
    "name": "itemRender",
    "type": "((page: number, type: PaginationItemType) => VNodeChild)",
    "required": false,
    "description": "Custom rendering of the page, prev/next and jump items (or the `item`\nscoped slot)",
    "typeText": "((page: number, type: PaginationItemType) => VNodeChild)"
  },
  {
    "name": "showTotal",
    "type": "boolean | ((total: number, range: [number, number]) => VNodeChild)",
    "default": "false",
    "required": false,
    "description": "Shows the total number of items; a function renders it (same signature\nas totalRender)",
    "typeText": "boolean | ((total: number, range: [number, number]) => VNodeChild)"
  },
  {
    "name": "totalRender",
    "type": "((total: number, range: [number, number]) => VNodeChild)",
    "required": false,
    "description": "Custom rendering of the total (or the `total` scoped slot); range is the\n[first, last] item index of the current page",
    "typeText": "((total: number, range: [number, number]) => VNodeChild)"
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\"",
    "default": "\"medium\"",
    "required": false,
    "description": "Pagination size",
    "typeText": "\"medium\" | \"small\" | \"large\""
  },
  {
    "name": "shape",
    "type": "\"rounded\" | \"circle\" | \"square\"",
    "default": "\"rounded\"",
    "required": false,
    "description": "Shape of the page items",
    "typeText": "\"rounded\" | \"circle\" | \"square\""
  },
  {
    "name": "variant",
    "type": "\"outline\" | \"solid\" | \"ghost\"",
    "default": "\"solid\"",
    "required": false,
    "description": "Visual style of the page items",
    "typeText": "\"outline\" | \"solid\" | \"ghost\""
  },
  {
    "name": "simple",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Simple mode: prev/next buttons with a page input",
    "typeText": "boolean"
  },
  {
    "name": "siblingCount",
    "type": "number",
    "required": false,
    "description": "Number of pages shown on each side of the current page (switches to\nthe compact page list)",
    "typeText": "number"
  },
  {
    "name": "boundaryCount",
    "type": "number",
    "required": false,
    "description": "Number of pages always shown at both ends of the compact page list",
    "typeText": "number"
  },
  {
    "name": "hideEdges",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Hides the prev / next buttons",
    "typeText": "boolean"
  },
  {
    "name": "hideNumbers",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Replaces the page buttons with a read-only \"current / total\" counter",
    "typeText": "boolean"
  },
  {
    "name": "responsive",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Adapts the layout to small screens",
    "typeText": "boolean"
  },
  {
    "name": "icons",
    "type": "{ prev?: VNodeChild; next?: VNodeChild; jumpPrev?: VNodeChild; jumpNext?: VNodeChild; }",
    "required": false,
    "description": "Custom icons for the prev, next and jump items (or the `prev-icon`,\n`next-icon`, `jump-prev-icon`, `jump-next-icon` slots)",
    "typeText": "{ prev?: VNodeChild; next?: VNodeChild; jumpPrev?: VNodeChild; jumpNext?: VNodeChild; }"
  },
  {
    "name": "labels",
    "type": "PaginationLabels",
    "required": false,
    "description": "Custom texts and accessible labels (override the localized defaults)",
    "typeText": "PaginationLabels"
  }
]
```

### events

```json
[
  {
    "name": "change",
    "type": "[page: number, pageSize: number]",
    "typeText": "[page: number, pageSize: number]",
    "parameters": [
      {
        "name": "page",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      },
      {
        "name": "pageSize",
        "position": 1,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:current",
    "type": "[page: number]",
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
    "type": "[pageSize: number]",
    "typeText": "[pageSize: number]",
    "parameters": [
      {
        "name": "pageSize",
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
    "name": "item",
    "type": "{ page: number; type: PaginationItemType; }",
    "description": "Content of a page / prev / next / jump item (like `itemRender`)",
    "typeText": "{ page: number; type: PaginationItemType; }"
  },
  {
    "name": "total",
    "type": "{ total: number; range: [number, number]; }",
    "description": "The total text (like `totalRender`)",
    "typeText": "{ total: number; range: [number, number]; }"
  },
  {
    "name": "prev-icon",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "next-icon",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "jump-prev-icon",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "jump-next-icon",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "jump-to",
    "type": "any",
    "description": "Visible text of the quick jumper (like `labels.jumpTo`)",
    "typeText": "any"
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

## Example: appearance

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/vue/appearance.vue

```vue
<script setup lang="ts">
import { Pagination, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Pagination
      :total="80"
      size="small"
      shape="circle"
      variant="solid" /><Pagination
      :total="80"
      size="large"
      shape="square"
      variant="outline"
  /></VStack>
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/vue/basic.vue

```vue
<script setup lang="ts">
import { Pagination } from "minerva-design/vue";
</script>
<template><Pagination :default-current="1" :total="50" /></template>

```

## Example: simple

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/vue/simple.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Pagination } from "minerva-design/vue";
const page = ref(1);
</script>
<template><Pagination v-model:current="page" simple :total="120" /></template>

```

## Example: total-and-jumper

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/pagination/vue/total-and-jumper.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Pagination, VStack } from "minerva-design/vue";
const page = ref(1);
const size = ref(10);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Pagination
      v-model:current="page"
      v-model:page-size="size"
      :total="248"
      show-total
      show-size-changer
      show-quick-jumper
    /><output>Page {{ page }}, {{ size }} rows per page</output></VStack
  >
</template>

```
