import { Component } from "@angular/core";
import { MnSplitLayout } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnSplitLayout],
  template: `<mn-split-layout
    >Main
    <aside mnAside>Aside</aside></mn-split-layout
  >`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
