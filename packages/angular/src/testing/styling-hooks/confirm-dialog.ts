import { Component } from "@angular/core";
import { MnConfirmDialog, type MenuItem } from "../../components/overlays";
import type { HookScenario } from "../types";
@Component({
  imports: [MnConfirmDialog],
  template: `<mn-confirm-dialog [open]="true" description="Details" loading />`,
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
  imports: [MnConfirmDialog],
  template: `<mn-confirm-dialog forceMount />`,
})
class Closed {}
export default [
  { name: "open", component: Fixture },
  { name: "closed", component: Closed },
] satisfies HookScenario[];
