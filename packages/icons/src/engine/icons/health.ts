// Health icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Heart with a pulse line */
export const heartPulseIcon: IconDefinition = {
  name: "heart-pulse",
  category: "health",
  tags: ["heartbeat", "cardio", "vital", "medical"],
  paths: [
    "M12 20S3 14.5 3 9a5 5 0 0 1 9-1.5A5 5 0 0 1 21 9c0 5.5-9 11-9 11z",
    "M3 12h4l2-4 3 8 2-4h7",
  ],
  colors: [palette.red, undefined],
};

/** Stethoscope with chest piece */
export const stethoscopeIcon: IconDefinition = {
  name: "stethoscope",
  category: "health",
  tags: ["doctor", "listen", "medical", "checkup"],
  paths: [
    "M5 3v6a4 4 0 0 0 8 0V3",
    "M9 13v2a5 5 0 0 0 10 0v-3",
    "M17 10a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
  ],
};

/** Syringe for injections */
export const syringeIcon: IconDefinition = {
  name: "syringe",
  category: "health",
  tags: ["injection", "vaccine", "needle", "shot"],
  paths: ["M7 3h10", "M12 3v4", "M8 7h8v11l-4 4-4-4z", "M8 11h3"],
};

/** Medical kit with a red cross */
export const firstAidIcon: IconDefinition = {
  name: "first-aid",
  category: "health",
  tags: ["medkit", "emergency", "cross", "kit"],
  paths: ["M3 7h18v13H3z", "M9 7V5h6v2", "M12 10v6M9 13h6"],
  colors: [undefined, undefined, palette.red],
};

/** Adhesive bandage */
export const bandageIcon: IconDefinition = {
  name: "bandage",
  category: "health",
  tags: ["plaster", "wound", "dressing", "adhesive"],
  paths: [
    "M5 8h14a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3z",
    "M9 9h6v6H9z",
  ],
};

/** Dumbbell weight */
export const dumbbellIcon: IconDefinition = {
  name: "dumbbell",
  category: "health",
  tags: ["weights", "gym", "fitness", "strength"],
  paths: ["M3 9v6", "M6 7v10", "M18 7v10", "M21 9v6", "M6 12h12"],
};

/** Double bed */
export const bedDoubleIcon: IconDefinition = {
  name: "bed-double",
  category: "health",
  tags: ["sleep", "rest", "hospital", "bedroom"],
  paths: ["M3 4v16", "M3 15h18v5", "M6 8h5v4H6z", "M13 8h5v4h-5z"],
};

/** Hospital building with a cross */
export const hospitalIcon: IconDefinition = {
  name: "hospital",
  category: "health",
  tags: ["clinic", "building", "medical", "emergency"],
  paths: ["M4 21V4h16v17", "M2 21h20", "M12 7v6M9 10h6", "M10 21v-4h4v4"],
};

/** Molar tooth */
export const toothIcon: IconDefinition = {
  name: "tooth",
  category: "health",
  tags: ["dental", "dentist", "molar", "teeth"],
  paths: [
    "M12 6C10.5 4 7 3.5 5.5 6S5 12.5 6.5 15S8 22 10 22S11.5 18 12 18S13.5 22 14 22S16.5 15 17.5 12S16.5 4 12 6z",
  ],
};

/** Pair of lungs with trachea */
export const lungsIcon: IconDefinition = {
  name: "lungs",
  category: "health",
  tags: ["breath", "respiratory", "pulmonary", "organ"],
  paths: [
    "M9 6v13.5c0 .8-.7 1.5-1.5 1.5H5c-1 0-2-.8-2-2V12c0-3.5 2-6 5-6.5z",
    "M15 6v13.5c0 .8.7 1.5 1.5 1.5H19c1 0 2-.8 2-2V12c0-3.5-2-6-5-6.5z",
    "M12 3v8",
    "M12 11l-3 3M12 11l3 3",
  ],
};

/** Blood drop */
export const bloodDropIcon: IconDefinition = {
  name: "blood-drop",
  category: "health",
  tags: ["drop", "donation", "hemoglobin", "plasma"],
  paths: [
    "M12 3C12 3 6 10 6 14.5a6 6 0 0 0 12 0C18 10 12 3 12 3z",
    "M9 15a3 3 0 0 0 3 3",
  ],
  colors: [palette.red, undefined],
};

/** Capsule pill split in two halves */
export const capsuleIcon: IconDefinition = {
  name: "capsule",
  category: "health",
  tags: ["pill", "medicine", "tablet", "drug"],
  paths: ["M8 8h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z", "M12 8v8"],
};

/** Pill bottle with cap */
export const pillBottleIcon: IconDefinition = {
  name: "pill-bottle",
  category: "health",
  tags: ["prescription", "medicine", "bottle", "pharmacy"],
  paths: [
    "M6 3h12v4H6z",
    "M7 7h10v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z",
    "M7 12h10",
  ],
  colors: [palette.amber, undefined, undefined],
};

/** Medical cross symbol */
export const medicalCrossIcon: IconDefinition = {
  name: "medical-cross",
  category: "health",
  tags: ["cross", "pharmacy", "clinic", "medical"],
  paths: ["M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"],
  colors: [palette.red],
};

/** Clinical thermometer with scale marks */
export const thermometerIcon: IconDefinition = {
  name: "thermometer",
  category: "health",
  tags: ["temperature", "fever", "clinical", "measure"],
  paths: ["M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z", "M16 6h2", "M16 10h2"],
};

/** Laboratory flask with liquid */
export const flaskIcon: IconDefinition = {
  name: "flask",
  category: "health",
  tags: ["lab", "science", "chemistry", "experiment"],
  paths: [
    "M9 3h6",
    "M10 3v6l-5 10a1 1 0 0 0 1 2h12a1 1 0 0 0 1-2l-5-10V3",
    "M7 15h10",
  ],
  colors: [undefined, undefined, palette.teal],
};
