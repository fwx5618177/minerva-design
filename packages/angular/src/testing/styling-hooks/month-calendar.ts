import { Component } from "@angular/core";
import { MnMonthCalendar } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnMonthCalendar],
  template: `<mn-month-calendar
      [month]="date"
      value="2026-10-09"
      today="2026-10-09"
      [events]="[{ id: '1', date: '2026-10-09', title: 'Meeting' }]"
    /><mn-month-calendar [month]="date" disabled />`,
})
class Fixture {
  readonly date = new Date(2026, 9, 1);
}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
