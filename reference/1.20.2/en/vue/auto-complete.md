# AutoComplete

A text input that suggests matching options while the user types.

Package: minerva-design@1.20.2

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### Keyboard and accessibility

Arrow Down / Arrow Up move through the visible options (wrapping around).

Enter selects the active option (disabled options are skipped) without submitting the surrounding form.

Escape closes the dropdown and keeps focus in the input; with the dropdown already closed it clears the text (onChange receives ""). Inside a Modal or Popover only the dropdown closes.

The input exposes the combobox role with aria-expanded, aria-controls and aria-activedescendant pointing to the listbox options.

## AutoComplete

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "AutoComplete"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the input",
    "typeText": "string"
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Label of the input (without it, give the input an accessible name with\ninputProps[\"aria-label\"] or an enclosing FormControl label)",
    "typeText": "string"
  },
  {
    "name": "mode",
    "type": "\"basic\" | \"custom\"",
    "default": "\"basic\"",
    "required": false,
    "description": "\"basic\" renders icon / label / description; \"custom\" uses the `option`\nslot",
    "typeText": "\"basic\" | \"custom\""
  },
  {
    "name": "modelValue",
    "type": "string",
    "required": false,
    "description": "Input text (controlled, `v-model`)",
    "typeText": "string"
  },
  {
    "name": "options",
    "type": "AutoCompleteOption[]",
    "default": "[]",
    "required": false,
    "description": "Options to suggest",
    "typeText": "AutoCompleteOption[]"
  },
  {
    "name": "defaultValue",
    "type": "string",
    "required": false,
    "description": "Initial input value (uncontrolled)",
    "typeText": "string"
  },
  {
    "name": "groupBy",
    "type": "((option: AutoCompleteOption) => string)",
    "required": false,
    "description": "Returns the group name of an option; options are grouped under headings",
    "typeText": "((option: AutoCompleteOption) => string)"
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a loading indicator in the dropdown",
    "typeText": "boolean"
  },
  {
    "name": "inputProps",
    "type": "Record<string, unknown>",
    "required": false,
    "description": "Props / attributes forwarded to the underlying Input (native\nattributes, aria-label, size, variant, prefix / suffix, clearable,\ndisabled, readOnly, listeners...)",
    "typeText": "Record<string, unknown>"
  },
  {
    "name": "emptyProps",
    "type": "Partial<EmptyProps>",
    "required": false,
    "description": "Props forwarded to the default Empty state",
    "typeText": "Partial<EmptyProps>"
  },
  {
    "name": "dropdownClassName",
    "type": "string",
    "required": false,
    "description": "Additional class name of the dropdown (teleported) element. It can set\nthe CSS custom properties `--auto-complete-dropdown-background`,\n`--auto-complete-option-hover-background` and\n`--auto-complete-option-highlight-background`",
    "typeText": "string"
  },
  {
    "name": "placement",
    "type": "\"bottom\" | \"top\" | \"left\" | \"right\"",
    "default": "\"bottom\"",
    "required": false,
    "description": "Preferred dropdown side; the dropdown is aligned with the input's start\nedge, is at least as wide as the input, and flips / shifts to stay in the\nviewport",
    "typeText": "\"bottom\" | \"top\" | \"left\" | \"right\""
  },
  {
    "name": "offset",
    "type": "{ x: number; y: number; }",
    "default": "{ x: 0, y: 4 }",
    "required": false,
    "description": "Dropdown offset in pixels. For top / bottom placements `y` is the gap to\nthe input and `x` shifts along it; for left / right placements `x` is\nthe gap and `y` shifts along it",
    "typeText": "{ x: number; y: number; }"
  },
  {
    "name": "animation",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Animates the dropdown when it opens",
    "typeText": "boolean"
  },
  {
    "name": "filterOption",
    "type": "((inputValue: string, option: AutoCompleteOption) => boolean)",
    "required": false,
    "description": "Custom filter; by default options whose label contains the input (case-insensitive) are shown",
    "typeText": "((inputValue: string, option: AutoCompleteOption) => boolean)"
  },
  {
    "name": "sortOption",
    "type": "((a: AutoCompleteOption, b: AutoCompleteOption) => number)",
    "required": false,
    "description": "Compare function used to sort the filtered options",
    "typeText": "((a: AutoCompleteOption, b: AutoCompleteOption) => number)"
  },
  {
    "name": "autoHighlight",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Makes the first enabled option active whenever the dropdown opens or the\noptions change, so Enter picks it right away",
    "typeText": "boolean"
  },
  {
    "name": "fillOnSelect",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Writes the label of the picked option into the input. Set to false to\nkeep the typed text, e.g. when picking navigates away",
    "typeText": "boolean"
  },
  {
    "name": "groupMode",
    "type": "\"first\" | \"adjacent\"",
    "default": "\"first\"",
    "required": false,
    "description": "How groupBy groups options: \"first\" collects each group at its first\nappearance; \"adjacent\" groups runs of consecutive options (a group can\nappear several times). Options whose group is \"\" get no heading",
    "typeText": "\"first\" | \"adjacent\""
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
    "name": "select",
    "type": "[option: AutoCompleteOption]",
    "typeText": "[option: AutoCompleteOption]",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "typeText": "AutoCompleteOption",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "optionClick",
    "type": "[option: AutoCompleteOption]",
    "typeText": "[option: AutoCompleteOption]",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "typeText": "AutoCompleteOption",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "dropdownVisibleChange",
    "type": "[visible: boolean]",
    "typeText": "[visible: boolean]",
    "parameters": [
      {
        "name": "visible",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "submit",
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
    "name": "option",
    "type": "{ option: AutoCompleteOption; }",
    "description": "Custom option content (`mode=\"custom\"`, React `renderOption`)",
    "typeText": "{ option: AutoCompleteOption; }"
  },
  {
    "name": "empty",
    "type": "any",
    "description": "Custom content shown when no option matches (React `renderEmpty`)",
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
  "css:AutoComplete": {
    "kind": "cssVars",
    "source": "react/src/components/AutoComplete",
    "vars": [
      {
        "name": "--auto-complete-dropdown-background",
        "description": "Background of the dropdown"
      },
      {
        "name": "--auto-complete-dropdown-radius",
        "description": "Corner radius of the dropdown (defaults to --radius-lg)"
      },
      {
        "name": "--auto-complete-dropdown-max-height",
        "description": "Maximum height of the option list before it scrolls"
      },
      {
        "name": "--auto-complete-font-size",
        "description": "Font size of the dropdown"
      },
      {
        "name": "--auto-complete-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--auto-complete-option-padding-x",
        "description": "Horizontal padding of an option and of a group label"
      },
      {
        "name": "--auto-complete-option-hover-background",
        "description": "Background of the hovered / keyboard-focused option"
      },
      {
        "name": "--auto-complete-option-highlight-background",
        "description": "Background of options with `highlight: true`"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: appearance

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/vue/appearance.vue

```vue
<script setup lang="ts">
import { AutoComplete, type AutoCompleteOption } from "minerva-design/vue";
const options = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium", highlight: true },
  { label: "High", value: "high" },
];
</script>
<template>
  <div style="padding-top: 160px">
    <AutoComplete
      label="Priority (opens above)"
      :options="options"
      placement="top"
      :offset="{ x: 0, y: 8 }"
      :animation="false"
      dropdown-class-name="vue-priority-dropdown"
    />
  </div>
</template>
<style>
.vue-priority-dropdown {
  --auto-complete-dropdown-background: var(--surface-color);
  --auto-complete-option-highlight-background: var(--warning-color-subtle);
  --auto-complete-option-hover-background: var(--primary-color-subtle);
}
</style>

```

## Example: async-loading

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/vue/async-loading.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete, Button, VStack } from "minerva-design/vue";
const options = [
  {
    label: "Vue",
    value: "vue",
    description: "Progressive framework",
    group: "Frontend",
  },
  {
    label: "Angular",
    value: "angular",
    description: "Application platform",
    group: "Frontend",
  },
  {
    label: "Node.js",
    value: "node",
    description: "JavaScript runtime",
    group: "Backend",
  },
];
const query = ref("");
const loaded = ref(false);
const loading = ref(false);
async function load() {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 500));
  loaded.value = true;
  loading.value = false;
}
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><AutoComplete
      v-model="query"
      label="Remote suggestions"
      :options="loaded ? options : []"
      :loading="loading"
    /><Button @click="load" :loading="loading">Load suggestions</Button></VStack
  >
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete, VStack } from "minerva-design/vue";
const options = [
  {
    label: "Vue",
    value: "vue",
    description: "Progressive framework",
    group: "Frontend",
  },
  {
    label: "Angular",
    value: "angular",
    description: "Application platform",
    group: "Frontend",
  },
  {
    label: "Node.js",
    value: "node",
    description: "JavaScript runtime",
    group: "Backend",
  },
];
const query = ref("");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><AutoComplete
      v-model="query"
      label="Framework"
      :options="options"
    /><output>Search: {{ query }}</output></VStack
  >
</template>

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/vue/controlled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete, type AutoCompleteOption } from "minerva-design/vue";
const text = ref("");
const selected = ref<string | number>("none");
const open = ref(false);
const options = [
  { label: "Paris", value: "par" },
  { label: "London", value: "lon" },
  { label: "Tokyo", value: "tyo" },
];
</script>
<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <AutoComplete
      v-model="text"
      label="City"
      name="city"
      :options="options"
      @select="(option) => (selected = option.value)"
      @dropdown-visible-change="(value) => (open = value)"
    /><output
      >Input: {{ text }} · Selected: {{ selected }} · Dropdown:
      {{ open ? "open" : "closed" }}</output
    >
  </div>
</template>

```

## Example: custom-render

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/vue/custom-render.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete, Badge } from "minerva-design/vue";
const options = [
  {
    label: "Vue",
    value: "vue",
    description: "Progressive framework",
    group: "Frontend",
  },
  {
    label: "Angular",
    value: "angular",
    description: "Application platform",
    group: "Frontend",
  },
  {
    label: "Node.js",
    value: "node",
    description: "JavaScript runtime",
    group: "Backend",
  },
];
const query = ref("");
</script>
<template>
  <AutoComplete
    v-model="query"
    label="Custom suggestions"
    :options="options"
    mode="custom"
    ><template #option="{ option }"
      ><strong>{{ option.label }}</strong> <Badge>{{ option.group }}</Badge>
      <p>{{ option.description }}</p></template
    ></AutoComplete
  >
</template>

```

## Example: filter-sort

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/vue/filter-sort.vue

```vue
<script setup lang="ts">
import { AutoComplete, type AutoCompleteOption } from "minerva-design/vue";
const options = [
  { label: "Germany", value: "de" },
  { label: "Denmark", value: "dk" },
  { label: "France", value: "fr" },
  { label: "Finland", value: "fi" },
  { label: "Greece", value: "gr" },
];
const filter = (text: string, option: AutoCompleteOption) =>
  option.label.toLowerCase().startsWith(text.toLowerCase());
const sort = (a: AutoCompleteOption, b: AutoCompleteOption) =>
  a.label.localeCompare(b.label);
</script>
<template>
  <AutoComplete
    label="Country (starts with)"
    :options="options"
    :filter-option="filter"
    :sort-option="sort"
  />
</template>

```

## Example: grouped

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/vue/grouped.vue

```vue
<script setup lang="ts">
import { AutoComplete, type AutoCompleteOption } from "minerva-design/vue";
const options = [
  { label: "Apple", value: "apple", group: "Fruits" },
  { label: "Carrot", value: "carrot", group: "Vegetables" },
  { label: "Banana", value: "banana", group: "Fruits" },
  { label: "Almond", value: "almond", group: "Nuts" },
];
</script>
<template>
  <div style="display: grid; gap: 16px">
    <AutoComplete
      label="Collect matching groups"
      :options="options"
      :group-by="(option) => option.group ?? 'Other'"
      group-mode="first"
    /><AutoComplete
      label="Preserve adjacent groups"
      :options="options"
      :group-by="(option) => option.group ?? 'Other'"
      group-mode="adjacent"
    />
  </div>
</template>

```

## Example: rich-options

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/vue/rich-options.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete } from "minerva-design/vue";
const options = [
  {
    label: "Vue",
    value: "vue",
    description: "Progressive framework",
    group: "Frontend",
  },
  {
    label: "Angular",
    value: "angular",
    description: "Application platform",
    group: "Frontend",
  },
  {
    label: "Node.js",
    value: "node",
    description: "JavaScript runtime",
    group: "Backend",
  },
];
const query = ref("");
</script>
<template>
  <AutoComplete
    v-model="query"
    label="Technology"
    :options="options"
    :group-by="(option) => option.group || 'Other'"
    auto-highlight
  />
</template>

```

## Example: search-box

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/vue/search-box.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete, type AutoCompleteOption } from "minerva-design/vue";
const query = ref("");
const result = ref("");
const options = [
  { label: "Lord of the Mysteries", value: "1", description: "Cuttlefish" },
  { label: "Sword of Coming", value: "2", description: "Fenghuo" },
  { label: "A Record of a Mortal", value: "3", description: "Wangyu" },
];
</script>
<template>
  <div style="display: grid; gap: 8px">
    <AutoComplete
      v-model="query"
      :options="options"
      auto-highlight
      :fill-on-select="false"
      :input-props="{
        'aria-label': 'Search books',
        placeholder: 'Title or author',
        clearable: true,
      }"
      :filter-option="
        (text, option) =>
          (option.label + option.description)
            .toLowerCase()
            .includes(text.toLowerCase())
      "
      @select="(book) => (result = `Open book #${book.value}`)"
      @submit="(text) => (result = `Search for ${text}`)"
    /><output>{{ result }}</output>
  </div>
</template>

```
