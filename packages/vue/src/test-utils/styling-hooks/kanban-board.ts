import { h } from "vue";
import { KanbanBoard, KanbanColumn } from "../../components/KanbanBoard";
import type { HookScenario } from "./types";

export default [
  {
    name: "board with columns",
    render: () =>
      h(
        KanbanBoard,
        { "aria-label": "Sprint", fill: true, maxHeight: 320 },
        () => [
          h(KanbanColumn, { title: "To do", count: 1 }, () => h("div", "Card")),
          h(KanbanColumn, { title: "Done" }),
        ],
      ),
  },
] satisfies HookScenario[];
