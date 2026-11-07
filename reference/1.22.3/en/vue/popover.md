# Popover

A click-triggered floating panel for interactive content such as filters or account menus, anchored to its trigger. Unlike Tooltip it holds focusable content and manages focus, Escape and outside clicks itself; inside a Modal it closes first.

Package: minerva-design@1.22.3

Renderer: vue

Locale: en

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

## Popover

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Popover"
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
    "default": "false",
    "required": false,
    "description": "Modal mode: traps focus inside the panel, locks page scrolling, hides the\nrest of the page from assistive technology and blocks outside pointer\ninteraction (an outside click still closes it)",
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
    "description": "`PopoverTrigger` / `PopoverAnchor` and `PopoverContent`",
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

## PopoverAnchor

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "PopoverAnchor"
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
    "description": "Merges onto the single child element instead of rendering a `<div>`",
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

## PopoverClose

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "PopoverClose"
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

## PopoverContent

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "PopoverContent"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "side",
    "type": "PopoverSide",
    "default": "\"bottom\"",
    "required": false,
    "description": "Preferred side; flips when there is not enough room",
    "typeText": "PopoverSide"
  },
  {
    "name": "align",
    "type": "PopoverAlign",
    "default": "\"center\"",
    "required": false,
    "description": "Alignment along the trigger",
    "typeText": "PopoverAlign"
  },
  {
    "name": "sideOffset",
    "type": "number",
    "default": "6",
    "required": false,
    "description": "Gap to the trigger in pixels",
    "typeText": "number"
  },
  {
    "name": "alignOffset",
    "type": "number",
    "default": "0",
    "required": false,
    "description": "Skid along the trigger in pixels (positive = towards the end)",
    "typeText": "number"
  },
  {
    "name": "collisionPadding",
    "type": "number",
    "default": "8",
    "required": false,
    "description": "Minimum distance kept to the viewport edges in pixels when flipping,\nshifting and sizing the panel",
    "typeText": "number"
  },
  {
    "name": "matchAnchorWidth",
    "type": "false | \"min\" | \"exact\"",
    "default": "false",
    "required": false,
    "description": "Sizes the panel after the trigger / anchor width: `\"min\"` at least as\nwide, `\"exact\"` exactly as wide (also caps the width to the viewport)",
    "typeText": "false | \"min\" | \"exact\""
  },
  {
    "name": "arrow",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Renders an arrow pointing at the trigger",
    "typeText": "boolean"
  },
  {
    "name": "portal",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Renders the panel into a portal (the theme-scoped container of a nested\n`ConfigProvider`, else `document.body`)",
    "typeText": "boolean"
  },
  {
    "name": "forceMount",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Keeps the panel mounted while closed (`data-state=\"closed\"`), e.g. for\nanimation libraries",
    "typeText": "boolean"
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
  },
  {
    "name": "focusOutside",
    "type": "[event: FocusEvent]",
    "typeText": "[event: FocusEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "FocusEvent",
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

## PopoverTrigger

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "PopoverTrigger"
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
  "css:Popover": {
    "kind": "cssVars",
    "source": "react/src/components/Popover",
    "vars": [
      {
        "name": "--popover-min-width",
        "description": "Minimum width of the panel"
      },
      {
        "name": "--popover-max-width",
        "description": "Maximum width of the panel"
      },
      {
        "name": "--popover-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--popover-radius",
        "description": "Corner radius of the panel (defaults to --radius-lg)"
      },
      {
        "name": "--popover-background",
        "description": "Background of the panel and its arrow"
      },
      {
        "name": "--popover-border-color",
        "description": "Border color of the panel and its arrow"
      },
      {
        "name": "--popover-shadow",
        "description": "Shadow of the panel (defaults to --shadow-lg, --shadow-xl in dark themes)"
      },
      {
        "name": "--popover-z-index",
        "description": "Stacking order of the panel (defaults to --z-popover)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: anchor

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/popover/vue/anchor.vue

```vue
<script setup lang="ts">
import {
  Popover,
  PopoverAnchor,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
  VStack,
} from "minerva-design/vue";
</script>
<template>
  <Popover
    ><VStack :gap="3"
      ><PopoverAnchor
        ><Input
          aria-label="Search query"
          placeholder="Search projects" /></PopoverAnchor
      ><PopoverTrigger as-child
        ><Button>Show search help</Button></PopoverTrigger
      ></VStack
    ><PopoverContent match-anchor-width="exact"
      ><p>
        The panel is positioned against the input, independently of its trigger.
      </p></PopoverContent
    ></Popover
  >
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/popover/vue/basic.vue

```vue
<script setup lang="ts">
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from "minerva-design/vue";
</script>
<template>
  <Popover
    ><PopoverTrigger as-child><Button>Open popover</Button></PopoverTrigger
    ><PopoverContent
      ><p>Review the changes before continuing.</p>
      <PopoverClose as-child
        ><Button>Got it</Button></PopoverClose
      ></PopoverContent
    ></Popover
  >
</template>

```

## Example: placement

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/popover/vue/placement.vue

```vue
<script setup lang="ts">
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  HStack,
} from "minerva-design/vue";
const sides = ["top", "right", "bottom", "left"] as const;
</script>
<template>
  <HStack :gap="3" wrap
    ><Popover v-for="side in sides" :key="side"
      ><PopoverTrigger as-child
        ><Button variant="outline">{{ side }}</Button></PopoverTrigger
      ><PopoverContent :side="side" align="start" arrow
        >{{ side }} placement</PopoverContent
      ></Popover
    ></HStack
  >
</template>

```
