// Geometric shape icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Rounded square */
export const roundedSquareIcon: IconDefinition = {
  name: "rounded-square",
  category: "shapes",
  tags: ["box", "tile", "corner", "app"],
  paths: [
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z",
  ],
};

/** Triangle */
export const triangleIcon: IconDefinition = {
  name: "triangle",
  category: "shapes",
  tags: ["polygon", "delta", "pointer", "corner"],
  paths: ["M12 4l9 16H3z"],
};

/** Hexagon */
export const hexagonIcon: IconDefinition = {
  name: "hexagon",
  category: "shapes",
  tags: ["polygon", "honeycomb", "six-sided", "cell"],
  paths: ["M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z"],
};

/** Pentagon */
export const pentagonIcon: IconDefinition = {
  name: "pentagon",
  category: "shapes",
  tags: ["polygon", "five-sided", "geometry", "badge"],
  paths: ["M12 3l9 6.5-3.5 10.5h-11L3 9.5z"],
};

/** Octagon */
export const octagonIcon: IconDefinition = {
  name: "octagon",
  category: "shapes",
  tags: ["polygon", "eight-sided", "stop", "sign"],
  paths: ["M8 3h8l5 5v8l-5 5H8l-5-5V8z"],
};

/** Diamond */
export const diamondIcon: IconDefinition = {
  name: "diamond",
  category: "shapes",
  tags: ["rhombus", "kite", "rotated", "square"],
  paths: ["M12 3l9 9-9 9-9-9z"],
};

/** Parallelogram */
export const parallelogramIcon: IconDefinition = {
  name: "parallelogram",
  category: "shapes",
  tags: ["slant", "skew", "quadrilateral", "slanted"],
  paths: ["M7 5h14l-4 14H3z"],
};

/** Trapezoid */
export const trapezoidIcon: IconDefinition = {
  name: "trapezoid",
  category: "shapes",
  tags: ["slope", "quadrilateral", "wedge", "taper"],
  paths: ["M8 5h8l5 14H3z"],
};

/** Oval */
export const ovalIcon: IconDefinition = {
  name: "oval",
  category: "shapes",
  tags: ["ellipse", "egg", "round", "circle"],
  paths: ["M12 4a8 6 0 1 0 0 16a8 6 0 1 0 0-16"],
};

/** Target with bullseye */
export const targetIcon: IconDefinition = {
  name: "target",
  category: "shapes",
  tags: ["bullseye", "goal", "aim", "focus"],
  paths: [
    "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18",
    "M12 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10",
    "M12 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 1 0 0-3",
  ],
  colors: [undefined, undefined, palette.red],
};

/** Half circle */
export const halfCircleIcon: IconDefinition = {
  name: "half-circle",
  category: "shapes",
  tags: ["semicircle", "arc", "dome", "half"],
  paths: ["M3 12a9 9 0 0 1 18 0z"],
};

/** Teardrop */
export const teardropIcon: IconDefinition = {
  name: "teardrop",
  category: "shapes",
  tags: ["drop", "water", "droplet", "liquid"],
  paths: ["M12 3c4 5 6.5 8.5 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 11.5 8 8 12 3z"],
  colors: [palette.sky],
};

/** Cube */
export const cubeIcon: IconDefinition = {
  name: "cube",
  category: "shapes",
  tags: ["box", "3d", "block", "volume"],
  paths: ["M12 3l8 4.5v9L12 21l-8-4.5v-9z", "M4 7.5l8 4.5 8-4.5", "M12 12v9"],
};

/** Cylinder */
export const cylinderIcon: IconDefinition = {
  name: "cylinder",
  category: "shapes",
  tags: ["drum", "tank", "barrel", "solid"],
  paths: [
    "M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6",
    "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3s-3.1 3-7 3s-7-1.3-7-3z",
  ],
};

/** Pill */
export const pillIcon: IconDefinition = {
  name: "pill",
  category: "shapes",
  tags: ["capsule", "stadium", "lozenge", "rounded"],
  paths: ["M7 8h10a4 4 0 0 1 0 8H7a4 4 0 0 1 0-8z"],
};

/** Arch */
export const archIcon: IconDefinition = {
  name: "arch",
  category: "shapes",
  tags: ["doorway", "gate", "curve", "portal"],
  paths: ["M4 21V11a8 8 0 0 1 16 0v10", "M9 21v-7a3 3 0 0 1 6 0v7"],
};

/** Six-pointed star */
export const hexagramIcon: IconDefinition = {
  name: "hexagram",
  category: "shapes",
  tags: ["six-pointed", "star", "emblem", "badge"],
  paths: ["M12 3l7.8 13.5H4.2z", "M12 21l7.8-13.5H4.2z"],
  colors: [palette.indigo, palette.indigo],
};

