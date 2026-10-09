import { Component } from "@angular/core";
import { MnLoadingState } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({ imports: [MnLoadingState], template: `<mn-loading-state />` })
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
