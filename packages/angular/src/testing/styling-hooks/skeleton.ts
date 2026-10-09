import { Component } from "@angular/core";
import { MnSkeleton } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnSkeleton],
  template: `<mn-skeleton variant="card" />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
