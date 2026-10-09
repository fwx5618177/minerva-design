import { Component } from "@angular/core";
import { MnVirtualList } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnVirtualList],
  template: `<mn-virtual-list [items]="['One', 'Two', 'Three']" loading />`,
})
class Fixture {
  readonly date = new Date(2026, 9, 1);
}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
