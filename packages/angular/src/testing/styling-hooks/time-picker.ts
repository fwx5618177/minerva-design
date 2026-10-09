import { Component } from "@angular/core";
import { MnTimePicker } from "../../components/time-picker";
import type { HookScenario } from "../types";

@Component({
  imports: [MnTimePicker],
  template: `<mn-time-picker aria-label="Time" />`,
})
class Closed {}

@Component({
  imports: [MnTimePicker],
  template: `<mn-time-picker
    aria-label="Time"
    [defaultValue]="value"
    [minTime]="min"
    [maxTime]="max"
  />`,
})
class Bounded {
  value = new Date(2024, 0, 1, 10, 30, 0);
  min = new Date(2024, 0, 1, 9, 0, 0);
  max = new Date(2024, 0, 1, 17, 0, 0);
}

@Component({
  imports: [MnTimePicker],
  template: `<mn-time-picker
    aria-label="Time"
    disabled
    invalid
    size="small"
  />`,
})
class DisabledInvalid {}

@Component({
  imports: [MnTimePicker],
  template: `<mn-time-picker aria-label="Time" readOnly />`,
})
class ReadOnly {}

export default [
  { name: "closed", component: Closed },
  {
    name: "open",
    component: Closed,
    setup: async ({ user, root }) => {
      await user.click(root.querySelector("input")!);
    },
  },
  {
    name: "keyboard: selected units, disabled units (min / max time)",
    component: Bounded,
    setup: async ({ user, root }) => {
      root.querySelector("input")!.focus();
      await user.keyboard("{ArrowDown}");
    },
  },
  { name: "disabled, invalid, small", component: DisabledInvalid },
  { name: "read-only", component: ReadOnly },
] satisfies HookScenario[];
