import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- WeekStripNavigation.vue -->

<script setup lang="ts">
import { ref } from "vue";

// show-navigation adds previous / next week buttons; minerva-week-change
// reports the first day of the displayed week (also on keyboard moves into
// the neighbouring weeks), minerva-change the selected day.

const logText = ref("Change week or select a day.");

const onWeek = (e: Event) => {
  const { week } = (e as CustomEvent<{ week: Date }>).detail;
  logText.value = \`Week of \${week.toLocaleDateString()}\`;
};
const onChange = (e: Event) => {
  const { value } = (e as CustomEvent<{ value: string }>).detail;
  logText.value = \`Selected \${value}\`;
};
<\/script>

<template>
  <div style="display: grid; gap: 12px; max-width: 480px">
    <minerva-week-strip
      id="strip"
      show-navigation
      @minerva-week-change="onWeek"
      @minerva-change="onChange"
    ></minerva-week-strip>
    <output id="log">{{ logText }}</output>
  </div>
</template>
`,angular:`// week-strip-navigation.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// show-navigation adds previous / next week buttons; minerva-week-change
// reports the first day of the displayed week (also on keyboard moves into
// the neighbouring weeks), minerva-change the selected day.

@Component({
  selector: "app-week-strip-navigation",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; max-width: 480px">
      <minerva-week-strip
        id="strip"
        show-navigation
        (minerva-week-change)="onWeek($event)"
        (minerva-change)="onChange($event)"
      ></minerva-week-strip>
      <output id="log">{{ logText }}</output>
    </div>
  \`,
})
export class WeekStripNavigationComponent {
  logText = "Change week or select a day.";

  onWeek = (e: Event) => {
    const { week } = (e as CustomEvent<{ week: Date }>).detail;
    this.logText = \`Week of \${week.toLocaleDateString()}\`;
  };
  onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    this.logText = \`Selected \${value}\`;
  };
}
`,svelte:`<!-- WeekStripNavigation.svelte -->

<script lang="ts">
  // show-navigation adds previous / next week buttons; minerva-week-change
  // reports the first day of the displayed week (also on keyboard moves into
  // the neighbouring weeks), minerva-change the selected day.

  let logText = $state("Change week or select a day.");

  const onWeek = (e: Event) => {
    const { week } = (e as CustomEvent<{ week: Date }>).detail;
    logText = \`Week of \${week.toLocaleDateString()}\`;
  };
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    logText = \`Selected \${value}\`;
  };
<\/script>

<div style="display: grid; gap: 12px; max-width: 480px">
  <minerva-week-strip
    id="strip"
    show-navigation
    onminerva-week-change={onWeek}
    onminerva-change={onChange}
  ></minerva-week-strip>
  <output id="log">{logText}</output>
</div>
`,solid:`// WeekStripNavigation.tsx

import { createSignal } from "solid-js";

// show-navigation adds previous / next week buttons; minerva-week-change
// reports the first day of the displayed week (also on keyboard moves into
// the neighbouring weeks), minerva-change the selected day.

export default function WeekStripNavigation() {
  const [logText, setLogText] = createSignal("Change week or select a day.");

  const onWeek = (e: Event) => {
    const { week } = (e as CustomEvent<{ week: Date }>).detail;
    setLogText(\`Week of \${week.toLocaleDateString()}\`);
  };
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    setLogText(\`Selected \${value}\`);
  };

  return (
    <div style="display: grid; gap: 12px; max-width: 480px">
      <minerva-week-strip
        id="strip"
        show-navigation
        on:minerva-week-change={onWeek}
        on:minerva-change={onChange}
      ></minerva-week-strip>
      <output id="log">{logText()}</output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; max-width: 480px">
  <minerva-week-strip id="strip" show-navigation></minerva-week-strip>
  <output id="log">Change week or select a day.</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // show-navigation adds previous / next week buttons; minerva-week-change
  // reports the first day of the displayed week (also on keyboard moves into
  // the neighbouring weeks), minerva-change the selected day.
  const strip = document.querySelector("#strip");
  const log = document.querySelector("#log");
  const onWeek = (e) => {
    const { week } = e.detail;
    log.value = \`Week of \${week.toLocaleDateString()}\`;
  };
  const onChange = (e) => {
    const { value } = e.detail;
    log.value = \`Selected \${value}\`;
  };
  strip.addEventListener("minerva-week-change", onWeek);
  strip.addEventListener("minerva-change", onChange);
<\/script>
`}})))()}n();export{t as default};