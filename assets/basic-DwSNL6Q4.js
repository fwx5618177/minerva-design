import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ListBasic.vue -->

<template>
  <minerva-list style="width: 100%; max-width: 420px">
    <minerva-list-item
      primary="Billing service"
      secondary="Deployed 2 hours ago"
    ></minerva-list-item>
    <minerva-list-item
      primary="Search indexer"
      secondary="Deployed yesterday"
    ></minerva-list-item>
    <minerva-list-item
      primary="Notifications"
      secondary="Deployed last week"
    ></minerva-list-item>
  </minerva-list>
</template>
`,angular:`// list-basic.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-list-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-list style="width: 100%; max-width: 420px">
      <minerva-list-item
        primary="Billing service"
        secondary="Deployed 2 hours ago"
      ></minerva-list-item>
      <minerva-list-item
        primary="Search indexer"
        secondary="Deployed yesterday"
      ></minerva-list-item>
      <minerva-list-item
        primary="Notifications"
        secondary="Deployed last week"
      ></minerva-list-item>
    </minerva-list>
  \`,
})
export class ListBasicComponent {}
`,svelte:`<!-- ListBasic.svelte -->

<minerva-list style="width: 100%; max-width: 420px">
  <minerva-list-item
    primary="Billing service"
    secondary="Deployed 2 hours ago"
  ></minerva-list-item>
  <minerva-list-item
    primary="Search indexer"
    secondary="Deployed yesterday"
  ></minerva-list-item>
  <minerva-list-item
    primary="Notifications"
    secondary="Deployed last week"
  ></minerva-list-item>
</minerva-list>
`,solid:`// ListBasic.tsx

export default function ListBasic() {
  return (
    <minerva-list style="width: 100%; max-width: 420px">
      <minerva-list-item
        primary="Billing service"
        secondary="Deployed 2 hours ago"
      ></minerva-list-item>
      <minerva-list-item
        primary="Search indexer"
        secondary="Deployed yesterday"
      ></minerva-list-item>
      <minerva-list-item
        primary="Notifications"
        secondary="Deployed last week"
      ></minerva-list-item>
    </minerva-list>
  );
}
`,html:`<minerva-list style="width: 100%; max-width: 420px">
  <minerva-list-item
    primary="Billing service"
    secondary="Deployed 2 hours ago"
  ></minerva-list-item>
  <minerva-list-item
    primary="Search indexer"
    secondary="Deployed yesterday"
  ></minerva-list-item>
  <minerva-list-item
    primary="Notifications"
    secondary="Deployed last week"
  ></minerva-list-item>
</minerva-list>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};