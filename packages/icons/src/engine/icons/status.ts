// Status and indicator icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";

/** Lightning bolt */
export const zapIcon: IconDefinition = {
  name: "zap",
  category: "status",
  tags: ["lightning", "flash", "power", "fast"],
  paths: ["M13 2.5L4.5 13.5H12l-1 8 8.5-11H12Z"],
};

/** Shield */
export const shieldIcon: IconDefinition = {
  name: "shield",
  category: "status",
  tags: ["security", "protection", "safe", "guard"],
  paths: ["M12 21.5c-4.5-1.8-8-5-8-10V5.5l8-3 8 3v6c0 5-3.5 8.2-8 10Z"],
};

/** Shield with a check mark */
export const shieldCheckIcon: IconDefinition = {
  name: "shield-check",
  category: "status",
  tags: ["secure", "verified", "protected", "safe"],
  paths: [
    "M12 21.5c-4.5-1.8-8-5-8-10V5.5l8-3 8 3v6c0 5-3.5 8.2-8 10Z",
    "M8.5 12l2.5 2.5 4.5-5",
  ],
};

/** Power symbol */
export const powerIcon: IconDefinition = {
  name: "power",
  category: "status",
  tags: ["on", "off", "shutdown", "switch"],
  paths: ["M12 3v8.5", "M17.66 6.84a8 8 0 1 1-11.32 0"],
};

/** Battery */
export const batteryIcon: IconDefinition = {
  name: "battery",
  category: "status",
  tags: ["charge", "energy", "level", "power"],
  paths: [
    "M4.5 7h12a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2Z",
    "M21.5 10.5v3",
    "M6.5 10.5v3",
    "M10 10.5v3",
  ],
};

/** Battery with a lightning bolt */
export const batteryChargingIcon: IconDefinition = {
  name: "battery-charging",
  category: "status",
  tags: ["charging", "energy", "plugged", "power"],
  paths: [
    "M4.5 7h12a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2Z",
    "M21.5 10.5v3",
    "M11.5 9l-2.5 3h4l-2.5 3",
  ],
};

/** Signal strength bars */
export const signalIcon: IconDefinition = {
  name: "signal",
  category: "status",
  tags: ["reception", "strength", "cellular", "network"],
  paths: ["M4 20.5V18", "M9 20.5v-6", "M14 20.5V10", "M19 20.5v-15"],
};

/** Medal with ribbons */
export const awardIcon: IconDefinition = {
  name: "award",
  category: "status",
  tags: ["medal", "badge", "achievement", "prize"],
  paths: [
    "M6 9a6 6 0 1 0 12 0a6 6 0 1 0 -12 0",
    "M8.5 13.9L7 21.5l5-2.5 5 2.5-1.5-7.6",
  ],
};

/** Check mark in a square */
export const checkSquareIcon: IconDefinition = {
  name: "check-square",
  category: "status",
  tags: ["checkbox", "checked", "done", "selected"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2Z",
    "M8 12.5l3 3 5-6",
  ],
};

/** Square */
export const squareIcon: IconDefinition = {
  name: "square",
  category: "status",
  tags: ["checkbox", "unchecked", "shape", "box"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2Z",
  ],
};

/** Circle */
export const circleIcon: IconDefinition = {
  name: "circle",
  category: "status",
  tags: ["radio", "unchecked", "shape", "dot"],
  paths: ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"],
};

/** Switch in the off position */
export const toggleLeftIcon: IconDefinition = {
  name: "toggle-left",
  category: "status",
  tags: ["switch", "off", "disabled", "toggle"],
  paths: [
    "M8 6.5h8a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1 -5.5 5.5h-8a5.5 5.5 0 0 1 -5.5 -5.5a5.5 5.5 0 0 1 5.5 -5.5Z",
    "M5 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  ],
};

/** Switch in the on position */
export const toggleRightIcon: IconDefinition = {
  name: "toggle-right",
  category: "status",
  tags: ["switch", "on", "enabled", "toggle"],
  paths: [
    "M8 6.5h8a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1 -5.5 5.5h-8a5.5 5.5 0 0 1 -5.5 -5.5a5.5 5.5 0 0 1 5.5 -5.5Z",
    "M13 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  ],
};

/** Bug */
export const bugIcon: IconDefinition = {
  name: "bug",
  category: "status",
  tags: ["insect", "issue", "error", "debug"],
  paths: [
    "M12 8a5 5 0 0 1 5 5v3a5 5 0 0 1 -5 5a5 5 0 0 1 -5 -5v-3a5 5 0 0 1 5 -5Z",
    "M9 8V7a3 3 0 0 1 6 0v1",
    "M12 12v9",
    "M3 13h4",
    "M17 13h4",
    "M4.5 8l2.8 2",
    "M19.5 8l-2.8 2",
    "M4 19l3.3-2",
    "M20 19l-3.3-2",
  ],
};

/** Flame */
export const flameIcon: IconDefinition = {
  name: "flame",
  category: "status",
  tags: ["fire", "hot", "trending", "burn"],
  paths: [
    "M12 2.5c3.5 4 7 7.5 7 12a7 7 0 0 1-14 0c0-2.5 1-4.5 2.5-6 .5 2 1.5 3 3 3.5-.5-3.5.5-6.5 1.5-9.5Z",
  ],
};
