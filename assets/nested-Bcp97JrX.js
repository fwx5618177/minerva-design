import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TreemapChartNested.vue -->

<script setup lang="ts">
// Parents sum their children and draw their name above them.

import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    media: "Media",
    documents: "Documents",
    apps: "Apps",
    photos: "Photos",
    videos: "Videos",
    music: "Music",
    work: "Work",
    personal: "Personal",
    tools: "Tools",
    games: "Games",
  },
  zh: {
    media: "媒体",
    documents: "文档",
    apps: "应用",
    photos: "照片",
    videos: "视频",
    music: "音乐",
    work: "工作",
    personal: "个人",
    tools: "工具",
    games: "游戏",
  },
  ja: {
    media: "メディア",
    documents: "書類",
    apps: "アプリ",
    photos: "写真",
    videos: "動画",
    music: "音楽",
    work: "仕事",
    personal: "個人",
    tools: "ツール",
    games: "ゲーム",
  },
  fr: {
    media: "Médias",
    documents: "Documents",
    apps: "Applications",
    photos: "Photos",
    videos: "Vidéos",
    music: "Musique",
    work: "Travail",
    personal: "Personnel",
    tools: "Outils",
    games: "Jeux",
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = [
  {
    name: text.media,
    children: [
      { name: text.photos, value: 48 },
      { name: text.videos, value: 96 },
      { name: text.music, value: 22 },
    ],
  },
  {
    name: text.documents,
    children: [
      { name: text.work, value: 31 },
      { name: text.personal, value: 12 },
    ],
  },
  {
    name: text.apps,
    children: [
      { name: text.tools, value: 40 },
      { name: text.games, value: 64 },
    ],
  },
];
const chartOptions = { format: (gb) => \`\${gb} GB\` };
<\/script>

<template>
  <minerva-treemap-chart
    id="disk"
    height="320"
    :data.prop="chartData"
    :options.prop="chartOptions"
  ></minerva-treemap-chart>
</template>
`,angular:`// treemap-chart-nested.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Parents sum their children and draw their name above them.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    media: "Media",
    documents: "Documents",
    apps: "Apps",
    photos: "Photos",
    videos: "Videos",
    music: "Music",
    work: "Work",
    personal: "Personal",
    tools: "Tools",
    games: "Games",
  },
  zh: {
    media: "媒体",
    documents: "文档",
    apps: "应用",
    photos: "照片",
    videos: "视频",
    music: "音乐",
    work: "工作",
    personal: "个人",
    tools: "工具",
    games: "游戏",
  },
  ja: {
    media: "メディア",
    documents: "書類",
    apps: "アプリ",
    photos: "写真",
    videos: "動画",
    music: "音楽",
    work: "仕事",
    personal: "個人",
    tools: "ツール",
    games: "ゲーム",
  },
  fr: {
    media: "Médias",
    documents: "Documents",
    apps: "Applications",
    photos: "Photos",
    videos: "Vidéos",
    music: "Musique",
    work: "Travail",
    personal: "Personnel",
    tools: "Outils",
    games: "Jeux",
  },
};

@Component({
  selector: "app-treemap-chart-nested",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-treemap-chart
      id="disk"
      height="320"
      [data]="chartData"
      [options]="chartOptions"
    ></minerva-treemap-chart>
  \`,
})
export class TreemapChartNestedComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = [
    {
      name: this.text.media,
      children: [
        { name: this.text.photos, value: 48 },
        { name: this.text.videos, value: 96 },
        { name: this.text.music, value: 22 },
      ],
    },
    {
      name: this.text.documents,
      children: [
        { name: this.text.work, value: 31 },
        { name: this.text.personal, value: 12 },
      ],
    },
    {
      name: this.text.apps,
      children: [
        { name: this.text.tools, value: 40 },
        { name: this.text.games, value: 64 },
      ],
    },
  ];
  chartOptions = { format: (gb) => \`\${gb} GB\` };
}
`,svelte:`<!-- TreemapChartNested.svelte -->

<script lang="ts">
  // Parents sum their children and draw their name above them.

  import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      media: "Media",
      documents: "Documents",
      apps: "Apps",
      photos: "Photos",
      videos: "Videos",
      music: "Music",
      work: "Work",
      personal: "Personal",
      tools: "Tools",
      games: "Games",
    },
    zh: {
      media: "媒体",
      documents: "文档",
      apps: "应用",
      photos: "照片",
      videos: "视频",
      music: "音乐",
      work: "工作",
      personal: "个人",
      tools: "工具",
      games: "游戏",
    },
    ja: {
      media: "メディア",
      documents: "書類",
      apps: "アプリ",
      photos: "写真",
      videos: "動画",
      music: "音楽",
      work: "仕事",
      personal: "個人",
      tools: "ツール",
      games: "ゲーム",
    },
    fr: {
      media: "Médias",
      documents: "Documents",
      apps: "Applications",
      photos: "Photos",
      videos: "Vidéos",
      music: "Musique",
      work: "Travail",
      personal: "Personnel",
      tools: "Outils",
      games: "Jeux",
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [
    {
      name: text.media,
      children: [
        { name: text.photos, value: 48 },
        { name: text.videos, value: 96 },
        { name: text.music, value: 22 },
      ],
    },
    {
      name: text.documents,
      children: [
        { name: text.work, value: 31 },
        { name: text.personal, value: 12 },
      ],
    },
    {
      name: text.apps,
      children: [
        { name: text.tools, value: 40 },
        { name: text.games, value: 64 },
      ],
    },
  ];
  const chartOptions = { format: (gb) => \`\${gb} GB\` };
<\/script>

<minerva-treemap-chart
  id="disk"
  height="320"
  data={chartData}
  options={chartOptions}
></minerva-treemap-chart>
`,solid:`// TreemapChartNested.tsx

// Parents sum their children and draw their name above them.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    media: "Media",
    documents: "Documents",
    apps: "Apps",
    photos: "Photos",
    videos: "Videos",
    music: "Music",
    work: "Work",
    personal: "Personal",
    tools: "Tools",
    games: "Games",
  },
  zh: {
    media: "媒体",
    documents: "文档",
    apps: "应用",
    photos: "照片",
    videos: "视频",
    music: "音乐",
    work: "工作",
    personal: "个人",
    tools: "工具",
    games: "游戏",
  },
  ja: {
    media: "メディア",
    documents: "書類",
    apps: "アプリ",
    photos: "写真",
    videos: "動画",
    music: "音楽",
    work: "仕事",
    personal: "個人",
    tools: "ツール",
    games: "ゲーム",
  },
  fr: {
    media: "Médias",
    documents: "Documents",
    apps: "Applications",
    photos: "Photos",
    videos: "Vidéos",
    music: "Musique",
    work: "Travail",
    personal: "Personnel",
    tools: "Outils",
    games: "Jeux",
  },
};

export default function TreemapChartNested() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [
    {
      name: text.media,
      children: [
        { name: text.photos, value: 48 },
        { name: text.videos, value: 96 },
        { name: text.music, value: 22 },
      ],
    },
    {
      name: text.documents,
      children: [
        { name: text.work, value: 31 },
        { name: text.personal, value: 12 },
      ],
    },
    {
      name: text.apps,
      children: [
        { name: text.tools, value: 40 },
        { name: text.games, value: 64 },
      ],
    },
  ];
  const chartOptions = { format: (gb) => \`\${gb} GB\` };

  return (
    <minerva-treemap-chart
      id="disk"
      height="320"
      prop:data={chartData}
      prop:options={chartOptions}
    ></minerva-treemap-chart>
  );
}
`,html:`<minerva-treemap-chart id="disk" height="320"></minerva-treemap-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Parents sum their children and draw their name above them.
  const TEXT = {
    en: {
      media: "Media",
      documents: "Documents",
      apps: "Apps",
      photos: "Photos",
      videos: "Videos",
      music: "Music",
      work: "Work",
      personal: "Personal",
      tools: "Tools",
      games: "Games",
    },
    zh: {
      media: "媒体",
      documents: "文档",
      apps: "应用",
      photos: "照片",
      videos: "视频",
      music: "音乐",
      work: "工作",
      personal: "个人",
      tools: "工具",
      games: "游戏",
    },
    ja: {
      media: "メディア",
      documents: "書類",
      apps: "アプリ",
      photos: "写真",
      videos: "動画",
      music: "音楽",
      work: "仕事",
      personal: "個人",
      tools: "ツール",
      games: "ゲーム",
    },
    fr: {
      media: "Médias",
      documents: "Documents",
      apps: "Applications",
      photos: "Photos",
      videos: "Vidéos",
      music: "Musique",
      work: "Travail",
      personal: "Personnel",
      tools: "Outils",
      games: "Jeux",
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#disk");
  chart.data = [
    {
      name: text.media,
      children: [
        { name: text.photos, value: 48 },
        { name: text.videos, value: 96 },
        { name: text.music, value: 22 },
      ],
    },
    {
      name: text.documents,
      children: [
        { name: text.work, value: 31 },
        { name: text.personal, value: 12 },
      ],
    },
    {
      name: text.apps,
      children: [
        { name: text.tools, value: 40 },
        { name: text.games, value: 64 },
      ],
    },
  ];
  chart.options = { format: (gb) => \`\${gb} GB\` };
<\/script>
`}})))()}n();export{t as default};