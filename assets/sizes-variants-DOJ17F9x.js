import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- InputSizesVariants.vue -->

<template>
  <div style="display: grid; gap: 12px; max-width: 360px">
    <minerva-input
      size="small"
      aria-label="Small"
      placeholder="Small"
    ></minerva-input>
    <minerva-input
      size="medium"
      aria-label="Medium"
      placeholder="Medium (outline)"
    ></minerva-input>
    <minerva-input
      size="large"
      aria-label="Large"
      placeholder="Large"
    ></minerva-input>
    <minerva-input
      variant="filled"
      aria-label="Filled"
      placeholder="Filled"
    ></minerva-input>
    <minerva-input
      variant="unstyled"
      aria-label="Unstyled"
      placeholder="Unstyled"
    ></minerva-input>
    <minerva-input
      readonly
      value="Read-only value"
      aria-label="Read-only"
    ></minerva-input>
    <minerva-input
      disabled
      value="Disabled"
      aria-label="Disabled"
    ></minerva-input>
    <minerva-input invalid value="Invalid value" aria-label="Invalid"
      ><span slot="prefix">@</span><span slot="suffix">!</span></minerva-input
    >
  </div>
</template>
`,angular:`// input-sizes-variants.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-input-sizes-variants",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; max-width: 360px">
      <minerva-input
        size="small"
        aria-label="Small"
        placeholder="Small"
      ></minerva-input>
      <minerva-input
        size="medium"
        aria-label="Medium"
        placeholder="Medium (outline)"
      ></minerva-input>
      <minerva-input
        size="large"
        aria-label="Large"
        placeholder="Large"
      ></minerva-input>
      <minerva-input
        variant="filled"
        aria-label="Filled"
        placeholder="Filled"
      ></minerva-input>
      <minerva-input
        variant="unstyled"
        aria-label="Unstyled"
        placeholder="Unstyled"
      ></minerva-input>
      <minerva-input
        readonly
        value="Read-only value"
        aria-label="Read-only"
      ></minerva-input>
      <minerva-input
        disabled
        value="Disabled"
        aria-label="Disabled"
      ></minerva-input>
      <minerva-input invalid value="Invalid value" aria-label="Invalid"
        ><span slot="prefix">&#64;</span
        ><span slot="suffix">!</span></minerva-input
      >
    </div>
  \`,
})
export class InputSizesVariantsComponent {}
`,svelte:`<!-- InputSizesVariants.svelte -->

<div style="display: grid; gap: 12px; max-width: 360px">
  <minerva-input
    size="small"
    aria-label="Small"
    placeholder="Small"
  ></minerva-input>
  <minerva-input
    size="medium"
    aria-label="Medium"
    placeholder="Medium (outline)"
  ></minerva-input>
  <minerva-input
    size="large"
    aria-label="Large"
    placeholder="Large"
  ></minerva-input>
  <minerva-input
    variant="filled"
    aria-label="Filled"
    placeholder="Filled"
  ></minerva-input>
  <minerva-input
    variant="unstyled"
    aria-label="Unstyled"
    placeholder="Unstyled"
  ></minerva-input>
  <minerva-input
    readonly
    value="Read-only value"
    aria-label="Read-only"
  ></minerva-input>
  <minerva-input
    disabled
    value="Disabled"
    aria-label="Disabled"
  ></minerva-input>
  <minerva-input invalid value="Invalid value" aria-label="Invalid"
    ><span slot="prefix">@</span><span slot="suffix">!</span></minerva-input>
</div>
`,solid:`// InputSizesVariants.tsx

export default function InputSizesVariants() {
  return (
    <div style="display: grid; gap: 12px; max-width: 360px">
      <minerva-input
        size="small"
        aria-label="Small"
        placeholder="Small"
      ></minerva-input>
      <minerva-input
        size="medium"
        aria-label="Medium"
        placeholder="Medium (outline)"
      ></minerva-input>
      <minerva-input
        size="large"
        aria-label="Large"
        placeholder="Large"
      ></minerva-input>
      <minerva-input
        variant="filled"
        aria-label="Filled"
        placeholder="Filled"
      ></minerva-input>
      <minerva-input
        variant="unstyled"
        aria-label="Unstyled"
        placeholder="Unstyled"
      ></minerva-input>
      <minerva-input
        readonly
        value="Read-only value"
        aria-label="Read-only"
      ></minerva-input>
      <minerva-input
        disabled
        value="Disabled"
        aria-label="Disabled"
      ></minerva-input>
      <minerva-input invalid value="Invalid value" aria-label="Invalid">
        <span slot="prefix">@</span>
        <span slot="suffix">!</span>
      </minerva-input>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; max-width: 360px">
  <minerva-input
    size="small"
    aria-label="Small"
    placeholder="Small"
  ></minerva-input>
  <minerva-input
    size="medium"
    aria-label="Medium"
    placeholder="Medium (outline)"
  ></minerva-input>
  <minerva-input
    size="large"
    aria-label="Large"
    placeholder="Large"
  ></minerva-input>
  <minerva-input
    variant="filled"
    aria-label="Filled"
    placeholder="Filled"
  ></minerva-input>
  <minerva-input
    variant="unstyled"
    aria-label="Unstyled"
    placeholder="Unstyled"
  ></minerva-input>
  <minerva-input
    readonly
    value="Read-only value"
    aria-label="Read-only"
  ></minerva-input>
  <minerva-input
    disabled
    value="Disabled"
    aria-label="Disabled"
  ></minerva-input>
  <minerva-input invalid value="Invalid value" aria-label="Invalid"
    ><span slot="prefix">@</span><span slot="suffix">!</span></minerva-input
  >
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};