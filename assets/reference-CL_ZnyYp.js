import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SparklineReference.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// \`reference\` draws a dashed target line; minerva-hover reports the value
// under the pointer (null when it leaves).

import type {
  ChartHoverEvent,
  MinervaSparkline,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

const valueText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const latencyData = [
  182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172,
];
const latencyValueName = text.latency;
const latencyFormat = (ms) => \`\${ms} ms\`;
const onHover = (event: Event) => {
  const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
  const y = hover?.items[0]?.y;
  valueText.value =
    y === undefined ? text.hint : \`\${text.latency}: \${y} ms (\${text.target})\`;
};

onMounted(() => {
  valueText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-sparkline
      id="latency"
      reference="200"
      height="64"
      :data.prop="latencyData"
      :valueName.prop="latencyValueName"
      :format.prop="latencyFormat"
      @minerva-hover="onHover"
    ></minerva-sparkline>
    <output id="value" aria-live="polite">{{ valueText }}</output>
  </div>
</template>
`,angular:`// sparkline-reference.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// \`reference\` draws a dashed target line; minerva-hover reports the value
// under the pointer (null when it leaves).
import type {
  ChartHoverEvent,
  MinervaSparkline,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

@Component({
  selector: "app-sparkline-reference",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-sparkline
        id="latency"
        reference="200"
        height="64"
        [data]="latencyData"
        [valueName]="latencyValueName"
        [format]="latencyFormat"
        (minerva-hover)="onHover($event)"
      ></minerva-sparkline>
      <output id="value" aria-live="polite">{{ valueText }}</output>
    </div>
  \`,
})
export class SparklineReferenceComponent implements AfterViewInit {
  valueText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  latencyData = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
  latencyValueName = this.text.latency;
  latencyFormat = (ms) => \`\${ms} ms\`;
  onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    const y = hover?.items[0]?.y;
    this.valueText =
      y === undefined
        ? this.text.hint
        : \`\${this.text.latency}: \${y} ms (\${this.text.target})\`;
  };

  ngAfterViewInit(): void {
    this.valueText = this.text.hint;
  }
}
`,svelte:`<!-- SparklineReference.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // \`reference\` draws a dashed target line; minerva-hover reports the value
  // under the pointer (null when it leaves).

  import type {
    ChartHoverEvent,
    MinervaSparkline,
  } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      latency: "p95 latency",
      target: "target 200 ms",
      hint: "Hover the line",
    },
    zh: {
      latency: "p95 延迟",
      target: "目标 200 毫秒",
      hint: "将指针悬停在折线上",
    },
    ja: {
      latency: "p95 レイテンシ",
      target: "目標 200 ms",
      hint: "線にカーソルを合わせます",
    },
    fr: {
      latency: "Latence p95",
      target: "objectif 200 ms",
      hint: "Survolez la courbe",
    },
  };

  let valueText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const latencyData = [
    182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172,
  ];
  const latencyValueName = text.latency;
  const latencyFormat = (ms) => \`\${ms} ms\`;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    const y = hover?.items[0]?.y;
    valueText =
      y === undefined ? text.hint : \`\${text.latency}: \${y} ms (\${text.target})\`;
  };

  onMount(() => {
    valueText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-sparkline
    id="latency"
    reference="200"
    height="64"
    data={latencyData}
    valueName={latencyValueName}
    format={latencyFormat}
    onminerva-hover={onHover}
  ></minerva-sparkline>
  <output id="value" aria-live="polite">{valueText}</output>
</div>
`,solid:`// SparklineReference.tsx

import { createSignal, onMount } from "solid-js";

// \`reference\` draws a dashed target line; minerva-hover reports the value
// under the pointer (null when it leaves).
import type {
  ChartHoverEvent,
  MinervaSparkline,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

export default function SparklineReference() {
  const [valueText, setValueText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const latencyData = [
    182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172,
  ];
  const latencyValueName = text.latency;
  const latencyFormat = (ms) => \`\${ms} ms\`;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    const y = hover?.items[0]?.y;
    setValueText(
      y === undefined ? text.hint : \`\${text.latency}: \${y} ms (\${text.target})\`,
    );
  };

  onMount(() => {
    setValueText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-sparkline
        id="latency"
        reference="200"
        height="64"
        prop:data={latencyData}
        prop:valueName={latencyValueName}
        prop:format={latencyFormat}
        on:minerva-hover={onHover}
      ></minerva-sparkline>
      <output id="value" aria-live="polite">
        {valueText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-sparkline
    id="latency"
    reference="200"
    height="64"
  ></minerva-sparkline>
  <output id="value" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`reference\` draws a dashed target line; minerva-hover reports the value
  // under the pointer (null when it leaves).
  const TEXT = {
    en: {
      latency: "p95 latency",
      target: "target 200 ms",
      hint: "Hover the line",
    },
    zh: {
      latency: "p95 延迟",
      target: "目标 200 毫秒",
      hint: "将指针悬停在折线上",
    },
    ja: {
      latency: "p95 レイテンシ",
      target: "目標 200 ms",
      hint: "線にカーソルを合わせます",
    },
    fr: {
      latency: "Latence p95",
      target: "objectif 200 ms",
      hint: "Survolez la courbe",
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const latency = document.querySelector("#latency");
  const value = document.querySelector("#value");
  latency.data = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
  latency.valueName = text.latency;
  latency.format = (ms) => \`\${ms} ms\`;
  value.textContent = text.hint;
  const onHover = (event) => {
    const hover = event.detail;
    const y = hover?.items[0]?.y;
    value.textContent =
      y === undefined ? text.hint : \`\${text.latency}: \${y} ms (\${text.target})\`;
  };
  latency.addEventListener("minerva-hover", onHover);
<\/script>
`}})))()}n();export{t as default};