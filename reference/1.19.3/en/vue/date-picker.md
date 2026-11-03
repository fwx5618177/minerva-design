# DatePicker

Picks a calendar date from a popup Monday-first month grid, or by typing a YYYY-MM-DD date.

Package: minerva-design@1.19.3

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Keyboard and accessibility

Arrow Down on the input opens the popup calendar and moves focus to the active day cell; clicking outside closes it.

Arrow keys, Home / End and PageUp / PageDown (with Shift: a year) move focus across the calendar grid.

Enter or Space picks the focused day and closes the popup.

Escape closes the popup and returns focus to the input.

Typed text is committed immediately when it forms a complete YYYY-MM-DD date within range; on blur, flexible formats like YYYY/M/D are normalized.

## DatePicker

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DatePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "string | null",
    "required": false,
    "typeText": "string | null"
  },
  {
    "name": "defaultValue",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "placeholder",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "ariaLabelledby",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "ariaDescribedby",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "required",
    "type": "boolean",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "invalid",
    "type": "boolean",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "name",
    "type": "string",
    "default": "\"date-picker\"",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "clearable",
    "type": "boolean",
    "default": "true",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\"",
    "default": "\"medium\"",
    "required": false,
    "typeText": "\"medium\" | \"small\" | \"large\""
  },
  {
    "name": "minDate",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "maxDate",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
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
  "css:DatePicker": {
    "kind": "cssVars",
    "source": "react/src/components/DatePicker",
    "vars": [
      {
        "name": "--date-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--date-picker-panel-width",
        "description": "Width of the popup calendar panel"
      },
      {
        "name": "--date-picker-panel-radius",
        "description": "Corner radius of the popup panel (defaults to --radius-lg)"
      },
      {
        "name": "--date-picker-panel-padding",
        "description": "Inner padding of the popup panel"
      },
      {
        "name": "--date-picker-cell-size",
        "description": "Width and height of a day cell in the popup grid"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Bind v-model to a YYYY-MM-DD string or null. Choose a date, type it, or clear the field.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { DatePicker, VStack } from "minerva-design/vue";
const date = ref<string | null>(null);
</script>
<template>
  <VStack :gap="3" align="stretch">
    <DatePicker v-model="date" label="Meeting date" />
    <output>{{ date || "No date selected" }}</output>
  </VStack>
</template>

```

## Example: Form field

Inherits the label, required state and helper text from FormControl.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  DatePicker,
  FormControl,
  FormLabel,
  FormHelperText,
} from "minerva-design/vue";
const date = ref<string | null>(null);
</script>
<template>
  <FormControl id="vue-date-picker-birthday" required>
    <FormLabel>Birthday</FormLabel>
    <DatePicker v-model="date" />
    <FormHelperText
      >Type YYYY-MM-DD or choose a day from the calendar.</FormHelperText
    >
  </FormControl>
</template>

```

## Example: Date range

Only dates from October 10 through October 20 are selectable.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/vue/range.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { DatePicker, VStack } from "minerva-design/vue";
const date = ref("2026-10-15");
</script>
<template>
  <VStack :gap="3" align="stretch">
    <DatePicker
      v-model="date"
      label="October booking"
      min-date="2026-10-10"
      max-date="2026-10-20"
    />
    <output>{{ date || "Choose a date between October 10 and 20" }}</output>
  </VStack>
</template>

```

## Example: Sizes and states

Small, read-only, disabled, and non-clearable date fields.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/vue/states.vue

```vue
<script setup lang="ts">
import { DatePicker, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch">
    <DatePicker label="Small date" size="small" default-value="2026-10-15" />
    <DatePicker label="Read-only date" default-value="2026-10-15" read-only />
    <DatePicker label="Disabled date" default-value="2026-10-15" disabled />
    <DatePicker
      label="Date without clear button"
      default-value="2026-10-15"
      :clearable="false"
    />
  </VStack>
</template>

```
