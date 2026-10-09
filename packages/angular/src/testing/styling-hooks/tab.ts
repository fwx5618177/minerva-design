import { Component } from "@angular/core";
import { MnTabs, MnTab, MnTabPanel } from "../../components/navigation";
import type { HookScenario } from "../types";
@Component({
  imports: [MnTabs, MnTab, MnTabPanel],
  template: `<mn-tabs value="one"
    ><mn-tab value="one">One</mn-tab><mn-tab value="two" disabled>Two</mn-tab
    ><mn-tab-panel value="one">First</mn-tab-panel
    ><mn-tab-panel value="two">Second</mn-tab-panel></mn-tabs
  >`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
