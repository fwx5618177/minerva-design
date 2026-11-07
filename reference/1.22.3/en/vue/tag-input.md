# TagInput

Free-form tag entry with suggestions: Enter, the add button or blur add the draft, arrow keys pick a suggestion, and IME composition never commits.

Package: minerva-design@1.22.3

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## TagInput

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TagInput"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "readonly string[]",
    "required": false,
    "description": "Selected tags (controlled, `v-model`); omit for an uncontrolled field",
    "typeText": "readonly string[]"
  },
  {
    "name": "defaultValue",
    "type": "readonly string[]",
    "required": false,
    "description": "Initial tags of an uncontrolled field",
    "typeText": "readonly string[]"
  },
  {
    "name": "options",
    "type": "readonly string[]",
    "default": "[]",
    "required": false,
    "description": "Suggestions; already selected tags are hidden and duplicates merged",
    "typeText": "readonly string[]"
  },
  {
    "name": "commitOnBlur",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Adds the typed draft as a tag when the input loses focus",
    "typeText": "boolean"
  },
  {
    "name": "separators",
    "type": "readonly string[]",
    "default": "DEFAULT_TAG_SEPARATORS",
    "required": false,
    "description": "Keys that commit the draft: a literal string (e.g. \",\" or \";\") splits the\ntyped or pasted text into tags; \"Enter\" commits on the Enter key (and also\nsplits pasted text on line breaks)",
    "typeText": "readonly string[]"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "Id of the text input (defaults to the FormControl id)",
    "typeText": "string"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Submits every selected tag under this name (hidden inputs); the draft is not submitted",
    "typeText": "string"
  },
  {
    "name": "placeholder",
    "type": "string",
    "required": false,
    "description": "Placeholder of the text input",
    "typeText": "string"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the text input when there is no FormControl label (`aria-label`)",
    "typeText": "string"
  },
  {
    "name": "ariaLabelledby",
    "type": "string",
    "required": false,
    "description": "Ids of the elements labelling the text input (`aria-labelledby`; wins over the FormControl label)",
    "typeText": "string"
  },
  {
    "name": "ariaDescribedby",
    "type": "string",
    "required": false,
    "description": "Extra ids describing the text input (`aria-describedby`)",
    "typeText": "string"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the field (also set by FormControl)",
    "typeText": "boolean"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the tags without editing controls (also set by FormControl)",
    "typeText": "boolean"
  },
  {
    "name": "invalid",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Error state (also set by an invalid FormControl)",
    "typeText": "boolean"
  },
  {
    "name": "size",
    "type": "TagInputSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Size of the text input",
    "typeText": "TagInputSize"
  },
  {
    "name": "emptyText",
    "type": "string",
    "required": false,
    "description": "Text of the suggestion list when nothing matches",
    "typeText": "string"
  },
  {
    "name": "addLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the add button",
    "typeText": "string"
  },
  {
    "name": "clearLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the clear button",
    "typeText": "string"
  },
  {
    "name": "removeLabel",
    "type": "((tag: string) => string)",
    "required": false,
    "description": "Accessible label of a tag's remove button",
    "typeText": "((tag: string) => string)"
  },
  {
    "name": "createLabel",
    "type": "((tag: string) => string)",
    "required": false,
    "description": "Text of the \"create this tag\" suggestion",
    "typeText": "((tag: string) => string)"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[value: string[]]",
    "typeText": "[value: string[]]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[value: string[]]",
    "typeText": "[value: string[]]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string[]",
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
  "css:TagInput": {
    "kind": "cssVars",
    "source": "react/src/components/TagInput",
    "vars": [
      {
        "name": "--tag-input-gap",
        "description": "Space between the tags and between the tags and the entry row"
      },
      {
        "name": "--tag-input-tag-min-height",
        "description": "Minimum height of a tag (defaults to the density's small control height)"
      },
      {
        "name": "--tag-input-list-max-height",
        "description": "Maximum height of the suggestion list before it scrolls"
      },
      {
        "name": "--tag-input-list-radius",
        "description": "Corner radius of the suggestion list (defaults to --radius-md)"
      },
      {
        "name": "--tag-input-option-padding-y",
        "description": "Vertical padding of a suggestion (follows the density's row padding)"
      },
      {
        "name": "--tag-input-option-padding-x",
        "description": "Horizontal padding of a suggestion (follows the density's row padding)"
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

### apps/docs/src/docs/pages/tag-input/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { TagInput, VStack } from "minerva-design/vue";
const tags = ref(["Vue"]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><TagInput
      v-model="tags"
      :options="['Vue', 'Angular', 'React']"
      aria-label="Frameworks"
    /><output>{{ tags.join(", ") }}</output></VStack
  >
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { TagInput, FormField } from "minerva-design/vue";
const tags = ref<string[]>([]);
</script>
<template>
  <FormField
    label="Project tags"
    required
    :invalid="!tags.length"
    error-message="Add at least one tag"
    ><TagInput
      v-model="tags"
      name="tags"
      :options="['design', 'engineering', 'research']"
  /></FormField>
</template>

```

## Example: separators

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/vue/separators.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { TagInput, FormField } from "minerva-design/vue";
const tags = ref<string[]>([]);
</script>
<template>
  <FormField
    label="Recipients"
    helper-text="Separate addresses with semicolons or Enter"
    ><TagInput
      v-model="tags"
      :separators="[';', 'Enter']"
      placeholder="name@example.com"
  /></FormField>
</template>

```

## Example: states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/vue/states.vue

```vue
<script setup lang="ts">
import { TagInput, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><TagInput
      :model-value="['Published']"
      read-only
      aria-label="Read-only tags" /><TagInput
      :model-value="['Locked']"
      disabled
      aria-label="Disabled tags" /><TagInput
      size="small"
      aria-label="Small tags"
      placeholder="Small tags"
  /></VStack>
</template>

```
