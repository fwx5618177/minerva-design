import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SliderSizesColors.vue -->

<template>
  <div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
    <minerva-slider aria-label="Small" size="small" value="30"></minerva-slider>
    <minerva-slider aria-label="Medium" value="50"></minerva-slider>
    <minerva-slider aria-label="Large" size="large" value="70"></minerva-slider>
    <minerva-slider aria-label="primary" value="20"></minerva-slider>
    <minerva-slider
      aria-label="success"
      color="success"
      value="35"
    ></minerva-slider>
    <minerva-slider aria-label="info" color="info" value="50"></minerva-slider>
    <minerva-slider
      aria-label="warning"
      color="warning"
      value="65"
    ></minerva-slider>
    <minerva-slider
      aria-label="danger"
      color="danger"
      value="80"
    ></minerva-slider>
  </div>
</template>
`,angular:`// slider-sizes-colors.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-slider-sizes-colors",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
      <minerva-slider
        aria-label="Small"
        size="small"
        value="30"
      ></minerva-slider>
      <minerva-slider aria-label="Medium" value="50"></minerva-slider>
      <minerva-slider
        aria-label="Large"
        size="large"
        value="70"
      ></minerva-slider>
      <minerva-slider aria-label="primary" value="20"></minerva-slider>
      <minerva-slider
        aria-label="success"
        color="success"
        value="35"
      ></minerva-slider>
      <minerva-slider
        aria-label="info"
        color="info"
        value="50"
      ></minerva-slider>
      <minerva-slider
        aria-label="warning"
        color="warning"
        value="65"
      ></minerva-slider>
      <minerva-slider
        aria-label="danger"
        color="danger"
        value="80"
      ></minerva-slider>
    </div>
  \`,
})
export class SliderSizesColorsComponent {}
`,svelte:`<!-- SliderSizesColors.svelte -->

<div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
  <minerva-slider aria-label="Small" size="small" value="30"></minerva-slider>
  <minerva-slider aria-label="Medium" value="50"></minerva-slider>
  <minerva-slider aria-label="Large" size="large" value="70"></minerva-slider>
  <minerva-slider aria-label="primary" value="20"></minerva-slider>
  <minerva-slider
    aria-label="success"
    color="success"
    value="35"
  ></minerva-slider>
  <minerva-slider aria-label="info" color="info" value="50"></minerva-slider>
  <minerva-slider
    aria-label="warning"
    color="warning"
    value="65"
  ></minerva-slider>
  <minerva-slider
    aria-label="danger"
    color="danger"
    value="80"
  ></minerva-slider>
</div>
`,solid:`// SliderSizesColors.tsx

export default function SliderSizesColors() {
  return (
    <div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
      <minerva-slider
        aria-label="Small"
        size="small"
        value="30"
      ></minerva-slider>
      <minerva-slider aria-label="Medium" value="50"></minerva-slider>
      <minerva-slider
        aria-label="Large"
        size="large"
        value="70"
      ></minerva-slider>
      <minerva-slider aria-label="primary" value="20"></minerva-slider>
      <minerva-slider
        aria-label="success"
        color="success"
        value="35"
      ></minerva-slider>
      <minerva-slider
        aria-label="info"
        color="info"
        value="50"
      ></minerva-slider>
      <minerva-slider
        aria-label="warning"
        color="warning"
        value="65"
      ></minerva-slider>
      <minerva-slider
        aria-label="danger"
        color="danger"
        value="80"
      ></minerva-slider>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
  <minerva-slider aria-label="Small" size="small" value="30"></minerva-slider>
  <minerva-slider aria-label="Medium" value="50"></minerva-slider>
  <minerva-slider aria-label="Large" size="large" value="70"></minerva-slider>
  <minerva-slider aria-label="primary" value="20"></minerva-slider>
  <minerva-slider
    aria-label="success"
    color="success"
    value="35"
  ></minerva-slider>
  <minerva-slider aria-label="info" color="info" value="50"></minerva-slider>
  <minerva-slider
    aria-label="warning"
    color="warning"
    value="65"
  ></minerva-slider>
  <minerva-slider
    aria-label="danger"
    color="danger"
    value="80"
  ></minerva-slider>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};