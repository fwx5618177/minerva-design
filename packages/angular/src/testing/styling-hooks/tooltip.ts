import { Component } from "@angular/core";
import { MnTooltip, type MenuItem } from "../../components/overlays";
import type { HookScenario } from "../types";
@Component({
  imports: [MnTooltip],
  template: `<mn-tooltip [open]="true" text="Help"
    ><button>Target</button></mn-tooltip
  >`,
})
class Fixture {
  readonly items: MenuItem[] = [
    { id: "label", type: "label", label: "Actions" },
    {
      id: "parent",
      label: "More",
      children: [{ id: "child", label: "Child" }],
    },
    { id: "one", label: "Enabled", checked: true, icon: "★", shortcut: "⌘E" },
    { id: "two", label: "Disabled", checked: false, disabled: true },
    { id: "sep", type: "separator" },
  ];
}
@Component({
  imports: [MnTooltip],
  template: `<mn-tooltip disabled forceMount text="Help"
    ><button>Disabled</button></mn-tooltip
  >`,
})
class Closed {}
export default [
  { name: "open", component: Fixture },
  { name: "closed", component: Closed },
] satisfies HookScenario[];
