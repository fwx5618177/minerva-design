import { Component } from "@angular/core";
import {
  MnDashboardColumns,
  MnDashboardCard,
  MnDashboardColumn,
} from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnDashboardColumns, MnDashboardCard, MnDashboardColumn],
  template: `<mn-dashboard-columns aria-label="Sprint" draggable
    ><mn-dashboard-column title="To do" value="todo"
      ><mn-dashboard-card value="spec" label="Write spec"
        >Write spec</mn-dashboard-card
      ></mn-dashboard-column
    ></mn-dashboard-columns
  >`,
})
class Fixture {}
export default [
  { name: "cards of a draggable board", component: Fixture },
] satisfies HookScenario[];
