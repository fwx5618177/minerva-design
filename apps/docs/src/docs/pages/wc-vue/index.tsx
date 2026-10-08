import React from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const viteCode = `// vite.config.ts
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
});`;

const mainCode = `// main.ts
import { createApp } from "vue";
import "minerva-design/web-components"; // or per element: ".../select", ".../switch"
import "minerva-design/tokens.css";
import App from "./App.vue";

createApp(App).mount("#app");`;

const sfcCode = `<script setup lang="ts">
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
</template>`;

const controlledCode = `<script setup lang="ts">
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
</template>`;

const typesCode = `// tsconfig.json (or tsconfig.app.json)
{
  "compilerOptions": {
    "types": ["minerva-design/web-components/vue"]
  }
}`;

const nuxtCode = `// nuxt.config.ts
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

export default defineNuxtPlugin(() => {});`;

const WcVueDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.wc-vue.${key}`);

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="setup">
        <h2 id="setup">{k("setup.title")}</h2>
        <p className={styles.prose}>{k("setup.text")}</p>
        <CodeBlock code={viteCode} language="ts" />
        <p className={styles.prose}>{k("setup.register")}</p>
        <CodeBlock code={mainCode} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="binding">
        <h2 id="binding">{k("binding.title")}</h2>
        <p className={styles.prose}>{k("binding.text")}</p>
        <CodeBlock code={sfcCode} language="html" title="App.vue" />
        <ul className={styles.prose}>
          <li>{k("binding.properties")}</li>
          <li>{k("binding.booleans")}</li>
          <li>{k("binding.events")}</li>
          <li>{k("binding.vModel")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="controlled">
        <h2 id="controlled">{k("controlled.title")}</h2>
        <p className={styles.prose}>{k("controlled.text")}</p>
        <CodeBlock code={controlledCode} language="html" />
      </section>

      <section className={styles.section} aria-labelledby="types">
        <h2 id="types">{k("types.title")}</h2>
        <p className={styles.prose}>{k("types.text")}</p>
        <CodeBlock code={typesCode} language="json" />
      </section>

      <section className={styles.section} aria-labelledby="nuxt">
        <h2 id="nuxt">{k("nuxt.title")}</h2>
        <p className={styles.prose}>{k("nuxt.text")}</p>
        <CodeBlock code={nuxtCode} language="ts" />
      </section>
    </>
  );

  return <DocPage id="wc-vue" intro={intro} />;
};

export default WcVueDoc;
