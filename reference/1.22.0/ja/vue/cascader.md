# Cascader カスケード選択

階層化された選択肢から段階的に値を選択します（例：国 / 地域 / 都市）。

Package: minerva-design@1.22.0

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

入力欄で Enter、Space、下矢印キーを押すとパネルが開き、フォーカスがパネル内へ移ります。入力欄にフォーカスするだけでは開きません。

上下矢印キー、Home、End で列内を移動します。

右矢印キーまたは Enter で次の列を展開し（遅延読み込み後も同様）、Enter で末端の選択肢を選びます。左矢印キーで前の列に戻ります。

Escape でパネルを閉じてフォーカスを入力欄に戻します。Tab でも閉じます。

入力欄は combobox ロールを持ちます。既定のプレースホルダーと "Clear selection"（選択をクリア）ボタンのラベルは React 版のロケールに従います。

## Cascader

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Cascader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "type": "string",
    "required": true,
    "description": "Label of the input",
    "typeText": "string"
  },
  {
    "name": "name",
    "type": "string",
    "required": true,
    "description": "Name of the input",
    "typeText": "string"
  },
  {
    "name": "options",
    "type": "CascaderOption[]",
    "default": "[]",
    "required": true,
    "description": "Option tree",
    "typeText": "CascaderOption[]"
  },
  {
    "name": "modelValue",
    "type": "CascaderValue",
    "required": false,
    "description": "Selected path of values (controlled, `v-model`)",
    "typeText": "CascaderValue"
  },
  {
    "name": "defaultValue",
    "type": "CascaderValue",
    "required": false,
    "description": "Initially selected path of values (uncontrolled)",
    "typeText": "CascaderValue"
  },
  {
    "name": "displayRender",
    "type": "((labels: string[], selectedOptions: CascaderOption[]) => string)",
    "required": false,
    "description": "Formats the text shown in the input; by default labels are joined with \" / \"",
    "typeText": "((labels: string[], selectedOptions: CascaderOption[]) => string)"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the cascader; defaults to the enclosing FormControl's state",
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
    "name": "allowClear",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Shows a clear button when a value is selected",
    "typeText": "boolean"
  },
  {
    "name": "expandTrigger",
    "type": "\"hover\" | \"click\"",
    "default": "\"click\"",
    "required": false,
    "description": "How sub-menus are expanded",
    "typeText": "\"hover\" | \"click\""
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the input (`aria-label`); overrides `label` and the\nlabel of an enclosing FormControl",
    "typeText": "string"
  },
  {
    "name": "ariaLabelledby",
    "type": "string",
    "required": false,
    "description": "Id(s) of the element(s) labelling the input (`aria-labelledby`)",
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
    "description": "Marks the input as required (aria-required); defaults to the enclosing\nFormControl's state",
    "typeText": "boolean"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "required": false,
    "description": "Shows the value without allowing changes (the dropdown does not open);\ndefaults to the enclosing FormControl's state",
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
    "name": "showSearch",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Allows typing to search all paths",
    "typeText": "boolean"
  },
  {
    "name": "filter",
    "type": "((inputValue: string, path: CascaderOption[]) => boolean)",
    "required": false,
    "description": "Custom search predicate; by default paths whose labels contain the input match",
    "typeText": "((inputValue: string, path: CascaderOption[]) => boolean)"
  },
  {
    "name": "loadData",
    "type": "((selectedOptions: CascaderOption[]) => void)",
    "required": false,
    "description": "Loads children lazily: clicking an option that has no children and is\nnot isLeaf expands it and calls loadData with its path (instead of\nselecting it). Add the children to `options` yourself; set `loading` on\nthe option meanwhile",
    "typeText": "((selectedOptions: CascaderOption[]) => void)"
  },
  {
    "name": "dropdownClassName",
    "type": "ClassValue",
    "required": false,
    "description": "Additional class name of the dropdown",
    "typeText": "ClassValue"
  },
  {
    "name": "width",
    "type": "string | number",
    "default": "240",
    "required": false,
    "description": "Width of the component",
    "typeText": "string | number"
  },
  {
    "name": "maxLevel",
    "type": "number",
    "default": "6",
    "required": false,
    "description": "Maximum number of levels shown",
    "typeText": "number"
  },
  {
    "name": "dropdownStyle",
    "type": "CSSProperties",
    "required": false,
    "description": "Inline styles of the dropdown",
    "typeText": "CSSProperties"
  },
  {
    "name": "optionStyle",
    "type": "CSSProperties",
    "required": false,
    "description": "Inline styles of every option",
    "typeText": "CSSProperties"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[value: CascaderValue]",
    "typeText": "[value: CascaderValue]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "CascaderValue",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[value: CascaderValue, selectedOptions: CascaderOption[]]",
    "typeText": "[value: CascaderValue, selectedOptions: CascaderOption[]]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "CascaderValue",
        "required": true,
        "rest": false
      },
      {
        "name": "selectedOptions",
        "position": 1,
        "typeText": "CascaderOption[]",
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
    "name": "option",
    "type": "{ option: CascaderOption; level: number; }",
    "description": "Custom option content (the React `optionRender`)",
    "typeText": "{ option: CascaderOption; level: number; }"
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
  "css:Cascader": {
    "kind": "cssVars",
    "source": "react/src/components/Cascader",
    "vars": [
      {
        "name": "--cascader-height",
        "description": "Minimum height of the field (defaults to the density's small control height)"
      },
      {
        "name": "--cascader-radius",
        "description": "Corner radius of the field, the dropdown and the options (defaults to --radius-sm)"
      },
      {
        "name": "--cascader-font-size",
        "description": "Font size of the field and of the options"
      },
      {
        "name": "--cascader-border-color",
        "description": "Border color of the field at rest"
      },
      {
        "name": "--cascader-column-min-width",
        "description": "Minimum width of a column of options"
      },
      {
        "name": "--cascader-dropdown-max-height",
        "description": "Maximum height of the columns before they scroll"
      },
      {
        "name": "--cascader-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--cascader-option-padding-x",
        "description": "Horizontal padding of an option (follows the density's row padding)"
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

### apps/docs/src/docs/pages/cascader/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Cascader, VStack } from "minerva-design/vue";
const options = [
  {
    value: "eu",
    label: "Europe",
    children: [
      { value: "fr", label: "France" },
      { value: "de", label: "Germany" },
    ],
  },
  {
    value: "asia",
    label: "Asia",
    children: [
      { value: "jp", label: "Japan" },
      { value: "sg", label: "Singapore" },
    ],
  },
];
const value = ref<(string | number)[]>([]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Cascader
      v-model="value"
      :options="options"
      label="Region"
      name="region"
    /><output>{{ value.join(" / ") }}</output></VStack
  >
</template>

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/vue/controlled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Cascader, Button } from "minerva-design/vue";
const options = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [{ value: "lyon", label: "Lyon" }],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama", disabled: true },
        ],
      },
    ],
  },
];
const value = ref<(string | number)[]>(["fr", "idf", "paris"]);
</script>
<template>
  <div style="display: grid; gap: 12px">
    <Cascader
      v-model="value"
      name="controlled-city"
      label="Controlled city"
      :options="options"
    /><Button variant="outline" @click="value = ['jp', 'kanto', 'tokyo']"
      >Choose Tokyo externally</Button
    ><output>{{ value.join(" / ") || "No city selected" }}</output>
  </div>
