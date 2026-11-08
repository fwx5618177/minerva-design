# Vue (Web Components)

Minerva custom elements in Vue 3 and Nuxt: compiler setup, property and event binding, the controlled pattern and Volar typings.

Package: minerva-design@1.23.2

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### Setup

Vue supports custom elements out of the box. Tell its template compiler that minerva-* tags are custom elements, so it does not try to resolve them as Vue components (and does not warn about them):

Then register the elements and load the design tokens once, in your entry file:

### Binding properties and events

Bind with :prop and listen with @minerva-*, as with native elements. A v-model-like two-way binding is a :value (or :checked) binding plus the matching event:

Vue sets a bound value as a DOM property when the element has a property with that name, and as an attribute otherwise. Register the elements before mounting the app, so that they are defined when Vue renders them, and arrays, objects and functions (options, items, render callbacks) reach the element as they are.

Booleans are plain booleans (:disabled="busy"); static boolean attributes are written without a value (clearable, required). Add the .attr modifier to force an attribute, and .prop to force a property.

Event names are kebab-case and used as they are: @minerva-change, @minerva-open-change. $event is the CustomEvent; read the new state from $event.detail. Native events (@click, @focus, @input, @change) work too.

v-model is designed for native inputs and Vue components, so use the explicit pair: :value + @minerva-input for text fields (each keystroke) or @minerva-change (committed value), :checked + @minerva-change for checkboxes and switches.

### Controlled open state

The element updates its own state when the user acts, then fires the event. Events that announce a change requested by the user (minerva-open-change, tab selection) are cancelable: call preventDefault() to keep the current state, and update your ref otherwise:

### Typings (Volar)

The package ships typings for Vue's GlobalComponents, generated from its Custom Elements Manifest: attributes, properties and events of every  tag are type-checked and completed in templates by Vue - Official (Volar) and vue-tsc. Add them to the types of your tsconfig:

### Nuxt

Configure the compiler in nuxt.config and register the elements in a client-only plugin. The tags are server-rendered as plain HTML with their attributes and upgraded in the browser once the plugin has run (importing the package on the server is safe too: the modules do not touch the DOM when they load).

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // <minerva-*> tags are custom elements, not Vue components
          isCustomElement: (tag) => tag.startsWith("minerva-"),
        },
      },
    }),
  ],
});
```

```ts
// main.ts
import { createApp } from "vue";
import "minerva-design/web-components"; // or per element: ".../select", ".../switch"
import "minerva-design/tokens.css";
import App from "./App.vue";

createApp(App).mount("#app");
```

```html
<script setup lang="ts">
import { ref } from "vue";

const name = ref("Ada");
const plan = ref("pro");
const notify = ref(true);
const saving = ref(false);
const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
];
</script>

<template>
  <!-- :value is set as a property; the event carries the new value -->
  <minerva-input
    aria-label="Name"
    :value="name"
    @minerva-input="name = $event.detail.value"
  />

  <!-- arrays and objects are properties too -->
  <minerva-select
    aria-label="Plan"
    :options="plans"
    :value="plan"
    @minerva-change="plan = $event.detail.value"
  />

  <minerva-switch
    label="Email notifications"
    :checked="notify"
    @minerva-change="notify = $event.detail.checked"
  />

  <!-- booleans: a plain boolean, set as a property -->
  <minerva-button :loading="saving" :disabled="!name" @click="saving = true">
    Save
  </minerva-button>
</template>
```

```html
<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
const dirty = ref(true);

// the user asked to close: keep the modal open while there are changes
function onOpenChange(event: CustomEvent<{ open: boolean }>) {
  if (!event.detail.open && dirty.value) event.preventDefault();
  else open.value = event.detail.open;
}
</script>

<template>
  <minerva-modal label="Edit profile" :open="open" @minerva-open-change="onOpenChange">
    ...
  </minerva-modal>
</template>
```

```json
// tsconfig.json (or tsconfig.app.json)
{
  "compilerOptions": {
    "types": ["minerva-design/web-components/vue"]
  }
}
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["minerva-design/tokens.css"],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("minerva-"),
    },
  },
});

// plugins/minerva.client.ts: the .client suffix runs it in the browser only
import "minerva-design/web-components";

export default defineNuxtPlugin(() => {});
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
