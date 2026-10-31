import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- DependencyGraphPipeline.vue -->

<script setup lang="ts">
import { ref } from "vue";

// A CI pipeline left to right: the duration of a job is its value, so the
// critical path (the longest chain of jobs) is highlighted and can be
// switched off.

import type { MinervaSwitch } from "minerva-design/web-components";
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    jobs: [
      "Install dependencies",
      "Lint",
      "Type check",
      "Unit tests",
      "Build",
      "E2E tests",
      "Package",
      "Deploy",
    ],
    minutes: "{n} min",
    critical: "Critical path",
  },
  zh: {
    jobs: [
      "安装依赖",
      "代码检查",
      "类型检查",
      "单元测试",
      "构建",
      "端到端测试",
      "打包",
      "部署",
    ],
    minutes: "{n} 分钟",
    critical: "关键路径",
  },
  ja: {
    jobs: [
      "依存関係のインストール",
      "Lint",
      "型チェック",
      "単体テスト",
      "ビルド",
      "E2E テスト",
      "パッケージ化",
      "デプロイ",
    ],
    minutes: "{n} 分",
    critical: "クリティカルパス",
  },
  fr: {
    jobs: [
      "Installer les dépendances",
      "Analyse statique",
      "Vérification des types",
      "Tests unitaires",
      "Compilation",
      "Tests E2E",
      "Empaquetage",
      "Déploiement",
    ],
    minutes: "{n} min",
    critical: "Chemin critique",
  },
};
// duration of each job of TEXT.jobs, in minutes
const MINUTES = [3, 2, 3, 6, 5, 9, 2, 4];
// job → the jobs that need it (indexes in TEXT.jobs)
const NEEDS = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 4],
  [4, 5],
  [1, 6],
  [3, 6],
  [4, 6],
  [6, 7],
  [5, 7],
];

