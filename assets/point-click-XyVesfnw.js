import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- QuadrantChartPointClick.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// minerva-point-click gives the clicked point, minerva-quadrant-click the
// quadrant of a click on the empty area (\`reverse-x\`: urgent on the left).

import type {
  MinervaQuadrantChart,
  QuadrantCorner,
  QuadrantPoint,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    urgency: "Urgency",
    importance: "Importance",
    hint: "Click a task or a quadrant",
    corners: {
      topLeft: "Do first",
      topRight: "Schedule",
      bottomLeft: "Delegate",
      bottomRight: "Eliminate",
    },
    tasks: ["Bug fix", "Roadmap", "Email", "Newsletter", "Interview"],
  },
  zh: {
    urgency: "紧急程度",
    importance: "重要程度",
    hint: "点击任务或象限",
    corners: {
      topLeft: "立即处理",
      topRight: "计划安排",
      bottomLeft: "委派他人",
      bottomRight: "放弃",
    },
    tasks: ["修复缺陷", "路线图", "邮件", "简报", "面试"],
  },
  ja: {
    urgency: "緊急度",
    importance: "重要度",
    hint: "タスクまたは象限をクリックします",
    corners: {
      topLeft: "すぐ実行",
      topRight: "計画",
      bottomLeft: "委任",
      bottomRight: "削除",
    },
    tasks: ["バグ修正", "ロードマップ", "メール", "ニュースレター", "面接"],
  },
  fr: {
    urgency: "Urgence",
    importance: "Importance",
    hint: "Cliquez sur une tâche ou un quadrant",
    corners: {
      topLeft: "À faire",
      topRight: "À planifier",
      bottomLeft: "À déléguer",
      bottomRight: "À abandonner",
    },
    tasks: [
      "Correctif",
      "Feuille de route",
      "E-mails",
      "Newsletter",
      "Entretien",
    ],
  },
};

const SCORES: [number, number][] = [
  [9, 8.5],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
  [6.5, 7],
];

