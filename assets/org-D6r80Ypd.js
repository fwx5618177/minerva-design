import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TreeChartOrg.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// An org chart: cards grouped by department, the leaf teams stacked under
// their manager; clicking a manager collapses / expands the team and
// minerva-toggle reports it.

import type {
  GraphToggleEvent,
  MinervaTreeChart,
} from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    roles: [
      "Chief executive",
      "Technology",
      "Finance",
      "Operations",
      "Web team",
      "Mobile team",
      "Platform team",
      "Accounting",
      "Treasury",
      "Customer support",
      "Logistics",
    ],
    departments: ["Executive", "Engineering", "Finance", "Operations"],
    hint: "Click a manager to collapse or expand the team",
    collapsed: "{name}: collapsed",
    expanded: "{name}: expanded",
  },
  zh: {
    roles: [
      "首席执行官",
      "技术",
      "财务",
      "运营",
      "Web 团队",
      "移动团队",
      "平台团队",
      "会计",
      "资金管理",
      "客户支持",
      "物流",
    ],
    departments: ["管理层", "研发", "财务", "运营"],
    hint: "点击管理者以折叠或展开团队",
    collapsed: "{name}：已折叠",
    expanded: "{name}：已展开",
  },
  ja: {
    roles: [
      "最高経営責任者",
      "技術",
      "財務",
      "運営",
      "Web チーム",
      "モバイルチーム",
      "プラットフォームチーム",
      "経理",
      "資金管理",
      "カスタマーサポート",
      "物流",
    ],
    departments: ["経営", "エンジニアリング", "財務", "運営"],
    hint: "マネージャーをクリックするとチームを折りたたみ / 展開します",
    collapsed: "{name}: 折りたたみ",
    expanded: "{name}: 展開",
  },
  fr: {
    roles: [
      "Direction générale",
      "Technique",
      "Finance",
      "Opérations",
      "Équipe web",
      "Équipe mobile",
      "Équipe plateforme",
      "Comptabilité",
      "Trésorerie",
      "Support client",
      "Logistique",
    ],
    departments: ["Direction", "Ingénierie", "Finance", "Opérations"],
    hint: "Cliquez sur un responsable pour replier ou déplier l'équipe",
    collapsed: "{name} : replié",
    expanded: "{name} : déplié",
  },
};
// manager (index in TEXT.roles, -1: the root) and department of each role
const PEOPLE = [
  [-1, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 1],
  [1, 1],
  [1, 1],
  [2, 2],
  [2, 2],
  [3, 3],
  [3, 3],
];

