import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SegmentedControlSizes.vue -->

<template>
  <div style="display: grid; gap: 16px; justify-items: start">
    <minerva-segmented-control
      size="small"
      aria-label="Small"
      options="Daily,Weekly,Monthly"
      value="Daily"
    ></minerva-segmented-control>
    <minerva-segmented-control
      aria-label="Medium"
      options="Daily,Weekly,Monthly"
      value="Weekly"
    ></minerva-segmented-control>
    <minerva-segmented-control
      size="large"
      aria-label="Large"
      options="Daily,Weekly,Monthly"
      value="Monthly"
    ></minerva-segmented-control>
  </div>
</template>
`,angular:`// segmented-control-sizes.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-segmented-control-sizes",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 16px; justify-items: start">
      <minerva-segmented-control
        size="small"
        aria-label="Small"
        options="Daily,Weekly,Monthly"
        value="Daily"
      ></minerva-segmented-control>
      <minerva-segmented-control
        aria-label="Medium"
        options="Daily,Weekly,Monthly"
        value="Weekly"
      ></minerva-segmented-control>
      <minerva-segmented-control
        size="large"
        aria-label="Large"
        options="Daily,Weekly,Monthly"
        value="Monthly"
      ></minerva-segmented-control>
    </div>
  \`,
})
export class SegmentedControlSizesComponent {}
`,svelte:`<!-- SegmentedControlSizes.svelte -->

<div style="display: grid; gap: 16px; justify-items: start">
  <minerva-segmented-control
    size="small"
    aria-label="Small"
    options="Daily,Weekly,Monthly"
    value="Daily"
  ></minerva-segmented-control>
  <minerva-segmented-control
    aria-label="Medium"
    options="Daily,Weekly,Monthly"
    value="Weekly"
  ></minerva-segmented-control>
  <minerva-segmented-control
    size="large"
    aria-label="Large"
    options="Daily,Weekly,Monthly"
    value="Monthly"
  ></minerva-segmented-control>
</div>
`,solid:`// SegmentedControlSizes.tsx

export default function SegmentedControlSizes() {
  return (
    <div style="display: grid; gap: 16px; justify-items: start">
      <minerva-segmented-control
        size="small"
        aria-label="Small"
        options="Daily,Weekly,Monthly"
        value="Daily"
      ></minerva-segmented-control>
      <minerva-segmented-control
        aria-label="Medium"
        options="Daily,Weekly,Monthly"
        value="Weekly"
      ></minerva-segmented-control>
      <minerva-segmented-control
        size="large"
        aria-label="Large"
        options="Daily,Weekly,Monthly"
        value="Monthly"
      ></minerva-segmented-control>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 16px; justify-items: start">
  <minerva-segmented-control
    size="small"
    aria-label="Small"
    options="Daily,Weekly,Monthly"
    value="Daily"
  ></minerva-segmented-control>
  <minerva-segmented-control
    aria-label="Medium"
    options="Daily,Weekly,Monthly"
    value="Weekly"
  ></minerva-segmented-control>
  <minerva-segmented-control
    size="large"
    aria-label="Large"
    options="Daily,Weekly,Monthly"
    value="Monthly"
  ></minerva-segmented-control>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};