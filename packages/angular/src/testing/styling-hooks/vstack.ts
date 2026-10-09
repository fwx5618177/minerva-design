import { Component } from "@angular/core";
import { MnVStack } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({ imports: [MnVStack], template: `<mn-vstack>Content</mn-vstack>` })
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
