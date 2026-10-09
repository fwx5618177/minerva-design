import { Component } from "@angular/core";
import { MnPage } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({ imports: [MnPage], template: `<mn-page>Content</mn-page>` })
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
