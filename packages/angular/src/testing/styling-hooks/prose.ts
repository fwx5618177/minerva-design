import { Component } from "@angular/core";
import { MnProse } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnProse],
  template: `<article mnProse>
    <h1>Title</h1>
    <p>Content</p>
  </article>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
