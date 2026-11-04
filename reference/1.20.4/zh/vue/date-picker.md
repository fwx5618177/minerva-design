# DatePicker 日期选择器

从弹出式周一始月历网格中选择日期，或直接输入 YYYY-MM-DD 格式日期。

Package: minerva-design@1.20.4

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘与无障碍

在输入框上按向下箭头可打开弹出日历并将焦点移至当前活动日期单元格；点击外部关闭日历。

方向键、Home / End 与 PageUp / PageDown（按住 Shift 为一年）在日历网格中移动焦点。

Enter 或 Space 选择当前聚焦的日期并关闭弹出层。

Escape 关闭弹出日历并把焦点还给输入框。

输入的文本在构成完整且在范围内的 YYYY-MM-DD 日期时会立即提交；失焦时会自动规范化 YYYY/M/D 等宽松格式。

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

## Example: 基础用法

使用 v-model 绑定 YYYY-MM-DD 字符串或 null，可选择、输入或清空日期。

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

## Example: 表单字段

继承 FormControl 的标签、必填状态和辅助文本。

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

## Example: 日期范围

仅允许选择 10 月 10 日至 10 月 20 日的日期。

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

## Example: 尺寸与状态

展示小尺寸、只读、禁用及不可清空的日期字段。

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
