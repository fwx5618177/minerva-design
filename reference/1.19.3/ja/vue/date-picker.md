# DatePicker 日付選択

ポップアップの月曜始まりカレンダーグリッドから日付を選択するか、YYYY-MM-DD 形式で直接入力します。

Package: minerva-design@1.19.3

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

入力欄で下矢印キーを押すとポップアップカレンダーが開き、アクティブな日のセルにフォーカスが移動します。外側をクリックすると閉じます。

矢印キー、Home / End、PageUp / PageDown（Shift 併用で 1 年）でカレンダーグリッド内のフォーカスを移動します。

Enter または Space でフォーカス中の日を選択し、ポップアップを閉じます。

Escape でポップアップを閉じてフォーカスを入力欄に戻します。

入力したテキストが範囲内の完全な YYYY-MM-DD 日付になると即座に確定されます。フォーカスが外れると YYYY/M/D などの柔軟な形式も正規化されます。

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

## Example: 基本的な使い方

v-model に YYYY-MM-DD 文字列または null をバインドし、日付の選択、入力、クリアを行います。

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

## Example: フォームフィールド

FormControl のラベル、必須状態、補足テキストを継承します。

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

## Example: 日付範囲

10 月 10 日から 10 月 20 日までの日付を選択できます。

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

## Example: サイズと状態

小サイズ、読み取り専用、無効、クリア不可のフィールドを表示します。

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
