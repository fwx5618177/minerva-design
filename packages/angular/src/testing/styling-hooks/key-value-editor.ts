import { Component } from "@angular/core";
import { MnKeyValueEditor } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnKeyValueEditor],
  template: `<mn-key-value-editor
    [value]="[
      { key: 'duplicate', value: '1' },
      { key: 'duplicate', value: '2' },
    ]"
    disabled
  />`,
})
class Fixture {
  readonly date = new Date(2026, 9, 1);
}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
