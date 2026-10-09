import React from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const installCode = `pnpm add minerva-design vue
# or: npm install minerva-design vue`;

const mainCode = `// src/main.ts
import { createApp } from "vue";
import "minerva-design/style.css"; // once: the same stylesheet as React
import App from "./App.vue";

createApp(App).mount("#app");`;

const importCode = `<script setup lang="ts">
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
</template>`;

const pluginCode = `// src/main.ts: register every component globally (<MnButton>, <MnModal>...)
import { createApp } from "vue";
import MinervaVue from "minerva-design/vue";
import "minerva-design/style.css";
import App from "./App.vue";

createApp(App).use(MinervaVue).mount("#app");
// another prefix: app.use(MinervaVue, { prefix: "Ui" }) -> <UiButton>`;

const typesCode = `// tsconfig.json: Volar typings of the global <Mn*> components
{
  "compilerOptions": {
    "types": ["minerva-design/vue/global"]
  }
}`;

const themeCode = `<script setup lang="ts">
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
</template>`;

const composablesCode = `import { useConfirm, useI18n, useTheme, useToast } from "minerva-design/vue";

const theme = useTheme(); // theme.theme, theme.resolvedTheme, theme.setTheme("dark")
const { t } = useI18n(); // t(closeKey) in the provider's language
const toast = useToast(); // toast.success("Saved")
const confirm = useConfirm(); // await confirm({ title: "Delete?" }) -> boolean`;

const nuxtCode = `// nuxt.config.ts
export default defineNuxtConfig({
  css: ["minerva-design/style.css"],
  build: { transpile: [] }, // nothing to transpile: the package ships ESM
});

// plugins/minerva.ts (optional: global <Mn*> components, SSR-safe)
import MinervaVue from "minerva-design/vue";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MinervaVue);
});`;

const islandCode = `// a Vue island inside a page whose theme is owned by another framework
import { createApp } from "vue";
import { provideEmbeddedScope } from "minerva-design/vue";

const app = createApp(Island);
provideEmbeddedScope(app, { language: "ja" }); // providers never touch <html>
app.mount("#island");`;

const VueDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.vue.${key}`);

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="install">
        <h2 id="install">{k("install.title")}</h2>
        <p className={styles.prose}>{k("install.text")}</p>
        <CodeBlock code={installCode} language="bash" />
        <p className={styles.prose}>{k("install.stylesheet")}</p>
        <CodeBlock code={mainCode} language="ts" title="src/main.ts" />
      </section>

      <section className={styles.section} aria-labelledby="usage">
        <h2 id="usage">{k("usage.title")}</h2>
        <p className={styles.prose}>{k("usage.text")}</p>
        <CodeBlock code={importCode} language="html" title="App.vue" />
        <ul className={styles.prose}>
          <li>{k("usage.vModel")}</li>
          <li>{k("usage.events")}</li>
          <li>{k("usage.slots")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="plugin">
        <h2 id="plugin">{k("plugin.title")}</h2>
        <p className={styles.prose}>{k("plugin.text")}</p>
        <CodeBlock code={pluginCode} language="ts" />
        <p className={styles.prose}>{k("plugin.types")}</p>
        <CodeBlock code={typesCode} language="json" />
      </section>

      <section className={styles.section} aria-labelledby="theming">
        <h2 id="theming">{k("theming.title")}</h2>
        <p className={styles.prose}>{k("theming.text")}</p>
        <CodeBlock code={themeCode} language="html" />
        <p className={styles.prose}>{k("theming.composables")}</p>
        <CodeBlock code={composablesCode} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="nuxt">
        <h2 id="nuxt">{k("nuxt.title")}</h2>
        <p className={styles.prose}>{k("nuxt.text")}</p>
        <CodeBlock code={nuxtCode} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="islands">
        <h2 id="islands">{k("islands.title")}</h2>
        <p className={styles.prose}>{k("islands.text")}</p>
        <CodeBlock code={islandCode} language="ts" />
      </section>
    </>
  );

  return <DocPage id="vue" intro={intro} />;
};

export default VueDoc;
