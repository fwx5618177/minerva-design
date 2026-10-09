import { Component } from "@angular/core";
import { MnBox } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnBox],
  template: `<mn-box p="4" w="100%">Content</mn-box>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
