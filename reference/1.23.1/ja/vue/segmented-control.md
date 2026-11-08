# SegmentedControl セグメントコントロール

モードやフィルターを切り替える単一選択のセグメントスイッチで、選択中のセグメントの下をサムがスライドします。各選択肢に独自のコンテンツパネルがある場合は Tabs を使用してください。

Package: minerva-design@1.23.1

Renderer: vue

Locale: ja

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
