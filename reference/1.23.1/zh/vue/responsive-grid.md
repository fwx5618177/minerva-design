# ResponsiveGrid 响应式网格

等宽列网格，列数随自身宽度（容器查询）而非视口变化。

Package: minerva-design@1.23.1

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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
