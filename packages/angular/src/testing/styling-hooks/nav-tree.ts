import { Component } from "@angular/core";
import { MnNavTree } from "../../components/application";
import type { HookScenario } from "../types";
@Component({
  imports: [MnNavTree],
  template: `<mn-nav-tree
    [items]="[
      {
        id: 'group',
        label: 'Group',
        icon: '★',
        description: 'Details',
        children: [{ id: 'child', label: 'Child', disabled: true }],
      },
    ]"
    [expanded]="['group']"
    value="group"
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
