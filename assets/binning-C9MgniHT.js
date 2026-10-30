import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- HistogramChartBinning.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// The same samples in fewer or more bins: \`bins\` takes a count or a rule
// (\`sturges\`, \`freedman-diaconis\`, \`auto\`); two groups appear with enough bins.

import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { count: "Count", bins: "Bins:", age: "Age" },
  zh: { count: "人数", bins: "分箱：", age: "年龄" },
  ja: { count: "人数", bins: "ビン：", age: "年齢" },
  fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
};

// ages of 2,000 customers: two groups (students, parents), deterministic
const fraction = (value: number) => value - Math.floor(value);
const AGES = Array.from({ length: 2000 }, (_, i) => {
  const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
});

const chart = ref<MinervaHistogramChart>();
const labelText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartValues = AGES;
const chartValueName = text.count;
const chartOptions = { xAxis: { title: text.age } };
const useSturges = () => {
  chart.value!.bins = "sturges";
};
const useTen = () => {
  chart.value!.bins = 10;
};
const useForty = () => {
  chart.value!.bins = 40;
};

onMounted(() => {
  labelText.value = text.bins;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <div style="display: flex; gap: 8px; align-items: center">
      <span id="label">{{ labelText }}</span>
      <button id="sturges" type="button" @click="useSturges">Sturges</button>
      <button id="ten" type="button" @click="useTen">10</button>
      <button id="forty" type="button" @click="useForty">40</button>
    </div>
    <minerva-histogram-chart
      id="ages"
      bins="sturges"
      height="280"
      ref="chart"
      :values.prop="chartValues"
      :valueName.prop="chartValueName"
      :options.prop="chartOptions"
    ></minerva-histogram-chart>
  </div>
</template>
`,angular:`// histogram-chart-binning.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";

// The same samples in fewer or more bins: \`bins\` takes a count or a rule
// (\`sturges\`, \`freedman-diaconis\`, \`auto\`); two groups appear with enough bins.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { count: "Count", bins: "Bins:", age: "Age" },
  zh: { count: "人数", bins: "分箱：", age: "年龄" },
  ja: { count: "人数", bins: "ビン：", age: "年齢" },
  fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
};

// ages of 2,000 customers: two groups (students, parents), deterministic
const fraction = (value: number) => value - Math.floor(value);
const AGES = Array.from({ length: 2000 }, (_, i) => {
  const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
});

@Component({
  selector: "app-histogram-chart-binning",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <div style="display: flex; gap: 8px; align-items: center">
        <span id="label">{{ labelText }}</span>
        <button id="sturges" type="button" (click)="useSturges($event)">
          Sturges
        </button>
        <button id="ten" type="button" (click)="useTen($event)">10</button>
        <button id="forty" type="button" (click)="useForty($event)">40</button>
      </div>
      <minerva-histogram-chart
        id="ages"
        bins="sturges"
        height="280"
        #chart
        [values]="chartValues"
        [valueName]="chartValueName"
        [options]="chartOptions"
      ></minerva-histogram-chart>
    </div>
  \`,
})
export class HistogramChartBinningComponent implements AfterViewInit {
  @ViewChild("chart") chart!: ElementRef<MinervaHistogramChart>;
  labelText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartValues = AGES;
  chartValueName = this.text.count;
  chartOptions = { xAxis: { title: this.text.age } };
  useSturges = () => {
    this.chart.nativeElement.bins = "sturges";
  };
  useTen = () => {
    this.chart.nativeElement.bins = 10;
  };
  useForty = () => {
    this.chart.nativeElement.bins = 40;
  };

  ngAfterViewInit(): void {
    this.labelText = this.text.bins;
  }
}
`,svelte:`<!-- HistogramChartBinning.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // The same samples in fewer or more bins: \`bins\` takes a count or a rule
  // (\`sturges\`, \`freedman-diaconis\`, \`auto\`); two groups appear with enough bins.

  import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { count: "Count", bins: "Bins:", age: "Age" },
    zh: { count: "人数", bins: "分箱：", age: "年龄" },
    ja: { count: "人数", bins: "ビン：", age: "年齢" },
    fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
  };

  // ages of 2,000 customers: two groups (students, parents), deterministic
  const fraction = (value: number) => value - Math.floor(value);
  const AGES = Array.from({ length: 2000 }, (_, i) => {
    const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
    const v = fraction(Math.sin(i * 78.233) * 43758.5453);
    return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
  });

  let chart: MinervaHistogramChart;
  let labelText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartValues = AGES;
  const chartValueName = text.count;
  const chartOptions = { xAxis: { title: text.age } };
  const useSturges = () => {
    chart.bins = "sturges";
  };
  const useTen = () => {
    chart.bins = 10;
  };
  const useForty = () => {
    chart.bins = 40;
  };

  onMount(() => {
    labelText = text.bins;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <div style="display: flex; gap: 8px; align-items: center">
    <span id="label">{labelText}</span>
    <button id="sturges" type="button" onclick={useSturges}>Sturges</button>
    <button id="ten" type="button" onclick={useTen}>10</button>
    <button id="forty" type="button" onclick={useForty}>40</button>
  </div>
  <minerva-histogram-chart
    id="ages"
    bins="sturges"
    height="280"
    bind:this={chart}
    values={chartValues}
    valueName={chartValueName}
    options={chartOptions}
  ></minerva-histogram-chart>
</div>
`,solid:`// HistogramChartBinning.tsx

import { createSignal, onMount } from "solid-js";

// The same samples in fewer or more bins: \`bins\` takes a count or a rule
// (\`sturges\`, \`freedman-diaconis\`, \`auto\`); two groups appear with enough bins.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { count: "Count", bins: "Bins:", age: "Age" },
  zh: { count: "人数", bins: "分箱：", age: "年龄" },
  ja: { count: "人数", bins: "ビン：", age: "年齢" },
  fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
};

// ages of 2,000 customers: two groups (students, parents), deterministic
const fraction = (value: number) => value - Math.floor(value);
const AGES = Array.from({ length: 2000 }, (_, i) => {
  const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
});

export default function HistogramChartBinning() {
  let chart!: MinervaHistogramChart;
  const [labelText, setLabelText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartValues = AGES;
  const chartValueName = text.count;
  const chartOptions = { xAxis: { title: text.age } };
  const useSturges = () => {
    chart.bins = "sturges";
  };
  const useTen = () => {
    chart.bins = 10;
  };
  const useForty = () => {
    chart.bins = 40;
  };

  onMount(() => {
    setLabelText(text.bins);
  });

  return (
    <div style="display: grid; gap: 8px">
      <div style="display: flex; gap: 8px; align-items: center">
        <span id="label">{labelText()}</span>
        <button id="sturges" type="button" on:click={useSturges}>
          Sturges
        </button>
        <button id="ten" type="button" on:click={useTen}>
          10
        </button>
        <button id="forty" type="button" on:click={useForty}>
          40
        </button>
      </div>
      <minerva-histogram-chart
        id="ages"
        bins="sturges"
        height="280"
        ref={chart}
        prop:values={chartValues}
        prop:valueName={chartValueName}
        prop:options={chartOptions}
      ></minerva-histogram-chart>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <div style="display: flex; gap: 8px; align-items: center">
    <span id="label"></span>
    <button id="sturges" type="button">Sturges</button>
    <button id="ten" type="button">10</button>
    <button id="forty" type="button">40</button>
  </div>
  <minerva-histogram-chart
    id="ages"
    bins="sturges"
    height="280"
  ></minerva-histogram-chart>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // The same samples in fewer or more bins: \`bins\` takes a count or a rule
  // (\`sturges\`, \`freedman-diaconis\`, \`auto\`); two groups appear with enough bins.
  const TEXT = {
    en: { count: "Count", bins: "Bins:", age: "Age" },
    zh: { count: "人数", bins: "分箱：", age: "年龄" },
    ja: { count: "人数", bins: "ビン：", age: "年齢" },
    fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
  };

  // ages of 2,000 customers: two groups (students, parents), deterministic
  const fraction = (value) => value - Math.floor(value);
  const AGES = Array.from({ length: 2000 }, (_, i) => {
    const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
    const v = fraction(Math.sin(i * 78.233) * 43758.5453);
    return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
  });

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#ages");
  const label = document.querySelector("#label");
  const sturges = document.querySelector("#sturges");
  const ten = document.querySelector("#ten");
  const forty = document.querySelector("#forty");
  chart.values = AGES;
  chart.valueName = text.count;
  chart.options = { xAxis: { title: text.age } };
  label.textContent = text.bins;
  const useSturges = () => {
    chart.bins = "sturges";
  };
  const useTen = () => {
    chart.bins = 10;
  };
  const useForty = () => {
    chart.bins = 40;
  };
  sturges.addEventListener("click", useSturges);
  ten.addEventListener("click", useTen);
  forty.addEventListener("click", useForty);
<\/script>
`}})))()}n();export{t as default};