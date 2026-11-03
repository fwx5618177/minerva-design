import {
  DashboardColumns,
  DashboardCard,
  DashboardColumn,
} from "../../components/DashboardColumns";
import type { HookScenario } from "./types";

export default [
  {
    name: "cards of a draggable board",
    element: (
      <DashboardColumns aria-label="Sprint" draggable>
        <DashboardColumn title="To do" value="todo">
          <DashboardCard value="spec" label="Write spec">
            Write spec
          </DashboardCard>
        </DashboardColumn>
      </DashboardColumns>
    ),
  },
] satisfies HookScenario[];
