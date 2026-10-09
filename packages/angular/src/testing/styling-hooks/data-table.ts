import { Component } from "@angular/core";
import { MnDataTable } from "../../components/application";
import type { HookScenario } from "../types";
@Component({
  imports: [MnDataTable],
  template: `<mn-data-table
      [columns]="columns"
      [rows]="rows"
      selectable
      [selection]="['1']"
      [sort]="{ key: 'name', direction: 'ascending' }"
    /><mn-data-table
      [columns]="columns"
      [rows]="rows"
      [sort]="{ key: 'name', direction: 'descending' }"
    /><mn-data-table [columns]="columns" loading /><mn-data-table
      [columns]="columns"
      error="Unable to load"
    /><mn-data-table [columns]="columns" />`,
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
