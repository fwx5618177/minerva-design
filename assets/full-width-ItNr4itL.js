import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SegmentedControlFullWidth.vue -->

<template>
  <form id="billing-form" style="display: grid; gap: 12px; max-width: 420px">
    <minerva-segmented-control
      full-width
      name="billing"
      aria-label="Billing period"
      options='[{"value":"monthly","label":"Monthly"},{"value":"yearly","label":"Yearly (−20%)"}]'
      value="yearly"
    ></minerva-segmented-control>
    <minerva-segmented-control
      full-width
      aria-label="Status filter"
      options="all,open,closed,archived"
      value="all"
    ></minerva-segmented-control>
  </form>
</template>
`,angular:`// segmented-control-full-width.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-segmented-control-full-width",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <form id="billing-form" style="display: grid; gap: 12px; max-width: 420px">
      <minerva-segmented-control
        full-width
        name="billing"
        aria-label="Billing period"
        options='[{"value":"monthly","label":"Monthly"},{"value":"yearly","label":"Yearly (−20%)"}]'
        value="yearly"
      ></minerva-segmented-control>
      <minerva-segmented-control
        full-width
        aria-label="Status filter"
        options="all,open,closed,archived"
        value="all"
      ></minerva-segmented-control>
    </form>
  \`,
})
export class SegmentedControlFullWidthComponent {}
`,svelte:`<!-- SegmentedControlFullWidth.svelte -->

<form id="billing-form" style="display: grid; gap: 12px; max-width: 420px">
  <minerva-segmented-control
    full-width
    name="billing"
    aria-label="Billing period"
    options={"[{\\"value\\":\\"monthly\\",\\"label\\":\\"Monthly\\"},{\\"value\\":\\"yearly\\",\\"label\\":\\"Yearly (−20%)\\"}]"}
    value="yearly"
  ></minerva-segmented-control>
  <minerva-segmented-control
    full-width
    aria-label="Status filter"
    options="all,open,closed,archived"
    value="all"
  ></minerva-segmented-control>
</form>
`,solid:`// SegmentedControlFullWidth.tsx

export default function SegmentedControlFullWidth() {
  return (
    <form id="billing-form" style="display: grid; gap: 12px; max-width: 420px">
      <minerva-segmented-control
        full-width
        name="billing"
        aria-label="Billing period"
        options='[{"value":"monthly","label":"Monthly"},{"value":"yearly","label":"Yearly (−20%)"}]'
        value="yearly"
      ></minerva-segmented-control>
      <minerva-segmented-control
        full-width
        aria-label="Status filter"
        options="all,open,closed,archived"
        value="all"
      ></minerva-segmented-control>
    </form>
  );
}
`,html:`<form id="billing-form" style="display: grid; gap: 12px; max-width: 420px">
  <minerva-segmented-control
    full-width
    name="billing"
    aria-label="Billing period"
    options='[{"value":"monthly","label":"Monthly"},{"value":"yearly","label":"Yearly (−20%)"}]'
    value="yearly"
  ></minerva-segmented-control>
  <minerva-segmented-control
    full-width
    aria-label="Status filter"
    options="all,open,closed,archived"
    value="all"
  ></minerva-segmented-control>
</form>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};