# TimePicker 時刻選択

時・分・秒の列から時刻を選択するか、直接入力します。

Package: minerva-design@1.23.0

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

入力欄で下矢印キーを押すとパネルが開きます。外側をクリックすると閉じます。

各列（時・分・秒・午前/午後）は listbox です。上下矢印キー、Home、End で列内を移動し、左右矢印キーで列を切り替えます。

Enter または Space でフォーカス中の選択肢を選びます。

Escape でパネルを閉じてフォーカスを入力欄に戻します。最後の列で Tab を押すとパネルが閉じて次のフィールドへ、最初の列で Shift+Tab を押すとパネルが閉じて入力欄に戻ります。

入力したテキストは、完全で有効な時刻になったときだけ確定されます。フォーカスが外れると緩やかな解析が行われ、空のテキストは値をクリアし、解析できないテキストは元の値に戻ります。

## TimePicker

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TimePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "Date | null",
    "required": false,
    "description": "Selected time (controlled, `v-model`). `null` means \"no time\" while\nstaying controlled; `undefined` makes the picker uncontrolled.",
    "typeText": "Date | null"
  },
  {
    "name": "defaultValue",
    "type": "Date",
    "required": false,
    "description": "Initially selected time (uncontrolled)",
    "typeText": "Date"
  },
  {
    "name": "format",
    "type": "string",
    "default": "\"HH:mm:ss\"",
    "required": false,
    "description": "Display format: \"HH:mm:ss\", \"HH:mm\", \"hh:mm:ss a\" or \"hh:mm a\"",
    "typeText": "string"
  },
  {
    "name": "use12Hours",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Uses a 12-hour clock with an AM/PM column",
    "typeText": "boolean"
  },
  {
    "name": "placeholder",
    "type": "string",
    "required": false,
    "description": "Placeholder of the input",
    "typeText": "string"
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Visible label of the input; without it the input is labelled \"Time\" (localized)",
    "typeText": "string"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the input when no visible label is shown (`aria-label`)",
    "typeText": "string"
  },
  {
    "name": "ariaLabelledby",
    "type": "string",
    "required": false,
    "description": "Id(s) of the element(s) labelling the input (`aria-labelledby`); inside\na FormControl it defaults to the FormLabel (unless `label` /\n`aria-label` is set)",
    "typeText": "string"
  },
  {
    "name": "ariaDescribedby",
    "type": "string",
    "required": false,
    "description": "Id(s) of the element(s) describing the input (`aria-describedby`);\nmerged with the helper / error text of an enclosing FormControl",
    "typeText": "string"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "Id of the input; defaults to the id of an enclosing FormControl",
    "typeText": "string"
  },
  {
    "name": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the input as required; defaults to the enclosing FormControl's state",
    "typeText": "boolean"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "required": false,
    "description": "Shows the value without allowing changes (typing, panel, clearing);\ndefaults to the enclosing FormControl's state",
    "typeText": "boolean"
  },
  {
    "name": "invalid",
    "type": "boolean",
    "required": false,
    "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing\nFormControl's state",
    "typeText": "boolean"
  },
  {
    "name": "name",
    "type": "string",
    "default": "\"time-picker\"",
    "required": false,
    "description": "Name of the input",
    "typeText": "string"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the picker; defaults to the enclosing FormControl's state",
    "typeText": "boolean"
  },
  {
    "name": "clearable",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Allows clearing the value with the suffix button",
    "typeText": "boolean"
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\"",
    "default": "\"medium\"",
    "required": false,
    "description": "Size of the input and panel",
    "typeText": "\"medium\" | \"small\" | \"large\""
  },
  {
    "name": "minTime",
    "type": "Date",
    "required": false,
    "description": "Earliest selectable time; earlier options are disabled",
    "typeText": "Date"
  },
  {
    "name": "maxTime",
    "type": "Date",
    "required": false,
    "description": "Latest selectable time; later options are disabled",
    "typeText": "Date"
  },
  {
    "name": "showSecond",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Shows seconds. `false` also removes the seconds token from `format`\n(\"HH:mm:ss\" -> \"HH:mm\"): the format in use is the single source of truth\nof the seconds column, the displayed text and parsing",
    "typeText": "boolean"
  },
  {
    "name": "hourStep",
    "type": "number",
    "default": "1",
    "required": false,
    "description": "Interval between hour options",
    "typeText": "number"
  },
  {
    "name": "minuteStep",
    "type": "number",
    "default": "1",
    "required": false,
    "description": "Interval between minute options",
    "typeText": "number"
  },
  {
    "name": "secondStep",
    "type": "number",
    "default": "1",
    "required": false,
    "description": "Interval between second options",
    "typeText": "number"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[value: Date | null]",
    "typeText": "[value: Date | null]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "Date | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[date: Date | undefined]",
    "typeText": "[date: Date | undefined]",
    "parameters": [
      {
        "name": "date",
        "position": 0,
        "typeText": "Date | undefined",
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
  "css:TimePicker": {
    "kind": "cssVars",
    "source": "react/src/components/TimePicker",
    "vars": [
      {
        "name": "--time-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--time-picker-panel-radius",
        "description": "Corner radius of the panel (defaults to --radius-sm)"
      },
      {
        "name": "--time-picker-panel-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--time-picker-column-width",
        "description": "Width of an hours / minutes / seconds column"
      },
      {
        "name": "--time-picker-column-height",
        "description": "Height of the columns before they scroll"
      },
      {
        "name": "--time-picker-cell-height",
        "description": "Height of a time cell (defaults to the density's small control height)"
      },
      {
        "name": "--time-picker-cell-padding-x",
        "description": "Horizontal padding of a time cell (follows the density's row padding)"
      },
      {
        "name": "--time-picker-selected-background",
        "description": "Background of the selected time cell"
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

### apps/docs/src/docs/pages/time-picker/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { TimePicker, VStack } from "minerva-design/vue";
const time = ref<Date | null>(null);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><TimePicker v-model="time" label="Meeting time" clearable /><output>{{
      time?.toLocaleTimeString() || "No time selected"
    }}</output></VStack
  >
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { TimePicker, FormField } from "minerva-design/vue";
const time = ref<Date | null>(null);
</script>
<template>
  <FormField
    label="Start time"
    required
    :invalid="!time"
    error-message="Choose a start time"
    ><TimePicker v-model="time" format="HH:mm" :show-second="false"
  /></FormField>
</template>

```

## Example: formats

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/vue/formats.vue

```vue
<script setup lang="ts">
import { TimePicker, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><TimePicker
      label="24-hour clock"
      format="HH:mm"
      :show-second="false" /><TimePicker
      label="12-hour clock"
      format="hh:mm a"
      use12-hours
      :show-second="false"
  /></HStack>
</template>

```

## Example: range-steps

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/vue/range-steps.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { TimePicker } from "minerva-design/vue";
const min = new Date(2026, 0, 1, 9);
const max = new Date(2026, 0, 1, 17);
const time = ref<Date | null>(new Date(2026, 0, 1, 10, 30));
</script>
<template>
  <TimePicker
    v-model="time"
    label="Office hours"
    :min-time="min"
    :max-time="max"
    :minute-step="15"
    :show-second="false"
    format="HH:mm"
  />
</template>

```
