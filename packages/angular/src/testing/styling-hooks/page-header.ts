import { Component } from "@angular/core";
import { MnPageHeader } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnPageHeader],
  template: `<mn-page-header title="Title" description="Description"
    >Actions</mn-page-header
  >`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
