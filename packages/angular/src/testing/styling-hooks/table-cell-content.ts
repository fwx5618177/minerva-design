import { Component } from "@angular/core";
import { MnTableCellContent } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnTableCellContent],
  template: `<mn-table-cell-content primary="Item" secondary="Details" />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
