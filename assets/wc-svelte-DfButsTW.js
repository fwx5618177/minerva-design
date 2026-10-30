import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-wxAap2cZ.js";import{n as a,t as o}from"./CodeBlock-CJABAtvm.js";import{i as s,r as c}from"./DemoBlock-C9SrrBKM.js";import{n as l,t as u}from"./DocPage-JhXgs5p-.js";var d,f,p,m,h,g,_;function v(){return(v=e((()=>{t(),i(),a(),l(),s(),d=n(),f=`// src/main.ts (Svelte + Vite)
import { mount } from "svelte";
import "minerva-design/web-components";
import "minerva-design/tokens.css";
import App from "./App.svelte";

mount(App, { target: document.getElementById("app")! });`,p=`<script lang="ts">
  import type { MinervaModal } from "minerva-design/web-components";

  let name = $state("Ada");
  let notify = $state(true);
  let modal: MinervaModal | undefined = $state();
  const plans = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];
<\/script>

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
</minerva-modal>`,m=`// src/app.d.ts (SvelteKit) or src/vite-env.d.ts
/// <reference types="minerva-design/web-components/svelte" />`,h=`<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import "minerva-design/tokens.css";

  let { children } = $props();

  // onMount only runs in the browser
  onMount(async () => {
    await import("minerva-design/web-components");
  });
<\/script>

{@render children()}`,g=`// or anywhere, guarded by $app/environment
import { browser } from "$app/environment";

if (browser) await import("minerva-design/web-components/select");`,_=()=>{let{t:e}=r(),t=t=>e(`docs.wc-svelte.${t}`),n=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`setup`,children:[(0,d.jsx)(`h2`,{id:`setup`,children:t(`setup.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`setup.text`)}),(0,d.jsx)(o,{code:f,language:`ts`})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`binding`,children:[(0,d.jsx)(`h2`,{id:`binding`,children:t(`binding.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`binding.text`)}),(0,d.jsx)(o,{code:p,language:`html`,title:`App.svelte`}),(0,d.jsxs)(`ul`,{className:c.prose,children:[(0,d.jsx)(`li`,{children:t(`binding.properties`)}),(0,d.jsx)(`li`,{children:t(`binding.events`)}),(0,d.jsx)(`li`,{children:t(`binding.bindThis`)}),(0,d.jsx)(`li`,{children:t(`binding.bindValue`)})]})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`types`,children:[(0,d.jsx)(`h2`,{id:`types`,children:t(`types.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`types.text`)}),(0,d.jsx)(o,{code:m,language:`ts`})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`sveltekit`,children:[(0,d.jsx)(`h2`,{id:`sveltekit`,children:t(`kit.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`kit.text`)}),(0,d.jsx)(o,{code:h,language:`html`}),(0,d.jsx)(o,{code:g,language:`ts`})]})]});return(0,d.jsx)(u,{id:`wc-svelte`,intro:n})}})))()}v();export{_ as default};