import { Component } from "@angular/core";
import { MnProgressIndicator } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnProgressIndicator],
  template: `<mn-progress label="Loading" icon="★" />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
