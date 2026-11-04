import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- QuadrantChartTriage.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// Badges ("Q1"), a second line per quadrant and the number of tasks after
// each title are drawn by the chart; \`selectedIndex\` rings the clicked task
// and minerva-point-drop moves it (update \`points\`).

import type {
  MinervaQuadrantChart,
  QuadrantCorner,
  QuadrantPoint,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    hint: "Click a task to select it, drag it to another quadrant",
    selected: "Selected: {task}",
    moved: "{task} moved to “{quadrant}”",
    count: (n: number) => (n === 1 ? "1 task" : \`\${n} tasks\`),
    corners: {
      topLeft: ["Do first", "Do it now"],
      topRight: ["Schedule", "Plan a time"],
      bottomLeft: ["Delegate", "Hand it off"],
      bottomRight: ["Eliminate", "Drop it"],
    },
    tasks: ["Bug fix", "Tax filing", "Roadmap", "Email", "Newsletter"],
  },
  zh: {
    hint: "点击任务以选中，拖到其他象限即可移动",
    selected: "已选中：{task}",
    moved: "{task} 已移到“{quadrant}”",
    count: (n: number) => \`\${n} 项\`,
    corners: {
      topLeft: ["立即处理", "立即做"],
      topRight: ["计划安排", "安排时间"],
      bottomLeft: ["委派他人", "交给别人"],
      bottomRight: ["放弃", "不做"],
    },
    tasks: ["修复缺陷", "报税", "路线图", "邮件", "简报"],
  },
  ja: {
    hint: "タスクをクリックで選択、別の象限へドラッグで移動します",
    selected: "選択中：{task}",
    moved: "{task} を「{quadrant}」に移動しました",
    count: (n: number) => \`\${n} 件\`,
    corners: {
      topLeft: ["すぐ実行", "今すぐやる"],
      topRight: ["計画", "時間を確保"],
      bottomLeft: ["委任", "人に任せる"],
      bottomRight: ["削除", "やらない"],
    },
    tasks: ["バグ修正", "確定申告", "ロードマップ", "メール", "ニュースレター"],
  },
  fr: {
    hint: "Cliquez sur une tâche pour la sélectionner, glissez-la vers un autre quadrant",
    selected: "Sélection : {task}",
    moved: "{task} déplacée vers « {quadrant} »",
    count: (n: number) => (n <= 1 ? \`\${n} tâche\` : \`\${n} tâches\`),
    corners: {
      topLeft: ["À faire", "Maintenant"],
      topRight: ["À planifier", "Réserver un créneau"],
      bottomLeft: ["À déléguer", "Confier"],
      bottomRight: ["À abandonner", "Laisser tomber"],
    },
    tasks: ["Correctif", "Impôts", "Feuille de route", "E-mails", "Newsletter"],
  },
};

const BADGES: Record<QuadrantCorner, string> = {
  topLeft: "Q1",
  topRight: "Q2",
  bottomLeft: "Q3",
  bottomRight: "Q4",
};

const SCORES: [number, number][] = [
  [9, 8.5],
  [7, 7],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
];

const chart = ref<MinervaQuadrantChart>();
const statusText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartPoints = SCORES.map(([x, y], i) => ({ x, y, label: text.tasks[i] }));
const chartQuadrants = Object.fromEntries(
  (Object.keys(BADGES) as QuadrantCorner[]).map((corner) => [
    corner,
    {
      badge: BADGES[corner],
      label: text.corners[corner][0],
      description: text.corners[corner][1],
    },
  ]),
);
// a function (property only) writes the count; the attribute shows the number
const chartShowCounts = (count) => text.count(count);
const onClick = (event: Event) => {
  const { point, index } = (
    event as CustomEvent<{ point: QuadrantPoint; index: number }>
  ).detail;
  chart.value!.selectedIndex = index;
  statusText.value = text.selected.replace("{task}", \`\${point.label}\`);
};
const onDrop = (event: Event) => {
  const { point, index, x, y, quadrant } = (
    event as CustomEvent<{
      point: QuadrantPoint;
      index: number;
      x: number;
      y: number;
      quadrant: QuadrantCorner;
    }>
  ).detail;
  chart.value!.points = chart.value!.points!.map((p, i) =>
    i === index ? { ...p, x, y } : p,
  );
  chart.value!.selectedIndex = index;
  statusText.value = text.moved
    .replace("{task}", \`\${point.label}\`)
    .replace("{quadrant}", text.corners[quadrant][0]);
};

onMounted(() => {
  statusText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-quadrant-chart
      id="triage"
      reverse-x
      hide-ticks
      show-counts
      drag-points
      height="360"
      ref="chart"
      :points.prop="chartPoints"
      :quadrants.prop="chartQuadrants"
      :showCounts.prop="chartShowCounts"
      @minerva-point-click="onClick"
      @minerva-point-drop="onDrop"
    ></minerva-quadrant-chart>
    <output id="triage-status" aria-live="polite">{{ statusText }}</output>
  </div>
</template>
`,angular:`// quadrant-chart-triage.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";

// Badges ("Q1"), a second line per quadrant and the number of tasks after
// each title are drawn by the chart; \`selectedIndex\` rings the clicked task
// and minerva-point-drop moves it (update \`points\`).
import type {
  MinervaQuadrantChart,
  QuadrantCorner,
  QuadrantPoint,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    hint: "Click a task to select it, drag it to another quadrant",
    selected: "Selected: {task}",
    moved: "{task} moved to “{quadrant}”",
    count: (n: number) => (n === 1 ? "1 task" : \`\${n} tasks\`),
    corners: {
      topLeft: ["Do first", "Do it now"],
      topRight: ["Schedule", "Plan a time"],
      bottomLeft: ["Delegate", "Hand it off"],
      bottomRight: ["Eliminate", "Drop it"],
    },
    tasks: ["Bug fix", "Tax filing", "Roadmap", "Email", "Newsletter"],
  },
  zh: {
    hint: "点击任务以选中，拖到其他象限即可移动",
    selected: "已选中：{task}",
    moved: "{task} 已移到“{quadrant}”",
    count: (n: number) => \`\${n} 项\`,
    corners: {
      topLeft: ["立即处理", "立即做"],
      topRight: ["计划安排", "安排时间"],
      bottomLeft: ["委派他人", "交给别人"],
      bottomRight: ["放弃", "不做"],
    },
    tasks: ["修复缺陷", "报税", "路线图", "邮件", "简报"],
  },
  ja: {
    hint: "タスクをクリックで選択、別の象限へドラッグで移動します",
    selected: "選択中：{task}",
    moved: "{task} を「{quadrant}」に移動しました",
    count: (n: number) => \`\${n} 件\`,
    corners: {
      topLeft: ["すぐ実行", "今すぐやる"],
      topRight: ["計画", "時間を確保"],
      bottomLeft: ["委任", "人に任せる"],
      bottomRight: ["削除", "やらない"],
    },
    tasks: ["バグ修正", "確定申告", "ロードマップ", "メール", "ニュースレター"],
  },
  fr: {
    hint: "Cliquez sur une tâche pour la sélectionner, glissez-la vers un autre quadrant",
    selected: "Sélection : {task}",
    moved: "{task} déplacée vers « {quadrant} »",
    count: (n: number) => (n <= 1 ? \`\${n} tâche\` : \`\${n} tâches\`),
    corners: {
      topLeft: ["À faire", "Maintenant"],
      topRight: ["À planifier", "Réserver un créneau"],
      bottomLeft: ["À déléguer", "Confier"],
      bottomRight: ["À abandonner", "Laisser tomber"],
    },
    tasks: ["Correctif", "Impôts", "Feuille de route", "E-mails", "Newsletter"],
  },
};

const BADGES: Record<QuadrantCorner, string> = {
  topLeft: "Q1",
  topRight: "Q2",
  bottomLeft: "Q3",
  bottomRight: "Q4",
};

const SCORES: [number, number][] = [
  [9, 8.5],
  [7, 7],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
];

@Component({
  selector: "app-quadrant-chart-triage",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-quadrant-chart
        id="triage"
        reverse-x
        hide-ticks
        show-counts
        drag-points
        height="360"
        #chart
        [points]="chartPoints"
        [quadrants]="chartQuadrants"
        [showCounts]="chartShowCounts"
        (minerva-point-click)="onClick($event)"
        (minerva-point-drop)="onDrop($event)"
      ></minerva-quadrant-chart>
      <output id="triage-status" aria-live="polite">{{ statusText }}</output>
    </div>
  \`,
})
export class QuadrantChartTriageComponent implements AfterViewInit {
  @ViewChild("chart") chart!: ElementRef<MinervaQuadrantChart>;
  statusText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartPoints = SCORES.map(([x, y], i) => ({
    x,
    y,
    label: this.text.tasks[i],
  }));
  chartQuadrants = Object.fromEntries(
    (Object.keys(BADGES) as QuadrantCorner[]).map((corner) => [
      corner,
      {
        badge: BADGES[corner],
        label: this.text.corners[corner][0],
        description: this.text.corners[corner][1],
      },
    ]),
  );
  // a function (property only) writes the count; the attribute shows the number
  chartShowCounts = (count) => this.text.count(count);
  onClick = (event: Event) => {
    const { point, index } = (
      event as CustomEvent<{ point: QuadrantPoint; index: number }>
    ).detail;
    this.chart.nativeElement.selectedIndex = index;
    this.statusText = this.text.selected.replace("{task}", \`\${point.label}\`);
  };
  onDrop = (event: Event) => {
    const { point, index, x, y, quadrant } = (
      event as CustomEvent<{
        point: QuadrantPoint;
        index: number;
        x: number;
        y: number;
        quadrant: QuadrantCorner;
      }>
    ).detail;
    this.chart.nativeElement.points = this.chart.nativeElement.points!.map(
      (p, i) => (i === index ? { ...p, x, y } : p),
    );
    this.chart.nativeElement.selectedIndex = index;
    this.statusText = this.text.moved
      .replace("{task}", \`\${point.label}\`)
      .replace("{quadrant}", this.text.corners[quadrant][0]);
  };

  ngAfterViewInit(): void {
    this.statusText = this.text.hint;
  }
}
`,svelte:`<!-- QuadrantChartTriage.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // Badges ("Q1"), a second line per quadrant and the number of tasks after
  // each title are drawn by the chart; \`selectedIndex\` rings the clicked task
  // and minerva-point-drop moves it (update \`points\`).

  import type {
    MinervaQuadrantChart,
    QuadrantCorner,
    QuadrantPoint,
  } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      hint: "Click a task to select it, drag it to another quadrant",
      selected: "Selected: {task}",
      moved: "{task} moved to “{quadrant}”",
      count: (n: number) => (n === 1 ? "1 task" : \`\${n} tasks\`),
      corners: {
        topLeft: ["Do first", "Do it now"],
        topRight: ["Schedule", "Plan a time"],
        bottomLeft: ["Delegate", "Hand it off"],
        bottomRight: ["Eliminate", "Drop it"],
      },
      tasks: ["Bug fix", "Tax filing", "Roadmap", "Email", "Newsletter"],
    },
    zh: {
      hint: "点击任务以选中，拖到其他象限即可移动",
      selected: "已选中：{task}",
      moved: "{task} 已移到“{quadrant}”",
      count: (n: number) => \`\${n} 项\`,
      corners: {
        topLeft: ["立即处理", "立即做"],
        topRight: ["计划安排", "安排时间"],
        bottomLeft: ["委派他人", "交给别人"],
        bottomRight: ["放弃", "不做"],
      },
      tasks: ["修复缺陷", "报税", "路线图", "邮件", "简报"],
    },
    ja: {
      hint: "タスクをクリックで選択、別の象限へドラッグで移動します",
      selected: "選択中：{task}",
      moved: "{task} を「{quadrant}」に移動しました",
      count: (n: number) => \`\${n} 件\`,
      corners: {
        topLeft: ["すぐ実行", "今すぐやる"],
        topRight: ["計画", "時間を確保"],
        bottomLeft: ["委任", "人に任せる"],
        bottomRight: ["削除", "やらない"],
      },
      tasks: ["バグ修正", "確定申告", "ロードマップ", "メール", "ニュースレター"],
    },
    fr: {
      hint: "Cliquez sur une tâche pour la sélectionner, glissez-la vers un autre quadrant",
      selected: "Sélection : {task}",
      moved: "{task} déplacée vers « {quadrant} »",
      count: (n: number) => (n <= 1 ? \`\${n} tâche\` : \`\${n} tâches\`),
      corners: {
        topLeft: ["À faire", "Maintenant"],
        topRight: ["À planifier", "Réserver un créneau"],
        bottomLeft: ["À déléguer", "Confier"],
        bottomRight: ["À abandonner", "Laisser tomber"],
      },
      tasks: ["Correctif", "Impôts", "Feuille de route", "E-mails", "Newsletter"],
    },
  };

  const BADGES: Record<QuadrantCorner, string> = {
    topLeft: "Q1",
    topRight: "Q2",
    bottomLeft: "Q3",
    bottomRight: "Q4",
  };

  const SCORES: [number, number][] = [
    [9, 8.5],
    [7, 7],
    [2.5, 9],
    [8, 3],
    [2, 2.5],
  ];

  let chart: MinervaQuadrantChart;
  let statusText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartPoints = SCORES.map(([x, y], i) => ({ x, y, label: text.tasks[i] }));
  const chartQuadrants = Object.fromEntries(
    (Object.keys(BADGES) as QuadrantCorner[]).map((corner) => [
      corner,
      {
        badge: BADGES[corner],
        label: text.corners[corner][0],
        description: text.corners[corner][1],
      },
    ]),
  );
  // a function (property only) writes the count; the attribute shows the number
  const chartShowCounts = (count) => text.count(count);
  const onClick = (event: Event) => {
    const { point, index } = (
      event as CustomEvent<{ point: QuadrantPoint; index: number }>
    ).detail;
    chart.selectedIndex = index;
    statusText = text.selected.replace("{task}", \`\${point.label}\`);
  };
  const onDrop = (event: Event) => {
    const { point, index, x, y, quadrant } = (
      event as CustomEvent<{
        point: QuadrantPoint;
        index: number;
        x: number;
        y: number;
        quadrant: QuadrantCorner;
      }>
    ).detail;
    chart.points = chart.points!.map((p, i) =>
      i === index ? { ...p, x, y } : p,
    );
    chart.selectedIndex = index;
    statusText = text.moved
      .replace("{task}", \`\${point.label}\`)
      .replace("{quadrant}", text.corners[quadrant][0]);
  };

  onMount(() => {
    statusText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-quadrant-chart
    id="triage"
    reverse-x
    hide-ticks
    show-counts
    drag-points
    height="360"
    bind:this={chart}
    points={chartPoints}
    quadrants={chartQuadrants}
    showCounts={chartShowCounts}
    onminerva-point-click={onClick}
    onminerva-point-drop={onDrop}
  ></minerva-quadrant-chart>
  <output id="triage-status" aria-live="polite">{statusText}</output>
</div>
`,solid:`// QuadrantChartTriage.tsx

import { createSignal, onMount } from "solid-js";

// Badges ("Q1"), a second line per quadrant and the number of tasks after
// each title are drawn by the chart; \`selectedIndex\` rings the clicked task
// and minerva-point-drop moves it (update \`points\`).
import type {
  MinervaQuadrantChart,
  QuadrantCorner,
  QuadrantPoint,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    hint: "Click a task to select it, drag it to another quadrant",
    selected: "Selected: {task}",
    moved: "{task} moved to “{quadrant}”",
    count: (n: number) => (n === 1 ? "1 task" : \`\${n} tasks\`),
    corners: {
      topLeft: ["Do first", "Do it now"],
      topRight: ["Schedule", "Plan a time"],
      bottomLeft: ["Delegate", "Hand it off"],
      bottomRight: ["Eliminate", "Drop it"],
    },
    tasks: ["Bug fix", "Tax filing", "Roadmap", "Email", "Newsletter"],
  },
  zh: {
    hint: "点击任务以选中，拖到其他象限即可移动",
    selected: "已选中：{task}",
    moved: "{task} 已移到“{quadrant}”",
    count: (n: number) => \`\${n} 项\`,
    corners: {
      topLeft: ["立即处理", "立即做"],
      topRight: ["计划安排", "安排时间"],
      bottomLeft: ["委派他人", "交给别人"],
      bottomRight: ["放弃", "不做"],
    },
    tasks: ["修复缺陷", "报税", "路线图", "邮件", "简报"],
  },
  ja: {
    hint: "タスクをクリックで選択、別の象限へドラッグで移動します",
    selected: "選択中：{task}",
    moved: "{task} を「{quadrant}」に移動しました",
    count: (n: number) => \`\${n} 件\`,
    corners: {
      topLeft: ["すぐ実行", "今すぐやる"],
      topRight: ["計画", "時間を確保"],
      bottomLeft: ["委任", "人に任せる"],
      bottomRight: ["削除", "やらない"],
    },
    tasks: ["バグ修正", "確定申告", "ロードマップ", "メール", "ニュースレター"],
  },
  fr: {
    hint: "Cliquez sur une tâche pour la sélectionner, glissez-la vers un autre quadrant",
    selected: "Sélection : {task}",
    moved: "{task} déplacée vers « {quadrant} »",
    count: (n: number) => (n <= 1 ? \`\${n} tâche\` : \`\${n} tâches\`),
    corners: {
      topLeft: ["À faire", "Maintenant"],
      topRight: ["À planifier", "Réserver un créneau"],
      bottomLeft: ["À déléguer", "Confier"],
      bottomRight: ["À abandonner", "Laisser tomber"],
    },
    tasks: ["Correctif", "Impôts", "Feuille de route", "E-mails", "Newsletter"],
  },
};

const BADGES: Record<QuadrantCorner, string> = {
  topLeft: "Q1",
  topRight: "Q2",
  bottomLeft: "Q3",
  bottomRight: "Q4",
};

const SCORES: [number, number][] = [
  [9, 8.5],
  [7, 7],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
];

export default function QuadrantChartTriage() {
  let chart!: MinervaQuadrantChart;
  const [statusText, setStatusText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartPoints = SCORES.map(([x, y], i) => ({
    x,
    y,
    label: text.tasks[i],
  }));
  const chartQuadrants = Object.fromEntries(
    (Object.keys(BADGES) as QuadrantCorner[]).map((corner) => [
      corner,
      {
        badge: BADGES[corner],
        label: text.corners[corner][0],
        description: text.corners[corner][1],
      },
    ]),
  );
  // a function (property only) writes the count; the attribute shows the number
  const chartShowCounts = (count) => text.count(count);
  const onClick = (event: Event) => {
    const { point, index } = (
      event as CustomEvent<{ point: QuadrantPoint; index: number }>
    ).detail;
    chart.selectedIndex = index;
    setStatusText(text.selected.replace("{task}", \`\${point.label}\`));
  };
  const onDrop = (event: Event) => {
    const { point, index, x, y, quadrant } = (
      event as CustomEvent<{
        point: QuadrantPoint;
        index: number;
        x: number;
        y: number;
        quadrant: QuadrantCorner;
      }>
    ).detail;
    chart.points = chart.points!.map((p, i) =>
      i === index ? { ...p, x, y } : p,
    );
    chart.selectedIndex = index;
    setStatusText(
      text.moved
        .replace("{task}", \`\${point.label}\`)
        .replace("{quadrant}", text.corners[quadrant][0]),
    );
  };

  onMount(() => {
    setStatusText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-quadrant-chart
        id="triage"
        reverse-x
        hide-ticks
        show-counts
        drag-points
        height="360"
        ref={chart}
        prop:points={chartPoints}
        prop:quadrants={chartQuadrants}
        prop:showCounts={chartShowCounts}
        on:minerva-point-click={onClick}
        on:minerva-point-drop={onDrop}
      ></minerva-quadrant-chart>
      <output id="triage-status" aria-live="polite">
        {statusText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-quadrant-chart
    id="triage"
    reverse-x
    hide-ticks
    show-counts
    drag-points
    height="360"
  ></minerva-quadrant-chart>
  <output id="triage-status" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  // no build step: load cdn/chart.js instead (see the setup)
  import "minerva-design/web-components/chart";

  // Badges ("Q1"), a second line per quadrant and the number of tasks after
  // each title are drawn by the chart; \`selectedIndex\` rings the clicked task
  // and minerva-point-drop moves it (update \`points\`).
  const TEXT = {
    en: {
      hint: "Click a task to select it, drag it to another quadrant",
      selected: "Selected: {task}",
      moved: "{task} moved to “{quadrant}”",
      count: (n) => (n === 1 ? "1 task" : \`\${n} tasks\`),
      corners: {
        topLeft: ["Do first", "Do it now"],
        topRight: ["Schedule", "Plan a time"],
        bottomLeft: ["Delegate", "Hand it off"],
        bottomRight: ["Eliminate", "Drop it"],
      },
      tasks: ["Bug fix", "Tax filing", "Roadmap", "Email", "Newsletter"],
    },
    zh: {
      hint: "点击任务以选中，拖到其他象限即可移动",
      selected: "已选中：{task}",
      moved: "{task} 已移到“{quadrant}”",
      count: (n) => \`\${n} 项\`,
      corners: {
        topLeft: ["立即处理", "立即做"],
        topRight: ["计划安排", "安排时间"],
        bottomLeft: ["委派他人", "交给别人"],
        bottomRight: ["放弃", "不做"],
      },
      tasks: ["修复缺陷", "报税", "路线图", "邮件", "简报"],
    },
    ja: {
      hint: "タスクをクリックで選択、別の象限へドラッグで移動します",
      selected: "選択中：{task}",
      moved: "{task} を「{quadrant}」に移動しました",
      count: (n) => \`\${n} 件\`,
      corners: {
        topLeft: ["すぐ実行", "今すぐやる"],
        topRight: ["計画", "時間を確保"],
        bottomLeft: ["委任", "人に任せる"],
        bottomRight: ["削除", "やらない"],
      },
      tasks: ["バグ修正", "確定申告", "ロードマップ", "メール", "ニュースレター"],
    },
    fr: {
      hint: "Cliquez sur une tâche pour la sélectionner, glissez-la vers un autre quadrant",
      selected: "Sélection : {task}",
      moved: "{task} déplacée vers « {quadrant} »",
      count: (n) => (n <= 1 ? \`\${n} tâche\` : \`\${n} tâches\`),
      corners: {
        topLeft: ["À faire", "Maintenant"],
        topRight: ["À planifier", "Réserver un créneau"],
        bottomLeft: ["À déléguer", "Confier"],
        bottomRight: ["À abandonner", "Laisser tomber"],
      },
      tasks: ["Correctif", "Impôts", "Feuille de route", "E-mails", "Newsletter"],
    },
  };

  const BADGES = {
    topLeft: "Q1",
    topRight: "Q2",
    bottomLeft: "Q3",
    bottomRight: "Q4",
  };

  const SCORES = [
    [9, 8.5],
    [7, 7],
    [2.5, 9],
    [8, 3],
    [2, 2.5],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#triage");
  const status = document.querySelector("#triage-status");
  chart.points = SCORES.map(([x, y], i) => ({ x, y, label: text.tasks[i] }));
  chart.quadrants = Object.fromEntries(
    Object.keys(BADGES).map((corner) => [
      corner,
      {
        badge: BADGES[corner],
        label: text.corners[corner][0],
        description: text.corners[corner][1],
      },
    ]),
  );
  // a function (property only) writes the count; the attribute shows the number
  chart.showCounts = (count) => text.count(count);
  status.textContent = text.hint;
  const onClick = (event) => {
    const { point, index } = event.detail;
    chart.selectedIndex = index;
    status.textContent = text.selected.replace("{task}", \`\${point.label}\`);
  };
  const onDrop = (event) => {
    const { point, index, x, y, quadrant } = event.detail;
    chart.points = chart.points.map((p, i) => (i === index ? { ...p, x, y } : p));
    chart.selectedIndex = index;
    status.textContent = text.moved
      .replace("{task}", \`\${point.label}\`)
      .replace("{quadrant}", text.corners[quadrant][0]);
  };
  chart.addEventListener("minerva-point-click", onClick);
  chart.addEventListener("minerva-point-drop", onDrop);
<\/script>
`}})))()}n();export{t as default};