const taskText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartPoints = SCORES.map(([x, y], i) => ({ x, y, label: text.tasks[i] }));
const chartQuadrants = {
  topLeft: { label: text.corners.topLeft },
  topRight: { label: text.corners.topRight },
  bottomLeft: { label: text.corners.bottomLeft },
  bottomRight: { label: text.corners.bottomRight },
};
const chartXLabel = text.urgency;
const chartYLabel = text.importance;
const onPoint = (event: Event) => {
  const { point } = (event as CustomEvent<{ point: QuadrantPoint }>).detail;
  taskText.value = \`\${point.label}\`;
};
const onQuadrant = (event: Event) => {
  const { quadrant } = (event as CustomEvent<{ quadrant: QuadrantCorner }>)
    .detail;
  taskText.value = text.corners[quadrant];
};

onMounted(() => {
  taskText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-quadrant-chart
      id="tasks"
      reverse-x
      height="320"
      :points.prop="chartPoints"
      :quadrants.prop="chartQuadrants"
      :xLabel.prop="chartXLabel"
      :yLabel.prop="chartYLabel"
      @minerva-point-click="onPoint"
      @minerva-quadrant-click="onQuadrant"
    ></minerva-quadrant-chart>
    <output id="task" aria-live="polite">{{ taskText }}</output>
  </div>
</template>
`,angular:`// quadrant-chart-point-click.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// minerva-point-click gives the clicked point, minerva-quadrant-click the
// quadrant of a click on the empty area (\`reverse-x\`: urgent on the left).
import type {
  MinervaQuadrantChart,
  QuadrantCorner,
  QuadrantPoint,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    urgency: "Urgency",
    importance: "Importance",
    hint: "Click a task or a quadrant",
    corners: {
      topLeft: "Do first",
      topRight: "Schedule",
      bottomLeft: "Delegate",
      bottomRight: "Eliminate",
    },
    tasks: ["Bug fix", "Roadmap", "Email", "Newsletter", "Interview"],
  },
  zh: {
    urgency: "紧急程度",
    importance: "重要程度",
    hint: "点击任务或象限",
    corners: {
      topLeft: "立即处理",
      topRight: "计划安排",
      bottomLeft: "委派他人",
      bottomRight: "放弃",
    },
    tasks: ["修复缺陷", "路线图", "邮件", "简报", "面试"],
  },
  ja: {
    urgency: "緊急度",
    importance: "重要度",
    hint: "タスクまたは象限をクリックします",
    corners: {
      topLeft: "すぐ実行",
      topRight: "計画",
      bottomLeft: "委任",
      bottomRight: "削除",
    },
    tasks: ["バグ修正", "ロードマップ", "メール", "ニュースレター", "面接"],
  },
  fr: {
    urgency: "Urgence",
    importance: "Importance",
    hint: "Cliquez sur une tâche ou un quadrant",
    corners: {
      topLeft: "À faire",
      topRight: "À planifier",
      bottomLeft: "À déléguer",
      bottomRight: "À abandonner",
    },
    tasks: [
      "Correctif",
      "Feuille de route",
      "E-mails",
      "Newsletter",
      "Entretien",
    ],
  },
};

const SCORES: [number, number][] = [
  [9, 8.5],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
  [6.5, 7],
];

@Component({
  selector: "app-quadrant-chart-point-click",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-quadrant-chart
        id="tasks"
        reverse-x
        height="320"
        [points]="chartPoints"
        [quadrants]="chartQuadrants"
        [xLabel]="chartXLabel"
        [yLabel]="chartYLabel"
        (minerva-point-click)="onPoint($event)"
        (minerva-quadrant-click)="onQuadrant($event)"
      ></minerva-quadrant-chart>
      <output id="task" aria-live="polite">{{ taskText }}</output>
    </div>
  \`,
})
export class QuadrantChartPointClickComponent implements AfterViewInit {
  taskText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartPoints = SCORES.map(([x, y], i) => ({
    x,
    y,
    label: this.text.tasks[i],
  }));
  chartQuadrants = {
    topLeft: { label: this.text.corners.topLeft },
    topRight: { label: this.text.corners.topRight },
    bottomLeft: { label: this.text.corners.bottomLeft },
    bottomRight: { label: this.text.corners.bottomRight },
  };
  chartXLabel = this.text.urgency;
  chartYLabel = this.text.importance;
  onPoint = (event: Event) => {
    const { point } = (event as CustomEvent<{ point: QuadrantPoint }>).detail;
    this.taskText = \`\${point.label}\`;
  };
  onQuadrant = (event: Event) => {
    const { quadrant } = (event as CustomEvent<{ quadrant: QuadrantCorner }>)
      .detail;
    this.taskText = this.text.corners[quadrant];
  };

  ngAfterViewInit(): void {
    this.taskText = this.text.hint;
  }
}
`,svelte:`<!-- QuadrantChartPointClick.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // minerva-point-click gives the clicked point, minerva-quadrant-click the
  // quadrant of a click on the empty area (\`reverse-x\`: urgent on the left).

  import type {
    MinervaQuadrantChart,
    QuadrantCorner,
    QuadrantPoint,
  } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      urgency: "Urgency",
      importance: "Importance",
      hint: "Click a task or a quadrant",
      corners: {
        topLeft: "Do first",
        topRight: "Schedule",
        bottomLeft: "Delegate",
        bottomRight: "Eliminate",
      },
      tasks: ["Bug fix", "Roadmap", "Email", "Newsletter", "Interview"],
    },
    zh: {
      urgency: "紧急程度",
      importance: "重要程度",
      hint: "点击任务或象限",
      corners: {
        topLeft: "立即处理",
        topRight: "计划安排",
        bottomLeft: "委派他人",
        bottomRight: "放弃",
      },
      tasks: ["修复缺陷", "路线图", "邮件", "简报", "面试"],
    },
    ja: {
      urgency: "緊急度",
      importance: "重要度",
      hint: "タスクまたは象限をクリックします",
      corners: {
        topLeft: "すぐ実行",
        topRight: "計画",
        bottomLeft: "委任",
        bottomRight: "削除",
      },
      tasks: ["バグ修正", "ロードマップ", "メール", "ニュースレター", "面接"],
    },
    fr: {
      urgency: "Urgence",
      importance: "Importance",
      hint: "Cliquez sur une tâche ou un quadrant",
      corners: {
        topLeft: "À faire",
        topRight: "À planifier",
        bottomLeft: "À déléguer",
        bottomRight: "À abandonner",
      },
      tasks: [
        "Correctif",
        "Feuille de route",
        "E-mails",
        "Newsletter",
        "Entretien",
      ],
    },
  };

  const SCORES: [number, number][] = [
    [9, 8.5],
    [2.5, 9],
    [8, 3],
    [2, 2.5],
    [6.5, 7],
  ];

  let taskText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartPoints = SCORES.map(([x, y], i) => ({ x, y, label: text.tasks[i] }));
  const chartQuadrants = {
    topLeft: { label: text.corners.topLeft },
    topRight: { label: text.corners.topRight },
    bottomLeft: { label: text.corners.bottomLeft },
    bottomRight: { label: text.corners.bottomRight },
  };
  const chartXLabel = text.urgency;
  const chartYLabel = text.importance;
  const onPoint = (event: Event) => {
    const { point } = (event as CustomEvent<{ point: QuadrantPoint }>).detail;
    taskText = \`\${point.label}\`;
  };
  const onQuadrant = (event: Event) => {
    const { quadrant } = (event as CustomEvent<{ quadrant: QuadrantCorner }>)
      .detail;
    taskText = text.corners[quadrant];
  };

  onMount(() => {
    taskText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-quadrant-chart
    id="tasks"
    reverse-x
    height="320"
    points={chartPoints}
    quadrants={chartQuadrants}
    xLabel={chartXLabel}
    yLabel={chartYLabel}
    onminerva-point-click={onPoint}
    onminerva-quadrant-click={onQuadrant}
  ></minerva-quadrant-chart>
  <output id="task" aria-live="polite">{taskText}</output>
</div>
`,solid:`// QuadrantChartPointClick.tsx

import { createSignal, onMount } from "solid-js";

// minerva-point-click gives the clicked point, minerva-quadrant-click the
// quadrant of a click on the empty area (\`reverse-x\`: urgent on the left).
import type {
  MinervaQuadrantChart,
  QuadrantCorner,
  QuadrantPoint,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    urgency: "Urgency",
    importance: "Importance",
    hint: "Click a task or a quadrant",
    corners: {
      topLeft: "Do first",
      topRight: "Schedule",
      bottomLeft: "Delegate",
      bottomRight: "Eliminate",
    },
    tasks: ["Bug fix", "Roadmap", "Email", "Newsletter", "Interview"],
  },
  zh: {
    urgency: "紧急程度",
    importance: "重要程度",
    hint: "点击任务或象限",
    corners: {
      topLeft: "立即处理",
      topRight: "计划安排",
      bottomLeft: "委派他人",
      bottomRight: "放弃",
    },
    tasks: ["修复缺陷", "路线图", "邮件", "简报", "面试"],
  },
  ja: {
    urgency: "緊急度",
    importance: "重要度",
    hint: "タスクまたは象限をクリックします",
    corners: {
      topLeft: "すぐ実行",
      topRight: "計画",
      bottomLeft: "委任",
      bottomRight: "削除",
    },
    tasks: ["バグ修正", "ロードマップ", "メール", "ニュースレター", "面接"],
  },
  fr: {
    urgency: "Urgence",
    importance: "Importance",
    hint: "Cliquez sur une tâche ou un quadrant",
    corners: {
      topLeft: "À faire",
      topRight: "À planifier",
      bottomLeft: "À déléguer",
      bottomRight: "À abandonner",
    },
    tasks: [
      "Correctif",
      "Feuille de route",
      "E-mails",
      "Newsletter",
      "Entretien",
    ],
  },
};

const SCORES: [number, number][] = [
  [9, 8.5],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
  [6.5, 7],
];

export default function QuadrantChartPointClick() {
  const [taskText, setTaskText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartPoints = SCORES.map(([x, y], i) => ({
    x,
    y,
    label: text.tasks[i],
  }));
  const chartQuadrants = {
    topLeft: { label: text.corners.topLeft },
    topRight: { label: text.corners.topRight },
    bottomLeft: { label: text.corners.bottomLeft },
    bottomRight: { label: text.corners.bottomRight },
  };
  const chartXLabel = text.urgency;
  const chartYLabel = text.importance;
  const onPoint = (event: Event) => {
    const { point } = (event as CustomEvent<{ point: QuadrantPoint }>).detail;
    setTaskText(\`\${point.label}\`);
  };
  const onQuadrant = (event: Event) => {
    const { quadrant } = (event as CustomEvent<{ quadrant: QuadrantCorner }>)
      .detail;
    setTaskText(text.corners[quadrant]);
  };

  onMount(() => {
    setTaskText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-quadrant-chart
        id="tasks"
        reverse-x
        height="320"
        prop:points={chartPoints}
        prop:quadrants={chartQuadrants}
        prop:xLabel={chartXLabel}
        prop:yLabel={chartYLabel}
        on:minerva-point-click={onPoint}
        on:minerva-quadrant-click={onQuadrant}
      ></minerva-quadrant-chart>
      <output id="task" aria-live="polite">
        {taskText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-quadrant-chart
    id="tasks"
    reverse-x
    height="320"
  ></minerva-quadrant-chart>
  <output id="task" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // minerva-point-click gives the clicked point, minerva-quadrant-click the
  // quadrant of a click on the empty area (\`reverse-x\`: urgent on the left).
  const TEXT = {
    en: {
      urgency: "Urgency",
      importance: "Importance",
      hint: "Click a task or a quadrant",
      corners: {
        topLeft: "Do first",
        topRight: "Schedule",
        bottomLeft: "Delegate",
        bottomRight: "Eliminate",
      },
      tasks: ["Bug fix", "Roadmap", "Email", "Newsletter", "Interview"],
    },
    zh: {
      urgency: "紧急程度",
      importance: "重要程度",
      hint: "点击任务或象限",
      corners: {
        topLeft: "立即处理",
        topRight: "计划安排",
        bottomLeft: "委派他人",
        bottomRight: "放弃",
      },
      tasks: ["修复缺陷", "路线图", "邮件", "简报", "面试"],
    },
    ja: {
      urgency: "緊急度",
      importance: "重要度",
      hint: "タスクまたは象限をクリックします",
      corners: {
        topLeft: "すぐ実行",
        topRight: "計画",
        bottomLeft: "委任",
        bottomRight: "削除",
      },
      tasks: ["バグ修正", "ロードマップ", "メール", "ニュースレター", "面接"],
    },
    fr: {
      urgency: "Urgence",
      importance: "Importance",
      hint: "Cliquez sur une tâche ou un quadrant",
      corners: {
        topLeft: "À faire",
        topRight: "À planifier",
        bottomLeft: "À déléguer",
        bottomRight: "À abandonner",
      },
      tasks: [
        "Correctif",
        "Feuille de route",
        "E-mails",
        "Newsletter",
        "Entretien",
      ],
    },
  };

  const SCORES = [
    [9, 8.5],
    [2.5, 9],
    [8, 3],
    [2, 2.5],
    [6.5, 7],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#tasks");
  const task = document.querySelector("#task");
  chart.points = SCORES.map(([x, y], i) => ({ x, y, label: text.tasks[i] }));
  chart.quadrants = {
    topLeft: { label: text.corners.topLeft },
    topRight: { label: text.corners.topRight },
    bottomLeft: { label: text.corners.bottomLeft },
    bottomRight: { label: text.corners.bottomRight },
  };
  chart.xLabel = text.urgency;
  chart.yLabel = text.importance;
  task.textContent = text.hint;
  const onPoint = (event) => {
    const { point } = event.detail;
    task.textContent = \`\${point.label}\`;
  };
  const onQuadrant = (event) => {
    const { quadrant } = event.detail;
    task.textContent = text.corners[quadrant];
  };
  chart.addEventListener("minerva-point-click", onPoint);
  chart.addEventListener("minerva-quadrant-click", onQuadrant);
<\/script>
`}})))()}n();export{t as default};