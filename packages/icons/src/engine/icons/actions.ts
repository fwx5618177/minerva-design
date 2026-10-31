// Action icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";

/** Plus sign */
export const plusIcon: IconDefinition = {
  name: "plus",
  category: "actions",
  tags: ["add", "new", "create", "increase"],
  paths: ["M12 5v14", "M5 12h14"],
};

/** Minus sign */
export const minusIcon: IconDefinition = {
  name: "minus",
  category: "actions",
  tags: ["subtract", "remove", "decrease"],
  paths: ["M5 12h14"],
};

/** Diagonal cross */
export const closeIcon: IconDefinition = {
  name: "close",
  category: "actions",
  tags: ["x", "cancel", "dismiss", "delete"],
  paths: ["M6 6l12 12", "M18 6L6 18"],
};

/** Check mark */
export const checkIcon: IconDefinition = {
  name: "check",
  category: "actions",
  tags: ["done", "confirm", "ok", "tick"],
  paths: ["M4.5 12.5l5 5 10-11"],
};

/** Magnifying glass */
export const searchIcon: IconDefinition = {
  name: "search",
  category: "actions",
  tags: ["find", "lookup", "magnifier", "query"],
  paths: ["M4 10.5a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0", "M15.5 15.5L20 20"],
};

/** Magnifying glass with a plus */
export const zoomInIcon: IconDefinition = {
  name: "zoom-in",
  category: "actions",
  tags: ["magnify", "enlarge", "scale up"],
  paths: [
    "M4 10.5a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0",
    "M15.5 15.5L20 20",
    "M8 10.5h5",
    "M10.5 8v5",
  ],
};

/** Magnifying glass with a minus */
export const zoomOutIcon: IconDefinition = {
  name: "zoom-out",
  category: "actions",
  tags: ["reduce", "shrink", "scale down"],
  paths: [
    "M4 10.5a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0",
    "M15.5 15.5L20 20",
    "M8 10.5h5",
  ],
};

/** Pencil */
export const editIcon: IconDefinition = {
  name: "edit",
  category: "actions",
  tags: ["pencil", "write", "modify", "rename"],
  paths: ["M16.5 4.5a2.12 2.12 0 0 1 3 3L8 19l-4 1 1-4Z", "M14.5 6.5l3 3"],
};

/** Trash can */
export const trashIcon: IconDefinition = {
  name: "trash",
  category: "actions",
  tags: ["delete", "remove", "bin", "garbage"],
  paths: [
    "M4 6h16",
    "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
    "M6 6l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13",
    "M10 10.5v6",
    "M14 10.5v6",
  ],
};

/** Two overlapping sheets */
export const copyIcon: IconDefinition = {
  name: "copy",
  category: "actions",
  tags: ["duplicate", "clone", "paste"],
  paths: [
    "M5 8h9a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-9a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2Z",
    "M8 8V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-3",
  ],
};

/** Clipboard */
export const clipboardIcon: IconDefinition = {
  name: "clipboard",
  category: "actions",
  tags: ["paste", "board", "notes"],
  paths: [
    "M8.5 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.5",
    "M9.5 2.5h5a1 1 0 0 1 1 1v1.5a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-1.5a1 1 0 0 1 1 -1Z",
  ],
};

/** Arrow pointing down into a tray */
export const downloadIcon: IconDefinition = {
  name: "download",
  category: "actions",
  tags: ["save", "import", "get"],
  paths: [
    "M12 3.5V14",
    "M7.5 9.5l4.5 4.5 4.5-4.5",
    "M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3",
  ],
};

/** Arrow pointing up out of a tray */
export const uploadIcon: IconDefinition = {
  name: "upload",
  category: "actions",
  tags: ["send", "export", "put"],
  paths: [
    "M12 14V3.5",
    "M7.5 8L12 3.5 16.5 8",
    "M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3",
  ],
};

