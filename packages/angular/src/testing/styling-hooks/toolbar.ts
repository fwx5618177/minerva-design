import { Component } from "@angular/core";
import { MnToolbar } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnToolbar],
  template: `<mn-toolbar>Controls</mn-toolbar>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
