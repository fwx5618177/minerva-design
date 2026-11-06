# List

Quiet operational lists on native ul / li elements with primary and secondary text, a decorative icon and trailing actions.

Package: minerva-design@1.21.1

Renderer: vue

Locale: en

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

## Cell

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## CellGroup

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## List

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "List"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "density",
    "type": "ListDensity",
    "default": "\"default\"",
    "required": false,
    "description": "Minimum row height and vertical padding (56px / 12px, 40px / 8px or\n72px / 16px)",
    "typeText": "ListDensity"
  },
  {
    "name": "bordered",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Frames the list as a card (full border, rounded corners, surface\nbackground) whose rows are tinted on hover and while a control inside\nthem has the focus",
    "typeText": "boolean"
  },
  {
    "name": "dividers",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Draws token-colored separators between adjacent rows",
    "typeText": "boolean"
  },
  {
    "name": "role",
    "type": "string",
    "default": "\"list\"",
    "required": false,
    "description": "List role; kept explicit so Safari / VoiceOver keep list semantics after\nthe markers are removed",
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
    "typeText": "any"
  }
]
```

## ListItem

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ListItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "primary",
    "type": "string | number",
    "required": false,
    "description": "Main content (medium weight), or the `primary` slot",
    "typeText": "string | number"
  },
  {
    "name": "secondary",
    "type": "string | number",
    "required": false,
    "description": "Supporting content, muted and smaller (0 is rendered), or the `secondary` slot",
    "typeText": "string | number"
  }
]
```

### slots

```json
[
  {
    "name": "primary",
    "type": "any",
    "description": "Main content (the `primary` prop)",
    "typeText": "any"
  },
  {
    "name": "secondary",
    "type": "any",
    "description": "Supporting content (the `secondary` prop)",
    "typeText": "any"
  },
  {
    "name": "icon",
    "type": "any",
    "description": "Decorative leading slot, hidden from assistive technologies",
    "typeText": "any"
  },
  {
    "name": "actions",
    "type": "any",
    "description": "Trailing controls, owned by the caller (bounded to 50% of the row)",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:List": {
    "kind": "cssVars",
    "source": "react/src/components/List",
    "vars": [
      {
        "name": "--list-item-min-height",
        "description": "Minimum height of an item (follows the density; compact lists are shorter)"
      },
      {
        "name": "--list-item-padding-y",
        "description": "Vertical padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-padding-x",
        "description": "Horizontal padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--list-divider-color",
        "description": "Color of the dividers between items"
      },
      {
        "name": "--list-icon-size",
        "description": "Size of the leading icon slot"
      },
      {
        "name": "--list-border-color",
        "description": "Border color of a bordered list (defaults to --border-color)"
      },
      {
        "name": "--list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--list-item-hover-background",
        "description": "Background of a row of a bordered list on hover / while a control inside it has the focus"
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

### apps/docs/src/docs/pages/list/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { List, ListItem, IconButton } from "minerva-design/vue";
const devices = ref([
  { id: "phone", name: "iPhone 16", lastUsed: "Used 2 hours ago" },
  { id: "laptop", name: "MacBook Air", lastUsed: "Used yesterday" },
]);
</script>
<template>
  <List aria-label="Registered devices" style="width: 100%"
    ><ListItem
      v-for="device in devices"
      :key="device.id"
      :primary="device.name"
      :secondary="device.lastUsed"
      ><template #icon>▣</template
      ><template #actions
        ><IconButton
          :label="`Delete ${device.name}`"
          @click="devices = devices.filter((d) => d.id !== device.id)"
          ><template #icon>⌫</template></IconButton
        ></template
      ></ListItem
    ></List
  >
</template>

```

## Example: bordered

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/list/vue/bordered.vue

```vue
<script setup lang="ts">
import { List, ListItem } from "minerva-design/vue";
</script>
<template>
  <List bordered
    ><ListItem
      primary="Project settings"
      secondary="Name, description and visibility" /><ListItem
      primary="Team members"
      secondary="People with access"
  /></List>
</template>

```

## Example: density

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/list/vue/density.vue

```vue
<script setup lang="ts">
import { List, ListItem, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><List density="compact" bordered
      ><ListItem primary="Compact row" /><ListItem
        primary="Another row" /></List
    ><List density="comfortable" bordered
      ><ListItem
        primary="Comfortable row"
        secondary="Additional context" /></List
  ></VStack>
</template>

```

## Example: slots

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/list/vue/slots.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { List, ListItem, Avatar, Button } from "minerva-design/vue";
const invited = ref(false);
</script>
<template>
  <List
    ><ListItem primary="Ada Lovelace" secondary="Workspace owner"
      ><template #icon><Avatar name="Ada Lovelace" /></template
      ><template #actions
        ><Button variant="outline" size="small" @click="invited = true"
          >Send invitation</Button
        ></template
      ></ListItem
    ></List
  ><output>{{ invited ? "Invitation sent" : "" }}</output>
</template>

```
