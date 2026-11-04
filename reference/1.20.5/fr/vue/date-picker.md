# DatePicker

Sélectionne une date dans une grille mensuelle surgissante commençant le lundi, ou par saisie au format AAAA-MM-JJ.

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

### Clavier et accessibilité

Flèche bas sur le champ ouvre le calendrier surgissant et déplace le focus sur la cellule du jour actif ; un clic à l'extérieur le ferme.

Les touches fléchées, Début / Fin et Page préc. / suiv. (avec Maj : un an) déplacent le focus dans la grille du calendrier.

Entrée ou Espace choisit le jour qui a le focus et ferme le panneau.

Échap ferme le panneau et rend le focus au champ.

Le texte saisi est validé dès qu'il forme une date YYYY-MM-DD complète dans la plage ; à la perte du focus, les formats souples comme YYYY/M/D sont normalisés.

## DatePicker

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DatePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "string | null",
    "required": false,
    "typeText": "string | null"
  },
  {
    "name": "defaultValue",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "placeholder",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "ariaLabelledby",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "ariaDescribedby",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "id",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "required",
    "type": "boolean",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "invalid",
    "type": "boolean",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "name",
    "type": "string",
    "default": "\"date-picker\"",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "clearable",
    "type": "boolean",
    "default": "true",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\"",
    "default": "\"medium\"",
    "required": false,
    "typeText": "\"medium\" | \"small\" | \"large\""
  },
  {
    "name": "minDate",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "maxDate",
    "type": "string",
    "required": false,
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
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
  "css:DatePicker": {
    "kind": "cssVars",
    "source": "react/src/components/DatePicker",
    "vars": [
      {
        "name": "--date-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--date-picker-panel-width",
        "description": "Width of the popup calendar panel"
      },
      {
        "name": "--date-picker-panel-radius",
        "description": "Corner radius of the popup panel (defaults to --radius-lg)"
      },
      {
        "name": "--date-picker-panel-padding",
        "description": "Inner padding of the popup panel"
      },
      {
        "name": "--date-picker-cell-size",
        "description": "Width and height of a day cell in the popup grid"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Liez v-model à une chaîne YYYY-MM-DD ou null pour choisir, saisir ou effacer une date.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { DatePicker, VStack } from "minerva-design/vue";
const date = ref<string | null>(null);
</script>
<template>
  <VStack :gap="3" align="stretch">
    <DatePicker v-model="date" label="Meeting date" />
    <output>{{ date || "No date selected" }}</output>
  </VStack>
</template>

```

## Example: Champ de formulaire

Hérite du libellé, de l’état obligatoire et du texte d’aide de FormControl.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  DatePicker,
  FormControl,
  FormLabel,
  FormHelperText,
} from "minerva-design/vue";
const date = ref<string | null>(null);
</script>
<template>
  <FormControl id="vue-date-picker-birthday" required>
    <FormLabel>Birthday</FormLabel>
    <DatePicker v-model="date" />
    <FormHelperText
      >Type YYYY-MM-DD or choose a day from the calendar.</FormHelperText
    >
  </FormControl>
</template>

```

## Example: Plage de dates

Seules les dates du 10 au 20 octobre sont sélectionnables.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/vue/range.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { DatePicker, VStack } from "minerva-design/vue";
const date = ref("2026-10-15");
</script>
<template>
  <VStack :gap="3" align="stretch">
    <DatePicker
      v-model="date"
      label="October booking"
      min-date="2026-10-10"
      max-date="2026-10-20"
    />
    <output>{{ date || "Choose a date between October 10 and 20" }}</output>
  </VStack>
</template>

```

## Example: Tailles et états

Champs de petite taille, en lecture seule, désactivés et sans bouton d’effacement.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/vue/states.vue

```vue
<script setup lang="ts">
import { DatePicker, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch">
    <DatePicker label="Small date" size="small" default-value="2026-10-15" />
    <DatePicker label="Read-only date" default-value="2026-10-15" read-only />
    <DatePicker label="Disabled date" default-value="2026-10-15" disabled />
    <DatePicker
      label="Date without clear button"
      default-value="2026-10-15"
      :clearable="false"
    />
  </VStack>
</template>

```
