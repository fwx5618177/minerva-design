import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- GanttChartSprint.vue -->

<script setup lang="ts">
// A two-week sprint: tasks without a group share one color; \`today\` draws
// a dashed line with its label (\`today-label\`).

import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartTasks = PLAN.map(([day, days, progress], i) => ({
  name: text.tasks[i],
  start: START + day * DAY,
  end: START + (day + days) * DAY,
  progress,
}));
const chartToday = START + 6.5 * DAY;
const chartTodayLabel = text.today;
<\/script>

<template>
  <minerva-gantt-chart
    id="sprint"
    height="260"
    :tasks.prop="chartTasks"
    :today.prop="chartToday"
    :todayLabel.prop="chartTodayLabel"
  ></minerva-gantt-chart>
</template>
`,angular:`// gantt-chart-sprint.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A two-week sprint: tasks without a group share one color; \`today\` draws
// a dashed line with its label (\`today-label\`).
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

@Component({
  selector: "app-gantt-chart-sprint",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-gantt-chart
      id="sprint"
      height="260"
      [tasks]="chartTasks"
      [today]="chartToday"
      [todayLabel]="chartTodayLabel"
    ></minerva-gantt-chart>
  \`,
})
export class GanttChartSprintComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartTasks = PLAN.map(([day, days, progress], i) => ({
    name: this.text.tasks[i],
    start: START + day * DAY,
    end: START + (day + days) * DAY,
    progress,
  }));
  chartToday = START + 6.5 * DAY;
  chartTodayLabel = this.text.today;
}
`,svelte:`<!-- GanttChartSprint.svelte -->

<script lang="ts">
  // A two-week sprint: tasks without a group share one color; \`today\` draws
  // a dashed line with its label (\`today-label\`).

  import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartTasks = PLAN.map(([day, days, progress], i) => ({
    name: text.tasks[i],
    start: START + day * DAY,
    end: START + (day + days) * DAY,
    progress,
  }));
  const chartToday = START + 6.5 * DAY;
  const chartTodayLabel = text.today;
<\/script>

<minerva-gantt-chart
  id="sprint"
  height="260"
  tasks={chartTasks}
  today={chartToday}
  todayLabel={chartTodayLabel}
></minerva-gantt-chart>
`,solid:`// GanttChartSprint.tsx

// A two-week sprint: tasks without a group share one color; \`today\` draws
// a dashed line with its label (\`today-label\`).
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

export default function GanttChartSprint() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartTasks = PLAN.map(([day, days, progress], i) => ({
    name: text.tasks[i],
    start: START + day * DAY,
    end: START + (day + days) * DAY,
    progress,
  }));
  const chartToday = START + 6.5 * DAY;
  const chartTodayLabel = text.today;

  return (
    <minerva-gantt-chart
      id="sprint"
      height="260"
      prop:tasks={chartTasks}
      prop:today={chartToday}
      prop:todayLabel={chartTodayLabel}
    ></minerva-gantt-chart>
  );
}
`,html:`<minerva-gantt-chart id="sprint" height="260"></minerva-gantt-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A two-week sprint: tasks without a group share one color; \`today\` draws
  // a dashed line with its label (\`today-label\`).
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

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#sprint");
  chart.tasks = PLAN.map(([day, days, progress], i) => ({
    name: text.tasks[i],
    start: START + day * DAY,
    end: START + (day + days) * DAY,
    progress,
  }));
  chart.today = START + 6.5 * DAY;
  chart.todayLabel = text.today;
<\/script>
`}})))()}n();export{t as default};