const toggle = ref<MinervaSwitch>();
const chart = ref<MinervaDependencyGraph>();

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const toggleLabel = text.critical;
const chartNodes = text.jobs.map((label, i) => ({
  id: \`j\${i}\`,
  label,
  subtitle: text.minutes.replace("{n}", String(MINUTES[i])),
  value: MINUTES[i],
}));
const chartEdges = NEEDS.map(([a, b]) => ({
  source: \`j\${a}\`,
  target: \`j\${b}\`,
}));
const onChange = () => {
  chart.value!.criticalPath = toggle.value!.checked;
};
<\/script>

<template>
  <div style="display: grid; gap: 12px; width: 100%">
    <minerva-switch
      id="critical"
      checked
      ref="toggle"
      :label.prop="toggleLabel"
      @minerva-change="onChange"
    ></minerva-switch>
    <minerva-dependency-graph
      id="pipeline"
      direction="LR"
      edge-style="orthogonal"
      critical-path
      height="380"
      ref="chart"
      :nodes.prop="chartNodes"
      :edges.prop="chartEdges"
    ></minerva-dependency-graph>
  </div>
</template>
`,angular:`// dependency-graph-pipeline.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";

// A CI pipeline left to right: the duration of a job is its value, so the
// critical path (the longest chain of jobs) is highlighted and can be
// switched off.
import type { MinervaSwitch } from "minerva-design/web-components";
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    jobs: [
      "Install dependencies",
      "Lint",
      "Type check",
      "Unit tests",
      "Build",
      "E2E tests",
      "Package",
      "Deploy",
    ],
    minutes: "{n} min",
    critical: "Critical path",
  },
  zh: {
    jobs: [
      "安装依赖",
      "代码检查",
      "类型检查",
      "单元测试",
      "构建",
      "端到端测试",
      "打包",
      "部署",
    ],
    minutes: "{n} 分钟",
    critical: "关键路径",
  },
  ja: {
    jobs: [
      "依存関係のインストール",
      "Lint",
      "型チェック",
      "単体テスト",
      "ビルド",
      "E2E テスト",
      "パッケージ化",
      "デプロイ",
    ],
    minutes: "{n} 分",
    critical: "クリティカルパス",
  },
  fr: {
    jobs: [
      "Installer les dépendances",
      "Analyse statique",
      "Vérification des types",
      "Tests unitaires",
      "Compilation",
      "Tests E2E",
      "Empaquetage",
      "Déploiement",
    ],
    minutes: "{n} min",
    critical: "Chemin critique",
  },
};
// duration of each job of TEXT.jobs, in minutes
const MINUTES = [3, 2, 3, 6, 5, 9, 2, 4];
// job → the jobs that need it (indexes in TEXT.jobs)
const NEEDS = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 4],
  [4, 5],
  [1, 6],
  [3, 6],
  [4, 6],
  [6, 7],
  [5, 7],
];

@Component({
  selector: "app-dependency-graph-pipeline",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; width: 100%">
      <minerva-switch
        id="critical"
        checked
        #toggle
        [label]="toggleLabel"
        (minerva-change)="onChange($event)"
      ></minerva-switch>
      <minerva-dependency-graph
        id="pipeline"
        direction="LR"
        edge-style="orthogonal"
        critical-path
        height="380"
        #chart
        [nodes]="chartNodes"
        [edges]="chartEdges"
      ></minerva-dependency-graph>
    </div>
  \`,
})
export class DependencyGraphPipelineComponent {
  @ViewChild("toggle") toggle!: ElementRef<MinervaSwitch>;
  @ViewChild("chart") chart!: ElementRef<MinervaDependencyGraph>;

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  toggleLabel = this.text.critical;
  chartNodes = this.text.jobs.map((label, i) => ({
    id: \`j\${i}\`,
    label,
    subtitle: this.text.minutes.replace("{n}", String(MINUTES[i])),
    value: MINUTES[i],
  }));
  chartEdges = NEEDS.map(([a, b]) => ({ source: \`j\${a}\`, target: \`j\${b}\` }));
  onChange = () => {
    this.chart.nativeElement.criticalPath = this.toggle.nativeElement.checked;
  };
}
`,svelte:`<!-- DependencyGraphPipeline.svelte -->

<script lang="ts">
  // A CI pipeline left to right: the duration of a job is its value, so the
  // critical path (the longest chain of jobs) is highlighted and can be
  // switched off.

  import type { MinervaSwitch } from "minerva-design/web-components";
  import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

  const TEXT = {
    en: {
      jobs: [
        "Install dependencies",
        "Lint",
        "Type check",
        "Unit tests",
        "Build",
        "E2E tests",
        "Package",
        "Deploy",
      ],
      minutes: "{n} min",
      critical: "Critical path",
    },
    zh: {
      jobs: [
        "安装依赖",
        "代码检查",
        "类型检查",
        "单元测试",
        "构建",
        "端到端测试",
        "打包",
        "部署",
      ],
      minutes: "{n} 分钟",
      critical: "关键路径",
    },
    ja: {
      jobs: [
        "依存関係のインストール",
        "Lint",
        "型チェック",
        "単体テスト",
        "ビルド",
        "E2E テスト",
        "パッケージ化",
        "デプロイ",
      ],
      minutes: "{n} 分",
      critical: "クリティカルパス",
    },
    fr: {
      jobs: [
        "Installer les dépendances",
        "Analyse statique",
        "Vérification des types",
        "Tests unitaires",
        "Compilation",
        "Tests E2E",
        "Empaquetage",
        "Déploiement",
      ],
      minutes: "{n} min",
      critical: "Chemin critique",
    },
  };
  // duration of each job of TEXT.jobs, in minutes
  const MINUTES = [3, 2, 3, 6, 5, 9, 2, 4];
  // job → the jobs that need it (indexes in TEXT.jobs)
  const NEEDS = [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 4],
    [4, 5],
    [1, 6],
    [3, 6],
    [4, 6],
    [6, 7],
    [5, 7],
  ];

  let toggle: MinervaSwitch;
  let chart: MinervaDependencyGraph;

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const toggleLabel = text.critical;
  const chartNodes = text.jobs.map((label, i) => ({
    id: \`j\${i}\`,
    label,
    subtitle: text.minutes.replace("{n}", String(MINUTES[i])),
    value: MINUTES[i],
  }));
  const chartEdges = NEEDS.map(([a, b]) => ({
    source: \`j\${a}\`,
    target: \`j\${b}\`,
  }));
  const onChange = () => {
    chart.criticalPath = toggle.checked;
  };
<\/script>

<div style="display: grid; gap: 12px; width: 100%">
  <minerva-switch
    id="critical"
    checked
    bind:this={toggle}
    label={toggleLabel}
    onminerva-change={onChange}
  ></minerva-switch>
  <minerva-dependency-graph
    id="pipeline"
    direction="LR"
    edge-style="orthogonal"
    critical-path
    height="380"
    bind:this={chart}
    nodes={chartNodes}
    edges={chartEdges}
  ></minerva-dependency-graph>
</div>
`,solid:`// DependencyGraphPipeline.tsx

// A CI pipeline left to right: the duration of a job is its value, so the
// critical path (the longest chain of jobs) is highlighted and can be
// switched off.
import type { MinervaSwitch } from "minerva-design/web-components";
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    jobs: [
      "Install dependencies",
      "Lint",
      "Type check",
      "Unit tests",
      "Build",
      "E2E tests",
      "Package",
      "Deploy",
    ],
    minutes: "{n} min",
    critical: "Critical path",
  },
  zh: {
    jobs: [
      "安装依赖",
      "代码检查",
      "类型检查",
      "单元测试",
      "构建",
      "端到端测试",
      "打包",
      "部署",
    ],
    minutes: "{n} 分钟",
    critical: "关键路径",
  },
  ja: {
    jobs: [
      "依存関係のインストール",
      "Lint",
      "型チェック",
      "単体テスト",
      "ビルド",
      "E2E テスト",
      "パッケージ化",
      "デプロイ",
    ],
    minutes: "{n} 分",
    critical: "クリティカルパス",
  },
  fr: {
    jobs: [
      "Installer les dépendances",
      "Analyse statique",
      "Vérification des types",
      "Tests unitaires",
      "Compilation",
      "Tests E2E",
      "Empaquetage",
      "Déploiement",
    ],
    minutes: "{n} min",
    critical: "Chemin critique",
  },
};
// duration of each job of TEXT.jobs, in minutes
const MINUTES = [3, 2, 3, 6, 5, 9, 2, 4];
// job → the jobs that need it (indexes in TEXT.jobs)
const NEEDS = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 4],
  [4, 5],
  [1, 6],
  [3, 6],
  [4, 6],
  [6, 7],
  [5, 7],
];

export default function DependencyGraphPipeline() {
  let toggle!: MinervaSwitch;
  let chart!: MinervaDependencyGraph;

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const toggleLabel = text.critical;
  const chartNodes = text.jobs.map((label, i) => ({
    id: \`j\${i}\`,
    label,
    subtitle: text.minutes.replace("{n}", String(MINUTES[i])),
    value: MINUTES[i],
  }));
  const chartEdges = NEEDS.map(([a, b]) => ({
    source: \`j\${a}\`,
    target: \`j\${b}\`,
  }));
  const onChange = () => {
    chart.criticalPath = toggle.checked;
  };

  return (
    <div style="display: grid; gap: 12px; width: 100%">
      <minerva-switch
        id="critical"
        checked
        ref={toggle}
        prop:label={toggleLabel}
        on:minerva-change={onChange}
      ></minerva-switch>
      <minerva-dependency-graph
        id="pipeline"
        direction="LR"
        edge-style="orthogonal"
        critical-path
        height="380"
        ref={chart}
        prop:nodes={chartNodes}
        prop:edges={chartEdges}
      ></minerva-dependency-graph>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; width: 100%">
  <minerva-switch id="critical" checked></minerva-switch>
  <minerva-dependency-graph
    id="pipeline"
    direction="LR"
    edge-style="orthogonal"
    critical-path
    height="380"
  ></minerva-dependency-graph>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/graph";
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // A CI pipeline left to right: the duration of a job is its value, so the
  // critical path (the longest chain of jobs) is highlighted and can be
  // switched off.
  const TEXT = {
    en: {
      jobs: [
        "Install dependencies",
        "Lint",
        "Type check",
        "Unit tests",
        "Build",
        "E2E tests",
        "Package",
        "Deploy",
      ],
      minutes: "{n} min",
      critical: "Critical path",
    },
    zh: {
      jobs: [
        "安装依赖",
        "代码检查",
        "类型检查",
        "单元测试",
        "构建",
        "端到端测试",
        "打包",
        "部署",
      ],
      minutes: "{n} 分钟",
      critical: "关键路径",
    },
    ja: {
      jobs: [
        "依存関係のインストール",
        "Lint",
        "型チェック",
        "単体テスト",
        "ビルド",
        "E2E テスト",
        "パッケージ化",
        "デプロイ",
      ],
      minutes: "{n} 分",
      critical: "クリティカルパス",
    },
    fr: {
      jobs: [
        "Installer les dépendances",
        "Analyse statique",
        "Vérification des types",
        "Tests unitaires",
        "Compilation",
        "Tests E2E",
        "Empaquetage",
        "Déploiement",
      ],
      minutes: "{n} min",
      critical: "Chemin critique",
    },
  };
  // duration of each job of TEXT.jobs, in minutes
  const MINUTES = [3, 2, 3, 6, 5, 9, 2, 4];
  // job → the jobs that need it (indexes in TEXT.jobs)
  const NEEDS = [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 4],
    [4, 5],
    [1, 6],
    [3, 6],
    [4, 6],
    [6, 7],
    [5, 7],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const toggle = document.querySelector("#critical");
  const chart = document.querySelector("#pipeline");
  toggle.label = text.critical;
  chart.nodes = text.jobs.map((label, i) => ({
    id: \`j\${i}\`,
    label,
    subtitle: text.minutes.replace("{n}", String(MINUTES[i])),
    value: MINUTES[i],
  }));
  chart.edges = NEEDS.map(([a, b]) => ({ source: \`j\${a}\`, target: \`j\${b}\` }));
  const onChange = () => {
    chart.criticalPath = toggle.checked;
  };
  toggle.addEventListener("minerva-change", onChange);
<\/script>
`}})))()}n();export{t as default};