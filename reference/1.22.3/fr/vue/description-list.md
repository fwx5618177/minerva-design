# DescriptionList

Champs de métadonnées étiquetés rendus dans un dl natif ; les lignes s'empilent sur écran étroit.

Package: minerva-design@1.22.3

Renderer: vue

Locale: fr

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

## DescriptionItem

Support: n/a

Data object in Vue (like React): an item of the parent component's items / entries prop.

## DescriptionList

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DescriptionList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "type": "DescriptionListItem[]",
    "required": true,
    "description": "Rows to render, in order",
    "typeText": "DescriptionListItem[]"
  },
  {
    "name": "bordered",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Frames the list as a card (full border, rounded corners, surface\nbackground, padded rows)",
    "typeText": "boolean"
  },
  {
    "name": "striped",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Tints every other row (replaces the row separators)",
    "typeText": "boolean"
  }
]
```

### slots

```json
[
  {
    "name": "label",
    "type": "{ item: DescriptionListItem; }",
    "description": "Term of a row (default: `item.label`)",
    "typeText": "{ item: DescriptionListItem; }"
  },
  {
    "name": "value",
    "type": "{ item: DescriptionListItem; }",
    "description": "Description of a row (default: `item.value`)",
    "typeText": "{ item: DescriptionListItem; }"
  }
]
```

## CSS variables

```json
{
  "css:DescriptionList": {
    "kind": "cssVars",
    "source": "react/src/components/DescriptionList",
    "vars": [
      {
        "name": "--description-list-row-padding-y",
        "description": "Vertical padding of a row (follows the density's row padding)"
      },
      {
        "name": "--description-list-gap",
        "description": "Space between the term and the description"
      },
      {
        "name": "--description-list-term-color",
        "description": "Text color of the terms"
      },
      {
        "name": "--description-list-border-color",
        "description": "Color of the row separators"
      },
      {
        "name": "--description-list-font-size",
        "description": "Font size"
      },
      {
        "name": "--description-list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--description-list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--description-list-padding-x",
        "description": "Horizontal padding of the rows of a bordered or striped list"
      },
      {
        "name": "--description-list-stripe-background",
        "description": "Background of every other row of a striped list (defaults to --surface-subtle-color)"
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

### apps/docs/src/docs/pages/description-list/vue/basic.vue

```vue
<script setup lang="ts">
import { DescriptionList } from "minerva-design/vue";
</script>
<template>
  <DescriptionList
    :items="[
      { key: 'name', label: 'Name', value: 'Minerva' },
      { key: 'status', label: 'Status', value: 'Active' },
    ]"
  />
</template>

```

## Example: items

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/description-list/vue/items.vue

```vue
<script setup lang="ts">
import { DescriptionList } from "minerva-design/vue";
const items = [
  { key: "owner", label: "Owner", value: "Design team" },
  { key: "members", label: "Members", value: 12 },
  { key: "created", label: "Created", value: "2026-01-15" },
];
</script>
<template>
  <DescriptionList :items="items" />
</template>

```

## Example: styling

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/description-list/vue/styling.vue

```vue
<script setup lang="ts">
import { DescriptionList, Box } from "minerva-design/vue";
</script>
<template>
  <Box :p="4" rounded="lg" border="1px solid var(--color-border)"
    ><DescriptionList
      :items="[
        { key: 'id', label: 'Project ID', value: 'minerva-001' },
        { key: 'url', label: 'Repository', value: 'github.com/minerva/design' },
      ]"
  /></Box>
</template>

```

## Example: variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/description-list/vue/variants.vue

```vue
<script setup lang="ts">
import { DescriptionList, VStack } from "minerva-design/vue";
const items = [
  { key: "plan", label: "Plan", value: "Team" },
  { key: "region", label: "Region", value: "Europe" },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><DescriptionList bordered :items="items" /><DescriptionList
      striped
      :items="items"
  /></VStack>
</template>

```
