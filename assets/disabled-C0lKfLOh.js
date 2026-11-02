import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SliderDisabled.vue -->

<template>
  <div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
    <minerva-slider aria-label="Disabled" value="40" disabled></minerva-slider>
    <minerva-slider
      aria-label="Read only"
      value="60"
      readonly
      show-value
    ></minerva-slider>
    <minerva-slider
      aria-label="Daily goal (minutes)"
      value="5"
      max="120"
      step="5"
      invalid
      show-value
    ></minerva-slider>
  </div>
</template>
`,angular:`// slider-disabled.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-slider-disabled",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
      <minerva-slider
        aria-label="Disabled"
        value="40"
        disabled
      ></minerva-slider>
      <minerva-slider
        aria-label="Read only"
        value="60"
        readonly
        show-value
      ></minerva-slider>
      <minerva-slider
        aria-label="Daily goal (minutes)"
        value="5"
        max="120"
        step="5"
        invalid
        show-value
      ></minerva-slider>
    </div>
  \`,
})
export class SliderDisabledComponent {}
`,svelte:`<!-- SliderDisabled.svelte -->

<div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
  <minerva-slider aria-label="Disabled" value="40" disabled></minerva-slider>
  <minerva-slider
    aria-label="Read only"
    value="60"
    readonly
    show-value
  ></minerva-slider>
  <minerva-slider
    aria-label="Daily goal (minutes)"
    value="5"
    max="120"
    step="5"
    invalid
    show-value
  ></minerva-slider>
</div>
`,solid:`// SliderDisabled.tsx

export default function SliderDisabled() {
  return (
    <div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
      <minerva-slider
        aria-label="Disabled"
        value="40"
        disabled
      ></minerva-slider>
      <minerva-slider
        aria-label="Read only"
        value="60"
        readonly
        show-value
      ></minerva-slider>
      <minerva-slider
        aria-label="Daily goal (minutes)"
        value="5"
        max="120"
        step="5"
        invalid
        show-value
      ></minerva-slider>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
  <minerva-slider aria-label="Disabled" value="40" disabled></minerva-slider>
  <minerva-slider
    aria-label="Read only"
    value="60"
    readonly
    show-value
  ></minerva-slider>
  <minerva-slider
    aria-label="Daily goal (minutes)"
    value="5"
    max="120"
    step="5"
    invalid
    show-value
  ></minerva-slider>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};