import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- WeekStripSizes.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// size="small" turns the count badges into dots (also the :state(size-small)
// ... custom states); disabled blocks selection and navigation.

type WeekStripElement = HTMLElement & { markers?: Record<string, number> };

const root = ref<HTMLElement>();

const date = new Date();
const pad = (n: number) => String(n).padStart(2, "0");
const today = \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;

onMounted(() => {
  for (const strip of root.value!.querySelectorAll<WeekStripElement>(
    "minerva-week-strip",
  )) {
    strip.markers = { [today]: 4 };
  }
});
<\/script>

<template>
  <div ref="root">
    <div style="display: grid; gap: 24px; max-width: 480px">
      <minerva-week-strip
        size="small"
        aria-label="Small week"
      ></minerva-week-strip>
      <minerva-week-strip aria-label="Medium week"></minerva-week-strip>
      <minerva-week-strip
        size="large"
        aria-label="Large week"
      ></minerva-week-strip>
      <minerva-week-strip
        disabled
        aria-label="Disabled week"
      ></minerva-week-strip>
    </div>
  </div>
</template>
`,angular:`// week-strip-sizes.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";

// size="small" turns the count badges into dots (also the :state(size-small)
// ... custom states); disabled blocks selection and navigation.
type WeekStripElement = HTMLElement & { markers?: Record<string, number> };

@Component({
  selector: "app-week-strip-sizes",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div #root>
      <div style="display: grid; gap: 24px; max-width: 480px">
        <minerva-week-strip
          size="small"
          aria-label="Small week"
        ></minerva-week-strip>
        <minerva-week-strip aria-label="Medium week"></minerva-week-strip>
        <minerva-week-strip
          size="large"
          aria-label="Large week"
        ></minerva-week-strip>
        <minerva-week-strip
          disabled
          aria-label="Disabled week"
        ></minerva-week-strip>
      </div>
    </div>
  \`,
})
export class WeekStripSizesComponent implements AfterViewInit {
  @ViewChild("root") root!: ElementRef<HTMLElement>;

  date = new Date();
  pad = (n: number) => String(n).padStart(2, "0");
  today = \`\${this.date.getFullYear()}-\${this.pad(this.date.getMonth() + 1)}-\${this.pad(this.date.getDate())}\`;

  ngAfterViewInit(): void {
    for (const strip of this.root.nativeElement.querySelectorAll<WeekStripElement>(
      "minerva-week-strip",
    )) {
      strip.markers = { [this.today]: 4 };
    }
  }
}
`,svelte:`<!-- WeekStripSizes.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // size="small" turns the count badges into dots (also the :state(size-small)
  // ... custom states); disabled blocks selection and navigation.

  type WeekStripElement = HTMLElement & { markers?: Record<string, number> };

  let root: HTMLElement;

  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const today = \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;

  onMount(() => {
    for (const strip of root.querySelectorAll<WeekStripElement>(
      "minerva-week-strip",
    )) {
      strip.markers = { [today]: 4 };
    }
  });
<\/script>

<div
  bind:this={root}
>
  <div style="display: grid; gap: 24px; max-width: 480px">
    <minerva-week-strip size="small" aria-label="Small week"></minerva-week-strip>
    <minerva-week-strip aria-label="Medium week"></minerva-week-strip>
    <minerva-week-strip size="large" aria-label="Large week"></minerva-week-strip>
    <minerva-week-strip disabled aria-label="Disabled week"></minerva-week-strip>
  </div>
</div>
`,solid:`// WeekStripSizes.tsx

import { onMount } from "solid-js";

// size="small" turns the count badges into dots (also the :state(size-small)
// ... custom states); disabled blocks selection and navigation.
type WeekStripElement = HTMLElement & { markers?: Record<string, number> };

export default function WeekStripSizes() {
  let root!: HTMLElement;

  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const today = \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;

  onMount(() => {
    for (const strip of root.querySelectorAll<WeekStripElement>(
      "minerva-week-strip",
    )) {
      strip.markers = { [today]: 4 };
    }
  });

  return (
    <div ref={root}>
      <div style="display: grid; gap: 24px; max-width: 480px">
        <minerva-week-strip
          size="small"
          aria-label="Small week"
        ></minerva-week-strip>
        <minerva-week-strip aria-label="Medium week"></minerva-week-strip>
        <minerva-week-strip
          size="large"
          aria-label="Large week"
        ></minerva-week-strip>
        <minerva-week-strip
          disabled
          aria-label="Disabled week"
        ></minerva-week-strip>
      </div>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 24px; max-width: 480px">
  <minerva-week-strip size="small" aria-label="Small week"></minerva-week-strip>
  <minerva-week-strip aria-label="Medium week"></minerva-week-strip>
  <minerva-week-strip size="large" aria-label="Large week"></minerva-week-strip>
  <minerva-week-strip disabled aria-label="Disabled week"></minerva-week-strip>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // size="small" turns the count badges into dots (also the :state(size-small)
  // ... custom states); disabled blocks selection and navigation.
  const date = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const today = \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
  for (const strip of document.querySelectorAll("minerva-week-strip")) {
    strip.markers = { [today]: 4 };
  }
<\/script>
`}})))()}n();export{t as default};