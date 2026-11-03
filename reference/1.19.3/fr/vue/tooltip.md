# Tooltip

Une courte étiquette de texte affichée quand l'utilisateur survole ou met le focus sur un élément. Près des bords de la fenêtre, elle bascule et se décale pour rester visible.

Package: minerva-design@1.19.3

Renderer: vue

Locale: fr

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

## Tooltip

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Tooltip"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "content",
    "type": "string",
    "required": false,
    "description": "Text displayed inside the tooltip (or the `content` slot)",
    "typeText": "string"
  },
  {
    "name": "open",
    "type": "boolean",
    "required": false,
    "description": "Whether the tooltip is shown (controlled, `v-model:open`)",
    "typeText": "boolean"
  },
  {
    "name": "defaultOpen",
    "type": "boolean",
    "required": false,
    "description": "Initial open state (uncontrolled)",
    "typeText": "boolean"
  },
  {
    "name": "placement",
    "type": "TooltipPlacement",
    "default": "\"top\"",
    "required": false,
    "description": "Placement relative to the trigger",
    "typeText": "TooltipPlacement"
  },
  {
    "name": "color",
    "type": "\"info\" | \"neutral\" | \"success\" | \"warning\" | \"danger\"",
    "default": "\"neutral\"",
    "required": false,
    "description": "Semantic color of the tooltip. With the `glass` variant the color only\ntints the border (neutral keeps the plain frosted surface)",
    "typeText": "\"info\" | \"neutral\" | \"success\" | \"warning\" | \"danger\""
  },
  {
    "name": "variant",
    "type": "TooltipVariant",
    "default": "\"solid\"",
    "required": false,
    "description": "Visual style: `solid` (filled; neutral is the inverted contrasting\nsurface), `subtle` (tinted surface with a border) or `glass` (frosted\nelevated surface)",
    "typeText": "TooltipVariant"
  },
  {
    "name": "shape",
    "type": "TooltipShape",
    "default": "\"default\"",
    "required": false,
    "description": "Shape of the tooltip",
    "typeText": "TooltipShape"
  },
  {
    "name": "animation",
    "type": "TooltipAnimation",
    "default": "\"fade\"",
    "required": false,
    "description": "Show / hide animation",
    "typeText": "TooltipAnimation"
  },
  {
    "name": "enterDelay",
    "type": "number",
    "required": false,
    "description": "Delay before showing on hover, in milliseconds",
    "typeText": "number"
  },
  {
    "name": "leaveDelay",
    "type": "number",
    "required": false,
    "description": "Delay before hiding on mouse leave, in milliseconds",
    "typeText": "number"
  },
  {
    "name": "offset",
    "type": "[number, number]",
    "required": false,
    "description": "Offset as [x, y] in pixels. For top/bottom placements `y` is the gap to\nthe trigger and `x` shifts along it; for left/right placements `x` is the\ngap and `y` shifts along it. Without it the tooltip sits 8px away.",
    "typeText": "[number, number]"
  },
  {
    "name": "followCursor",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Makes the tooltip follow the mouse cursor",
    "typeText": "boolean"
  },
  {
    "name": "zIndex",
    "type": "number",
    "default": "1500",
    "required": false,
    "description": "z-index of the tooltip",
    "typeText": "number"
  },
  {
    "name": "arrow",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows an arrow pointing at the trigger",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the tooltip",
    "typeText": "boolean"
  },
  {
    "name": "className",
    "type": "string",
    "default": "\"\"",
    "required": false,
    "description": "Additional class name of the trigger wrapper (`class` works too)",
    "typeText": "string"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the tooltip element (`aria-label`)",
    "typeText": "string"
  },
  {
    "name": "asChild",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Attaches the hover / focus handlers, the ref and `class` directly to the\nsingle child element instead of wrapping it in a `<div>` (keeps flex\nand grid layouts intact).",
    "typeText": "boolean"
  },
  {
    "name": "contentClassName",
    "type": "string",
    "required": false,
    "description": "Additional class name of the tooltip (floating) element. To customize\nthe colors, set the `--tooltip-bg` (background, gradients allowed) and\n`--tooltip-color` (text) custom properties on it",
    "typeText": "string"
  },
  {
    "name": "contentRef",
    "type": "Ref<HTMLDivElement | null, HTMLDivElement | null> | ((element: HTMLDivElement | null) => void)",
    "required": false,
    "description": "Ref to the tooltip (floating) element, set while it is shown: a ref\nobject or a callback (also exposed as `contentElement`)",
    "typeText": "Ref<HTMLDivElement | null, HTMLDivElement | null> | ((element: HTMLDivElement | null) => void)"
  }
]
```

### events

```json
[
  {
    "name": "close",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "open",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "update:open",
    "type": "[open: boolean]",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "type": "[open: boolean]",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
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
    "description": "The element that triggers the tooltip; prefer a focusable element",
    "typeText": "any"
  },
  {
    "name": "content",
    "type": "any",
    "description": "Content displayed inside the tooltip (the `content` prop)",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "open",
    "event": "update:open",
    "syntax": "v-model:open"
  }
]
```

## TooltipProvider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TooltipProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "enterDelay",
    "type": "number",
    "required": false,
    "description": "Default delay before showing on hover, in milliseconds, for every Tooltip\ninside that does not set `enterDelay`",
    "typeText": "number"
  },
  {
    "name": "leaveDelay",
    "type": "number",
    "required": false,
    "description": "Default delay before hiding on mouse leave, in milliseconds, for every\nTooltip inside that does not set `leaveDelay`",
    "typeText": "number"
  },
  {
    "name": "skipDelay",
    "type": "number",
    "default": "300",
    "required": false,
    "description": "When another tooltip of the provider closed less than this many\nmilliseconds ago, the next one opens without waiting for its enter delay",
    "typeText": "number"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Content containing tooltips",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:Tooltip": {
    "kind": "cssVars",
    "source": "react/src/components/Tooltip",
    "vars": [
      {
        "name": "--tooltip-max-width",
        "description": "Maximum width (capped by the viewport)"
      },
      {
        "name": "--tooltip-padding",
        "description": "Padding (every shape)"
      },
      {
        "name": "--tooltip-radius",
        "description": "Corner radius (defaults to the radius of the shape)"
      },
      {
        "name": "--tooltip-font-size",
        "description": "Font size"
      },
      {
        "name": "--tooltip-bg",
        "description": "Background (gradients allowed; every variant)"
      },
      {
        "name": "--tooltip-color",
        "description": "Text color (every variant)"
      },
      {
        "name": "--tooltip-shadow",
        "description": "Shadow (defaults to --shadow-md, --shadow-lg for the glass variant)"
      },
      {
        "name": "--tooltip-z-index",
        "description": "Stacking order (defaults to --z-popover)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: animations

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/animations.vue

```vue
<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
const values = [
  "fade",
  "scale",
  "shift-away",
  "shift-toward",
  "perspective",
] as const;
</script>
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; padding: 24px">
    <Tooltip
      v-for="value in values"
      :key="value"
      :animation="value"
      :content="value"
      arrow
      ><Button variant="outline">{{ value }}</Button></Tooltip
    >
  </div>