/** Crown */
export const crownIcon: IconDefinition = {
  name: "crown",
  category: "shapes",
  tags: ["king", "royal", "queen", "premium"],
  paths: ["M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"],
  colors: [palette.amber],
};

/** Gem */
export const gemIcon: IconDefinition = {
  name: "gem",
  category: "shapes",
  tags: ["jewel", "diamond", "crystal", "precious"],
  paths: ["M7 3h10l4 6-9 12-9-12z", "M3 9h18", "M9 3L7 9l5 12 5-12-2-6"],
  colors: [palette.violet, palette.violet, undefined],
};

/** Sparkles */
export const sparklesIcon: IconDefinition = {
  name: "sparkles",
  category: "shapes",
  tags: ["stars", "magic", "shine", "glitter"],
  paths: [
    "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
    "M17 13.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z",
  ],
  colors: [palette.amber, palette.amber],
};

/** Infinity */
export const infinityIcon: IconDefinition = {
  name: "infinity",
  category: "shapes",
  tags: ["loop", "endless", "infinite", "unlimited"],
  paths: [
    "M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4s4-4 6-4a4 4 0 0 1 0 8c-2 0-4-1.5-6-4",
  ],
};

/** Asterisk */
export const asteriskIcon: IconDefinition = {
  name: "asterisk",
  category: "shapes",
  tags: ["star", "footnote", "wildcard", "mark"],
  paths: ["M12 3v18", "M4.2 7.5l15.6 9", "M19.8 7.5l-15.6 9"],
};

/** Spiral */
export const spiralIcon: IconDefinition = {
  name: "spiral",
  category: "shapes",
  tags: ["coil", "swirl", "curl", "helix"],
  paths: [
    "M13.5 12C13.75 12.79 13.18 14 12 14.25C10.82 14.5 9.25 13.57 9 12C8.75 10.43 10.04 8.5 12 8.25C13.96 8 16.25 9.64 16.5 12C16.75 14.36 14.75 17 12 17.25C9.25 17.5 6.25 15.14 6 12C5.75 8.86 8.47 5.5 12 5.25C15.53 5 19.25 8.07 19.5 12C19.75 15.93 16.32 20 12 20.25C7.68 20.5 3.25 16.71 3 12C2.75 7.29 6.9 2.5 12 2.25C17.1 2 22.25 6.5 22.5 12",
  ],
};

/** Blob */
export const blobIcon: IconDefinition = {
  name: "blob",
  category: "shapes",
  tags: ["organic", "amoeba", "wobbly", "splotch"],
  paths: [
    "M12 4C16 4 20 6.5 20 11C20 13.5 20.5 14.5 19 17C17.5 19.8 14.5 20.5 12 20.5C8.5 20.5 5.5 19.5 4.5 16.5C3.5 13.5 4 11 4 8.5C4 6 7.5 4 12 4Z",
  ],
};

/** Zigzag line */
export const zigzagIcon: IconDefinition = {
  name: "zigzag",
  category: "shapes",
  tags: ["jagged", "wave", "line", "pattern"],
  paths: ["M3 8l4.5 4.5L12 8l4.5 4.5L21 8"],
};

/** Lens */
export const lensIcon: IconDefinition = {
  name: "lens",
  category: "shapes",
  tags: ["optics", "glass", "convex", "eye"],
  paths: ["M12 4c3 3 3 13 0 16c-3-3-3-13 0-16z"],
};

/** Bow tie */
export const bowtieIcon: IconDefinition = {
  name: "bowtie",
  category: "shapes",
  tags: ["ribbon", "tie", "formal", "bow"],
  paths: ["M3 6l8 6-8 6z", "M21 6l-8 6 8 6z"],
};

/** Cross */
export const crossIcon: IconDefinition = {
  name: "cross",
  category: "shapes",
  tags: ["plus", "medical", "sign", "intersection"],
  paths: ["M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"],
  colors: [palette.red],
};

/** Sector */
export const sectorIcon: IconDefinition = {
  name: "sector",
  category: "shapes",
  tags: ["pie", "wedge", "slice", "segment"],
  paths: ["M12 12V3a9 9 0 1 1-9 9z"],
  colors: [palette.amber],
};

/** Crescent */
export const crescentIcon: IconDefinition = {
  name: "crescent",
  category: "shapes",
  tags: ["moon", "night", "lunar", "arc"],
  paths: ["M12 3a9 9 0 0 0 0 18a12.125 12.125 0 0 1 0-18z"],
};

/** Ring */
export const ringIcon: IconDefinition = {
  name: "ring",
  category: "shapes",
  tags: ["circle", "hoop", "donut", "loop"],
  paths: [
    "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18",
    "M12 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10",
  ],
};
