# Skeleton 骨架屏

在内容加载期间显示的占位图形。

Package: minerva-design@1.20.2

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Skeleton

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Skeleton"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "type": "SkeletonVariant",
    "default": "\"text\"",
    "required": false,
    "description": "Shape of the placeholder",
    "typeText": "SkeletonVariant"
  },
  {
    "name": "animation",
    "type": "SkeletonAnimation",
    "default": "\"pulse\"",
    "required": false,
    "description": "Loading animation; \"false\" disables it",
    "typeText": "SkeletonAnimation"
  },
  {
    "name": "decorative",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Renders one bare decorative placeholder (`<span aria-hidden>`) instead of\nthe announced loading region. Use it to compose your own skeleton layout\ninside a container that already exposes the busy state",
    "typeText": "boolean"
  },
  {
    "name": "size",
    "type": "string | number",
    "required": false,
    "description": "Edge length of a decorative circular placeholder (numbers are pixels);\nwins over width/height",
    "typeText": "string | number"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of each line (numbers are pixels)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of each line (numbers are pixels)",
    "typeText": "string | number"
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Shows the placeholder; set to false to render the default slot",
    "typeText": "boolean"
  },
  {
    "name": "borderRadius",
    "type": "string | number",
    "required": false,
    "description": "Custom corner radius of each line",
    "typeText": "string | number"
  },
  {
    "name": "lines",
    "type": "number",
    "default": "1",
    "required": false,
    "description": "Number of lines to render",
    "typeText": "number"
  },
  {
    "name": "avatar",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows an avatar placeholder",
    "typeText": "boolean"
  },
  {
    "name": "avatarSize",
    "type": "string | number",
    "default": "40",
    "required": false,
    "description": "Avatar size (numbers are pixels)",
    "typeText": "string | number"
  },
  {
    "name": "avatarShape",
    "type": "\"circle\" | \"square\"",
    "default": "\"circle\"",
    "required": false,
    "description": "Avatar shape",
    "typeText": "\"circle\" | \"square\""
  },
  {
    "name": "active",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Highlights the card variant as active",
    "typeText": "boolean"
  },
  {
    "name": "paragraph",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a paragraph placeholder (replaces the lines)",
    "typeText": "boolean"
  },
  {
    "name": "title",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a title placeholder (replaces the lines)",
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
    "description": "Real content, rendered once loading is false",
    "typeText": "any"
  }
]
```

## SkeletonText

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SkeletonText"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "lines",
    "type": "number",
    "default": "3",
    "required": false,
    "description": "Number of text lines",
    "typeText": "number"
  },
  {
    "name": "lineHeight",
    "type": "string | number",
    "default": "\"1em\"",
    "required": false,
    "description": "Height of each line (numbers are pixels)",
    "typeText": "string | number"
  },
  {
    "name": "gap",
    "type": "string | number",
    "default": "2",
    "required": false,
    "description": "Space between lines: a spacing-scale step (2 -> var(--space-2)) or any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "shrinkLast",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Shrinks the last line to 70% width so the block reads like real text",
    "typeText": "boolean"
  },
  {
    "name": "animation",
    "type": "SkeletonAnimation",
    "default": "\"pulse\"",
    "required": false,
    "description": "Loading animation; \"false\" disables it",
    "typeText": "SkeletonAnimation"
  }
]
```

## CSS variables

```json
{
  "css:Skeleton": {
    "kind": "cssVars",
    "source": "react/src/components/Skeleton",
    "vars": [
      {
        "name": "--skeleton-color",
        "description": "Base color of the placeholder blocks"
      },
      {
        "name": "--skeleton-highlight-color",
        "description": "Color of the moving highlight (wave animation)"
      },
      {
        "name": "--skeleton-radius",
        "description": "Corner radius of the lines and blocks (circles stay round, rectangular blocks square)"
      },
      {
        "name": "--skeleton-text-height",
        "description": "Height of a text line"
      },
      {
        "name": "--skeleton-gap",
        "description": "Space between the lines of a paragraph and next to the avatar"
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

### apps/docs/src/docs/pages/skeleton/vue/basic.vue

```vue
<script setup lang="ts">
import { Skeleton, SkeletonText, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Skeleton width="180px" height="24px" /><SkeletonText :lines="3"
  /></VStack>
</template>

```

## Example: composition

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/vue/composition.vue

```vue
<script setup lang="ts">
import { Skeleton, SkeletonText, HStack, VStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="4" align="start"
    ><Skeleton variant="circular" width="48px" height="48px" /><VStack
      :gap="3"
      style="flex: 1"
      ><Skeleton width="40%" height="20px" /><SkeletonText :lines="3" /></VStack
  ></HStack>
</template>

```

## Example: loading

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/vue/loading.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Skeleton, Button, VStack } from "minerva-design/vue";
const loading = ref(true);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="loading = !loading">Toggle loading</Button
    ><Skeleton :loading="loading" height="64px"
      ><p>Content has finished loading.</p></Skeleton
    ></VStack
  >
</template>

```

## Example: variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/vue/variants.vue

```vue
<script setup lang="ts">
import { Skeleton, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Skeleton
      variant="circular"
      width="64px"
      height="64px"
      animation="pulse" /><Skeleton
      width="180px"
      height="64px"
      animation="wave" /><Skeleton
      width="120px"
      height="64px"
      animation="false"
  /></HStack>
</template>

```
