import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- WeekStripBasic.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// value is a "YYYY-MM-DD" attribute; minerva-change reports the selected
// day. One tab stop: arrows, Home / End and PageUp / PageDown move the focus.

const pad = (n: number) => String(n).padStart(2, "0");
const key = (date: Date) =>
  \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;

const strip = ref<HTMLElement>();
const outputText = ref("Select a day.");

const outputValue = \`Selected: \${key(new Date())}\`;
const onChange = (e: Event) => {
  const { value } = (e as CustomEvent<{ value: string }>).detail;
  outputText.value = \`Selected: \${value}\`;
};

onMounted(() => {
  strip.value!.setAttribute("value", key(new Date()));
});
<\/script>

<template>
  <div style="display: grid; gap: 12px; max-width: 480px">
    <minerva-week-strip
      id="strip"
      aria-label="Study days"
      ref="strip"
      @minerva-change="onChange"
    ></minerva-week-strip>
    <output id="selected" :value.prop="outputValue">{{ outputText }}</output>
  </div>
</template>
`,angular:`// week-strip-basic.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";

// value is a "YYYY-MM-DD" attribute; minerva-change reports the selected
// day. One tab stop: arrows, Home / End and PageUp / PageDown move the focus.
const pad = (n: number) => String(n).padStart(2, "0");
const key = (date: Date) =>
  \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;

@Component({
  selector: "app-week-strip-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; max-width: 480px">
      <minerva-week-strip
        id="strip"
        aria-label="Study days"
        #strip
        (minerva-change)="onChange($event)"
      ></minerva-week-strip>
      <output id="selected" [value]="outputValue">{{ outputText }}</output>
    </div>
  \`,
})
export class WeekStripBasicComponent implements AfterViewInit {
  @ViewChild("strip") strip!: ElementRef<HTMLElement>;
  outputText = "Select a day.";

  outputValue = \`Selected: \${key(new Date())}\`;
  onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    this.outputText = \`Selected: \${value}\`;
  };

  ngAfterViewInit(): void {
    this.strip.nativeElement.setAttribute("value", key(new Date()));
  }
}
`,svelte:`<!-- WeekStripBasic.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // value is a "YYYY-MM-DD" attribute; minerva-change reports the selected
  // day. One tab stop: arrows, Home / End and PageUp / PageDown move the focus.

  const pad = (n: number) => String(n).padStart(2, "0");
  const key = (date: Date) =>
    \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;

  let strip: HTMLElement;
  let outputText = $state("Select a day.");

  const outputValue = \`Selected: \${key(new Date())}\`;
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    outputText = \`Selected: \${value}\`;
  };

  onMount(() => {
    strip.setAttribute("value", key(new Date()));
  });
<\/script>

<div style="display: grid; gap: 12px; max-width: 480px">
  <minerva-week-strip
    id="strip"
    aria-label="Study days"
    bind:this={strip}
    onminerva-change={onChange}
  ></minerva-week-strip>
  <output id="selected" value={outputValue}>{outputText}</output>
</div>
`,solid:`// WeekStripBasic.tsx

import { createSignal, onMount } from "solid-js";

// value is a "YYYY-MM-DD" attribute; minerva-change reports the selected
// day. One tab stop: arrows, Home / End and PageUp / PageDown move the focus.
const pad = (n: number) => String(n).padStart(2, "0");
const key = (date: Date) =>
  \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;

export default function WeekStripBasic() {
  let strip!: HTMLElement;
  const [outputText, setOutputText] = createSignal("Select a day.");

  const outputValue = \`Selected: \${key(new Date())}\`;
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    setOutputText(\`Selected: \${value}\`);
  };

  onMount(() => {
    strip.setAttribute("value", key(new Date()));
  });

  return (
    <div style="display: grid; gap: 12px; max-width: 480px">
      <minerva-week-strip
        id="strip"
        aria-label="Study days"
        ref={strip}
        on:minerva-change={onChange}
      ></minerva-week-strip>
      <output id="selected" prop:value={outputValue}>
        {outputText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; max-width: 480px">
  <minerva-week-strip id="strip" aria-label="Study days"></minerva-week-strip>
  <output id="selected">Select a day.</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // value is a "YYYY-MM-DD" attribute; minerva-change reports the selected
  // day. One tab stop: arrows, Home / End and PageUp / PageDown move the focus.
  // value is a "YYYY-MM-DD" attribute; minerva-change reports the selected
  // day. One tab stop: arrows, Home / End and PageUp / PageDown move the focus.
  const pad = (n) => String(n).padStart(2, "0");
  const key = (date) =>
    \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;

  const strip = document.querySelector("#strip");
  const output = document.querySelector("#selected");
  strip.setAttribute("value", key(new Date()));
  output.value = \`Selected: \${key(new Date())}\`;
  const onChange = (e) => {
    const { value } = e.detail;
    output.value = \`Selected: \${value}\`;
  };
  strip.addEventListener("minerva-change", onChange);
<\/script>
`}})))()}n();export{t as default};