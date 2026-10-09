import { Component } from "@angular/core";
import { MnPopover, type MenuItem } from "../../components/overlays";
import type { HookScenario } from "../types";
@Component({
  imports: [MnPopover],
  template: `<mn-popover [open]="true">Content</mn-popover>`,
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
  imports: [MnPopover],
  template: `<mn-popover forceMount>Content</mn-popover>`,
})
class Closed {}
export default [
  { name: "open", component: Fixture },
  { name: "closed", component: Closed },
] satisfies HookScenario[];
