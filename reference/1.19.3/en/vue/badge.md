# Badge

A small count or status indicator attached to the corner of another element.

Package: minerva-design@1.19.3

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Badge

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Badge"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "color",
    "type": "ColorScheme",
    "default": "\"primary\"",
    "required": false,
    "description": "Semantic color of the badge",
    "typeText": "ColorScheme"
  },
  {
    "name": "variant",
    "type": "\"subtle\" | \"outline\" | \"solid\"",
    "default": "\"solid\"",
    "required": false,
    "description": "Visual style: `solid` (filled), `subtle` (tinted background) or\n`outline` (bordered)",
    "typeText": "\"subtle\" | \"outline\" | \"solid\""
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\"",
    "default": "\"medium\"",
    "required": false,
    "description": "Badge size",
    "typeText": "\"medium\" | \"small\" | \"large\""
  },
  {
    "name": "content",
    "type": "string | number",
    "required": false,
    "description": "Content displayed inside the badge (count, short text); the `content`\nslot renders rich content",
    "typeText": "string | number"
  },
  {
    "name": "position",
    "type": "\"top-right\" | \"top-left\" | \"bottom-right\" | \"bottom-left\"",
    "default": "\"top-right\"",
    "required": false,
    "description": "Corner of the children the badge is placed on (ignored by standalone badges)",
    "typeText": "\"top-right\" | \"top-left\" | \"bottom-right\" | \"bottom-left\""
  },
  {
    "name": "dot",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Renders a small dot instead of content",
    "typeText": "boolean"
  },
  {
    "name": "borderRadius",
    "type": "string",
    "required": false,
    "description": "Custom border radius (CSS value)",
    "typeText": "string"
  },
  {
    "name": "borderWidth",
    "type": "string",
    "required": false,
    "description": "Custom border width (CSS value)",
    "typeText": "string"
  },
  {
    "name": "role",
    "type": "string",
    "default": "\"status\"",
    "required": false,
    "description": "ARIA role of the badge element; set it to \"presentation\" or \"none\" when\nthe badge must not be announced as a live status",
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
    "description": "Element the badge is attached to, or the text content of a standalone badge",
    "typeText": "any"
  },
  {
    "name": "content",
    "type": "any",
    "description": "Rich content of the badge (the `content` prop)",
    "typeText": "any"
  },
  {
    "name": "icon",
    "type": "any",
    "description": "Icon displayed before the content",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:Badge": {
    "kind": "cssVars",
    "source": "react/src/components/Badge",
    "vars": [
      {
        "name": "--badge-bg",
        "description": "Background color (overrides the color and variant)"
      },
      {
        "name": "--badge-fg",
        "description": "Text color (overrides the color and variant)"
      },
      {
        "name": "--badge-border",
        "description": "Border color of the subtle and outline variants"
      },
      {
        "name": "--badge-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--badge-padding-y",
        "description": "Vertical padding (every size)"
      },
      {
        "name": "--badge-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--badge-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--badge-dot-size",
        "description": "Diameter of the dot badge"
      },
      {
        "name": "--badge-ring-color",
        "description": "Color of the ring separating an attached (corner) badge from its content (defaults to --surface-color)"
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

### apps/docs/src/docs/pages/badge/vue/basic.vue

```vue
<script setup lang="ts">
import { Badge, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="4" align="center" wrap
    ><Badge :content="5" aria-label="5 unread notifications"
      ><span aria-label="Notifications" style="font-size: 24px">♧</span></Badge
    ><Badge content="99+" aria-label="More than 99 messages"
      ><span aria-label="Messages" style="font-size: 24px">✉</span></Badge
    ><span
      >Inbox <Badge :content="12" color="info" aria-label="12 unread" /> and
      changelog <Badge color="success">New</Badge></span
    ></HStack
  >
</template>

```

## Example: colors-variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/badge/vue/colors-variants.vue

```vue
<script setup lang="ts">
import { Badge, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Badge color="success" variant="solid">Success</Badge
    ><Badge color="warning" variant="subtle">Warning</Badge
    ><Badge color="danger" variant="outline">Danger</Badge
    ><Badge color="info" size="small">Info</Badge></HStack
  >
</template>

```

## Example: positions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/badge/vue/positions.vue

```vue
<script setup lang="ts">
import { Badge, Avatar, HStack } from "minerva-design/vue";
const positions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;
</script>
<template>
  <HStack :gap="3" wrap
    ><Badge
      v-for="position in positions"
      :key="position"
      :position="position"
      :content="3"
      ><Avatar name="Ada Lovelace" /></Badge
  ></HStack>
</template>

```

## Example: slots

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/badge/vue/slots.vue

```vue
<script setup lang="ts">
import { Badge, Button, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Badge
      ><template #content><span aria-hidden="true">★</span> New</template
      ><Button variant="outline">Release</Button></Badge
    ><Badge dot color="success"
      ><Button variant="outline">Online</Button></Badge
    ></HStack
  >
</template>

```
