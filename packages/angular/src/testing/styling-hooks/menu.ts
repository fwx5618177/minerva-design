import { Component } from "@angular/core";
import { MnMenu, type MenuItem } from "../../components/overlays";
import type { HookScenario } from "../types";
@Component({
  imports: [MnMenu],
  template: `<mn-menu [open]="true" [items]="items" [expanded]="['parent']" />`,
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
@Component({ imports: [MnMenu], template: `<mn-menu forceMount disabled />` })
class Closed {}
export default [
  {
    name: "open",
    component: Fixture,
    setup: async ({ user }) => {
      const item = document.querySelector<HTMLElement>(
        '[data-minerva="menu"][data-part="item"]',
      );
      if (item) await user.hover(item);
    },
  },
  { name: "closed", component: Closed },
] satisfies HookScenario[];
