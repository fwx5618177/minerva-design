import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- DashboardColumnsEmptyActions.vue -->

<script setup lang="ts">
import { ref } from "vue";

// The empty slot / empty-text shows while the column has no cards; the
// actions slot holds header controls.

const column = ref<HTMLElement>();

const onAdd = () => {
  const count = column.value!.querySelectorAll("minerva-card").length + 1;
  const card = document.createElement("minerva-card");
  card.setAttribute("padding", "small");
  card.textContent = \`Idea \${count}\`;
  column.value!.append(card);
  column.value!.setAttribute("count", String(count));
};
<\/script>

<template>
  <minerva-dashboard-columns aria-label="Ideas" fill>
    <minerva-dashboard-column
      id="ideas"
      heading="Ideas"
      count="0"
      description="Anything worth exploring"
      empty-text="No ideas yet: use Add to create one."
      ref="column"
    >
      <minerva-button
        slot="actions"
        id="add"
        size="small"
        variant="ghost"
        @click="onAdd"
        >Add</minerva-button
      >
    </minerva-dashboard-column>
    <minerva-dashboard-column
      heading="Archived"
      count="0"
    ></minerva-dashboard-column>
  </minerva-dashboard-columns>
</template>
`,angular:`// dashboard-columns-empty-actions.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";

// The empty slot / empty-text shows while the column has no cards; the
// actions slot holds header controls.

@Component({
  selector: "app-dashboard-columns-empty-actions",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-dashboard-columns aria-label="Ideas" fill>
      <minerva-dashboard-column
        id="ideas"
        heading="Ideas"
        count="0"
        description="Anything worth exploring"
        empty-text="No ideas yet: use Add to create one."
        #column
      >
        <minerva-button
          slot="actions"
          id="add"
          size="small"
          variant="ghost"
          (click)="onAdd($event)"
          >Add</minerva-button
        >
      </minerva-dashboard-column>
      <minerva-dashboard-column
        heading="Archived"
        count="0"
      ></minerva-dashboard-column>
    </minerva-dashboard-columns>
  \`,
})
export class DashboardColumnsEmptyActionsComponent {
  @ViewChild("column") column!: ElementRef<HTMLElement>;

  onAdd = () => {
    const count =
      this.column.nativeElement.querySelectorAll("minerva-card").length + 1;
    const card = document.createElement("minerva-card");
    card.setAttribute("padding", "small");
    card.textContent = \`Idea \${count}\`;
    this.column.nativeElement.append(card);
    this.column.nativeElement.setAttribute("count", String(count));
  };
}
`,svelte:`<!-- DashboardColumnsEmptyActions.svelte -->

<script lang="ts">
  // The empty slot / empty-text shows while the column has no cards; the
  // actions slot holds header controls.

  let column: HTMLElement;

  const onAdd = () => {
    const count = column.querySelectorAll("minerva-card").length + 1;
    const card = document.createElement("minerva-card");
    card.setAttribute("padding", "small");
    card.textContent = \`Idea \${count}\`;
    column.append(card);
    column.setAttribute("count", String(count));
  };
<\/script>

<minerva-dashboard-columns aria-label="Ideas" fill>
  <minerva-dashboard-column
    id="ideas"
    heading="Ideas"
    count="0"
    description="Anything worth exploring"
    empty-text="No ideas yet: use Add to create one."
    bind:this={column}
  >
    <minerva-button
      slot="actions"
      id="add"
      size="small"
      variant="ghost"
      onclick={onAdd}
    >Add</minerva-button>
  </minerva-dashboard-column>
  <minerva-dashboard-column
    heading="Archived"
    count="0"
  ></minerva-dashboard-column>
</minerva-dashboard-columns>
`,solid:`// DashboardColumnsEmptyActions.tsx

// The empty slot / empty-text shows while the column has no cards; the
// actions slot holds header controls.

export default function DashboardColumnsEmptyActions() {
  let column!: HTMLElement;

  const onAdd = () => {
    const count = column.querySelectorAll("minerva-card").length + 1;
    const card = document.createElement("minerva-card");
    card.setAttribute("padding", "small");
    card.textContent = \`Idea \${count}\`;
    column.append(card);
    column.setAttribute("count", String(count));
  };

  return (
    <minerva-dashboard-columns aria-label="Ideas" fill>
      <minerva-dashboard-column
        id="ideas"
        heading="Ideas"
        count="0"
        description="Anything worth exploring"
        empty-text="No ideas yet: use Add to create one."
        ref={column}
      >
        <minerva-button
          slot="actions"
          id="add"
          size="small"
          variant="ghost"
          on:click={onAdd}
        >
          Add
        </minerva-button>
      </minerva-dashboard-column>
      <minerva-dashboard-column
        heading="Archived"
        count="0"
      ></minerva-dashboard-column>
    </minerva-dashboard-columns>
  );
}
`,html:`<minerva-dashboard-columns aria-label="Ideas" fill>
  <minerva-dashboard-column
    id="ideas"
    heading="Ideas"
    count="0"
    description="Anything worth exploring"
    empty-text="No ideas yet: use Add to create one."
  >
    <minerva-button slot="actions" id="add" size="small" variant="ghost"
      >Add</minerva-button
    >
  </minerva-dashboard-column>
  <minerva-dashboard-column
    heading="Archived"
    count="0"
  ></minerva-dashboard-column>
</minerva-dashboard-columns>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // The empty slot / empty-text shows while the column has no cards; the
  // actions slot holds header controls.
  const column = document.querySelector("#ideas");
  const add = document.querySelector("#add");
  const onAdd = () => {
    const count = column.querySelectorAll("minerva-card").length + 1;
    const card = document.createElement("minerva-card");
    card.setAttribute("padding", "small");
    card.textContent = \`Idea \${count}\`;
    column.append(card);
    column.setAttribute("count", String(count));
  };
  add.addEventListener("click", onAdd);
<\/script>
`}})))()}n();export{t as default};