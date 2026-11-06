# Menu

Un menu d'actions ouvert depuis un bouton (Menu) ou par clic droit (ContextMenu) : icônes, raccourcis, séparateurs, groupes, éléments à cocher, groupes radio, sous-menus, recherche à la frappe et clavier complet (Entrée, Espace ou Flèche bas l'ouvrent sur le premier élément, Flèche haut sur le dernier ; les flèches bouclent et ignorent les éléments désactivés, Début / Fin, Tab le ferme, Échap rend le focus au déclencheur). Pour choisir une valeur dans une liste, utilisez Select.

Package: minerva-design@1.21.1

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## ContextMenu

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ContextMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "type": "MenuEntry[]",
    "required": true,
    "description": "Entries of the menu",
    "typeText": "MenuEntry[]"
  },
  {
    "name": "closeOnSelect",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Whether selecting an action closes the menu (checkbox and radio items keep it open unless their entry sets closeOnSelect)",
    "typeText": "boolean"
  },
  {
    "name": "size",
    "type": "MenuSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Density of the items",
    "typeText": "MenuSize"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the context menu (the native one shows instead)",
    "typeText": "boolean"
  },
  {
    "name": "modal",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Modal menus block pointer interaction outside, trap focus, lock scrolling and hide the rest of the page from assistive technologies while open",
    "typeText": "boolean"
  },
  {
    "name": "loop",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Arrow keys wrap around from the last item to the first (and back)",
    "typeText": "boolean"
  },
  {
    "name": "dir",
    "type": "MenuDirection",
    "required": false,
    "description": "Reading direction: in \"rtl\" submenus open to the left and ArrowLeft / ArrowRight are swapped",
    "typeText": "MenuDirection"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the menu panel (`aria-label`)",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "select",
    "type": "[item: MenuAction]",
    "typeText": "[item: MenuAction]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "MenuAction",
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
    "description": "The area opening the menu (its single child gets the listeners)",
    "typeText": "any"
  }
]
```

## Menu

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Menu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "type": "MenuEntry[]",
    "required": true,
    "description": "Entries of the menu",
    "typeText": "MenuEntry[]"
  },
  {
    "name": "closeOnSelect",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Whether selecting an action closes the menu (checkbox and radio items keep it open unless their entry sets closeOnSelect)",
    "typeText": "boolean"
  },
  {
    "name": "size",
    "type": "MenuSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Density of the items",
    "typeText": "MenuSize"
  },
  {
    "name": "align",
    "type": "MenuAlign",
    "default": "\"end\"",
    "required": false,
    "description": "Alignment of the menu against the trigger",
    "typeText": "MenuAlign"
  },
  {
    "name": "side",
    "type": "MenuSide",
    "default": "\"bottom\"",
    "required": false,
    "description": "Preferred side; the menu flips when there is not enough room",
    "typeText": "MenuSide"
  },
  {
    "name": "open",
    "type": "boolean",
    "required": false,
    "description": "Whether the menu is open (controlled, `v-model:open`)",
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
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the trigger",
    "typeText": "boolean"
  },
  {
    "name": "modal",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Modal menus block pointer interaction outside, trap focus, lock scrolling and hide the rest of the page from assistive technologies while open",
    "typeText": "boolean"
  },
  {
    "name": "loop",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Arrow keys wrap around from the last item to the first (and back)",
    "typeText": "boolean"
  },
  {
    "name": "dir",
    "type": "MenuDirection",
    "required": false,
    "description": "Reading direction: in \"rtl\" submenus open to the left and ArrowLeft / ArrowRight are swapped",
    "typeText": "MenuDirection"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the menu panel (`aria-label`; defaults to the trigger's label)",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "select",
    "type": "[item: MenuAction]",
    "typeText": "[item: MenuAction]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "MenuAction",
        "required": true,
        "rest": false
      }
    ]
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
    "name": "trigger",
    "type": "any",
    "description": "The trigger element (its single child gets the trigger props)",
    "typeText": "any"
  },
  {
    "name": "default",
    "type": "any",
    "description": "Alternative to the `trigger` slot",
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

## MenuCheckboxItem

Support: n/a

Data object in Vue (like React): an item of the parent component's items / entries prop.

## MenuGroup

Support: n/a

Data object in Vue (like React): an item of the parent component's items / entries prop.

## MenuItem

Support: n/a

Data object in Vue (like React): an item of the parent component's items / entries prop.

## MenuLabel

Support: n/a

Data object in Vue (like React): an item of the parent component's items / entries prop.

## MenuRadioItem

Support: n/a

Data object in Vue (like React): an item of the parent component's items / entries prop.

## MenuSeparator

Support: n/a

Data object in Vue (like React): an item of the parent component's items / entries prop.

## CSS variables

```json
{
  "css:Menu": {
    "kind": "cssVars",
    "source": "react/src/components/Menu",
    "vars": [
      {
        "name": "--menu-min-width",
        "description": "Minimum width of the menu panel"
      },
      {
        "name": "--menu-max-width",
        "description": "Maximum width of the menu panel"
      },
      {
        "name": "--menu-max-height",
        "description": "Maximum height of the menu panel (scrolls beyond)"
      },
      {
        "name": "--menu-padding",
        "description": "Inner padding of the menu panel"
      },
      {
        "name": "--menu-radius",
        "description": "Corner radius of the menu panel (defaults to --radius-lg)"
      },
      {
        "name": "--menu-shadow",
        "description": "Shadow of the menu panel (defaults to --shadow-md)"
      },
      {
        "name": "--menu-item-height",
        "description": "Minimum height of an item (every size; defaults to the density's control height)"
      },
      {
        "name": "--menu-z-index",
        "description": "Stacking order of the menu panel (defaults to --z-popover)"
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

### apps/docs/src/docs/pages/menu/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, VStack } from "minerva-design/vue";
const result = ref("");
const items = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Menu :items="items" @select="(item) => (result = String(item.label))"
      ><Button>Project actions</Button></Menu
    ><output>{{ result }}</output></VStack
  >
</template>

```

## Example: checkbox-radio

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/menu/vue/checkbox-radio.vue

```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import { Menu, Button, VStack } from "minerva-design/vue";
import type { MenuEntry } from "minerva-design/vue";
const grid = ref(true);
const density = ref("comfortable");
const items = computed<MenuEntry[]>(() => [
  {
    type: "checkbox",
    key: "grid",
    label: "Show grid",
    checked: grid.value,
    onCheckedChange: (value) => (grid.value = value),
  },
  {
    type: "radio-group",
    key: "density",
    label: "Density",
    value: density.value,
    onValueChange: (value) => (density.value = value),
    items: [
      { value: "compact", label: "Compact" },
      { value: "comfortable", label: "Comfortable" },
    ],
  },
]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Menu :items="items"><Button>View options</Button></Menu
    ><output
      >Grid: {{ grid ? "on" : "off" }} · Density: {{ density }}</output
    ></VStack
  >
</template>

```

## Example: context-menu

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/menu/vue/context-menu.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ContextMenu, Box } from "minerva-design/vue";
const result = ref("");
const items = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
</script>
<template>
  <ContextMenu :items="items" @select="(item) => (result = String(item.label))"
    ><Box :p="6" border="1px dashed var(--color-border)" tabindex="0"
      >Right-click here or press Shift+F10</Box
    ></ContextMenu
  ><output>{{ result }}</output>
</template>

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/menu/vue/controlled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, type MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
const open = ref(false);
</script>
<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <Button variant="outline" @click="open = !open"
      >{{ open ? "Close" : "Open" }} actions</Button
    ><Menu
      v-model:open="open"
      :items="items"
      :modal="false"
      @select="(item) => (result = String(item.label))"
      ><Button>Controlled menu</Button></Menu
    ><output>{{ result }}</output>
  </div>
</template>

```

## Example: disabled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/menu/vue/disabled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, type MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
</script>
<template>
  <div style="display: flex; gap: 12px">
    <Menu :items="items" disabled><Button>Disabled menu</Button></Menu
    ><Menu :items="items" @select="(item) => (result = String(item.label))"
      ><Button>Disabled Delete action</Button></Menu
    ><output>{{ result }}</output>
  </div>
</template>

```

## Example: groups

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/menu/vue/groups.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, type MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  {
    type: "group",
    key: "workspace",
    label: "Workspace",
    items: [
      { key: "new", label: "New project" },
      { key: "open", label: "Open project" },
    ],
  },
  { type: "separator", key: "separator" },
  {
    type: "group",
    key: "account",
    label: "Account",
    items: [
      { key: "profile", label: "Profile" },
      { key: "sign-out", label: "Sign out" },
    ],
  },
];
</script>
<template>
  <div>
    <Menu :items="items" @select="(item) => (result = String(item.label))"
      ><Button>Grouped actions</Button></Menu
    ><output>{{ result }}</output>
  </div>
</template>

```

## Example: items

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/menu/vue/items.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button } from "minerva-design/vue";
import type { MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  {
    type: "group",
    key: "project",
    label: "Project",
    items: [
      { key: "new", label: "New project" },
      {
        key: "open",
        label: "Open recent",
        children: [
          { key: "one", label: "Design system" },
          { key: "two", label: "Website" },
        ],
      },
    ],
  },
  { type: "separator", key: "divider" },
  { key: "settings", label: "Settings" },
];
</script>
<template>
  <Menu :items="items" @select="(item) => (result = String(item.label))"
    ><Button>Grouped actions</Button></Menu
  ><output>{{ result }}</output>
</template>

```

## Example: placement

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/menu/vue/placement.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, type MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
const sides = ["top", "right", "bottom", "left"] as const;
</script>
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; padding: 40px">
    <Menu
      v-for="side in sides"
      :key="side"
      :items="items"
      :side="side"
      align="start"
      @select="(item) => (result = String(item.label))"
      ><Button variant="outline">{{ side }}</Button></Menu
    ><output>{{ result }}</output>
  </div>
</template>

```

## Example: submenus

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/menu/vue/submenus.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, type MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  {
    key: "share",
    label: "Share",
    children: [
      { key: "email", label: "Email" },
      {
        key: "team",
        label: "Team",
        children: [
          { key: "design", label: "Design" },
          { key: "engineering", label: "Engineering" },
        ],
      },
    ],
  },
  {
    key: "export",
    label: "Export",
    children: [
      { key: "pdf", label: "PDF" },
      { key: "csv", label: "CSV", disabled: true },
    ],
  },
];
</script>
<template>
  <div>
    <Menu :items="items" @select="(item) => (result = String(item.label))"
      ><Button>Nested actions</Button></Menu
    ><output>{{ result }}</output>
  </div>
</template>

```

## Example: triggers

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/menu/vue/triggers.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, type MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
</script>
<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <Menu :items="items" @select="(item) => (result = String(item.label))"
      ><Button size="small" variant="ghost" aria-label="More actions"
        >⋯</Button
      ></Menu
    ><Menu :items="items" @select="(item) => (result = String(item.label))"
      ><button
        type="button"
        style="
          border: 1px solid currentColor;
          border-radius: 20px;
          padding: 8px 16px;
          background: transparent;
          color: inherit;
        "
      >
        Custom trigger
      </button></Menu
    ><output>{{ result }}</output>
  </div>
</template>

```
