# DescriptionList 説明リスト

ネイティブの dl で描画するラベル付きメタデータ。狭い画面では行が縦に並びます。

Package: minerva-design@1.20.1

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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
