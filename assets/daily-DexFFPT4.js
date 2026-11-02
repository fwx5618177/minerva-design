import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- GanttChartDaily.vue -->

<script setup lang="ts">
// A one-day schedule in priority lanes: several tasks share each row
// (\`row\`, their names written inside the bars by \`bar-labels="auto"\`), the
// time axis shows hours and minutes for an intra-day range and \`today\`
// marks the current time. Tasks without a \`progress\` are drawn solid; the
// code review in progress shows what is left.

import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartTasks = PLAN.map(([lane, group, start, end], i) => ({
  id: \`task-\${i}\`,
  name: text.tasks[i],
  row: text.lanes[lane],
  group: text.groups[group],
  start,
  end,
  ...(i === IN_PROGRESS ? { progress: 0.6 } : {}),
}));
const chartToday = at(14, 30);
const chartTodayLabel = text.now;
<\/script>

<template>
  <minerva-gantt-chart
    id="daily"
    height="260"
    bar-labels="auto"
    :tasks.prop="chartTasks"
    :today.prop="chartToday"
    :todayLabel.prop="chartTodayLabel"
  ></minerva-gantt-chart>
</template>
`,angular:`// gantt-chart-daily.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A one-day schedule in priority lanes: several tasks share each row
// (\`row\`, their names written inside the bars by \`bar-labels="auto"\`), the
// time axis shows hours and minutes for an intra-day range and \`today\`
// marks the current time. Tasks without a \`progress\` are drawn solid; the
// code review in progress shows what is left.
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

@Component({
  selector: "app-gantt-chart-daily",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-gantt-chart
      id="daily"
      height="260"
      bar-labels="auto"
      [tasks]="chartTasks"
      [today]="chartToday"
      [todayLabel]="chartTodayLabel"
    ></minerva-gantt-chart>
  \`,
})
export class GanttChartDailyComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartTasks = PLAN.map(([lane, group, start, end], i) => ({
    id: \`task-\${i}\`,
    name: this.text.tasks[i],
    row: this.text.lanes[lane],
    group: this.text.groups[group],
    start,
    end,
    ...(i === IN_PROGRESS ? { progress: 0.6 } : {}),
  }));
  chartToday = at(14, 30);
  chartTodayLabel = this.text.now;
}
`,svelte:`<!-- GanttChartDaily.svelte -->

<script lang="ts">
  // A one-day schedule in priority lanes: several tasks share each row
  // (\`row\`, their names written inside the bars by \`bar-labels="auto"\`), the
  // time axis shows hours and minutes for an intra-day range and \`today\`
  // marks the current time. Tasks without a \`progress\` are drawn solid; the
  // code review in progress shows what is left.

  import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartTasks = PLAN.map(([lane, group, start, end], i) => ({
    id: \`task-\${i}\`,
    name: text.tasks[i],
    row: text.lanes[lane],
    group: text.groups[group],
    start,
    end,
    ...(i === IN_PROGRESS ? { progress: 0.6 } : {}),
  }));
  const chartToday = at(14, 30);
  const chartTodayLabel = text.now;
<\/script>

<minerva-gantt-chart
  id="daily"
  height="260"
  bar-labels="auto"
  tasks={chartTasks}
  today={chartToday}
  todayLabel={chartTodayLabel}
></minerva-gantt-chart>
`,solid:`// GanttChartDaily.tsx

// A one-day schedule in priority lanes: several tasks share each row
// (\`row\`, their names written inside the bars by \`bar-labels="auto"\`), the
// time axis shows hours and minutes for an intra-day range and \`today\`
// marks the current time. Tasks without a \`progress\` are drawn solid; the
// code review in progress shows what is left.
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

export default function GanttChartDaily() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartTasks = PLAN.map(([lane, group, start, end], i) => ({
    id: \`task-\${i}\`,
    name: text.tasks[i],
    row: text.lanes[lane],
    group: text.groups[group],
    start,
    end,
    ...(i === IN_PROGRESS ? { progress: 0.6 } : {}),
  }));
  const chartToday = at(14, 30);
  const chartTodayLabel = text.now;

  return (
    <minerva-gantt-chart
      id="daily"
      height="260"
      bar-labels="auto"
      prop:tasks={chartTasks}
      prop:today={chartToday}
      prop:todayLabel={chartTodayLabel}
    ></minerva-gantt-chart>
  );
}
`,html:`<minerva-gantt-chart
  id="daily"
  height="260"
  bar-labels="auto"
></minerva-gantt-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A one-day schedule in priority lanes: several tasks share each row
  // (\`row\`, their names written inside the bars by \`bar-labels="auto"\`), the
  // time axis shows hours and minutes for an intra-day range and \`today\`
  // marks the current time. Tasks without a \`progress\` are drawn solid; the
  // code review in progress shows what is left.
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

  const at = (hours, minutes = 0) =>
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
  ];
  /** Index of the task in progress (the code review) */
  const IN_PROGRESS = 4;

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#daily");
  chart.tasks = PLAN.map(([lane, group, start, end], i) => ({
    id: \`task-\${i}\`,
    name: text.tasks[i],
    row: text.lanes[lane],
    group: text.groups[group],
    start,
    end,
    ...(i === IN_PROGRESS ? { progress: 0.6 } : {}),
  }));
  chart.today = at(14, 30);
  chart.todayLabel = text.now;
<\/script>
`}})))()}n();export{t as default};