</template>

```

## Example: custom-option

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/vue/custom-option.vue

```vue
<script setup lang="ts">
import { Cascader, Button } from "minerva-design/vue";
const options = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [{ value: "lyon", label: "Lyon" }],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama", disabled: true },
        ],
      },
    ],
  },
];
</script>
<template>
  <Cascader
    name="region-custom"
    label="Region (two levels)"
    :options="options"
    :max-level="2"
    :dropdown-style="{ minWidth: '360px' }"
    :option-style="{ fontWeight: 500 }"
    ><template #option="{ option, level }"
      ><span style="display: inline-flex; gap: 8px"
        ><span aria-hidden="true">{{ level === 0 ? "◎" : "⌖" }}</span
        >{{ option.label }}</span
      ></template
    ></Cascader
  >
</template>

```

## Example: default-value

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/vue/default-value.vue

```vue
<script setup lang="ts">
import { Cascader, Button } from "minerva-design/vue";
const options = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [{ value: "lyon", label: "Lyon" }],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama", disabled: true },
        ],
      },
    ],
  },
];
</script>
<template>
  <Cascader
    name="initial-city"
    label="Initially selected city"
    :options="options"
    :default-value="['fr', 'idf', 'paris']"
  />
</template>

```

## Example: disabled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/vue/disabled.vue

```vue
<script setup lang="ts">
import { Cascader, Button } from "minerva-design/vue";
const options = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [{ value: "lyon", label: "Lyon" }],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama", disabled: true },
        ],
      },
    ],
  },
];
</script>
<template>
  <div style="display: grid; gap: 16px">
    <Cascader
      name="disabled-city"
      label="Disabled city"
      :options="options"
      :default-value="['fr', 'idf', 'paris']"
      disabled
    /><Cascader
      name="locked-city"
      label="Read-only city"
      :options="options"
      :default-value="['jp', 'kanto', 'tokyo']"
      read-only
    /><Cascader
      name="available-city"
      label="Disabled leaf (Yokohama)"
      :options="options"
    />
  </div>
