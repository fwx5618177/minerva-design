import { Component } from "@angular/core";
import { MnPagination } from "../../components/navigation";
import type { HookScenario } from "../types";
@Component({
  imports: [MnPagination],
  template: `<mn-pagination
      [total]="100"
      simple
      showJumper
      showSizeChanger
    /><mn-pagination [total]="100" disabled />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
