import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- DatePickerBasic.vue -->

<script setup lang="ts">
import { ref } from "vue";

const resultText = ref("2026-10-15");

const onChange = (event: Event) => {
  resultText.value =
    (event as CustomEvent<{ value: string }>).detail.value || "Cleared";
};
<\/script>

<template>
  <minerva-date-picker
    id="delivery-date"
    label="Delivery date"
    value="2026-10-15"
    min-date="2026-10-10"
    max-date="2026-10-20"
    @minerva-change="onChange"
  ></minerva-date-picker>
  <output id="date-result" aria-live="polite">{{ resultText }}</output>
</template>
`,angular:`// date-picker-basic.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-date-picker-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-date-picker
      id="delivery-date"
      label="Delivery date"
      value="2026-10-15"
      min-date="2026-10-10"
      max-date="2026-10-20"
      (minerva-change)="onChange($event)"
    ></minerva-date-picker>
    <output id="date-result" aria-live="polite">{{ resultText }}</output>
  \`,
})
export class DatePickerBasicComponent {
  resultText = "2026-10-15";

  onChange = (event: Event) => {
    this.resultText =
      (event as CustomEvent<{ value: string }>).detail.value || "Cleared";
  };
}
`,svelte:`<!-- DatePickerBasic.svelte -->

<script lang="ts">
  let resultText = $state("2026-10-15");

  const onChange = (event: Event) => {
    resultText =
      (event as CustomEvent<{ value: string }>).detail.value || "Cleared";
  };
<\/script>

<minerva-date-picker
  id="delivery-date"
  label="Delivery date"
  value="2026-10-15"
  min-date="2026-10-10"
  max-date="2026-10-20"
  onminerva-change={onChange}
></minerva-date-picker>
<output id="date-result" aria-live="polite">{resultText}</output>
`,solid:`// DatePickerBasic.tsx

import { createSignal } from "solid-js";

export default function DatePickerBasic() {
  const [resultText, setResultText] = createSignal("2026-10-15");

  const onChange = (event: Event) => {
    setResultText(
      (event as CustomEvent<{ value: string }>).detail.value || "Cleared",
    );
  };

  return (
    <>
      <minerva-date-picker
        id="delivery-date"
        label="Delivery date"
        value="2026-10-15"
        min-date="2026-10-10"
        max-date="2026-10-20"
        on:minerva-change={onChange}
      ></minerva-date-picker>
      <output id="date-result" aria-live="polite">
        {resultText()}
      </output>
    </>
  );
}
`,html:`<minerva-date-picker
  id="delivery-date"
  label="Delivery date"
  value="2026-10-15"
  min-date="2026-10-10"
  max-date="2026-10-20"
></minerva-date-picker>
<output id="date-result" aria-live="polite">2026-10-15</output>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  const picker = document.querySelector("#delivery-date");
  const result = document.querySelector("#date-result");
  const onChange = (event) => {
    result.value = event.detail.value || "Cleared";
  };
  picker.addEventListener("minerva-change", onChange);
<\/script>
`}})))()}n();export{t as default};