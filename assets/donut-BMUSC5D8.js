import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- PieChartDonut.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// <minerva-donut-chart>: a pie with a hole and center texts;
// minerva-click reports the clicked slice.

import type {
  MinervaDonutChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    total: "monthly revenue",
    hint: "Click a slice",
    plans: ["Free", "Starter", "Pro", "Enterprise"],
  },
  zh: {
    total: "月收入",
    hint: "点击一个扇区",
    plans: ["免费版", "入门版", "专业版", "企业版"],
  },
  ja: {
    total: "月間売上",
    hint: "スライスをクリックします",
    plans: ["無料", "スターター", "プロ", "エンタープライズ"],
  },
  fr: {
    total: "revenu mensuel",
    hint: "Cliquez sur une part",
    plans: ["Gratuit", "Starter", "Pro", "Entreprise"],
  },
};

const planText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = [2, 18, 46, 34].map((value, i) => ({
  name: text.plans[i],
  value,
}));
const chartCenterValue = "€100k";
const chartCenterLabel = text.total;
const chartOptions = { format: (value) => \`€\${value}k\` };
const onClick = (event: Event) => {
  const slice = (event as CustomEvent<ShapeHoverEvent>).detail;
  planText.value = \`\${slice.name}: €\${slice.value}k\`;
};

onMounted(() => {
  planText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-donut-chart
      id="plans"
      height="300"
      :data.prop="chartData"
      :centerValue.prop="chartCenterValue"
      :centerLabel.prop="chartCenterLabel"
      :options.prop="chartOptions"
      @minerva-click="onClick"
    ></minerva-donut-chart>
    <output id="plan" aria-live="polite">{{ planText }}</output>
  </div>
</template>
`,angular:`// pie-chart-donut.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// <minerva-donut-chart>: a pie with a hole and center texts;
// minerva-click reports the clicked slice.
import type {
  MinervaDonutChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    total: "monthly revenue",
    hint: "Click a slice",
    plans: ["Free", "Starter", "Pro", "Enterprise"],
  },
  zh: {
    total: "月收入",
    hint: "点击一个扇区",
    plans: ["免费版", "入门版", "专业版", "企业版"],
  },
  ja: {
    total: "月間売上",
    hint: "スライスをクリックします",
    plans: ["無料", "スターター", "プロ", "エンタープライズ"],
  },
  fr: {
    total: "revenu mensuel",
    hint: "Cliquez sur une part",
    plans: ["Gratuit", "Starter", "Pro", "Entreprise"],
  },
};

@Component({
  selector: "app-pie-chart-donut",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-donut-chart
        id="plans"
        height="300"
        [data]="chartData"
        [centerValue]="chartCenterValue"
        [centerLabel]="chartCenterLabel"
        [options]="chartOptions"
        (minerva-click)="onClick($event)"
      ></minerva-donut-chart>
      <output id="plan" aria-live="polite">{{ planText }}</output>
    </div>
  \`,
})
export class PieChartDonutComponent implements AfterViewInit {
  planText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = [2, 18, 46, 34].map((value, i) => ({
    name: this.text.plans[i],
    value,
  }));
  chartCenterValue = "€100k";
  chartCenterLabel = this.text.total;
  chartOptions = { format: (value) => \`€\${value}k\` };
  onClick = (event: Event) => {
    const slice = (event as CustomEvent<ShapeHoverEvent>).detail;
    this.planText = \`\${slice.name}: €\${slice.value}k\`;
  };

  ngAfterViewInit(): void {
    this.planText = this.text.hint;
  }
}
`,svelte:`<!-- PieChartDonut.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // <minerva-donut-chart>: a pie with a hole and center texts;
  // minerva-click reports the clicked slice.

  import type {
    MinervaDonutChart,
    ShapeHoverEvent,
  } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      total: "monthly revenue",
      hint: "Click a slice",
      plans: ["Free", "Starter", "Pro", "Enterprise"],
    },
    zh: {
      total: "月收入",
      hint: "点击一个扇区",
      plans: ["免费版", "入门版", "专业版", "企业版"],
    },
    ja: {
      total: "月間売上",
      hint: "スライスをクリックします",
      plans: ["無料", "スターター", "プロ", "エンタープライズ"],
    },
    fr: {
      total: "revenu mensuel",
      hint: "Cliquez sur une part",
      plans: ["Gratuit", "Starter", "Pro", "Entreprise"],
    },
  };

  let planText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [2, 18, 46, 34].map((value, i) => ({
    name: text.plans[i],
    value,
  }));
  const chartCenterValue = "€100k";
  const chartCenterLabel = text.total;
  const chartOptions = { format: (value) => \`€\${value}k\` };
  const onClick = (event: Event) => {
    const slice = (event as CustomEvent<ShapeHoverEvent>).detail;
    planText = \`\${slice.name}: €\${slice.value}k\`;
  };

  onMount(() => {
    planText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-donut-chart
    id="plans"
    height="300"
    data={chartData}
    centerValue={chartCenterValue}
    centerLabel={chartCenterLabel}
    options={chartOptions}
    onminerva-click={onClick}
  ></minerva-donut-chart>
  <output id="plan" aria-live="polite">{planText}</output>
</div>
`,solid:`// PieChartDonut.tsx

import { createSignal, onMount } from "solid-js";

// <minerva-donut-chart>: a pie with a hole and center texts;
// minerva-click reports the clicked slice.
import type {
  MinervaDonutChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    total: "monthly revenue",
    hint: "Click a slice",
    plans: ["Free", "Starter", "Pro", "Enterprise"],
  },
  zh: {
    total: "月收入",
    hint: "点击一个扇区",
    plans: ["免费版", "入门版", "专业版", "企业版"],
  },
  ja: {
    total: "月間売上",
    hint: "スライスをクリックします",
    plans: ["無料", "スターター", "プロ", "エンタープライズ"],
  },
  fr: {
    total: "revenu mensuel",
    hint: "Cliquez sur une part",
    plans: ["Gratuit", "Starter", "Pro", "Entreprise"],
  },
};

export default function PieChartDonut() {
  const [planText, setPlanText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [2, 18, 46, 34].map((value, i) => ({
    name: text.plans[i],
    value,
  }));
  const chartCenterValue = "€100k";
  const chartCenterLabel = text.total;
  const chartOptions = { format: (value) => \`€\${value}k\` };
  const onClick = (event: Event) => {
    const slice = (event as CustomEvent<ShapeHoverEvent>).detail;
    setPlanText(\`\${slice.name}: €\${slice.value}k\`);
  };

  onMount(() => {
    setPlanText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-donut-chart
        id="plans"
        height="300"
        prop:data={chartData}
        prop:centerValue={chartCenterValue}
        prop:centerLabel={chartCenterLabel}
        prop:options={chartOptions}
        on:minerva-click={onClick}
      ></minerva-donut-chart>
      <output id="plan" aria-live="polite">
        {planText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-donut-chart id="plans" height="300"></minerva-donut-chart>
  <output id="plan" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // <minerva-donut-chart>: a pie with a hole and center texts;
  // minerva-click reports the clicked slice.
  const TEXT = {
    en: {
      total: "monthly revenue",
      hint: "Click a slice",
      plans: ["Free", "Starter", "Pro", "Enterprise"],
    },
    zh: {
      total: "月收入",
      hint: "点击一个扇区",
      plans: ["免费版", "入门版", "专业版", "企业版"],
    },
    ja: {
      total: "月間売上",
      hint: "スライスをクリックします",
      plans: ["無料", "スターター", "プロ", "エンタープライズ"],
    },
    fr: {
      total: "revenu mensuel",
      hint: "Cliquez sur une part",
      plans: ["Gratuit", "Starter", "Pro", "Entreprise"],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#plans");
  const plan = document.querySelector("#plan");
  chart.data = [2, 18, 46, 34].map((value, i) => ({
    name: text.plans[i],
    value,
  }));
  chart.centerValue = "€100k";
  chart.centerLabel = text.total;
  chart.options = { format: (value) => \`€\${value}k\` };
  plan.textContent = text.hint;
  const onClick = (event) => {
    const slice = event.detail;
    plan.textContent = \`\${slice.name}: €\${slice.value}k\`;
  };
  chart.addEventListener("minerva-click", onClick);
<\/script>
`}})))()}n();export{t as default};