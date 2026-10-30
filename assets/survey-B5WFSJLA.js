import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- HorizontalBarChartSurvey.vue -->

<script setup lang="ts">
// \`stacked percent\`: every row adds up to 100 %, a survey answered on a
// three-point scale; the legend toggles an answer.

import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    answers: ["Agree", "Neutral", "Disagree"],
    questions: [
      "Easy to set up",
      "Good documentation",
      "Fast enough",
      "Would recommend",
    ],
  },
  zh: {
    answers: ["同意", "中立", "不同意"],
    questions: ["易于上手", "文档完善", "速度够快", "愿意推荐"],
  },
  ja: {
    answers: ["そう思う", "どちらでもない", "そう思わない"],
    questions: [
      "導入が簡単",
      "ドキュメントが充実",
      "十分に速い",
      "人に勧めたい",
    ],
  },
  fr: {
    answers: ["D’accord", "Neutre", "Pas d’accord"],
    questions: [
      "Facile à installer",
      "Bonne documentation",
      "Assez rapide",
      "Je recommande",
    ],
  },
};

// answers per question: agree, neutral, disagree
const ANSWERS = [
  [72, 18, 10],
  [58, 27, 15],
  [64, 21, 15],
  [81, 12, 7],
];

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = text.answers.map((name, k) => ({
  name,
  data: text.questions.map((x, i) => ({ x, y: ANSWERS[i][k] })),
}));
const chartOptions = {
  xAxis: { type: "category" },
  palette: [
    "var(--success-color, #16a34a)",
    "var(--text-secondary-color, #9ca3af)",
    "var(--danger-color, #dc2626)",
  ],
};
<\/script>

<template>
  <minerva-horizontal-bar-chart
    id="survey"
    stacked
    percent
    height="260"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-horizontal-bar-chart>
</template>
`,angular:`// horizontal-bar-chart-survey.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`stacked percent\`: every row adds up to 100 %, a survey answered on a
// three-point scale; the legend toggles an answer.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    answers: ["Agree", "Neutral", "Disagree"],
    questions: [
      "Easy to set up",
      "Good documentation",
      "Fast enough",
      "Would recommend",
    ],
  },
  zh: {
    answers: ["同意", "中立", "不同意"],
    questions: ["易于上手", "文档完善", "速度够快", "愿意推荐"],
  },
  ja: {
    answers: ["そう思う", "どちらでもない", "そう思わない"],
    questions: [
      "導入が簡単",
      "ドキュメントが充実",
      "十分に速い",
      "人に勧めたい",
    ],
  },
  fr: {
    answers: ["D’accord", "Neutre", "Pas d’accord"],
    questions: [
      "Facile à installer",
      "Bonne documentation",
      "Assez rapide",
      "Je recommande",
    ],
  },
};

// answers per question: agree, neutral, disagree
const ANSWERS = [
  [72, 18, 10],
  [58, 27, 15],
  [64, 21, 15],
  [81, 12, 7],
];

