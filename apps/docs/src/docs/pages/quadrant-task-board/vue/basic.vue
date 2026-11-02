<script setup lang="ts">
// Eisenhower task board: the + of a quadrant (or a click on its empty area)
// adds a task, the buttons above the active task edit or delete it, and
// tasks move by drag and drop or Shift + arrows. `v-model:points` keeps the
// list; the built-in buttons and dialogs follow the page language.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  QuadrantTaskBoard,
  type QuadrantPoint,
} from "minerva-design/vue/charts";

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
type TaskKey = keyof (typeof TEXT)["en"]["tasks"];
// the sample tasks keep a key so that their names follow the language
// until the user renames them
type Task = QuadrantPoint & { key?: TaskKey; customLabel?: string };

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const tasks = ref<Task[]>([
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
]);
const nameOf = (task: Task) =>
  task.customLabel ?? (task.key ? text.value.tasks[task.key] : task.label);
const points = computed<QuadrantPoint[]>({
  get: () => tasks.value.map((task) => ({ ...task, label: nameOf(task) })),
  set: (next) => {
    tasks.value = next.map((point) => {
      const task = point as Task;
      const named = task.key && task.label === text.value.tasks[task.key];
      return { ...task, customLabel: named ? undefined : task.label };
    });
  },
});
const quadrants = computed(() => ({
  topLeft: { label: text.value.doFirst, color: "var(--danger-color, #ef4444)" },
  topRight: {
    label: text.value.schedule,
    color: "var(--primary-color, #4f46e5)",
  },
  bottomLeft: {
    label: text.value.delegate,
    color: "var(--warning-color, #f59e0b)",
  },
  bottomRight: {
    label: text.value.eliminate,
    color: "var(--text-secondary-color, #64748b)",
  },
}));
const axisLabels = computed(() => ({
  top: text.value.important,
  bottom: text.value.notImportant,
  left: text.value.urgent,
  right: text.value.notUrgent,
}));
</script>

<template>
  <QuadrantTaskBoard
    v-model:points="points"
    :quadrants="quadrants"
    :axis-labels="axisLabels"
    reverse-x
    :show-ticks="false"
    :height="360"
    :aria-label="text.boardAria"
  />
</template>
