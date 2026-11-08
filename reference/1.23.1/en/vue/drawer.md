# Drawer

A panel that slides in from an edge of the viewport for secondary tasks such as filters or details. Behaves like a modal: focus trap, Escape, backdrop click and focus return.

Package: minerva-design@1.23.1

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Drawer

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Drawer"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "type": "boolean",
    "required": false,
    "description": "Controlled open state (`v-model:open`); leave `undefined` for uncontrolled.",
    "typeText": "boolean"
  },
  {
    "name": "defaultOpen",
    "type": "boolean",
    "required": false,
    "description": "Initial open state while uncontrolled",
    "typeText": "boolean"
  },
  {
    "name": "side",
    "type": "DrawerSide",
    "default": "\"right\"",
    "required": false,
    "description": "Edge the panel slides in from",
    "typeText": "DrawerSide"
  },
  {
    "name": "size",
    "type": "DrawerSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Size preset",
    "typeText": "DrawerSize"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Title rendered as the drawer's accessible name (or the `title` slot).",
    "typeText": "string"
  },
  {
    "name": "description",
    "type": "string",
    "required": false,
    "description": "Description rendered below the title (or the `description` slot).",
    "typeText": "string"
  },
  {
    "name": "hideCloseButton",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Hides the close (×) button",
    "typeText": "boolean"
  },
  {
    "name": "closeLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the close button; defaults to the localized \"Close\".",
    "typeText": "string"
  },
  {
    "name": "hiddenDescription",
    "type": "string",
    "required": false,
    "description": "Text of the visually hidden description rendered when `description` is\nnot set; defaults to the localized \"Drawer content\".",
    "typeText": "string"
  }
]
```

### events

```json
[
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
    "description": "Content: usually `DrawerBody` + `DrawerFooter`",
    "typeText": "any"
  },
  {
    "name": "trigger",
    "type": "any",
    "description": "Element opening the drawer (its single child gets the trigger props)",
    "typeText": "any"
  },
  {
    "name": "title",
    "type": "any",
    "typeText": "any"
  },
  {
    "name": "description",
    "type": "any",
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

## DrawerBody

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DrawerBody"
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

## DrawerClose

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DrawerClose"
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
    "description": "Merges the behaviour onto the single child element instead of rendering a `<button>`",
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
    "typeText": "any"
  }
]
```

## DrawerContent

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DrawerContent"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "role",
    "type": "\"dialog\" | \"alertdialog\"",
    "default": "\"dialog\"",
    "required": false,
    "description": "ARIA role of the panel",
    "typeText": "\"dialog\" | \"alertdialog\""
  },
  {
    "name": "forceMount",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Keeps the panel mounted while closed (`data-state=\"closed\"`), e.g. for\nanimation libraries",
    "typeText": "boolean"
  },
  {
    "name": "side",
    "type": "DrawerSide",
    "default": "\"right\"",
    "required": false,
    "description": "Edge the panel slides in from",
    "typeText": "DrawerSide"
  },
  {
    "name": "size",
    "type": "DrawerSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Size preset",
    "typeText": "DrawerSize"
  },
  {
    "name": "hideCloseButton",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Hides the close (×) button",
    "typeText": "boolean"
  },
  {
    "name": "closeLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the close button; defaults to the localized \"Close\".",
    "typeText": "string"
  },
  {
    "name": "hiddenDescription",
    "type": "string",
    "required": false,
    "description": "Text of the visually hidden description rendered when `description` is\nnot set; defaults to the localized \"Drawer content\".",
    "typeText": "string"
  },
  {
    "name": "description",
    "type": "string",
    "required": false,
    "description": "Visible description below the title (or the `description` slot). Without\nit a visually hidden generic description is rendered.",
    "typeText": "string"
  },
  {
    "name": "overlayClass",
    "type": "ClassValue",
    "required": false,
    "description": "Class of the overlay (backdrop).",
    "typeText": "ClassValue"
  }
]
```

### events

```json
[
  {
    "name": "openAutoFocus",
    "type": "[event: Event]",
    "typeText": "[event: Event]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Event",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "closeAutoFocus",
    "type": "[event: Event]",
    "typeText": "[event: Event]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Event",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "escapeKeyDown",
    "type": "[event: KeyboardEvent]",
    "typeText": "[event: KeyboardEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "KeyboardEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointerDownOutside",
    "type": "[event: PointerEvent]",
    "typeText": "[event: PointerEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "PointerEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "interactOutside",
    "type": "[event: PointerEvent | FocusEvent]",
    "typeText": "[event: PointerEvent | FocusEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "PointerEvent | FocusEvent",
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
    "typeText": "any"
  },
  {
    "name": "description",
    "type": "any",
    "description": "Visible description (instead of the `description` prop)",
    "typeText": "any"
  }
]
```

## DrawerFooter

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DrawerFooter"
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

## DrawerHeader

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DrawerHeader"
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

## DrawerRoot

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DrawerRoot"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "type": "boolean",
    "required": false,
    "description": "Controlled open state (`v-model:open`); leave `undefined` for uncontrolled.",
    "typeText": "boolean"
  },
  {
    "name": "defaultOpen",
    "type": "boolean",
    "required": false,
    "description": "Initial open state while uncontrolled",
    "typeText": "boolean"
  },
  {
    "name": "modal",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Modal mode: renders the overlay, traps focus, locks page scrolling and\nblocks / hides the page behind. Non-modal drawers close on outside click /\nfocus instead.",
    "typeText": "boolean"
  }
]
```

