import { h } from "vue";
import { AnswerSheet } from "../../components/AnswerSheet";
import type { HookScenario } from "./types";

const items = [
  { key: "q1", status: "answered", group: "single" },
  { key: "q2", status: "correct", group: "single", flagged: true },
  { key: "q3", status: "wrong", group: "single" },
  { key: "q4", status: "skipped", group: "short" },
  { key: "q5", group: "short", disabled: true },
] as const;
const groups = [
  { key: "single", title: "Single choice" },
  { key: "short", title: "Short answer" },
];

export default [
  {
    name: "groups, statuses, flag, legend, summary",
    render: () =>
      h(AnswerSheet, {
        items,
        groups,
        defaultValue: "q2",
        showLegend: true,
        showSummary: true,
      }),
  },
  {
    name: "disabled, scroll layout",
    render: () =>
      h(AnswerSheet, {
        items,
        defaultValue: "q1",
        layout: "scroll",
        disabled: true,
      }),
  },
  {
    name: "sizes, columns",
    render: () => [
      h(AnswerSheet, { items, size: "small", columns: 3 }),
      h(AnswerSheet, { items, size: "medium" }),
    ],
  },
] satisfies HookScenario[];
