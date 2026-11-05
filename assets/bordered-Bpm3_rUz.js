import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ListBordered.vue -->

<template>
  <minerva-list
    bordered
    density="comfortable"
    aria-label="Branches"
    style="width: 100%; max-width: 560px"
  >
    <minerva-list-item
      primary="main"
      secondary="Production · deployed 3 min ago"
    >
      <minerva-button slot="actions" size="small" variant="outline"
        >Visit</minerva-button
      >
    </minerva-list-item>
    <minerva-list-item
      primary="feat/checkout"
      secondary="Preview · 2 commits ahead"
    >
      <minerva-button slot="actions" size="small" variant="outline"
        >Visit</minerva-button
      >
    </minerva-list-item>
    <minerva-list-item primary="docs/install" secondary="Preview · building">
      <minerva-button slot="actions" size="small" variant="outline"
        >Visit</minerva-button
      >
    </minerva-list-item>
  </minerva-list>
</template>
`,angular:`// list-bordered.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-list-bordered",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-list
      bordered
      density="comfortable"
      aria-label="Branches"
      style="width: 100%; max-width: 560px"
    >
      <minerva-list-item
        primary="main"
        secondary="Production · deployed 3 min ago"
      >
        <minerva-button slot="actions" size="small" variant="outline"
          >Visit</minerva-button
        >
      </minerva-list-item>
      <minerva-list-item
        primary="feat/checkout"
        secondary="Preview · 2 commits ahead"
      >
        <minerva-button slot="actions" size="small" variant="outline"
          >Visit</minerva-button
        >
      </minerva-list-item>
      <minerva-list-item primary="docs/install" secondary="Preview · building">
        <minerva-button slot="actions" size="small" variant="outline"
          >Visit</minerva-button
        >
      </minerva-list-item>
    </minerva-list>
  \`,
})
export class ListBorderedComponent {}
`,svelte:`<!-- ListBordered.svelte -->

<minerva-list
  bordered
  density="comfortable"
  aria-label="Branches"
  style="width: 100%; max-width: 560px"
>
  <minerva-list-item primary="main" secondary="Production · deployed 3 min ago">
    <minerva-button slot="actions" size="small" variant="outline"
      >Visit</minerva-button>
  </minerva-list-item>
  <minerva-list-item
    primary="feat/checkout"
    secondary="Preview · 2 commits ahead"
  >
    <minerva-button slot="actions" size="small" variant="outline"
      >Visit</minerva-button>
  </minerva-list-item>
  <minerva-list-item primary="docs/install" secondary="Preview · building">
    <minerva-button slot="actions" size="small" variant="outline"
      >Visit</minerva-button>
  </minerva-list-item>
</minerva-list>
`,solid:`// ListBordered.tsx

export default function ListBordered() {
  return (
    <minerva-list
      bordered
      density="comfortable"
      aria-label="Branches"
      style="width: 100%; max-width: 560px"
    >
      <minerva-list-item
        primary="main"
        secondary="Production · deployed 3 min ago"
      >
        <minerva-button slot="actions" size="small" variant="outline">
          Visit
        </minerva-button>
      </minerva-list-item>
      <minerva-list-item
        primary="feat/checkout"
        secondary="Preview · 2 commits ahead"
      >
        <minerva-button slot="actions" size="small" variant="outline">
          Visit
        </minerva-button>
      </minerva-list-item>
      <minerva-list-item primary="docs/install" secondary="Preview · building">
        <minerva-button slot="actions" size="small" variant="outline">
          Visit
        </minerva-button>
      </minerva-list-item>
    </minerva-list>
  );
}
`,html:`<minerva-list
  bordered
  density="comfortable"
  aria-label="Branches"
  style="width: 100%; max-width: 560px"
>
  <minerva-list-item primary="main" secondary="Production · deployed 3 min ago">
    <minerva-button slot="actions" size="small" variant="outline"
      >Visit</minerva-button
    >
  </minerva-list-item>
  <minerva-list-item
    primary="feat/checkout"
    secondary="Preview · 2 commits ahead"
  >
    <minerva-button slot="actions" size="small" variant="outline"
      >Visit</minerva-button
    >
  </minerva-list-item>
  <minerva-list-item primary="docs/install" secondary="Preview · building">
    <minerva-button slot="actions" size="small" variant="outline"
      >Visit</minerva-button
    >
  </minerva-list-item>
</minerva-list>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};