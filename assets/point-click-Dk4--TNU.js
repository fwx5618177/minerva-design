import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ScatterChartPointClick.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// minerva-point-click reports the clicked point (series, index, x, y, label).

import type {
  ChartHoverEvent,
  MinervaScatterChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    cities: "Cities",
    density: "Density (k/km²)",
    rent: "Rent (€/m²)",
    hint: "Click a city",
    names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
  },
  zh: {
    cities: "城市",
    density: "人口密度（千人/km²）",
    rent: "租金（欧元/m²）",
    hint: "点击一个城市",
    names: ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"],
  },
  ja: {
    cities: "都市",
    density: "人口密度（千人/km²）",
    rent: "家賃（€/m²）",
    hint: "都市をクリックします",
    names: ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"],
  },
  fr: {
    cities: "Villes",
    density: "Densité (k/km²)",
    rent: "Loyer (€/m²)",
    hint: "Cliquez sur une ville",
    names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
  },
};

const POINTS: [number, number][] = [
  [20.5, 31],
  [10.9, 17],
  [6.8, 15],
  [4.9, 15],
  [4.8, 21],
  [5.2, 16],
];

const selectionText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  {
    name: text.cities,
    pointSize: 12,
    data: POINTS.map(([x, y], i) => ({ x, y, label: text.names[i] })),
  },
];
const chartOptions = {
  xAxis: { title: text.density },
  yAxis: { title: text.rent },
};
const onClick = (event: Event) => {
  const [item] = (event as CustomEvent<ChartHoverEvent>).detail.items;
  if (item) selectionText.value = \`\${item.label}: \${item.x} · \${item.y} €/m²\`;
};

onMounted(() => {
  selectionText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-scatter-chart
      id="cities"
      height="280"
      :series.prop="chartSeries"
      :options.prop="chartOptions"
      @minerva-point-click="onClick"
    ></minerva-scatter-chart>
    <output id="selection" aria-live="polite">{{ selectionText }}</output>
  </div>
</template>
`,angular:`// scatter-chart-point-click.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// minerva-point-click reports the clicked point (series, index, x, y, label).
import type {
  ChartHoverEvent,
  MinervaScatterChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    cities: "Cities",
    density: "Density (k/km²)",
    rent: "Rent (€/m²)",
    hint: "Click a city",
    names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
  },
  zh: {
    cities: "城市",
    density: "人口密度（千人/km²）",
    rent: "租金（欧元/m²）",
    hint: "点击一个城市",
    names: ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"],
  },
  ja: {
    cities: "都市",
    density: "人口密度（千人/km²）",
    rent: "家賃（€/m²）",
    hint: "都市をクリックします",
    names: ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"],
  },
  fr: {
    cities: "Villes",
    density: "Densité (k/km²)",
    rent: "Loyer (€/m²)",
    hint: "Cliquez sur une ville",
    names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
  },
};

const POINTS: [number, number][] = [
  [20.5, 31],
  [10.9, 17],
  [6.8, 15],
  [4.9, 15],
  [4.8, 21],
  [5.2, 16],
];

@Component({
  selector: "app-scatter-chart-point-click",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-scatter-chart
        id="cities"
        height="280"
        [series]="chartSeries"
        [options]="chartOptions"
        (minerva-point-click)="onClick($event)"
      ></minerva-scatter-chart>
      <output id="selection" aria-live="polite">{{ selectionText }}</output>
    </div>
  \`,
})
export class ScatterChartPointClickComponent implements AfterViewInit {
  selectionText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    {
      name: this.text.cities,
      pointSize: 12,
      data: POINTS.map(([x, y], i) => ({ x, y, label: this.text.names[i] })),
    },
  ];
  chartOptions = {
    xAxis: { title: this.text.density },
    yAxis: { title: this.text.rent },
  };
  onClick = (event: Event) => {
    const [item] = (event as CustomEvent<ChartHoverEvent>).detail.items;
    if (item) this.selectionText = \`\${item.label}: \${item.x} · \${item.y} €/m²\`;
  };

  ngAfterViewInit(): void {
    this.selectionText = this.text.hint;
  }
}
`,svelte:`<!-- ScatterChartPointClick.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // minerva-point-click reports the clicked point (series, index, x, y, label).

  import type {
    ChartHoverEvent,
    MinervaScatterChart,
  } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      cities: "Cities",
      density: "Density (k/km²)",
      rent: "Rent (€/m²)",
      hint: "Click a city",
      names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
    },
    zh: {
      cities: "城市",
      density: "人口密度（千人/km²）",
      rent: "租金（欧元/m²）",
      hint: "点击一个城市",
      names: ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"],
    },
    ja: {
      cities: "都市",
      density: "人口密度（千人/km²）",
      rent: "家賃（€/m²）",
      hint: "都市をクリックします",
      names: ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"],
    },
    fr: {
      cities: "Villes",
      density: "Densité (k/km²)",
      rent: "Loyer (€/m²)",
      hint: "Cliquez sur une ville",
      names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
    },
  };

  const POINTS: [number, number][] = [
    [20.5, 31],
    [10.9, 17],
    [6.8, 15],
    [4.9, 15],
    [4.8, 21],
    [5.2, 16],
  ];

  let selectionText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.cities,
      pointSize: 12,
      data: POINTS.map(([x, y], i) => ({ x, y, label: text.names[i] })),
    },
  ];
  const chartOptions = {
    xAxis: { title: text.density },
    yAxis: { title: text.rent },
  };
  const onClick = (event: Event) => {
    const [item] = (event as CustomEvent<ChartHoverEvent>).detail.items;
    if (item) selectionText = \`\${item.label}: \${item.x} · \${item.y} €/m²\`;
  };

  onMount(() => {
    selectionText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-scatter-chart
    id="cities"
    height="280"
    series={chartSeries}
    options={chartOptions}
    onminerva-point-click={onClick}
  ></minerva-scatter-chart>
  <output id="selection" aria-live="polite">{selectionText}</output>
</div>
`,solid:`// ScatterChartPointClick.tsx

import { createSignal, onMount } from "solid-js";

// minerva-point-click reports the clicked point (series, index, x, y, label).
import type {
  ChartHoverEvent,
  MinervaScatterChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    cities: "Cities",
    density: "Density (k/km²)",
    rent: "Rent (€/m²)",
    hint: "Click a city",
    names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
  },
  zh: {
    cities: "城市",
    density: "人口密度（千人/km²）",
    rent: "租金（欧元/m²）",
    hint: "点击一个城市",
    names: ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"],
  },
  ja: {
    cities: "都市",
    density: "人口密度（千人/km²）",
    rent: "家賃（€/m²）",
    hint: "都市をクリックします",
    names: ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"],
  },
  fr: {
    cities: "Villes",
    density: "Densité (k/km²)",
    rent: "Loyer (€/m²)",
    hint: "Cliquez sur une ville",
    names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
  },
};

const POINTS: [number, number][] = [
  [20.5, 31],
  [10.9, 17],
  [6.8, 15],
  [4.9, 15],
  [4.8, 21],
  [5.2, 16],
];

export default function ScatterChartPointClick() {
  const [selectionText, setSelectionText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.cities,
      pointSize: 12,
      data: POINTS.map(([x, y], i) => ({ x, y, label: text.names[i] })),
    },
  ];
  const chartOptions = {
    xAxis: { title: text.density },
    yAxis: { title: text.rent },
  };
  const onClick = (event: Event) => {
    const [item] = (event as CustomEvent<ChartHoverEvent>).detail.items;
    if (item) setSelectionText(\`\${item.label}: \${item.x} · \${item.y} €/m²\`);
  };

  onMount(() => {
    setSelectionText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-scatter-chart
        id="cities"
        height="280"
        prop:series={chartSeries}
        prop:options={chartOptions}
        on:minerva-point-click={onClick}
      ></minerva-scatter-chart>
      <output id="selection" aria-live="polite">
        {selectionText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-scatter-chart id="cities" height="280"></minerva-scatter-chart>
  <output id="selection" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // minerva-point-click reports the clicked point (series, index, x, y, label).
  const TEXT = {
    en: {
      cities: "Cities",
      density: "Density (k/km²)",
      rent: "Rent (€/m²)",
      hint: "Click a city",
      names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
    },
    zh: {
      cities: "城市",
      density: "人口密度（千人/km²）",
      rent: "租金（欧元/m²）",
      hint: "点击一个城市",
      names: ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"],
    },
    ja: {
      cities: "都市",
      density: "人口密度（千人/km²）",
      rent: "家賃（€/m²）",
      hint: "都市をクリックします",
      names: ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"],
    },
    fr: {
      cities: "Villes",
      density: "Densité (k/km²)",
      rent: "Loyer (€/m²)",
      hint: "Cliquez sur une ville",
      names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
    },
  };

  const POINTS = [
    [20.5, 31],
    [10.9, 17],
    [6.8, 15],
    [4.9, 15],
    [4.8, 21],
    [5.2, 16],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#cities");
  const selection = document.querySelector("#selection");
  chart.series = [
    {
      name: text.cities,
      pointSize: 12,
      data: POINTS.map(([x, y], i) => ({ x, y, label: text.names[i] })),
    },
  ];
  chart.options = {
    xAxis: { title: text.density },
    yAxis: { title: text.rent },
  };
  selection.textContent = text.hint;
  const onClick = (event) => {
    const [item] = event.detail.items;
    if (item) selection.textContent = \`\${item.label}: \${item.x} · \${item.y} €/m²\`;
  };
  chart.addEventListener("minerva-point-click", onClick);
<\/script>
`}})))()}n();export{t as default};