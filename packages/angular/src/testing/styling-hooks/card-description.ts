import { Component } from "@angular/core";
import { MnCardDescription } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnCardDescription],
  template: `<mn-card-description>Content</mn-card-description>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
