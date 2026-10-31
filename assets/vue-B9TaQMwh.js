import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CsvLrYUR.js";import{n as a,t as o}from"./Alert-DYH-oD8D.js";import{n as s,t as c}from"./CodeBlock-Cbwktov2.js";import{i as l,r as u}from"./DemoBlock-DnM97CAJ.js";import{n as d,t as f}from"./DocPage-CmQtD5jg.js";var p,m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{t(),i(),a(),s(),d(),l(),p=n(),m=`pnpm add minerva-design vue
# or: npm install minerva-design vue`,h=`// src/main.ts
import { createApp } from "vue";
import "minerva-design/style.css"; // once: the same stylesheet as React
import App from "./App.vue";

createApp(App).mount("#app");`,g=`<script setup lang="ts">
import { ref } from "vue";
// named imports: only what you use ends up in the bundle
import { Button, Input, Modal, Switch } from "minerva-design/vue";

const name = ref("");
const notify = ref(true);
const open = ref(false);
<\/script>

<template>
  <Input v-model="name" placeholder="Name" />
  <Switch v-model="notify" label="Email notifications" />
  <Button :disabled="!name" @click="open = true">Save</Button>

  <Modal v-model:open="open" title="Saved" description="Your profile is up to date.">
    <Button @click="open = false">Close</Button>
  </Modal>
</template>`,_=`// src/main.ts: register every component globally (<MnButton>, <MnModal>...)
import { createApp } from "vue";
import MinervaVue from "minerva-design/vue";
import "minerva-design/style.css";
import App from "./App.vue";

createApp(App).use(MinervaVue).mount("#app");
// another prefix: app.use(MinervaVue, { prefix: "Ui" }) -> <UiButton>`,v=`// tsconfig.json: Volar typings of the global <Mn*> components
{
  "compilerOptions": {
    "types": ["minerva-design/vue/global"]
  }
}`,y=`// src/main.ts: the global chart components are opt-in (they load the chart engine)
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
// without a plugin: import { LineChart } from "minerva-design/vue/charts";`,b=`// vite.config.ts: pre-bundle both entries together at startup
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
import { LineChart, PieChart } from "minerva-design/vue/charts";`,x=`<script setup lang="ts">
import { ConfigProvider, ThemeToggle, useTheme } from "minerva-design/vue";
<\/script>

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
</template>`,S=`import { useConfirm, useI18n, useTheme, useToast } from "minerva-design/vue";

const theme = useTheme(); // theme.theme, theme.resolvedTheme, theme.setTheme("dark")
const { t } = useI18n(); // t(closeKey) in the provider's language
const toast = useToast(); // toast.success("Saved")
const confirm = useConfirm(); // await confirm({ title: "Delete?" }) -> boolean`,C=`// nuxt.config.ts
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
});`,w=`// a Vue island inside a page whose theme is owned by another framework
import { createApp } from "vue";
import { provideEmbeddedScope } from "minerva-design/vue";

const app = createApp(Island);
provideEmbeddedScope(app, { language: "ja" }); // providers never touch <html>
app.mount("#island");`,T=()=>{let{t:e}=r(),t=t=>e(`docs.vue.${t}`),n=(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(`section`,{className:u.section,"aria-labelledby":`install`,children:[(0,p.jsx)(`h2`,{id:`install`,children:t(`install.title`)}),(0,p.jsx)(`p`,{className:u.prose,children:t(`install.text`)}),(0,p.jsx)(c,{code:m,language:`bash`}),(0,p.jsx)(`p`,{className:u.prose,children:t(`install.stylesheet`)}),(0,p.jsx)(c,{code:h,language:`ts`,title:`src/main.ts`})]}),(0,p.jsxs)(`section`,{className:u.section,"aria-labelledby":`usage`,children:[(0,p.jsx)(`h2`,{id:`usage`,children:t(`usage.title`)}),(0,p.jsx)(`p`,{className:u.prose,children:t(`usage.text`)}),(0,p.jsx)(c,{code:g,language:`html`,title:`App.vue`}),(0,p.jsxs)(`ul`,{className:u.prose,children:[(0,p.jsx)(`li`,{children:t(`usage.vModel`)}),(0,p.jsx)(`li`,{children:t(`usage.events`)}),(0,p.jsx)(`li`,{children:t(`usage.slots`)})]})]}),(0,p.jsxs)(`section`,{className:u.section,"aria-labelledby":`plugin`,children:[(0,p.jsx)(`h2`,{id:`plugin`,children:t(`plugin.title`)}),(0,p.jsx)(`p`,{className:u.prose,children:t(`plugin.text`)}),(0,p.jsx)(c,{code:_,language:`ts`}),(0,p.jsx)(`p`,{className:u.prose,children:t(`plugin.types`)}),(0,p.jsx)(c,{code:v,language:`json`}),(0,p.jsx)(`h3`,{id:`plugin-charts`,children:t(`plugin.charts.title`)}),(0,p.jsx)(`p`,{className:u.prose,children:t(`plugin.charts.text`)}),(0,p.jsx)(c,{code:y,language:`ts`}),(0,p.jsx)(o,{color:`warning`,title:t(`plugin.charts.migration.title`),children:t(`plugin.charts.migration.text`)}),(0,p.jsx)(`h3`,{id:`plugin-charts-dev`,children:t(`plugin.charts.dev.title`)}),(0,p.jsx)(`p`,{className:u.prose,children:t(`plugin.charts.dev.text`)}),(0,p.jsx)(c,{code:b,language:`ts`}),(0,p.jsx)(`p`,{className:u.prose,children:t(`plugin.charts.dev.exclude`)}),(0,p.jsx)(o,{color:`info`,title:`2.0`,children:t(`plugin.charts.dev.future`)})]}),(0,p.jsxs)(`section`,{className:u.section,"aria-labelledby":`theming`,children:[(0,p.jsx)(`h2`,{id:`theming`,children:t(`theming.title`)}),(0,p.jsx)(`p`,{className:u.prose,children:t(`theming.text`)}),(0,p.jsx)(c,{code:x,language:`html`}),(0,p.jsx)(`p`,{className:u.prose,children:t(`theming.composables`)}),(0,p.jsx)(c,{code:S,language:`ts`})]}),(0,p.jsxs)(`section`,{className:u.section,"aria-labelledby":`nuxt`,children:[(0,p.jsx)(`h2`,{id:`nuxt`,children:t(`nuxt.title`)}),(0,p.jsx)(`p`,{className:u.prose,children:t(`nuxt.text`)}),(0,p.jsx)(c,{code:C,language:`ts`})]}),(0,p.jsxs)(`section`,{className:u.section,"aria-labelledby":`islands`,children:[(0,p.jsx)(`h2`,{id:`islands`,children:t(`islands.title`)}),(0,p.jsx)(`p`,{className:u.prose,children:t(`islands.text`)}),(0,p.jsx)(c,{code:w,language:`ts`})]})]});return(0,p.jsx)(f,{id:`vue`,intro:n})}})))()}E();export{T as default};