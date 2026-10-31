// Device and hardware icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";

/** Desktop monitor */
export const monitorIcon: IconDefinition = {
  name: "monitor",
  category: "devices",
  tags: ["screen", "display", "desktop", "computer"],
  paths: [
    "M4.5 3.5h15a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-15a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2Z",
    "M12 16.5v4",
    "M8 20.5h8",
  ],
};

/** Laptop */
export const laptopIcon: IconDefinition = {
  name: "laptop",
  category: "devices",
  tags: ["notebook", "computer", "macbook", "portable"],
  paths: [
    "M4.5 15.5V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8.5",
    "M4.5 15.5h15l2 3.5h-19Z",
  ],
};

/** Mobile phone */
export const smartphoneIcon: IconDefinition = {
  name: "smartphone",
  category: "devices",
  tags: ["mobile", "phone", "cellphone", "device"],
  paths: [
    "M8.5 2.5h7a2.5 2.5 0 0 1 2.5 2.5v14a2.5 2.5 0 0 1 -2.5 2.5h-7a2.5 2.5 0 0 1 -2.5 -2.5v-14a2.5 2.5 0 0 1 2.5 -2.5Z",
    "M11 18.5h2",
  ],
};

/** Tablet */
export const tabletIcon: IconDefinition = {
  name: "tablet",
  category: "devices",
  tags: ["ipad", "device", "touchscreen"],
  paths: [
    "M6 2.5h12a2 2 0 0 1 2 2v15a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-15a2 2 0 0 1 2 -2Z",
    "M12 18h.01",
  ],
};

/** Keyboard */
export const keyboardIcon: IconDefinition = {
  name: "keyboard",
  category: "devices",
  tags: ["typing", "keys", "input", "type"],
  paths: [
    "M4.5 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-15a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2Z",
    "M6 9h.01",
    "M10 9h.01",
    "M14 9h.01",
    "M18 9h.01",
    "M6 12h.01",
    "M10 12h.01",
    "M14 12h.01",
    "M18 12h.01",
    "M7.5 15.5h9",
  ],
};

/** Computer mouse */
export const mouseIcon: IconDefinition = {
  name: "mouse",
  category: "devices",
  tags: ["pointer", "click", "scroll", "input"],
  paths: [
    "M12 3a5.5 5.5 0 0 1 5.5 5.5v7a5.5 5.5 0 0 1 -5.5 5.5a5.5 5.5 0 0 1 -5.5 -5.5v-7a5.5 5.5 0 0 1 5.5 -5.5Z",
    "M12 7v3",
  ],
};

/** Processor chip */
export const cpuIcon: IconDefinition = {
  name: "cpu",
  category: "devices",
  tags: ["processor", "chip", "hardware", "computer"],
  paths: [
    "M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2Z",
    "M10 9.5h4a0.5 0.5 0 0 1 0.5 0.5v4a0.5 0.5 0 0 1 -0.5 0.5h-4a0.5 0.5 0 0 1 -0.5 -0.5v-4a0.5 0.5 0 0 1 0.5 -0.5Z",
    "M9.5 2.5V6",
    "M14.5 2.5V6",
    "M9.5 18v3.5",
    "M14.5 18v3.5",
    "M2.5 9.5H6",
    "M2.5 14.5H6",
    "M18 9.5h3.5",
    "M18 14.5h3.5",
  ],
};

/** Hard drive */
export const hardDriveIcon: IconDefinition = {
  name: "hard-drive",
  category: "devices",
  tags: ["disk", "storage", "drive", "hdd"],
  paths: [
    "M4.5 13h15a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-15a2 2 0 0 1 -2 -2v-3a2 2 0 0 1 2 -2Z",
    "M2.8 13.5L5.5 5.4A2 2 0 0 1 7.4 4h9.2a2 2 0 0 1 1.9 1.4l2.7 8.1",
    "M6.5 16.5h.01",
    "M9.5 16.5h.01",
  ],
};

/** Server rack */
export const serverIcon: IconDefinition = {
  name: "server",
  category: "devices",
  tags: ["rack", "hosting", "backend", "datacenter"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2Z",
    "M5 13h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2Z",
    "M7 7h.01",
    "M7 17h.01",
    "M14 7h3",
    "M14 17h3",
  ],
};

/** Wristwatch */
export const watchIcon: IconDefinition = {
  name: "watch",
  category: "devices",
  tags: ["time", "smartwatch", "wearable", "clock"],
  paths: [
    "M6 12a6 6 0 1 0 12 0a6 6 0 1 0 -12 0",
    "M12 9.5V12l1.5 1.5",
    "M9 6.8V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3.3",
    "M9 17.2v3.3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3.3",
  ],
};

/** Television */
export const tvIcon: IconDefinition = {
  name: "tv",
  category: "devices",
  tags: ["television", "screen", "broadcast", "display"],
  paths: [
    "M4.5 7h15a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-15a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2Z",
    "M7.5 2.5L12 7l4.5-4.5",
  ],
};

/** Game controller */
export const gamepadIcon: IconDefinition = {
  name: "gamepad",
  category: "devices",
  tags: ["game", "controller", "joystick", "play"],
  paths: [
    "M7.25 6.5h9.5a4.75 4.75 0 0 1 4.75 4.75v2.5a4.25 4.25 0 0 1-7.5 2.75l-.75-.9h-2.5l-.75.9A4.25 4.25 0 0 1 2.5 13.75v-2.5A4.75 4.75 0 0 1 7.25 6.5Z",
    "M6.5 11.5h3",
    "M8 10v3",
    "M15.5 10.5h.01",
    "M17.5 12.5h.01",
  ],
};
