import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- VirtualListInfiniteScroll.vue -->

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

// Scrolling near the bottom fires \`minerva-load-more\`; \`loading\` shows the
// indicator row while the next page is fetched.

type Item = { id: number };
type VirtualList = HTMLElement & {
  items: Item[];
  loading: boolean;
  renderItem: (item: Item, index: number) => string;
};

const PAGE = 30;
const LAST = 150;

const list = ref<VirtualList>();

const page = (from: number) =>
  Array.from({ length: PAGE }, (_, i) => ({ id: from + i + 1 }));
const listItems = page(0);
const listRenderItem = (item) => \`Event \${item.id}\`;
let timer: ReturnType<typeof setTimeout> | undefined;
const onLoadMore = () => {
  if (list.value!.items.length >= LAST) return;
  list.value!.loading = true;
  timer = setTimeout(() => {
    list.value!.items = [
      ...list.value!.items,
      ...page(list.value!.items.length),
    ];
    list.value!.loading = false;
  }, 800);
};

onBeforeUnmount(() => {
  clearTimeout(timer);
});
<\/script>

<template>
  <minerva-virtual-list
    style="width: 100%"
    id="list"
    aria-label="Activity feed"
    item-height="40"
    max-height="240"
    load-more-threshold="80"
    ref="list"
    :items.prop="listItems"
    :renderItem.prop="listRenderItem"
    @minerva-load-more="onLoadMore"
  ></minerva-virtual-list>
</template>
`,angular:`// virtual-list-infinite-scroll.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type OnDestroy,
} from "@angular/core";

// Scrolling near the bottom fires \`minerva-load-more\`; \`loading\` shows the
// indicator row while the next page is fetched.
type Item = { id: number };
type VirtualList = HTMLElement & {
  items: Item[];
  loading: boolean;
  renderItem: (item: Item, index: number) => string;
};

const PAGE = 30;
const LAST = 150;

@Component({
  selector: "app-virtual-list-infinite-scroll",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-virtual-list
      style="width: 100%"
      id="list"
      aria-label="Activity feed"
      item-height="40"
      max-height="240"
      load-more-threshold="80"
      #list
      [items]="listItems"
      [renderItem]="listRenderItem"
      (minerva-load-more)="onLoadMore($event)"
    ></minerva-virtual-list>
  \`,
})
export class VirtualListInfiniteScrollComponent implements OnDestroy {
  @ViewChild("list") list!: ElementRef<VirtualList>;

  page = (from: number) =>
    Array.from({ length: PAGE }, (_, i) => ({ id: from + i + 1 }));
  listItems = this.page(0);
  listRenderItem = (item) => \`Event \${item.id}\`;
  timer: ReturnType<typeof setTimeout> | undefined;
  onLoadMore = () => {
    if (this.list.nativeElement.items.length >= LAST) return;
    this.list.nativeElement.loading = true;
    this.timer = setTimeout(() => {
      this.list.nativeElement.items = [
        ...this.list.nativeElement.items,
        ...this.page(this.list.nativeElement.items.length),
      ];
      this.list.nativeElement.loading = false;
    }, 800);
  };

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
`,svelte:`<!-- VirtualListInfiniteScroll.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // Scrolling near the bottom fires \`minerva-load-more\`; \`loading\` shows the
  // indicator row while the next page is fetched.

  type Item = { id: number };
  type VirtualList = HTMLElement & {
    items: Item[];
    loading: boolean;
    renderItem: (item: Item, index: number) => string;
  };

  const PAGE = 30;
  const LAST = 150;

  let list: VirtualList;

  const page = (from: number) =>
    Array.from({ length: PAGE }, (_, i) => ({ id: from + i + 1 }));
  const listItems = page(0);
  const listRenderItem = (item) => \`Event \${item.id}\`;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onLoadMore = () => {
    if (list.items.length >= LAST) return;
    list.loading = true;
    timer = setTimeout(() => {
      list.items = [...list.items, ...page(list.items.length)];
      list.loading = false;
    }, 800);
  };

  onMount(() => {
    return () => {
      clearTimeout(timer);
    };
  });
<\/script>

<minerva-virtual-list
  style="width: 100%"
  id="list"
  aria-label="Activity feed"
  item-height="40"
  max-height="240"
  load-more-threshold="80"
  bind:this={list}
  items={listItems}
  renderItem={listRenderItem}
  onminerva-load-more={onLoadMore}
></minerva-virtual-list>
`,solid:`// VirtualListInfiniteScroll.tsx

import { onCleanup } from "solid-js";

// Scrolling near the bottom fires \`minerva-load-more\`; \`loading\` shows the
// indicator row while the next page is fetched.
type Item = { id: number };
type VirtualList = HTMLElement & {
  items: Item[];
  loading: boolean;
  renderItem: (item: Item, index: number) => string;
};

const PAGE = 30;
const LAST = 150;

export default function VirtualListInfiniteScroll() {
  let list!: VirtualList;

  const page = (from: number) =>
    Array.from({ length: PAGE }, (_, i) => ({ id: from + i + 1 }));
  const listItems = page(0);
  const listRenderItem = (item) => \`Event \${item.id}\`;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onLoadMore = () => {
    if (list.items.length >= LAST) return;
    list.loading = true;
    timer = setTimeout(() => {
      list.items = [...list.items, ...page(list.items.length)];
      list.loading = false;
    }, 800);
  };

  onCleanup(() => {
    clearTimeout(timer);
  });

  return (
    <minerva-virtual-list
      style="width: 100%"
      id="list"
      aria-label="Activity feed"
      item-height="40"
      max-height="240"
      load-more-threshold="80"
      ref={list}
      prop:items={listItems}
      prop:renderItem={listRenderItem}
      on:minerva-load-more={onLoadMore}
    ></minerva-virtual-list>
  );
}
`,html:`<minerva-virtual-list
  style="width: 100%"
  id="list"
  aria-label="Activity feed"
  item-height="40"
  max-height="240"
  load-more-threshold="80"
></minerva-virtual-list>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // Scrolling near the bottom fires \`minerva-load-more\`; \`loading\` shows the
  // indicator row while the next page is fetched.
  const PAGE = 30;
  const LAST = 150;

  const list = document.querySelector("#list");
  const page = (from) =>
    Array.from({ length: PAGE }, (_, i) => ({ id: from + i + 1 }));
  list.items = page(0);
  list.renderItem = (item) => \`Event \${item.id}\`;
  let timer;
  const onLoadMore = () => {
    if (list.items.length >= LAST) return;
    list.loading = true;
    timer = setTimeout(() => {
      list.items = [...list.items, ...page(list.items.length)];
      list.loading = false;
    }, 800);
  };
  list.addEventListener("minerva-load-more", onLoadMore);
<\/script>
`}})))()}n();export{t as default};