# Switch 开关

用于在开启和关闭两种状态之间切换，操作即时生效。

Package: minerva-design@1.22.0

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Switch

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Switch"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "boolean",
    "required": false,
    "description": "Whether the switch is on (controlled, `v-model`)",
    "typeText": "boolean"
  },
  {
    "name": "defaultChecked",
    "type": "boolean",
    "required": false,
    "description": "Initial state (uncontrolled)",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the switch. Inherited from an enclosing FormControl when not\nset; an explicit `false` overrides the FormControl",
    "typeText": "boolean"
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\"",
    "default": "\"medium\"",
    "required": false,
    "description": "Switch size",
    "typeText": "\"medium\" | \"small\" | \"large\""
  },
  {
    "name": "color",
    "type": "\"info\" | \"primary\" | \"success\" | \"warning\" | \"danger\"",
    "default": "\"primary\"",
    "required": false,
    "description": "Semantic color of the \"on\" state",
    "typeText": "\"info\" | \"primary\" | \"success\" | \"warning\" | \"danger\""
  },
  {
    "name": "shape",
    "type": "\"square\" | \"round\"",
    "default": "\"round\"",
    "required": false,
    "description": "Shape of the track and thumb",
    "typeText": "\"square\" | \"round\""
  },
  {
    "name": "variant",
    "type": "SwitchVariant",
    "default": "\"slider\"",
    "required": false,
    "description": "\"slider\" is the classic track + thumb; \"segmented\" renders two pressable\nsegments (requires offLabel and onLabel, otherwise falls back to slider)",
    "typeText": "SwitchVariant"
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Label displayed next to the switch (or the `label` / default slot)",
    "typeText": "string"
  },
  {
    "name": "offLabel",
    "type": "string",
    "required": false,
    "description": "Label of the \"off\" state (or the `off-label` slot). With onLabel, both\nlabels are rendered as buttons on each side of the slider (they replace\n`label`) or as the segments of the segmented variant",
    "typeText": "string"
  },
  {
    "name": "onLabel",
    "type": "string",
    "required": false,
    "description": "Label of the \"on\" state (or the `on-label` slot; see offLabel)",
    "typeText": "string"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the input, used in forms",
    "typeText": "string"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "id of the input (defaults to the enclosing FormControl's id)",
    "typeText": "string"
  },
  {
    "name": "value",
    "type": "string",
    "required": false,
    "description": "Value submitted with the form when on",
    "typeText": "string"
  },
  {
    "name": "labelPlacement",
    "type": "\"start\" | \"end\" | \"bottom\" | \"top\"",
    "default": "\"end\"",
    "required": false,
    "description": "Position of the label relative to the switch",
    "typeText": "\"start\" | \"end\" | \"bottom\" | \"top\""
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a loading state and blocks interaction",
    "typeText": "boolean"
  },
  {
    "name": "ripple",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Shows a ripple effect on click",
    "typeText": "boolean"
  },
  {
    "name": "trackStyle",
    "type": "CSSProperties",
    "required": false,
    "description": "Inline styles of the track",
    "typeText": "CSSProperties"
  },
  {
    "name": "thumbStyle",
    "type": "CSSProperties",
    "required": false,
    "description": "Inline styles of the thumb",
    "typeText": "CSSProperties"
  },
  {
    "name": "iconPlacement",
    "type": "\"start\" | \"end\"",
    "default": "\"start\"",
    "required": false,
    "description": "Icon position (the `icon` slot): inside the thumb (\"start\") or after the\nswitch (\"end\")",
    "typeText": "\"start\" | \"end\""
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[checked: boolean]",
    "typeText": "[checked: boolean]",
    "parameters": [
      {
        "name": "checked",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[checked: boolean, event: Event]",
    "typeText": "[checked: boolean, event: Event]",
    "parameters": [
      {
        "name": "checked",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      },
      {
        "name": "event",
        "position": 1,
        "typeText": "Event",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "focus",
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
  },
  {
    "name": "blur",
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
    "description": "Label content (alternative to the `label` prop / slot)",
    "typeText": "any"
  },
  {
    "name": "label",
    "type": "any",
    "description": "Label content (the `label` prop)",
    "typeText": "any"
  },
  {
    "name": "icon",
    "type": "any",
    "description": "Custom icon (inside the thumb or after the switch: `iconPlacement`)",
    "typeText": "any"
  },
  {
    "name": "off-label",
    "type": "any",
    "description": "Label of the \"off\" state (the `offLabel` prop)",
    "typeText": "any"
  },
  {
    "name": "on-label",
    "type": "any",
    "description": "Label of the \"on\" state (the `onLabel` prop)",
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
  "css:Switch": {
    "kind": "cssVars",
    "source": "react/src/components/Switch",
    "vars": [
      {
        "name": "--switch-track-width",
        "description": "Width of the track (every size)"
      },
      {
        "name": "--switch-track-height",
        "description": "Height of the track (every size)"
      },
      {
        "name": "--switch-thumb-size",
        "description": "Width and height of the thumb (every size)"
      },
      {
        "name": "--switch-track-color",
        "description": "Background of the unchecked track"
      },
      {
        "name": "--switch-thumb-color",
        "description": "Background of the unchecked thumb"
      },
      {
        "name": "--switch-checked-color",
        "description": "Accent of the checked thumb, track and active segment (defaults to the color prop's accent)"
      },
      {
        "name": "--switch-label-gap",
        "description": "Space between the switch and its label"
      },
      {
        "name": "--switch-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [Vue controlled project form](/minerva-design/reference/1.22.0/recipes/vue-form/README.md) — vue; verified package 1.22.0

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/vue/basic.vue

```vue
<script setup lang="ts">
import { Switch, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Switch label="Wi-Fi" default-checked /><Switch label="Bluetooth"
  /></VStack>
</template>

```

## Example: colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/vue/colors.vue

```vue
<script setup lang="ts">
import { Switch, VStack } from "minerva-design/vue";
const colors = ["primary", "success", "info", "warning", "danger"] as const;
</script>
<template>
  <VStack :gap="3"
    ><Switch
      v-for="color in colors"
      :key="color"
      :color="color"
      :label="color"
      default-checked
  /></VStack>
</template>

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/switch/vue/controlled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Switch, VStack } from "minerva-design/vue";
const enabled = ref(false);
</script>
<template>
  <VStack :gap="3"
    ><Switch label="Email notifications" v-model="enabled" /><span
      >Notifications are {{ enabled ? "on" : "off" }}</span
    ></VStack
  >
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/switch/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Switch, FormField } from "minerva-design/vue";
const enabled = ref(true);
</script>
<template>
  <FormField label="Notifications" helper-text="Receive updates by email"
    ><Switch
      v-model="enabled"
      label="Email updates"
      name="notifications" /></FormField
  ><output>{{ enabled ? "Enabled" : "Disabled" }}</output>
</template>

```

## Example: label-placement

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/vue/label-placement.vue

```vue
<script setup lang="ts">
import { Switch, VStack } from "minerva-design/vue";
const placements = ["start", "end", "top", "bottom"] as const;
</script>
<template>
  <VStack :gap="3"
    ><Switch
      v-for="placement in placements"
      :key="placement"
      :label="`Label at ${placement}`"
      :label-placement="placement"
      default-checked
  /></VStack>
</template>

```

## Example: side-labels

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/switch/vue/side-labels.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Switch, VStack } from "minerva-design/vue";
const enabled = ref(false);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Switch v-model="enabled" off-label="Monthly" on-label="Annual" /><Switch
      v-model="enabled"
      variant="segmented"
      off-label="Light"
      on-label="Dark"
  /></VStack>
</template>

```

## Example: sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/vue/sizes.vue

```vue
<script setup lang="ts">
import { Switch, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Switch size="small" label="Small" default-checked /><Switch
      size="medium"
      label="Medium"
      default-checked /><Switch size="large" label="Large" default-checked
  /></VStack>
</template>

```

## Example: states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/vue/states.vue

```vue
<script setup lang="ts">
import { Switch, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Switch label="Loading" loading default-checked /><Switch
      label="Disabled"
      disabled /><Switch label="Disabled (on)" disabled default-checked
  /></VStack>
</template>

```

## Example: styles-states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/vue/styles-states.vue

```vue
<script setup lang="ts">
import { Switch, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Switch
      label="Square"
      shape="square"
      color="success"
      default-checked /><Switch label="Working" loading /><Switch
      label="Disabled"
      disabled /><Switch label="Large" size="large"
  /></HStack>
</template>

```
