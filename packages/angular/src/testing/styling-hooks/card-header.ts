import { Component } from "@angular/core";
import { MnCardHeader } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnCardHeader],
  template: `<mn-card-header>Content</mn-card-header>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
