import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ConfigProviderBrandColor.vue -->

<template>
  <div
    style="
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    "
  >
    <minerva-config primary-color="#4f46e5">
      <minerva-card variant="outline" padding="medium">
        <minerva-card-header>
          <minerva-card-title>primary-color="#4f46e5"</minerva-card-title>
        </minerva-card-header>
        <minerva-card-content>
          <minerva-button>Primary</minerva-button>
          <minerva-button variant="outline">Outline</minerva-button>
        </minerva-card-content>
      </minerva-card>
    </minerva-config>
    <minerva-config primary-color="#4f46e5" theme="dark">
      <minerva-card variant="outline" padding="medium">
        <minerva-card-header>
          <minerva-card-title>Indigo + dark (#7b85f2)</minerva-card-title>
        </minerva-card-header>
        <minerva-card-content>
          <minerva-button>Primary</minerva-button>
          <minerva-button variant="outline">Outline</minerva-button>
        </minerva-card-content>
      </minerva-card>
    </minerva-config>
    <minerva-config primary-color="#0d9488" palette="editorial">
      <minerva-card variant="outline" padding="medium">
        <minerva-card-header>
          <minerva-card-title>Teal over palette="editorial"</minerva-card-title>
        </minerva-card-header>
        <minerva-card-content>
          <minerva-button>Primary</minerva-button>
          <minerva-button variant="outline">Outline</minerva-button>
        </minerva-card-content>
      </minerva-card>
    </minerva-config>
  </div>
</template>
`,angular:`// config-provider-brand-color.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-config-provider-brand-color",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div
      style="
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      "
    >
      <minerva-config primary-color="#4f46e5">
        <minerva-card variant="outline" padding="medium">
          <minerva-card-header>
            <minerva-card-title>primary-color="#4f46e5"</minerva-card-title>
          </minerva-card-header>
          <minerva-card-content>
            <minerva-button>Primary</minerva-button>
            <minerva-button variant="outline">Outline</minerva-button>
          </minerva-card-content>
        </minerva-card>
      </minerva-config>
      <minerva-config primary-color="#4f46e5" theme="dark">
        <minerva-card variant="outline" padding="medium">
          <minerva-card-header>
            <minerva-card-title>Indigo + dark (#7b85f2)</minerva-card-title>
          </minerva-card-header>
          <minerva-card-content>
            <minerva-button>Primary</minerva-button>
            <minerva-button variant="outline">Outline</minerva-button>
          </minerva-card-content>
        </minerva-card>
      </minerva-config>
      <minerva-config primary-color="#0d9488" palette="editorial">
        <minerva-card variant="outline" padding="medium">
          <minerva-card-header>
            <minerva-card-title
              >Teal over palette="editorial"</minerva-card-title
            >
          </minerva-card-header>
          <minerva-card-content>
            <minerva-button>Primary</minerva-button>
            <minerva-button variant="outline">Outline</minerva-button>
          </minerva-card-content>
        </minerva-card>
      </minerva-config>
    </div>
  \`,
})
export class ConfigProviderBrandColorComponent {}
`,svelte:`<!-- ConfigProviderBrandColor.svelte -->

<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config primary-color="#4f46e5">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>primary-color="#4f46e5"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#4f46e5" theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Indigo + dark (#7b85f2)</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#0d9488" palette="editorial">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Teal over palette="editorial"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>
`,solid:`// ConfigProviderBrandColor.tsx

export default function ConfigProviderBrandColor() {
  return (
    <div
      style="
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      "
    >
      <minerva-config primary-color="#4f46e5">
        <minerva-card variant="outline" padding="medium">
          <minerva-card-header>
            <minerva-card-title>primary-color="#4f46e5"</minerva-card-title>
          </minerva-card-header>
          <minerva-card-content>
            <minerva-button>Primary</minerva-button>
            <minerva-button variant="outline">Outline</minerva-button>
          </minerva-card-content>
        </minerva-card>
      </minerva-config>
      <minerva-config primary-color="#4f46e5" theme="dark">
        <minerva-card variant="outline" padding="medium">
          <minerva-card-header>
            <minerva-card-title>Indigo + dark (#7b85f2)</minerva-card-title>
          </minerva-card-header>
          <minerva-card-content>
            <minerva-button>Primary</minerva-button>
            <minerva-button variant="outline">Outline</minerva-button>
          </minerva-card-content>
        </minerva-card>
      </minerva-config>
      <minerva-config primary-color="#0d9488" palette="editorial">
        <minerva-card variant="outline" padding="medium">
          <minerva-card-header>
            <minerva-card-title>
              Teal over palette="editorial"
            </minerva-card-title>
          </minerva-card-header>
          <minerva-card-content>
            <minerva-button>Primary</minerva-button>
            <minerva-button variant="outline">Outline</minerva-button>
          </minerva-card-content>
        </minerva-card>
      </minerva-config>
    </div>
  );
}
`,html:`<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config primary-color="#4f46e5">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>primary-color="#4f46e5"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#4f46e5" theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Indigo + dark (#7b85f2)</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#0d9488" palette="editorial">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Teal over palette="editorial"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};