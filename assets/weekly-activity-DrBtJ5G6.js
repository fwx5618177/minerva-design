import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- HeatmapChartWeeklyActivity.vue -->

<script setup lang="ts">
// \`data\` holds { x, y, value } cells; categories set the order of the
// columns and rows (rows from bottom to top).

import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    commits: "Commits",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    commits: "提交数",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    commits: "コミット数",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    commits: "Commits",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = text.days.flatMap((day, d) =>
  HOURS.map((hour, h) => ({
    x: hour,
    y: day,
    value:
      d < 5 && h > 1 && h < 5
        ? 20 + ((d * 7 + h * 5) % 13)
        : (d * 3 + h * 2) % 6,
  })),
);
const chartXCategories = HOURS;
const chartYCategories = [...text.days].reverse();
const chartValueName = text.commits;
<\/script>

<template>
  <minerva-heatmap-chart
    id="activity"
    height="300"
    :data.prop="chartData"
    :xCategories.prop="chartXCategories"
    :yCategories.prop="chartYCategories"
    :valueName.prop="chartValueName"
  ></minerva-heatmap-chart>
</template>
`,angular:`// heatmap-chart-weekly-activity.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`data\` holds { x, y, value } cells; categories set the order of the
// columns and rows (rows from bottom to top).
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    commits: "Commits",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    commits: "提交数",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    commits: "コミット数",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    commits: "Commits",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

@Component({
  selector: "app-heatmap-chart-weekly-activity",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-heatmap-chart
      id="activity"
      height="300"
      [data]="chartData"
      [xCategories]="chartXCategories"
      [yCategories]="chartYCategories"
      [valueName]="chartValueName"
    ></minerva-heatmap-chart>
  \`,
})
export class HeatmapChartWeeklyActivityComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = this.text.days.flatMap((day, d) =>
    HOURS.map((hour, h) => ({
      x: hour,
      y: day,
      value:
        d < 5 && h > 1 && h < 5
          ? 20 + ((d * 7 + h * 5) % 13)
          : (d * 3 + h * 2) % 6,
    })),
  );
  chartXCategories = HOURS;
  chartYCategories = [...this.text.days].reverse();
  chartValueName = this.text.commits;
}
`,svelte:`<!-- HeatmapChartWeeklyActivity.svelte -->

<script lang="ts">
  // \`data\` holds { x, y, value } cells; categories set the order of the
  // columns and rows (rows from bottom to top).

  import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      commits: "Commits",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    zh: {
      commits: "提交数",
      days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    ja: {
      commits: "コミット数",
      days: ["月", "火", "水", "木", "金", "土", "日"],
    },
    fr: {
      commits: "Commits",
      days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
    },
  };

  const HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = text.days.flatMap((day, d) =>
    HOURS.map((hour, h) => ({
      x: hour,
      y: day,
      value:
        d < 5 && h > 1 && h < 5
          ? 20 + ((d * 7 + h * 5) % 13)
          : (d * 3 + h * 2) % 6,
    })),
  );
  const chartXCategories = HOURS;
  const chartYCategories = [...text.days].reverse();
  const chartValueName = text.commits;
<\/script>

<minerva-heatmap-chart
  id="activity"
  height="300"
  data={chartData}
  xCategories={chartXCategories}
  yCategories={chartYCategories}
  valueName={chartValueName}
></minerva-heatmap-chart>
`,solid:`// HeatmapChartWeeklyActivity.tsx

// \`data\` holds { x, y, value } cells; categories set the order of the
// columns and rows (rows from bottom to top).
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    commits: "Commits",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    commits: "提交数",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    commits: "コミット数",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    commits: "Commits",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

export default function HeatmapChartWeeklyActivity() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = text.days.flatMap((day, d) =>
    HOURS.map((hour, h) => ({
      x: hour,
      y: day,
      value:
        d < 5 && h > 1 && h < 5
          ? 20 + ((d * 7 + h * 5) % 13)
          : (d * 3 + h * 2) % 6,
    })),
  );
  const chartXCategories = HOURS;
  const chartYCategories = [...text.days].reverse();
  const chartValueName = text.commits;

  return (
    <minerva-heatmap-chart
      id="activity"
      height="300"
      prop:data={chartData}
      prop:xCategories={chartXCategories}
      prop:yCategories={chartYCategories}
      prop:valueName={chartValueName}
    ></minerva-heatmap-chart>
  );
}
`,html:`<minerva-heatmap-chart id="activity" height="300"></minerva-heatmap-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`data\` holds { x, y, value } cells; categories set the order of the
  // columns and rows (rows from bottom to top).
  const TEXT = {
    en: {
      commits: "Commits",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    zh: {
      commits: "提交数",
      days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    ja: {
      commits: "コミット数",
      days: ["月", "火", "水", "木", "金", "土", "日"],
    },
    fr: {
      commits: "Commits",
      days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
    },
  };

  const HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#activity");
  chart.data = text.days.flatMap((day, d) =>
    HOURS.map((hour, h) => ({
      x: hour,
      y: day,
      value:
        d < 5 && h > 1 && h < 5
          ? 20 + ((d * 7 + h * 5) % 13)
          : (d * 3 + h * 2) % 6,
    })),
  );
  chart.xCategories = HOURS;
  chart.yCategories = [...text.days].reverse();
  chart.valueName = text.commits;
<\/script>
`}})))()}n();export{t as default};