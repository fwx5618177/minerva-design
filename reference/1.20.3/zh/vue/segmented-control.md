# SegmentedControl 分段控制器

用于切换模式和筛选条件的单选分段开关，滑块会滑动到选中的分段下方。若每个选项都有各自的内容面板，请使用 Tabs。

Package: minerva-design@1.20.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## SegmentedControl

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SegmentedControl"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "type": "readonly SegmentedControlOption[]",
    "required": true,
    "description": "The segments: strings or option objects",
    "typeText": "readonly SegmentedControlOption[]"
  },
  {
    "name": "modelValue",
    "type": "string",
    "required": false,
    "description": "Selected value (controlled, `v-model`)",
    "typeText": "string"
  },
  {
    "name": "defaultValue",
    "type": "string",
    "required": false,
    "description": "Initially selected value (uncontrolled)",
    "typeText": "string"
  },
  {
    "name": "size",
    "type": "SegmentedControlSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Segment density",
    "typeText": "SegmentedControlSize"
  },
  {
    "name": "color",
    "type": "SegmentedControlColor",
    "default": "\"neutral\"",
    "required": false,
    "description": "Thumb color",
    "typeText": "SegmentedControlColor"
  },
  {
    "name": "fullWidth",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Fills the width of the container (the segments always share the width\nequally)",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Blocks every segment",
    "typeText": "boolean"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of a hidden input carrying the value in a form",
    "typeText": "string"
  },
  {
    "name": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible label of the group",
    "typeText": "string"
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
  "css:SegmentedControl": {
    "kind": "cssVars",
    "source": "react/src/components/SegmentedControl",
    "vars": [
      {
        "name": "--segmented-control-height",
        "description": "Height of the control (defaults to the density's control height)"
      },
      {
        "name": "--segmented-control-padding",
        "description": "Space between the track and the segments (defaults to 2px)"
      },
      {
        "name": "--segmented-control-radius",
        "description": "Corner radius of the track (defaults to --radius-md); the thumb follows it"
      },
      {
        "name": "--segmented-control-background",
        "description": "Background of the track (defaults to --surface-muted-color)"
      },
      {
        "name": "--segmented-control-color",
        "description": "Text color of the unselected segments"
      },
      {
        "name": "--segmented-control-item-padding-x",
        "description": "Inline padding of a segment"
      },
      {
        "name": "--segmented-control-thumb-background",
        "description": "Background of the thumb (defaults to --surface-elevated-color; --primary-color with color=\"primary\")"
      },
      {
        "name": "--segmented-control-thumb-shadow",
        "description": "Shadow of the thumb (defaults to --shadow-sm; none with color=\"primary\")"
      },
      {
        "name": "--segmented-control-selected-color",
        "description": "Text color of the selected segment"
      },
      {
        "name": "--segmented-control-duration",
        "description": "Duration of the thumb slide (defaults to --transition-base)"
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

### apps/docs/src/docs/pages/segmented-control/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { SegmentedControl, VStack } from "minerva-design/vue";
const view = ref("week");
</script>
<template>
  <VStack :gap="3" align="start"
    ><SegmentedControl
      v-model="view"
      aria-label="Calendar view"
      :options="[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]"
    /><output>Showing the {{ view }} view</output></VStack
  >
</template>

```

## Example: colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/vue/colors.vue

```vue
<script setup lang="ts">
import { SegmentedControl, VStack } from "minerva-design/vue";
const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System", disabled: true },
];
</script>
<template>
  <VStack :gap="4" align="start"
    ><SegmentedControl
      aria-label="Theme (neutral)"
      :options="options"
      default-value="light" /><SegmentedControl
      color="primary"
      aria-label="Theme (primary)"
      :options="options"
      default-value="dark" /><SegmentedControl
      disabled
      aria-label="Theme (disabled)"
      :options="options"
      default-value="light"
  /></VStack>
</template>

```

## Example: full-width

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/vue/full-width.vue

```vue
<script setup lang="ts">
import { SegmentedControl, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 420px"
    ><SegmentedControl
      full-width
      name="billing"
      aria-label="Billing period"
      default-value="yearly"
      :options="[
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly (−20%)' },
      ]" /><SegmentedControl
      full-width
      aria-label="Status filter"
      default-value="all"
      :options="['all', 'open', 'closed', 'archived']"
  /></VStack>
</template>

```

## Example: icons

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/vue/icons.vue

```vue
<script setup lang="ts">
import { SegmentedControl, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="4" align="start"
    ><SegmentedControl
      aria-label="Layout"
      default-value="list"
      :options="[
        { value: 'list', label: 'List', icon: '☰' },
        { value: 'grid', label: 'Grid', icon: '▦' },
        { value: 'map', label: 'Map', icon: '⌖' },
      ]" /><SegmentedControl
      aria-label="Layout (compact)"
      default-value="grid"
      :options="[
        { value: 'list', icon: '☰', 'aria-label': 'List' },
        { value: 'grid', icon: '▦', 'aria-label': 'Grid' },
        { value: 'map', icon: '⌖', 'aria-label': 'Map' },
      ]"
  /></VStack>
</template>

```

## Example: sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/vue/sizes.vue

```vue
<script setup lang="ts">
import { SegmentedControl, VStack } from "minerva-design/vue";
const options = ["Daily", "Weekly", "Monthly"];
</script>
<template>
  <VStack :gap="4" align="start"
    ><SegmentedControl
      size="small"
      aria-label="Small"
      :options="options"
      default-value="Daily" /><SegmentedControl
      aria-label="Medium"
      :options="options"
      default-value="Weekly" /><SegmentedControl
      size="large"
      aria-label="Large"
      :options="options"
      default-value="Monthly"
  /></VStack>
</template>

```
