import type { WcHookScenario } from "../types";
import type { MinervaAnswerSheet } from "../../../src/components/answer-sheet/answer-sheet";

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

const setItems = (root: ParentNode, withGroups = false) => {
  for (const sheet of root.querySelectorAll<MinervaAnswerSheet>(
    "minerva-answer-sheet",
  )) {
    sheet.items = items;
    if (withGroups) sheet.groups = groups;
  }
};

export default [
  {
    name: "groups, statuses, flag, legend, summary",
    html: `<minerva-answer-sheet value="q2" show-legend show-summary></minerva-answer-sheet>`,
    setup: (root) => setItems(root, true),
  },
  {
    name: "disabled, scroll layout",
    html: `<minerva-answer-sheet value="q1" layout="scroll" disabled></minerva-answer-sheet>`,
    setup: (root) => setItems(root),
  },
  {
    name: "sizes, columns",
    html: `<minerva-answer-sheet size="small" columns="3"></minerva-answer-sheet><minerva-answer-sheet size="medium"></minerva-answer-sheet>`,
    setup: (root) => setItems(root),
  },
] satisfies WcHookScenario[];
