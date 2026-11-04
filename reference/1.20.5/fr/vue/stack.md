# Stack

Primitives de mise en page flex (Stack, HStack, VStack) avec des espacements par jetons, des séparateurs et des groupes accolés. Les enfants ne sont pas enveloppés.

Package: minerva-design@1.20.5

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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
