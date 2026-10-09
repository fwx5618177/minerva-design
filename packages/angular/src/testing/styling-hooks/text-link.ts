import { Component } from "@angular/core";
import { MnTextLink } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnTextLink],
  template: `<a mnTextLink href="/">Home</a>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
