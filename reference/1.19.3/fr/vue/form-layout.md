# FormLayout

Un formulaire natif dont les champs sont disposés sur une grille responsive ; envoi, réinitialisation et validation restent natifs.

Package: minerva-design@1.19.3

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

- [Vue controlled project form](/minerva-design/reference/1.19.3/recipes/vue-form/README.md) — vue; verified package 1.19.3

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
