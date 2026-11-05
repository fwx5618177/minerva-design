# Divider

A thin line that separates content, horizontally or vertically, optionally with text.

Package: minerva-design@1.21.1

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Divider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Divider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "type": "DividerVariant",
    "default": "\"solid\"",
    "required": false,
    "description": "Line style",
    "typeText": "DividerVariant"
  },
  {
    "name": "orientation",
    "type": "DividerOrientation",
    "default": "\"horizontal\"",
    "required": false,
    "description": "Divider direction",
    "typeText": "DividerOrientation"
  },
  {
    "name": "thickness",
    "type": "number",
    "default": "1",
    "required": false,
    "description": "Line thickness in pixels",
    "typeText": "number"
  },
  {
    "name": "length",
    "type": "string | number",
    "required": false,
    "description": "Length of the line (width when horizontal, height when vertical)",
    "typeText": "string | number"
  },
  {
    "name": "spacing",
    "type": "number",
    "default": "16",
    "required": false,
    "description": "Margin around the divider in pixels (top/bottom when horizontal, left/right when vertical)",
    "typeText": "number"
  },
  {
    "name": "textAlign",
    "type": "DividerTextAlign",
    "default": "\"center\"",
    "required": false,
    "description": "Position of the text",
    "typeText": "DividerTextAlign"
  },
  {
    "name": "elevation",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Adds a subtle shadow",
    "typeText": "boolean"
  },
  {
    "name": "flexItem",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Vertical divider inside a flex container: stretches to the container\nheight (align-self: stretch) instead of the 1em inline height",
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
    "description": "Text rendered inside a horizontal divider (ignored when vertical)",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:Divider": {
    "kind": "cssVars",
    "source": "react/src/components/Divider",
    "vars": [
      {
        "name": "--divider-color",
        "description": "Line color (defaults to --border-color)"
      },
      {
        "name": "--divider-thickness",
        "description": "Line thickness"
      },
      {
        "name": "--divider-spacing",
        "description": "Inline margin around a vertical divider"
      },
      {
        "name": "--divider-text-gap",
        "description": "Space between the text and the lines"
      },
      {
        "name": "--divider-text-font-size",
        "description": "Font size of the text"
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

### apps/docs/src/docs/pages/divider/vue/basic.vue

```vue
<script setup lang="ts">
import { Divider } from "minerva-design/vue";
</script>
<template>
  <div style="width: 100%">
    <p>Content above the divider.</p>
    <Divider />
    <p>Content below the divider.</p>
  </div>
</template>

```

## Example: custom-style

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/vue/custom-style.vue

```vue
<script setup lang="ts">
import { Divider } from "minerva-design/vue";
</script>
<template>
  <div style="width: 100%">
    <Divider style="--divider-color: #7c3aed" :thickness="2"></Divider
    ><Divider
      style="--divider-color: #16a34a"
      :thickness="3"
      variant="dashed"
      length="50%"
    ></Divider
    ><Divider style="--divider-color: #7c3aed">Section</Divider
    ><Divider :spacing="32" elevation></Divider>
  </div>
</template>

```

## Example: flex-item

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/vue/flex-item.vue

```vue
<script setup lang="ts">
import { Divider } from "minerva-design/vue";
</script>
<template>
  <div style="display: flex; align-items: center; gap: 12px; height: 48px">
    <span>Edit</span
    ><Divider orientation="vertical" flex-item :spacing="0"></Divider
    ><span>Share</span
    ><Divider orientation="vertical" flex-item :spacing="0"></Divider
    ><span>Delete</span>
  </div>
</template>

```

## Example: variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/vue/variants.vue

```vue
<script setup lang="ts">
import { Divider } from "minerva-design/vue";
</script>
<template>
  <div style="width: 100%">
    <Divider variant="solid"></Divider><Divider variant="dashed"></Divider
    ><Divider variant="dotted"></Divider>
  </div>
</template>

```

## Example: vertical

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/vue/vertical.vue

```vue
<script setup lang="ts">
import { Divider } from "minerva-design/vue";
</script>
<template>
  <div style="display: flex; align-items: center">
    <span>Home</span
    ><Divider orientation="vertical" :length="16" :spacing="12" /><span
      >Products</span
    ><Divider orientation="vertical" :length="16" :spacing="12" /><span
      >About</span
    >
  </div>
</template>

```

## Example: with-text

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/vue/with-text.vue

```vue
<script setup lang="ts">
import { Divider } from "minerva-design/vue";
</script>
<template>
  <div style="width: 100%">
    <Divider text-align="left">Left</Divider><Divider>Center</Divider
    ><Divider text-align="right" variant="dashed" :thickness="3">Right</Divider>
  </div>
</template>

```
