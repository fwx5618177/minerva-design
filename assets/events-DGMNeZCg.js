import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ChartsEvents.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// The engine events are DOM events: minerva-hover (null when the pointer
// leaves), minerva-point-click, minerva-zoom... with the engine's payload.

import type {
  ChartHoverEvent,
  MinervaChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "Latency (ms)",
    hint: "Hover or click a point",
    clicked: "Clicked",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    latency: "延迟（毫秒）",
    hint: "悬停或点击一个数据点",
    clicked: "已点击",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    latency: "レイテンシ（ms）",
    hint: "ポイントにカーソルを合わせるかクリックします",
    clicked: "クリック",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    latency: "Latence (ms)",
    hint: "Survolez ou cliquez sur un point",
    clicked: "Cliqué",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

const readoutText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartOptions = {
  series: [
    { name: text.latency, type: "line", data: [42, 38, 65, 120, 96, 54] },
  ],
  xAxis: { type: "category", categories: text.hours },
  crosshair: true,
};
const describe = (event: ChartHoverEvent) =>
  \`\${event.xLabel} · \${event.items[0]?.seriesName}: \${event.items[0]?.y}\`;
const onHover = (event: Event) => {
  const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
  readoutText.value = hover ? describe(hover) : text.hint;
};
const onClick = (event: Event) => {
  const click = (event as CustomEvent<ChartHoverEvent>).detail;
  readoutText.value = \`\${text.clicked} — \${describe(click)}\`;
};

onMounted(() => {
  readoutText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-chart
      id="chart"
      height="260"
      :options.prop="chartOptions"
      @minerva-hover="onHover"
      @minerva-point-click="onClick"
    ></minerva-chart>
    <output id="readout" aria-live="polite">{{ readoutText }}</output>
  </div>
</template>
`,angular:`// charts-events.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// The engine events are DOM events: minerva-hover (null when the pointer
// leaves), minerva-point-click, minerva-zoom... with the engine's payload.
import type {
  ChartHoverEvent,
  MinervaChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "Latency (ms)",
    hint: "Hover or click a point",
    clicked: "Clicked",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    latency: "延迟（毫秒）",
    hint: "悬停或点击一个数据点",
    clicked: "已点击",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    latency: "レイテンシ（ms）",
    hint: "ポイントにカーソルを合わせるかクリックします",
    clicked: "クリック",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    latency: "Latence (ms)",
    hint: "Survolez ou cliquez sur un point",
    clicked: "Cliqué",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

@Component({
  selector: "app-charts-events",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-chart
        id="chart"
        height="260"
        [options]="chartOptions"
        (minerva-hover)="onHover($event)"
        (minerva-point-click)="onClick($event)"
      ></minerva-chart>
      <output id="readout" aria-live="polite">{{ readoutText }}</output>
    </div>
  \`,
})
export class ChartsEventsComponent implements AfterViewInit {
  readoutText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartOptions = {
    series: [
      {
        name: this.text.latency,
        type: "line",
        data: [42, 38, 65, 120, 96, 54],
      },
    ],
    xAxis: { type: "category", categories: this.text.hours },
    crosshair: true,
  };
  describe = (event: ChartHoverEvent) =>
    \`\${event.xLabel} · \${event.items[0]?.seriesName}: \${event.items[0]?.y}\`;
  onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    this.readoutText = hover ? this.describe(hover) : this.text.hint;
  };
  onClick = (event: Event) => {
    const click = (event as CustomEvent<ChartHoverEvent>).detail;
    this.readoutText = \`\${this.text.clicked} — \${this.describe(click)}\`;
  };

  ngAfterViewInit(): void {
    this.readoutText = this.text.hint;
  }
}
`,svelte:`<!-- ChartsEvents.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // The engine events are DOM events: minerva-hover (null when the pointer
  // leaves), minerva-point-click, minerva-zoom... with the engine's payload.

  import type {
    ChartHoverEvent,
    MinervaChart,
  } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      latency: "Latency (ms)",
      hint: "Hover or click a point",
      clicked: "Clicked",
      hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    },
    zh: {
      latency: "延迟（毫秒）",
      hint: "悬停或点击一个数据点",
      clicked: "已点击",
      hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    },
    ja: {
      latency: "レイテンシ（ms）",
      hint: "ポイントにカーソルを合わせるかクリックします",
      clicked: "クリック",
      hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
    },
    fr: {
      latency: "Latence (ms)",
      hint: "Survolez ou cliquez sur un point",
      clicked: "Cliqué",
      hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
    },
  };

  let readoutText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartOptions = {
    series: [
      { name: text.latency, type: "line", data: [42, 38, 65, 120, 96, 54] },
    ],
    xAxis: { type: "category", categories: text.hours },
    crosshair: true,
  };
  const describe = (event: ChartHoverEvent) =>
    \`\${event.xLabel} · \${event.items[0]?.seriesName}: \${event.items[0]?.y}\`;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    readoutText = hover ? describe(hover) : text.hint;
  };
  const onClick = (event: Event) => {
    const click = (event as CustomEvent<ChartHoverEvent>).detail;
    readoutText = \`\${text.clicked} — \${describe(click)}\`;
  };

  onMount(() => {
    readoutText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-chart
    id="chart"
    height="260"
    options={chartOptions}
    onminerva-hover={onHover}
    onminerva-point-click={onClick}
  ></minerva-chart>
  <output id="readout" aria-live="polite">{readoutText}</output>
</div>
`,solid:`// ChartsEvents.tsx

import { createSignal, onMount } from "solid-js";

// The engine events are DOM events: minerva-hover (null when the pointer
// leaves), minerva-point-click, minerva-zoom... with the engine's payload.
import type {
  ChartHoverEvent,
  MinervaChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "Latency (ms)",
    hint: "Hover or click a point",
    clicked: "Clicked",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    latency: "延迟（毫秒）",
    hint: "悬停或点击一个数据点",
    clicked: "已点击",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    latency: "レイテンシ（ms）",
    hint: "ポイントにカーソルを合わせるかクリックします",
    clicked: "クリック",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    latency: "Latence (ms)",
    hint: "Survolez ou cliquez sur un point",
    clicked: "Cliqué",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

export default function ChartsEvents() {
  const [readoutText, setReadoutText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartOptions = {
    series: [
      { name: text.latency, type: "line", data: [42, 38, 65, 120, 96, 54] },
    ],
    xAxis: { type: "category", categories: text.hours },
    crosshair: true,
  };
  const describe = (event: ChartHoverEvent) =>
    \`\${event.xLabel} · \${event.items[0]?.seriesName}: \${event.items[0]?.y}\`;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    setReadoutText(hover ? describe(hover) : text.hint);
  };
  const onClick = (event: Event) => {
    const click = (event as CustomEvent<ChartHoverEvent>).detail;
    setReadoutText(\`\${text.clicked} — \${describe(click)}\`);
  };

  onMount(() => {
    setReadoutText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-chart
        id="chart"
        height="260"
        prop:options={chartOptions}
        on:minerva-hover={onHover}
        on:minerva-point-click={onClick}
      ></minerva-chart>
      <output id="readout" aria-live="polite">
        {readoutText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-chart id="chart" height="260"></minerva-chart>
  <output id="readout" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // The engine events are DOM events: minerva-hover (null when the pointer
  // leaves), minerva-point-click, minerva-zoom... with the engine's payload.
  const TEXT = {
    en: {
      latency: "Latency (ms)",
      hint: "Hover or click a point",
      clicked: "Clicked",
      hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    },
    zh: {
      latency: "延迟（毫秒）",
      hint: "悬停或点击一个数据点",
      clicked: "已点击",
      hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    },
    ja: {
      latency: "レイテンシ（ms）",
      hint: "ポイントにカーソルを合わせるかクリックします",
      clicked: "クリック",
      hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
    },
    fr: {
      latency: "Latence (ms)",
      hint: "Survolez ou cliquez sur un point",
      clicked: "Cliqué",
      hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#chart");
  const readout = document.querySelector("#readout");
  chart.options = {
    series: [
      { name: text.latency, type: "line", data: [42, 38, 65, 120, 96, 54] },
    ],
    xAxis: { type: "category", categories: text.hours },
    crosshair: true,
  };
  readout.textContent = text.hint;
  const describe = (event) =>
    \`\${event.xLabel} · \${event.items[0]?.seriesName}: \${event.items[0]?.y}\`;
  const onHover = (event) => {
    const hover = event.detail;
    readout.textContent = hover ? describe(hover) : text.hint;
  };
  const onClick = (event) => {
    const click = event.detail;
    readout.textContent = \`\${text.clicked} — \${describe(click)}\`;
  };
  chart.addEventListener("minerva-hover", onHover);
  chart.addEventListener("minerva-point-click", onClick);
<\/script>
`}})))()}n();export{t as default};