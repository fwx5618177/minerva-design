# NumberInput 数字输入

数字字段（spinbutton），支持方向键步进、可选步进按钮、min / max 限制和固定精度；值在失焦或按 Enter 时提交。

Package: minerva-design@1.23.2

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## NumberInput

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "NumberInput"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "number | null",
    "required": false,
    "description": "Current value (controlled, `v-model`); `null` is an empty field. Omit for an uncontrolled field",
    "typeText": "number | null"
  },
  {
    "name": "defaultValue",
    "type": "number | null",
    "required": false,
    "description": "Initial value of an uncontrolled field",
    "typeText": "number | null"
  },
  {
    "name": "min",
    "type": "number",
    "required": false,
    "description": "Smallest allowed value; committed values are clamped to it",
    "typeText": "number"
  },
  {
    "name": "max",
    "type": "number",
    "required": false,
    "description": "Largest allowed value; committed values are clamped to it",
    "typeText": "number"
  },
  {
    "name": "step",
    "type": "number",
    "default": "1",
    "required": false,
    "description": "Amount added / removed by ArrowUp / ArrowDown and the stepper",
    "typeText": "number"
  },
  {
    "name": "precision",
    "type": "number",
    "required": false,
    "description": "Decimal places of the value; inferred from step when omitted (step 0.01 -> 2)",
    "typeText": "number"
  },
  {
    "name": "size",
    "type": "NumberInputSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Field size",
    "typeText": "NumberInputSize"
  },
  {
    "name": "invalid",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Error state (also set by an invalid FormControl or an out-of-range draft)",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the field (also set by FormControl)",
    "typeText": "boolean"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Focusable and copyable, but typing and stepping do not change the value\n(also set by FormControl)",
    "typeText": "boolean"
  },
  {
    "name": "required",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Marks the field as required.",
    "typeText": "boolean"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "id of the input (defaults to the enclosing FormControl's id)",
    "typeText": "string"
  },
  {
    "name": "showStepper",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows increment / decrement buttons; the arrow keys always work",
    "typeText": "boolean"
  },
  {
    "name": "allowEmpty",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Clearing the field commits `null`; otherwise it falls back to min (or 0)",
    "typeText": "boolean"
  },
  {
    "name": "incrementLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the increment button",
    "typeText": "string"
  },
  {
    "name": "decrementLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the decrement button",
    "typeText": "string"
  },
  {
    "name": "notANumberMessage",
    "type": "string",
    "required": false,
    "description": "Hint shown (as the wrapper title) while the draft is not a number",
    "typeText": "string"
  },
  {
    "name": "belowMinMessage",
    "type": "string",
    "required": false,
    "description": "Hint shown while the draft is below min",
    "typeText": "string"
  },
  {
    "name": "aboveMaxMessage",
    "type": "string",
    "required": false,
    "description": "Hint shown while the draft is above max",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[value: number | null]",
    "typeText": "[value: number | null]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "number | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[value: number | null]",
    "typeText": "[value: number | null]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "number | null",
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
  "css:NumberInput": {
    "kind": "cssVars",
    "source": "react/src/components/NumberInput",
    "vars": [
      {
        "name": "--number-input-height",
        "description": "Height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--number-input-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--number-input-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--number-input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--number-input-background",
        "description": "Background color"
      },
      {
        "name": "--number-input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--number-input-stepper-width",
        "description": "Width of the increment / decrement column"
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

### apps/docs/src/docs/pages/number-input/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { NumberInput, VStack } from "minerva-design/vue";
const value = ref<number | null>(2);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><NumberInput
      v-model="value"
      :min="0"
      :max="10"
      aria-label="Quantity"
    /><output>Quantity: {{ value }}</output></VStack
  >
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/number-input/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { NumberInput, FormField } from "minerva-design/vue";
const value = ref<number | null>(null);
</script>
<template>
  <FormField
    label="Seats"
    required
    :invalid="value === null"
    error-message="Enter a seat count"
    ><NumberInput v-model="value" :min="1" :max="100"
  /></FormField>
</template>

```

## Example: precision

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/number-input/vue/precision.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { NumberInput, FormField } from "minerva-design/vue";
const value = ref<number | null>(12.5);
</script>
<template>
  <FormField label="Unit price" helper-text="Steps of 0.25"
    ><NumberInput v-model="value" :step="0.25" :precision="2" :min="0"
  /></FormField>
</template>

```
