import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ProgressDeterminate.vue -->

<template>
  <div style="display: grid; gap: 16px">
    <minerva-progress
      variant="bar"
      full
      value="2"
      max="5"
      show-value
      label="Lessons completed"
    ></minerva-progress>
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
      <minerva-progress
        variant="circle"
        size="xlarge"
        value="40"
        show-value
        aria-label="Course progress"
      ></minerva-progress>
      <minerva-progress
        variant="bar"
        color="success"
        value="100"
        show-value
        aria-label="Done"
      ></minerva-progress>
      <minerva-progress
        variant="bar"
        color="danger"
        value="15"
        show-value
        aria-label="Overdue"
      ></minerva-progress>
    </div>
  </div>
</template>
`,angular:`// progress-determinate.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-progress-determinate",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 16px">
      <minerva-progress
        variant="bar"
        full
        value="2"
        max="5"
        show-value
        label="Lessons completed"
      ></minerva-progress>
      <div
        style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center"
      >
        <minerva-progress
          variant="circle"
          size="xlarge"
          value="40"
          show-value
          aria-label="Course progress"
        ></minerva-progress>
        <minerva-progress
          variant="bar"
          color="success"
          value="100"
          show-value
          aria-label="Done"
        ></minerva-progress>
        <minerva-progress
          variant="bar"
          color="danger"
          value="15"
          show-value
          aria-label="Overdue"
        ></minerva-progress>
      </div>
    </div>
  \`,
})
export class ProgressDeterminateComponent {}
`,svelte:`<!-- ProgressDeterminate.svelte -->

<div style="display: grid; gap: 16px">
  <minerva-progress
    variant="bar"
    full
    value="2"
    max="5"
    show-value
    label="Lessons completed"
  ></minerva-progress>
  <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
    <minerva-progress
      variant="circle"
      size="xlarge"
      value="40"
      show-value
      aria-label="Course progress"
    ></minerva-progress>
    <minerva-progress
      variant="bar"
      color="success"
      value="100"
      show-value
      aria-label="Done"
    ></minerva-progress>
    <minerva-progress
      variant="bar"
      color="danger"
      value="15"
      show-value
      aria-label="Overdue"
    ></minerva-progress>
  </div>
</div>
`,solid:`// ProgressDeterminate.tsx

export default function ProgressDeterminate() {
  return (
    <div style="display: grid; gap: 16px">
      <minerva-progress
        variant="bar"
        full
        value="2"
        max="5"
        show-value
        label="Lessons completed"
      ></minerva-progress>
      <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
        <minerva-progress
          variant="circle"
          size="xlarge"
          value="40"
          show-value
          aria-label="Course progress"
        ></minerva-progress>
        <minerva-progress
          variant="bar"
          color="success"
          value="100"
          show-value
          aria-label="Done"
        ></minerva-progress>
        <minerva-progress
          variant="bar"
          color="danger"
          value="15"
          show-value
          aria-label="Overdue"
        ></minerva-progress>
      </div>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 16px">
  <minerva-progress
    variant="bar"
    full
    value="2"
    max="5"
    show-value
    label="Lessons completed"
  ></minerva-progress>
  <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
    <minerva-progress
      variant="circle"
      size="xlarge"
      value="40"
      show-value
      aria-label="Course progress"
    ></minerva-progress>
    <minerva-progress
      variant="bar"
      color="success"
      value="100"
      show-value
      aria-label="Done"
    ></minerva-progress>
    <minerva-progress
      variant="bar"
      color="danger"
      value="15"
      show-value
      aria-label="Overdue"
    ></minerva-progress>
  </div>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};