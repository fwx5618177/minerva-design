import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SliderBasic.vue -->

<script setup lang="ts">
import { ref } from "vue";

// value is an attribute ("40"); minerva-change follows the drag and the keys.

const outputText = ref("Volume: 40");

const onChange = (e: Event) => {
  const { value } = (e as CustomEvent<{ value: number }>).detail;
  outputText.value = \`Volume: \${value}\`;
};
<\/script>

<template>
  <div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
    <minerva-slider
      id="volume"
      aria-label="Volume"
      value="40"
      show-value
      tooltip
      @minerva-change="onChange"
    ></minerva-slider>
    <minerva-slider
      aria-label="Opacity"
      value="0.6"
      min="0"
      max="1"
      step="0.05"
      show-value
    ></minerva-slider>
    <output id="volume-output">{{ outputText }}</output>
  </div>
</template>
`,angular:`// slider-basic.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// value is an attribute ("40"); minerva-change follows the drag and the keys.

@Component({
  selector: "app-slider-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
      <minerva-slider
        id="volume"
        aria-label="Volume"
        value="40"
        show-value
        tooltip
        (minerva-change)="onChange($event)"
      ></minerva-slider>
      <minerva-slider
        aria-label="Opacity"
        value="0.6"
        min="0"
        max="1"
        step="0.05"
        show-value
      ></minerva-slider>
      <output id="volume-output">{{ outputText }}</output>
    </div>
  \`,
})
export class SliderBasicComponent {
  outputText = "Volume: 40";

  onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: number }>).detail;
    this.outputText = \`Volume: \${value}\`;
  };
}
`,svelte:`<!-- SliderBasic.svelte -->

<script lang="ts">
  // value is an attribute ("40"); minerva-change follows the drag and the keys.

  let outputText = $state("Volume: 40");

  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: number }>).detail;
    outputText = \`Volume: \${value}\`;
  };
<\/script>

<div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
  <minerva-slider
    id="volume"
    aria-label="Volume"
    value="40"
    show-value
    tooltip
    onminerva-change={onChange}
  ></minerva-slider>
  <minerva-slider
    aria-label="Opacity"
    value="0.6"
    min="0"
    max="1"
    step="0.05"
    show-value
  ></minerva-slider>
  <output id="volume-output">{outputText}</output>
</div>
`,solid:`// SliderBasic.tsx

import { createSignal } from "solid-js";

// value is an attribute ("40"); minerva-change follows the drag and the keys.

export default function SliderBasic() {
  const [outputText, setOutputText] = createSignal("Volume: 40");

  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: number }>).detail;
    setOutputText(\`Volume: \${value}\`);
  };

  return (
    <div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
      <minerva-slider
        id="volume"
        aria-label="Volume"
        value="40"
        show-value
        tooltip
        on:minerva-change={onChange}
      ></minerva-slider>
      <minerva-slider
        aria-label="Opacity"
        value="0.6"
        min="0"
        max="1"
        step="0.05"
        show-value
      ></minerva-slider>
      <output id="volume-output">{outputText()}</output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
  <minerva-slider
    id="volume"
    aria-label="Volume"
    value="40"
    show-value
    tooltip
  ></minerva-slider>
  <minerva-slider
    aria-label="Opacity"
    value="0.6"
    min="0"
    max="1"
    step="0.05"
    show-value
  ></minerva-slider>
  <output id="volume-output">Volume: 40</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // value is an attribute ("40"); minerva-change follows the drag and the keys.
  const slider = document.querySelector("#volume");
  const output = document.querySelector("#volume-output");
  const onChange = (e) => {
    const { value } = e.detail;
    output.value = \`Volume: \${value}\`;
  };
  slider.addEventListener("minerva-change", onChange);
<\/script>
`}})))()}n();export{t as default};