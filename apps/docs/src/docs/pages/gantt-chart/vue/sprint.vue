<script setup lang="ts">
// A two-week sprint: tasks without a group share one color; `today` draws
// a dashed line with its label (`today-label`).
import { computed } from "vue";
import { GanttChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: {
    tasks: [
      "Login page",
      "Password reset",
      "Email templates",
      "Audit log",
      "Release notes",
    ],
    today: "Today",
  },
  zh: {
    tasks: ["登录页", "重置密码", "邮件模板", "审计日志", "发布说明"],
    today: "今天",
  },
  ja: {
    tasks: [
      "ログイン画面",
      "パスワード再設定",
      "メールテンプレート",
      "監査ログ",
      "リリースノート",
    ],
    today: "今日",
  },
  fr: {
    tasks: [
      "Page de connexion",
      "Mot de passe oublié",
      "Modèles d’e-mail",
      "Journal d’audit",
      "Notes de version",
    ],
    today: "Aujourd’hui",
  },
};

const DAY = 86_400_000;
const START = Date.UTC(2026, 9, 19);
// first day, duration (days), share done
const PLAN = [
  [0, 3, 1],
  [1, 4, 0.8],
  [3, 5, 0.5],
  [5, 4, 0.1],
  [8, 2, 0],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const tasks = computed(() =>
  PLAN.map(([day, days, progress], i) => ({
    name: text.value.tasks[i],
    start: START + day * DAY,
    end: START + (day + days) * DAY,
    progress,
  })),
);
</script>

<template>
  <GanttChart
    :tasks="tasks"
    :today="START + 6.5 * DAY"
    :today-label="text.today"
    :height="260"
  />
</template>
