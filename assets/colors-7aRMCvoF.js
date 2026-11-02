import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SegmentedControlColors.vue -->

<template>
  <div style="display: grid; gap: 16px; justify-items: start">
    <minerva-segmented-control
      aria-label="Theme (neutral)"
      options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"system","label":"System","disabled":true}]'
      value="light"
    ></minerva-segmented-control>
    <minerva-segmented-control
      color="primary"
      aria-label="Theme (primary)"
      options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"system","label":"System","disabled":true}]'
      value="dark"
    ></minerva-segmented-control>
    <minerva-segmented-control
      disabled
      aria-label="Theme (disabled)"
      options="light,dark,system"
      value="light"
    ></minerva-segmented-control>
  </div>
</template>
`,angular:`// segmented-control-colors.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-segmented-control-colors",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 16px; justify-items: start">
      <minerva-segmented-control
        aria-label="Theme (neutral)"
        options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"system","label":"System","disabled":true}]'
        value="light"
      ></minerva-segmented-control>
      <minerva-segmented-control
        color="primary"
        aria-label="Theme (primary)"
        options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"system","label":"System","disabled":true}]'
        value="dark"
      ></minerva-segmented-control>
      <minerva-segmented-control
        disabled
        aria-label="Theme (disabled)"
        options="light,dark,system"
        value="light"
      ></minerva-segmented-control>
    </div>
  \`,
})
export class SegmentedControlColorsComponent {}
`,svelte:`<!-- SegmentedControlColors.svelte -->

<div style="display: grid; gap: 16px; justify-items: start">
  <minerva-segmented-control
    aria-label="Theme (neutral)"
    options={"[{\\"value\\":\\"light\\",\\"label\\":\\"Light\\"},{\\"value\\":\\"dark\\",\\"label\\":\\"Dark\\"},{\\"value\\":\\"system\\",\\"label\\":\\"System\\",\\"disabled\\":true}]"}
    value="light"
  ></minerva-segmented-control>
  <minerva-segmented-control
    color="primary"
    aria-label="Theme (primary)"
    options={"[{\\"value\\":\\"light\\",\\"label\\":\\"Light\\"},{\\"value\\":\\"dark\\",\\"label\\":\\"Dark\\"},{\\"value\\":\\"system\\",\\"label\\":\\"System\\",\\"disabled\\":true}]"}
    value="dark"
  ></minerva-segmented-control>
  <minerva-segmented-control
    disabled
    aria-label="Theme (disabled)"
    options="light,dark,system"
    value="light"
  ></minerva-segmented-control>
</div>
`,solid:`// SegmentedControlColors.tsx

export default function SegmentedControlColors() {
  return (
    <div style="display: grid; gap: 16px; justify-items: start">
      <minerva-segmented-control
        aria-label="Theme (neutral)"
        options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"system","label":"System","disabled":true}]'
        value="light"
      ></minerva-segmented-control>
      <minerva-segmented-control
        color="primary"
        aria-label="Theme (primary)"
        options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"system","label":"System","disabled":true}]'
        value="dark"
      ></minerva-segmented-control>
      <minerva-segmented-control
        disabled
        aria-label="Theme (disabled)"
        options="light,dark,system"
        value="light"
      ></minerva-segmented-control>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 16px; justify-items: start">
  <minerva-segmented-control
    aria-label="Theme (neutral)"
    options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"system","label":"System","disabled":true}]'
    value="light"
  ></minerva-segmented-control>
  <minerva-segmented-control
    color="primary"
    aria-label="Theme (primary)"
    options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"system","label":"System","disabled":true}]'
    value="dark"
  ></minerva-segmented-control>
  <minerva-segmented-control
    disabled
    aria-label="Theme (disabled)"
    options="light,dark,system"
    value="light"
  ></minerva-segmented-control>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};