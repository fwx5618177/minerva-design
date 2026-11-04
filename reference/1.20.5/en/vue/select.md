# Select

A single-choice dropdown with full keyboard support, groups and form integration.

Package: minerva-design@1.20.5

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### Behavior and accessibility

The trigger is a button with the combobox role (aria-haspopup="listbox"). Click, Enter, Space, Arrow Down / Arrow Up, Home or End open the listbox and focus the selected option (or the first enabled one). Arrow keys move without wrapping and skip disabled options; Home / End and Page Up / Page Down jump. Enter or Space selects, closes and returns focus to the trigger; Escape closes without selecting; Tab closes and continues to the next field.

Typing letters on the closed trigger changes the selection directly, like a native select; while open it moves the highlight. Use textValue on options whose content is not plain text.

The listbox is anchored below the trigger, at least as wide as it, flips above when there is not enough room and scrolls when its options do not fit the viewport. This is the same popper positioning as every other overlay of the library: it is predictable on touch screens and small viewports and keeps the trigger visible. Positioning the list over the trigger with the selected option aligned ("item-aligned") is a macOS idiom and was deliberately not used.

A hidden native select carries name, required and disabled: the value is part of FormData, required takes part in native constraint validation, and resetting the form restores defaultValue. The placeholder shows while the value is undefined or an empty string.

The listbox is portalled into the theme container of the closest ConfigProvider. Inside a Modal or Drawer, Escape closes only the listbox.

## Select

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Select"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "string",
    "required": false,
    "description": "Selected value (controlled, `v-model`)",
    "typeText": "string"
  },
  {
    "name": "defaultValue",
    "type": "string",
    "required": false,
    "description": "Initially selected value (uncontrolled)",
    "typeText": "string"
  },
  {
    "name": "open",
    "type": "boolean",
    "required": false,
    "description": "Whether the popup is open (controlled, `v-model:open`)",
    "typeText": "boolean"
  },
  {
    "name": "defaultOpen",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Whether the popup is initially open (uncontrolled)",
    "typeText": "boolean"
  },
  {
    "name": "placeholder",
    "type": "string",
    "required": false,
    "description": "Text shown in the trigger while nothing is selected (or the `placeholder` slot)",
    "typeText": "string"
  },
  {
    "name": "size",
    "type": "SelectSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Size of the trigger",
    "typeText": "SelectSize"
  },
  {
    "name": "invalid",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the error state (also set by an invalid enclosing FormControl)",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the select. Inherited from an enclosing FormControl when not\nset; an explicit `false` overrides the FormControl",
    "typeText": "boolean"
  },
  {
    "name": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the select as required (inherited from an enclosing FormControl)",
    "typeText": "boolean"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the hidden native select, used in forms",
    "typeText": "string"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "id of the trigger (defaults to the enclosing FormControl's id)",
    "typeText": "string"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the trigger (`aria-label`), required when there is\nno visible label (also names the listbox)",
    "typeText": "string"
  },
  {
    "name": "ariaLabelledby",
    "type": "string",
    "required": false,
    "description": "id(s) of the element(s) labelling the trigger (`aria-labelledby`; also\nnames the listbox)",
    "typeText": "string"
  },
  {
    "name": "ariaDescribedby",
    "type": "string",
    "required": false,
    "description": "Extra ids of elements describing the trigger (`aria-describedby`)",
    "typeText": "string"
  },
  {
    "name": "contentClassName",
    "type": "string",
    "required": false,
    "description": "Additional class name of the popup",
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
    "name": "update:open",
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

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "SelectItem / SelectGroup / SelectLabel / SelectSeparator elements",
    "typeText": "any"
  },
  {
    "name": "placeholder",
    "type": "any",
    "description": "Shown in the trigger while nothing is selected (the `placeholder` prop)",
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
  },
  {
    "prop": "open",
    "event": "update:open",
    "syntax": "v-model:open"
  }
]
```

## SelectGroup

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SelectGroup"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "SelectLabel and SelectItem elements",
    "typeText": "any"
  }
]
```

## SelectItem

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SelectItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "type": "string",
    "required": true,
    "description": "Value of the option (must not be an empty string)",
    "typeText": "string"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Prevents selecting the option",
    "typeText": "boolean"
  },
  {
    "name": "textValue",
    "type": "string",
    "required": false,
    "description": "Text used for typeahead when the content is not plain text",
    "typeText": "string"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Content of the option",
    "typeText": "any"
  }
]
```

## SelectLabel

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SelectLabel"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Label content",
    "typeText": "any"
  }
]
```

## SelectSeparator

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SelectSeparator"
  ],
  "kind": "named"
}
```

## CSS variables

```json
{
  "css:Select": {
    "kind": "cssVars",
    "source": "react/src/components/Select",
    "vars": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
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

### apps/docs/src/docs/pages/select/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Select, SelectItem } from "minerva-design/vue";
const language = ref("en");
</script>
<template>
  <div style="width: 240px">
    <Select v-model="language" aria-label="Language"
      ><SelectItem value="en">English</SelectItem
      ><SelectItem value="zh">Chinese</SelectItem
      ><SelectItem value="fr">French</SelectItem></Select
    >
  </div>
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/select/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Select, SelectItem, FormField } from "minerva-design/vue";
const value = ref("");
</script>
<template>
  <FormField
    label="Role"
    required
    :invalid="!value"
    error-message="Choose a role"
    ><Select v-model="value" name="role" placeholder="Select a role"
      ><SelectItem value="viewer">Viewer</SelectItem
      ><SelectItem value="editor">Editor</SelectItem></Select
    ></FormField
  >
</template>

```

## Example: groups

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/select/vue/groups.vue

```vue
<script setup lang="ts">
import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "minerva-design/vue";
</script>
<template>
  <Select aria-label="Technology"
    ><SelectGroup
      ><SelectLabel>Frontend</SelectLabel
      ><SelectItem value="vue">Vue</SelectItem
      ><SelectItem value="react">React</SelectItem></SelectGroup
    ><SelectSeparator /><SelectGroup
      ><SelectLabel>Backend</SelectLabel
      ><SelectItem value="node">Node.js</SelectItem
      ><SelectItem value="python">Python</SelectItem></SelectGroup
    ></Select
  >
</template>

```

## Example: options-property

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/select/vue/options-property.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Select, SelectItem } from "minerva-design/vue";
const value = ref("vue");
const options = [
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "legacy", label: "Legacy", disabled: true },
];
</script>
<template>
  <Select v-model="value" aria-label="Generated options"
    ><SelectItem
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
      >{{ option.label }}</SelectItem
    ></Select
  ><output>{{ value }}</output>
</template>

```
