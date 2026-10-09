import { Component } from "@angular/core";
import { MnSteps } from "../../components/navigation";
import type { HookScenario } from "../types";
@Component({
  imports: [MnSteps],
  template: `<mn-steps
    [items]="[
      { label: 'First' },
      { label: 'Second' },
      { label: 'Third', disabled: true },
    ]"
    [current]="1"
    readOnly
  />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