@Component({
  selector: "app-horizontal-bar-chart-survey",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-horizontal-bar-chart
      id="survey"
      stacked
      percent
      height="260"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-horizontal-bar-chart>
  \`,
})
export class HorizontalBarChartSurveyComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = this.text.answers.map((name, k) => ({
    name,
    data: this.text.questions.map((x, i) => ({ x, y: ANSWERS[i][k] })),
  }));
  chartOptions = {
    xAxis: { type: "category" },
    palette: [
      "var(--success-color, #16a34a)",
      "var(--text-secondary-color, #9ca3af)",
      "var(--danger-color, #dc2626)",
    ],
  };
}
`,svelte:`<!-- HorizontalBarChartSurvey.svelte -->

<script lang="ts">
  // \`stacked percent\`: every row adds up to 100 %, a survey answered on a
  // three-point scale; the legend toggles an answer.

  import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      answers: ["Agree", "Neutral", "Disagree"],
      questions: [
        "Easy to set up",
        "Good documentation",
        "Fast enough",
        "Would recommend",
      ],
    },
    zh: {
      answers: ["同意", "中立", "不同意"],
      questions: ["易于上手", "文档完善", "速度够快", "愿意推荐"],
    },
    ja: {
      answers: ["そう思う", "どちらでもない", "そう思わない"],
      questions: [
        "導入が簡単",
        "ドキュメントが充実",
        "十分に速い",
        "人に勧めたい",
      ],
    },
    fr: {
      answers: ["D’accord", "Neutre", "Pas d’accord"],
      questions: [
        "Facile à installer",
        "Bonne documentation",
        "Assez rapide",
        "Je recommande",
      ],
    },
  };

  // answers per question: agree, neutral, disagree
  const ANSWERS = [
    [72, 18, 10],
    [58, 27, 15],
    [64, 21, 15],
    [81, 12, 7],
  ];

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = text.answers.map((name, k) => ({
    name,
    data: text.questions.map((x, i) => ({ x, y: ANSWERS[i][k] })),
  }));
  const chartOptions = {
    xAxis: { type: "category" },
    palette: [
      "var(--success-color, #16a34a)",
      "var(--text-secondary-color, #9ca3af)",
      "var(--danger-color, #dc2626)",
    ],
  };
<\/script>

<minerva-horizontal-bar-chart
  id="survey"
  stacked
  percent
  height="260"
  series={chartSeries}
  options={chartOptions}
></minerva-horizontal-bar-chart>
`,solid:`// HorizontalBarChartSurvey.tsx

// \`stacked percent\`: every row adds up to 100 %, a survey answered on a
// three-point scale; the legend toggles an answer.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    answers: ["Agree", "Neutral", "Disagree"],
    questions: [
      "Easy to set up",
      "Good documentation",
      "Fast enough",
      "Would recommend",
    ],
  },
  zh: {
    answers: ["同意", "中立", "不同意"],
    questions: ["易于上手", "文档完善", "速度够快", "愿意推荐"],
  },
  ja: {
    answers: ["そう思う", "どちらでもない", "そう思わない"],
    questions: [
      "導入が簡単",
      "ドキュメントが充実",
      "十分に速い",
      "人に勧めたい",
    ],
  },
  fr: {
    answers: ["D’accord", "Neutre", "Pas d’accord"],
    questions: [
      "Facile à installer",
      "Bonne documentation",
      "Assez rapide",
      "Je recommande",
    ],
  },
};

// answers per question: agree, neutral, disagree
const ANSWERS = [
  [72, 18, 10],
  [58, 27, 15],
  [64, 21, 15],
  [81, 12, 7],
];

export default function HorizontalBarChartSurvey() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = text.answers.map((name, k) => ({
    name,
    data: text.questions.map((x, i) => ({ x, y: ANSWERS[i][k] })),
  }));
  const chartOptions = {
    xAxis: { type: "category" },
    palette: [
      "var(--success-color, #16a34a)",
      "var(--text-secondary-color, #9ca3af)",
      "var(--danger-color, #dc2626)",
    ],
  };

  return (
    <minerva-horizontal-bar-chart
      id="survey"
      stacked
      percent
      height="260"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-horizontal-bar-chart>
  );
}
`,html:`<minerva-horizontal-bar-chart
  id="survey"
  stacked
  percent
  height="260"
></minerva-horizontal-bar-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`stacked percent\`: every row adds up to 100 %, a survey answered on a
  // three-point scale; the legend toggles an answer.
  const TEXT = {
    en: {
      answers: ["Agree", "Neutral", "Disagree"],
      questions: [
        "Easy to set up",
        "Good documentation",
        "Fast enough",
        "Would recommend",
      ],
    },
    zh: {
      answers: ["同意", "中立", "不同意"],
      questions: ["易于上手", "文档完善", "速度够快", "愿意推荐"],
    },
    ja: {
      answers: ["そう思う", "どちらでもない", "そう思わない"],
      questions: [
        "導入が簡単",
        "ドキュメントが充実",
        "十分に速い",
        "人に勧めたい",
      ],
    },
    fr: {
      answers: ["D’accord", "Neutre", "Pas d’accord"],
      questions: [
        "Facile à installer",
        "Bonne documentation",
        "Assez rapide",
        "Je recommande",
      ],
    },
  };

  // answers per question: agree, neutral, disagree
  const ANSWERS = [
    [72, 18, 10],
    [58, 27, 15],
    [64, 21, 15],
    [81, 12, 7],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#survey");
  chart.series = text.answers.map((name, k) => ({
    name,
    data: text.questions.map((x, i) => ({ x, y: ANSWERS[i][k] })),
  }));
  chart.options = {
    xAxis: { type: "category" },
    palette: [
      "var(--success-color, #16a34a)",
      "var(--text-secondary-color, #9ca3af)",
      "var(--danger-color, #dc2626)",
    ],
  };
<\/script>
`}})))()}n();export{t as default};