/** Arrow rising out of a box */
export const shareIcon: IconDefinition = {
  name: "share",
  category: "actions",
  tags: ["export", "send", "publish"],
  paths: [
    "M12 3v11",
    "M8 7l4-4 4 4",
    "M8 10H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2",
  ],
};

/** Chain links */
export const linkIcon: IconDefinition = {
  name: "link",
  category: "actions",
  tags: ["url", "chain", "hyperlink", "attach"],
  paths: [
    "M8.46 10.59L4.58 14.47A3.5 3.5 0 0 0 9.53 19.42L13.41 15.54",
    "M10.59 8.46L14.47 4.58A3.5 3.5 0 0 1 19.42 9.53L15.54 13.41",
    "M9.53 14.47L14.47 9.53",
  ],
};

/** Funnel */
export const filterIcon: IconDefinition = {
  name: "filter",
  category: "actions",
  tags: ["funnel", "refine", "narrow"],
  paths: ["M4 4h16l-6 8v6.5l-4 2V12Z"],
};

/** Up arrow beside lines growing in length */
export const sortAscendingIcon: IconDefinition = {
  name: "sort-ascending",
  category: "actions",
  tags: ["order", "ascending", "increase"],
  paths: ["M7 20V4", "M3.5 7.5L7 4l3.5 3.5", "M13 6h4", "M13 12h6", "M13 18h8"],
};

/** Down arrow beside lines shrinking in length */
export const sortDescendingIcon: IconDefinition = {
  name: "sort-descending",
  category: "actions",
  tags: ["order", "descending", "decrease"],
  paths: [
    "M7 4v16",
    "M3.5 16.5L7 20l3.5-3.5",
    "M13 6h8",
    "M13 12h6",
    "M13 18h4",
  ],
};

