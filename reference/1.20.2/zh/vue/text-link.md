# TextLink 文本链接

带样式的原生链接，适用于行内链接、低调导航和设置列表行；asChild 可为路由链接加样式而不嵌套 a 标签。

Package: minerva-design@1.20.2

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## TextLink

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TextLink"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asChild",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Merges the link styling onto its single child element (e.g. a\n`<RouterLink>`) instead of rendering an extra `<a>`",
    "typeText": "boolean"
  },
  {
    "name": "variant",
    "type": "TextLinkVariant",
    "default": "\"default\"",
    "required": false,
    "description": "default: underlined inline link; subtle: quiet link with a trailing chevron;\naction: full-width row link with a bottom rule (settings lists, menus)",
    "typeText": "TextLinkVariant"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Link content (with `asChild`: the single link element)",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:TextLink": {
    "kind": "cssVars",
    "source": "react/src/components/TextLink",
    "vars": [
      {
        "name": "--text-link-color",
        "description": "Color of the default variant (falls back to --link-color, then --primary-color)"
      },
      {
        "name": "--text-link-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--text-link-text-decoration",
        "description": "Text decoration of the default variant (default: underline)"
      },
      {
        "name": "--text-link-underline-offset",
        "description": "Distance between the text and its underline"
      },
      {
        "name": "--text-link-action-min-height",
        "description": "Minimum height of the action variant"
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

### apps/docs/src/docs/pages/text-link/vue/basic.vue

```vue
<script setup lang="ts">
import { TextLink } from "minerva-design/vue";
</script>
<template>
  <TextLink href="https://example.com">Visit example.com</TextLink>
</template>

```

## Example: styling

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/text-link/vue/styling.vue

```vue
<script setup lang="ts">
import { TextLink, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><TextLink href="#accent" style="font-weight: 700">Emphasized link</TextLink
    ><TextLink
      href="https://example.com"
      target="_blank"
      rel="noopener noreferrer"
      >External page ↗</TextLink
    ></VStack
  >
</template>

```

## Example: variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/text-link/vue/variants.vue

```vue
<script setup lang="ts">
import { TextLink, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><TextLink href="#default">Default link</TextLink
    ><TextLink variant="subtle" href="#subtle">Subtle link</TextLink
    ><TextLink variant="action" href="#action">View all →</TextLink></HStack
  >
</template>

```
