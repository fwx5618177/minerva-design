<script setup lang="ts">
// Badges ("Q1"), a second line per quadrant and the number of tasks after
// each title are drawn by the chart; `selected-index` rings the clicked task
// and @point-drop moves it (update `points`).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  QuadrantChart,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/vue/charts";

const TEXT = {
  en: {
    hint: "Click a task to select it, drag it to another quadrant",
    moved: "moved to",
    count: (n: number) => (n === 1 ? "1 task" : `${n} tasks`),
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
    moved: "已移到",
    count: (n: number) => `${n} 项`,
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
    moved: "→",
    count: (n: number) => `${n} 件`,
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
    moved: "déplacée vers",
    count: (n: number) => (n <= 1 ? `${n} tâche` : `${n} tâches`),
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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const scores = ref<[number, number][]>([
  [9, 8.5],
  [7, 7],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
]);
const points = computed(() =>
  scores.value.map(([x, y], i) => ({ x, y, label: text.value.tasks[i] })),
);
const quadrants = computed(() =>
  Object.fromEntries(
    (Object.keys(BADGES) as QuadrantCorner[]).map((corner) => [
      corner,
      {
        badge: BADGES[corner],
        label: text.value.corners[corner][0],
        description: text.value.corners[corner][1],
      },
    ]),
  ),
);
const showCounts = (count: number) => text.value.count(count);
const selected = ref<number | null>(null);
const status = ref("");
const onPointClick = (point: QuadrantPoint, index: number) => {
  selected.value = index;
  status.value = `${point.label}`;
};
const onPointDrop = (
  point: QuadrantPoint,
  index: number,
  target: { x: number; y: number; quadrant: QuadrantCorner },
) => {
  scores.value = scores.value.map((score, i) =>
    i === index ? [target.x, target.y] : score,
  );
  selected.value = index;
  status.value = `${point.label} ${text.value.moved} ${text.value.corners[target.quadrant][0]}`;
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <QuadrantChart
      :points="points"
      :quadrants="quadrants"
      :show-counts="showCounts"
      :selected-index="selected"
      reverse-x
      :show-ticks="false"
      :height="360"
      @point-click="onPointClick"
      @point-drop="onPointDrop"
    />
    <output aria-live="polite">{{ status || text.hint }}</output>
  </div>
</template>
