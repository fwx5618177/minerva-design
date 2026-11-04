# Textarea

Multi-line text input sharing Input's sizes and variants; manual resizing is disabled, set rows instead.

Package: minerva-design@1.21.0

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Textarea

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Textarea"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "string | number",
    "required": false,
    "description": "Current text (controlled, `v-model`). Omit for an uncontrolled field",
    "typeText": "string | number"
  },
  {
    "name": "defaultValue",
    "type": "string | number",
    "required": false,
    "description": "Initial text of an uncontrolled field",
    "typeText": "string | number"
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
    "name": "invalid",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Error state (also set by an invalid FormControl); sets aria-invalid",
    "typeText": "boolean"
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
    "name": "readOnly",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Read-only field (also set by FormControl).",
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
  "css:Textarea": {
    "kind": "cssVars",
    "source": "react/src/components/Textarea",
    "vars": [
      {
        "name": "--textarea-min-height",
        "description": "Minimum height (every size)"
      },
      {
        "name": "--textarea-padding-y",
        "description": "Vertical padding of the text"
      },
      {
        "name": "--textarea-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--textarea-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--textarea-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--textarea-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--textarea-border-color",
        "description": "Border color at rest"
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

### apps/docs/src/docs/pages/textarea/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Textarea, VStack } from "minerva-design/vue";
const text = ref("");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Textarea
      v-model="text"
      aria-label="Message"
      placeholder="Write a message…"
    /><output>{{ text.length }} characters</output></VStack
  >
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/textarea/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Textarea, FormField } from "minerva-design/vue";
const text = ref("");
</script>
<template>
  <FormField
    label="Description"
    required
    :invalid="text.length > 120"
    error-message="Use 120 characters or fewer"
    helper-text="Describe your project in a sentence"
    ><Textarea v-model="text" :rows="4"
  /></FormField>
</template>

```

## Example: sizes-variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/textarea/vue/sizes-variants.vue

```vue
<script setup lang="ts">
import { Textarea, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Textarea
      size="small"
      variant="outline"
      aria-label="Small message"
      placeholder="Small outline" /><Textarea
      size="large"
      variant="filled"
      aria-label="Large message"
      placeholder="Large filled" /><Textarea
      variant="unstyled"
      aria-label="Unstyled message"
      placeholder="Unstyled"
  /></VStack>
</template>

```
