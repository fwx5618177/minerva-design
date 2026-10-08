import { defineHooks } from "../types";

export default defineHooks({
  description:
    "An action menu opened from a trigger button, with submenus, checkbox and radio items",
  react: ["Menu"],
  wc: "minerva-menu",
  parts: {
    trigger: {
      description:
        "The trigger: the native element child of Menu (state open / closed, disabled). React only: a component child (e.g. a Minerva Button) keeps its own hooks and gets aria-expanded; on the web components the trigger is your slotted element, style it from the host states (minerva-menu:state(open) > [slot=trigger])",
      states: ["state", "disabled"],
      only: "react",
    },
    content: {
      description:
        "A menu panel (role=menu: the root menu and its submenus, each with its own placement)",
      states: ["state", "size", "side", "align", "placement"],
    },
    item: {
      description:
        "An item (role=menuitem, menuitemcheckbox or menuitemradio). Item states: highlighted (focused), disabled, checked / unchecked (checkbox and radio items), expanded (submenu trigger while its submenu is open)",
      itemStates: {
        highlighted: true,
        disabled: true,
        state: ["checked", "unchecked"],
        expanded: true,
      },
    },
    "item-indicator": {
      description: "The check mark / radio dot of a checkbox or radio item",
    },
    icon: { description: "The icon of an item" },
    "item-label": { description: "The label of an item" },
    shortcut: { description: "The keyboard shortcut hint of an item" },
    group: {
      description: "A group of entries (role=group, also radio groups)",
    },
    label: { description: "A group heading or section label" },
    separator: { description: "A separator" },
  },
  states: {
    state: ["open", "closed"],
    disabled: true,
    size: ["small", "medium"],
    side: ["top", "right", "bottom", "left"],
    align: ["start", "center", "end"],
    placement: [
      "top",
      "top-start",
      "top-end",
      "right",
      "right-start",
      "right-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
    ],
  },
});
