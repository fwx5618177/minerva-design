import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A menu opened at the pointer on right click / long press / Shift+F10 in its area",
  react: ["ContextMenu"],
  wc: "minerva-context-menu",
  parts: {
    trigger: {
      description:
        "The area: the native element child of ContextMenu (state open / closed, disabled). React only: a component child (e.g. a Minerva Card) keeps its own hooks; on the web components the area is your own child element, style it from the host states (minerva-context-menu:state(open) > .my-area)",
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