const outputText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartNodes = text.roles.map((label, i) => ({
  id: \`p\${i}\`,
  label,
  group: \`d\${PEOPLE[i][1]}\`,
}));
const chartEdges = PEOPLE.flatMap(([manager], i) =>
  manager < 0 ? [] : [{ source: \`p\${manager}\`, target: \`p\${i}\` }],
);
const chartGroups = text.departments.map((name, i) => ({ id: \`d\${i}\`, name }));
const onToggle = (event: Event) => {
  const { id, collapsed } = (event as CustomEvent<GraphToggleEvent>).detail;
  outputText.value = text[collapsed ? "collapsed" : "expanded"].replace(
    "{name}",
    text.roles[Number(id.slice(1))],
  );
};

onMounted(() => {
  outputText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <minerva-tree-chart
      id="org"
      layout="org"
      height="460"
      :nodes.prop="chartNodes"
      :edges.prop="chartEdges"
      :groups.prop="chartGroups"
      @minerva-toggle="onToggle"
    ></minerva-tree-chart>
    <output id="org-status" aria-live="polite">{{ outputText }}</output>
  </div>
</template>
`,angular:`// tree-chart-org.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// An org chart: cards grouped by department, the leaf teams stacked under
// their manager; clicking a manager collapses / expands the team and
// minerva-toggle reports it.
import type {
  GraphToggleEvent,
  MinervaTreeChart,
} from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    roles: [
      "Chief executive",
      "Technology",
      "Finance",
      "Operations",
      "Web team",
      "Mobile team",
      "Platform team",
      "Accounting",
      "Treasury",
      "Customer support",
      "Logistics",
    ],
    departments: ["Executive", "Engineering", "Finance", "Operations"],
    hint: "Click a manager to collapse or expand the team",
    collapsed: "{name}: collapsed",
    expanded: "{name}: expanded",
  },
  zh: {
    roles: [
      "首席执行官",
      "技术",
      "财务",
      "运营",
      "Web 团队",
      "移动团队",
      "平台团队",
      "会计",
      "资金管理",
      "客户支持",
      "物流",
    ],
    departments: ["管理层", "研发", "财务", "运营"],
    hint: "点击管理者以折叠或展开团队",
    collapsed: "{name}：已折叠",
    expanded: "{name}：已展开",
  },
  ja: {
    roles: [
      "最高経営責任者",
      "技術",
      "財務",
      "運営",
      "Web チーム",
      "モバイルチーム",
      "プラットフォームチーム",
      "経理",
      "資金管理",
      "カスタマーサポート",
      "物流",
    ],
    departments: ["経営", "エンジニアリング", "財務", "運営"],
    hint: "マネージャーをクリックするとチームを折りたたみ / 展開します",
    collapsed: "{name}: 折りたたみ",
    expanded: "{name}: 展開",
  },
  fr: {
    roles: [
      "Direction générale",
      "Technique",
      "Finance",
      "Opérations",
      "Équipe web",
      "Équipe mobile",
      "Équipe plateforme",
      "Comptabilité",
      "Trésorerie",
      "Support client",
      "Logistique",
    ],
    departments: ["Direction", "Ingénierie", "Finance", "Opérations"],
    hint: "Cliquez sur un responsable pour replier ou déplier l'équipe",
    collapsed: "{name} : replié",
    expanded: "{name} : déplié",
  },
};
// manager (index in TEXT.roles, -1: the root) and department of each role
const PEOPLE = [
  [-1, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 1],
  [1, 1],
  [1, 1],
  [2, 2],
  [2, 2],
  [3, 3],
  [3, 3],
];

@Component({
  selector: "app-tree-chart-org",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px; width: 100%">
      <minerva-tree-chart
        id="org"
        layout="org"
        height="460"
        [nodes]="chartNodes"
        [edges]="chartEdges"
        [groups]="chartGroups"
        (minerva-toggle)="onToggle($event)"
      ></minerva-tree-chart>
      <output id="org-status" aria-live="polite">{{ outputText }}</output>
    </div>
  \`,
})
export class TreeChartOrgComponent implements AfterViewInit {
  outputText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartNodes = this.text.roles.map((label, i) => ({
    id: \`p\${i}\`,
    label,
    group: \`d\${PEOPLE[i][1]}\`,
  }));
  chartEdges = PEOPLE.flatMap(([manager], i) =>
    manager < 0 ? [] : [{ source: \`p\${manager}\`, target: \`p\${i}\` }],
  );
  chartGroups = this.text.departments.map((name, i) => ({ id: \`d\${i}\`, name }));
  onToggle = (event: Event) => {
    const { id, collapsed } = (event as CustomEvent<GraphToggleEvent>).detail;
    this.outputText = this.text[collapsed ? "collapsed" : "expanded"].replace(
      "{name}",
      this.text.roles[Number(id.slice(1))],
    );
  };

  ngAfterViewInit(): void {
    this.outputText = this.text.hint;
  }
}
`,svelte:`<!-- TreeChartOrg.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // An org chart: cards grouped by department, the leaf teams stacked under
  // their manager; clicking a manager collapses / expands the team and
  // minerva-toggle reports it.

  import type {
    GraphToggleEvent,
    MinervaTreeChart,
  } from "minerva-design/web-components/graph";

  const TEXT = {
    en: {
      roles: [
        "Chief executive",
        "Technology",
        "Finance",
        "Operations",
        "Web team",
        "Mobile team",
        "Platform team",
        "Accounting",
        "Treasury",
        "Customer support",
        "Logistics",
      ],
      departments: ["Executive", "Engineering", "Finance", "Operations"],
      hint: "Click a manager to collapse or expand the team",
      collapsed: "{name}: collapsed",
      expanded: "{name}: expanded",
    },
    zh: {
      roles: [
        "首席执行官",
        "技术",
        "财务",
        "运营",
        "Web 团队",
        "移动团队",
        "平台团队",
        "会计",
        "资金管理",
        "客户支持",
        "物流",
      ],
      departments: ["管理层", "研发", "财务", "运营"],
      hint: "点击管理者以折叠或展开团队",
      collapsed: "{name}：已折叠",
      expanded: "{name}：已展开",
    },
    ja: {
      roles: [
        "最高経営責任者",
        "技術",
        "財務",
        "運営",
        "Web チーム",
        "モバイルチーム",
        "プラットフォームチーム",
        "経理",
        "資金管理",
        "カスタマーサポート",
        "物流",
      ],
      departments: ["経営", "エンジニアリング", "財務", "運営"],
      hint: "マネージャーをクリックするとチームを折りたたみ / 展開します",
      collapsed: "{name}: 折りたたみ",
      expanded: "{name}: 展開",
    },
    fr: {
      roles: [
        "Direction générale",
        "Technique",
        "Finance",
        "Opérations",
        "Équipe web",
        "Équipe mobile",
        "Équipe plateforme",
        "Comptabilité",
        "Trésorerie",
        "Support client",
        "Logistique",
      ],
      departments: ["Direction", "Ingénierie", "Finance", "Opérations"],
      hint: "Cliquez sur un responsable pour replier ou déplier l'équipe",
      collapsed: "{name} : replié",
      expanded: "{name} : déplié",
    },
  };
  // manager (index in TEXT.roles, -1: the root) and department of each role
  const PEOPLE = [
    [-1, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 1],
    [1, 1],
    [1, 1],
    [2, 2],
    [2, 2],
    [3, 3],
    [3, 3],
  ];

  let outputText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartNodes = text.roles.map((label, i) => ({
    id: \`p\${i}\`,
    label,
    group: \`d\${PEOPLE[i][1]}\`,
  }));
  const chartEdges = PEOPLE.flatMap(([manager], i) =>
    manager < 0 ? [] : [{ source: \`p\${manager}\`, target: \`p\${i}\` }],
  );
  const chartGroups = text.departments.map((name, i) => ({ id: \`d\${i}\`, name }));
  const onToggle = (event: Event) => {
    const { id, collapsed } = (event as CustomEvent<GraphToggleEvent>).detail;
    outputText = text[collapsed ? "collapsed" : "expanded"].replace(
      "{name}",
      text.roles[Number(id.slice(1))],
    );
  };

  onMount(() => {
    outputText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px; width: 100%">
  <minerva-tree-chart
    id="org"
    layout="org"
    height="460"
    nodes={chartNodes}
    edges={chartEdges}
    groups={chartGroups}
    onminerva-toggle={onToggle}
  ></minerva-tree-chart>
  <output id="org-status" aria-live="polite">{outputText}</output>
</div>
`,solid:`// TreeChartOrg.tsx

import { createSignal, onMount } from "solid-js";

// An org chart: cards grouped by department, the leaf teams stacked under
// their manager; clicking a manager collapses / expands the team and
// minerva-toggle reports it.
import type {
  GraphToggleEvent,
  MinervaTreeChart,
} from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    roles: [
      "Chief executive",
      "Technology",
      "Finance",
      "Operations",
      "Web team",
      "Mobile team",
      "Platform team",
      "Accounting",
      "Treasury",
      "Customer support",
      "Logistics",
    ],
    departments: ["Executive", "Engineering", "Finance", "Operations"],
    hint: "Click a manager to collapse or expand the team",
    collapsed: "{name}: collapsed",
    expanded: "{name}: expanded",
  },
  zh: {
    roles: [
      "首席执行官",
      "技术",
      "财务",
      "运营",
      "Web 团队",
      "移动团队",
      "平台团队",
      "会计",
      "资金管理",
      "客户支持",
      "物流",
    ],
    departments: ["管理层", "研发", "财务", "运营"],
    hint: "点击管理者以折叠或展开团队",
    collapsed: "{name}：已折叠",
    expanded: "{name}：已展开",
  },
  ja: {
    roles: [
      "最高経営責任者",
      "技術",
      "財務",
      "運営",
      "Web チーム",
      "モバイルチーム",
      "プラットフォームチーム",
      "経理",
      "資金管理",
      "カスタマーサポート",
      "物流",
    ],
    departments: ["経営", "エンジニアリング", "財務", "運営"],
    hint: "マネージャーをクリックするとチームを折りたたみ / 展開します",
    collapsed: "{name}: 折りたたみ",
    expanded: "{name}: 展開",
  },
  fr: {
    roles: [
      "Direction générale",
      "Technique",
      "Finance",
      "Opérations",
      "Équipe web",
      "Équipe mobile",
      "Équipe plateforme",
      "Comptabilité",
      "Trésorerie",
      "Support client",
      "Logistique",
    ],
    departments: ["Direction", "Ingénierie", "Finance", "Opérations"],
    hint: "Cliquez sur un responsable pour replier ou déplier l'équipe",
    collapsed: "{name} : replié",
    expanded: "{name} : déplié",
  },
};
// manager (index in TEXT.roles, -1: the root) and department of each role
const PEOPLE = [
  [-1, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 1],
  [1, 1],
  [1, 1],
  [2, 2],
  [2, 2],
  [3, 3],
  [3, 3],
];

export default function TreeChartOrg() {
  const [outputText, setOutputText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartNodes = text.roles.map((label, i) => ({
    id: \`p\${i}\`,
    label,
    group: \`d\${PEOPLE[i][1]}\`,
  }));
  const chartEdges = PEOPLE.flatMap(([manager], i) =>
    manager < 0 ? [] : [{ source: \`p\${manager}\`, target: \`p\${i}\` }],
  );
  const chartGroups = text.departments.map((name, i) => ({
    id: \`d\${i}\`,
    name,
  }));
  const onToggle = (event: Event) => {
    const { id, collapsed } = (event as CustomEvent<GraphToggleEvent>).detail;
    setOutputText(
      text[collapsed ? "collapsed" : "expanded"].replace(
        "{name}",
        text.roles[Number(id.slice(1))],
      ),
    );
  };

  onMount(() => {
    setOutputText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px; width: 100%">
      <minerva-tree-chart
        id="org"
        layout="org"
        height="460"
        prop:nodes={chartNodes}
        prop:edges={chartEdges}
        prop:groups={chartGroups}
        on:minerva-toggle={onToggle}
      ></minerva-tree-chart>
      <output id="org-status" aria-live="polite">
        {outputText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px; width: 100%">
  <minerva-tree-chart id="org" layout="org" height="460"></minerva-tree-chart>
  <output id="org-status" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/graph";

  // An org chart: cards grouped by department, the leaf teams stacked under
  // their manager; clicking a manager collapses / expands the team and
  // minerva-toggle reports it.
  const TEXT = {
    en: {
      roles: [
        "Chief executive",
        "Technology",
        "Finance",
        "Operations",
        "Web team",
        "Mobile team",
        "Platform team",
        "Accounting",
        "Treasury",
        "Customer support",
        "Logistics",
      ],
      departments: ["Executive", "Engineering", "Finance", "Operations"],
      hint: "Click a manager to collapse or expand the team",
      collapsed: "{name}: collapsed",
      expanded: "{name}: expanded",
    },
    zh: {
      roles: [
        "首席执行官",
        "技术",
        "财务",
        "运营",
        "Web 团队",
        "移动团队",
        "平台团队",
        "会计",
        "资金管理",
        "客户支持",
        "物流",
      ],
      departments: ["管理层", "研发", "财务", "运营"],
      hint: "点击管理者以折叠或展开团队",
      collapsed: "{name}：已折叠",
      expanded: "{name}：已展开",
    },
    ja: {
      roles: [
        "最高経営責任者",
        "技術",
        "財務",
        "運営",
        "Web チーム",
        "モバイルチーム",
        "プラットフォームチーム",
        "経理",
        "資金管理",
        "カスタマーサポート",
        "物流",
      ],
      departments: ["経営", "エンジニアリング", "財務", "運営"],
      hint: "マネージャーをクリックするとチームを折りたたみ / 展開します",
      collapsed: "{name}: 折りたたみ",
      expanded: "{name}: 展開",
    },
    fr: {
      roles: [
        "Direction générale",
        "Technique",
        "Finance",
        "Opérations",
        "Équipe web",
        "Équipe mobile",
        "Équipe plateforme",
        "Comptabilité",
        "Trésorerie",
        "Support client",
        "Logistique",
      ],
      departments: ["Direction", "Ingénierie", "Finance", "Opérations"],
      hint: "Cliquez sur un responsable pour replier ou déplier l'équipe",
      collapsed: "{name} : replié",
      expanded: "{name} : déplié",
    },
  };
  // manager (index in TEXT.roles, -1: the root) and department of each role
  const PEOPLE = [
    [-1, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 1],
    [1, 1],
    [1, 1],
    [2, 2],
    [2, 2],
    [3, 3],
    [3, 3],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#org");
  const output = document.querySelector("#org-status");
  chart.nodes = text.roles.map((label, i) => ({
    id: \`p\${i}\`,
    label,
    group: \`d\${PEOPLE[i][1]}\`,
  }));
  chart.edges = PEOPLE.flatMap(([manager], i) =>
    manager < 0 ? [] : [{ source: \`p\${manager}\`, target: \`p\${i}\` }],
  );
  chart.groups = text.departments.map((name, i) => ({ id: \`d\${i}\`, name }));
  output.textContent = text.hint;
  const onToggle = (event) => {
    const { id, collapsed } = event.detail;
    output.textContent = text[collapsed ? "collapsed" : "expanded"].replace(
      "{name}",
      text.roles[Number(id.slice(1))],
    );
  };
  chart.addEventListener("minerva-toggle", onToggle);
<\/script>
`}})))()}n();export{t as default};