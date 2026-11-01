import { Component } from "@angular/core";
import { MnProgressIndicator } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnProgressIndicator],
  template: `<mn-progress label="Loading" icon="★" />`,
})
class Fixture {}
@Component({
  imports: [MnProgressIndicator],
  template: `<mn-progress
    variant="bar"
    color="success"
    value="40"
    showValue
  />`,
})
class Determinate {}
export default [
  { name: "content and states", component: Fixture },
  { name: "determinate value", component: Determinate },
] satisfies HookScenario[];