</template>

```

## Example: as-child

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/as-child.vue

```vue
<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
</script>
<template>
  <div style="display: flex; gap: 12px">
    <Tooltip content="Handlers attach to the button itself" as-child
      ><Button variant="outline">No wrapper</Button></Tooltip
    ><Tooltip
      content="Frosted surface"
      as-child
      variant="glass"
      placement="bottom-start"
      ><Button variant="outline">Glass trigger</Button></Tooltip
    >
  </div>
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/basic.vue

```vue
<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
</script>
<template>
  <Tooltip content="Save your current work" arrow
    ><Button>Hover or focus me</Button></Tooltip
  >
</template>

```

## Example: colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/colors.vue

```vue
<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
const values = ["neutral", "info", "success", "warning", "danger"] as const;
</script>
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; padding: 24px">
    <Tooltip
      v-for="value in values"
      :key="value"
      :color="value"
      :content="value"
      arrow
      ><Button variant="outline">{{ value }}</Button></Tooltip
    >
  </div>
</template>

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/controlled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Tooltip, Button, HStack } from "minerva-design/vue";
const open = ref(false);
</script>
<template>
  <HStack :gap="3" wrap
    ><Button @click="open = !open">Toggle tooltip</Button
    ><Tooltip v-model:open="open" content="Controlled by Vue state"
      ><Button variant="outline">Anchor</Button></Tooltip
    ><output>{{ open ? "Open" : "Closed" }}</output></HStack
  >
</template>

```

