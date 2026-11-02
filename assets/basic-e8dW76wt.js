import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- AnswerSheetBasic.vue -->

<script setup lang="ts">
import { ref } from "vue";

// items is a property (an array of { key, status?, label?, flagged?,
// disabled?, group? }); value is the key of the current question and
// minerva-change reports the selected one. One tab stop: the arrow keys and
// Home / End move the focus, Enter / Space select.

type AnswerSheetElement = HTMLElement & {
  items: { key: string; status?: string }[];
};

const outputText = ref("Current question: 6");

const sheetItems = Array.from({ length: 12 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 5 ? "answered" : "unanswered",
}));
const onChange = (e: Event) => {
  const { value } = (e as CustomEvent<{ value: string }>).detail;
  outputText.value = \`Current question: \${value.slice(1)}\`;
};
<\/script>

<template>
  <div style="display: grid; gap: 12px; max-width: 420px">
    <minerva-answer-sheet
      id="sheet"
      value="q6"
      :items.prop="sheetItems"
      @minerva-change="onChange"
    ></minerva-answer-sheet>
    <output id="current">{{ outputText }}</output>
  </div>
</template>
`,angular:`// answer-sheet-basic.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// items is a property (an array of { key, status?, label?, flagged?,
// disabled?, group? }); value is the key of the current question and
// minerva-change reports the selected one. One tab stop: the arrow keys and
// Home / End move the focus, Enter / Space select.
type AnswerSheetElement = HTMLElement & {
  items: { key: string; status?: string }[];
};

@Component({
  selector: "app-answer-sheet-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; max-width: 420px">
      <minerva-answer-sheet
        id="sheet"
        value="q6"
        [items]="sheetItems"
        (minerva-change)="onChange($event)"
      ></minerva-answer-sheet>
      <output id="current">{{ outputText }}</output>
    </div>
  \`,
})
export class AnswerSheetBasicComponent {
  outputText = "Current question: 6";

  sheetItems = Array.from({ length: 12 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 5 ? "answered" : "unanswered",
  }));
  onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    this.outputText = \`Current question: \${value.slice(1)}\`;
  };
}
`,svelte:`<!-- AnswerSheetBasic.svelte -->

<script lang="ts">
  // items is a property (an array of { key, status?, label?, flagged?,
  // disabled?, group? }); value is the key of the current question and
  // minerva-change reports the selected one. One tab stop: the arrow keys and
  // Home / End move the focus, Enter / Space select.

  type AnswerSheetElement = HTMLElement & {
    items: { key: string; status?: string }[];
  };

  let outputText = $state("Current question: 6");

  const sheetItems = Array.from({ length: 12 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 5 ? "answered" : "unanswered",
  }));
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    outputText = \`Current question: \${value.slice(1)}\`;
  };
<\/script>

<div style="display: grid; gap: 12px; max-width: 420px">
  <minerva-answer-sheet
    id="sheet"
    value="q6"
    items={sheetItems}
    onminerva-change={onChange}
  ></minerva-answer-sheet>
  <output id="current">{outputText}</output>
</div>
`,solid:`// AnswerSheetBasic.tsx

import { createSignal } from "solid-js";

// items is a property (an array of { key, status?, label?, flagged?,
// disabled?, group? }); value is the key of the current question and
// minerva-change reports the selected one. One tab stop: the arrow keys and
// Home / End move the focus, Enter / Space select.
type AnswerSheetElement = HTMLElement & {
  items: { key: string; status?: string }[];
};

export default function AnswerSheetBasic() {
  const [outputText, setOutputText] = createSignal("Current question: 6");

  const sheetItems = Array.from({ length: 12 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 5 ? "answered" : "unanswered",
  }));
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    setOutputText(\`Current question: \${value.slice(1)}\`);
  };

  return (
    <div style="display: grid; gap: 12px; max-width: 420px">
      <minerva-answer-sheet
        id="sheet"
        value="q6"
        prop:items={sheetItems}
        on:minerva-change={onChange}
      ></minerva-answer-sheet>
      <output id="current">{outputText()}</output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; max-width: 420px">
  <minerva-answer-sheet id="sheet" value="q6"></minerva-answer-sheet>
  <output id="current">Current question: 6</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // items is a property (an array of { key, status?, label?, flagged?,
  // disabled?, group? }); value is the key of the current question and
  // minerva-change reports the selected one. One tab stop: the arrow keys and
  // Home / End move the focus, Enter / Space select.
  const sheet = document.querySelector("#sheet");
  const output = document.querySelector("#current");
  sheet.items = Array.from({ length: 12 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 5 ? "answered" : "unanswered",
  }));
  const onChange = (e) => {
    const { value } = e.detail;
    output.value = \`Current question: \${value.slice(1)}\`;
  };
  sheet.addEventListener("minerva-change", onChange);
<\/script>
`}})))()}n();export{t as default};