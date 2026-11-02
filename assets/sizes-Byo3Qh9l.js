import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- AnswerSheetSizes.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// size="small" uses smaller pills; columns="5" lays them out in a fixed
// grid (ArrowUp / ArrowDown move by a row); disabled blocks selection.

type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

const root = ref<HTMLElement>();

const items = Array.from({ length: 10 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 4 ? "answered" : "unanswered",
}));

onMounted(() => {
  for (const sheet of root.value!.querySelectorAll<AnswerSheetElement>(
    "minerva-answer-sheet",
  )) {
    sheet.items = items;
  }
});
<\/script>

<template>
  <div ref="root">
    <div style="display: grid; gap: 24px; max-width: 420px">
      <minerva-answer-sheet
        size="small"
        value="q5"
        aria-label="Small sheet"
      ></minerva-answer-sheet>
      <minerva-answer-sheet
        columns="5"
        value="q5"
        aria-label="Five columns"
      ></minerva-answer-sheet>
      <minerva-answer-sheet
        disabled
        aria-label="Disabled sheet"
      ></minerva-answer-sheet>
    </div>
  </div>
</template>
`,angular:`// answer-sheet-sizes.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";

// size="small" uses smaller pills; columns="5" lays them out in a fixed
// grid (ArrowUp / ArrowDown move by a row); disabled blocks selection.
type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

@Component({
  selector: "app-answer-sheet-sizes",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div #root>
      <div style="display: grid; gap: 24px; max-width: 420px">
        <minerva-answer-sheet
          size="small"
          value="q5"
          aria-label="Small sheet"
        ></minerva-answer-sheet>
        <minerva-answer-sheet
          columns="5"
          value="q5"
          aria-label="Five columns"
        ></minerva-answer-sheet>
        <minerva-answer-sheet
          disabled
          aria-label="Disabled sheet"
        ></minerva-answer-sheet>
      </div>
    </div>
  \`,
})
export class AnswerSheetSizesComponent implements AfterViewInit {
  @ViewChild("root") root!: ElementRef<HTMLElement>;

  items = Array.from({ length: 10 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 4 ? "answered" : "unanswered",
  }));

  ngAfterViewInit(): void {
    for (const sheet of this.root.nativeElement.querySelectorAll<AnswerSheetElement>(
      "minerva-answer-sheet",
    )) {
      sheet.items = this.items;
    }
  }
}
`,svelte:`<!-- AnswerSheetSizes.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // size="small" uses smaller pills; columns="5" lays them out in a fixed
  // grid (ArrowUp / ArrowDown move by a row); disabled blocks selection.

  type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

  let root: HTMLElement;

  const items = Array.from({ length: 10 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 4 ? "answered" : "unanswered",
  }));

  onMount(() => {
    for (const sheet of root.querySelectorAll<AnswerSheetElement>(
      "minerva-answer-sheet",
    )) {
      sheet.items = items;
    }
  });
<\/script>

<div
  bind:this={root}
>
  <div style="display: grid; gap: 24px; max-width: 420px">
    <minerva-answer-sheet
      size="small"
      value="q5"
      aria-label="Small sheet"
    ></minerva-answer-sheet>
    <minerva-answer-sheet
      columns="5"
      value="q5"
      aria-label="Five columns"
    ></minerva-answer-sheet>
    <minerva-answer-sheet
      disabled
      aria-label="Disabled sheet"
    ></minerva-answer-sheet>
  </div>
</div>
`,solid:`// AnswerSheetSizes.tsx

import { onMount } from "solid-js";

// size="small" uses smaller pills; columns="5" lays them out in a fixed
// grid (ArrowUp / ArrowDown move by a row); disabled blocks selection.
type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

export default function AnswerSheetSizes() {
  let root!: HTMLElement;

  const items = Array.from({ length: 10 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 4 ? "answered" : "unanswered",
  }));

  onMount(() => {
    for (const sheet of root.querySelectorAll<AnswerSheetElement>(
      "minerva-answer-sheet",
    )) {
      sheet.items = items;
    }
  });

  return (
    <div ref={root}>
      <div style="display: grid; gap: 24px; max-width: 420px">
        <minerva-answer-sheet
          size="small"
          value="q5"
          aria-label="Small sheet"
        ></minerva-answer-sheet>
        <minerva-answer-sheet
          columns="5"
          value="q5"
          aria-label="Five columns"
        ></minerva-answer-sheet>
        <minerva-answer-sheet
          disabled
          aria-label="Disabled sheet"
        ></minerva-answer-sheet>
      </div>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 24px; max-width: 420px">
  <minerva-answer-sheet
    size="small"
    value="q5"
    aria-label="Small sheet"
  ></minerva-answer-sheet>
  <minerva-answer-sheet
    columns="5"
    value="q5"
    aria-label="Five columns"
  ></minerva-answer-sheet>
  <minerva-answer-sheet
    disabled
    aria-label="Disabled sheet"
  ></minerva-answer-sheet>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // size="small" uses smaller pills; columns="5" lays them out in a fixed
  // grid (ArrowUp / ArrowDown move by a row); disabled blocks selection.
  const items = Array.from({ length: 10 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 4 ? "answered" : "unanswered",
  }));
  for (const sheet of document.querySelectorAll("minerva-answer-sheet")) {
    sheet.items = items;
  }
<\/script>
`}})))()}n();export{t as default};