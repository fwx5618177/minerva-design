# Checkbox

Permet de sélectionner une ou plusieurs options, avec prise en charge de l'état indéterminé, des erreurs et des styles personnalisés.

Package: minerva-design@1.21.0

Renderer: vue

Locale: fr

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

## Checkbox

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Checkbox"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "boolean",
    "required": false,
    "description": "Checked state (controlled, `v-model`)",
    "typeText": "boolean"
  },
  {
    "name": "defaultChecked",
    "type": "boolean",
    "required": false,
    "description": "Initial checked state (uncontrolled)",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the checkbox. Inherited from an enclosing FormControl when not\nset; an explicit `false` overrides the FormControl",
    "typeText": "boolean"
  },
  {
    "name": "indeterminate",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the indeterminate (partially checked) state. Controlled: it stays\napplied until this prop changes, also after the user clicks",
    "typeText": "boolean"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the input, used in forms",
    "typeText": "string"
  },
  {
    "name": "shape",
    "type": "\"rounded\" | \"circle\" | \"square\"",
    "default": "\"square\"",
    "required": false,
    "description": "Box shape",
    "typeText": "\"rounded\" | \"circle\" | \"square\""
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\"",
    "default": "\"medium\"",
    "required": false,
    "description": "Checkbox size",
    "typeText": "\"medium\" | \"small\" | \"large\""
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Label text (or the `label` / default slot)",
    "typeText": "string"
  },
  {
    "name": "color",
    "type": "\"info\" | \"primary\" | \"success\" | \"warning\" | \"danger\"",
    "default": "\"primary\"",
    "required": false,
    "description": "Semantic color of the checked / indeterminate box",
    "typeText": "\"info\" | \"primary\" | \"success\" | \"warning\" | \"danger\""
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "description": "id of the input (defaults to the enclosing FormControl's id)",
    "typeText": "string"
  },
  {
    "name": "value",
    "type": "string",
    "required": false,
    "description": "Value submitted with the form when checked",
    "typeText": "string"
  },
  {
    "name": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the input as required (inherited from an enclosing FormControl)",
    "typeText": "boolean"
  },
  {
    "name": "error",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the error state (also set by an invalid enclosing FormControl)",
    "typeText": "boolean"
  },
  {
    "name": "helperText",
    "type": "string",
    "required": false,
    "description": "Helper or error text shown below the checkbox (linked with aria-describedby)",
    "typeText": "string"
  },
  {
    "name": "labelPlacement",
    "type": "\"start\" | \"end\" | \"bottom\" | \"top\"",
    "default": "\"end\"",
    "required": false,
    "description": "Position of the label relative to the box",
    "typeText": "\"start\" | \"end\" | \"bottom\" | \"top\""
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[checked: boolean]",
    "typeText": "[checked: boolean]",
    "parameters": [
      {
        "name": "checked",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[checked: boolean, event: Event]",
    "typeText": "[checked: boolean, event: Event]",
    "parameters": [
      {
        "name": "checked",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      },
      {
        "name": "event",
        "position": 1,
        "typeText": "Event",
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
    "description": "Label content (alternative to the `label` prop / slot)",
    "typeText": "any"
  },
  {
    "name": "label",
    "type": "any",
    "description": "Label content (the `label` prop)",
    "typeText": "any"
  },
  {
    "name": "icon",
    "type": "any",
    "description": "Custom icon shown when checked",
    "typeText": "any"
  },
  {
    "name": "error-icon",
    "type": "any",
    "description": "Icon before the helper text in the error state (default: info circle)",
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
  "css:Checkbox": {
    "kind": "cssVars",
    "source": "react/src/components/Checkbox",
    "vars": [
      {
        "name": "--checkbox-checked-color",
        "description": "Background / border of the checked or indeterminate box (defaults to the color prop's accent)"
      },
      {
        "name": "--checkbox-checkmark-color",
        "description": "Color of the checkmark / indeterminate dash"
      },
      {
        "name": "--checkbox-box-color",
        "description": "Background of the unchecked box"
      },
      {
        "name": "--checkbox-border-color",
        "description": "Border of the unchecked box"
      },
      {
        "name": "--checkbox-size",
        "description": "Width and height of the box (every size)"
      },
      {
        "name": "--checkbox-radius",
        "description": "Corner radius of the box for the square and rounded shapes"
      },
      {
        "name": "--checkbox-gap",
        "description": "Space between the box and the label"
      },
      {
        "name": "--checkbox-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/vue/basic.vue

```vue
<script setup lang="ts">
import { Checkbox, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack align="start" :gap="3"
    ><Checkbox label="Remember me" /><Checkbox
      label="Checked by default"
      default-checked
  /></VStack>
</template>

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/vue/controlled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Checkbox, VStack } from "minerva-design/vue";
const checked = ref(true);
</script>
<template>
  <VStack align="start" :gap="3"
    ><Checkbox v-model="checked" label="Subscribe to the newsletter" /><span
      role="status"
      >{{ checked ? "Subscribed" : "Not subscribed" }}</span
    ></VStack
  >
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Checkbox, FormField } from "minerva-design/vue";
const accepted = ref(false);
</script>
<template>
  <FormField
    label="Terms"
    required
    :invalid="!accepted"
    error-message="Accept the terms to continue"
    ><Checkbox v-model="accepted" label="I accept the terms" name="terms"
  /></FormField>
</template>

```

## Example: indeterminate

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/vue/indeterminate.vue

```vue
<script setup lang="ts">
import { computed, ref } from "vue";
import { Checkbox, VStack } from "minerva-design/vue";
const fruits = ["Apple", "Banana", "Cherry"];
const selected = ref<string[]>(["Apple"]);
const allChecked = computed(() => selected.value.length === fruits.length);
const someChecked = computed(
  () => selected.value.length > 0 && !allChecked.value,
);
function toggle(fruit: string, checked: boolean) {
  selected.value = checked
    ? [...selected.value, fruit]
    : selected.value.filter((f) => f !== fruit);
}
</script>
<template>
  <VStack :gap="2" align="start"
    ><Checkbox
      label="Select all"
      :model-value="allChecked"
      :indeterminate="someChecked"
      @change="selected = $event ? [...fruits] : []" /><VStack
      :gap="2"
      align="start"
      style="padding-left: 24px"
      ><Checkbox
        v-for="fruit in fruits"
        :key="fruit"
        :label="fruit"
        :model-value="selected.includes(fruit)"
        @change="toggle(fruit, $event)" /></VStack
  ></VStack>
</template>

```

## Example: select-all

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/vue/select-all.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Checkbox, VStack } from "minerva-design/vue";
const selected = ref([true, false, false]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Checkbox
      :model-value="selected.every(Boolean)"
      :indeterminate="selected.some(Boolean) && !selected.every(Boolean)"
      label="Select all"
      @update:model-value="
        (value) => (selected = selected.map(() => value))
      " /><Checkbox
      v-for="(_, index) in selected"
      :key="index"
      v-model="selected[index]"
      :label="`Option ${index + 1}`"
  /></VStack>
</template>

```

## Example: styles-states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/vue/styles-states.vue

```vue
<script setup lang="ts">
import { Checkbox, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Checkbox
      label="Small"
      size="small"
      shape="circle"
      default-checked /><Checkbox
      label="Large success"
      size="large"
      color="success"
      default-checked /><Checkbox label="Disabled" disabled /><Checkbox
      label="Invalid"
      error
      helper-text="Required selection"
  /></HStack>
</template>

```
