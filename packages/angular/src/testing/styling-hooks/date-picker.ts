import { Component } from "@angular/core";
import { MnDatePicker } from "../../components/date-picker";
import type { HookScenario } from "../types";

@Component({
  imports: [MnDatePicker],
  template: `<mn-date-picker aria-label="Date" />`,
})
class Closed {}

@Component({
  imports: [MnDatePicker],
  template: `<mn-date-picker
    aria-label="Date"
    [defaultValue]="value"
    [minDate]="min"
    [maxDate]="max"
  />`,
})
class Bounded {
  value = "2026-01-15";
  min = "2026-01-10";
  max = "2026-01-20";
}

@Component({
  imports: [MnDatePicker],
  template: `<mn-date-picker
    aria-label="Date"
    disabled
    invalid
    size="small"
  />`,
})
class DisabledInvalid {}

@Component({
  imports: [MnDatePicker],
  template: `<mn-date-picker aria-label="Date" readOnly />`,
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
    name: "keyboard: selected date, disabled days (min / max date)",
    component: Bounded,
    setup: async ({ user, root }) => {
      root.querySelector("input")!.focus();
      await user.keyboard("{ArrowDown}");
    },
  },
  { name: "disabled, invalid, small", component: DisabledInvalid },
  { name: "read-only", component: ReadOnly },
] satisfies HookScenario[];
