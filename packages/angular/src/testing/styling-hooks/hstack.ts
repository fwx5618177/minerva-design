import { Component } from "@angular/core";
import { MnHStack } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({ imports: [MnHStack], template: `<mn-hstack>Content</mn-hstack>` })
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
