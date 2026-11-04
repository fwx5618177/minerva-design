# Input

Champ de saisie sur une ligne avec tailles, variantes, contenu avant / après, bouton d'effacement, compteur de caractères et bascule de visibilité du mot de passe. Placez-le dans un FormField pour un libellé, une aide et un message d'erreur.

Package: minerva-design@1.20.5

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## Input

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Input"
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
    "name": "type",
    "type": "string",
    "default": "\"text\"",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "variant",
    "type": "InputVariant",
    "default": "\"outline\"",
    "required": false,
    "description": "Visual style",
    "typeText": "InputVariant"
  },
  {
    "name": "size",
    "type": "InputSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Height and font size",
    "typeText": "InputSize"
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
    "description": "id of the input (defaults to the enclosing FormControl's id)",
    "typeText": "string"
  },
  {
    "name": "maxLength",
    "type": "number",
    "required": false,
    "description": "Maximum length (also shown by the character count)",
    "typeText": "number"
  },
  {
    "name": "prefix",
    "type": "string",
    "required": false,
    "description": "Content before the text, e.g. \"@\" (or the `prefix` slot)",
    "typeText": "string"
  },
  {
    "name": "suffix",
    "type": "string",
    "required": false,
    "description": "Content after the text, e.g. a unit (or the `suffix` slot)",
    "typeText": "string"
  },
  {
    "name": "clearable",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a clear button while the field has a value (not when disabled or\nread-only). Clearing emits an empty value and keeps focus in the field",
    "typeText": "boolean"
  },
  {
    "name": "clearLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the clear button",
    "typeText": "string"
  },
  {
    "name": "showCharCount",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the number of characters (and maxLength, when set) after the text;\nthe count is linked to the input with aria-describedby",
    "typeText": "boolean"
  },
  {
    "name": "showPasswordLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the password visibility toggle (shown for\ntype=\"password\") while the password is hidden",
    "typeText": "string"
  },
  {
    "name": "hidePasswordLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label of the password visibility toggle while the password\nis visible",
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
    "name": "clear",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  }
]
```

### slots

```json
[
  {
    "name": "prefix",
    "type": "any",
    "description": "Content before the text (the `prefix` prop)",
    "typeText": "any"
  },
  {
    "name": "suffix",
    "type": "any",
    "description": "Content after the text (the `suffix` prop)",
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
  "css:Input": {
    "kind": "cssVars",
    "source": "react/src/components/Input",
    "vars": [
      {
        "name": "--input-height",
        "description": "Minimum height of the field (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--input-padding-x",
        "description": "Horizontal padding of the text (every size)"
      },
      {
        "name": "--input-radius",
        "description": "Corner radius (defaults to --radius-lg)"
      },
      {
        "name": "--input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--input-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--input-focus-color",
        "description": "Border color while hovered / focused (focus: then --minerva-focus-border-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [Vue controlled project form](/minerva-design/reference/1.20.5/recipes/vue-form/README.md) — vue; verified package 1.20.5

## Example: addons

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/input/vue/addons.vue

```vue
<script setup lang="ts">
import { Input, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Input aria-label="Website" placeholder="example.com"
      ><template #addon-before>https://</template
      ><template #addon-after>.com</template></Input
    ><Input aria-label="Search" placeholder="Search projects"
      ><template #prefix>⌕</template><template #suffix>⌘K</template></Input
    ></VStack
  >
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/input/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Input, VStack } from "minerva-design/vue";
const value = ref("");
</script>
<template>
  <VStack :gap="3"
    ><Input aria-label="Name" placeholder="Uncontrolled" /><Input
      aria-label="Controlled"
      placeholder="Controlled"
      v-model="value"
  /></VStack>
</template>

```

## Example: clearable-and-count

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/input/vue/clearable-and-count.vue

```vue
<script setup lang="ts">
import { Input, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Input aria-label="Search" placeholder="Search" clearable /><Input
      aria-label="Short bio"
      default-value="Frontend developer"
      clearable
      show-char-count
      :max-length="40"
  /></VStack>
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/input/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Input, FormField, Button, VStack } from "minerva-design/vue";
const email = ref("");
const saved = ref(false);
</script>
<template>
  <form @submit.prevent="saved = true">
    <VStack :gap="3"
      ><FormField label="Email" required
        ><Input v-model="email" type="email" required /></FormField
      ><Button type="submit">Subscribe</Button
      ><output v-if="saved">Subscribed: {{ email }}</output></VStack
    >
  </form>
</template>

```

## Example: sizes-variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/input/vue/sizes-variants.vue

```vue
<script setup lang="ts">
import { Input, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Input aria-label="Small" size="small" placeholder="small" /><Input
      aria-label="Medium"
      placeholder="medium (outline)" /><Input
      aria-label="Large"
      size="large"
      placeholder="large" /><Input
      aria-label="Filled"
      variant="filled"
      placeholder="filled" /><Input
      aria-label="Unstyled"
      variant="unstyled"
      placeholder="unstyled"
  /></VStack>
</template>

```

## Example: states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/input/vue/states.vue

```vue
<script setup lang="ts">
import { FormField, Input, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Input aria-label="Invalid" invalid default-value="Invalid" /><Input
      aria-label="Disabled"
      disabled
      default-value="Disabled" /><Input
      aria-label="Read-only"
      read-only
      default-value="Project Atlas" /><FormField
      label="Inside a FormField"
      error-message="Inherits the error"
      ><Input /></FormField
  ></VStack>
</template>

```
