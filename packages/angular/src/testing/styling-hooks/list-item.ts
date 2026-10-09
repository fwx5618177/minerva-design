import { Component } from "@angular/core";
import { MnListItem } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnListItem],
  template: `<li mnListItem label="Item" description="Description" icon="★">
    Details
  </li>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
