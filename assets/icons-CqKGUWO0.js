import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SegmentedControlIcons.vue -->

<template>
  <div style="display: grid; gap: 16px; justify-items: start">
    <minerva-segmented-control
      aria-label="Layout"
      options='[{"value":"list","label":"List","icon":"☰"},{"value":"grid","label":"Grid","icon":"▦"},{"value":"map","label":"Map","icon":"⌖"}]'
      value="list"
    ></minerva-segmented-control>
    <minerva-segmented-control
      aria-label="Layout (compact)"
      options='[{"value":"list","icon":"☰","aria-label":"List"},{"value":"grid","icon":"▦","aria-label":"Grid"},{"value":"map","icon":"⌖","aria-label":"Map"}]'
      value="grid"
    ></minerva-segmented-control>
  </div>
</template>
`,angular:`// segmented-control-icons.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-segmented-control-icons",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 16px; justify-items: start">
      <minerva-segmented-control
        aria-label="Layout"
        options='[{"value":"list","label":"List","icon":"☰"},{"value":"grid","label":"Grid","icon":"▦"},{"value":"map","label":"Map","icon":"⌖"}]'
        value="list"
      ></minerva-segmented-control>
      <minerva-segmented-control
        aria-label="Layout (compact)"
        options='[{"value":"list","icon":"☰","aria-label":"List"},{"value":"grid","icon":"▦","aria-label":"Grid"},{"value":"map","icon":"⌖","aria-label":"Map"}]'
        value="grid"
      ></minerva-segmented-control>
    </div>
  \`,
})
export class SegmentedControlIconsComponent {}
`,svelte:`<!-- SegmentedControlIcons.svelte -->

<div style="display: grid; gap: 16px; justify-items: start">
  <minerva-segmented-control
    aria-label="Layout"
    options={"[{\\"value\\":\\"list\\",\\"label\\":\\"List\\",\\"icon\\":\\"☰\\"},{\\"value\\":\\"grid\\",\\"label\\":\\"Grid\\",\\"icon\\":\\"▦\\"},{\\"value\\":\\"map\\",\\"label\\":\\"Map\\",\\"icon\\":\\"⌖\\"}]"}
    value="list"
  ></minerva-segmented-control>
  <minerva-segmented-control
    aria-label="Layout (compact)"
    options={"[{\\"value\\":\\"list\\",\\"icon\\":\\"☰\\",\\"aria-label\\":\\"List\\"},{\\"value\\":\\"grid\\",\\"icon\\":\\"▦\\",\\"aria-label\\":\\"Grid\\"},{\\"value\\":\\"map\\",\\"icon\\":\\"⌖\\",\\"aria-label\\":\\"Map\\"}]"}
    value="grid"
  ></minerva-segmented-control>
</div>
`,solid:`// SegmentedControlIcons.tsx

export default function SegmentedControlIcons() {
  return (
    <div style="display: grid; gap: 16px; justify-items: start">
      <minerva-segmented-control
        aria-label="Layout"
        options='[{"value":"list","label":"List","icon":"☰"},{"value":"grid","label":"Grid","icon":"▦"},{"value":"map","label":"Map","icon":"⌖"}]'
        value="list"
      ></minerva-segmented-control>
      <minerva-segmented-control
        aria-label="Layout (compact)"
        options='[{"value":"list","icon":"☰","aria-label":"List"},{"value":"grid","icon":"▦","aria-label":"Grid"},{"value":"map","icon":"⌖","aria-label":"Map"}]'
        value="grid"
      ></minerva-segmented-control>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 16px; justify-items: start">
  <minerva-segmented-control
    aria-label="Layout"
    options='[{"value":"list","label":"List","icon":"☰"},{"value":"grid","label":"Grid","icon":"▦"},{"value":"map","label":"Map","icon":"⌖"}]'
    value="list"
  ></minerva-segmented-control>
  <minerva-segmented-control
    aria-label="Layout (compact)"
    options='[{"value":"list","icon":"☰","aria-label":"List"},{"value":"grid","icon":"▦","aria-label":"Grid"},{"value":"map","icon":"⌖","aria-label":"Map"}]'
    value="grid"
  ></minerva-segmented-control>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};