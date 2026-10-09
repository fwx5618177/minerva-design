import { Component } from "@angular/core";
import { MnCodeBlock } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnCodeBlock],
  template: `<mn-code-block
    code="const x = 1;"
    language="typescript"
    copyable
  />`,
})
class Fixture {
  readonly date = new Date(2026, 9, 1);
}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
