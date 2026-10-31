// Interface icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";

/** Sun with rays */
export const sunIcon: IconDefinition = {
  name: "sun",
  category: "interface",
  tags: ["light", "day", "brightness", "theme"],
  paths: [
    "M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
    "M12 5L12 2.5",
    "M16.95 7.05L18.72 5.28",
    "M19 12L21.5 12",
    "M16.95 16.95L18.72 18.72",
    "M12 19L12 21.5",
    "M7.05 16.95L5.28 18.72",
    "M5 12L2.5 12",
    "M7.05 7.05L5.28 5.28",
  ],
};

/** Crescent moon */
export const moonIcon: IconDefinition = {
  name: "moon",
  category: "interface",
  tags: ["dark", "night", "theme", "sleep"],
  paths: ["M20 14.5A8.5 8.5 0 1 1 9.5 4A8 8 0 0 0 20 14.5Z"],
};

/** Bell */
export const bellIcon: IconDefinition = {
  name: "bell",
  category: "interface",
  tags: ["notification", "alert", "alarm", "ring"],
  paths: [
    "M18 15V9.5a6 6 0 0 0-12 0V15l-1.5 2.5h15Z",
    "M10 20a2.2 2.2 0 0 0 4 0",
  ],
};

/** Bell with a slash */
export const bellOffIcon: IconDefinition = {
  name: "bell-off",
  category: "interface",
  tags: ["mute", "silent", "notifications off"],
  paths: [
    "M18 15V9.5a6 6 0 0 0-12 0V15l-1.5 2.5h15Z",
    "M10 20a2.2 2.2 0 0 0 4 0",
    "M3 3l18 18",
  ],
};

/** Bookmark ribbon */
export const bookmarkIcon: IconDefinition = {
  name: "bookmark",
  category: "interface",
  tags: ["save", "favorite", "saved", "read later"],
  paths: ["M8 3h8a2 2 0 0 1 2 2v16l-6-4-6 4V5a2 2 0 0 1 2-2Z"],
};

/** Five-pointed star */
export const starIcon: IconDefinition = {
  name: "star",
  category: "interface",
  tags: ["favorite", "rating", "like", "featured"],
  paths: [
    "M12 3L14.53 9.32L21.32 9.77L16.09 14.13L17.76 20.73L12 17.1L6.24 20.73L7.91 14.13L2.68 9.77L9.47 9.32Z",
  ],
};

/** Heart */
export const heartIcon: IconDefinition = {
  name: "heart",
  category: "interface",
  tags: ["love", "like", "favorite", "health"],
  paths: [
    "M12 20.5C6 16.5 3 13 3 9a4.75 4.75 0 0 1 9-2 4.75 4.75 0 0 1 9 2c0 4-3 7.5-9 11.5Z",
  ],
};

/** Flag on a pole */
export const flagIcon: IconDefinition = {
  name: "flag",
  category: "interface",
  tags: ["report", "mark", "milestone", "goal"],
  paths: ["M5 21V3.5", "M5 4h14l-3 4.5 3 4.5H5"],
};

/** Price tag */
export const tagIcon: IconDefinition = {
  name: "tag",
  category: "interface",
  tags: ["label", "price", "category", "badge"],
  paths: [
    "M3 5v6.2a2 2 0 0 0 .6 1.4l8.8 8.8a2 2 0 0 0 2.8 0l5.2-5.2a2 2 0 0 0 0-2.8L11.6 3.6A2 2 0 0 0 10.2 3H5a2 2 0 0 0-2 2Z",
    "M6 7.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0",
  ],
};

/** Calendar page */
export const calendarIcon: IconDefinition = {
  name: "calendar",
  category: "interface",
  tags: ["date", "schedule", "event", "month"],
  paths: [
    "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2Z",
    "M8 3v4",
    "M16 3v4",
    "M3 10h18",
  ],
};

/** Clock face */
export const clockIcon: IconDefinition = {
  name: "clock",
  category: "interface",
  tags: ["time", "hour", "watch", "schedule"],
  paths: ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M12 7v5l3.5 2"],
};

