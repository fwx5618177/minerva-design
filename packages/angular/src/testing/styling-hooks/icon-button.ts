import { Component } from "@angular/core";
import { MnIconButton } from "../../components/foundations";
import type { HookScenario } from "../types";
@Component({
  imports: [MnIconButton],
  template: `<button mnIconButton label="Save">★</button
    ><button mnIconButton label="Saving" loading disabled [pressed]="true">
      ★
    </button>`,
})
class Fixture {}
export default [
  { name: "content and states", component: Fixture },
] satisfies HookScenario[];
