import { Component } from "@angular/core";
import { MnDescriptionList } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnDescriptionList],
  template: `<mn-description-list
    [items]="[{ term: 'Name', description: 'Ada' }]"
  />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
