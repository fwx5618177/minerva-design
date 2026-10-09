import { Component } from "@angular/core";
import { MnResponsiveGrid } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnResponsiveGrid],
  template: `<mn-responsive-grid>Content</mn-responsive-grid>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
