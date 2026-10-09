import { Component } from "@angular/core";
import { MnAlert } from "../../components/application";
import type { HookScenario } from "../types";
@Component({
  imports: [MnAlert],
  template: `<mn-alert
      title="Notice"
      description="Details"
      collapsible
      closable
    /><mn-alert title="Closed" [expanded]="false" />`,
})
class Fixture {
  readonly columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "id", header: "ID" },
  ];
  readonly rows = [{ id: "1", name: "Ada" }];
}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
