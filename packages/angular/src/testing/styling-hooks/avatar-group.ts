import { Component } from "@angular/core";
import { MnAvatarGroup } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnAvatarGroup],
  template: `<mn-avatar-group
    [items]="[{ name: 'Ada' }, { name: 'Grace' }]"
    [max]="1"
  />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
