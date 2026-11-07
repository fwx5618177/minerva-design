# FormLayout 表单布局

原生 form，字段排布在响应式网格上；提交、重置和校验保持原生行为。

Package: minerva-design@1.22.1

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## FormLayout

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "FormLayout"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "columns",
    "type": "ResponsiveGridColumns",
    "default": "1",
    "required": false,
    "description": "Column counts of the inner ResponsiveGrid: a number, or `{ base, sm, md, lg }`\n(container widths 480 / 768 / 1200px). Integers 1-12",
    "typeText": "ResponsiveGridColumns"
  },
  {
    "name": "gap",
    "type": "string | number",
    "default": "4",
    "required": false,
    "description": "Gap between fields: numbers and numeric strings select spacing tokens,\nother strings are CSS values",
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
    "description": "Fields",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:FormLayout": {
    "kind": "cssVars",
    "source": "react/src/components/FormLayout",
    "vars": [
      {
        "name": "--form-layout-max-width",
        "description": "Maximum width of the form (none by default)"
      },
      {
        "name": "--form-layout-margin-inline",
        "description": "Inline margin of the form (set auto with a max width to center it)"
      },
      {
        "name": "--form-layout-padding",
        "description": "Inner padding of the form"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [Vue controlled project form](/minerva-design/reference/1.22.1/recipes/vue-form/README.md) — vue; verified package 1.22.1

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/form-layout/vue/basic.vue

```vue
<script setup lang="ts">
import { FormLayout, FormField, Input } from "minerva-design/vue";
</script>
<template>
  <FormLayout :columns="{ base: 1, sm: 2 }" :gap="4"
    ><FormField label="First name"><Input /></FormField
    ><FormField label="Last name"><Input /></FormField
    ><FormField label="Email"><Input type="email" /></FormField
    ><FormField label="Company"><Input /></FormField
  ></FormLayout>
</template>

```

## Example: gaps

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/form-layout/vue/gaps.vue

```vue
<script setup lang="ts">
import { FormLayout, FormField, Input } from "minerva-design/vue";
</script>
<template>
  <FormLayout :columns="{ base: 1, sm: 2 }" :row-gap="6" :column-gap="3"
    ><FormField
      v-for="label in ['Street', 'City', 'Region', 'Postal code']"
      :key="label"
      :label="label"
      ><Input /></FormField
  ></FormLayout>
</template>

```
