# SplitLayout

Contenu principal avec un panneau latéral facultatif placé à côté dès que la largeur de la mise en page atteint un seuil.

Package: minerva-design@1.20.4

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## SplitLayout

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SplitLayout"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "aside",
    "type": "string | number | null",
    "required": false,
    "description": "Secondary text rendered after the main slot (or the `aside` slot).\nWithout both, the aside column is omitted (single full-width column);\n`0` is valid content.",
    "typeText": "string | number | null"
  },
  {
    "name": "asideWidth",
    "type": "number",
    "default": "320",
    "required": false,
    "description": "Requested aside width in pixels in split mode (the track is\n`min(asideWidth, 50%)`); must be finite and positive, otherwise a RangeError\nis thrown",
    "typeText": "number"
  },
  {
    "name": "collapseBelow",
    "type": "SplitLayoutCollapseBelow",
    "default": "\"md\"",
    "required": false,
    "description": "Splits at container widths of at least 768px (`md`) or 1200px (`lg`) and\nstacks below",
    "typeText": "SplitLayoutCollapseBelow"
  },
  {
    "name": "gap",
    "type": "string | number",
    "default": "6",
    "required": false,
    "description": "Gap between the slots: numbers and numeric strings select spacing tokens,\nother strings are CSS values",
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
    "description": "Main content",
    "typeText": "any"
  },
  {
    "name": "aside",
    "type": "any",
    "description": "Secondary content (the `aside` prop)",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:SplitLayout": {
    "kind": "cssVars",
    "source": "react/src/components/SplitLayout",
    "vars": [
      {
        "name": "--split-layout-align-items",
        "description": "Vertical alignment of the main and aside columns (default: start)"
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

### apps/docs/src/docs/pages/split-layout/vue/basic.vue

```vue
<script setup lang="ts">
import { SplitLayout, Box } from "minerva-design/vue";
</script>
<template>
  <SplitLayout :aside-width="220"
    ><template #aside><Box :p="4" bg="muted">Sidebar navigation</Box></template
    ><Box :p="4"
      >Main content grows to fill the available space.</Box
    ></SplitLayout
  >
</template>

```

## Example: options

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/split-layout/vue/options.vue

```vue
<script setup lang="ts">
import { SplitLayout, Box } from "minerva-design/vue";
</script>
<template>
  <SplitLayout :aside-width="280" collapse-below="lg" :gap="6"
    ><template #aside
      ><Box :p="4" border="1px solid var(--color-border)"
        >Collapses below the large breakpoint</Box
      ></template
    ><Box :p="4" bg="muted"
      >Resize the viewport to stack these columns.</Box
    ></SplitLayout
  >
</template>

```
