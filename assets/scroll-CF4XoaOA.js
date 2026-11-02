import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- AnswerSheetScroll.vue -->

<script setup lang="ts">
import { ref } from "vue";

// layout="scroll" keeps a single horizontally scrolling row (also the
// :state(layout-scroll) custom state).

type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

const outputText = ref("Current question: 16");

const sheetItems = Array.from({ length: 40 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
  flagged: i === 8,
}));
const onChange = (e: Event) => {
  const { value } = (e as CustomEvent<{ value: string }>).detail;
  outputText.value = \`Current question: \${value.slice(1)}\`;
};
<\/script>

<template>
  <div style="display: grid; gap: 12px; width: 100%; max-width: 360px">
    <minerva-answer-sheet
      id="sheet"
      value="q16"
      layout="scroll"
      size="small"
      :items.prop="sheetItems"
      @minerva-change="onChange"
    ></minerva-answer-sheet>
    <output id="current">{{ outputText }}</output>
  </div>
</template>
`,angular:`// answer-sheet-scroll.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// layout="scroll" keeps a single horizontally scrolling row (also the
// :state(layout-scroll) custom state).
type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

@Component({
  selector: "app-answer-sheet-scroll",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; width: 100%; max-width: 360px">
      <minerva-answer-sheet
        id="sheet"
        value="q16"
        layout="scroll"
        size="small"
        [items]="sheetItems"
        (minerva-change)="onChange($event)"
      ></minerva-answer-sheet>
      <output id="current">{{ outputText }}</output>
    </div>
  \`,
})
export class AnswerSheetScrollComponent {
  outputText = "Current question: 16";

  sheetItems = Array.from({ length: 40 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
    flagged: i === 8,
  }));
  onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    this.outputText = \`Current question: \${value.slice(1)}\`;
  };
}
`,svelte:`<!-- AnswerSheetScroll.svelte -->

<script lang="ts">
  // layout="scroll" keeps a single horizontally scrolling row (also the
  // :state(layout-scroll) custom state).

  type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

  let outputText = $state("Current question: 16");

  const sheetItems = Array.from({ length: 40 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
    flagged: i === 8,
  }));
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    outputText = \`Current question: \${value.slice(1)}\`;
  };
<\/script>

<div style="display: grid; gap: 12px; width: 100%; max-width: 360px">
  <minerva-answer-sheet
    id="sheet"
    value="q16"
    layout="scroll"
    size="small"
    items={sheetItems}
    onminerva-change={onChange}
  ></minerva-answer-sheet>
  <output id="current">{outputText}</output>
</div>
`,solid:`// AnswerSheetScroll.tsx

import { createSignal } from "solid-js";

// layout="scroll" keeps a single horizontally scrolling row (also the
// :state(layout-scroll) custom state).
type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

export default function AnswerSheetScroll() {
  const [outputText, setOutputText] = createSignal("Current question: 16");

  const sheetItems = Array.from({ length: 40 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
    flagged: i === 8,
  }));
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    setOutputText(\`Current question: \${value.slice(1)}\`);
  };

  return (
    <div style="display: grid; gap: 12px; width: 100%; max-width: 360px">
      <minerva-answer-sheet
        id="sheet"
        value="q16"
        layout="scroll"
        size="small"
        prop:items={sheetItems}
        on:minerva-change={onChange}
      ></minerva-answer-sheet>
      <output id="current">{outputText()}</output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; width: 100%; max-width: 360px">
  <minerva-answer-sheet
    id="sheet"
    value="q16"
    layout="scroll"
    size="small"
  ></minerva-answer-sheet>
  <output id="current">Current question: 16</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // layout="scroll" keeps a single horizontally scrolling row (also the
  // :state(layout-scroll) custom state).
  const sheet = document.querySelector("#sheet");
  const output = document.querySelector("#current");
  sheet.items = Array.from({ length: 40 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
    flagged: i === 8,
  }));
  const onChange = (e) => {
    const { value } = e.detail;
    output.value = \`Current question: \${value.slice(1)}\`;
  };
  sheet.addEventListener("minerva-change", onChange);
<\/script>
`}})))()}n();export{t as default};