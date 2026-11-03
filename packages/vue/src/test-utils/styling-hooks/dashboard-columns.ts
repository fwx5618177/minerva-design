import { h } from "vue";
import {
  DashboardColumns,
  DashboardColumn,
} from "../../components/DashboardColumns";
import type { HookScenario } from "./types";

export default [
  {
    name: "board with columns",
    render: () =>
      h(
        DashboardColumns,
        { "aria-label": "Sprint", fill: true, maxHeight: 320 },
        () => [
          h(DashboardColumn, { title: "To do", count: 1 }, () =>
            h("div", "Card"),
          ),
          h(DashboardColumn, { title: "Done" }),
        ],
      ),
  },
] satisfies HookScenario[];