/** Person */
export const userIcon: IconDefinition = {
  name: "user",
  category: "interface",
  tags: ["person", "account", "profile", "avatar"],
  paths: [
    "M8 8a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
    "M5 20.5v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1",
  ],
};

/** Group of people */
export const usersIcon: IconDefinition = {
  name: "users",
  category: "interface",
  tags: ["group", "team", "people", "members"],
  paths: [
    "M5.5 8a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0",
    "M2.5 20.5v-1A4.5 4.5 0 0 1 7 15h4a4.5 4.5 0 0 1 4.5 4.5v1",
    "M15.5 4.6a3.5 3.5 0 0 1 0 6.8",
    "M18 15h.5a3 3 0 0 1 3 3v2.5",
  ],
};

/** Person with a plus sign */
export const userPlusIcon: IconDefinition = {
  name: "user-plus",
  category: "interface",
  tags: ["add user", "invite", "signup", "new member"],
  paths: [
    "M6 8a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
    "M3 20.5v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1",
    "M19 8v6",
    "M16 11h6",
  ],
};

/** Four squares in a grid */
export const layoutGridIcon: IconDefinition = {
  name: "layout-grid",
  category: "interface",
  tags: ["grid", "tiles", "apps", "dashboard"],
  paths: [
    "M4.5 3h4.5a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1 -1.5 1.5h-4.5a1.5 1.5 0 0 1 -1.5 -1.5v-4.5a1.5 1.5 0 0 1 1.5 -1.5Z",
    "M15 3h4.5a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1 -1.5 1.5h-4.5a1.5 1.5 0 0 1 -1.5 -1.5v-4.5a1.5 1.5 0 0 1 1.5 -1.5Z",
    "M4.5 13.5h4.5a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1 -1.5 1.5h-4.5a1.5 1.5 0 0 1 -1.5 -1.5v-4.5a1.5 1.5 0 0 1 1.5 -1.5Z",
    "M15 13.5h4.5a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1 -1.5 1.5h-4.5a1.5 1.5 0 0 1 -1.5 -1.5v-4.5a1.5 1.5 0 0 1 1.5 -1.5Z",
  ],
};

/** Bulleted list */
export const listIcon: IconDefinition = {
  name: "list",
  category: "interface",
  tags: ["bullets", "items", "rows", "unordered"],
  paths: [
    "M8 6h12",
    "M8 12h12",
    "M8 18h12",
    "M4 6h.01",
    "M4 12h.01",
    "M4 18h.01",
  ],
};

/** Box split into two columns */
export const columnsIcon: IconDefinition = {
  name: "columns",
  category: "interface",
  tags: ["split", "layout", "panes"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2Z",
    "M12 3v18",
  ],
};

/** Window with a side panel */
export const sidebarIcon: IconDefinition = {
  name: "sidebar",
  category: "interface",
  tags: ["panel", "layout", "drawer", "navigation"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2Z",
    "M9 3v18",
  ],
};

/** Letter i in a circle */
export const infoIcon: IconDefinition = {
  name: "info",
  category: "interface",
  tags: ["information", "about", "details", "help"],
  paths: ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M12 11v5", "M12 7.5h.01"],
};

/** Question mark in a circle */
export const helpCircleIcon: IconDefinition = {
  name: "help-circle",
  category: "interface",
  tags: ["question", "help", "support", "faq"],
  paths: [
    "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    "M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6",
    "M12 17h.01",
  ],
};

/** Exclamation mark in a circle */
export const alertCircleIcon: IconDefinition = {
  name: "alert-circle",
  category: "interface",
  tags: ["warning", "error", "attention", "caution"],
  paths: ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M12 7.5v5", "M12 16.5h.01"],
};

/** Exclamation mark in a triangle */
export const alertTriangleIcon: IconDefinition = {
  name: "alert-triangle",
  category: "interface",
  tags: ["warning", "danger", "caution", "hazard"],
  paths: [
    "M10.25 5.65A2 2 0 0 1 13.75 5.65L20.35 17.53A2 2 0 0 1 18.6 20.5L5.4 20.5A2 2 0 0 1 3.65 17.53Z",
    "M12 9v4.5",
    "M12 17h.01",
  ],
};

