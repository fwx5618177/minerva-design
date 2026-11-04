# Vue

The native Vue 3 components of minerva-design/vue: installation, the global stylesheet, per-component imports or the plugin, v-model and emits, theming with nested ConfigProvider scopes, Nuxt / SSR and Volar typings.

Package: minerva-design@1.21.0

Renderer: weapp

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

### Installation

Install the package with Vue 3.5 or later (an optional peer dependency). minerva-design/vue ships ES modules and type declarations; the components are Vue single-file components built on the same headless core as React.

Import the global stylesheet once, in your entry file. It is the same file as for React: the Vue components render the same class names and styling hooks, so design tokens, themes, palettes and CSS variables apply unchanged.

### Using the components

Import components by name; your bundler keeps only those you use (every export is side-effect free).

Values are v-model (modelValue / update:modelValue) with defaultValue / defaultChecked for uncontrolled use; overlays use v-model:open (defaultOpen), other controlled props v-model:name (v-model:current, v-model:expanded).

Events are typed emits named like the React callbacks without "on": onChange → @change, onOpenChange → @open-change, with the same arguments.

Rich content goes in slots (#trigger, #title, #start-icon...); simple texts stay props (title, description, label).

### Global registration

Prefer named imports. To use the components in every template without importing them, install the plugin: it registers them as , ... (the prefix is configurable).

The global components are typed for Vue - Official (Volar) and vue-tsc by the minerva-design/vue/global typings:

#### Charts

MinervaVue does not register the charts, so that apps without charts never load the chart engine. Import the charts by name from minerva-design/vue/charts (recommended; they are also still exported by minerva-design/vue), or install the opt-in MinervaVueCharts plugin of minerva-design/vue/charts: it registers , , ... with the same prefix option, typed by minerva-design/vue/charts-global.

##### Upgrading from 1.4

Since 1.5, app.use(MinervaVue) no longer registers ,  and the other chart components. If your templates use them without importing them, add app.use(MinervaVueCharts) from minerva-design/vue/charts (with the same prefix as MinervaVue, if you changed it) and add minerva-design/vue/charts-global to the types of tsconfig.json. Named imports are unchanged.

##### Charts and the Vite dev server

Production builds tree-shake the charts: an app that never imports a chart ships no chart code, with or without app.use(MinervaVue). In development, however, Vite pre-bundles every export of minerva-design/vue into a single file, so the chart wrappers and the chart engine (about 0.7 MB unminified) are part of it even when no chart is used. The pre-bundle is cached in node_modules/.vite, so this only costs parsing time on a full page load. If your app uses charts, import them from minerva-design/vue/charts and list both entries in optimizeDeps.include, so that Vite pre-bundles them together at startup instead of re-optimizing and reloading the page the first time a chart is imported:

Excluding minerva-design/charts/core from optimizeDeps does not help: the Vue components reach the engine through a relative path inside the package. Excluding minerva-design/vue does not help either: the browser would then load hundreds of unbundled modules, the charts included.

minerva-design/vue keeps exporting the chart components until the next major version, because removing them would break existing named imports. In 2.0 they will only be exported by minerva-design/vue/charts, which will also remove them from the dev pre-bundle. Importing charts from minerva-design/vue/charts today makes that upgrade a no-op.

### Theming and i18n

ConfigProvider sets the theme, palette, design axes and the language of the built-in texts. The root provider owns ; a nested provider scopes its overrides to its subtree, overlays included (they are teleported into a matching scope container).

Composables read the closest provider:

### Nuxt and server rendering

The components render on the server with vue/server-renderer and hydrate without mismatches: overlays (modals, popovers, toasts) mount on the client, ids come from Vue's useId(), and nothing touches the DOM during setup. In Nuxt, add the stylesheet to css and, optionally, a plugin for the global components (and MinervaVueCharts for the global charts).

### Vue islands

Mounting a Vue app inside a page whose theme is owned by another framework (micro-frontends, a Vue widget in a React page)? Call provideEmbeddedScope before mounting: its providers then behave as nested ones and never write . This documentation uses it for every Vue demo.

```bash
pnpm add minerva-design vue
# or: npm install minerva-design vue
```

```ts
// src/main.ts
import { createApp } from "vue";
import "minerva-design/style.css"; // once: the same stylesheet as React
import App from "./App.vue";

createApp(App).mount("#app");
```

```html
<script setup lang="ts">
import { ref } from "vue";
// named imports: only what you use ends up in the bundle
import { Button, Input, Modal, Switch } from "minerva-design/vue";

const name = ref("");
const notify = ref(true);
const open = ref(false);
</script>

<template>
  <Input v-model="name" placeholder="Name" />
  <Switch v-model="notify" label="Email notifications" />
  <Button :disabled="!name" @click="open = true">Save</Button>

  <Modal v-model:open="open" title="Saved" description="Your profile is up to date.">
    <Button @click="open = false">Close</Button>
  </Modal>
</template>
```

```ts
// src/main.ts: register every component globally (<MnButton>, <MnModal>...)
import { createApp } from "vue";
import MinervaVue from "minerva-design/vue";
import "minerva-design/style.css";
import App from "./App.vue";

createApp(App).use(MinervaVue).mount("#app");
// another prefix: app.use(MinervaVue, { prefix: "Ui" }) -> <UiButton>
```

```json
// tsconfig.json: Volar typings of the global <Mn*> components
{
  "compilerOptions": {
    "types": ["minerva-design/vue/global"]
  }
}
```

```ts
// src/main.ts: the global chart components are opt-in (they load the chart engine)
import { createApp } from "vue";
import MinervaVue from "minerva-design/vue";
import { MinervaVueCharts } from "minerva-design/vue/charts";
import "minerva-design/style.css";
import App from "./App.vue";

createApp(App)
  .use(MinervaVue) // <MnButton>, <MnModal>...
  .use(MinervaVueCharts) // <MnLineChart>, <MnPieChart>... (same prefix option)
  .mount("#app");

// tsconfig.json: "types": ["minerva-design/vue/global", "minerva-design/vue/charts-global"]
// without a plugin: import { LineChart } from "minerva-design/vue/charts";
```

```ts
// vite.config.ts: pre-bundle both entries together at startup
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["minerva-design/vue", "minerva-design/vue/charts"],
  },
});

// components: charts from their own entry (the only one from 2.0)
import { Button } from "minerva-design/vue";
import { LineChart, PieChart } from "minerva-design/vue/charts";
```

```html
<script setup lang="ts">
import { ConfigProvider, ThemeToggle, useTheme } from "minerva-design/vue";
</script>

<template>
  <!-- root provider: owns <html> (theme, palette, design) and the language -->
  <ConfigProvider theme="system" palette="ocean" :locale="{ language: 'fr' }" persist>
    <ThemeToggle />
    <RouterView />

    <!-- nested provider: scoped to its subtree (and its overlays) -->
    <ConfigProvider theme="dark" density="compact">
      <AdminPanel />
    </ConfigProvider>
  </ConfigProvider>
</template>
```

```ts
import { useConfirm, useI18n, useTheme, useToast } from "minerva-design/vue";

const theme = useTheme(); // theme.theme, theme.resolvedTheme, theme.setTheme("dark")
const { t } = useI18n(); // t(closeKey) in the provider's language
const toast = useToast(); // toast.success("Saved")
const confirm = useConfirm(); // await confirm({ title: "Delete?" }) -> boolean
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["minerva-design/style.css"],
  build: { transpile: [] }, // nothing to transpile: the package ships ESM
});

// plugins/minerva.ts (optional: global <Mn*> components, SSR-safe)
import MinervaVue from "minerva-design/vue";
import { MinervaVueCharts } from "minerva-design/vue/charts";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MinervaVue);
  nuxtApp.vueApp.use(MinervaVueCharts); // only if templates use <Mn*Chart>
});
```

```ts
// a Vue island inside a page whose theme is owned by another framework
import { createApp } from "vue";
import { provideEmbeddedScope } from "minerva-design/vue";

const app = createApp(Island);
provideEmbeddedScope(app, { language: "ja" }); // providers never touch <html>
app.mount("#island");
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
