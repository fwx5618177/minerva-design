// Arrows and navigation icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";

/** Arrow pointing up */
export const arrowUpIcon: IconDefinition = {
  name: "arrow-up",
  category: "arrows",
  tags: ["up", "direction", "north", "increase"],
  paths: ["M12 20V4", "M6 10l6-6 6 6"],
};

/** Arrow pointing down */
export const arrowDownIcon: IconDefinition = {
  name: "arrow-down",
  category: "arrows",
  tags: ["down", "direction", "south", "decrease"],
  paths: ["M12 4v16", "M6 14l6 6 6-6"],
};

/** Arrow pointing left */
export const arrowLeftIcon: IconDefinition = {
  name: "arrow-left",
  category: "arrows",
  tags: ["left", "back", "previous", "west"],
  paths: ["M20 12H4", "M10 6l-6 6 6 6"],
};

/** Arrow pointing right */
export const arrowRightIcon: IconDefinition = {
  name: "arrow-right",
  category: "arrows",
  tags: ["right", "forward", "next", "east"],
  paths: ["M4 12h16", "M14 6l6 6-6 6"],
};

/** Diagonal arrow pointing up and right */
export const arrowUpRightIcon: IconDefinition = {
  name: "arrow-up-right",
  category: "arrows",
  tags: ["diagonal", "northeast", "outward"],
  paths: ["M6 18L18 6", "M9 6h9v9"],
};

/** Diagonal arrow pointing up and left */
export const arrowUpLeftIcon: IconDefinition = {
  name: "arrow-up-left",
  category: "arrows",
  tags: ["diagonal", "northwest", "outward"],
  paths: ["M18 18L6 6", "M15 6H6v9"],
};

/** Diagonal arrow pointing down and right */
export const arrowDownRightIcon: IconDefinition = {
  name: "arrow-down-right",
  category: "arrows",
  tags: ["diagonal", "southeast", "inward"],
  paths: ["M6 6l12 12", "M18 9v9H9"],
};

/** Diagonal arrow pointing down and left */
export const arrowDownLeftIcon: IconDefinition = {
  name: "arrow-down-left",
  category: "arrows",
  tags: ["diagonal", "southwest", "inward"],
  paths: ["M18 6L6 18", "M6 9v9h9"],
};

/** Chevron pointing up */
export const chevronUpIcon: IconDefinition = {
  name: "chevron-up",
  category: "arrows",
  tags: ["caret", "collapse", "up"],
  paths: ["M6 15l6-6 6 6"],
};

/** Chevron pointing down */
export const chevronDownIcon: IconDefinition = {
  name: "chevron-down",
  category: "arrows",
  tags: ["caret", "expand", "dropdown", "down"],
  paths: ["M6 9l6 6 6-6"],
};

/** Chevron pointing left */
export const chevronLeftIcon: IconDefinition = {
  name: "chevron-left",
  category: "arrows",
  tags: ["caret", "back", "previous"],
  paths: ["M15 6l-6 6 6 6"],
};

/** Chevron pointing right */
export const chevronRightIcon: IconDefinition = {
  name: "chevron-right",
  category: "arrows",
  tags: ["caret", "forward", "next"],
  paths: ["M9 6l6 6-6 6"],
};

/** Double chevron pointing up */
export const chevronsUpIcon: IconDefinition = {
  name: "chevrons-up",
  category: "arrows",
  tags: ["double", "top", "collapse"],
  paths: ["M7 11.5l5-5 5 5", "M7 17.5l5-5 5 5"],
};

/** Double chevron pointing down */
export const chevronsDownIcon: IconDefinition = {
  name: "chevrons-down",
  category: "arrows",
  tags: ["double", "bottom", "expand"],
  paths: ["M7 6.5l5 5 5-5", "M7 12.5l5 5 5-5"],
};

/** Double chevron pointing left */
export const chevronsLeftIcon: IconDefinition = {
  name: "chevrons-left",
  category: "arrows",
  tags: ["double", "first", "rewind"],
  paths: ["M11.5 7l-5 5 5 5", "M17.5 7l-5 5 5 5"],
};

/** Double chevron pointing right */
export const chevronsRightIcon: IconDefinition = {
  name: "chevrons-right",
  category: "arrows",
  tags: ["double", "last", "skip"],
  paths: ["M6.5 7l5 5-5 5", "M12.5 7l5 5-5 5"],
};

/** Chevrons pointing up and down */
export const chevronUpDownIcon: IconDefinition = {
  name: "chevron-up-down",
  category: "arrows",
  tags: ["select", "sort", "dropdown", "toggle"],
  paths: ["M7 9l5-5 5 5", "M7 15l5 5 5-5"],
};

/** Arrow turning up and to the left */
export const cornerUpLeftIcon: IconDefinition = {
  name: "corner-up-left",
  category: "arrows",
  tags: ["return", "reply", "back"],
  paths: ["M9 15l-5-5 5-5", "M4 10h10a6 6 0 0 1 6 6v4"],
};

