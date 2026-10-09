import { Component } from "@angular/core";
import { MnTag } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnTag],
  template: `<mn-tag
      label="Item"
      icon="★"
      avatar="A"
      clickable
      closable
    /><mn-tag label="Busy" loading disabled [active]="true" />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
