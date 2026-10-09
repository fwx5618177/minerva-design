import { Component } from "@angular/core";
import { MnCard } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnCard],
  template: `<mn-card disabled>Content</mn-card>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
