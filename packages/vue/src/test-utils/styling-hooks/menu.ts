import { h } from "vue";
import { Menu, type MenuEntry } from "../../components/Menu";
import { mockExitTransition } from "./exitTransition";
import type { HookScenario } from "./types";

export const menuEntries: MenuEntry[] = [
  { key: "new", label: "New", icon: h("span", "+"), shortcut: "⌘N" },
  { key: "share", label: "Share", children: [{ key: "mail", label: "Mail" }] },
  { type: "separator", key: "sep" },
  { type: "checkbox", key: "grid", label: "Show grid", defaultChecked: true },
  {
    type: "radio-group",
    key: "density",
    label: "Density",
    defaultValue: "compact",
    items: [
      { value: "compact", label: "Compact" },
      { value: "comfortable", label: "Comfortable" },
    ],
  },
  {
    type: "group",
    key: "danger",
    label: "Danger zone",
    items: [{ key: "delete", label: "Delete", disabled: true }],
  },
];

const trigger = () => h("button", { type: "button" }, "Open");

export default [
  {
    name: "open, small",
    render: () =>
      h(
        Menu,
        {
          items: menuEntries,
          defaultOpen: true,
          size: "small",
          ariaLabel: "Actions",
        },
        { trigger },
      ),
  },
  {
    name: "keyboard: highlighted item, expanded submenu trigger",
    render: () =>
      h(Menu, { items: menuEntries, ariaLabel: "Actions" }, { trigger }),
    setup: async ({ user, container }) => {
      container.querySelector("button")!.focus();
      // opens on the first item, then Share, then its submenu
      await user.keyboard("{ArrowDown}{ArrowDown}{ArrowRight}");
    },
  },
  {
    name: "disabled (closed)",
    render: () => h(Menu, { items: menuEntries, disabled: true }, { trigger }),
  },
  {
    name: "closing (exit transition)",
    render: () =>
      h(
        Menu,
        { items: menuEntries, defaultOpen: true, ariaLabel: "Actions" },
        { trigger },
      ),
    setup: async ({ user }) => {
      mockExitTransition('[role="menu"]');
      await user.keyboard("{Escape}");
    },
  },
] satisfies HookScenario[];