</template>

```

## Example: display-render

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/vue/display-render.vue

```vue
<script setup lang="ts">
import { Cascader, Button } from "minerva-design/vue";
const options = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [{ value: "lyon", label: "Lyon" }],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama", disabled: true },
        ],
      },
    ],
  },
];
</script>
<template>
  <Cascader
    name="city-display"
    label="City (last level only)"
    :options="options"
    :default-value="['fr', 'ara', 'lyon']"
    :display-render="(labels) => labels.at(-1) ?? ''"
    :allow-clear="false"
  />
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Cascader, FormField } from "minerva-design/vue";
const options = [
  {
    value: "eu",
    label: "Europe",
    children: [
      { value: "fr", label: "France" },
      { value: "de", label: "Germany" },
    ],
  },
  {
    value: "asia",
    label: "Asia",
    children: [
      { value: "jp", label: "Japan" },
      { value: "sg", label: "Singapore" },
    ],
  },
];
const value = ref<(string | number)[]>([]);
</script>
<template>
  <FormField
    label="Shipping region"
    required
    :invalid="!value.length"
    error-message="Select a region"
    ><Cascader
      v-model="value"
      :options="options"
      label="Shipping region"
      name="shipping"
  /></FormField>
</template>

```

## Example: lazy

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/vue/lazy.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Cascader } from "minerva-design/vue";
import type { CascaderOption } from "minerva-design/vue";
const options = ref<CascaderOption[]>([{ value: "eu", label: "Europe" }]);
async function load(path: CascaderOption[]) {
  const item = path[path.length - 1]!;
  item.loading = true;
  await new Promise((resolve) => setTimeout(resolve, 400));
  item.children = [
    { value: "fr", label: "France", isLeaf: true },
    { value: "de", label: "Germany", isLeaf: true },
  ];
  item.loading = false;
}
</script>
<template>
  <Cascader
    :options="options"
    label="Lazy locations"
    name="lazy-location"
    :load-data="load"
  />
</template>

```

## Example: search-hover

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/vue/search-hover.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Cascader } from "minerva-design/vue";
const options = [
  {
    value: "eu",
    label: "Europe",
    children: [
      { value: "fr", label: "France" },
      { value: "de", label: "Germany" },
    ],
  },
  {
    value: "asia",
    label: "Asia",
    children: [
      { value: "jp", label: "Japan" },
      { value: "sg", label: "Singapore" },
    ],
  },
];
const value = ref<(string | number)[]>([]);
</script>
<template>
  <Cascader
    v-model="value"
    :options="options"
    label="Search locations"
    name="location"
    show-search
    expand-trigger="hover"
  />
</template>

```
