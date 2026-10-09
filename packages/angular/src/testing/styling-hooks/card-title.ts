import { Component } from "@angular/core";
import { MnCardTitle } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnCardTitle],
  template: `<mn-card-title>Content</mn-card-title>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
