import { Component } from "@angular/core";
import { MnSegmentedControl } from "../../components/segmented-control";
import type { HookScenario } from "../types";
@Component({
  imports: [MnSegmentedControl],
  template: `<mn-segmented-control
      aria-label="View"
      value="list"
      [options]="[
        { value: 'list', label: 'List', icon: '≡' },
        { value: 'grid', label: 'Grid' },
        { value: 'map', label: 'Map', disabled: true },
      ]"
    /><mn-segmented-control
      aria-label="Small"
      [options]="['a', 'b']"
      value="a"
      size="small"
      color="primary"
      disabled
    /><mn-segmented-control
      aria-label="Large"
      [options]="['a', 'b']"
      value="b"
      size="large"
      fullWidth
    />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
