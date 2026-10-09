import { Component } from "@angular/core";
import { MnStack } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnStack],
  template: `<mn-stack direction="row">Content</mn-stack>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
