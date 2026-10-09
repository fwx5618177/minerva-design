import { Component } from "@angular/core";
import { MnAvatar } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnAvatar],
  template: `<mn-avatar name="Ada Lovelace" /><mn-avatar
      name="Grace Hopper"
      src="/avatar.png"
    />`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
