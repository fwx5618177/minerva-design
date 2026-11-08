# IconButton 图标按钮

仅显示图标的紧凑按钮。设置 pressed / defaultPressed 后成为切换按钮（收藏、点赞、静音等）。

Package: minerva-design@1.23.1

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## IconButton

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "IconButton"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Accessible name of the button. Takes precedence over aria-label",
    "typeText": "string"
  },
  {
    "name": "tooltip",
    "type": "Partial<TooltipProps>",
    "required": false,
    "description": "Tooltip options; defaults to the accessible label.",
    "typeText": "Partial<TooltipProps>"
  },
  {
    "name": "showTooltip",
    "type": "boolean",
    "required": false,
    "description": "Show the tooltip (defaults to true when a label is supplied).",
    "typeText": "boolean"
  },
  {
    "name": "color",
    "type": "ColorScheme",
    "default": "\"neutral\"",
    "required": false,
    "description": "Semantic color of the button",
    "typeText": "ColorScheme"
  },
  {
    "name": "variant",
    "type": "\"outline\" | \"solid\" | \"ghost\"",
    "default": "\"ghost\"",
    "required": false,
    "description": "Visual style: `ghost` (transparent until hovered), `solid` (filled with\nthe color) or `outline` (bordered)",
    "typeText": "\"outline\" | \"solid\" | \"ghost\""
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\" | \"xsmall\"",
    "default": "\"medium\"",
    "required": false,
    "description": "Button size",
    "typeText": "\"medium\" | \"small\" | \"large\" | \"xsmall\""
  },
  {
    "name": "shape",
    "type": "\"circle\" | \"square\"",
    "default": "\"circle\"",
    "required": false,
    "description": "Button shape",
    "typeText": "\"circle\" | \"square\""
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the button and removes it from the tab order",
    "typeText": "boolean"
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Replaces the icon with a spinner and ignores activation (click, Enter,\nSpace, form submission) while staying focusable: exposed as\naria-busy + aria-disabled instead of the native disabled attribute",
    "typeText": "boolean"
  },
  {
    "name": "pressed",
    "type": "boolean",
    "required": false,
    "description": "Pressed state of a toggle button (controlled, `v-model:pressed`).\nSetting pressed, defaultPressed or a `pressedChange` / `update:pressed`\nlistener makes the button a toggle: clicking flips the state and it is\nexposed as aria-pressed",
    "typeText": "boolean"
  },
  {
    "name": "defaultPressed",
    "type": "boolean",
    "required": false,
    "description": "Initial pressed state of an uncontrolled toggle button",
    "typeText": "boolean"
  }
]
```

### events

```json
[
  {
    "name": "click",
    "type": "[event: MouseEvent]",
    "typeText": "[event: MouseEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "MouseEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:pressed",
    "type": "[pressed: boolean]",
    "typeText": "[pressed: boolean]",
    "parameters": [
      {
        "name": "pressed",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pressedChange",
    "type": "[pressed: boolean]",
    "typeText": "[pressed: boolean]",
    "parameters": [
      {
        "name": "pressed",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "The icon",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "pressed",
    "event": "update:pressed",
    "syntax": "v-model:pressed"
  }
]
```

## CSS variables

```json
{
  "css:IconButton": {
    "kind": "cssVars",
    "source": "react/src/components/IconButton",
    "vars": [
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
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

### apps/docs/src/docs/pages/icon-button/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { HStack, IconButton } from "minerva-design/vue";
const count = ref(0);
</script>
<template>
  <HStack :gap="3" align="center" wrap
    ><IconButton label="Add" @click="count++"
      ><template #icon>+</template></IconButton
    ><IconButton label="Settings"><template #icon>⚙</template></IconButton
    ><IconButton label="Delete"><template #icon>⌫</template></IconButton
    ><output aria-live="polite">{{
      count === 0 ? "Nothing added yet" : `Added ${count} item(s)`
    }}</output></HStack
  >
</template>

```

## Example: sizes-shapes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/vue/sizes-shapes.vue

```vue
<script setup lang="ts">
import { IconButton, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><IconButton label="Small add" size="small" shape="circle">+</IconButton
    ><IconButton label="Medium edit" size="medium" shape="square">✎</IconButton
    ><IconButton label="Large favorite" size="large" variant="solid"
      >★</IconButton
    ></HStack
  >
</template>

```

## Example: states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/vue/states.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { IconButton, HStack } from "minerva-design/vue";
const pinned = ref(false);
</script>
<template>
  <HStack :gap="3" wrap
    ><IconButton label="Saving" loading>✓</IconButton
    ><IconButton label="Unavailable" disabled>×</IconButton
    ><IconButton v-model:pressed="pinned" label="Pin item">★</IconButton
    ><output>{{ pinned ? "Pinned" : "Unpinned" }}</output></HStack
  >
</template>

```

## Example: toggle

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/vue/toggle.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { HStack, IconButton } from "minerva-design/vue";
const liked = ref(false);
</script>
<template>
  <HStack :gap="3" align="center" wrap
    ><IconButton v-model:pressed="liked" label="Like" color="danger"
      ><template #icon>♥</template></IconButton
    ><span>{{ liked ? "Liked" : "Not liked yet" }}</span
    ><IconButton label="Bookmark" default-pressed
      ><template #icon>◆</template></IconButton
    ><IconButton label="Mute" shape="square" :default-pressed="false"
      ><template #icon>♩</template></IconButton
    ></HStack
  >
</template>

```
