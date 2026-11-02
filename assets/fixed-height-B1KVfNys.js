import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- KanbanBoardFixedHeight.vue -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

// height (or max-height) bounds the board: each column body scrolls
// vertically within it while the board scrolls horizontally.

const root = ref<HTMLElement>();

const added: HTMLElement[] = [];

onMounted(() => {
  for (const column of root.value!.querySelectorAll<HTMLElement>(
    "minerva-kanban-column",
  )) {
    const count = Number(column.dataset.count);
    for (let index = 1; index <= count; index++) {
      const card = document.createElement("minerva-card");
      card.setAttribute("padding", "small");
      card.textContent = \`\${column.dataset.prefix} \${index}\`;
      column.append(card);
      added.push(card);
    }
    column.setAttribute("count", String(count));
  }
});

onBeforeUnmount(() => {
  added.forEach((card) => card.remove());
});
<\/script>

<template>
  <div ref="root">
    <minerva-kanban-board id="queue" aria-label="Support queue" height="320">
      <minerva-kanban-column
        heading="Inbox"
        color="info"
        data-prefix="Ticket"
        data-count="12"
      ></minerva-kanban-column>
      <minerva-kanban-column
        heading="Triaged"
        color="warning"
        data-prefix="Bug"
        data-count="5"
      ></minerva-kanban-column>
      <minerva-kanban-column
        heading="Fixed"
        color="success"
        data-prefix="Fix"
        data-count="8"
      ></minerva-kanban-column>
    </minerva-kanban-board>
  </div>
</template>
`,angular:`// kanban-board-fixed-height.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";

// height (or max-height) bounds the board: each column body scrolls
// vertically within it while the board scrolls horizontally.

@Component({
  selector: "app-kanban-board-fixed-height",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div #root>
      <minerva-kanban-board id="queue" aria-label="Support queue" height="320">
        <minerva-kanban-column
          heading="Inbox"
          color="info"
          data-prefix="Ticket"
          data-count="12"
        ></minerva-kanban-column>
        <minerva-kanban-column
          heading="Triaged"
          color="warning"
          data-prefix="Bug"
          data-count="5"
        ></minerva-kanban-column>
        <minerva-kanban-column
          heading="Fixed"
          color="success"
          data-prefix="Fix"
          data-count="8"
        ></minerva-kanban-column>
      </minerva-kanban-board>
    </div>
  \`,
})
export class KanbanBoardFixedHeightComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild("root") root!: ElementRef<HTMLElement>;

  added: HTMLElement[] = [];

  ngAfterViewInit(): void {
    for (const column of this.root.nativeElement.querySelectorAll<HTMLElement>(
      "minerva-kanban-column",
    )) {
      const count = Number(column.dataset.count);
      for (let index = 1; index <= count; index++) {
        const card = document.createElement("minerva-card");
        card.setAttribute("padding", "small");
        card.textContent = \`\${column.dataset.prefix} \${index}\`;
        column.append(card);
        this.added.push(card);
      }
      column.setAttribute("count", String(count));
    }
  }

  ngOnDestroy(): void {
    this.added.forEach((card) => card.remove());
  }
}
`,svelte:`<!-- KanbanBoardFixedHeight.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // height (or max-height) bounds the board: each column body scrolls
  // vertically within it while the board scrolls horizontally.

  let root: HTMLElement;

  const added: HTMLElement[] = [];

  onMount(() => {
    for (const column of root.querySelectorAll<HTMLElement>(
      "minerva-kanban-column",
    )) {
      const count = Number(column.dataset.count);
      for (let index = 1; index <= count; index++) {
        const card = document.createElement("minerva-card");
        card.setAttribute("padding", "small");
        card.textContent = \`\${column.dataset.prefix} \${index}\`;
        column.append(card);
        added.push(card);
      }
      column.setAttribute("count", String(count));
    }
    return () => {
      added.forEach((card) => card.remove());
    };
  });
<\/script>

<div
  bind:this={root}
>
  <minerva-kanban-board id="queue" aria-label="Support queue" height="320">
    <minerva-kanban-column
      heading="Inbox"
      color="info"
      data-prefix="Ticket"
      data-count="12"
    ></minerva-kanban-column>
    <minerva-kanban-column
      heading="Triaged"
      color="warning"
      data-prefix="Bug"
      data-count="5"
    ></minerva-kanban-column>
    <minerva-kanban-column
      heading="Fixed"
      color="success"
      data-prefix="Fix"
      data-count="8"
    ></minerva-kanban-column>
  </minerva-kanban-board>
</div>
`,solid:`// KanbanBoardFixedHeight.tsx

import { onCleanup, onMount } from "solid-js";

// height (or max-height) bounds the board: each column body scrolls
// vertically within it while the board scrolls horizontally.

export default function KanbanBoardFixedHeight() {
  let root!: HTMLElement;

  const added: HTMLElement[] = [];

  onMount(() => {
    for (const column of root.querySelectorAll<HTMLElement>(
      "minerva-kanban-column",
    )) {
      const count = Number(column.dataset.count);
      for (let index = 1; index <= count; index++) {
        const card = document.createElement("minerva-card");
        card.setAttribute("padding", "small");
        card.textContent = \`\${column.dataset.prefix} \${index}\`;
        column.append(card);
        added.push(card);
      }
      column.setAttribute("count", String(count));
    }
  });

  onCleanup(() => {
    added.forEach((card) => card.remove());
  });

  return (
    <div ref={root}>
      <minerva-kanban-board id="queue" aria-label="Support queue" height="320">
        <minerva-kanban-column
          heading="Inbox"
          color="info"
          data-prefix="Ticket"
          data-count="12"
        ></minerva-kanban-column>
        <minerva-kanban-column
          heading="Triaged"
          color="warning"
          data-prefix="Bug"
          data-count="5"
        ></minerva-kanban-column>
        <minerva-kanban-column
          heading="Fixed"
          color="success"
          data-prefix="Fix"
          data-count="8"
        ></minerva-kanban-column>
      </minerva-kanban-board>
    </div>
  );
}
`,html:`<minerva-kanban-board id="queue" aria-label="Support queue" height="320">
  <minerva-kanban-column
    heading="Inbox"
    color="info"
    data-prefix="Ticket"
    data-count="12"
  ></minerva-kanban-column>
  <minerva-kanban-column
    heading="Triaged"
    color="warning"
    data-prefix="Bug"
    data-count="5"
  ></minerva-kanban-column>
  <minerva-kanban-column
    heading="Fixed"
    color="success"
    data-prefix="Fix"
    data-count="8"
  ></minerva-kanban-column>
</minerva-kanban-board>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // height (or max-height) bounds the board: each column body scrolls
  // vertically within it while the board scrolls horizontally.
  const added = [];
  for (const column of document.querySelectorAll("minerva-kanban-column")) {
    const count = Number(column.dataset.count);
    for (let index = 1; index <= count; index++) {
      const card = document.createElement("minerva-card");
      card.setAttribute("padding", "small");
      card.textContent = \`\${column.dataset.prefix} \${index}\`;
      column.append(card);
      added.push(card);
    }
    column.setAttribute("count", String(count));
  }
<\/script>
`}})))()}n();export{t as default};