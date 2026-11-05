# Box ボックス

スペーシング・サイズ・背景・角丸・影のショートハンドを備えたポリモーフィックなコンテナ。

Package: minerva-design@1.21.0

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Box

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Box"
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
    "description": "Element or component to render",
    "typeText": "string | Component"
  },
  {
    "name": "p",
    "type": "BoxSpace",
    "required": false,
    "description": "Padding on all sides (spacing token or CSS value)",
    "typeText": "BoxSpace"
  },
  {
    "name": "px",
    "type": "BoxSpace",
    "required": false,
    "description": "Horizontal padding (left and right)",
    "typeText": "BoxSpace"
  },
  {
    "name": "py",
    "type": "BoxSpace",
    "required": false,
    "description": "Vertical padding (top and bottom)",
    "typeText": "BoxSpace"
  },
  {
    "name": "pt",
    "type": "BoxSpace",
    "required": false,
    "description": "Top padding",
    "typeText": "BoxSpace"
  },
  {
    "name": "pr",
    "type": "BoxSpace",
    "required": false,
    "description": "Right padding",
    "typeText": "BoxSpace"
  },
  {
    "name": "pb",
    "type": "BoxSpace",
    "required": false,
    "description": "Bottom padding",
    "typeText": "BoxSpace"
  },
  {
    "name": "pl",
    "type": "BoxSpace",
    "required": false,
    "description": "Left padding",
    "typeText": "BoxSpace"
  },
  {
    "name": "m",
    "type": "BoxSpace",
    "required": false,
    "description": "Margin on all sides (spacing token or CSS value such as \"auto\")",
    "typeText": "BoxSpace"
  },
  {
    "name": "mx",
    "type": "BoxSpace",
    "required": false,
    "description": "Horizontal margin (left and right)",
    "typeText": "BoxSpace"
  },
  {
    "name": "my",
    "type": "BoxSpace",
    "required": false,
    "description": "Vertical margin (top and bottom)",
    "typeText": "BoxSpace"
  },
  {
    "name": "mt",
    "type": "BoxSpace",
    "required": false,
    "description": "Top margin",
    "typeText": "BoxSpace"
  },
  {
    "name": "mr",
    "type": "BoxSpace",
    "required": false,
    "description": "Right margin",
    "typeText": "BoxSpace"
  },
  {
    "name": "mb",
    "type": "BoxSpace",
    "required": false,
    "description": "Bottom margin",
    "typeText": "BoxSpace"
  },
  {
    "name": "ml",
    "type": "BoxSpace",
    "required": false,
    "description": "Left margin",
    "typeText": "BoxSpace"
  },
  {
    "name": "w",
    "type": "BoxSize",
    "required": false,
    "description": "Width: numbers are pixels, strings are CSS lengths",
    "typeText": "BoxSize"
  },
  {
    "name": "h",
    "type": "BoxSize",
    "required": false,
    "description": "Height: numbers are pixels, strings are CSS lengths",
    "typeText": "BoxSize"
  },
  {
    "name": "minW",
    "type": "BoxSize",
    "required": false,
    "description": "Minimum width",
    "typeText": "BoxSize"
  },
  {
    "name": "minH",
    "type": "BoxSize",
    "required": false,
    "description": "Minimum height",
    "typeText": "BoxSize"
  },
  {
    "name": "maxW",
    "type": "BoxSize",
    "required": false,
    "description": "Maximum width",
    "typeText": "BoxSize"
  },
  {
    "name": "maxH",
    "type": "BoxSize",
    "required": false,
    "description": "Maximum height",
    "typeText": "BoxSize"
  },
  {
    "name": "bg",
    "type": "string",
    "required": false,
    "description": "Background: a surface alias (`\"bg\"`, `\"bg.subtle\"`, `\"bg.muted\"`, `\"bg.canvas\"`,\n`\"bg.elevated\"`, `\"bg.emphasis\"`) or any CSS background value",
    "typeText": "string"
  },
  {
    "name": "rounded",
    "type": "string",
    "required": false,
    "description": "Border radius: a radius token (none, sm, md, lg, xl, 2xl, full) or any CSS value",
    "typeText": "string"
  },
  {
    "name": "boxShadow",
    "type": "string",
    "required": false,
    "description": "Box shadow: a shadow token (sm, md, lg, xl) or any CSS value",
    "typeText": "string"
  },
  {
    "name": "border",
    "type": "string",
    "required": false,
    "description": "CSS border shorthand, used as-is",
    "typeText": "string"
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/box/vue/basic.vue

```vue
<script setup lang="ts">
import { Box } from "minerva-design/vue";
</script>
<template>
  <Box :p="4" bg="surface" rounded="lg">A padded surface</Box>
</template>

```

## Example: spacing-sizing

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/box/vue/spacing-sizing.vue

```vue
<script setup lang="ts">
import { Box, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Box :px="6" :py="3" w="180px" border="1px solid var(--color-border)"
      >Horizontal spacing</Box
    ><Box :p="3" w="120px" h="100px" bg="muted">Fixed dimensions</Box></HStack
  >
</template>

```

## Example: surfaces

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/box/vue/surfaces.vue

```vue
<script setup lang="ts">
import { Box, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Box :p="4" rounded="lg" box-shadow="sm" bg="surface">Elevated</Box
    ><Box :p="4" rounded="full" border="1px solid var(--color-border)"
      >Outlined</Box
    ></HStack
  >
</template>

```
