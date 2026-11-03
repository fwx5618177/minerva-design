# Tabs 标签页

将内容分为一次显示一个的面板。无障碍标签页，支持方向键导航、line / enclosed / soft / pills 变体、语义色与垂直方向。

Package: minerva-design@1.19.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Tab

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Tab"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "type": "string",
    "required": true,
    "description": "Value identifying the tab and its panel (must not contain whitespace)",
    "typeText": "string"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the tab (skipped by arrow keys)",
    "typeText": "boolean"
  },
  {
    "name": "color",
    "type": "ColorScheme",
    "required": false,
    "description": "Overrides the group color; an explicitly colored tab keeps a tinted\nbackground while inactive",
    "typeText": "ColorScheme"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Tab content",
    "typeText": "any"
  }
]
```

## TabList

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TabList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "loop",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Moves focus from the last tab to the first (and back) with the arrow keys",
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

## TabPanel

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TabPanel"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "type": "string",
    "required": true,
    "description": "Value of the tab this panel belongs to",
    "typeText": "string"
  },
  {
    "name": "forceMount",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Keeps the panel mounted (hidden) while its tab is not selected",
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

## Tabs

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Tabs"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "string",
    "required": false,
    "description": "Value of the selected tab (controlled: `v-model`)",
    "typeText": "string"
  },
  {
    "name": "defaultValue",
    "type": "string",
    "required": false,
    "description": "Value of the initially selected tab (uncontrolled)",
    "typeText": "string"
  },
  {
    "name": "orientation",
    "type": "TabsOrientation",
    "default": "\"horizontal\"",
    "required": false,
    "description": "Layout and arrow-key direction",
    "typeText": "TabsOrientation"
  },
  {
    "name": "activationMode",
    "type": "\"automatic\" | \"manual\"",
    "default": "\"automatic\"",
    "required": false,
    "description": "`automatic` selects a tab when it receives focus; `manual` only on\nEnter / Space / click, so the parent can confirm before switching",
    "typeText": "\"automatic\" | \"manual\""
  },
  {
    "name": "dir",
    "type": "\"ltr\" | \"rtl\"",
    "required": false,
    "description": "Reading direction (affects arrow keys)",
    "typeText": "\"ltr\" | \"rtl\""
  },
  {
    "name": "variant",
    "type": "TabsVariant",
    "default": "\"line\"",
    "required": false,
    "description": "Visual style",
    "typeText": "TabsVariant"
  },
  {
    "name": "color",
    "type": "ColorScheme",
    "default": "\"primary\"",
    "required": false,
    "description": "Color of the selection",
    "typeText": "ColorScheme"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[value: string]",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[value: string]",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
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
    "description": "`TabList` and `TabPanel` elements",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "modelValue",
    "event": "update:modelValue",
    "syntax": "v-model"
  }
]
```

## CSS variables

```json
{
  "css:Tabs": {
    "kind": "cssVars",
    "source": "react/src/components/Tabs",
    "vars": [
      {
        "name": "--tabs-gap",
        "description": "Space between the tabs of the list"
      },
      {
        "name": "--tabs-font-size",
        "description": "Font size of the tabs"
      },
      {
        "name": "--tabs-trigger-padding-x",
        "description": "Horizontal padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-padding-y",
        "description": "Vertical padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-min-height",
        "description": "Minimum height of a tab (pills default to the density's control height minus 4px)"
      },
      {
        "name": "--tabs-radius",
        "description": "Corner radius of enclosed / soft / pill tabs (defaults to --radius-md)"
      },
      {
        "name": "--tabs-indicator-width",
        "description": "Thickness of the line indicator"
      },
      {
        "name": "--tabs-panel-padding",
        "description": "Padding of the panel"
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

### apps/docs/src/docs/pages/tabs/vue/basic.vue

```vue
<script setup lang="ts">
import { Tabs, Tab, TabList, TabPanel } from "minerva-design/vue";
</script>
<template>
  <Tabs default-value="overview"
    ><TabList aria-label="Book sections"
      ><Tab value="overview">Overview</Tab><Tab value="reviews">Reviews</Tab
      ><Tab value="similar" disabled>Similar books</Tab></TabList
    ><TabPanel value="overview"
      >A desert planet, a noble family and a precious spice.</TabPanel
    ><TabPanel value="reviews">“A masterpiece of world building.”</TabPanel
    ><TabPanel value="similar">Coming soon.</TabPanel></Tabs
  >
</template>

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/vue/controlled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Button,
  VStack,
} from "minerva-design/vue";
const active = ref("one");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="active = active === 'one' ? 'two' : 'one'"
      >Switch active tab</Button
    ><Tabs v-model="active"
      ><TabList aria-label="Controlled sections"
        ><Tab value="one">First</Tab><Tab value="two">Second</Tab></TabList
      ><TabPanel value="one">First panel</TabPanel
      ><TabPanel value="two">Second panel</TabPanel></Tabs
    ><output>{{ active }}</output></VStack
  >
</template>

```

## Example: panels

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/vue/panels.vue

```vue
<script setup lang="ts">
import { Tabs, TabList, Tab, TabPanel, Input } from "minerva-design/vue";
</script>
<template>
  <Tabs default-value="profile"
    ><TabList aria-label="Account settings"
      ><Tab value="profile">Profile</Tab
      ><Tab value="security">Security</Tab></TabList
    ><TabPanel value="profile"
      ><Input aria-label="Display name" default-value="Ada" /></TabPanel
    ><TabPanel value="security"
      ><Input
        type="password"
        aria-label="New password"
        placeholder="New password" /></TabPanel
  ></Tabs>
</template>

```

## Example: variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/vue/variants.vue

```vue
<script setup lang="ts">
import { Tabs, Tab, TabList, VStack } from "minerva-design/vue";
const variants = ["line", "enclosed", "soft", "pills"] as const;
</script>
<template>
  <VStack :gap="6"
    ><Tabs
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      default-value="hot"
      ><TabList :aria-label="`${variant} tabs`"
        ><Tab value="hot">Hot</Tab><Tab value="new">New</Tab
        ><Tab value="completed">Completed</Tab></TabList
      ></Tabs
    ></VStack
  >
</template>

```

## Example: vertical

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/vue/vertical.vue

```vue
<script setup lang="ts">
import { Tabs, TabList, Tab, TabPanel } from "minerva-design/vue";
</script>
<template>
  <Tabs default-value="general" orientation="vertical" variant="pills"
    ><TabList aria-label="Settings sections"
      ><Tab value="general">General</Tab><Tab value="team">Team</Tab></TabList
    ><TabPanel value="general">General workspace settings</TabPanel
    ><TabPanel value="team">Team access settings</TabPanel></Tabs
  >
</template>

```
