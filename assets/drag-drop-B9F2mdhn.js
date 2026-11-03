import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- DashboardColumnsDragDrop.vue -->

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

// The board is controlled: on minerva-card-move the script moves the card
// element itself (toIndex counts the cards without the moved one) and
// updates the count attributes. canDrop keeps "Doing" at 2 cards.

import type {
  DashboardCardMove,
  MinervaDashboardColumns,
} from "minerva-design/web-components/dashboard-columns";

const LIMIT = 2;

const board = ref<MinervaDashboardColumns>();

const column = (value: string) =>
  board.value!.querySelector<HTMLElement>(
    \`minerva-dashboard-column[value="\${value}"]\`,
  )!;
const cardsOf = (element: HTMLElement) =>
  Array.from(
    element.querySelectorAll<HTMLElement>(":scope > minerva-dashboard-card"),
  );

const boardCanDrop = (move) =>
  move.toColumn !== "doing" ||
  move.fromColumn === "doing" ||
  cardsOf(column("doing")).length < LIMIT;

const onMove = (event: Event) => {
  const move = (event as CustomEvent<DashboardCardMove>).detail;
  const card = cardsOf(column(move.fromColumn))[move.fromIndex]!;
  const target = column(move.toColumn);
  const others = cardsOf(target).filter((other) => other !== card);
  target.insertBefore(card, others[move.toIndex] ?? null);
  for (const element of [column(move.fromColumn), target])
    element.setAttribute("count", String(cardsOf(element).length));
};

onBeforeUnmount(() => {
  board.value!.canDrop = undefined;
});
<\/script>

<template>
  <minerva-dashboard-columns
    id="board"
    aria-label="Sprint 12"
    draggable
    ref="board"
    :canDrop.prop="boardCanDrop"
    @minerva-card-move="onMove"
  >
    <minerva-dashboard-column heading="To do" value="todo" count="3">
      <minerva-dashboard-card value="guide" label="Write the onboarding guide"
        ><minerva-card padding="small"
          >Write the onboarding guide</minerva-card
        ></minerva-dashboard-card
      >
      <minerva-dashboard-card value="contrast" label="Audit color contrast"
        ><minerva-card padding="small"
          >Audit color contrast</minerva-card
        ></minerva-dashboard-card
      >
      <minerva-dashboard-card value="search" label="Index the docs search"
        ><minerva-card padding="small"
          >Index the docs search</minerva-card
        ></minerva-dashboard-card
      >
    </minerva-dashboard-column>
    <minerva-dashboard-column
      heading="Doing"
      value="doing"
      count="1"
      description="At most 2 cards"
    >
      <minerva-dashboard-card value="billing" label="Ship the billing page"
        ><minerva-card padding="small"
          >Ship the billing page</minerva-card
        ></minerva-dashboard-card
      >
    </minerva-dashboard-column>
    <minerva-dashboard-column heading="Done" value="done" count="1">
      <minerva-dashboard-card value="errors" label="Set up error tracking"
        ><minerva-card padding="small"
          >Set up error tracking</minerva-card
        ></minerva-dashboard-card
      >
    </minerva-dashboard-column>
  </minerva-dashboard-columns>
</template>
`,angular:`// dashboard-columns-drag-drop.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type OnDestroy,
} from "@angular/core";

// The board is controlled: on minerva-card-move the script moves the card
// element itself (toIndex counts the cards without the moved one) and
// updates the count attributes. canDrop keeps "Doing" at 2 cards.
import type {
  DashboardCardMove,
  MinervaDashboardColumns,
} from "minerva-design/web-components/dashboard-columns";

const LIMIT = 2;

@Component({
  selector: "app-dashboard-columns-drag-drop",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-dashboard-columns
      id="board"
      aria-label="Sprint 12"
      draggable
      #board
      [canDrop]="boardCanDrop"
      (minerva-card-move)="onMove($event)"
    >
      <minerva-dashboard-column heading="To do" value="todo" count="3">
        <minerva-dashboard-card value="guide" label="Write the onboarding guide"
          ><minerva-card padding="small"
            >Write the onboarding guide</minerva-card
          ></minerva-dashboard-card
        >
        <minerva-dashboard-card value="contrast" label="Audit color contrast"
          ><minerva-card padding="small"
            >Audit color contrast</minerva-card
          ></minerva-dashboard-card
        >
        <minerva-dashboard-card value="search" label="Index the docs search"
          ><minerva-card padding="small"
            >Index the docs search</minerva-card
          ></minerva-dashboard-card
        >
      </minerva-dashboard-column>
      <minerva-dashboard-column
        heading="Doing"
        value="doing"
        count="1"
        description="At most 2 cards"
      >
        <minerva-dashboard-card value="billing" label="Ship the billing page"
          ><minerva-card padding="small"
            >Ship the billing page</minerva-card
          ></minerva-dashboard-card
        >
      </minerva-dashboard-column>
      <minerva-dashboard-column heading="Done" value="done" count="1">
        <minerva-dashboard-card value="errors" label="Set up error tracking"
          ><minerva-card padding="small"
            >Set up error tracking</minerva-card
          ></minerva-dashboard-card
        >
      </minerva-dashboard-column>
    </minerva-dashboard-columns>
  \`,
})
export class DashboardColumnsDragDropComponent implements OnDestroy {
  @ViewChild("board") board!: ElementRef<MinervaDashboardColumns>;

  column = (value: string) =>
    this.board.nativeElement.querySelector<HTMLElement>(
      \`minerva-dashboard-column[value="\${value}"]\`,
    )!;
  cardsOf = (element: HTMLElement) =>
    Array.from(
      element.querySelectorAll<HTMLElement>(":scope > minerva-dashboard-card"),
    );

  boardCanDrop = (move) =>
    move.toColumn !== "doing" ||
    move.fromColumn === "doing" ||
    this.cardsOf(this.column("doing")).length < LIMIT;

  onMove = (event: Event) => {
    const move = (event as CustomEvent<DashboardCardMove>).detail;
    const card = this.cardsOf(this.column(move.fromColumn))[move.fromIndex]!;
    const target = this.column(move.toColumn);
    const others = this.cardsOf(target).filter((other) => other !== card);
    target.insertBefore(card, others[move.toIndex] ?? null);
    for (const element of [this.column(move.fromColumn), target])
      element.setAttribute("count", String(this.cardsOf(element).length));
  };

  ngOnDestroy(): void {
    this.board.nativeElement.canDrop = undefined;
  }
}
`,svelte:`<!-- DashboardColumnsDragDrop.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // The board is controlled: on minerva-card-move the script moves the card
  // element itself (toIndex counts the cards without the moved one) and
  // updates the count attributes. canDrop keeps "Doing" at 2 cards.

  import type {
    DashboardCardMove,
    MinervaDashboardColumns,
  } from "minerva-design/web-components/dashboard-columns";

  const LIMIT = 2;

  let board: MinervaDashboardColumns;

  const column = (value: string) =>
    board.querySelector<HTMLElement>(
      \`minerva-dashboard-column[value="\${value}"]\`,
    )!;
  const cardsOf = (element: HTMLElement) =>
    Array.from(
      element.querySelectorAll<HTMLElement>(":scope > minerva-dashboard-card"),
    );

  const boardCanDrop = (move) =>
    move.toColumn !== "doing" ||
    move.fromColumn === "doing" ||
    cardsOf(column("doing")).length < LIMIT;

  const onMove = (event: Event) => {
    const move = (event as CustomEvent<DashboardCardMove>).detail;
    const card = cardsOf(column(move.fromColumn))[move.fromIndex]!;
    const target = column(move.toColumn);
    const others = cardsOf(target).filter((other) => other !== card);
    target.insertBefore(card, others[move.toIndex] ?? null);
    for (const element of [column(move.fromColumn), target])
      element.setAttribute("count", String(cardsOf(element).length));
  };

  onMount(() => {
    return () => {
      board.canDrop = undefined;
    };
  });
<\/script>

<minerva-dashboard-columns
  id="board"
  aria-label="Sprint 12"
  draggable
  bind:this={board}
  canDrop={boardCanDrop}
  onminerva-card-move={onMove}
>
  <minerva-dashboard-column heading="To do" value="todo" count="3">
    <minerva-dashboard-card value="guide" label="Write the onboarding guide"
      ><minerva-card padding="small"
        >Write the onboarding guide</minerva-card></minerva-dashboard-card>
    <minerva-dashboard-card value="contrast" label="Audit color contrast"
      ><minerva-card padding="small"
        >Audit color contrast</minerva-card></minerva-dashboard-card>
    <minerva-dashboard-card value="search" label="Index the docs search"
      ><minerva-card padding="small"
        >Index the docs search</minerva-card></minerva-dashboard-card>
  </minerva-dashboard-column>
  <minerva-dashboard-column
    heading="Doing"
    value="doing"
    count="1"
    description="At most 2 cards"
  >
    <minerva-dashboard-card value="billing" label="Ship the billing page"
      ><minerva-card padding="small"
        >Ship the billing page</minerva-card></minerva-dashboard-card>
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="Done" value="done" count="1">
    <minerva-dashboard-card value="errors" label="Set up error tracking"
      ><minerva-card padding="small"
        >Set up error tracking</minerva-card></minerva-dashboard-card>
  </minerva-dashboard-column>
</minerva-dashboard-columns>
`,solid:`// DashboardColumnsDragDrop.tsx

import { onCleanup } from "solid-js";

// The board is controlled: on minerva-card-move the script moves the card
// element itself (toIndex counts the cards without the moved one) and
// updates the count attributes. canDrop keeps "Doing" at 2 cards.
import type {
  DashboardCardMove,
  MinervaDashboardColumns,
} from "minerva-design/web-components/dashboard-columns";

const LIMIT = 2;

export default function DashboardColumnsDragDrop() {
  let board!: MinervaDashboardColumns;

  const column = (value: string) =>
    board.querySelector<HTMLElement>(
      \`minerva-dashboard-column[value="\${value}"]\`,
    )!;
  const cardsOf = (element: HTMLElement) =>
    Array.from(
      element.querySelectorAll<HTMLElement>(":scope > minerva-dashboard-card"),
    );

  const boardCanDrop = (move) =>
    move.toColumn !== "doing" ||
    move.fromColumn === "doing" ||
    cardsOf(column("doing")).length < LIMIT;

  const onMove = (event: Event) => {
    const move = (event as CustomEvent<DashboardCardMove>).detail;
    const card = cardsOf(column(move.fromColumn))[move.fromIndex]!;
    const target = column(move.toColumn);
    const others = cardsOf(target).filter((other) => other !== card);
    target.insertBefore(card, others[move.toIndex] ?? null);
    for (const element of [column(move.fromColumn), target])
      element.setAttribute("count", String(cardsOf(element).length));
  };

  onCleanup(() => {
    board.canDrop = undefined;
  });

  return (
    <minerva-dashboard-columns
      id="board"
      aria-label="Sprint 12"
      draggable
      ref={board}
      prop:canDrop={boardCanDrop}
      on:minerva-card-move={onMove}
    >
      <minerva-dashboard-column heading="To do" value="todo" count="3">
        <minerva-dashboard-card
          value="guide"
          label="Write the onboarding guide"
        >
          <minerva-card padding="small">
            Write the onboarding guide
          </minerva-card>
        </minerva-dashboard-card>
        <minerva-dashboard-card value="contrast" label="Audit color contrast">
          <minerva-card padding="small">Audit color contrast</minerva-card>
        </minerva-dashboard-card>
        <minerva-dashboard-card value="search" label="Index the docs search">
          <minerva-card padding="small">Index the docs search</minerva-card>
        </minerva-dashboard-card>
      </minerva-dashboard-column>
      <minerva-dashboard-column
        heading="Doing"
        value="doing"
        count="1"
        description="At most 2 cards"
      >
        <minerva-dashboard-card value="billing" label="Ship the billing page">
          <minerva-card padding="small">Ship the billing page</minerva-card>
        </minerva-dashboard-card>
      </minerva-dashboard-column>
      <minerva-dashboard-column heading="Done" value="done" count="1">
        <minerva-dashboard-card value="errors" label="Set up error tracking">
          <minerva-card padding="small">Set up error tracking</minerva-card>
        </minerva-dashboard-card>
      </minerva-dashboard-column>
    </minerva-dashboard-columns>
  );
}
`,html:`<minerva-dashboard-columns id="board" aria-label="Sprint 12" draggable>
  <minerva-dashboard-column heading="To do" value="todo" count="3">
    <minerva-dashboard-card value="guide" label="Write the onboarding guide"
      ><minerva-card padding="small"
        >Write the onboarding guide</minerva-card
      ></minerva-dashboard-card
    >
    <minerva-dashboard-card value="contrast" label="Audit color contrast"
      ><minerva-card padding="small"
        >Audit color contrast</minerva-card
      ></minerva-dashboard-card
    >
    <minerva-dashboard-card value="search" label="Index the docs search"
      ><minerva-card padding="small"
        >Index the docs search</minerva-card
      ></minerva-dashboard-card
    >
  </minerva-dashboard-column>
  <minerva-dashboard-column
    heading="Doing"
    value="doing"
    count="1"
    description="At most 2 cards"
  >
    <minerva-dashboard-card value="billing" label="Ship the billing page"
      ><minerva-card padding="small"
        >Ship the billing page</minerva-card
      ></minerva-dashboard-card
    >
  </minerva-dashboard-column>
  <minerva-dashboard-column heading="Done" value="done" count="1">
    <minerva-dashboard-card value="errors" label="Set up error tracking"
      ><minerva-card padding="small"
        >Set up error tracking</minerva-card
      ></minerva-dashboard-card
    >
  </minerva-dashboard-column>
</minerva-dashboard-columns>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // The board is controlled: on minerva-card-move the script moves the card
  // element itself (toIndex counts the cards without the moved one) and
  // updates the count attributes. canDrop keeps "Doing" at 2 cards.
  const LIMIT = 2;

  const board = document.querySelector("#board");
  const column = (value) =>
    board.querySelector(\`minerva-dashboard-column[value="\${value}"]\`);
  const cardsOf = (element) =>
    Array.from(element.querySelectorAll(":scope > minerva-dashboard-card"));

  board.canDrop = (move) =>
    move.toColumn !== "doing" ||
    move.fromColumn === "doing" ||
    cardsOf(column("doing")).length < LIMIT;

  const onMove = (event) => {
    const move = event.detail;
    const card = cardsOf(column(move.fromColumn))[move.fromIndex];
    const target = column(move.toColumn);
    const others = cardsOf(target).filter((other) => other !== card);
    target.insertBefore(card, others[move.toIndex] ?? null);
    for (const element of [column(move.fromColumn), target])
      element.setAttribute("count", String(cardsOf(element).length));
  };
  board.addEventListener("minerva-card-move", onMove);
<\/script>
`}})))()}n();export{t as default};