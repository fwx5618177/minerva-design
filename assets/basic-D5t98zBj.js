import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SegmentedControlBasic.vue -->

<script setup lang="ts">
import { ref } from "vue";

// options is a JSON (or comma-separated) attribute; minerva-change reports
// the selected value. One tab stop: the arrow keys move and select.

const outputText = ref("Showing the week view");

const onChange = (e: Event) => {
  const { value } = (e as CustomEvent<{ value: string }>).detail;
  outputText.value = \`Showing the \${value} view\`;
};
<\/script>

<template>
  <div style="display: grid; gap: 12px; justify-items: start">
    <minerva-segmented-control
      id="view"
      aria-label="Calendar view"
      options='[{"value":"day","label":"Day"},{"value":"week","label":"Week"},{"value":"month","label":"Month"}]'
      value="week"
      @minerva-change="onChange"
    ></minerva-segmented-control>
    <output id="selected">{{ outputText }}</output>
  </div>
</template>
`,angular:`// segmented-control-basic.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// options is a JSON (or comma-separated) attribute; minerva-change reports
// the selected value. One tab stop: the arrow keys move and select.

@Component({
  selector: "app-segmented-control-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; justify-items: start">
      <minerva-segmented-control
        id="view"
        aria-label="Calendar view"
        options='[{"value":"day","label":"Day"},{"value":"week","label":"Week"},{"value":"month","label":"Month"}]'
        value="week"
        (minerva-change)="onChange($event)"
      ></minerva-segmented-control>
      <output id="selected">{{ outputText }}</output>
    </div>
  \`,
})
export class SegmentedControlBasicComponent {
  outputText = "Showing the week view";

  onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    this.outputText = \`Showing the \${value} view\`;
  };
}
`,svelte:`<!-- SegmentedControlBasic.svelte -->

<script lang="ts">
  // options is a JSON (or comma-separated) attribute; minerva-change reports
  // the selected value. One tab stop: the arrow keys move and select.

  let outputText = $state("Showing the week view");

  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    outputText = \`Showing the \${value} view\`;
  };
<\/script>

<div style="display: grid; gap: 12px; justify-items: start">
  <minerva-segmented-control
    id="view"
    aria-label="Calendar view"
    options={"[{\\"value\\":\\"day\\",\\"label\\":\\"Day\\"},{\\"value\\":\\"week\\",\\"label\\":\\"Week\\"},{\\"value\\":\\"month\\",\\"label\\":\\"Month\\"}]"}
    value="week"
    onminerva-change={onChange}
  ></minerva-segmented-control>
  <output id="selected">{outputText}</output>
</div>
`,solid:`// SegmentedControlBasic.tsx

import { createSignal } from "solid-js";

// options is a JSON (or comma-separated) attribute; minerva-change reports
// the selected value. One tab stop: the arrow keys move and select.

export default function SegmentedControlBasic() {
  const [outputText, setOutputText] = createSignal("Showing the week view");

  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    setOutputText(\`Showing the \${value} view\`);
  };

  return (
    <div style="display: grid; gap: 12px; justify-items: start">
      <minerva-segmented-control
        id="view"
        aria-label="Calendar view"
        options='[{"value":"day","label":"Day"},{"value":"week","label":"Week"},{"value":"month","label":"Month"}]'
        value="week"
        on:minerva-change={onChange}
      ></minerva-segmented-control>
      <output id="selected">{outputText()}</output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; justify-items: start">
  <minerva-segmented-control
    id="view"
    aria-label="Calendar view"
    options='[{"value":"day","label":"Day"},{"value":"week","label":"Week"},{"value":"month","label":"Month"}]'
    value="week"
  ></minerva-segmented-control>
  <output id="selected">Showing the week view</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // options is a JSON (or comma-separated) attribute; minerva-change reports
  // the selected value. One tab stop: the arrow keys move and select.
  const control = document.querySelector("#view");
  const output = document.querySelector("#selected");
  const onChange = (e) => {
    const { value } = e.detail;
    output.value = \`Showing the \${value} view\`;
  };
  control.addEventListener("minerva-change", onChange);
<\/script>
`}})))()}n();export{t as default};