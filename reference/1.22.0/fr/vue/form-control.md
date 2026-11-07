# FormControl

Conteneur de champ qui relie un libellé, un contrôle, un texte d’aide et un message d’erreur, et partage l’état invalide / obligatoire / désactivé / lecture seule avec le contrôle.

Package: minerva-design@1.22.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## FormControl

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "FormControl"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "invalid",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Marks the field as invalid: the control gets aria-invalid and the error\nmessage replaces the helper text",
    "typeText": "boolean"
  },
  {
    "name": "required",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Marks the field as required (aria-required on the control, indicator on the label)",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the control inside the field",
    "typeText": "boolean"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Makes the control inside the field read-only",
    "typeText": "boolean"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "Id of the control; the label, helper and error ids derive from it\n(`${id}-label`, `${id}-helper`, `${id}-error`). Generated when omitted",
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
    "description": "Field content: FormLabel, a control, FormHelperText, FormErrorMessage",
    "typeText": "any"
  }
]
```

## FormErrorMessage

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "FormErrorMessage"
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
    "typeText": "any"
  }
]
```

## FormField

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "FormField"
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
    "required": false,
    "description": "Label of the field (or the `label` slot)",
    "typeText": "string"
  },
  {
    "name": "helperText",
    "type": "string",
    "required": false,
    "description": "Help text below the control, hidden while invalid (or the `helper-text` slot)",
    "typeText": "string"
  },
  {
    "name": "errorMessage",
    "type": "string",
    "required": false,
    "description": "Error message (or the `error-message` slot); makes the field invalid\nunless `invalid` is set explicitly",
    "typeText": "string"
  },
  {
    "name": "invalid",
    "type": "boolean",
    "required": false,
    "description": "Marks the field as invalid: the control gets aria-invalid and the error\nmessage replaces the helper text",
    "typeText": "boolean"
  },
  {
    "name": "required",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Marks the field as required (aria-required on the control, indicator on the label)",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables the control inside the field",
    "typeText": "boolean"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Makes the control inside the field read-only",
    "typeText": "boolean"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "Id of the control; the label, helper and error ids derive from it\n(`${id}-label`, `${id}-helper`, `${id}-error`). Generated when omitted",
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
    "description": "The control",
    "typeText": "any"
  },
  {
    "name": "label",
    "type": "any",
    "description": "Label (the `label` prop)",
    "typeText": "any"
  },
  {
    "name": "helper-text",
    "type": "any",
    "description": "Help text (the `helperText` prop)",
    "typeText": "any"
  },
  {
    "name": "error-message",
    "type": "any",
    "description": "Error message (the `errorMessage` prop)",
    "typeText": "any"
  }
]
```

## FormHelperText

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "FormHelperText"
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
    "typeText": "any"
  }
]
```

## FormLabel

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "FormLabel"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "requiredIndicator",
    "type": "string",
    "default": "\"*\"",
    "required": false,
    "description": "Indicator shown after the text when the field is required (hidden from\nassistive technology, which gets aria-required instead); or the\n`required-indicator` slot",
    "typeText": "string"
  },
  {
    "name": "htmlFor",
    "type": "string",
    "required": false,
    "description": "`for` of the label (defaults to the FormControl's control id)",
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
    "description": "Label text",
    "typeText": "any"
  },
  {
    "name": "required-indicator",
    "type": "any",
    "description": "Required indicator (the `requiredIndicator` prop)",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:FormControl": {
    "kind": "cssVars",
    "source": "react/src/components/FormControl",
    "vars": [
      {
        "name": "--form-control-gap",
        "description": "Space between the label, the field and the helper / error text"
      },
      {
        "name": "--form-control-label-font-size",
        "description": "Font size of the label"
      },
      {
        "name": "--form-control-label-color",
        "description": "Color of the label"
      },
      {
        "name": "--form-control-helper-font-size",
        "description": "Font size of the helper and error texts"
      },
      {
        "name": "--form-control-required-color",
        "description": "Color of the required marker"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [Vue controlled project form](/minerva-design/reference/1.22.0/recipes/vue-form/README.md) — vue; verified package 1.22.0

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/vue/basic.vue

```vue
<script setup lang="ts">
import { FormField, Input } from "minerva-design/vue";
</script>
<template>
  <FormField label="Email" helper-text="We will never share your address"
    ><Input type="email" placeholder="you@example.com"
  /></FormField>
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { FormField, Input, Button, VStack } from "minerva-design/vue";
const name = ref("Minerva");
const saved = ref(false);
</script>
<template>
  <form @submit.prevent="saved = true">
    <VStack :gap="3"
      ><FormField label="Project name" required
        ><Input v-model="name" required /></FormField
      ><Button type="submit">Save project</Button
      ><output v-if="saved">Saved {{ name }}</output></VStack
    >
  </form>
</template>

```

## Example: slots

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/vue/slots.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
} from "minerva-design/vue";
const name = ref("");
</script>
<template>
  <FormControl required :invalid="!name"
    ><FormLabel
      >Workspace <template #required-indicator>(required)</template></FormLabel
    ><Input v-model="name" /><FormHelperText
      >Use a memorable name</FormHelperText
    ><FormErrorMessage
      >A workspace name is required</FormErrorMessage
    ></FormControl
  >
</template>

```

## Example: states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/form-control/vue/states.vue

```vue
<script setup lang="ts">
import { FormField, Input, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><FormField
      label="Invalid email"
      invalid
      error-message="Enter a valid email"
      ><Input default-value="not-an-email" /></FormField
    ><FormField label="Disabled field" disabled
      ><Input default-value="Unavailable" /></FormField
    ><FormField label="Read only" read-only
      ><Input default-value="Account ID: 42" /></FormField
  ></VStack>
</template>

```