### events

```json
[
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

## DrawerTrigger

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DrawerTrigger"
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
    "description": "Merges the behaviour onto the single child element instead of rendering a `<button>`",
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
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:Drawer": {
    "kind": "cssVars",
    "source": "react/src/components/Drawer",
    "vars": [
      {
        "name": "--drawer-width",
        "description": "Width of a left / right drawer (every size; defaults to the width of the size)"
      },
      {
        "name": "--drawer-height",
        "description": "Height of a top / bottom drawer (every size; defaults to the height of the size)"
      },
      {
        "name": "--drawer-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--drawer-radius",
        "description": "Corner radius of the inner edge (defaults to --radius-lg)"
      },
      {
        "name": "--drawer-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--drawer-background",
        "description": "Background of the panel"
      },
      {
        "name": "--drawer-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
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

### apps/docs/src/docs/pages/drawer/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Drawer, DrawerBody, DrawerFooter, Button } from "minerva-design/vue";
const open = ref(false);
</script>
<template>
  <Button @click="open = true">Open drawer</Button
  ><Drawer
    v-model:open="open"
    title="Project details"
    description="Review your project settings"
    ><DrawerBody><p>Everything you need to manage this project.</p></DrawerBody
    ><DrawerFooter
      ><Button @click="open = false">Done</Button></DrawerFooter
    ></Drawer
  >
</template>

```

## Example: non-modal

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/drawer/vue/non-modal.vue

```vue
<script setup lang="ts">
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerClose,
  Button,
} from "minerva-design/vue";
</script>
<template>
  <DrawerRoot :modal="false"
    ><DrawerTrigger as-child
      ><Button variant="outline">Open non-modal panel</Button></DrawerTrigger
    ><DrawerContent description="The rest of the page stays interactive"
      ><template #title>Quick reference</template
      ><DrawerBody
        ><p>Keep working while this reference stays open.</p>
        <DrawerClose>Close panel</DrawerClose></DrawerBody
      ></DrawerContent
    ></DrawerRoot
  >
</template>

```

## Example: sides

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/drawer/vue/sides.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Drawer, DrawerBody, Button, HStack } from "minerva-design/vue";
import type { DrawerSide } from "minerva-design/vue";
const sides: DrawerSide[] = ["left", "right", "top", "bottom"];
const side = ref<DrawerSide>("right");
const open = ref(false);
</script>
<template>
  <HStack :gap="3" wrap
    ><Button
      v-for="edge in sides"
      :key="edge"
      variant="outline"
      @click="
        side = edge;
        open = true;
      "
      >{{ edge }}</Button
    ></HStack
  ><Drawer
    v-model:open="open"
    :side="side"
    size="small"
    :title="`${side} drawer`"
    ><DrawerBody
      ><p>Choose the edge that fits your workflow.</p></DrawerBody
    ></Drawer
  >
</template>

```
