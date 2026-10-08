import userEvent from "@testing-library/user-event";
import type { WcHookScenario } from "../types";
import { settle } from "../../utils";

export const menuEntries = `
  <minerva-menu-item value="new" shortcut="⌘N"><span slot="icon">+</span>New</minerva-menu-item>
  <minerva-menu-item value="share">Share
    <minerva-menu-item value="mail">Mail</minerva-menu-item>
  </minerva-menu-item>
  <minerva-menu-separator></minerva-menu-separator>
  <minerva-menu-label>View</minerva-menu-label>
  <minerva-menu-checkbox-item value="grid" checked>Show grid</minerva-menu-checkbox-item>
  <minerva-menu-group label="Density">
    <minerva-menu-radio-item value="compact" checked>Compact</minerva-menu-radio-item>
    <minerva-menu-radio-item value="comfortable">Comfortable</minerva-menu-radio-item>
  </minerva-menu-group>
  <minerva-menu-group label="Danger zone">
    <minerva-menu-item value="delete" disabled>Delete</minerva-menu-item>
  </minerva-menu-group>`;

export default [
  {
    name: "open, small",
    html: `<minerva-menu open size="small" aria-label="Actions">
      <button slot="trigger">Open</button>${menuEntries}
    </minerva-menu>`,
  },
  {
    name: "keyboard: highlighted item, expanded submenu trigger",
    html: `<minerva-menu aria-label="Actions">
      <button slot="trigger">Open</button>${menuEntries}
    </minerva-menu>`,
    setup: async (root) => {
      const user = userEvent.setup();
      root.querySelector("button")!.focus();
      // opens on the first item, then Share, then its submenu
      await user.keyboard("{ArrowDown}");
      await settle();
      await user.keyboard("{ArrowDown}{ArrowRight}");
    },
  },
  {
    name: "disabled (closed)",
    html: `<minerva-menu disabled>
      <button slot="trigger">Open</button>${menuEntries}
    </minerva-menu>`,
  },
] satisfies WcHookScenario[];
