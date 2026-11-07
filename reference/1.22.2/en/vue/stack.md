# Stack

Flex layout primitives (Stack, HStack, VStack) with token-based gaps, optional separators and attached groups. Children are not wrapped in item elements.

Package: minerva-design@1.22.2

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## HStack

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "HStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "wrap",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Wraps items onto multiple lines",
    "typeText": "boolean"
  },
  {
    "name": "as",
    "type": "string | Component",
    "default": "\"div\"",
    "required": false,
    "description": "Element or component to render",
    "typeText": "string | Component"
  },
  {
    "name": "gap",
    "type": "string | number",
    "required": false,
    "description": "Gap between items: numbers and numeric strings select spacing tokens\n(`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted.",
    "typeText": "string | number"
  },
  {
    "name": "align",
    "type": "StackAlign",
    "required": false,
    "description": "Cross-axis alignment (`align-items`); unset when omitted",
    "typeText": "StackAlign"
  },
  {
    "name": "justify",
    "type": "StackJustify",
    "required": false,
    "description": "Main-axis distribution (`justify-content`); unset when omitted",
    "typeText": "StackJustify"
  },
  {
    "name": "separator",
    "type": "string",
    "required": false,
    "description": "Rendered between every two items (not before the first or after the\nlast), e.g. `\"·\"`; the `separator` slot renders any content (a vertical\n`Divider`). Empty children (`v-if` comments) do not get a separator.",
    "typeText": "string"
  },
  {
    "name": "attached",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Joins the items into one attached group (e.g. a segmented row of buttons):\nno gap, shared borders and outer-only corner radii. The group gets\n`role=\"group\"` unless a role is given; label it with `aria-label`.",
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
    "description": "Items",
    "typeText": "any"
  },
  {
    "name": "separator",
    "type": "any",
    "description": "Rendered between every two items (the `separator` prop as content)",
    "typeText": "any"
  }
]
```

## Stack

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Stack"
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
    "name": "direction",
    "type": "StackDirection",
    "default": "\"column\"",
    "required": false,
    "description": "Flex direction",
    "typeText": "StackDirection"
  },
  {
    "name": "gap",
    "type": "string | number",
    "required": false,
    "description": "Gap between items: numbers and numeric strings select spacing tokens\n(`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted.",
    "typeText": "string | number"
  },
  {
    "name": "align",
    "type": "StackAlign",
    "required": false,
    "description": "Cross-axis alignment (`align-items`); unset when omitted",
    "typeText": "StackAlign"
  },
  {
    "name": "justify",
    "type": "StackJustify",
    "required": false,
    "description": "Main-axis distribution (`justify-content`); unset when omitted",
    "typeText": "StackJustify"
  },
  {
    "name": "wrap",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Wraps items onto multiple lines",
    "typeText": "boolean"
  },
  {
    "name": "separator",
    "type": "string",
    "required": false,
    "description": "Rendered between every two items (not before the first or after the\nlast), e.g. `\"·\"`; the `separator` slot renders any content (a vertical\n`Divider`). Empty children (`v-if` comments) do not get a separator.",
    "typeText": "string"
  },
  {
    "name": "attached",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Joins the items into one attached group (e.g. a segmented row of buttons):\nno gap, shared borders and outer-only corner radii. The group gets\n`role=\"group\"` unless a role is given; label it with `aria-label`.",
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
    "description": "Items",
    "typeText": "any"
  },
  {
    "name": "separator",
    "type": "any",
    "description": "Rendered between every two items (the `separator` prop as content)",
    "typeText": "any"
  }
]
```

## VStack

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "VStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "wrap",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Wraps items onto multiple lines",
    "typeText": "boolean"
  },
  {
    "name": "as",
    "type": "string | Component",
    "default": "\"div\"",
    "required": false,
    "description": "Element or component to render",
    "typeText": "string | Component"
  },
  {
    "name": "gap",
    "type": "string | number",
    "required": false,
    "description": "Gap between items: numbers and numeric strings select spacing tokens\n(`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted.",
    "typeText": "string | number"
  },
  {
    "name": "align",
    "type": "StackAlign",
    "required": false,
    "description": "Cross-axis alignment (`align-items`); unset when omitted",
    "typeText": "StackAlign"
  },
  {
    "name": "justify",
    "type": "StackJustify",
    "required": false,
    "description": "Main-axis distribution (`justify-content`); unset when omitted",
    "typeText": "StackJustify"
  },
  {
    "name": "separator",
    "type": "string",
    "required": false,
    "description": "Rendered between every two items (not before the first or after the\nlast), e.g. `\"·\"`; the `separator` slot renders any content (a vertical\n`Divider`). Empty children (`v-if` comments) do not get a separator.",
    "typeText": "string"
  },
  {
    "name": "attached",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Joins the items into one attached group (e.g. a segmented row of buttons):\nno gap, shared borders and outer-only corner radii. The group gets\n`role=\"group\"` unless a role is given; label it with `aria-label`.",
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
    "description": "Items",
    "typeText": "any"
  },
  {
    "name": "separator",
    "type": "any",
    "description": "Rendered between every two items (the `separator` prop as content)",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:Stack": {
    "kind": "cssVars",
    "source": "react/src/components/Stack",
    "vars": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: attached

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/stack/vue/attached.vue

```vue
<script setup lang="ts">
import { HStack, Button } from "minerva-design/vue";
</script>
<template>
  <HStack attached :gap="0"
    ><Button variant="outline">Previous</Button
    ><Button variant="outline">Current</Button
    ><Button variant="outline">Next</Button></HStack
  >
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/stack/vue/basic.vue

```vue
<script setup lang="ts">
import { Stack, Button } from "minerva-design/vue";
</script>
<template>
  <Stack direction="row" :gap="3"
    ><Button>Save</Button><Button variant="outline">Cancel</Button></Stack
  >
</template>

```

## Example: hstack-vstack

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/stack/vue/hstack-vstack.vue

```vue
<script setup lang="ts">
import { HStack, VStack, Button } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="6" align="start"
    ><VStack :gap="2"><Button>First</Button><Button>Second</Button></VStack
    ><VStack :gap="2"
      ><Button variant="outline">Third</Button
      ><Button variant="outline">Fourth</Button></VStack
    ></HStack
  >
</template>

```

## Example: wrap-separator

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/stack/vue/wrap-separator.vue

```vue
<script setup lang="ts">
import { Stack, Badge } from "minerva-design/vue";
</script>
<template>
  <Stack direction="row" wrap separator="/" :gap="2"
    ><Badge v-for="n in 8" :key="n">Section {{ n }}</Badge></Stack
  >
</template>

```
