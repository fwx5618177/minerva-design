# JsonField

Strict-JSON textarea with a format button and accessible syntax feedback; formatting preserves numbers, escapes and key order.

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

## JsonField

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "JsonField"
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
    "description": "JSON text (controlled, `v-model`); omit for an uncontrolled field",
    "typeText": "string"
  },
  {
    "name": "defaultValue",
    "type": "string",
    "required": false,
    "description": "Initial text of an uncontrolled field",
    "typeText": "string"
  },
  {
    "name": "hideToolbar",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Hides the format button; syntax feedback stays visible and associated",
    "typeText": "boolean"
  },
  {
    "name": "indent",
    "type": "number",
    "default": "2",
    "required": false,
    "description": "Spaces per indentation level when formatting (0 to 10; 0 compacts the JSON)",
    "typeText": "number"
  },
  {
    "name": "formatLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the format button",
    "typeText": "string"
  },
  {
    "name": "validLabel",
    "type": "string",
    "required": false,
    "description": "Status text for valid JSON",
    "typeText": "string"
  },
  {
    "name": "invalidLabel",
    "type": "string",
    "required": false,
    "description": "Status text prefix for invalid JSON (followed by the parser error)",
    "typeText": "string"
  },
  {
    "name": "rows",
    "type": "number",
    "default": "8",
    "required": false,
    "description": "Rows of the textarea",
    "typeText": "number"
  },
  {
    "name": "spellCheck",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Spell checking of the textarea",
    "typeText": "boolean"
  },
  {
    "name": "variant",
    "type": "TextareaVariant",
    "default": "\"outline\"",
    "required": false,
    "description": "Visual style",
    "typeText": "TextareaVariant"
  },
  {
    "name": "size",
    "type": "TextareaSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Font size and minimum height",
    "typeText": "TextareaSize"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the field (also set by FormControl).",
    "typeText": "boolean"
  },
  {
    "name": "required",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Marks the field as required.",
    "typeText": "boolean"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "id of the textarea (defaults to the enclosing FormControl's id)",
    "typeText": "string"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Read-only field (also set by FormControl).",
    "typeText": "boolean"
  },
  {
    "name": "invalid",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Error state (also set by an invalid FormControl); sets aria-invalid",
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
  "css:JsonField": {
    "kind": "cssVars",
    "source": "react/src/components/JsonField",
    "vars": [
      {
        "name": "--json-field-gap",
        "description": "Space between the toolbar, the editor and the status line"
      },
      {
        "name": "--json-field-font-family",
        "description": "Font family of the editor (defaults to the monospace stack)"
      },
      {
        "name": "--json-field-font-size",
        "description": "Font size of the editor"
      },
      {
        "name": "--json-field-tab-size",
        "description": "Rendered width of a tab character in the editor"
      },
      {
        "name": "--json-field-status-font-size",
        "description": "Font size of the validation status line"
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

### apps/docs/src/docs/pages/json-field/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { JsonField } from "minerva-design/vue";
const json = ref('{"name":"Minerva","enabled":true}');
</script>
<template>
  <JsonField v-model="json" aria-label="Configuration JSON" />
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/json-field/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { JsonField, FormField } from "minerva-design/vue";
const json = ref('{"project":"demo"}');
</script>
<template>
  <FormField label="Request body" required helper-text="Enter a JSON object"
    ><JsonField v-model="json" :rows="5"
  /></FormField>
</template>

```

## Example: options

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/json-field/vue/options.vue

```vue
<script setup lang="ts">
import { JsonField, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><JsonField
      default-value='{"compact":true}'
      :indent="0"
      format-label="Compact JSON"
      aria-label="Compact JSON" /><JsonField
      default-value='{"readOnly":true}'
      read-only
      hide-toolbar
      aria-label="Read-only JSON"
  /></VStack>
</template>

```
