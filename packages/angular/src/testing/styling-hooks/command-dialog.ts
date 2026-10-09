import { Component } from "@angular/core";
import { MnCommandDialog, type MenuItem } from "../../components/overlays";
import type { HookScenario } from "../types";
@Component({
  imports: [MnCommandDialog],
  template: `<mn-command-dialog
    [open]="true"
    [items]="[{ id: '1', label: 'Open file' }]"
  />`,
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
  imports: [MnCommandDialog],
  template: `<mn-command-dialog forceMount />`,
})
class Closed {}
export default [
  { name: "open", component: Fixture },
  { name: "closed", component: Closed },
] satisfies HookScenario[];
