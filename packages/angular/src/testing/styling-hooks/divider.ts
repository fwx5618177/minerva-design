import { Component } from "@angular/core";
import { MnDivider } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({ imports: [MnDivider], template: `<mn-divider>Or</mn-divider>` })
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
