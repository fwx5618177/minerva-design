import { Component } from "@angular/core";
import { MnJsonField } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnJsonField],
  template: `<mn-json-field value="broken" disabled readOnly required />`,
})
class Fixture {
  readonly date = new Date(2026, 9, 1);
}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
