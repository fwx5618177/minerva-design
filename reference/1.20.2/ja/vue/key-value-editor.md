# KeyValueEditor キー・値エディター

複数行のキーと値を持つ文字列ペアの順序付きリストを編集し、追加・削除ができます。行は安定した id で追跡されます。

Package: minerva-design@1.20.2

Renderer: vue

Locale: ja

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

## KeyValueEditor

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "KeyValueEditor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "KeyValueEntry[]",
    "required": false,
    "description": "Rows (controlled, `v-model`); omit for an uncontrolled editor",
    "typeText": "KeyValueEntry[]"
  },
  {
    "name": "defaultValue",
    "type": "KeyValueEntry[]",
    "required": false,
    "description": "Initial rows of an uncontrolled editor",
    "typeText": "KeyValueEntry[]"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables every field and button",
    "typeText": "boolean"
  },
  {
    "name": "keyLabel",
    "type": "string",
    "required": false,
    "description": "Label of the key fields (followed by the row number for screen readers)",
    "typeText": "string"
  },
  {
    "name": "valueLabel",
    "type": "string",
    "required": false,
    "description": "Label of the value fields",
    "typeText": "string"
  },
  {
    "name": "addLabel",
    "type": "string",
    "required": false,
    "description": "Text of the add button",
    "typeText": "string"
  },
  {
    "name": "removeLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the remove buttons (followed by the row number)",
    "typeText": "string"
  },
  {
    "name": "errors",
    "type": "Record<string, KeyValueEntryErrors>",
    "required": false,
    "description": "Field errors by entry id; validation belongs to the consumer",
    "typeText": "Record<string, KeyValueEntryErrors>"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[entries: KeyValueEntry[]]",
    "typeText": "[entries: KeyValueEntry[]]",
    "parameters": [
      {
        "name": "entries",
        "position": 0,
        "typeText": "KeyValueEntry[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[entries: KeyValueEntry[]]",
    "typeText": "[entries: KeyValueEntry[]]",
    "parameters": [
      {
        "name": "entries",
        "position": 0,
        "typeText": "KeyValueEntry[]",
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
  "css:KeyValueEditor": {
    "kind": "cssVars",
    "source": "react/src/components/KeyValueEditor",
    "vars": [
      {
        "name": "--key-value-editor-gap",
        "description": "Space between the rows and the add button"
      },
      {
        "name": "--key-value-editor-column-gap",
        "description": "Space between the key, the value and the remove button of a row"
      },
      {
        "name": "--key-value-editor-control-height",
        "description": "Size of the remove button and minimum height of the key field and of the add button (defaults to the density's small control height)"
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

### apps/docs/src/docs/pages/key-value-editor/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { KeyValueEditor, VStack } from "minerva-design/vue";
const entries = ref([
  { id: "content", key: "Content-Type", value: "application/json" },
]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><KeyValueEditor v-model="entries" /><output
      >{{ entries.length }} entries</output
    ></VStack
  >
</template>

```

## Example: errors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/key-value-editor/vue/errors.vue

```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import { KeyValueEditor } from "minerva-design/vue";
const entries = ref([{ id: "empty", key: "", value: "token" }]);
const errors = computed(() => {
  const result: Record<string, { key?: string; value?: string }> = {};
  if (!entries.value[0]?.key)
    result.empty = { key: "A header name is required" };
  return result;
});
</script>
<template>
  <KeyValueEditor v-model="entries" :errors="errors" />
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/key-value-editor/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { KeyValueEditor, FormField } from "minerva-design/vue";
const entries = ref([
  { id: "content", key: "Content-Type", value: "application/json" },
]);
</script>
<template>
  <FormField label="Request headers" helper-text="Add a row for each header"
    ><KeyValueEditor
      v-model="entries"
      key-label="Header name"
      value-label="Header value"
  /></FormField>
</template>

```
