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
    element: (
      <AnswerSheet
        items={items}
        groups={groups}
        defaultValue="q2"
        showLegend
        showSummary
      />
    ),
  },
  {
    name: "disabled, scroll layout",
    element: (
      <AnswerSheet items={items} defaultValue="q1" layout="scroll" disabled />
    ),
  },
  {
    name: "sizes, columns",
    element: (
      <>
        <AnswerSheet items={items} size="small" columns={3} />
        <AnswerSheet items={items} size="medium" />
      </>
    ),
  },
] satisfies HookScenario[];
