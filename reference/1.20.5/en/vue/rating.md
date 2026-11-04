# Rating

Displays a score as five stars on any scale, and collects scores with mouse or keyboard.

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

## Rating

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Rating"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "type": "number",
    "required": true,
    "description": "Current score, from 0 to max (`v-model`)",
    "typeText": "number"
  },
  {
    "name": "max",
    "type": "number",
    "default": "10",
    "required": false,
    "description": "Highest score; the score is always drawn on 5 stars (half stars for\nfractions between 0.25 and 0.75 of a star)",
    "typeText": "number"
  },
  {
    "name": "size",
    "type": "RatingSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Star size: 12px, 16px or 20px",
    "typeText": "RatingSize"
  },
  {
    "name": "showValue",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the score (one decimal) after the stars",
    "typeText": "boolean"
  },
  {
    "name": "ratingCount",
    "type": "number",
    "required": false,
    "description": "Number of ratings, shown after the score when showValue is set",
    "typeText": "number"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Forces display mode even with a `change` / `update:modelValue` listener\n(which makes the rating interactive: hover previews, half-star clicks,\na keyboard slider)",
    "typeText": "boolean"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[value: number]",
    "typeText": "[value: number]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "type": "[value: number]",
    "typeText": "[value: number]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "number",
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

## RatingScale

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "RatingScale"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "dimensions",
    "type": "readonly RatingDimension[]",
    "required": true,
    "description": "Dimensions to rate, one row each",
    "typeText": "readonly RatingDimension[]"
  },
  {
    "name": "max",
    "type": "number",
    "default": "10",
    "required": false,
    "description": "Highest score shared by every dimension",
    "typeText": "number"
  },
  {
    "name": "size",
    "type": "RatingSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Star size",
    "typeText": "RatingSize"
  },
  {
    "name": "readOnly",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Forces display mode even with a `change` listener (which makes the rows\ninteractive)",
    "typeText": "boolean"
  },
  {
    "name": "showValue",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Shows the score at the end of each row",
    "typeText": "boolean"
  }
]
```

### events

```json
[
  {
    "name": "change",
    "type": "[key: string, value: number]",
    "typeText": "[key: string, value: number]",
    "parameters": [
      {
        "name": "key",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      },
      {
        "name": "value",
        "position": 1,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## CSS variables

```json
{
  "css:Rating": {
    "kind": "cssVars",
    "source": "react/src/components/Rating",
    "vars": [
      {
        "name": "--rating-color",
        "description": "Color of the filled stars (defaults to --accent-color)"
      },
      {
        "name": "--rating-empty-color",
        "description": "Color of the empty stars and of the unfilled half"
      },
      {
        "name": "--rating-star-gap",
        "description": "Space between the stars"
      },
      {
        "name": "--rating-gap",
        "description": "Space between the stars and the value"
      },
      {
        "name": "--rating-value-font-size",
        "description": "Font size of the numeric value (every size)"
      },
      {
        "name": "--rating-scale-gap",
        "description": "Space between the rows of a RatingScale"
      },
      {
        "name": "--rating-empty-fill",
        "description": "Fill of the empty stars and of the unfilled half (defaults to --surface-muted-color)"
      },
      {
        "name": "--rating-hover-scale",
        "description": "Scale of the hovered star of an interactive rating (defaults to 1.15)"
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

### apps/docs/src/docs/pages/rating/vue/basic.vue

```vue
<script setup lang="ts">
import { Rating } from "minerva-design/vue";
</script>
<template>
  <Rating :model-value="8.5" show-value :rating-count="128" />
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/rating/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Rating, FormField } from "minerva-design/vue";
const score = ref(3);
</script>
<template>
  <FormField
    label="Rate your experience"
    helper-text="Use the arrow keys to adjust"
    ><Rating v-model="score" :max="5" show-value aria-label="Experience rating"
  /></FormField>
</template>

```

## Example: interactive

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/rating/vue/interactive.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Rating, VStack } from "minerva-design/vue";
const score = ref(7);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Rating v-model="score" show-value aria-label="Your rating" /><output
      >Your score: {{ score }}</output
    ></VStack
  >
</template>

```

## Example: scale

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/rating/vue/scale.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { RatingScale } from "minerva-design/vue";
const dimensions = ref([
  { key: "quality", label: "Quality", value: 8 },
  { key: "speed", label: "Speed", value: 6 },
  { key: "support", label: "Support", value: 9 },
]);
</script>
<template>
  <RatingScale
    :dimensions="dimensions"
    @change="
      (key, value) => {
        dimensions = dimensions.map((item) =>
          item.key === key ? { ...item, value } : item,
        );
      }
    "
  />
</template>

```
