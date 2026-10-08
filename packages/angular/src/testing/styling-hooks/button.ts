import { Component } from "@angular/core";
import { MnButton } from "../../components/button";
import type { HookScenario } from "../types";

@Component({
  imports: [MnButton],
  template: ` <ng-template #icon><svg aria-hidden="true"></svg></ng-template>
    <button
      mnButton
      [startIcon]="icon"
      [endIcon]="icon"
      size="small"
      variant="outline"
      color="danger"
      shape="circle"
      active
    >
      Save
    </button>
    <button mnButton disabled>Off</button>
    <button mnButton loading>Busy</button>`,
})
class Every {}

export default [
  { name: "icons, every key, active, disabled, loading", component: Every },
] satisfies HookScenario[];
