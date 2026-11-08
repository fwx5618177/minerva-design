# Flashcard

A two-sided study card that flips between a prompt and its answer, for spaced-repetition review.

Package: minerva-design@1.23.0

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Flashcard

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Flashcard"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "front",
    "type": "string",
    "required": false,
    "description": "Text of the front face (the prompt); the `front` slot wins",
    "typeText": "string"
  },
  {
    "name": "back",
    "type": "string",
    "required": false,
    "description": "Text of the back face (the answer); the `back` slot wins",
    "typeText": "string"
  },
  {
    "name": "frontLabel",
    "type": "string | null",
    "required": false,
    "description": "Small caption of the front face; `\"\"` or `null` hides it",
    "typeText": "string | null"
  },
  {
    "name": "backLabel",
    "type": "string | null",
    "required": false,
    "description": "Small caption of the back face; `\"\"` or `null` hides it",
    "typeText": "string | null"
  },
  {
    "name": "hint",
    "type": "string",
    "required": false,
    "description": "Hint on the front face (shown with showHint while the card flips on click)",
    "typeText": "string"
  },
  {
    "name": "showHint",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows the hint on the front face",
    "typeText": "boolean"
  },
  {
    "name": "flipped",
    "type": "boolean",
    "required": false,
    "description": "Whether the back is shown (controlled, `v-model:flipped`)",
    "typeText": "boolean"
  },
  {
    "name": "defaultFlipped",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Whether the back is initially shown (uncontrolled)",
    "typeText": "boolean"
  },
  {
    "name": "flipOnClick",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Clicking the card (or Enter / Space on it) flips it. When false the card\nis not a button and only `flipped` flips it.",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Blocks flipping and dims the card",
    "typeText": "boolean"
  },
  {
    "name": "axis",
    "type": "FlashcardAxis",
    "default": "\"y\"",
    "required": false,
    "description": "Rotation axis: \"y\" flips horizontally, \"x\" vertically",
    "typeText": "FlashcardAxis"
  },
  {
    "name": "variant",
    "type": "FlashcardVariant",
    "default": "\"elevated\"",
    "required": false,
    "description": "Surface style",
    "typeText": "FlashcardVariant"
  },
  {
    "name": "size",
    "type": "FlashcardSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Padding and typography scale",
    "typeText": "FlashcardSize"
  },
  {
    "name": "minHeight",
    "type": "string | number",
    "default": "\"12rem\"",
    "required": false,
    "description": "Minimum height of the card (a number is in px); the card grows to fit\nthe taller face",
    "typeText": "string | number"
  },
  {
    "name": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible label of the card",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "update:flipped",
    "type": "[flipped: boolean]",
    "typeText": "[flipped: boolean]",
    "parameters": [
      {
        "name": "flipped",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "flippedChange",
    "type": "[flipped: boolean]",
    "typeText": "[flipped: boolean]",
    "parameters": [
      {
        "name": "flipped",
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
    "name": "front",
    "type": "any",
    "description": "Content of the front face (the prompt)",
    "typeText": "any"
  },
  {
    "name": "back",
    "type": "any",
    "description": "Content of the back face (the answer)",
    "typeText": "any"
  },
  {
    "name": "footer",
    "type": "any",
    "description": "Content below the card, not flipped (e.g. rating buttons)",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "flipped",
    "event": "update:flipped",
    "syntax": "v-model:flipped"
  }
]
```

## CSS variables

```json
{
  "css:Flashcard": {
    "kind": "cssVars",
    "source": "react/src/components/Flashcard",
    "vars": [
      {
        "name": "--flashcard-min-height",
        "description": "Minimum height of the card (defaults to 12rem; the minHeight prop sets it); the card grows to fit the taller face"
      },
      {
        "name": "--flashcard-bg-color",
        "description": "Background color of the faces (defaults to --surface-color, --surface-muted-color with variant=\"filled\")"
      },
      {
        "name": "--flashcard-border-color",
        "description": "Border color of the faces (variant=\"outline\")"
      },
      {
        "name": "--flashcard-radius",
        "description": "Corner radius of the faces (defaults to --radius-lg)"
      },
      {
        "name": "--flashcard-shadow",
        "description": "Shadow of the faces (variant=\"elevated\"; defaults to --shadow-lg)"
      },
      {
        "name": "--flashcard-padding",
        "description": "Padding of the faces (defaults to the size's spacing)"
      },
      {
        "name": "--flashcard-font-size",
        "description": "Font size of the face content (defaults to the size's font size)"
      },
      {
        "name": "--flashcard-label-color",
        "description": "Text color of the face captions"
      },
      {
        "name": "--flashcard-perspective",
        "description": "Perspective of the 3D flip (defaults to 1200px)"
      },
      {
        "name": "--flashcard-duration",
        "description": "Duration of the flip (defaults to 0.5s)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: axis-variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/vue/axis-variants.vue

```vue
<script setup lang="ts">
import { Flashcard } from "minerva-design/vue";
</script>
<template>
  <div
    style="
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    "
  >
    <Flashcard
      variant="elevated"
      front="elevated · axis y"
      back="Flips horizontally"
      :min-height="140"
    />
    <Flashcard
      variant="outline"
      axis="x"
      front="outline · axis x"
      back="Flips vertically"
      :min-height="140"
    />
    <Flashcard
      variant="filled"
      size="small"
      front="filled · small"
      back="Less padding, smaller type"
      :min-height="140"
    />
    <Flashcard
      size="large"
      front="large"
      back="The card grows to fit the taller face: this answer is much longer than the question, and the card height follows it on both sides."
      :min-height="140"
    />
  </div>
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/vue/basic.vue

```vue
<script setup lang="ts">
import { Flashcard } from "minerva-design/vue";
</script>
<template>
  <div style="max-width: 420px">
    <Flashcard
      front="What is the capital of Australia?"
      back="Canberra"
      show-hint
    />
  </div>
</template>

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/vue/controlled.vue

```vue
<script setup lang="ts">
import { computed, ref } from "vue";
import { Button, Flashcard, VStack } from "minerva-design/vue";
const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];
const ratings = ["Again", "Hard", "Good", "Easy"];
const index = ref(0);
const flipped = ref(false);
const log = ref<string[]>([]);
const card = computed(() => deck[index.value]!);
function rate(rating: string) {
  log.value = [...log.value, `${card.value.front}: ${rating}`].slice(-3);
  flipped.value = false;
  index.value = (index.value + 1) % deck.length;
}
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 420px">
    <Flashcard
      v-model:flipped="flipped"
      :front-label="`Card ${index + 1} / ${deck.length}`"
      back-label="Definition"
      :back="card.back"
    >
      <template #front
        ><strong style="font-size: 1.5rem">{{ card.front }}</strong></template
      >
      <template #footer>
        <template v-if="flipped">
          <Button
            v-for="rating in ratings"
            :key="rating"
            size="small"
            :variant="rating === 'Good' ? 'solid' : 'outline'"
            @click="rate(rating)"
            >{{ rating }}</Button
          >
        </template>
        <Button v-else size="small" @click="flipped = true">Show answer</Button>
      </template>
    </Flashcard>
    <output style="font-size: 13px">{{
      log.length ? log.join(" · ") : "Flip the card, then rate it."
    }}</output>
  </VStack>
</template>

```

## Example: reduced-disabled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/vue/reduced-disabled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Button, Flashcard } from "minerva-design/vue";
const flipped = ref(false);
</script>
<template>
  <div
    style="
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    "
  >
    <Flashcard
      front="Disabled"
      back="Never shown by a click"
      disabled
      :min-height="140"
    />
    <Flashcard
      front="flipOnClick = false"
      back="Flipped by the button below"
      :flip-on-click="false"
      :flipped="flipped"
      :front-label="null"
      :back-label="null"
      :min-height="140"
    >
      <template #footer
        ><Button size="small" @click="flipped = !flipped">{{
          flipped ? "Hide answer" : "Reveal answer"
        }}</Button></template
      >
    </Flashcard>
  </div>
</template>

```
