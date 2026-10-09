import { Component } from "@angular/core";
import { MnEmpty } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnEmpty],
  template: `<mn-empty description="Try another query" />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
