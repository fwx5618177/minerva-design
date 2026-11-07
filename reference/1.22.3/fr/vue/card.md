# Card

Un conteneur qui regroupe du contenu et des actions liés, composé de CardHeader, CardTitle, CardDescription, CardContent et CardFooter.

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

## Card

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Card"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "type": "CardVariant",
    "default": "\"default\"",
    "required": false,
    "description": "Visual style of the card: bordered (`default`, `outline`), shadowed\n(`elevated`), a muted block (`filled`) or transparent until hovered\nwhen interactive (`ghost`)",
    "typeText": "CardVariant"
  },
  {
    "name": "padding",
    "type": "CardPadding",
    "required": false,
    "description": "Pads the card itself (sections then sit flush, separated by spacing and a\nfooter rule). When omitted the classic layout is used: each section pads\nitself and has its own background and divider",
    "typeText": "CardPadding"
  },
  {
    "name": "interactive",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Adds hover and focus-visible feedback for clickable cards\n(combine with `as=\"a\"` / `as=\"button\"`)",
    "typeText": "boolean"
  },
  {
    "name": "as",
    "type": "string | Component",
    "default": "\"div\"",
    "required": false,
    "description": "Element or component rendered as the root, e.g. \"a\", \"button\", \"article\"",
    "typeText": "string | Component"
  },
  {
    "name": "type",
    "type": "\"submit\" | \"button\" | \"reset\"",
    "required": false,
    "description": "Native `type` of the root when `as=\"button\"`",
    "typeText": "\"submit\" | \"button\" | \"reset\""
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Card content, usually CardHeader, CardContent and CardFooter",
    "typeText": "any"
  }
]
```

## CardContent

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "CardContent"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "type": "\"slideIn\" | \"fadeIn\" | \"zoomIn\"",
    "required": false,
    "description": "Entrance animation of the content",
    "typeText": "\"slideIn\" | \"fadeIn\" | \"zoomIn\""
  },
  {
    "name": "padding",
    "type": "CardPadding",
    "required": false,
    "description": "Overrides the inner spacing of this section",
    "typeText": "CardPadding"
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

## CardDescription

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "CardDescription"
  ],
  "kind": "named"
}
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

## CardFooter

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "CardFooter"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "padding",
    "type": "CardPadding",
    "required": false,
    "description": "Overrides the inner spacing of this section",
    "typeText": "CardPadding"
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

## CardHeader

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "CardHeader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "padding",
    "type": "CardPadding",
    "required": false,
    "description": "Overrides the inner spacing of this section",
    "typeText": "CardPadding"
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

## CardTitle

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "CardTitle"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "as",
    "type": "\"h3\" | \"h1\" | \"h2\" | \"h4\" | \"h5\" | \"h6\"",
    "default": "\"h3\"",
    "required": false,
    "description": "Heading level rendered",
    "typeText": "\"h3\" | \"h1\" | \"h2\" | \"h4\" | \"h5\" | \"h6\""
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

## CSS variables

```json
{
  "css:Card": {
    "kind": "cssVars",
    "source": "react/src/components/Card",
    "vars": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/card/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "minerva-design/vue";
const opened = ref(false);
</script>
<template>
  <div style="width: 340px">
    <Card
      ><CardHeader
        ><CardTitle>Project Apollo</CardTitle
        ><CardDescription>Updated 2 hours ago</CardDescription></CardHeader
      ><CardContent
        >A design system for building accessible, themeable
        interfaces.</CardContent
      ><CardFooter
        ><Button size="small" @click="opened = true">Open</Button></CardFooter
      ></Card
    >
    <p v-if="opened" role="status">Opened Project Apollo</p>
  </div>
</template>

```

## Example: interactive

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/card/vue/interactive.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, VStack } from "minerva-design/vue";
const count = ref(0);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Card interactive tabindex="0" @click="count++" @keydown.enter="count++"
      ><CardContent
        ><h3>Open project</h3>
        <p>Activate this interactive card.</p></CardContent
      ></Card
    ><output>Opened {{ count }} times</output></VStack
  >
</template>

```

## Example: padded

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/card/vue/padded.vue

```vue
<script setup lang="ts">
import { Card, CardContent, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Card
      ><CardContent
        ><h3>Standard padding</h3>
        <p>CardContent applies consistent internal spacing.</p></CardContent
      ></Card
    ><Card
      ><CardContent style="padding: 32px"
        ><h3>Custom content spacing</h3>
        <p>Override padding for a more spacious surface.</p></CardContent
      ></Card
    ></VStack
  >
</template>

```

## Example: variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/card/vue/variants.vue

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "minerva-design/vue";
const variants = ["default", "outline", "elevated", "filled", "ghost"] as const;
</script>
<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
      width: 100%;
    "
  >
    <Card v-for="variant in variants" :key="variant" :variant="variant"
      ><CardHeader
        ><CardTitle>{{ variant }}</CardTitle></CardHeader
      ><CardContent>variant="{{ variant }}"</CardContent></Card
    >
  </div>
</template>

```
