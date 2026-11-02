import { h } from "vue";
import {
  KanbanBoard,
  KanbanCard,
  KanbanColumn,
} from "../../components/KanbanBoard";
import type { HookScenario } from "./types";

export default [
  {
    name: "cards of a draggable board",
    render: () =>
      h(KanbanBoard, { "aria-label": "Sprint", draggable: true }, () =>
        h(KanbanColumn, { title: "To do", value: "todo" }, () =>
          h(
            KanbanCard,
            { value: "spec", label: "Write spec" },
            () => "Write spec",
          ),
        ),
      ),
  },
] satisfies HookScenario[];
