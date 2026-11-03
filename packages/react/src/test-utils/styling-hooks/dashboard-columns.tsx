import {
  DashboardColumns,
  DashboardColumn,
} from "../../components/DashboardColumns";
import type { HookScenario } from "./types";

export default [
  {
    name: "board with columns",
    element: (
      <DashboardColumns aria-label="Sprint" fill maxHeight={320}>
        <DashboardColumn title="To do" count={1}>
          <div>Card</div>
        </DashboardColumn>
        <DashboardColumn title="Done" />
      </DashboardColumns>
    ),
  },
] satisfies HookScenario[];
