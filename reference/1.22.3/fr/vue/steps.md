# Steps

Affiche les étapes d’un processus et permet de passer de l’une à l’autre.

Package: minerva-design@1.22.3

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

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
