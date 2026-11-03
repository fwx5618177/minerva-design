import { Component } from "@angular/core";
import { MnDashboardColumns, MnDashboardColumn } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnDashboardColumns, MnDashboardColumn],
  template: `<mn-dashboard-columns aria-label="Sprint" fill [maxHeight]="320"
    ><mn-dashboard-column title="To do" [count]="1"
      ><div>Card</div></mn-dashboard-column
    ><mn-dashboard-column title="Done"
  /></mn-dashboard-columns>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
