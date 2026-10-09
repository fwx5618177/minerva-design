import { Component } from "@angular/core";
import { MnToastRegion } from "../../components/application";
import type { HookScenario } from "../types";
@Component({
  imports: [MnToastRegion],
  template: `<mn-toast-region
    [messages]="[
      {
        id: '1',
        title: 'Info',
        description: 'Details',
        action: 'Undo',
        color: 'info',
        loading: true,
      },
      { id: '2', title: 'Success', color: 'success', state: 'closed' },
      { id: '3', title: 'Warning', color: 'warning' },
      { id: '4', title: 'Error', color: 'danger' },
    ]"
  />`,
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
