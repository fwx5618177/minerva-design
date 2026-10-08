import type { WcHookScenario } from "../types";

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
    name: "disabled (closed)",
    html: `<minerva-menu disabled>
      <button slot="trigger">Open</button>${menuEntries}
    </minerva-menu>`,
  },
] satisfies WcHookScenario[];
