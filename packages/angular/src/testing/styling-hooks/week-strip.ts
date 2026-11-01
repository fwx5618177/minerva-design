import { Component } from "@angular/core";
import { MnWeekStrip } from "../../components/data";
import type { HookScenario } from "../types";
@Component({
  imports: [MnWeekStrip],
  template: `<mn-week-strip
      value="2026-01-06"
      today="2026-01-07"
      showNavigation
      [markers]="{ '2026-01-05': 3, '2026-01-07': true }"
    /><mn-week-strip
      value="2026-01-06"
      today="2026-01-06"
      showNavigation
      disabled
    /><mn-week-strip today="2026-01-06" size="small" /><mn-week-strip
      today="2026-01-06"
      size="large"
    />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
