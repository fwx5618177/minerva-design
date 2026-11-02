import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- AnswerSheetGroups.vue -->

<script setup lang="ts">
import { ref } from "vue";

// groups (a property) titles the sections: items render under the group
// whose key matches item.group. show-summary and show-legend add the
// "answered" count and a legend of the statuses present.

type AnswerSheetElement = HTMLElement & {
  items: Record<string, unknown>[];
  groups: { key: string; title: string }[];
};

const outputText = ref("Reviewing: s3");

const sheetGroups = [
  { key: "single", title: "Single choice" },
  { key: "multiple", title: "Multiple choice" },
  { key: "short", title: "Short answer" },
];
const sheetItems = [
  { key: "s1", group: "single", status: "correct" },
  { key: "s2", group: "single", status: "correct" },
  { key: "s3", group: "single", status: "wrong", flagged: true },
  { key: "s4", group: "single", status: "correct" },
  { key: "s5", group: "single", status: "skipped" },
  { key: "s6", group: "single", status: "correct" },
  { key: "m1", group: "multiple", status: "wrong" },
  { key: "m2", group: "multiple", status: "correct" },
  { key: "m3", group: "multiple", status: "answered", flagged: true },
  { key: "a1", group: "short", status: "answered" },
  { key: "a2", group: "short" },
  { key: "a3", group: "short", disabled: true },
];
const onChange = (e: Event) => {
  const { value } = (e as CustomEvent<{ value: string }>).detail;
  outputText.value = \`Reviewing: \${value}\`;
};
<\/script>

<template>
  <div style="display: grid; gap: 12px; max-width: 420px">
    <minerva-answer-sheet
      id="sheet"
      value="s3"
      show-summary
      show-legend
      aria-label="Review questions"
      :groups.prop="sheetGroups"
      :items.prop="sheetItems"
      @minerva-change="onChange"
    ></minerva-answer-sheet>
    <output id="current">{{ outputText }}</output>
  </div>
</template>
`,angular:`// answer-sheet-groups.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// groups (a property) titles the sections: items render under the group
// whose key matches item.group. show-summary and show-legend add the
// "answered" count and a legend of the statuses present.
type AnswerSheetElement = HTMLElement & {
  items: Record<string, unknown>[];
  groups: { key: string; title: string }[];
};

@Component({
  selector: "app-answer-sheet-groups",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; max-width: 420px">
      <minerva-answer-sheet
        id="sheet"
        value="s3"
        show-summary
        show-legend
        aria-label="Review questions"
        [groups]="sheetGroups"
        [items]="sheetItems"
        (minerva-change)="onChange($event)"
      ></minerva-answer-sheet>
      <output id="current">{{ outputText }}</output>
    </div>
  \`,
})
export class AnswerSheetGroupsComponent {
  outputText = "Reviewing: s3";

  sheetGroups = [
    { key: "single", title: "Single choice" },
    { key: "multiple", title: "Multiple choice" },
    { key: "short", title: "Short answer" },
  ];
  sheetItems = [
    { key: "s1", group: "single", status: "correct" },
    { key: "s2", group: "single", status: "correct" },
    { key: "s3", group: "single", status: "wrong", flagged: true },
    { key: "s4", group: "single", status: "correct" },
    { key: "s5", group: "single", status: "skipped" },
    { key: "s6", group: "single", status: "correct" },
    { key: "m1", group: "multiple", status: "wrong" },
    { key: "m2", group: "multiple", status: "correct" },
    { key: "m3", group: "multiple", status: "answered", flagged: true },
    { key: "a1", group: "short", status: "answered" },
    { key: "a2", group: "short" },
    { key: "a3", group: "short", disabled: true },
  ];
  onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    this.outputText = \`Reviewing: \${value}\`;
  };
}
`,svelte:`<!-- AnswerSheetGroups.svelte -->

<script lang="ts">
  // groups (a property) titles the sections: items render under the group
  // whose key matches item.group. show-summary and show-legend add the
  // "answered" count and a legend of the statuses present.

  type AnswerSheetElement = HTMLElement & {
    items: Record<string, unknown>[];
    groups: { key: string; title: string }[];
  };

  let outputText = $state("Reviewing: s3");

  const sheetGroups = [
    { key: "single", title: "Single choice" },
    { key: "multiple", title: "Multiple choice" },
    { key: "short", title: "Short answer" },
  ];
  const sheetItems = [
    { key: "s1", group: "single", status: "correct" },
    { key: "s2", group: "single", status: "correct" },
    { key: "s3", group: "single", status: "wrong", flagged: true },
    { key: "s4", group: "single", status: "correct" },
    { key: "s5", group: "single", status: "skipped" },
    { key: "s6", group: "single", status: "correct" },
    { key: "m1", group: "multiple", status: "wrong" },
    { key: "m2", group: "multiple", status: "correct" },
    { key: "m3", group: "multiple", status: "answered", flagged: true },
    { key: "a1", group: "short", status: "answered" },
    { key: "a2", group: "short" },
    { key: "a3", group: "short", disabled: true },
  ];
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    outputText = \`Reviewing: \${value}\`;
  };
<\/script>

<div style="display: grid; gap: 12px; max-width: 420px">
  <minerva-answer-sheet
    id="sheet"
    value="s3"
    show-summary
    show-legend
    aria-label="Review questions"
    groups={sheetGroups}
    items={sheetItems}
    onminerva-change={onChange}
  ></minerva-answer-sheet>
  <output id="current">{outputText}</output>
</div>
`,solid:`// AnswerSheetGroups.tsx

import { createSignal } from "solid-js";

// groups (a property) titles the sections: items render under the group
// whose key matches item.group. show-summary and show-legend add the
// "answered" count and a legend of the statuses present.
type AnswerSheetElement = HTMLElement & {
  items: Record<string, unknown>[];
  groups: { key: string; title: string }[];
};

export default function AnswerSheetGroups() {
  const [outputText, setOutputText] = createSignal("Reviewing: s3");

  const sheetGroups = [
    { key: "single", title: "Single choice" },
    { key: "multiple", title: "Multiple choice" },
    { key: "short", title: "Short answer" },
  ];
  const sheetItems = [
    { key: "s1", group: "single", status: "correct" },
    { key: "s2", group: "single", status: "correct" },
    { key: "s3", group: "single", status: "wrong", flagged: true },
    { key: "s4", group: "single", status: "correct" },
    { key: "s5", group: "single", status: "skipped" },
    { key: "s6", group: "single", status: "correct" },
    { key: "m1", group: "multiple", status: "wrong" },
    { key: "m2", group: "multiple", status: "correct" },
    { key: "m3", group: "multiple", status: "answered", flagged: true },
    { key: "a1", group: "short", status: "answered" },
    { key: "a2", group: "short" },
    { key: "a3", group: "short", disabled: true },
  ];
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    setOutputText(\`Reviewing: \${value}\`);
  };

  return (
    <div style="display: grid; gap: 12px; max-width: 420px">
      <minerva-answer-sheet
        id="sheet"
        value="s3"
        show-summary
        show-legend
        aria-label="Review questions"
        prop:groups={sheetGroups}
        prop:items={sheetItems}
        on:minerva-change={onChange}
      ></minerva-answer-sheet>
      <output id="current">{outputText()}</output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; max-width: 420px">
  <minerva-answer-sheet
    id="sheet"
    value="s3"
    show-summary
    show-legend
    aria-label="Review questions"
  ></minerva-answer-sheet>
  <output id="current">Reviewing: s3</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // groups (a property) titles the sections: items render under the group
  // whose key matches item.group. show-summary and show-legend add the
  // "answered" count and a legend of the statuses present.
  const sheet = document.querySelector("#sheet");
  const output = document.querySelector("#current");
  sheet.groups = [
    { key: "single", title: "Single choice" },
    { key: "multiple", title: "Multiple choice" },
    { key: "short", title: "Short answer" },
  ];
  sheet.items = [
    { key: "s1", group: "single", status: "correct" },
    { key: "s2", group: "single", status: "correct" },
    { key: "s3", group: "single", status: "wrong", flagged: true },
    { key: "s4", group: "single", status: "correct" },
    { key: "s5", group: "single", status: "skipped" },
    { key: "s6", group: "single", status: "correct" },
    { key: "m1", group: "multiple", status: "wrong" },
    { key: "m2", group: "multiple", status: "correct" },
    { key: "m3", group: "multiple", status: "answered", flagged: true },
    { key: "a1", group: "short", status: "answered" },
    { key: "a2", group: "short" },
    { key: "a3", group: "short", disabled: true },
  ];
  const onChange = (e) => {
    const { value } = e.detail;
    output.value = \`Reviewing: \${value}\`;
  };
  sheet.addEventListener("minerva-change", onChange);
<\/script>
`}})))()}n();export{t as default};