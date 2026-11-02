import { h } from "vue";
import { KanbanColumn } from "../../components/KanbanBoard";
import type { HookScenario } from "./types";

const colors = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
] as const;

export default [
  {
    name: "header, description, cards and footer",
    render: () =>
      h(
        KanbanColumn,
        {
          title: "Doing",
          count: 2,
          color: "primary",
          description: "In progress",
        },
        {
          actions: () => h("button", { type: "button" }, "Add"),
          default: () => [h("div", "A"), h("div", "B")],
          footer: () => h("button", { type: "button" }, "Add card"),
        },
      ),
  },
  {
    name: "empty",
    render: () => h(KanbanColumn, { title: "Done", count: 0 }),
  },
  {
    name: "colors",
    render: () =>
      colors.map((color) =>
        h(KanbanColumn, { key: color, title: color, color }, () =>
          h("div", "Card"),
        ),
      ),
  },
] satisfies HookScenario[];
