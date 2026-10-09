import { Component } from "@angular/core";
import { MnStatCard } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnStatCard],
  template: `<mn-stat-card
    label="Total"
    value="42"
    icon="★"
    description="Records"
  />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
