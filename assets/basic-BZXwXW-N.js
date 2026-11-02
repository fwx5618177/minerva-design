import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- KanbanBoardBasic.vue -->

<script setup lang="ts">
import { ref } from "vue";

// No drag and drop: a card moves to the next column with its own button.
// The column gives each slotted card role="listitem"; update \`count\` after
// moving cards.

const ORDER = ["todo", "doing", "done"];
const TITLES: Record<string, string> = { doing: "Doing", done: "Done" };

const board = ref<HTMLElement>();

const columns = () =>
  Array.from(
    board.value!.querySelectorAll<HTMLElement>("minerva-kanban-column"),
  );
const onClick = (event: Event) => {
  const button = (event.target as Element).closest<HTMLElement>("[data-move]");
  if (!button) return;
  const card = button.closest<HTMLElement>("minerva-card")!;
  const from = card.closest<HTMLElement>("minerva-kanban-column")!;
  const status = ORDER[ORDER.indexOf(from.dataset.status!) + 1];
  const to = columns().find((column) => column.dataset.status === status);
  if (!to) return;
  to.append(card);
  const after = ORDER[ORDER.indexOf(status!) + 1];
  if (after) button.textContent = \`Move to \${TITLES[after]}\`;
  else button.remove();
  for (const column of columns())
    column.setAttribute(
      "count",
      String(column.querySelectorAll("minerva-card").length),
    );
};
<\/script>

<template>
  <minerva-kanban-board
    id="board"
    aria-label="Sprint 12"
    ref="board"
    @click="onClick"
  >
    <minerva-kanban-column heading="To do" count="2" data-status="todo">
      <minerva-card padding="small" data-id="1"
        >Write the onboarding guide
        <minerva-button size="small" variant="ghost" data-move="1"
          >Move to Doing</minerva-button
        ></minerva-card
      >
      <minerva-card padding="small" data-id="2"
        >Audit color contrast
        <minerva-button size="small" variant="ghost" data-move="2"
          >Move to Doing</minerva-button
        ></minerva-card
      >
    </minerva-kanban-column>
    <minerva-kanban-column heading="Doing" count="1" data-status="doing">
      <minerva-card padding="small" data-id="3"
        >Ship the billing page
        <minerva-button size="small" variant="ghost" data-move="3"
          >Move to Done</minerva-button
        ></minerva-card
      >
    </minerva-kanban-column>
    <minerva-kanban-column heading="Done" count="1" data-status="done">
      <minerva-card padding="small" data-id="4"
        >Set up error tracking</minerva-card
      >
    </minerva-kanban-column>
  </minerva-kanban-board>
</template>
`,angular:`// kanban-board-basic.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";

// No drag and drop: a card moves to the next column with its own button.
// The column gives each slotted card role="listitem"; update \`count\` after
// moving cards.
const ORDER = ["todo", "doing", "done"];
const TITLES: Record<string, string> = { doing: "Doing", done: "Done" };

@Component({
  selector: "app-kanban-board-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-kanban-board
      id="board"
      aria-label="Sprint 12"
      #board
      (click)="onClick($event)"
    >
      <minerva-kanban-column heading="To do" count="2" data-status="todo">
        <minerva-card padding="small" data-id="1"
          >Write the onboarding guide
          <minerva-button size="small" variant="ghost" data-move="1"
            >Move to Doing</minerva-button
          ></minerva-card
        >
        <minerva-card padding="small" data-id="2"
          >Audit color contrast
          <minerva-button size="small" variant="ghost" data-move="2"
            >Move to Doing</minerva-button
          ></minerva-card
        >
      </minerva-kanban-column>
      <minerva-kanban-column heading="Doing" count="1" data-status="doing">
        <minerva-card padding="small" data-id="3"
          >Ship the billing page
          <minerva-button size="small" variant="ghost" data-move="3"
            >Move to Done</minerva-button
          ></minerva-card
        >
      </minerva-kanban-column>
      <minerva-kanban-column heading="Done" count="1" data-status="done">
        <minerva-card padding="small" data-id="4"
          >Set up error tracking</minerva-card
        >
      </minerva-kanban-column>
    </minerva-kanban-board>
  \`,
})
export class KanbanBoardBasicComponent {
  @ViewChild("board") board!: ElementRef<HTMLElement>;

  columns = () =>
    Array.from(
      this.board.nativeElement.querySelectorAll<HTMLElement>(
        "minerva-kanban-column",
      ),
    );
  onClick = (event: Event) => {
    const button = (event.target as Element).closest<HTMLElement>(
      "[data-move]",
    );
    if (!button) return;
    const card = button.closest<HTMLElement>("minerva-card")!;
    const from = card.closest<HTMLElement>("minerva-kanban-column")!;
    const status = ORDER[ORDER.indexOf(from.dataset.status!) + 1];
    const to = this.columns().find(
      (column) => column.dataset.status === status,
    );
    if (!to) return;
    to.append(card);
    const after = ORDER[ORDER.indexOf(status!) + 1];
    if (after) button.textContent = \`Move to \${TITLES[after]}\`;
    else button.remove();
    for (const column of this.columns())
      column.setAttribute(
        "count",
        String(column.querySelectorAll("minerva-card").length),
      );
  };
}
`,svelte:`<!-- KanbanBoardBasic.svelte -->

<script lang="ts">
  // No drag and drop: a card moves to the next column with its own button.
  // The column gives each slotted card role="listitem"; update \`count\` after
  // moving cards.

  const ORDER = ["todo", "doing", "done"];
  const TITLES: Record<string, string> = { doing: "Doing", done: "Done" };

  let board: HTMLElement;

  const columns = () =>
    Array.from(board.querySelectorAll<HTMLElement>("minerva-kanban-column"));
  const onClick = (event: Event) => {
    const button = (event.target as Element).closest<HTMLElement>("[data-move]");
    if (!button) return;
    const card = button.closest<HTMLElement>("minerva-card")!;
    const from = card.closest<HTMLElement>("minerva-kanban-column")!;
    const status = ORDER[ORDER.indexOf(from.dataset.status!) + 1];
    const to = columns().find((column) => column.dataset.status === status);
    if (!to) return;
    to.append(card);
    const after = ORDER[ORDER.indexOf(status!) + 1];
    if (after) button.textContent = \`Move to \${TITLES[after]}\`;
    else button.remove();
    for (const column of columns())
      column.setAttribute(
        "count",
        String(column.querySelectorAll("minerva-card").length),
      );
  };
<\/script>

<minerva-kanban-board
  id="board"
  aria-label="Sprint 12"
  bind:this={board}
  onclick={onClick}
>
  <minerva-kanban-column heading="To do" count="2" data-status="todo">
    <minerva-card padding="small" data-id="1"
      >Write the onboarding guide
      <minerva-button size="small" variant="ghost" data-move="1"
        >Move to Doing</minerva-button></minerva-card>
    <minerva-card padding="small" data-id="2"
      >Audit color contrast
      <minerva-button size="small" variant="ghost" data-move="2"
        >Move to Doing</minerva-button></minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Doing" count="1" data-status="doing">
    <minerva-card padding="small" data-id="3"
      >Ship the billing page
      <minerva-button size="small" variant="ghost" data-move="3"
        >Move to Done</minerva-button></minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Done" count="1" data-status="done">
    <minerva-card padding="small" data-id="4"
      >Set up error tracking</minerva-card>
  </minerva-kanban-column>
</minerva-kanban-board>
`,solid:`// KanbanBoardBasic.tsx

// No drag and drop: a card moves to the next column with its own button.
// The column gives each slotted card role="listitem"; update \`count\` after
// moving cards.
const ORDER = ["todo", "doing", "done"];
const TITLES: Record<string, string> = { doing: "Doing", done: "Done" };

export default function KanbanBoardBasic() {
  let board!: HTMLElement;

  const columns = () =>
    Array.from(board.querySelectorAll<HTMLElement>("minerva-kanban-column"));
  const onClick = (event: Event) => {
    const button = (event.target as Element).closest<HTMLElement>(
      "[data-move]",
    );
    if (!button) return;
    const card = button.closest<HTMLElement>("minerva-card")!;
    const from = card.closest<HTMLElement>("minerva-kanban-column")!;
    const status = ORDER[ORDER.indexOf(from.dataset.status!) + 1];
    const to = columns().find((column) => column.dataset.status === status);
    if (!to) return;
    to.append(card);
    const after = ORDER[ORDER.indexOf(status!) + 1];
    if (after) button.textContent = \`Move to \${TITLES[after]}\`;
    else button.remove();
    for (const column of columns())
      column.setAttribute(
        "count",
        String(column.querySelectorAll("minerva-card").length),
      );
  };

  return (
    <minerva-kanban-board
      id="board"
      aria-label="Sprint 12"
      ref={board}
      on:click={onClick}
    >
      <minerva-kanban-column heading="To do" count="2" data-status="todo">
        <minerva-card padding="small" data-id="1">
          Write the onboarding guide
          <minerva-button size="small" variant="ghost" data-move="1">
            Move to Doing
          </minerva-button>
        </minerva-card>
        <minerva-card padding="small" data-id="2">
          Audit color contrast
          <minerva-button size="small" variant="ghost" data-move="2">
            Move to Doing
          </minerva-button>
        </minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Doing" count="1" data-status="doing">
        <minerva-card padding="small" data-id="3">
          Ship the billing page
          <minerva-button size="small" variant="ghost" data-move="3">
            Move to Done
          </minerva-button>
        </minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Done" count="1" data-status="done">
        <minerva-card padding="small" data-id="4">
          Set up error tracking
        </minerva-card>
      </minerva-kanban-column>
    </minerva-kanban-board>
  );
}
`,html:`<minerva-kanban-board id="board" aria-label="Sprint 12">
  <minerva-kanban-column heading="To do" count="2" data-status="todo">
    <minerva-card padding="small" data-id="1"
      >Write the onboarding guide
      <minerva-button size="small" variant="ghost" data-move="1"
        >Move to Doing</minerva-button
      ></minerva-card
    >
    <minerva-card padding="small" data-id="2"
      >Audit color contrast
      <minerva-button size="small" variant="ghost" data-move="2"
        >Move to Doing</minerva-button
      ></minerva-card
    >
  </minerva-kanban-column>
  <minerva-kanban-column heading="Doing" count="1" data-status="doing">
    <minerva-card padding="small" data-id="3"
      >Ship the billing page
      <minerva-button size="small" variant="ghost" data-move="3"
        >Move to Done</minerva-button
      ></minerva-card
    >
  </minerva-kanban-column>
  <minerva-kanban-column heading="Done" count="1" data-status="done">
    <minerva-card padding="small" data-id="4"
      >Set up error tracking</minerva-card
    >
  </minerva-kanban-column>
</minerva-kanban-board>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // No drag and drop: a card moves to the next column with its own button.
  // The column gives each slotted card role="listitem"; update \`count\` after
  // moving cards.
  // No drag and drop: a card moves to the next column with its own button.
  // The column gives each slotted card role="listitem"; update \`count\` after
  // moving cards.
  const ORDER = ["todo", "doing", "done"];
  const TITLES = { doing: "Doing", done: "Done" };

  const board = document.querySelector("#board");
  const columns = () =>
    Array.from(board.querySelectorAll("minerva-kanban-column"));
  const onClick = (event) => {
    const button = event.target.closest("[data-move]");
    if (!button) return;
    const card = button.closest("minerva-card");
    const from = card.closest("minerva-kanban-column");
    const status = ORDER[ORDER.indexOf(from.dataset.status) + 1];
    const to = columns().find((column) => column.dataset.status === status);
    if (!to) return;
    to.append(card);
    const after = ORDER[ORDER.indexOf(status) + 1];
    if (after) button.textContent = \`Move to \${TITLES[after]}\`;
    else button.remove();
    for (const column of columns())
      column.setAttribute(
        "count",
        String(column.querySelectorAll("minerva-card").length),
      );
  };
  board.addEventListener("click", onClick);
<\/script>
`}})))()}n();export{t as default};