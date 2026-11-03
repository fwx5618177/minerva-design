import { Component } from "@angular/core";
import { MnDashboardColumn } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnDashboardColumn],
  template: `<mn-dashboard-column
      title="Doing"
      [count]="2"
      color="primary"
      description="In progress"
      ><button type="button" mnDashboardActions>Add</button>
      <div>A</div>
      <div>B</div>
      <button type="button" mnDashboardFooter>
        Add card
      </button></mn-dashboard-column
    >
    <mn-dashboard-column title="Done" [count]="0" />
    @for (color of colors; track color) {
      <mn-dashboard-column [title]="color" [color]="color"
        ><div>Card</div></mn-dashboard-column
      >
    }`,
})
class Fixture {
  readonly colors = [
    "primary",
    "success",
    "warning",
    "danger",
    "info",
    "neutral",
  ];
}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
