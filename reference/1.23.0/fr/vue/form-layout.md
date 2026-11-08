# FormLayout

Un formulaire natif dont les champs sont disposés sur une grille responsive ; envoi, réinitialisation et validation restent natifs.

Package: minerva-design@1.23.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

- [Vue controlled project form](/minerva-design/reference/1.23.0/recipes/vue-form/README.md) — vue; verified package 1.23.0

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
