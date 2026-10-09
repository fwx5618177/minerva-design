import { Component } from "@angular/core";
import { MnPageSection } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnPageSection],
  template: `<mn-page-section title="Title" description="Description" icon="★"
    >Content</mn-page-section
  >`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
