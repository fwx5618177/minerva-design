# Slider

Choisissez un nombre, ou une plage avec deux curseurs, en glissant le long d'une piste : pas ou graduations, libellé de valeur et infobulle, et un événement distinct quand l'utilisateur relâche.

Package: minerva-design@1.20.2

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Slider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Slider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "SliderValue",
    "required": false,
    "description": "Value (controlled, `v-model`): a number, or `[start, end]` with `range`",
    "typeText": "SliderValue"
  },
  {
    "name": "defaultValue",
    "type": "SliderValue",
    "required": false,
    "description": "Initial value (uncontrolled); defaults to min, or [min, max] with range",
    "typeText": "SliderValue"
  },
  {
    "name": "range",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Two thumbs selecting `[start, end]`; the thumbs cannot cross",
    "typeText": "boolean"
  },
  {
    "name": "min",
    "type": "number",
    "default": "0",
    "required": false,
    "description": "Smallest value",
    "typeText": "number"
  },
  {
    "name": "max",
    "type": "number",
    "default": "100",
    "required": false,
    "description": "Largest value",
    "typeText": "number"
  },
  {
    "name": "step",
    "type": "number | null",
    "default": "1",
    "required": false,
    "description": "Step between two values; `null` snaps to the marks only",
    "typeText": "number | null"
  },
  {
    "name": "marks",
    "type": "boolean | SliderMark[]",
    "required": false,
    "description": "Ticks of the scale: `{ value, label? }[]`, or `true` for one tick per step",
    "typeText": "boolean | SliderMark[]"
  },
  {
    "name": "snapToMarks",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Snaps the value to the closest mark (instead of the step)",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the slider. Inherited from an enclosing FormControl when not set",
    "typeText": "boolean"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "required": false,
    "description": "The user cannot change the value. Inherited from an enclosing FormControl\nwhen not set",
    "typeText": "boolean"
  },
  {
    "name": "size",
    "type": "SliderSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Thumb and track size",
    "typeText": "SliderSize"
  },
  {
    "name": "color",
    "type": "SliderColor",
    "default": "\"primary\"",
    "required": false,
    "description": "Semantic color of the filled track and the thumbs",
    "typeText": "SliderColor"
  },
  {
    "name": "showValue",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the value after the track",
    "typeText": "boolean"
  },
  {
    "name": "tooltip",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the value in a bubble above a thumb while it is dragged, hovered\nor focused",
    "typeText": "boolean"
  },
  {
    "name": "formatValue",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats a value for the value label, the tooltip and aria-valuetext",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "orientation",
    "type": "SliderOrientation",
    "default": "\"horizontal\"",
    "required": false,
    "description": "Direction of the track",
    "typeText": "SliderOrientation"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the hidden form input(s); a range submits two entries",
    "typeText": "string"
  },
  {
    "name": "getAriaValueText",
    "type": "((value: number, index: number) => string)",
    "required": false,
    "description": "aria-valuetext of a thumb (index 0, or 1 for the end thumb of a range)",
    "typeText": "((value: number, index: number) => string)"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[value: SliderValue]",
    "typeText": "[value: SliderValue]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "SliderValue",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[value: SliderValue]",
    "typeText": "[value: SliderValue]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "SliderValue",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "changeEnd",
    "type": "[value: SliderValue]",
    "typeText": "[value: SliderValue]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "SliderValue",
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
  "css:Slider": {
    "kind": "cssVars",
    "source": "react/src/components/Slider",
    "vars": [
      {
        "name": "--slider-accent",
        "description": "Color of the filled track and of the thumb border (defaults to the color prop's accent)"
      },
      {
        "name": "--slider-rail-color",
        "description": "Background of the empty track"
      },
      {
        "name": "--slider-thumb-color",
        "description": "Background of the thumbs"
      },
      {
        "name": "--slider-track-height",
        "description": "Thickness of the track (every size)"
      },
      {
        "name": "--slider-thumb-size",
        "description": "Width and height of the thumbs (every size)"
      },
      {
        "name": "--slider-length",
        "description": "Length of a vertical slider"
      },
      {
        "name": "--slider-min-length",
        "description": "Smallest length of a horizontal track, like the intrinsic size of a native range input (defaults to 10rem)"
      },
      {
        "name": "--slider-gap",
        "description": "Space between the track and the value label"
      },
      {
        "name": "--slider-value-font-size",
        "description": "Font size of the value label and of the mark labels"
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

### apps/docs/src/docs/pages/slider/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Slider, VStack, type SliderValue } from "minerva-design/vue";
const volume = ref<SliderValue>(40);
</script>
<template>
  <VStack :gap="3" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider v-model="volume" aria-label="Volume" show-value tooltip /><Slider
      aria-label="Opacity"
      :default-value="0.6"
      :min="0"
      :max="1"
      :step="0.05"
      show-value
  /></VStack>
</template>

```

## Example: committed

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/slider/vue/committed.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Slider, VStack, type SliderValue } from "minerva-design/vue";
const live = ref<SliderValue>(50);
const saved = ref<SliderValue>(50);
const saves = ref(0);
function save(value: SliderValue) {
  saved.value = value;
  saves.value += 1;
}
</script>
<template>
  <VStack :gap="3" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider v-model="live" aria-label="Brightness" @change-end="save" /><output
      >While dragging: {{ live }} · Saved on release: {{ saved }} ({{
        saves
      }}
      saves)</output
    ></VStack
  >
</template>

```

## Example: disabled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/slider/vue/disabled.vue

```vue
<script setup lang="ts">
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Slider,
  VStack,
} from "minerva-design/vue";
</script>
<template>
  <VStack :gap="4" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider aria-label="Disabled" :default-value="40" disabled /><Slider
      aria-label="Read only"
      :default-value="60"
      read-only
      show-value
    /><FormControl invalid
      ><FormLabel>Daily goal (minutes)</FormLabel
      ><Slider
        :default-value="5"
        :max="120"
        :step="5"
        show-value
      /><FormHelperText>Pick at least 10 minutes.</FormHelperText></FormControl
    ></VStack
  >
</template>

```

## Example: marks

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/slider/vue/marks.vue

```vue
<script setup lang="ts">
import { Slider, VStack } from "minerva-design/vue";
const levels = [
  { value: 0, label: "Off" },
  { value: 25, label: "Low" },
  { value: 50, label: "Medium" },
  { value: 75, label: "High" },
  { value: 100, label: "Max" },
];
const levelText = (v: number) =>
  levels.find((level) => level.value === v)?.label ?? String(v);
</script>
<template>
  <VStack :gap="8" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider
      aria-label="Rating"
      :default-value="6"
      :max="10"
      marks
      show-value /><Slider
      aria-label="Fan speed"
      :default-value="50"
      :step="null"
      :marks="levels"
      :get-aria-value-text="levelText"
  /></VStack>
</template>

```

## Example: range

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/slider/vue/range.vue

```vue
<script setup lang="ts">
import { computed, ref } from "vue";
import { Slider, VStack, type SliderValue } from "minerva-design/vue";
const price = ref<SliderValue>([20, 80]);
const label = computed(() => {
  const [low, high] = price.value as [number, number];
  return `From $${low} to $${high}`;
});
const money = (v: number) => `$${v}`;
</script>
<template>
  <VStack :gap="3" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider
      v-model="price"
      aria-label="Price"
      range
      :step="5"
      :format-value="money"
      tooltip
      name="price"
    /><output>{{ label }}</output></VStack
  >
</template>

```

## Example: sizes-colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/slider/vue/sizes-colors.vue

```vue
<script setup lang="ts">
import { Slider, VStack } from "minerva-design/vue";
const colors = ["primary", "success", "info", "warning", "danger"] as const;
</script>
<template>
  <VStack :gap="4" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider aria-label="Small" size="small" :default-value="30" /><Slider
      aria-label="Medium"
      :default-value="50" /><Slider
      aria-label="Large"
      size="large"
      :default-value="70" /><Slider
      v-for="(color, index) in colors"
      :key="color"
      :aria-label="color"
      :color="color"
      :default-value="20 + index * 15"
  /></VStack>
</template>

```
