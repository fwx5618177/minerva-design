import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- VirtualListBasic.vue -->

<script setup lang="ts">
// \`items\` and \`renderItem\` are JS properties: only the rows in view are in the
// DOM, even with 10,000 items.

type Item = { id: number; metadata?: Record<string, string | number> };
type VirtualList = HTMLElement & {
  items: Item[];
  renderItem: (item: Item, index: number) => string;
};

const listItems = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  metadata: { name: \`Contact \${i + 1}\` },
}));
const listRenderItem = (item) => \`\${item.metadata?.name} · #\${item.id}\`;
<\/script>

<template>
  <minerva-virtual-list
    style="width: 100%"
    id="list"
    aria-label="Contacts"
    item-height="40"
    max-height="280"
    :items.prop="listItems"
    :renderItem.prop="listRenderItem"
  ></minerva-virtual-list>
</template>
`,angular:`// virtual-list-basic.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`items\` and \`renderItem\` are JS properties: only the rows in view are in the
// DOM, even with 10,000 items.
type Item = { id: number; metadata?: Record<string, string | number> };
type VirtualList = HTMLElement & {
  items: Item[];
  renderItem: (item: Item, index: number) => string;
};

@Component({
  selector: "app-virtual-list-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-virtual-list
      style="width: 100%"
      id="list"
      aria-label="Contacts"
      item-height="40"
      max-height="280"
      [items]="listItems"
      [renderItem]="listRenderItem"
    ></minerva-virtual-list>
  \`,
})
export class VirtualListBasicComponent {
  listItems = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    metadata: { name: \`Contact \${i + 1}\` },
  }));
  listRenderItem = (item) => \`\${item.metadata?.name} · #\${item.id}\`;
}
`,svelte:`<!-- VirtualListBasic.svelte -->

<script lang="ts">
  // \`items\` and \`renderItem\` are JS properties: only the rows in view are in the
  // DOM, even with 10,000 items.

  type Item = { id: number; metadata?: Record<string, string | number> };
  type VirtualList = HTMLElement & {
    items: Item[];
    renderItem: (item: Item, index: number) => string;
  };

  const listItems = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    metadata: { name: \`Contact \${i + 1}\` },
  }));
  const listRenderItem = (item) => \`\${item.metadata?.name} · #\${item.id}\`;
<\/script>

<minerva-virtual-list
  style="width: 100%"
  id="list"
  aria-label="Contacts"
  item-height="40"
  max-height="280"
  items={listItems}
  renderItem={listRenderItem}
></minerva-virtual-list>
`,solid:`// VirtualListBasic.tsx

// \`items\` and \`renderItem\` are JS properties: only the rows in view are in the
// DOM, even with 10,000 items.
type Item = { id: number; metadata?: Record<string, string | number> };
type VirtualList = HTMLElement & {
  items: Item[];
  renderItem: (item: Item, index: number) => string;
};

export default function VirtualListBasic() {
  const listItems = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    metadata: { name: \`Contact \${i + 1}\` },
  }));
  const listRenderItem = (item) => \`\${item.metadata?.name} · #\${item.id}\`;

  return (
    <minerva-virtual-list
      style="width: 100%"
      id="list"
      aria-label="Contacts"
      item-height="40"
      max-height="280"
      prop:items={listItems}
      prop:renderItem={listRenderItem}
    ></minerva-virtual-list>
  );
}
`,html:`<minerva-virtual-list
  style="width: 100%"
  id="list"
  aria-label="Contacts"
  item-height="40"
  max-height="280"
></minerva-virtual-list>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // \`items\` and \`renderItem\` are JS properties: only the rows in view are in the
  // DOM, even with 10,000 items.
  const list = document.querySelector("#list");
  list.items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    metadata: { name: \`Contact \${i + 1}\` },
  }));
  list.renderItem = (item) => \`\${item.metadata?.name} · #\${item.id}\`;
<\/script>
`}})))()}n();export{t as default};