<script setup lang="ts">
// @point-click gives the clicked point, @quadrant-click the quadrant of a
// click on the empty area (`reverse-x`: urgent on the left).
import { computed, ref } from "vue";
import {
  QuadrantChart,
  useI18n,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/vue";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const points = computed(() =>
  SCORES.map(([x, y], i) => ({ x, y, label: text.value.tasks[i] })),
);
const quadrants = computed(() => ({
  topLeft: { label: text.value.corners.topLeft },
  topRight: { label: text.value.corners.topRight },
  bottomLeft: { label: text.value.corners.bottomLeft },
  bottomRight: { label: text.value.corners.bottomRight },
}));
const selected = ref("");
const onPointClick = (point: QuadrantPoint) => {
  selected.value = `${point.label}`;
};
const onQuadrantClick = (quadrant: QuadrantCorner) => {
  selected.value = text.value.corners[quadrant];
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <QuadrantChart
      :points="points"
      :quadrants="quadrants"
      :x-label="text.urgency"
      :y-label="text.importance"
      reverse-x
      :height="320"
      @point-click="onPointClick"
      @quadrant-click="onQuadrantClick"
    />
    <output aria-live="polite">{{ selected || text.hint }}</output>
  </div>
</template>
