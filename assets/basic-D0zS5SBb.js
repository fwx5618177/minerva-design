import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- QuadrantTaskBoardBasic.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// Eisenhower task board: the + of a quadrant (or a click on its empty area)
// adds a task, the buttons above the active task edit or delete it, and
// tasks move by drag and drop or Shift + arrows. The board is controlled:
// minerva-points-change gives the next list, set it back as \`points\`. The
// built-in buttons and panels follow the page language.

import type {
  MinervaQuadrantTaskBoard,
  QuadrantPoint,
} from "minerva-design/web-components/quadrant-task-board";

const TEXT = {
  en: {
    doFirst: "Do first",
    schedule: "Schedule",
    delegate: "Delegate",
    eliminate: "Eliminate",
    important: "Important",
    notImportant: "Not important",
    urgent: "Urgent",
    notUrgent: "Not urgent",
    boardAria: "Task matrix: drag tasks between quadrants",
    tasks: {
      loginOutage: "Fix login outage",
      quarterlyPlanning: "Quarterly planning",
      bookTravel: "Book travel",
      inboxZero: "Inbox zero",
    },
  },
  zh: {
    doFirst: "立即做",
    schedule: "计划做",
    delegate: "委派",
    eliminate: "删除",
    important: "重要",
    notImportant: "不重要",
    urgent: "紧急",
    notUrgent: "不紧急",
    boardAria: "任务矩阵：在象限之间拖动任务",
    tasks: {
      loginOutage: "修复登录故障",
      quarterlyPlanning: "季度规划",
      bookTravel: "预订差旅",
      inboxZero: "清空收件箱",
    },
  },
  ja: {
    doFirst: "すぐやる",
    schedule: "計画する",
    delegate: "任せる",
    eliminate: "やめる",
    important: "重要",
    notImportant: "重要でない",
    urgent: "緊急",
    notUrgent: "緊急でない",
    boardAria: "タスクマトリクス：象限の間でタスクをドラッグ",
    tasks: {
      loginOutage: "ログイン障害の修正",
      quarterlyPlanning: "四半期計画",
      bookTravel: "出張の予約",
      inboxZero: "受信トレイの整理",
    },
  },
  fr: {
    doFirst: "À faire tout de suite",
    schedule: "À planifier",
    delegate: "À déléguer",
    eliminate: "À abandonner",
    important: "Important",
    notImportant: "Pas important",
    urgent: "Urgent",
    notUrgent: "Pas urgent",
    boardAria:
      "Matrice des tâches : faites glisser les tâches entre les quadrants",
    tasks: {
      loginOutage: "Réparer la connexion",
      quarterlyPlanning: "Planification trimestrielle",
      bookTravel: "Réserver le voyage",
      inboxZero: "Boîte de réception vide",
    },
  },
};

const board = ref<MinervaQuadrantTaskBoard>();

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const boardPoints = [
  { x: 9, y: 8, label: text.tasks.loginOutage },
  { x: 3, y: 8.5, label: text.tasks.quarterlyPlanning },
  { x: 8, y: 3, label: text.tasks.bookTravel },
  { x: 2.5, y: 2, label: text.tasks.inboxZero },
];
const boardQuadrants = {
  topLeft: { label: text.doFirst, color: "var(--danger-color, #ef4444)" },
  topRight: { label: text.schedule, color: "var(--primary-color, #4f46e5)" },
  bottomLeft: {
    label: text.delegate,
    color: "var(--warning-color, #f59e0b)",
  },
  bottomRight: {
    label: text.eliminate,
    color: "var(--text-secondary-color, #64748b)",
  },
};
const boardAxisLabels = {
  top: text.important,
  bottom: text.notImportant,
  left: text.urgent,
  right: text.notUrgent,
};
const onPointsChange = (event: Event) => {
  board.value!.points = (
    event as CustomEvent<{ points: QuadrantPoint[] }>
  ).detail.points;
};

onMounted(() => {
  board.value!.setAttribute("aria-label", text.boardAria);
});
<\/script>

<template>
  <minerva-quadrant-task-board
    id="board"
    reverse-x
    hide-ticks
    height="360"
    ref="board"
    :points.prop="boardPoints"
    :quadrants.prop="boardQuadrants"
    :axisLabels.prop="boardAxisLabels"
    @minerva-points-change="onPointsChange"
  ></minerva-quadrant-task-board>