## Example: custom-colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/custom-colors.vue

```vue
<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
</script>
<template>
  <div style="display: flex; gap: 12px">
    <Tooltip content="Brand color" content-class-name="vue-brand-tooltip" arrow
      ><Button variant="outline">Brand</Button></Tooltip
    ><Tooltip
      content="Gradient surface"
      content-class-name="vue-gradient-tooltip"
      arrow
      ><Button variant="outline">Gradient</Button></Tooltip
    ><Tooltip content="Twenty pixel gap" :offset="[0, 20]"
      ><Button variant="outline">Offset</Button></Tooltip
    >
  </div>
</template>
<style>
.vue-brand-tooltip {
  --tooltip-bg: #7c3aed;
  --tooltip-color: #fff;
}
.vue-gradient-tooltip {
  --tooltip-bg: linear-gradient(135deg, #ec4899, #f59e0b);
  --tooltip-color: #fff;
}
</style>

```

## Example: delays

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/delays.vue

```vue
<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
</script>
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <Tooltip content="Appears immediately" :enter-delay="0"
      ><Button variant="outline">Immediate</Button></Tooltip
    ><Tooltip
      content="Waits before opening and stays briefly"
      :enter-delay="800"
      :leave-delay="500"
      ><Button variant="outline">800ms enter / 500ms leave</Button></Tooltip
    >
  </div>
</template>

```

## Example: events

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/events.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Tooltip, Button } from "minerva-design/vue";
const opened = ref(0);
const closed = ref(0);
</script>
<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <Tooltip content="Press Escape to close" @open="opened++" @close="closed++"
      ><Button>Hover or focus me</Button></Tooltip
    ><output>Opened: {{ opened }} · Closed: {{ closed }}</output>
  </div>
</template>

```

## Example: follow-cursor

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/follow-cursor.vue

```vue
<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
</script>
<template>
  <Tooltip content="I follow your cursor" follow-cursor :enter-delay="0"
    ><Button
      variant="outline"
      style="width: 280px; height: 100px; border-style: dashed"
      >Move the mouse here</Button
    ></Tooltip
  >
</template>

```

## Example: placements

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/placements.vue

```vue
<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
const values = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "right",
] as const;
</script>
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; padding: 24px">
    <Tooltip
      v-for="value in values"
      :key="value"
      :placement="value"
      :content="value"
      arrow
      ><Button variant="outline">{{ value }}</Button></Tooltip
    >
  </div>
</template>

```

## Example: provider

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/provider.vue

```vue
<script setup lang="ts">
import { TooltipProvider, Tooltip, Button, HStack } from "minerva-design/vue";
</script>
<template>
  <TooltipProvider :enter-delay="500" :skip-delay="400"
    ><HStack :gap="3"
      ><Tooltip content="First action"><Button>First</Button></Tooltip
      ><Tooltip content="Second action"><Button>Second</Button></Tooltip
      ><Tooltip content="Third action"><Button>Third</Button></Tooltip></HStack
    ></TooltipProvider
  >
</template>

```

## Example: shapes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/shapes.vue

```vue
<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
const values = ["default", "rounded", "thought", "square"] as const;
</script>
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; padding: 24px">
    <Tooltip
      v-for="value in values"
      :key="value"
      :shape="value"
      :content="value"
      arrow
      ><Button variant="outline">{{ value }}</Button></Tooltip
    >
  </div>
</template>

```

## Example: styles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/styles.vue

```vue
<script setup lang="ts">
import { Tooltip, Button, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Tooltip
      content="Solid success"
      color="success"
      variant="solid"
      shape="rounded"
      ><Button color="success">Solid</Button></Tooltip
    ><Tooltip content="Subtle warning" color="warning" variant="subtle" arrow
      ><Button variant="outline">Subtle</Button></Tooltip
    ><Tooltip content="Glass surface" variant="glass" animation="scale"
      ><Button variant="ghost">Glass</Button></Tooltip
    ></HStack
  >
</template>

```

## Example: variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/vue/variants.vue

```vue
<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
const values = ["solid", "subtle", "glass"] as const;
</script>
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; padding: 24px">
    <Tooltip
      v-for="value in values"
      :key="value"
      :variant="value"
      :content="value"
      arrow
      ><Button variant="outline">{{ value }}</Button></Tooltip
    >
  </div>
</template>

```
