import { h } from "vue";
import {
  DashboardColumns,
  DashboardCard,
  DashboardColumn,
} from "../../components/DashboardColumns";
import type { HookScenario } from "./types";

export default [
  {
    name: "cards of a draggable board",
    render: () =>
      h(DashboardColumns, { "aria-label": "Sprint", draggable: true }, () =>
        h(DashboardColumn, { title: "To do", value: "todo" }, () =>
          h(
            DashboardCard,
            { value: "spec", label: "Write spec" },
            () => "Write spec",
          ),
        ),
      ),
  },
] satisfies HookScenario[];
