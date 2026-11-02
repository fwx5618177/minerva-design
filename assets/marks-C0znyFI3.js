import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SliderMarks.vue -->

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

// marks: an empty attribute draws a tick per step, a JSON array labelled
// marks; step="null" snaps to the marks only.

import type { MinervaSlider } from "minerva-design/web-components/slider";

const labels: Record<number, string> = {
  0: "Off",
  25: "Low",
  50: "Medium",
  75: "High",
  100: "Max",
};

const fan = ref<MinervaSlider>();

const fanGetAriaValueText = (v) => labels[v] ?? String(v);

onBeforeUnmount(() => {
  fan.value!.getAriaValueText = undefined;
});
<\/script>

<template>
  <div style="display: grid; gap: 32px; width: 100%; max-width: 420px">
    <minerva-slider
      aria-label="Rating"
      value="6"
      max="10"
      marks
      show-value
    ></minerva-slider>
    <minerva-slider
      id="fan"
      aria-label="Fan speed"
      value="50"
      step="null"
      marks='[{"value":0,"label":"Off"},{"value":25,"label":"Low"},{"value":50,"label":"Medium"},{"value":75,"label":"High"},{"value":100,"label":"Max"}]'
      ref="fan"
      :getAriaValueText.prop="fanGetAriaValueText"
    ></minerva-slider>
  </div>
</template>
`,angular:`// slider-marks.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type OnDestroy,
} from "@angular/core";

// marks: an empty attribute draws a tick per step, a JSON array labelled
// marks; step="null" snaps to the marks only.
import type { MinervaSlider } from "minerva-design/web-components/slider";

const labels: Record<number, string> = {
  0: "Off",
  25: "Low",
  50: "Medium",
  75: "High",
  100: "Max",
};

@Component({
  selector: "app-slider-marks",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 32px; width: 100%; max-width: 420px">
      <minerva-slider
        aria-label="Rating"
        value="6"
        max="10"
        marks
        show-value
      ></minerva-slider>
      <minerva-slider
        id="fan"
        aria-label="Fan speed"
        value="50"
        step="null"
        marks='[{"value":0,"label":"Off"},{"value":25,"label":"Low"},{"value":50,"label":"Medium"},{"value":75,"label":"High"},{"value":100,"label":"Max"}]'
        #fan
        [getAriaValueText]="fanGetAriaValueText"
      ></minerva-slider>
    </div>
  \`,
})
export class SliderMarksComponent implements OnDestroy {
  @ViewChild("fan") fan!: ElementRef<MinervaSlider>;

  fanGetAriaValueText = (v) => labels[v] ?? String(v);

  ngOnDestroy(): void {
    this.fan.nativeElement.getAriaValueText = undefined;
  }
}
`,svelte:`<!-- SliderMarks.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // marks: an empty attribute draws a tick per step, a JSON array labelled
  // marks; step="null" snaps to the marks only.

  import type { MinervaSlider } from "minerva-design/web-components/slider";

  const labels: Record<number, string> = {
    0: "Off",
    25: "Low",
    50: "Medium",
    75: "High",
    100: "Max",
  };

  let fan: MinervaSlider;

  const fanGetAriaValueText = (v) => labels[v] ?? String(v);

  onMount(() => {
    return () => {
      fan.getAriaValueText = undefined;
    };
  });
<\/script>

<div style="display: grid; gap: 32px; width: 100%; max-width: 420px">
  <minerva-slider
    aria-label="Rating"
    value="6"
    max="10"
    marks
    show-value
  ></minerva-slider>
  <minerva-slider
    id="fan"
    aria-label="Fan speed"
    value="50"
    step="null"
    marks={"[{\\"value\\":0,\\"label\\":\\"Off\\"},{\\"value\\":25,\\"label\\":\\"Low\\"},{\\"value\\":50,\\"label\\":\\"Medium\\"},{\\"value\\":75,\\"label\\":\\"High\\"},{\\"value\\":100,\\"label\\":\\"Max\\"}]"}
    bind:this={fan}
    getAriaValueText={fanGetAriaValueText}
  ></minerva-slider>
</div>
`,solid:`// SliderMarks.tsx

import { onCleanup } from "solid-js";

// marks: an empty attribute draws a tick per step, a JSON array labelled
// marks; step="null" snaps to the marks only.
import type { MinervaSlider } from "minerva-design/web-components/slider";

const labels: Record<number, string> = {
  0: "Off",
  25: "Low",
  50: "Medium",
  75: "High",
  100: "Max",
};

export default function SliderMarks() {
  let fan!: MinervaSlider;

  const fanGetAriaValueText = (v) => labels[v] ?? String(v);

  onCleanup(() => {
    fan.getAriaValueText = undefined;
  });

  return (
    <div style="display: grid; gap: 32px; width: 100%; max-width: 420px">
      <minerva-slider
        aria-label="Rating"
        value="6"
        max="10"
        marks
        show-value
      ></minerva-slider>
      <minerva-slider
        id="fan"
        aria-label="Fan speed"
        value="50"
        step="null"
        marks='[{"value":0,"label":"Off"},{"value":25,"label":"Low"},{"value":50,"label":"Medium"},{"value":75,"label":"High"},{"value":100,"label":"Max"}]'
        ref={fan}
        prop:getAriaValueText={fanGetAriaValueText}
      ></minerva-slider>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 32px; width: 100%; max-width: 420px">
  <minerva-slider
    aria-label="Rating"
    value="6"
    max="10"
    marks
    show-value
  ></minerva-slider>
  <minerva-slider
    id="fan"
    aria-label="Fan speed"
    value="50"
    step="null"
    marks='[{"value":0,"label":"Off"},{"value":25,"label":"Low"},{"value":50,"label":"Medium"},{"value":75,"label":"High"},{"value":100,"label":"Max"}]'
  ></minerva-slider>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // marks: an empty attribute draws a tick per step, a JSON array labelled
  // marks; step="null" snaps to the marks only.
  const labels = {
    0: "Off",
    25: "Low",
    50: "Medium",
    75: "High",
    100: "Max",
  };

  const fan = document.querySelector("#fan");
  fan.getAriaValueText = (v) => labels[v] ?? String(v);
<\/script>
`}})))()}n();export{t as default};