</template>
`,angular:`// quadrant-task-board-basic.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";

// Eisenhower task board: the + of a quadrant (or a click on its empty area)
// adds a task, the buttons above the active task edit or delete it, and
// tasks move by drag and drop or Shift + arrows. The board is controlled:
// minerva-points-change gives the next list, set it back as \`points\`. The
// built-in buttons and panels follow the page language.
import type {
  MinervaQuadrantTaskBoard,
  QuadrantPoint,
} from "minerva-design/web-components/quadrant-task-board";

const TEXT = {
  en: {
    doFirst: "Do first",
    schedule: "Schedule",
    delegate: "Delegate",
    eliminate: "Eliminate",
    important: "Important",
    notImportant: "Not important",
    urgent: "Urgent",
    notUrgent: "Not urgent",
    boardAria: "Task matrix: drag tasks between quadrants",
    tasks: {
      loginOutage: "Fix login outage",
      quarterlyPlanning: "Quarterly planning",
      bookTravel: "Book travel",
      inboxZero: "Inbox zero",
    },
  },
  zh: {
    doFirst: "立即做",
    schedule: "计划做",
    delegate: "委派",
    eliminate: "删除",
    important: "重要",
    notImportant: "不重要",
    urgent: "紧急",
    notUrgent: "不紧急",
    boardAria: "任务矩阵：在象限之间拖动任务",
    tasks: {
      loginOutage: "修复登录故障",
      quarterlyPlanning: "季度规划",
      bookTravel: "预订差旅",
      inboxZero: "清空收件箱",
    },
  },
  ja: {
    doFirst: "すぐやる",
    schedule: "計画する",
    delegate: "任せる",
    eliminate: "やめる",
    important: "重要",
    notImportant: "重要でない",
    urgent: "緊急",
    notUrgent: "緊急でない",
    boardAria: "タスクマトリクス：象限の間でタスクをドラッグ",
    tasks: {
      loginOutage: "ログイン障害の修正",
      quarterlyPlanning: "四半期計画",
      bookTravel: "出張の予約",
      inboxZero: "受信トレイの整理",
    },
  },
  fr: {
    doFirst: "À faire tout de suite",
    schedule: "À planifier",
    delegate: "À déléguer",
    eliminate: "À abandonner",
    important: "Important",
    notImportant: "Pas important",
    urgent: "Urgent",
    notUrgent: "Pas urgent",
    boardAria:
      "Matrice des tâches : faites glisser les tâches entre les quadrants",
    tasks: {
      loginOutage: "Réparer la connexion",
      quarterlyPlanning: "Planification trimestrielle",
      bookTravel: "Réserver le voyage",
      inboxZero: "Boîte de réception vide",
    },
  },
};

