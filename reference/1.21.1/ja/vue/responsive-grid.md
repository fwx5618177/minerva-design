# ResponsiveGrid レスポンシブグリッド

列数がビューポートではなく自身の幅（コンテナクエリ）に従う等幅カラムのグリッド。

Package: minerva-design@1.21.1

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## GridItem

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "GridItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "fullWidth",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Spans the full row of the surrounding grid",
    "typeText": "boolean"
  },
  {
    "name": "asChild",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Merges the item attributes and classes into its single child instead of\nrendering a wrapper div",
    "typeText": "boolean"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## ResponsiveGrid

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ResponsiveGrid"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "as",
    "type": "string | Component",
    "default": "\"div\"",
    "required": false,
    "description": "Element or component rendered as the outer container (div, section, nav...)",
    "typeText": "string | Component"
  },
  {
    "name": "columns",
    "type": "ResponsiveGridColumns",
    "default": "1",
    "required": false,
    "description": "Column counts, responding to the grid's own width (container queries):\na number, or `{ base, sm, md, lg }` (480 / 768 / 1200px). Integers 1-12;\nother values throw a RangeError.",
    "typeText": "ResponsiveGridColumns"
  },
  {
    "name": "gap",
    "type": "string | number",
    "default": "4",
    "required": false,
    "description": "Gap between rows and columns: numbers and numeric strings select spacing\ntokens, other strings are CSS values",
    "typeText": "string | number"
  },
  {
    "name": "rowGap",
    "type": "string | number",
    "required": false,
    "description": "Gap between rows; defaults to `gap`",
    "typeText": "string | number"
  },
  {
    "name": "columnGap",
    "type": "string | number",
    "required": false,
    "description": "Gap between columns; defaults to `gap`",
    "typeText": "string | number"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:ResponsiveGrid": {
    "kind": "cssVars",
    "source": "react/src/components/ResponsiveGrid",
    "vars": [
      {
        "name": "--responsive-grid-align-items",
        "description": "Vertical alignment of the items in their row (default: stretch)"
      },
      {
        "name": "--responsive-grid-justify-items",
        "description": "Horizontal alignment of the items in their column (default: stretch)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/responsive-grid/vue/basic.vue

```vue
<script setup lang="ts">
import { ResponsiveGrid, Box } from "minerva-design/vue";
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, sm: 2, lg: 3 }" :gap="3"
    ><Box
      v-for="n in 6"
      :key="n"
      :p="4"
      bg="surface"
      border="1px solid var(--color-border)"
      >Card {{ n }}</Box
    ></ResponsiveGrid
  >
</template>

```

## Example: container

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/responsive-grid/vue/container.vue

```vue
<script setup lang="ts">
import { ResponsiveGrid, Box } from "minerva-design/vue";
</script>
<template>
  <Box max-w="560px" :p="3" border="1px solid var(--color-border)"
    ><ResponsiveGrid :columns="{ base: 1, sm: 2 }" :gap="3"
      ><Box v-for="n in 4" :key="n" :p="4" bg="muted"
        >Responsive {{ n }}</Box
      ></ResponsiveGrid
    ></Box
  >
</template>

```

## Example: full-width

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/responsive-grid/vue/full-width.vue

```vue
<script setup lang="ts">
import { ResponsiveGrid, GridItem, Box } from "minerva-design/vue";
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, sm: 3 }" :gap="3"
    ><GridItem full-width
      ><Box :p="4" bg="muted">Full-width heading</Box></GridItem
    ><Box v-for="n in 3" :key="n" :p="4" border="1px solid var(--color-border)"
      >Column {{ n }}</Box
    ></ResponsiveGrid
  >
</template>

```
