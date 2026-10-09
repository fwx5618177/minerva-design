import { Component } from "@angular/core";
import { MnCardContent } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnCardContent],
  template: `<mn-card-content>Content</mn-card-content>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
