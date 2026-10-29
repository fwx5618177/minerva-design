import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Dt as r,Ot as i}from"./io5-CsJcK0E2.js";import{n as a,t as o}from"./CodeBlock-BQgsMlY6.js";import{i as s,r as c}from"./DemoBlock-BlhGv9r1.js";import{n as l,t as u}from"./DocPage-PfpTBKws.js";var d,f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{t(),r(),a(),l(),s(),d=n(),f=`pnpm add minerva-design vue
# or: npm install minerva-design vue`,p=`// src/main.ts
import { createApp } from "vue";
import "minerva-design/style.css"; // once: the same stylesheet as React
import App from "./App.vue";

createApp(App).mount("#app");`,m=`<script setup lang="ts">
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
</template>`,h=`// src/main.ts: register every component globally (<MnButton>, <MnModal>...)
import { createApp } from "vue";
import MinervaVue from "minerva-design/vue";
import "minerva-design/style.css";
import App from "./App.vue";

createApp(App).use(MinervaVue).mount("#app");
// another prefix: app.use(MinervaVue, { prefix: "Ui" }) -> <UiButton>`,g=`// tsconfig.json: Volar typings of the global <Mn*> components
{
  "compilerOptions": {
    "types": ["minerva-design/vue/global"]
  }
}`,_=`<script setup lang="ts">
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
</template>`,v=`import { useConfirm, useI18n, useTheme, useToast } from "minerva-design/vue";

const theme = useTheme(); // theme.theme, theme.resolvedTheme, theme.setTheme("dark")
const { t } = useI18n(); // t(closeKey) in the provider's language
const toast = useToast(); // toast.success("Saved")
const confirm = useConfirm(); // await confirm({ title: "Delete?" }) -> boolean`,y=`// nuxt.config.ts
export default defineNuxtConfig({
  css: ["minerva-design/style.css"],
  build: { transpile: [] }, // nothing to transpile: the package ships ESM
});

// plugins/minerva.ts (optional: global <Mn*> components, SSR-safe)
import MinervaVue from "minerva-design/vue";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MinervaVue);
});`,b=`// a Vue island inside a page whose theme is owned by another framework
import { createApp } from "vue";
import { provideEmbeddedScope } from "minerva-design/vue";

const app = createApp(Island);
provideEmbeddedScope(app, { language: "ja" }); // providers never touch <html>
app.mount("#island");`,x=()=>{let{t:e}=i(),t=t=>e(`docs.vue.${t}`),n=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`install`,children:[(0,d.jsx)(`h2`,{id:`install`,children:t(`install.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`install.text`)}),(0,d.jsx)(o,{code:f,language:`bash`}),(0,d.jsx)(`p`,{className:c.prose,children:t(`install.stylesheet`)}),(0,d.jsx)(o,{code:p,language:`ts`,title:`src/main.ts`})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`usage`,children:[(0,d.jsx)(`h2`,{id:`usage`,children:t(`usage.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`usage.text`)}),(0,d.jsx)(o,{code:m,language:`html`,title:`App.vue`}),(0,d.jsxs)(`ul`,{className:c.prose,children:[(0,d.jsx)(`li`,{children:t(`usage.vModel`)}),(0,d.jsx)(`li`,{children:t(`usage.events`)}),(0,d.jsx)(`li`,{children:t(`usage.slots`)})]})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`plugin`,children:[(0,d.jsx)(`h2`,{id:`plugin`,children:t(`plugin.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`plugin.text`)}),(0,d.jsx)(o,{code:h,language:`ts`}),(0,d.jsx)(`p`,{className:c.prose,children:t(`plugin.types`)}),(0,d.jsx)(o,{code:g,language:`json`})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`theming`,children:[(0,d.jsx)(`h2`,{id:`theming`,children:t(`theming.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`theming.text`)}),(0,d.jsx)(o,{code:_,language:`html`}),(0,d.jsx)(`p`,{className:c.prose,children:t(`theming.composables`)}),(0,d.jsx)(o,{code:v,language:`ts`})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`nuxt`,children:[(0,d.jsx)(`h2`,{id:`nuxt`,children:t(`nuxt.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`nuxt.text`)}),(0,d.jsx)(o,{code:y,language:`ts`})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`islands`,children:[(0,d.jsx)(`h2`,{id:`islands`,children:t(`islands.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`islands.text`)}),(0,d.jsx)(o,{code:b,language:`ts`})]})]});return(0,d.jsx)(u,{id:`vue`,intro:n})}})))()}S();export{x as default};