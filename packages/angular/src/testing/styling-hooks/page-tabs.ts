import { Component } from "@angular/core";
import { MnPageTabs, MnPageTab } from "../../components/navigation";
import type { HookScenario } from "../types";
@Component({
  imports: [MnPageTabs, MnPageTab],
  template: `<mn-page-tabs
    ><mn-page-tab label="Home" href="/" current icon="★" /><mn-page-tab
      label="Disabled"
      disabled
  /></mn-page-tabs>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
