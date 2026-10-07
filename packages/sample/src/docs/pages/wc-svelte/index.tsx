import React from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const mainCode = `// src/main.ts (Svelte + Vite)
import { mount } from "svelte";
import "@minerva/lib-web-components";
import "@minerva/lib-web-components/tokens.css";
import App from "./App.svelte";

mount(App, { target: document.getElementById("app")! });`;

const componentCode = `<script lang="ts">
  import type { MinervaModal } from "@minerva/lib-web-components";

  let name = $state("Ada");
  let notify = $state(true);
  let modal: MinervaModal | undefined = $state();
  const plans = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];
</script>

<!-- props that exist on the element are set as properties -->
<minerva-input
  aria-label="Name"
  value={name}
  onminerva-input={(e: CustomEvent<{ value: string }>) => (name = e.detail.value)}
></minerva-input>

<minerva-select aria-label="Plan" options={plans} value="pro"></minerva-select>

<minerva-switch
  label="Email notifications"
  checked={notify}
  onminerva-change={(e: CustomEvent<{ checked: boolean }>) => (notify = e.detail.checked)}
></minerva-switch>

<minerva-button disabled={!name} onclick={() => modal?.show()}>Preview</minerva-button>

<!-- bind:this gives the element instance: properties and methods -->
<minerva-modal bind:this={modal} label="Preview">
  <p>{name} · {notify ? "emails on" : "emails off"}</p>
</minerva-modal>`;

const typesCode = `// src/app.d.ts (SvelteKit) or src/vite-env.d.ts
/// <reference types="@minerva/lib-web-components/svelte" />`;

const kitCode = `<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import "@minerva/lib-web-components/tokens.css";

  let { children } = $props();

  // onMount only runs in the browser
  onMount(async () => {
    await import("@minerva/lib-web-components");
  });
</script>

{@render children()}`;

const browserCode = `// or anywhere, guarded by $app/environment
import { browser } from "$app/environment";

if (browser) await import("@minerva/lib-web-components/select");`;

const WcSvelteDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.wc-svelte.${key}`);

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="setup">
        <h2 id="setup">{k("setup.title")}</h2>
        <p className={styles.prose}>{k("setup.text")}</p>
        <CodeBlock code={mainCode} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="binding">
        <h2 id="binding">{k("binding.title")}</h2>
        <p className={styles.prose}>{k("binding.text")}</p>
        <CodeBlock code={componentCode} language="html" title="App.svelte" />
        <ul className={styles.prose}>
          <li>{k("binding.properties")}</li>
          <li>{k("binding.events")}</li>
          <li>{k("binding.bindThis")}</li>
          <li>{k("binding.bindValue")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="types">
        <h2 id="types">{k("types.title")}</h2>
        <p className={styles.prose}>{k("types.text")}</p>
        <CodeBlock code={typesCode} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="sveltekit">
        <h2 id="sveltekit">{k("kit.title")}</h2>
        <p className={styles.prose}>{k("kit.text")}</p>
        <CodeBlock code={kitCode} language="html" />
        <CodeBlock code={browserCode} language="ts" />
      </section>
    </>
  );

  return <DocPage id="wc-svelte" intro={intro} />;
};

export default WcSvelteDoc;