/** Arrow turning down and to the right */
export const cornerDownRightIcon: IconDefinition = {
  name: "corner-down-right",
  category: "arrows",
  tags: ["enter", "indent", "forward"],
  paths: ["M15 10l5 5-5 5", "M20 15H10a6 6 0 0 1-6-6V4"],
};

/** Arrow leaving a box */
export const externalLinkIcon: IconDefinition = {
  name: "external-link",
  category: "arrows",
  tags: ["open", "new window", "outbound", "launch"],
  paths: [
    "M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
    "M14 4h6v6",
    "M20 4l-9 9",
  ],
};

/** Circular arrow turning clockwise */
export const refreshIcon: IconDefinition = {
  name: "refresh",
  category: "arrows",
  tags: ["reload", "sync", "rotate", "clockwise"],
  paths: ["M19.73 14.07A8 8 0 1 1 18.93 8", "M19.83 4.62L18.93 8L15.55 7.09"],
};

/** Circular arrow turning counterclockwise */
export const rotateCcwIcon: IconDefinition = {
  name: "rotate-ccw",
  category: "arrows",
  tags: ["rotate", "counterclockwise", "reset", "revert"],
  paths: ["M4.27 14.07A8 8 0 1 0 5.07 8", "M8.45 7.09L5.07 8L4.17 4.62"],
};

/** Curved arrow pointing back */
export const undoIcon: IconDefinition = {
  name: "undo",
  category: "arrows",
  tags: ["back", "revert", "history"],
  paths: ["M9 14L4 9l5-5", "M4 9h10.5a5.5 5.5 0 0 1 0 11H11"],
};

/** Curved arrow pointing forward */
export const redoIcon: IconDefinition = {
  name: "redo",
  category: "arrows",
  tags: ["forward", "repeat", "history"],
  paths: ["M15 14l5-5-5-5", "M20 9H9.5a5.5 5.5 0 0 0 0 11H13"],
};

/** Arrows pointing in four directions */
export const moveIcon: IconDefinition = {
  name: "move",
  category: "arrows",
  tags: ["drag", "pan", "position", "arrows"],
  paths: [
    "M12 3v18",
    "M3 12h18",
    "M9 6l3-3 3 3",
    "M9 18l3 3 3-3",
    "M6 9l-3 3 3 3",
    "M18 9l3 3-3 3",
  ],
};

/** Arrows expanding outwards */
export const maximizeIcon: IconDefinition = {
  name: "maximize",
  category: "arrows",
  tags: ["fullscreen", "expand", "enlarge"],
  paths: ["M14 4h6v6", "M20 4l-6 6", "M10 20H4v-6", "M4 20l6-6"],
};

/** Arrows collapsing inwards */
export const minimizeIcon: IconDefinition = {
  name: "minimize",
  category: "arrows",
  tags: ["exit fullscreen", "shrink", "collapse"],
  paths: ["M14 4v6h6", "M14 10l6-6", "M4 14h6v6", "M10 14l-6 6"],
};

/** Arrow entering a door */
export const logInIcon: IconDefinition = {
  name: "log-in",
  category: "arrows",
  tags: ["sign in", "enter", "login", "auth"],
  paths: [
    "M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4",
    "M3 12h12",
    "M11 8l4 4-4 4",
  ],
};

/** Arrow leaving a door */
export const logOutIcon: IconDefinition = {
  name: "log-out",
  category: "arrows",
  tags: ["sign out", "exit", "logout", "leave"],
  paths: [
    "M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4",
    "M9 12h11.5",
    "M16.5 8l4 4-4 4",
  ],
};

/** House */
export const homeIcon: IconDefinition = {
  name: "home",
  category: "arrows",
  tags: ["house", "start", "main", "dashboard"],
  paths: [
    "M3 11.5l9-8 9 8",
    "M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9",
    "M10 20v-4.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20",
  ],
};

/** Three horizontal lines */
export const menuIcon: IconDefinition = {
  name: "menu",
  category: "arrows",
  tags: ["hamburger", "navigation", "lines", "drawer"],
  paths: ["M4 6h16", "M4 12h16", "M4 18h16"],
};

/** Three dots in a row */
export const moreHorizontalIcon: IconDefinition = {
  name: "more-horizontal",
  category: "arrows",
  tags: ["ellipsis", "options", "overflow", "dots"],
  paths: [
    "M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  ],
};

/** Three dots in a column */
export const moreVerticalIcon: IconDefinition = {
  name: "more-vertical",
  category: "arrows",
  tags: ["ellipsis", "options", "kebab", "dots"],
  paths: [
    "M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M11 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  ],
};

/** Two columns of dots */
export const gripVerticalIcon: IconDefinition = {
  name: "grip-vertical",
  category: "arrows",
  tags: ["drag", "handle", "reorder", "grab"],
  paths: [
    "M8 6a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M8 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M8 18a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M14 6a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M14 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M14 18a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  ],
};
