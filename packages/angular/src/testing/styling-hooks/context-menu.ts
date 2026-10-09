import { Component } from "@angular/core";
import { MnContextMenu, type MenuItem } from "../../components/overlays";
import type { HookScenario } from "../types";
@Component({
  imports: [MnContextMenu],
  template: `<mn-context-menu
    [open]="true"
    [items]="items"
    [expanded]="['parent']"
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
  imports: [MnContextMenu],
  template: `<mn-context-menu forceMount disabled />`,
})
class Closed {}
export default [
  {
    name: "open",
    component: Fixture,
    setup: async ({ user }) => {
      const item = document.querySelector<HTMLElement>(
        '[data-minerva="context-menu"][data-part="item"]',
      );
      if (item) await user.hover(item);
    },
  },
  { name: "closed", component: Closed },
] satisfies HookScenario[];
