import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- IconBasic.vue -->

<template>
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
    <minerva-icon name="home"></minerva-icon>
    <minerva-icon name="search"></minerva-icon>
    <minerva-icon name="settings"></minerva-icon>
    <minerva-button>
      <minerva-icon slot="start" name="download" size="16"></minerva-icon>
      Download
    </minerva-button>
    <minerva-button color="danger" variant="outline">
      <minerva-icon slot="start" name="trash" size="16"></minerva-icon>
      Delete
    </minerva-button>
    <minerva-icon name="bell" size="32" label="Notifications"></minerva-icon>
  </div>
</template>
`,angular:`// icon-basic.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-icon-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
      <minerva-icon name="home"></minerva-icon>
      <minerva-icon name="search"></minerva-icon>
      <minerva-icon name="settings"></minerva-icon>
      <minerva-button>
        <minerva-icon slot="start" name="download" size="16"></minerva-icon>
        Download
      </minerva-button>
      <minerva-button color="danger" variant="outline">
        <minerva-icon slot="start" name="trash" size="16"></minerva-icon>
        Delete
      </minerva-button>
      <minerva-icon name="bell" size="32" label="Notifications"></minerva-icon>
    </div>
  \`,
})
export class IconBasicComponent {}
`,svelte:`<!-- IconBasic.svelte -->

<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
  <minerva-icon name="home"></minerva-icon>
  <minerva-icon name="search"></minerva-icon>
  <minerva-icon name="settings"></minerva-icon>
  <minerva-button>
    <minerva-icon slot="start" name="download" size="16"></minerva-icon>
    Download
  </minerva-button>
  <minerva-button color="danger" variant="outline">
    <minerva-icon slot="start" name="trash" size="16"></minerva-icon>
    Delete
  </minerva-button>
  <minerva-icon name="bell" size="32" label="Notifications"></minerva-icon>
</div>
`,solid:`// IconBasic.tsx

export default function IconBasic() {
  return (
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
      <minerva-icon name="home"></minerva-icon>
      <minerva-icon name="search"></minerva-icon>
      <minerva-icon name="settings"></minerva-icon>
      <minerva-button>
        <minerva-icon slot="start" name="download" size="16"></minerva-icon>
        Download
      </minerva-button>
      <minerva-button color="danger" variant="outline">
        <minerva-icon slot="start" name="trash" size="16"></minerva-icon>
        Delete
      </minerva-button>
      <minerva-icon name="bell" size="32" label="Notifications"></minerva-icon>
    </div>
  );
}
`,html:`<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
  <minerva-icon name="home"></minerva-icon>
  <minerva-icon name="search"></minerva-icon>
  <minerva-icon name="settings"></minerva-icon>
  <minerva-button>
    <minerva-icon slot="start" name="download" size="16"></minerva-icon>
    Download
  </minerva-button>
  <minerva-button color="danger" variant="outline">
    <minerva-icon slot="start" name="trash" size="16"></minerva-icon>
    Delete
  </minerva-button>
  <minerva-icon name="bell" size="32" label="Notifications"></minerva-icon>
</div>

<script type="module">
  // registers the icon elements (optional entry, loads the icon set)
  import "minerva-design/web-components/icon";
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};