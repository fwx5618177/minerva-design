import { Component } from "@angular/core";
import { MnList } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnList],
  template: `<ul mnList>
    <li>Item</li>
  </ul>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