/** Check mark in a circle */
export const checkCircleIcon: IconDefinition = {
  name: "check-circle",
  category: "interface",
  tags: ["success", "done", "complete", "verified"],
  paths: ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M8 12.5l3 3 5-6"],
};

/** Cross in a circle */
export const xCircleIcon: IconDefinition = {
  name: "x-circle",
  category: "interface",
  tags: ["error", "cancel", "fail", "close"],
  paths: ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M9 9l6 6", "M15 9l-6 6"],
};

/** Spinner with eight rays */
export const loaderIcon: IconDefinition = {
  name: "loader",
  category: "interface",
  tags: ["loading", "spinner", "progress", "wait"],
  paths: [
    "M12 7L12 3",
    "M15.54 8.46L18.36 5.64",
    "M17 12L21 12",
    "M15.54 15.54L18.36 18.36",
    "M12 17L12 21",
    "M8.46 15.54L5.64 18.36",
    "M7 12L3 12",
    "M8.46 8.46L5.64 5.64",
  ],
};

/** Globe */
export const globeIcon: IconDefinition = {
  name: "globe",
  category: "interface",
  tags: ["world", "earth", "internet", "language"],
  paths: [
    "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    "M3 12h18",
    "M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18",
  ],
};

/** Map pin */
export const mapPinIcon: IconDefinition = {
  name: "map-pin",
  category: "interface",
  tags: ["location", "marker", "place", "address"],
  paths: [
    "M12 21.5C9 18.8 5 14.5 5 9.5a7 7 0 0 1 14 0c0 5-4 9.3-7 12Z",
    "M9.5 9.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
  ],
};

/** Compass */
export const compassIcon: IconDefinition = {
  name: "compass",
  category: "interface",
  tags: ["navigation", "direction", "explore", "browse"],
  paths: ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M15.5 8.5l-2 5-5 2 2-5Z"],
};

/** Stacked layers */
export const layersIcon: IconDefinition = {
  name: "layers",
  category: "interface",
  tags: ["stack", "levels", "arrange"],
  paths: [
    "M12 3l9 4.5-9 4.5-9-4.5Z",
    "M3 12l9 4.5 9-4.5",
    "M3 16.5l9 4.5 9-4.5",
  ],
};

/** Cardboard box */
export const packageIcon: IconDefinition = {
  name: "package",
  category: "interface",
  tags: ["box", "parcel", "shipping", "product"],
  paths: [
    "M12 2.5l8.5 4.75v9.5L12 21.5l-8.5-4.75v-9.5Z",
    "M3.5 7.25L12 12l8.5-4.75",
    "M12 12v9.5",
    "M7.75 4.88l8.5 4.75",
  ],
};

/** Inbox tray */
export const inboxIcon: IconDefinition = {
  name: "inbox",
  category: "interface",
  tags: ["tray", "messages", "incoming", "mail"],
  paths: [
    "M5.5 5h13l2.5 8v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z",
    "M3 13h5l1.5 3h5l1.5-3h5",
  ],
};

/** Archive box */
export const archiveIcon: IconDefinition = {
  name: "archive",
  category: "interface",
  tags: ["box", "storage", "store", "backup"],
  paths: [
    "M4 4h16a1 1 0 0 1 1 1v2.5a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-2.5a1 1 0 0 1 1 -1Z",
    "M4.5 8.5V18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8.5",
    "M10 12.5h4",
  ],
};

/** Thumbs up */
export const thumbsUpIcon: IconDefinition = {
  name: "thumbs-up",
  category: "interface",
  tags: ["like", "approve", "agree", "upvote"],
  paths: [
    "M7 10.5V20.5H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z",
    "M7 10.5l3.5-7a2.5 2.5 0 0 1 2.5 2.5v3.5h5.2a2 2 0 0 1 2 2.3l-1.2 7a2 2 0 0 1-2 1.7H7",
  ],
};

/** Smiling face */
export const smileIcon: IconDefinition = {
  name: "smile",
  category: "interface",
  tags: ["happy", "emoji", "face", "feedback"],
  paths: [
    "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    "M8 14c1 1.5 2.4 2.3 4 2.3s3-.8 4-2.3",
    "M9 9.5h.01",
    "M15 9.5h.01",
  ],
};
