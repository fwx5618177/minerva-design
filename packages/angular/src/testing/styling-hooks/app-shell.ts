import { Component } from "@angular/core";
import { MnAppShell } from "../../components/application";
import type { HookScenario } from "../types";
@Component({
  imports: [MnAppShell],
  template: `<mn-app-shell [open]="true" title="Workspace"
    ><ng-template>Navigation</ng-template>Content</mn-app-shell
  >`,
})
class Fixture {
  readonly columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "id", header: "ID" },
  ];
  readonly rows = [{ id: "1", name: "Ada" }];
}
@Component({ imports: [MnAppShell], template: `<mn-app-shell forceMount />` })
class Closed {}
export default [
  { name: "content and states", component: Fixture },
  { name: "closed", component: Closed },
] satisfies HookScenario[];
