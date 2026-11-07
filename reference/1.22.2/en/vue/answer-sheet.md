# AnswerSheet

A question navigator (答题卡) for practice and exam sessions: numbered pills grouped by section, each showing whether the question is unanswered, answered, correct, wrong or skipped, with a flag for review and the current question highlighted.

Package: minerva-design@1.22.2

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## AnswerSheet

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "AnswerSheet"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "type": "readonly AnswerSheetItem[]",
    "required": true,
    "description": "The questions, in order",
    "typeText": "readonly AnswerSheetItem[]"
  },
  {
    "name": "groups",
    "type": "readonly AnswerSheetGroup[]",
    "required": false,
    "description": "Titled sections, in display order; items render under the group whose\nkey matches `item.group`",
    "typeText": "readonly AnswerSheetGroup[]"
  },
  {
    "name": "modelValue",
    "type": "string",
    "required": false,
    "description": "Key of the current question (controlled, `v-model`)",
    "typeText": "string"
  },
  {
    "name": "defaultValue",
    "type": "string",
    "required": false,
    "description": "Key of the initially current question (uncontrolled)",
    "typeText": "string"
  },
  {
    "name": "size",
    "type": "AnswerSheetSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Density of the pills",
    "typeText": "AnswerSheetSize"
  },
  {
    "name": "layout",
    "type": "AnswerSheetLayout",
    "default": "\"wrap\"",
    "required": false,
    "description": "\"wrap\" wraps the pills on several rows; \"scroll\" keeps a single\nhorizontally scrolling row",
    "typeText": "AnswerSheetLayout"
  },
  {
    "name": "columns",
    "type": "number",
    "required": false,
    "description": "Fixed number of columns (a grid; ArrowUp / ArrowDown move by a row).\nIgnored with layout=\"scroll\".",
    "typeText": "number"
  },
  {
    "name": "showLegend",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a legend of the statuses present (and of the flag)",
    "typeText": "boolean"
  },
  {
    "name": "showSummary",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the number of answered questions (\"12 / 20 answered\")",
    "typeText": "boolean"
  },
  {
    "name": "getItemLabel",
    "type": "((item: AnswerSheetItem, index: number) => string)",
    "required": false,
    "description": "Accessible name of a pill; receives the item and its display index",
    "typeText": "((item: AnswerSheetItem, index: number) => string)"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the whole sheet",
    "typeText": "boolean"
  },
  {
    "name": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible name of the navigation landmark",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[key: string]",
    "typeText": "[key: string]",
    "parameters": [
      {
        "name": "key",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[key: string]",
    "typeText": "[key: string]",
    "parameters": [
      {
        "name": "key",
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
  "css:AnswerSheet": {
    "kind": "cssVars",
    "source": "react/src/components/AnswerSheet",
    "vars": [
      {
        "name": "--answer-sheet-gap",
        "description": "Space between the pills (defaults to --space-2; --space-1-5 with size=\"small\")"
      },
      {
        "name": "--answer-sheet-item-size",
        "description": "Minimum width and height of a pill (defaults to 2rem; 1.75rem with size=\"small\")"
      },
      {
        "name": "--answer-sheet-radius",
        "description": "Corner radius of the pills (defaults to --radius-md)"
      },
      {
        "name": "--answer-sheet-item-background",
        "description": "Background of an unanswered pill"
      },
      {
        "name": "--answer-sheet-answered-background",
        "description": "Background of an answered pill (defaults to --primary-color-subtle)"
      },
      {
        "name": "--answer-sheet-answered-color",
        "description": "Text color of an answered pill"
      },
      {
        "name": "--answer-sheet-correct-background",
        "description": "Background of a correct pill (defaults to --success-color-subtle)"
      },
      {
        "name": "--answer-sheet-correct-color",
        "description": "Text color of a correct pill"
      },
      {
        "name": "--answer-sheet-wrong-background",
        "description": "Background of a wrong pill (defaults to --danger-color-subtle)"
      },
      {
        "name": "--answer-sheet-wrong-color",
        "description": "Text color of a wrong pill"
      },
      {
        "name": "--answer-sheet-current-background",
        "description": "Background of the current pill (defaults to --primary-color)"
      },
      {
        "name": "--answer-sheet-current-color",
        "description": "Text color of the current pill"
      },
      {
        "name": "--answer-sheet-flag-color",
        "description": "Color of the flag dot (defaults to --warning-color)"
      },
      {
        "name": "--answer-sheet-title-color",
        "description": "Text color of the group titles and the summary"
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

### apps/docs/src/docs/pages/answer-sheet/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { AnswerSheet, VStack } from "minerva-design/vue";
const items = Array.from({ length: 12 }, (_, i) => ({
  key: `q${i + 1}`,
  status: i < 5 ? ("answered" as const) : ("unanswered" as const),
}));
const value = ref("q6");
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 420px"
    ><AnswerSheet v-model="value" :items="items" /><output
      >Current question: {{ value.slice(1) }}</output
    ></VStack
  >
</template>

```

## Example: groups

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/vue/groups.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  AnswerSheet,
  VStack,
  type AnswerSheetGroup,
  type AnswerSheetItem,
} from "minerva-design/vue";
const groups: AnswerSheetGroup[] = [
  { key: "single", title: "Single choice" },
  { key: "multiple", title: "Multiple choice" },
  { key: "short", title: "Short answer" },
];
const items: AnswerSheetItem[] = [
  { key: "s1", group: "single", status: "correct" },
  { key: "s2", group: "single", status: "correct" },
  { key: "s3", group: "single", status: "wrong", flagged: true },
  { key: "s4", group: "single", status: "correct" },
  { key: "s5", group: "single", status: "skipped" },
  { key: "s6", group: "single", status: "correct" },
  { key: "m1", group: "multiple", status: "wrong" },
  { key: "m2", group: "multiple", status: "correct" },
  { key: "m3", group: "multiple", status: "answered", flagged: true },
  { key: "a1", group: "short", status: "answered" },
  { key: "a2", group: "short" },
  { key: "a3", group: "short", disabled: true },
];
const value = ref("s3");
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 420px"
    ><AnswerSheet
      v-model="value"
      :items="items"
      :groups="groups"
      show-summary
      show-legend
      aria-label="Review questions"
    /><output>Reviewing: {{ value }}</output></VStack
  >
</template>

```

## Example: scroll

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/vue/scroll.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { AnswerSheet, VStack, type AnswerSheetItem } from "minerva-design/vue";
const items: AnswerSheetItem[] = Array.from({ length: 40 }, (_, i) => ({
  key: `q${i + 1}`,
  status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
  flagged: i === 8,
}));
const value = ref("q16");
</script>
<template>
  <VStack :gap="3" align="stretch" style="width: 100%; max-width: 360px"
    ><AnswerSheet
      v-model="value"
      :items="items"
      layout="scroll"
      size="small"
    /><output>Current question: {{ value.slice(1) }}</output></VStack
  >
</template>

```

## Example: sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/vue/sizes.vue

```vue
<script setup lang="ts">
import { AnswerSheet, VStack, type AnswerSheetItem } from "minerva-design/vue";
const items: AnswerSheetItem[] = Array.from({ length: 10 }, (_, i) => ({
  key: `q${i + 1}`,
  status: i < 4 ? "answered" : "unanswered",
}));
</script>
<template>
  <VStack :gap="6" align="stretch" style="max-width: 420px"
    ><AnswerSheet
      :items="items"
      size="small"
      default-value="q5"
      aria-label="Small sheet" /><AnswerSheet
      :items="items"
      :columns="5"
      default-value="q5"
      aria-label="Five columns" /><AnswerSheet
      :items="items"
      disabled
      aria-label="Disabled sheet"
  /></VStack>
</template>

```
