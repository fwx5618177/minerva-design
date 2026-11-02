import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SliderCommitted.vue -->

<script setup lang="ts">
import { ref } from "vue";

// minerva-change follows the drag; minerva-change-end fires once on release
// (or after a key press): save there.

const outputText = ref("While dragging: 50 · Saved on release: 50");

let live: unknown = 50;
let saved: unknown = 50;
const render = () => {
  outputText.value = \`While dragging: \${live} · Saved on release: \${saved}\`;
};
const onChange = (e: Event) => {
  live = (e as CustomEvent<{ value: number }>).detail.value;
  render();
};
const onEnd = (e: Event) => {
  saved = (e as CustomEvent<{ value: number }>).detail.value;
  render();
};
<\/script>

<template>
  <div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
    <minerva-slider
      id="brightness"
      aria-label="Brightness"
      value="50"
      @minerva-change="onChange"
      @minerva-change-end="onEnd"
    ></minerva-slider>
    <output id="brightness-output">{{ outputText }}</output>
  </div>
</template>
`,angular:`// slider-committed.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// minerva-change follows the drag; minerva-change-end fires once on release
// (or after a key press): save there.

@Component({
  selector: "app-slider-committed",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
      <minerva-slider
        id="brightness"
        aria-label="Brightness"
        value="50"
        (minerva-change)="onChange($event)"
        (minerva-change-end)="onEnd($event)"
      ></minerva-slider>
      <output id="brightness-output">{{ outputText }}</output>
    </div>
  \`,
})
export class SliderCommittedComponent {
  outputText = "While dragging: 50 · Saved on release: 50";

  live: unknown = 50;
  saved: unknown = 50;
  render = () => {
    this.outputText = \`While dragging: \${this.live} · Saved on release: \${this.saved}\`;
  };
  onChange = (e: Event) => {
    this.live = (e as CustomEvent<{ value: number }>).detail.value;
    this.render();
  };
  onEnd = (e: Event) => {
    this.saved = (e as CustomEvent<{ value: number }>).detail.value;
    this.render();
  };
}
`,svelte:`<!-- SliderCommitted.svelte -->

<script lang="ts">
  // minerva-change follows the drag; minerva-change-end fires once on release
  // (or after a key press): save there.

  let outputText = $state("While dragging: 50 · Saved on release: 50");

  let live: unknown = 50;
  let saved: unknown = 50;
  const render = () => {
    outputText = \`While dragging: \${live} · Saved on release: \${saved}\`;
  };
  const onChange = (e: Event) => {
    live = (e as CustomEvent<{ value: number }>).detail.value;
    render();
  };
  const onEnd = (e: Event) => {
    saved = (e as CustomEvent<{ value: number }>).detail.value;
    render();
  };
<\/script>

<div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
  <minerva-slider
    id="brightness"
    aria-label="Brightness"
    value="50"
    onminerva-change={onChange}
    onminerva-change-end={onEnd}
  ></minerva-slider>
  <output id="brightness-output"
    >{outputText}</output>
</div>
`,solid:`// SliderCommitted.tsx

import { createSignal } from "solid-js";

// minerva-change follows the drag; minerva-change-end fires once on release
// (or after a key press): save there.

export default function SliderCommitted() {
  const [outputText, setOutputText] = createSignal(
    "While dragging: 50 · Saved on release: 50",
  );

  let live: unknown = 50;
  let saved: unknown = 50;
  const render = () => {
    setOutputText(\`While dragging: \${live} · Saved on release: \${saved}\`);
  };
  const onChange = (e: Event) => {
    live = (e as CustomEvent<{ value: number }>).detail.value;
    render();
  };
  const onEnd = (e: Event) => {
    saved = (e as CustomEvent<{ value: number }>).detail.value;
    render();
  };

  return (
    <div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
      <minerva-slider
        id="brightness"
        aria-label="Brightness"
        value="50"
        on:minerva-change={onChange}
        on:minerva-change-end={onEnd}
      ></minerva-slider>
      <output id="brightness-output">{outputText()}</output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
  <minerva-slider
    id="brightness"
    aria-label="Brightness"
    value="50"
  ></minerva-slider>
  <output id="brightness-output"
    >While dragging: 50 · Saved on release: 50</output
  >
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // minerva-change follows the drag; minerva-change-end fires once on release
  // (or after a key press): save there.
  const slider = document.querySelector("#brightness");
  const output = document.querySelector("#brightness-output");
  let live = 50;
  let saved = 50;
  const render = () => {
    output.value = \`While dragging: \${live} · Saved on release: \${saved}\`;
  };
  const onChange = (e) => {
    live = e.detail.value;
    render();
  };
  const onEnd = (e) => {
    saved = e.detail.value;
    render();
  };
  slider.addEventListener("minerva-change", onChange);
  slider.addEventListener("minerva-change-end", onEnd);
<\/script>
`}})))()}n();export{t as default};