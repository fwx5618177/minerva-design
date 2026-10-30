import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- LineChartResetZoom.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the element's methods
// (resetZoom, getView, setView) drive the view from outside.

import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { sensor: "Sensor", reset: "Reset zoom" },
  zh: { sensor: "传感器", reset: "重置缩放" },
  ja: { sensor: "センサー", reset: "ズームをリセット" },
  fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
};

const chart = ref<MinervaLineChart>();
const resetText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  {
    name: text.sensor,
    data: Array.from({ length: 2000 }, (_, i) =>
      Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
    ),
  },
];
const chartOptions = { crosshair: true, interaction: { zoom: "x" } };
const onReset = () => chart.value!.resetZoom();

onMounted(() => {
  resetText.value = text.reset;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px; justify-items: start">
    <minerva-line-chart
      id="signal"
      height="260"
      ref="chart"
      :series.prop="chartSeries"
      :options.prop="chartOptions"
    ></minerva-line-chart>
    <button id="reset" type="button" @click="onReset">{{ resetText }}</button>
  </div>
</template>
`,angular:`// line-chart-reset-zoom.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";

// Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the element's methods
// (resetZoom, getView, setView) drive the view from outside.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { sensor: "Sensor", reset: "Reset zoom" },
  zh: { sensor: "传感器", reset: "重置缩放" },
  ja: { sensor: "センサー", reset: "ズームをリセット" },
  fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
};

@Component({
  selector: "app-line-chart-reset-zoom",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px; justify-items: start">
      <minerva-line-chart
        id="signal"
        height="260"
        #chart
        [series]="chartSeries"
        [options]="chartOptions"
      ></minerva-line-chart>
      <button id="reset" type="button" (click)="onReset($event)">
        {{ resetText }}
      </button>
    </div>
  \`,
})
export class LineChartResetZoomComponent implements AfterViewInit {
  @ViewChild("chart") chart!: ElementRef<MinervaLineChart>;
  resetText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    {
      name: this.text.sensor,
      data: Array.from({ length: 2000 }, (_, i) =>
        Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
      ),
    },
  ];
  chartOptions = { crosshair: true, interaction: { zoom: "x" } };
  onReset = () => this.chart.nativeElement.resetZoom();

  ngAfterViewInit(): void {
    this.resetText = this.text.reset;
  }
}
`,svelte:`<!-- LineChartResetZoom.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the element's methods
  // (resetZoom, getView, setView) drive the view from outside.

  import type { MinervaLineChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { sensor: "Sensor", reset: "Reset zoom" },
    zh: { sensor: "传感器", reset: "重置缩放" },
    ja: { sensor: "センサー", reset: "ズームをリセット" },
    fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
  };

  let chart: MinervaLineChart;
  let resetText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.sensor,
      data: Array.from({ length: 2000 }, (_, i) =>
        Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
      ),
    },
  ];
  const chartOptions = { crosshair: true, interaction: { zoom: "x" } };
  const onReset = () => chart.resetZoom();

  onMount(() => {
    resetText = text.reset;
  });
<\/script>

<div style="display: grid; gap: 8px; justify-items: start">
  <minerva-line-chart
    id="signal"
    height="260"
    bind:this={chart}
    series={chartSeries}
    options={chartOptions}
  ></minerva-line-chart>
  <button id="reset" type="button" onclick={onReset}>{resetText}</button>
</div>
`,solid:`// LineChartResetZoom.tsx

import { createSignal, onMount } from "solid-js";

// Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the element's methods
// (resetZoom, getView, setView) drive the view from outside.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { sensor: "Sensor", reset: "Reset zoom" },
  zh: { sensor: "传感器", reset: "重置缩放" },
  ja: { sensor: "センサー", reset: "ズームをリセット" },
  fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
};

export default function LineChartResetZoom() {
  let chart!: MinervaLineChart;
  const [resetText, setResetText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.sensor,
      data: Array.from({ length: 2000 }, (_, i) =>
        Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
      ),
    },
  ];
  const chartOptions = { crosshair: true, interaction: { zoom: "x" } };
  const onReset = () => chart.resetZoom();

  onMount(() => {
    setResetText(text.reset);
  });

  return (
    <div style="display: grid; gap: 8px; justify-items: start">
      <minerva-line-chart
        id="signal"
        height="260"
        ref={chart}
        prop:series={chartSeries}
        prop:options={chartOptions}
      ></minerva-line-chart>
      <button id="reset" type="button" on:click={onReset}>
        {resetText()}
      </button>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px; justify-items: start">
  <minerva-line-chart id="signal" height="260"></minerva-line-chart>
  <button id="reset" type="button"></button>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the element's methods
  // (resetZoom, getView, setView) drive the view from outside.
  const TEXT = {
    en: { sensor: "Sensor", reset: "Reset zoom" },
    zh: { sensor: "传感器", reset: "重置缩放" },
    ja: { sensor: "センサー", reset: "ズームをリセット" },
    fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#signal");
  const reset = document.querySelector("#reset");
  chart.series = [
    {
      name: text.sensor,
      data: Array.from({ length: 2000 }, (_, i) =>
        Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
      ),
    },
  ];
  chart.options = { crosshair: true, interaction: { zoom: "x" } };
  reset.textContent = text.reset;
  const onReset = () => chart.resetZoom();
  reset.addEventListener("click", onReset);
<\/script>
`}})))()}n();export{t as default};