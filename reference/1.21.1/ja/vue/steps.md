# Steps ステップ

ワークフローの段階を表示し、段階間を移動できるようにします。

Package: minerva-design@1.21.1

Renderer: vue

Locale: ja

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

## Steps

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Steps"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "type": "StepsItem[]",
    "required": true,
    "description": "Steps, in order",
    "typeText": "StepsItem[]"
  },
  {
    "name": "modelValue",
    "type": "string",
    "required": false,
    "description": "Value of the current step (controlled: `v-model`)",
    "typeText": "string"
  },
  {
    "name": "defaultValue",
    "type": "string",
    "required": false,
    "description": "Value of the initial current step (uncontrolled)",
    "typeText": "string"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "required": false,
    "description": "Renders the steps as a read-only progress indicator: plain list items\nwithout buttons, the current <li> marked aria-current=\"step\"",
    "typeText": "boolean"
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
    "name": "label",
    "type": "{ item: StepsItem; index: number; }",
    "description": "Label of a step (defaults to `item.label`)",
    "typeText": "{ item: StepsItem; index: number; }"
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
  "css:Steps": {
    "kind": "cssVars",
    "source": "react/src/components/Steps",
    "vars": [
      {
        "name": "--steps-gap",
        "description": "Space between the steps (row and column gap)"
      },
      {
        "name": "--steps-font-size",
        "description": "Font size of the labels"
      },
      {
        "name": "--steps-indicator-size",
        "description": "Diameter of the numbered indicator"
      },
      {
        "name": "--steps-accent-color",
        "description": "Color of the current / completed indicators (defaults to --primary-color)"
      },
      {
        "name": "--steps-current-background",
        "description": "Background of the current step's indicator"
      },
      {
        "name": "--steps-connector-color",
        "description": "Color of the line joining the upcoming steps (defaults to --border-color)"
      },
      {
        "name": "--steps-connector-complete-color",
        "description": "Color of the line after a completed step (defaults to the accent color)"
      },
      {
        "name": "--steps-connector-min-width",
        "description": "Minimum length of the line joining two steps"
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

### apps/docs/src/docs/pages/steps/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Steps } from "minerva-design/vue";
const step = ref("review");
const items = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "publish", label: "Publish", disabled: true },
];
</script>
<template><Steps v-model="step" :items="items" /></template>

```

## Example: navigable

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/steps/vue/navigable.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Steps, VStack } from "minerva-design/vue";
const value = ref("details");
const items = [
  { value: "details", label: "Details" },
  { value: "review", label: "Review" },
  { value: "publish", label: "Publish", disabled: true },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Steps v-model="value" :items="items" /><output
      >Current step: {{ value }}</output
    ></VStack
  >
</template>

```

## Example: styling

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/steps/vue/styling.vue

```vue
<script setup lang="ts">
import { Steps } from "minerva-design/vue";
const items = [
  { value: "details", label: "Details" },
  { value: "review", label: "Review" },
  { value: "complete", label: "Complete" },
];
</script>
<template>
  <Steps model-value="review" :items="items" read-only
    ><template #label="{ item, index }"
      ><strong>{{ index + 1 }} · {{ item.label }}</strong></template
    ></Steps
  >
</template>

```
