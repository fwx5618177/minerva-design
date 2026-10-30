import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SunburstChartDiskUsage.vue -->

<script setup lang="ts">
// Disk usage as rings: folders inside, their content outside; click a
// folder to zoom into it, the center to go back up.

import type { MinervaSunburstChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    folders: ["Documents", "Photos", "Music", "Apps"],
    files: [
      "Work",
      "Taxes",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Tools",
      "Games",
    ],
  },
  zh: {
    folders: ["文档", "照片", "音乐", "应用"],
    files: ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"],
  },
  ja: {
    folders: ["書類", "写真", "ミュージック", "アプリ"],
    files: [
      "仕事",
      "税金",
      "2025",
      "2026",
      "アルバム",
      "ポッドキャスト",
      "ツール",
      "ゲーム",
    ],
  },
  fr: {
    folders: ["Documents", "Photos", "Musique", "Applications"],
    files: [
      "Travail",
      "Impôts",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Outils",
      "Jeux",
    ],
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = [
  {
    name: text.folders[0],
    children: [
      { name: text.files[0], value: 12 },
      { name: text.files[1], value: 3 },
    ],
  },
  {
    name: text.folders[1],
    children: [
      { name: text.files[2], value: 46 },
      { name: text.files[3], value: 21 },
    ],
  },
  {
    name: text.folders[2],
    children: [
      { name: text.files[4], value: 18 },
      { name: text.files[5], value: 7 },
    ],
  },
  {
    name: text.folders[3],
    children: [
      { name: text.files[6], value: 9 },
      { name: text.files[7], value: 32 },
    ],
  },
];
const chartOptions = { format: (value) => \`\${value} GB\` };
<\/script>

<template>
  <minerva-sunburst-chart
    id="disk"
    :data.prop="chartData"
    :options.prop="chartOptions"
  ></minerva-sunburst-chart>
</template>
`,angular:`// sunburst-chart-disk-usage.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Disk usage as rings: folders inside, their content outside; click a
// folder to zoom into it, the center to go back up.
import type { MinervaSunburstChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    folders: ["Documents", "Photos", "Music", "Apps"],
    files: [
      "Work",
      "Taxes",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Tools",
      "Games",
    ],
  },
  zh: {
    folders: ["文档", "照片", "音乐", "应用"],
    files: ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"],
  },
  ja: {
    folders: ["書類", "写真", "ミュージック", "アプリ"],
    files: [
      "仕事",
      "税金",
      "2025",
      "2026",
      "アルバム",
      "ポッドキャスト",
      "ツール",
      "ゲーム",
    ],
  },
  fr: {
    folders: ["Documents", "Photos", "Musique", "Applications"],
    files: [
      "Travail",
      "Impôts",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Outils",
      "Jeux",
    ],
  },
};

@Component({
  selector: "app-sunburst-chart-disk-usage",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-sunburst-chart
      id="disk"
      [data]="chartData"
      [options]="chartOptions"
    ></minerva-sunburst-chart>
  \`,
})
export class SunburstChartDiskUsageComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = [
    {
      name: this.text.folders[0],
      children: [
        { name: this.text.files[0], value: 12 },
        { name: this.text.files[1], value: 3 },
      ],
    },
    {
      name: this.text.folders[1],
      children: [
        { name: this.text.files[2], value: 46 },
        { name: this.text.files[3], value: 21 },
      ],
    },
    {
      name: this.text.folders[2],
      children: [
        { name: this.text.files[4], value: 18 },
        { name: this.text.files[5], value: 7 },
      ],
    },
    {
      name: this.text.folders[3],
      children: [
        { name: this.text.files[6], value: 9 },
        { name: this.text.files[7], value: 32 },
      ],
    },
  ];
  chartOptions = { format: (value) => \`\${value} GB\` };
}
`,svelte:`<!-- SunburstChartDiskUsage.svelte -->

<script lang="ts">
  // Disk usage as rings: folders inside, their content outside; click a
  // folder to zoom into it, the center to go back up.

  import type { MinervaSunburstChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      folders: ["Documents", "Photos", "Music", "Apps"],
      files: [
        "Work",
        "Taxes",
        "2025",
        "2026",
        "Albums",
        "Podcasts",
        "Tools",
        "Games",
      ],
    },
    zh: {
      folders: ["文档", "照片", "音乐", "应用"],
      files: ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"],
    },
    ja: {
      folders: ["書類", "写真", "ミュージック", "アプリ"],
      files: [
        "仕事",
        "税金",
        "2025",
        "2026",
        "アルバム",
        "ポッドキャスト",
        "ツール",
        "ゲーム",
      ],
    },
    fr: {
      folders: ["Documents", "Photos", "Musique", "Applications"],
      files: [
        "Travail",
        "Impôts",
        "2025",
        "2026",
        "Albums",
        "Podcasts",
        "Outils",
        "Jeux",
      ],
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [
    {
      name: text.folders[0],
      children: [
        { name: text.files[0], value: 12 },
        { name: text.files[1], value: 3 },
      ],
    },
    {
      name: text.folders[1],
      children: [
        { name: text.files[2], value: 46 },
        { name: text.files[3], value: 21 },
      ],
    },
    {
      name: text.folders[2],
      children: [
        { name: text.files[4], value: 18 },
        { name: text.files[5], value: 7 },
      ],
    },
    {
      name: text.folders[3],
      children: [
        { name: text.files[6], value: 9 },
        { name: text.files[7], value: 32 },
      ],
    },
  ];
  const chartOptions = { format: (value) => \`\${value} GB\` };
<\/script>

<minerva-sunburst-chart id="disk" data={chartData} options={chartOptions}></minerva-sunburst-chart>
`,solid:`// SunburstChartDiskUsage.tsx

// Disk usage as rings: folders inside, their content outside; click a
// folder to zoom into it, the center to go back up.
import type { MinervaSunburstChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    folders: ["Documents", "Photos", "Music", "Apps"],
    files: [
      "Work",
      "Taxes",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Tools",
      "Games",
    ],
  },
  zh: {
    folders: ["文档", "照片", "音乐", "应用"],
    files: ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"],
  },
  ja: {
    folders: ["書類", "写真", "ミュージック", "アプリ"],
    files: [
      "仕事",
      "税金",
      "2025",
      "2026",
      "アルバム",
      "ポッドキャスト",
      "ツール",
      "ゲーム",
    ],
  },
  fr: {
    folders: ["Documents", "Photos", "Musique", "Applications"],
    files: [
      "Travail",
      "Impôts",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Outils",
      "Jeux",
    ],
  },
};

export default function SunburstChartDiskUsage() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [
    {
      name: text.folders[0],
      children: [
        { name: text.files[0], value: 12 },
        { name: text.files[1], value: 3 },
      ],
    },
    {
      name: text.folders[1],
      children: [
        { name: text.files[2], value: 46 },
        { name: text.files[3], value: 21 },
      ],
    },
    {
      name: text.folders[2],
      children: [
        { name: text.files[4], value: 18 },
        { name: text.files[5], value: 7 },
      ],
    },
    {
      name: text.folders[3],
      children: [
        { name: text.files[6], value: 9 },
        { name: text.files[7], value: 32 },
      ],
    },
  ];
  const chartOptions = { format: (value) => \`\${value} GB\` };

  return (
    <minerva-sunburst-chart
      id="disk"
      prop:data={chartData}
      prop:options={chartOptions}
    ></minerva-sunburst-chart>
  );
}
`,html:`<minerva-sunburst-chart id="disk"></minerva-sunburst-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Disk usage as rings: folders inside, their content outside; click a
  // folder to zoom into it, the center to go back up.
  const TEXT = {
    en: {
      folders: ["Documents", "Photos", "Music", "Apps"],
      files: [
        "Work",
        "Taxes",
        "2025",
        "2026",
        "Albums",
        "Podcasts",
        "Tools",
        "Games",
      ],
    },
    zh: {
      folders: ["文档", "照片", "音乐", "应用"],
      files: ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"],
    },
    ja: {
      folders: ["書類", "写真", "ミュージック", "アプリ"],
      files: [
        "仕事",
        "税金",
        "2025",
        "2026",
        "アルバム",
        "ポッドキャスト",
        "ツール",
        "ゲーム",
      ],
    },
    fr: {
      folders: ["Documents", "Photos", "Musique", "Applications"],
      files: [
        "Travail",
        "Impôts",
        "2025",
        "2026",
        "Albums",
        "Podcasts",
        "Outils",
        "Jeux",
      ],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#disk");
  chart.data = [
    {
      name: text.folders[0],
      children: [
        { name: text.files[0], value: 12 },
        { name: text.files[1], value: 3 },
      ],
    },
    {
      name: text.folders[1],
      children: [
        { name: text.files[2], value: 46 },
        { name: text.files[3], value: 21 },
      ],
    },
    {
      name: text.folders[2],
      children: [
        { name: text.files[4], value: 18 },
        { name: text.files[5], value: 7 },
      ],
    },
    {
      name: text.folders[3],
      children: [
        { name: text.files[6], value: 9 },
        { name: text.files[7], value: 32 },
      ],
    },
  ];
  chart.options = { format: (value) => \`\${value} GB\` };
<\/script>
`}})))()}n();export{t as default};