import { Component } from "@angular/core";
import { MnBadge } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnBadge],
  template: `<mn-badge value="10" icon="★" attached>Content</mn-badge>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
