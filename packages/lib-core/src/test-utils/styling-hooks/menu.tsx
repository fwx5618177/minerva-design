import { Menu, type MenuEntry } from "../../components/Menu";
import { mockExitTransition } from "./exitTransition";
import type { HookScenario } from "./types";

export const menuEntries: MenuEntry[] = [
  { key: "new", label: "New", icon: <span>+</span>, shortcut: "⌘N" },
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

export default [
  {
    name: "open, small",
    element: (
      <Menu items={menuEntries} defaultOpen size="small" aria-label="Actions">
        <button type="button">Open</button>
      </Menu>
    ),
  },
  {
    name: "disabled (closed)",
    element: (
      <Menu items={menuEntries} disabled>
        <button type="button">Open</button>
      </Menu>
    ),
  },
  {
    name: "closing (exit transition)",
    element: (
      <Menu items={menuEntries} defaultOpen aria-label="Actions">
        <button type="button">Open</button>
      </Menu>
    ),
    setup: async ({ user }) => {
      mockExitTransition('[role="menu"]');
      await user.keyboard("{Escape}");
    },
  },
] satisfies HookScenario[];
