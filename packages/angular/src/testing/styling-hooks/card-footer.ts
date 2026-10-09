import { Component } from "@angular/core";
import { MnCardFooter } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnCardFooter],
  template: `<mn-card-footer>Content</mn-card-footer>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
