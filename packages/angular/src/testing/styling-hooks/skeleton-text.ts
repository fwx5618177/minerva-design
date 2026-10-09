import { Component } from "@angular/core";
import { MnSkeletonText } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({ imports: [MnSkeletonText], template: `<mn-skeleton-text />` })
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