/** Cog wheel */
export const settingsIcon: IconDefinition = {
  name: "settings",
  category: "actions",
  tags: ["gear", "cog", "preferences", "options"],
  paths: [
    "M10.43 5.18L10.51 2.62A9.5 9.5 0 0 1 13.49 2.62L13.57 5.18A7 7 0 0 1 15.71 6.06L17.58 4.31A9.5 9.5 0 0 1 19.69 6.42L17.94 8.29A7 7 0 0 1 18.82 10.43L21.38 10.51A9.5 9.5 0 0 1 21.38 13.49L18.82 13.57A7 7 0 0 1 17.94 15.71L19.69 17.58A9.5 9.5 0 0 1 17.58 19.69L15.71 17.94A7 7 0 0 1 13.57 18.82L13.49 21.38A9.5 9.5 0 0 1 10.51 21.38L10.43 18.82A7 7 0 0 1 8.29 17.94L6.42 19.69A9.5 9.5 0 0 1 4.31 17.58L6.06 15.71A7 7 0 0 1 5.18 13.57L2.62 13.49A9.5 9.5 0 0 1 2.62 10.51L5.18 10.43A7 7 0 0 1 6.06 8.29L4.31 6.42A9.5 9.5 0 0 1 6.42 4.31L8.29 6.06A7 7 0 0 1 10.43 5.18Z",
    "M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  ],
};

/** Horizontal sliders */
export const slidersIcon: IconDefinition = {
  name: "sliders",
  category: "actions",
  tags: ["controls", "adjust", "equalizer", "tune"],
  paths: [
    "M4 6h9",
    "M17 6h3",
    "M13 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M4 12h2",
    "M10 12h10",
    "M6 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M4 18h10",
    "M18 18h2",
    "M14 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
  ],
};

/** Floppy disk */
export const saveIcon: IconDefinition = {
  name: "save",
  category: "actions",
  tags: ["floppy", "disk", "store"],
  paths: [
    "M5 3h11l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    "M7 21v-6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6",
    "M8 3v3a1 1 0 0 0 1 1h5",
  ],
};

/** Printer */
export const printIcon: IconDefinition = {
  name: "print",
  category: "actions",
  tags: ["printer", "paper", "output"],
  paths: [
    "M7 8V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4",
    "M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
    "M7 14h10v6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1Z",
    "M17.5 11h.01",
  ],
};

/** Paper plane */
export const sendIcon: IconDefinition = {
  name: "send",
  category: "actions",
  tags: ["paper plane", "submit", "message", "deliver"],
  paths: ["M21 3L3 10l7.5 3.5L14 21Z", "M10.5 13.5L21 3"],
};

/** Push pin */
export const pinIcon: IconDefinition = {
  name: "pin",
  category: "actions",
  tags: ["pushpin", "attach", "stick", "keep"],
  paths: ["M7.5 3h9", "M9 3v8l-2.5 3h11L15 11V3", "M12 14v7"],
};

/** Plus sign in a circle */
export const plusCircleIcon: IconDefinition = {
  name: "plus-circle",
  category: "actions",
  tags: ["add", "new", "create"],
  paths: ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M12 8v8", "M8 12h8"],
};

/** Minus sign in a circle */
export const minusCircleIcon: IconDefinition = {
  name: "minus-circle",
  category: "actions",
  tags: ["remove", "subtract", "decrease"],
  paths: ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M8 12h8"],
};

/** Open eye */
export const eyeIcon: IconDefinition = {
  name: "eye",
  category: "actions",
  tags: ["view", "show", "visible", "preview"],
  paths: [
    "M2.5 12C5 7.5 8.3 5 12 5s7 2.5 9.5 7c-2.5 4.5-5.8 7-9.5 7S5 16.5 2.5 12Z",
    "M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  ],
};

/** Eye with a slash */
export const eyeOffIcon: IconDefinition = {
  name: "eye-off",
  category: "actions",
  tags: ["hide", "hidden", "invisible", "private"],
  paths: [
    "M2.5 12C5 7.5 8.3 5 12 5s7 2.5 9.5 7c-2.5 4.5-5.8 7-9.5 7S5 16.5 2.5 12Z",
    "M11.22 9.1A3 3 0 0 1 14.9 12.78",
    "M12.78 14.9A3 3 0 0 1 9.1 11.22",
    "M4 4l16 16",
  ],
};

/** Closed padlock */
export const lockIcon: IconDefinition = {
  name: "lock",
  category: "actions",
  tags: ["padlock", "secure", "private", "locked"],
  paths: [
    "M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-7a2 2 0 0 1 2 -2Z",
    "M8 10V7a4 4 0 0 1 8 0v3",
    "M12 14.5v2.5",
  ],
};

/** Open padlock */
export const unlockIcon: IconDefinition = {
  name: "unlock",
  category: "actions",
  tags: ["padlock", "unsecure", "open", "unlocked"],
  paths: [
    "M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-7a2 2 0 0 1 2 -2Z",
    "M8 10V7a4 4 0 0 1 7.75-1.4",
    "M12 14.5v2.5",
  ],
};

/** Key */
export const keyIcon: IconDefinition = {
  name: "key",
  category: "actions",
  tags: ["password", "access", "credentials", "secret"],
  paths: [
    "M3 16.5a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0",
    "M10.68 13.32L20 4",
    "M17 7l2.5 2.5",
    "M14.5 9.5l2 2",
  ],
};

/** Scissors */
export const scissorsIcon: IconDefinition = {
  name: "scissors",
  category: "actions",
  tags: ["cut", "trim", "clip"],
  paths: [
    "M3 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M3 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M8.28 7.95L20 18",
    "M8.28 16.05L20 6",
  ],
};

/** Crop marks */
export const cropIcon: IconDefinition = {
  name: "crop",
  category: "actions",
  tags: ["trim", "resize", "frame"],
  paths: ["M7 3v12a2 2 0 0 0 2 2h12", "M3 7h12a2 2 0 0 1 2 2v12"],
};
