import { Component } from "@angular/core";
import { MnGridItem } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnGridItem],
  template: `<mn-grid-item fullWidth>Content</mn-grid-item>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