@Component({
  selector: "app-quadrant-task-board-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-quadrant-task-board
      id="board"
      reverse-x
      hide-ticks
      height="360"
      #board
      [points]="boardPoints"
      [quadrants]="boardQuadrants"
      [axisLabels]="boardAxisLabels"
      (minerva-points-change)="onPointsChange($event)"
    ></minerva-quadrant-task-board>
  \`,
})
export class QuadrantTaskBoardBasicComponent implements AfterViewInit {
  @ViewChild("board") board!: ElementRef<MinervaQuadrantTaskBoard>;

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  boardPoints = [
    { x: 9, y: 8, label: this.text.tasks.loginOutage },
    { x: 3, y: 8.5, label: this.text.tasks.quarterlyPlanning },
    { x: 8, y: 3, label: this.text.tasks.bookTravel },
    { x: 2.5, y: 2, label: this.text.tasks.inboxZero },
  ];
  boardQuadrants = {
    topLeft: {
      label: this.text.doFirst,
      color: "var(--danger-color, #ef4444)",
    },
    topRight: {
      label: this.text.schedule,
      color: "var(--primary-color, #4f46e5)",
    },
    bottomLeft: {
      label: this.text.delegate,
      color: "var(--warning-color, #f59e0b)",
    },
    bottomRight: {
      label: this.text.eliminate,
      color: "var(--text-secondary-color, #64748b)",
    },
  };
  boardAxisLabels = {
    top: this.text.important,
    bottom: this.text.notImportant,
    left: this.text.urgent,
    right: this.text.notUrgent,
  };
  onPointsChange = (event: Event) => {
    this.board.nativeElement.points = (
      event as CustomEvent<{ points: QuadrantPoint[] }>
    ).detail.points;
  };

  ngAfterViewInit(): void {
    this.board.nativeElement.setAttribute("aria-label", this.text.boardAria);
  }
}
`,svelte:`<!-- QuadrantTaskBoardBasic.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // Eisenhower task board: the + of a quadrant (or a click on its empty area)
  // adds a task, the buttons above the active task edit or delete it, and
  // tasks move by drag and drop or Shift + arrows. The board is controlled:
  // minerva-points-change gives the next list, set it back as \`points\`. The
  // built-in buttons and panels follow the page language.

  import type {
    MinervaQuadrantTaskBoard,
    QuadrantPoint,
  } from "minerva-design/web-components/quadrant-task-board";

  const TEXT = {
    en: {
      doFirst: "Do first",
      schedule: "Schedule",
      delegate: "Delegate",
      eliminate: "Eliminate",
      important: "Important",
      notImportant: "Not important",
      urgent: "Urgent",
      notUrgent: "Not urgent",
      boardAria: "Task matrix: drag tasks between quadrants",
      tasks: {
        loginOutage: "Fix login outage",
        quarterlyPlanning: "Quarterly planning",
        bookTravel: "Book travel",
        inboxZero: "Inbox zero",
      },
    },
    zh: {
      doFirst: "立即做",
      schedule: "计划做",
      delegate: "委派",
      eliminate: "删除",
      important: "重要",
      notImportant: "不重要",
      urgent: "紧急",
      notUrgent: "不紧急",
      boardAria: "任务矩阵：在象限之间拖动任务",
      tasks: {
        loginOutage: "修复登录故障",
        quarterlyPlanning: "季度规划",
        bookTravel: "预订差旅",
        inboxZero: "清空收件箱",
      },
    },
    ja: {
      doFirst: "すぐやる",
      schedule: "計画する",
      delegate: "任せる",
      eliminate: "やめる",
      important: "重要",
      notImportant: "重要でない",
      urgent: "緊急",
      notUrgent: "緊急でない",
      boardAria: "タスクマトリクス：象限の間でタスクをドラッグ",
      tasks: {
        loginOutage: "ログイン障害の修正",
        quarterlyPlanning: "四半期計画",
        bookTravel: "出張の予約",
        inboxZero: "受信トレイの整理",
      },
    },
    fr: {
      doFirst: "À faire tout de suite",
      schedule: "À planifier",
      delegate: "À déléguer",
      eliminate: "À abandonner",
      important: "Important",
      notImportant: "Pas important",
      urgent: "Urgent",
      notUrgent: "Pas urgent",
      boardAria:
        "Matrice des tâches : faites glisser les tâches entre les quadrants",
      tasks: {
        loginOutage: "Réparer la connexion",
        quarterlyPlanning: "Planification trimestrielle",
        bookTravel: "Réserver le voyage",
        inboxZero: "Boîte de réception vide",
      },
    },
  };

  let board: MinervaQuadrantTaskBoard;

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const boardPoints = [
    { x: 9, y: 8, label: text.tasks.loginOutage },
    { x: 3, y: 8.5, label: text.tasks.quarterlyPlanning },
    { x: 8, y: 3, label: text.tasks.bookTravel },
    { x: 2.5, y: 2, label: text.tasks.inboxZero },
  ];
  const boardQuadrants = {
    topLeft: { label: text.doFirst, color: "var(--danger-color, #ef4444)" },
    topRight: { label: text.schedule, color: "var(--primary-color, #4f46e5)" },
    bottomLeft: {
      label: text.delegate,
      color: "var(--warning-color, #f59e0b)",
    },
    bottomRight: {
      label: text.eliminate,
      color: "var(--text-secondary-color, #64748b)",
    },
  };
  const boardAxisLabels = {
    top: text.important,
    bottom: text.notImportant,
    left: text.urgent,
    right: text.notUrgent,
  };
  const onPointsChange = (event: Event) => {
    board.points = (
      event as CustomEvent<{ points: QuadrantPoint[] }>
    ).detail.points;
  };

  onMount(() => {
    board.setAttribute("aria-label", text.boardAria);
  });
<\/script>

<minerva-quadrant-task-board
  id="board"
  reverse-x
  hide-ticks
  height="360"
  bind:this={board}
  points={boardPoints}
  quadrants={boardQuadrants}
  axisLabels={boardAxisLabels}
  onminerva-points-change={onPointsChange}
></minerva-quadrant-task-board>
`,solid:`// QuadrantTaskBoardBasic.tsx

import { onMount } from "solid-js";

// Eisenhower task board: the + of a quadrant (or a click on its empty area)
// adds a task, the buttons above the active task edit or delete it, and
// tasks move by drag and drop or Shift + arrows. The board is controlled:
// minerva-points-change gives the next list, set it back as \`points\`. The
// built-in buttons and panels follow the page language.
import type {
  MinervaQuadrantTaskBoard,
  QuadrantPoint,
} from "minerva-design/web-components/quadrant-task-board";

const TEXT = {
  en: {
    doFirst: "Do first",
    schedule: "Schedule",
    delegate: "Delegate",
    eliminate: "Eliminate",
    important: "Important",
    notImportant: "Not important",
    urgent: "Urgent",
    notUrgent: "Not urgent",
    boardAria: "Task matrix: drag tasks between quadrants",
    tasks: {
      loginOutage: "Fix login outage",
      quarterlyPlanning: "Quarterly planning",
      bookTravel: "Book travel",
      inboxZero: "Inbox zero",
    },
  },
  zh: {
    doFirst: "立即做",
    schedule: "计划做",
    delegate: "委派",
    eliminate: "删除",
    important: "重要",
    notImportant: "不重要",
    urgent: "紧急",
    notUrgent: "不紧急",
    boardAria: "任务矩阵：在象限之间拖动任务",
    tasks: {
      loginOutage: "修复登录故障",
      quarterlyPlanning: "季度规划",
      bookTravel: "预订差旅",
      inboxZero: "清空收件箱",
    },
  },
  ja: {
    doFirst: "すぐやる",
    schedule: "計画する",
    delegate: "任せる",
    eliminate: "やめる",
    important: "重要",
    notImportant: "重要でない",
    urgent: "緊急",
    notUrgent: "緊急でない",
    boardAria: "タスクマトリクス：象限の間でタスクをドラッグ",
    tasks: {
      loginOutage: "ログイン障害の修正",
      quarterlyPlanning: "四半期計画",
      bookTravel: "出張の予約",
      inboxZero: "受信トレイの整理",
    },
  },
  fr: {
    doFirst: "À faire tout de suite",
    schedule: "À planifier",
    delegate: "À déléguer",
    eliminate: "À abandonner",
    important: "Important",
    notImportant: "Pas important",
    urgent: "Urgent",
    notUrgent: "Pas urgent",
    boardAria:
      "Matrice des tâches : faites glisser les tâches entre les quadrants",
    tasks: {
      loginOutage: "Réparer la connexion",
      quarterlyPlanning: "Planification trimestrielle",
      bookTravel: "Réserver le voyage",
      inboxZero: "Boîte de réception vide",
    },
  },
};

export default function QuadrantTaskBoardBasic() {
  let board!: MinervaQuadrantTaskBoard;

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const boardPoints = [
    { x: 9, y: 8, label: text.tasks.loginOutage },
    { x: 3, y: 8.5, label: text.tasks.quarterlyPlanning },
    { x: 8, y: 3, label: text.tasks.bookTravel },
    { x: 2.5, y: 2, label: text.tasks.inboxZero },
  ];
  const boardQuadrants = {
    topLeft: { label: text.doFirst, color: "var(--danger-color, #ef4444)" },
    topRight: { label: text.schedule, color: "var(--primary-color, #4f46e5)" },
    bottomLeft: {
      label: text.delegate,
      color: "var(--warning-color, #f59e0b)",
    },
    bottomRight: {
      label: text.eliminate,
      color: "var(--text-secondary-color, #64748b)",
    },
  };
  const boardAxisLabels = {
    top: text.important,
    bottom: text.notImportant,
    left: text.urgent,
    right: text.notUrgent,
  };
  const onPointsChange = (event: Event) => {
    board.points = (
      event as CustomEvent<{ points: QuadrantPoint[] }>
    ).detail.points;
  };

  onMount(() => {
    board.setAttribute("aria-label", text.boardAria);
  });

  return (
    <minerva-quadrant-task-board
      id="board"
      reverse-x
      hide-ticks
      height="360"
      ref={board}
      prop:points={boardPoints}
      prop:quadrants={boardQuadrants}
      prop:axisLabels={boardAxisLabels}
      on:minerva-points-change={onPointsChange}
    ></minerva-quadrant-task-board>
  );
}
`,html:`<minerva-quadrant-task-board
  id="board"
  reverse-x
  hide-ticks
  height="360"
></minerva-quadrant-task-board>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  // no build step: load cdn/quadrant-task-board.js instead (see the setup)
  import "minerva-design/web-components/quadrant-task-board";

  // Eisenhower task board: the + of a quadrant (or a click on its empty area)
  // adds a task, the buttons above the active task edit or delete it, and
  // tasks move by drag and drop or Shift + arrows. The board is controlled:
  // minerva-points-change gives the next list, set it back as \`points\`. The
  // built-in buttons and panels follow the page language.
  const TEXT = {
    en: {
      doFirst: "Do first",
      schedule: "Schedule",
      delegate: "Delegate",
      eliminate: "Eliminate",
      important: "Important",
      notImportant: "Not important",
      urgent: "Urgent",
      notUrgent: "Not urgent",
      boardAria: "Task matrix: drag tasks between quadrants",
      tasks: {
        loginOutage: "Fix login outage",
        quarterlyPlanning: "Quarterly planning",
        bookTravel: "Book travel",
        inboxZero: "Inbox zero",
      },
    },
    zh: {
      doFirst: "立即做",
      schedule: "计划做",
      delegate: "委派",
      eliminate: "删除",
      important: "重要",
      notImportant: "不重要",
      urgent: "紧急",
      notUrgent: "不紧急",
      boardAria: "任务矩阵：在象限之间拖动任务",
      tasks: {
        loginOutage: "修复登录故障",
        quarterlyPlanning: "季度规划",
        bookTravel: "预订差旅",
        inboxZero: "清空收件箱",
      },
    },
    ja: {
      doFirst: "すぐやる",
      schedule: "計画する",
      delegate: "任せる",
      eliminate: "やめる",
      important: "重要",
      notImportant: "重要でない",
      urgent: "緊急",
      notUrgent: "緊急でない",
      boardAria: "タスクマトリクス：象限の間でタスクをドラッグ",
      tasks: {
        loginOutage: "ログイン障害の修正",
        quarterlyPlanning: "四半期計画",
        bookTravel: "出張の予約",
        inboxZero: "受信トレイの整理",
      },
    },
    fr: {
      doFirst: "À faire tout de suite",
      schedule: "À planifier",
      delegate: "À déléguer",
      eliminate: "À abandonner",
      important: "Important",
      notImportant: "Pas important",
      urgent: "Urgent",
      notUrgent: "Pas urgent",
      boardAria:
        "Matrice des tâches : faites glisser les tâches entre les quadrants",
      tasks: {
        loginOutage: "Réparer la connexion",
        quarterlyPlanning: "Planification trimestrielle",
        bookTravel: "Réserver le voyage",
        inboxZero: "Boîte de réception vide",
      },
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const board = document.querySelector("#board");
  board.points = [
    { x: 9, y: 8, label: text.tasks.loginOutage },
    { x: 3, y: 8.5, label: text.tasks.quarterlyPlanning },
    { x: 8, y: 3, label: text.tasks.bookTravel },
    { x: 2.5, y: 2, label: text.tasks.inboxZero },
  ];
  board.quadrants = {
    topLeft: { label: text.doFirst, color: "var(--danger-color, #ef4444)" },
    topRight: { label: text.schedule, color: "var(--primary-color, #4f46e5)" },
    bottomLeft: {
      label: text.delegate,
      color: "var(--warning-color, #f59e0b)",
    },
    bottomRight: {
      label: text.eliminate,
      color: "var(--text-secondary-color, #64748b)",
    },
  };
  board.axisLabels = {
    top: text.important,
    bottom: text.notImportant,
    left: text.urgent,
    right: text.notUrgent,
  };
  board.setAttribute("aria-label", text.boardAria);
  const onPointsChange = (event) => {
    board.points = event.detail.points;
  };
  board.addEventListener("minerva-points-change", onPointsChange);
<\/script>
`}})))()}n();export{t as default};