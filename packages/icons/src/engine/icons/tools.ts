// Tools icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Hammer */
export const hammerIcon: IconDefinition = {
  name: "hammer",
  category: "tools",
  tags: ["build", "nail", "repair", "construction"],
  paths: ["M3 5h11l3 2-3 2H3z", "M9 9l-1.5 12"],
};

/** Wrench */
export const wrenchIcon: IconDefinition = {
  name: "wrench",
  category: "tools",
  tags: ["spanner", "fix", "settings", "maintenance"],
  paths: ["M8 3h2v3h4V3h2v4l-1 2H9L8 7z", "M10 9v11.5a2 2 0 0 0 4 0V9"],
};

/** Screwdriver */
export const screwdriverIcon: IconDefinition = {
  name: "screwdriver",
  category: "tools",
  tags: ["driver", "screw", "repair", "handle"],
  paths: ["M8 12h8v5a4 4 0 0 1-8 0z", "M12 3v9"],
  colors: [palette.red, undefined],
};

/** Shears */
export const shearsIcon: IconDefinition = {
  name: "shears",
  category: "tools",
  tags: ["cut", "scissors", "trim", "blades"],
  paths: [
    "M3 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    "M15 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    "M8.1 15.9L20 4",
    "M15.9 15.9L4 4",
  ],
};

/** Tape measure */
export const tapeMeasureIcon: IconDefinition = {
  name: "tape-measure",
  category: "tools",
  tags: ["measure", "length", "ruler", "reel"],
  paths: [
    "M5 8h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z",
    "M8 8v3",
    "M12 8v4",
    "M16 8v3",
  ],
};

/** Power drill */
export const drillIcon: IconDefinition = {
  name: "drill",
  category: "tools",
  tags: ["power", "bit", "hole", "electric"],
  paths: ["M4 5h12v5H4z", "M16 7.5h5", "M7 10l1 10h4l-1-10"],
  colors: [palette.amber, undefined, undefined],
};

/** Ladder */
export const ladderIcon: IconDefinition = {
  name: "ladder",
  category: "tools",
  tags: ["climb", "step", "rungs", "access"],
  paths: ["M7 3v18", "M17 3v18", "M7 7h10", "M7 12h10", "M7 17h10"],
};

/** Horseshoe magnet */
export const horseshoeMagnetIcon: IconDefinition = {
  name: "horseshoe-magnet",
  category: "tools",
  tags: ["magnet", "attract", "poles", "magnetism"],
  paths: ["M4 3h4v9a4 4 0 0 0 8 0V3h4v9a8 8 0 0 1-16 0z", "M4 7h4", "M16 7h4"],
  colors: [undefined, palette.red, palette.blue],
};

/** Nut */
export const nutIcon: IconDefinition = {
  name: "nut",
  category: "tools",
  tags: ["hex", "fastener", "bolt", "hardware"],
  paths: [
    "M12 3l8 4.6v9.2L12 21l-8-4.6V7.6z",
    "M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z",
  ],
};

/** Bolt */
export const boltIcon: IconDefinition = {
  name: "bolt",
  category: "tools",
  tags: ["screw", "fastener", "thread", "hardware"],
  paths: ["M7 3h10v5H7z", "M10 8v11l2 2 2-2V8", "M10 11h4", "M10 15h4"],
};

/** Shovel */
export const shovelIcon: IconDefinition = {
  name: "shovel",
  category: "tools",
  tags: ["dig", "spade", "garden", "earth"],
  paths: ["M9 14h6l-1 5a2 2 0 0 1-4 0z", "M12 3v11", "M9 3h6"],
};

/** Toolbox */
export const toolboxIcon: IconDefinition = {
  name: "toolbox",
  category: "tools",
  tags: ["case", "kit", "storage", "box"],
  paths: ["M3 8h18v12H3z", "M8 8V5h8v3", "M3 13h18"],
};

/** Spirit level */
export const levelIcon: IconDefinition = {
  name: "level",
  category: "tools",
  tags: ["bubble", "spirit", "straight", "align"],
  paths: ["M2 8h20v8H2z", "M9 10h6v4H9z"],
};

/** Chisel */
export const chiselIcon: IconDefinition = {
  name: "chisel",
  category: "tools",
  tags: ["carve", "blade", "woodwork", "sculpt"],
  paths: ["M9 3h6v5H9z", "M10 8h4v9l-2 4-2-4z"],
  colors: [palette.brown, undefined],
};

/** Pickaxe */
export const pickaxeIcon: IconDefinition = {
  name: "pickaxe",
  category: "tools",
  tags: ["mine", "dig", "mining", "pick"],
  paths: ["M3 9q9-7 18 0", "M12 5.5V21"],
};

/** Broom */
export const broomIcon: IconDefinition = {
  name: "broom",
  category: "tools",
  tags: ["sweep", "clean", "cleaning", "housework"],
  paths: ["M12 3v11", "M8 11h8v3H8z", "M8 14h8l2 7H6z"],
  colors: [undefined, undefined, palette.amber],
};

/** Bucket */
export const bucketIcon: IconDefinition = {
  name: "bucket",
  category: "tools",
  tags: ["pail", "container", "water", "carry"],
  paths: ["M5 9a7 7 0 0 1 14 0", "M4 9h16", "M5.5 9l1.5 11h10l1.5-11"],
};

/** Flashlight */
export const flashlightIcon: IconDefinition = {
  name: "flashlight",
  category: "tools",
  tags: ["torch", "light", "lamp", "beam"],
  paths: ["M8 3h8v3H8z", "M9 6h6v12a3 3 0 0 1-6 0z"],
  colors: [palette.yellow, undefined],
};

/** Painter's palette with paint dots */
export const paletteIcon: IconDefinition = {
  name: "palette",
  category: "tools",
  tags: ["paint", "colors", "art", "theme"],
  paths: [
    "M15.08 19.02A9 8 0 1 1 20.16 14.88Q16.5 15.5 15.08 19.02Z",
    "M8 14.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0",
    "M6.5 9.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M10.5 6.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M15 8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  ],
  colors: [undefined, undefined, palette.red, palette.amber, palette.blue],
};
