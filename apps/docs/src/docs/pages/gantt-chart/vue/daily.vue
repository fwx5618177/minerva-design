<script setup lang="ts">
// A one-day schedule in priority lanes: several tasks share each row
// (`row`, their names written inside the bars by `bar-labels` "auto"), the
// time axis shows hours and minutes for an intra-day range and `today`
// marks the current time. Tasks without a `progress` are drawn solid; the
// code review in progress shows what is left.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { GanttChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    lanes: ["High", "Medium", "Low"],
    groups: { work: "Work", study: "Study", life: "Life" },
    tasks: [
      "Standup",
      "Deep work",
      "Mock exam",
      "Email",
      "Code review",
      "Flashcards",
      "Lunch",
      "Gym",
      "Reading",
    ],
    now: "Now",
  },
  zh: {
    lanes: ["高", "中", "低"],
    groups: { work: "工作", study: "学习", life: "生活" },
    tasks: [
      "站会",
      "专注工作",
      "模拟考试",
      "邮件",
      "代码评审",
      "背单词",
      "午饭",
      "健身",
      "阅读",
    ],
    now: "现在",
  },
  ja: {
    lanes: ["高", "中", "低"],
    groups: { work: "仕事", study: "学習", life: "生活" },
    tasks: [
      "朝会",
      "集中作業",
      "模擬試験",
      "メール",
      "コードレビュー",
      "単語カード",
      "昼食",
      "ジム",
      "読書",
    ],
    now: "現在",
  },
  fr: {
    lanes: ["Haute", "Moyenne", "Basse"],
    groups: { work: "Travail", study: "Études", life: "Perso" },
    tasks: [
      "Point d’équipe",
      "Travail de fond",
      "Examen blanc",
      "E-mails",
      "Revue de code",
      "Fiches",
      "Déjeuner",
      "Sport",
      "Lecture",
    ],
    now: "Maintenant",
  },
};

const at = (hours: number, minutes = 0) =>
  new Date(2026, 10, 2, hours, minutes).getTime();

// lane (0 high, 1 medium, 2 low), group, start, end
const PLAN = [
  [0, "work", at(9), at(9, 30)],
  [0, "work", at(10), at(12)],
  [0, "study", at(16), at(17, 30)],
  [1, "work", at(8), at(8, 45)],
  [1, "work", at(13, 30), at(15)],
  [1, "study", at(20), at(21)],
  [2, "life", at(12), at(13)],
  [2, "life", at(18), at(19, 30)],
  [2, "study", at(21, 15), at(22)],
] as const;
/** Index of the task in progress (the code review) */
const IN_PROGRESS = 4;

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const tasks = computed(() =>
  PLAN.map(([lane, group, start, end], i) => ({
    id: `task-${i}`,
    name: text.value.tasks[i],
    row: text.value.lanes[lane],
    group: text.value.groups[group],
    start,
    end,
    ...(i === IN_PROGRESS ? { progress: 0.6 } : {}),
  })),
);
const now = at(14, 30);
</script>

<template>
  <GanttChart
    :tasks="tasks"
    bar-labels="auto"
    :today="now"
    :today-label="text.now"
    :height="260"
  />
</template>
