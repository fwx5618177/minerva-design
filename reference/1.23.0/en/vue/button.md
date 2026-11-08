# Button

Triggers an action or event, such as submitting a form or opening a dialog.

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

## Button

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Button"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "type",
    "type": "\"submit\" | \"button\" | \"reset\"",
    "default": "\"button\"",
    "required": false,
    "typeText": "\"submit\" | \"button\" | \"reset\""
  },
  {
    "name": "color",
    "type": "ColorScheme",
    "default": "\"primary\"",
    "required": false,
    "description": "Semantic color.",
    "typeText": "ColorScheme"
  },
  {
    "name": "variant",
    "type": "\"outline\" | \"solid\" | \"link\" | \"ghost\"",
    "default": "\"solid\"",
    "required": false,
    "description": "Visual variant.",
    "typeText": "\"outline\" | \"solid\" | \"link\" | \"ghost\""
  },
  {
    "name": "size",
    "type": "\"medium\" | \"small\" | \"large\" | \"xsmall\" | \"xlarge\"",
    "default": "\"medium\"",
    "required": false,
    "typeText": "\"medium\" | \"small\" | \"large\" | \"xsmall\" | \"xlarge\""
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "typeText": "boolean"
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Busy: spinner, `aria-busy`, ignores presses.",
    "typeText": "boolean"
  },
  {
    "name": "loadingText",
    "type": "string",
    "required": false,
    "description": "Label while loading (or the `loading-text` slot)",
    "typeText": "string"
  },
  {
    "name": "fullWidth",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Takes the full width of its container.",
    "typeText": "boolean"
  },
  {
    "name": "active",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Pressed / selected look (`data-state=\"active\"`).",
    "typeText": "boolean"
  },
  {
    "name": "shape",
    "type": "\"rounded\" | \"circle\" | \"square\"",
    "required": false,
    "typeText": "\"rounded\" | \"circle\" | \"square\""
  },
  {
    "name": "borderRadius",
    "type": "number | \"medium\" | \"small\" | \"large\" | \"circle\" | \"square\" | \"none\"",
    "required": false,
    "description": "Corner radius: a scale step or px",
    "typeText": "number | \"medium\" | \"small\" | \"large\" | \"circle\" | \"square\" | \"none\""
  }
]
```

### events

```json
[
  {
    "name": "click",
    "type": "[event: MouseEvent]",
    "typeText": "[event: MouseEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "MouseEvent",
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
    "description": "Label",
    "typeText": "any"
  },
  {
    "name": "start-icon",
    "type": "any",
    "description": "Icon before the label",
    "typeText": "any"
  },
  {
    "name": "end-icon",
    "type": "any",
    "description": "Icon after the label",
    "typeText": "any"
  },
  {
    "name": "loading-text",
    "type": "any",
    "description": "Label while loading (replaces the content; the `loadingText` prop)",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:Button": {
    "kind": "cssVars",
    "source": "react/src/components/Button",
    "vars": [
      {
        "name": "--button-height",
        "description": "Minimum height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--button-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--button-radius",
        "description": "Corner radius (defaults to --radius-md; the shape / borderRadius props win)"
      },
      {
        "name": "--button-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--button-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--button-gap",
        "description": "Space between the icons and the label"
      },
      {
        "name": "--button-label-white-space",
        "description": "White-space of the label: nowrap (default, truncates) or normal (wraps)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [Vue controlled project form](/minerva-design/reference/1.23.0/recipes/vue-form/README.md) — vue; verified package 1.23.0

## Example: basic

Click the button to increase the visible count by one.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/button/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Button, HStack } from "minerva-design/vue";
const count = ref(0);
</script>
<template>
  <HStack :gap="3" wrap>
    <Button @click="count++">Click me</Button>
    <output aria-live="polite">Clicked {{ count }} times</output>
  </HStack>
</template>

```

## Example: colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/button/vue/colors.vue

```vue
<script setup lang="ts">
import { Button, HStack } from "minerva-design/vue";
const colors = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;
</script>
<template>
  <HStack :gap="2" wrap
    ><Button v-for="color in colors" :key="color" :color="color">{{
      color[0].toUpperCase() + color.slice(1)
    }}</Button></HStack
  >
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/button/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Button, Input } from "minerva-design/vue";
const log = ref("Nothing yet");
function submit(event: Event) {
  const title = new FormData(event.target as HTMLFormElement).get("title");
  log.value = `Submitted "${String(title)}"`;
}
</script>
<template>
  <form
    @submit.prevent="submit"
    @reset="log = 'Reset'"
    style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center"
  >
    <Input name="title" aria-label="Title" default-value="Draft" />
    <Button
      color="neutral"
      variant="outline"
      @click="log = 'Preview opened (form not submitted)'"
      >Preview</Button
    >
    <Button type="reset" color="neutral" variant="ghost">Reset</Button
    ><Button type="submit">Save</Button
    ><output style="flex-basis: 100%">{{ log }}</output>
  </form>
</template>

```

## Example: icons-loading

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/button/vue/icons-loading.vue

```vue
<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { Button, HStack, VStack } from "minerva-design/vue";
const saving = ref(false);
let timer: ReturnType<typeof setTimeout>;
function save() {
  saving.value = true;
  timer = setTimeout(() => (saving.value = false), 1500);
}
onBeforeUnmount(() => clearTimeout(timer));
</script>
<template>
  <VStack :gap="3" style="max-width: 320px"
    ><Button
      ><template #start-icon><span aria-hidden="true">+</span></template
      >Add item</Button
    ><Button variant="outline"
      ><template #end-icon><span aria-hidden="true">→</span></template
      >Continue</Button
    ><Button
      color="success"
      full-width
      :loading="saving"
      loading-text="Saving..."
      @click="save"
      >Save</Button
    ></VStack
  >
</template>

```

## Example: shapes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/button/vue/shapes.vue

```vue
<script setup lang="ts">
import { Button, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="2" wrap
    ><Button shape="square">Square</Button
    ><Button shape="rounded">Rounded</Button
    ><Button shape="circle" aria-label="Add">+</Button
    ><Button border-radius="none">No radius</Button
    ><Button :border-radius="12">12px radius</Button></HStack
  >
</template>

```

## Example: sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/button/vue/sizes.vue

```vue
<script setup lang="ts">
import { Button, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="2" wrap
    ><Button size="xsmall">XSmall</Button><Button size="small">Small</Button
    ><Button size="medium">Medium</Button><Button size="large">Large</Button
    ><Button size="xlarge">XLarge</Button></HStack
  >
</template>

```

## Example: states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/button/vue/states.vue

```vue
<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { Button, HStack, VStack } from "minerva-design/vue";
const saving = ref(false);
let timer: ReturnType<typeof setTimeout>;
function save() {
  saving.value = true;
  timer = setTimeout(() => (saving.value = false), 1500);
}
onBeforeUnmount(() => clearTimeout(timer));
</script>
<template>
  <HStack :gap="2" wrap
    ><Button :loading="saving" @click="save">{{
      saving ? "Saving…" : "Save"
    }}</Button
    ><Button disabled>Disabled</Button><Button active>Active</Button></HStack
  >
</template>

```

## Example: variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/button/vue/variants.vue

```vue
<script setup lang="ts">
import { Button, HStack, VStack } from "minerva-design/vue";
const colors = ["primary", "neutral", "danger"] as const;
const variants = ["solid", "outline", "ghost", "link"] as const;
</script>
<template>
  <VStack :gap="3"
    ><HStack v-for="color in colors" :key="color" :gap="2" wrap
      ><Button
        v-for="variant in variants"
        :key="variant"
        :color="color"
        :variant="variant"
        >{{ variant }}</Button
      ></HStack
    ></VStack
  >
</template>

```

## Example: with-icon

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/button/vue/with-icon.vue

```vue
<script setup lang="ts">
import { Button, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="2" wrap
    ><Button
      ><template #start-icon><span aria-hidden="true">+</span></template
      >Add</Button
    ><Button color="danger"
      ><template #start-icon><span aria-hidden="true">↻</span></template
      >Retry</Button
    ><Button color="neutral" variant="ghost"
      ><template #start-icon><span aria-hidden="true">←</span></template
      >Back</Button
    ><Button color="danger" variant="outline" aria-label="Delete item"
      ><span aria-hidden="true">×</span></Button
    ></HStack
  >
</template>

```
