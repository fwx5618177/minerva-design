# Radio

Lets users pick exactly one option from a set. Use RadioGroup to manage the selection of several radios.

Package: minerva-design@1.20.2

Renderer: vue

Locale: en

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

## Radio

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Radio"
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
    "description": "Whether the radio is checked (controlled, `v-model`). Ignored inside a RadioGroup",
    "typeText": "boolean"
  },
  {
    "name": "defaultChecked",
    "type": "boolean",
    "required": false,
    "description": "Initial checked state (uncontrolled). Ignored inside a RadioGroup",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the radio. Inherited from an enclosing FormControl when not set;\nan explicit `false` overrides the FormControl",
    "typeText": "boolean"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Native name attribute. Inside a RadioGroup the group's name is used",
    "typeText": "string"
  },
  {
    "name": "value",
    "type": "string | number",
    "required": false,
    "description": "Value of the radio; identifies it within a RadioGroup",
    "typeText": "string | number"
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\"",
    "default": "\"medium\"",
    "required": false,
    "description": "Radio size. Overridden by the RadioGroup size when the group sets one",
    "typeText": "\"medium\" | \"small\" | \"large\""
  },
  {
    "name": "color",
    "type": "RadioColor",
    "default": "\"primary\"",
    "required": false,
    "description": "Semantic color of the checked radio. Overridden by the RadioGroup color\nwhen the group sets one",
    "typeText": "RadioColor"
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Label displayed next to the radio (or the `label` / default slot)",
    "typeText": "string"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "Id of the native `<input>` (e.g. for an external `<label for>`)",
    "typeText": "string"
  },
  {
    "name": "required",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Marks the input as required",
    "typeText": "boolean"
  },
  {
    "name": "error",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the error state (errorMessage replaces helperText and describes the\nradio)",
    "typeText": "boolean"
  },
  {
    "name": "errorMessage",
    "type": "string",
    "required": false,
    "description": "Message shown below the radio when error is true (linked with aria-describedby)",
    "typeText": "string"
  },
  {
    "name": "helperText",
    "type": "string",
    "required": false,
    "description": "Helper text shown below the radio (linked with aria-describedby)",
    "typeText": "string"
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
    "name": "error-icon",
    "type": "any",
    "description": "Icon before the error message (default: info circle)",
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

## RadioGroup

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "RadioGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "string | number | null",
    "required": false,
    "description": "Value of the selected radio (controlled, `v-model`; `null` = controlled with no selection)",
    "typeText": "string | number | null"
  },
  {
    "name": "defaultValue",
    "type": "string | number",
    "required": false,
    "description": "Initially selected value (uncontrolled)",
    "typeText": "string | number"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name shared by all radios of the group (a unique name is generated when\nomitted, so arrow-key navigation always works)",
    "typeText": "string"
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Visible label of the group, also its accessible name (or the `label` slot)",
    "typeText": "string"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "id of the element with role=\"radiogroup\"",
    "typeText": "string"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables every radio in the group (inherited from an enclosing\nFormControl when not set)",
    "typeText": "boolean"
  },
  {
    "name": "direction",
    "type": "\"vertical\" | \"horizontal\"",
    "default": "\"vertical\"",
    "required": false,
    "description": "Layout direction of the radios",
    "typeText": "\"vertical\" | \"horizontal\""
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\"",
    "required": false,
    "description": "Size applied to every radio in the group; when not set each radio uses\nits own size",
    "typeText": "\"medium\" | \"small\" | \"large\""
  },
  {
    "name": "error",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the error state (also set by an invalid enclosing FormControl)",
    "typeText": "boolean"
  },
  {
    "name": "helperText",
    "type": "string",
    "required": false,
    "description": "Helper text shown below the group (linked with aria-describedby)",
    "typeText": "string"
  },
  {
    "name": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the group as required (aria-required; inherited from an enclosing\nFormControl)",
    "typeText": "boolean"
  },
  {
    "name": "color",
    "type": "RadioColor",
    "required": false,
    "description": "Semantic color applied to every radio in the group (overrides the\nradios' own color); when not set each radio uses its own color",
    "typeText": "RadioColor"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[value: string | number]",
    "typeText": "[value: string | number]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string | number",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[value: string | number, event: Event]",
    "typeText": "[value: string | number, event: Event]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string | number",
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
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Radio elements",
    "typeText": "any"
  },
  {
    "name": "label",
    "type": "any",
    "description": "Visible label (the `label` prop)",
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
  "css:Radio": {
    "kind": "cssVars",
    "source": "react/src/components/Radio",
    "vars": [
      {
        "name": "--radio-checked-color",
        "description": "Color of the checked mark (defaults to the color prop's accent)"
      },
      {
        "name": "--radio-dot-color",
        "description": "Color of the inner dot of the checked mark"
      },
      {
        "name": "--radio-border-color",
        "description": "Border of the unchecked mark"
      },
      {
        "name": "--radio-background",
        "description": "Background of the unchecked mark"
      },
      {
        "name": "--radio-size",
        "description": "Width and height of the mark (every size)"
      },
      {
        "name": "--radio-gap",
        "description": "Space between the mark and the label"
      },
      {
        "name": "--radio-label-font-size",
        "description": "Font size of the label (every size)"
      },
      {
        "name": "--radio-group-gap",
        "description": "Space between the radios of a RadioGroup"
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

### apps/docs/src/docs/pages/radio/vue/basic.vue

```vue
<script setup lang="ts">
import { Radio, RadioGroup } from "minerva-design/vue";
</script>
<template>
  <RadioGroup name="fruit" label="Favourite fruit" default-value="apple"
    ><Radio value="apple" label="Apple" /><Radio
      value="banana"
      label="Banana" /><Radio value="cherry" label="Cherry"
  /></RadioGroup>
</template>

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/radio/vue/controlled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Radio, RadioGroup, VStack } from "minerva-design/vue";
const plan = ref<string | number>("pro");
</script>
<template>
  <VStack align="start" :gap="3"
    ><RadioGroup v-model="plan" name="plan" label="Plan"
      ><Radio value="free" label="Free" /><Radio
        value="pro"
        label="Pro" /><Radio value="team" label="Team"
    /></RadioGroup>
    <p role="status">Selected plan: {{ plan }}</p></VStack
  >
</template>

```

## Example: disabled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radio/vue/disabled.vue

```vue
<script setup lang="ts">
import { Radio, RadioGroup, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="start"
    ><RadioGroup
      name="partly-disabled"
      label="Partly disabled"
      default-value="a"
      direction="horizontal"
      ><Radio value="a" label="Available" /><Radio
        value="b"
        label="Sold out"
        disabled /></RadioGroup
    ><RadioGroup
      name="all-disabled"
      label="Disabled group"
      default-value="a"
      direction="horizontal"
      disabled
      ><Radio value="a" label="Option A" /><Radio
        value="b"
        label="Option B" /></RadioGroup
  ></VStack>
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/radio/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { RadioGroup, Radio, FormField } from "minerva-design/vue";
const value = ref<string | number | null>("monthly");
</script>
<template>
  <FormField label="Subscription" required
    ><RadioGroup v-model="value" name="subscription" label="Subscription"
      ><Radio value="monthly" label="Monthly" /><Radio
        value="annual"
        label="Annual" /></RadioGroup></FormField
  ><output>Selected: {{ value }}</output>
</template>

```

## Example: styles-states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radio/vue/styles-states.vue

```vue
<script setup lang="ts">
import { RadioGroup, Radio, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><RadioGroup
      label="Size and color"
      default-value="large"
      direction="horizontal"
      color="success"
      size="large"
      ><Radio value="large" label="Large" /><Radio
        value="disabled"
        label="Unavailable"
        disabled /></RadioGroup
    ><Radio
      label="Invalid choice"
      error
      error-message="Choose an available option"
  /></VStack>
</template>

```
