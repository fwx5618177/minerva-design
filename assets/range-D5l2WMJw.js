import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SliderRange.vue -->

<script setup lang="ts">
import { ref } from "vue";

// range takes a "start,end" value attribute; the form submits two "price"
// entries. formatValue is a property.

import type { MinervaSlider } from "minerva-design/web-components/slider";

const outputText = ref("From $20 to $80");

const sliderFormatValue = (v) => \`$\${v}\`;
const onChange = (e: Event) => {
  const [low, high] = (e as CustomEvent<{ value: [number, number] }>).detail
    .value;
  outputText.value = \`From $\${low} to $\${high}\`;
};
<\/script>

<template>
  <form
    id="price-form"
    style="display: grid; gap: 12px; width: 100%; max-width: 420px"
  >
    <minerva-slider
      id="price"
      aria-label="Price"
      name="price"
      range
      value="20,80"
      step="5"
      tooltip
      :formatValue.prop="sliderFormatValue"
      @minerva-change="onChange"
    ></minerva-slider>
    <output id="price-output">{{ outputText }}</output>
  </form>
</template>
`,angular:`// slider-range.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// range takes a "start,end" value attribute; the form submits two "price"
// entries. formatValue is a property.
import type { MinervaSlider } from "minerva-design/web-components/slider";

@Component({
  selector: "app-slider-range",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <form
      id="price-form"
      style="display: grid; gap: 12px; width: 100%; max-width: 420px"
    >
      <minerva-slider
        id="price"
        aria-label="Price"
        name="price"
        range
        value="20,80"
        step="5"
        tooltip
        [formatValue]="sliderFormatValue"
        (minerva-change)="onChange($event)"
      ></minerva-slider>
      <output id="price-output">{{ outputText }}</output>
    </form>
  \`,
})
export class SliderRangeComponent {
  outputText = "From $20 to $80";

  sliderFormatValue = (v) => \`$\${v}\`;
  onChange = (e: Event) => {
    const [low, high] = (e as CustomEvent<{ value: [number, number] }>).detail
      .value;
    this.outputText = \`From $\${low} to $\${high}\`;
  };
}
`,svelte:`<!-- SliderRange.svelte -->

<script lang="ts">
  // range takes a "start,end" value attribute; the form submits two "price"
  // entries. formatValue is a property.

  import type { MinervaSlider } from "minerva-design/web-components/slider";

  let outputText = $state("From $20 to $80");

  const sliderFormatValue = (v) => \`$\${v}\`;
  const onChange = (e: Event) => {
    const [low, high] = (e as CustomEvent<{ value: [number, number] }>).detail
      .value;
    outputText = \`From $\${low} to $\${high}\`;
  };
<\/script>

<form
  id="price-form"
  style="display: grid; gap: 12px; width: 100%; max-width: 420px"
>
  <minerva-slider
    id="price"
    aria-label="Price"
    name="price"
    range
    value="20,80"
    step="5"
    tooltip
    formatValue={sliderFormatValue}
    onminerva-change={onChange}
  ></minerva-slider>
  <output id="price-output">{outputText}</output>
</form>
`,solid:`// SliderRange.tsx

import { createSignal } from "solid-js";

// range takes a "start,end" value attribute; the form submits two "price"
// entries. formatValue is a property.
import type { MinervaSlider } from "minerva-design/web-components/slider";

export default function SliderRange() {
  const [outputText, setOutputText] = createSignal("From $20 to $80");

  const sliderFormatValue = (v) => \`$\${v}\`;
  const onChange = (e: Event) => {
    const [low, high] = (e as CustomEvent<{ value: [number, number] }>).detail
      .value;
    setOutputText(\`From $\${low} to $\${high}\`);
  };

  return (
    <form
      id="price-form"
      style="display: grid; gap: 12px; width: 100%; max-width: 420px"
    >
      <minerva-slider
        id="price"
        aria-label="Price"
        name="price"
        range
        value="20,80"
        step="5"
        tooltip
        prop:formatValue={sliderFormatValue}
        on:minerva-change={onChange}
      ></minerva-slider>
      <output id="price-output">{outputText()}</output>
    </form>
  );
}
`,html:`<form
  id="price-form"
  style="display: grid; gap: 12px; width: 100%; max-width: 420px"
>
  <minerva-slider
    id="price"
    aria-label="Price"
    name="price"
    range
    value="20,80"
    step="5"
    tooltip
  ></minerva-slider>
  <output id="price-output">From $20 to $80</output>
</form>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // range takes a "start,end" value attribute; the form submits two "price"
  // entries. formatValue is a property.
  const slider = document.querySelector("#price");
  const output = document.querySelector("#price-output");
  slider.formatValue = (v) => \`$\${v}\`;
  const onChange = (e) => {
    const [low, high] = e.detail.value;
    output.value = \`From $\${low} to $\${high}\`;
  };
  slider.addEventListener("minerva-change", onChange);
<\/script>
`}})))()}n();export{t as default};