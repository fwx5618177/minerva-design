// Place and map icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Folded map */
export const mapIcon: IconDefinition = {
  name: "map",
  category: "places",
  tags: ["location", "atlas", "directions", "geography"],
  paths: ["M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z", "M9 4v14", "M15 6v14"],
};

/** Navigation pointer */
export const navigationIcon: IconDefinition = {
  name: "navigation",
  category: "places",
  tags: ["direction", "gps", "arrow", "locate"],
  paths: ["M12 3l7 18-7-4-7 4z"],
  colors: [palette.blue],
};

/** Route between two points */
export const routeIcon: IconDefinition = {
  name: "route",
  category: "places",
  tags: ["path", "directions", "trip", "journey"],
  paths: [
    "M6 15a3 3 0 1 0 0 6a3 3 0 1 0 0-6",
    "M18 3a3 3 0 1 0 0 6a3 3 0 1 0 0-6",
    "M9 18h6a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6",
  ],
};

/** Signpost */
export const signpostIcon: IconDefinition = {
  name: "signpost",
  category: "places",
  tags: ["sign", "direction", "road", "arrow"],
  paths: [
    "M5 6h12l2 2-2 2H5z",
    "M19 14H7l-2 2 2 2h12z",
    "M12 3v3",
    "M12 10v4",
    "M12 18v3",
    "M9 21h6",
  ],
};

/** Office building */
export const buildingIcon: IconDefinition = {
  name: "building",
  category: "places",
  tags: ["office", "city", "architecture", "tower"],
  paths: [
    "M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16",
    "M3 21h18",
    "M8 7h2",
    "M14 7h2",
    "M8 11h2",
    "M14 11h2",
    "M10 21v-4h4v4",
  ],
};

/** Factory */
export const factoryIcon: IconDefinition = {
  name: "factory",
  category: "places",
  tags: ["industry", "plant", "manufacturing", "sawtooth"],
  paths: ["M3 21V9l6 4V9l6 4V5h4v16", "M3 21h16"],
};

/** Warehouse */
export const warehouseIcon: IconDefinition = {
  name: "warehouse",
  category: "places",
  tags: ["storage", "depot", "shed", "logistics"],
  paths: ["M3 9l9-6 9 6", "M3 9v12h18V9", "M9 21v-6h6v6"],
};

/** Castle */
export const castleIcon: IconDefinition = {
  name: "castle",
  category: "places",
  tags: ["fort", "medieval", "tower", "kingdom"],
  paths: [
    "M3 21V9h3V5h3v4h6V5h3v4h3v12",
    "M3 21h18",
    "M10 21v-4a2 2 0 0 1 4 0v4",
  ],
};

/** Church */
export const churchIcon: IconDefinition = {
  name: "church",
  category: "places",
  tags: ["chapel", "cathedral", "religion", "steeple"],
  paths: [
    "M12 2v4",
    "M10 4h4",
    "M9 21V10l3-4 3 4v11",
    "M3 21V13h6",
    "M15 13h6v8",
    "M3 21h18",
    "M10 21v-4a2 2 0 0 1 4 0v4",
  ],
};

/** Car */
export const carIcon: IconDefinition = {
  name: "car",
  category: "places",
  tags: ["vehicle", "automobile", "transport", "drive"],
  paths: [
    "M3 17v-5l2.5-5h13L21 12v5",
    "M3 17h2",
    "M9 17h6",
    "M19 17h2",
    "M5 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M15 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M3 12h18",
  ],
  colors: [
    palette.red,
    palette.red,
    palette.red,
    palette.red,
    undefined,
    undefined,
    undefined,
  ],
};

/** Bus */
export const busIcon: IconDefinition = {
  name: "bus",
  category: "places",
  tags: ["vehicle", "transport", "transit", "coach"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v12H3V5a2 2 0 0 1 2-2z",
    "M3 10h18",
    "M9 3v7",
    "M15 3v7",
    "M8 17v3",
    "M16 17v3",
  ],
  colors: [
    palette.amber,
    palette.amber,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
};

/** Train */
export const trainIcon: IconDefinition = {
  name: "train",
  category: "places",
  tags: ["rail", "subway", "transport", "tram"],
  paths: [
    "M6 3h12a2 2 0 0 1 2 2v11a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2z",
    "M4 10h16",
    "M8 6h8v3H8z",
    "M8 15h2",
    "M14 15h2",
    "M8 19l-2 2",
    "M16 19l2 2",
  ],
};

/** Airplane */
export const planeIcon: IconDefinition = {
  name: "plane",
  category: "places",
  tags: ["flight", "airplane", "travel", "aviation"],
  paths: ["M12 3l2 3v5l7 4v2l-7-2v4l2 2-4-1-4 1 2-2v-4l-7 2v-2l7-4V6z"],
  colors: [palette.sky],
};

/** Bicycle */
export const bicycleIcon: IconDefinition = {
  name: "bicycle",
  category: "places",
  tags: ["bike", "cycle", "cycling", "transport"],
  paths: [
    "M2 16a4 4 0 1 0 8 0a4 4 0 1 0-8 0",
    "M14 16a4 4 0 1 0 8 0a4 4 0 1 0-8 0",
    "M6 16L10 8.5h5.5L18 16",
    "M6 16h6",
    "M12 16L10 8.5",
    "M12 16l3.5-7.5",
    "M15.5 8.5L16 6",
    "M14 6h4",
    "M8 7h4",
  ],
};

/** Ship */
export const shipIcon: IconDefinition = {
  name: "ship",
  category: "places",
  tags: ["boat", "vessel", "sea", "cruise"],
  paths: ["M3 15h18l-3 5H6z", "M7 15v-4h10v4", "M12 11V4", "M12 4l4 2-4 2"],
  colors: [palette.blue, undefined, undefined, palette.red],
};

/** Rocket */
export const rocketIcon: IconDefinition = {
  name: "rocket",
  category: "places",
  tags: ["space", "launch", "startup", "fast"],
  paths: [
    "M12 3c2.5 2.2 4 5.5 4 9v5l-4 3-4-3v-5c0-3.5 1.5-6.8 4-9z",
    "M8 13l-3 3v4l3-2",
    "M16 13l3 3v4l-3-2",
    "M10.5 10a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
  ],
  colors: [undefined, palette.red, palette.red, undefined],
};

/** Anchor */
export const anchorIcon: IconDefinition = {
  name: "anchor",
  category: "places",
  tags: ["ship", "harbor", "marine", "port"],
  paths: [
    "M12 3a2 2 0 1 0 0 4a2 2 0 1 0 0-4",
    "M12 7v14",
    "M8 10h8",
    "M5 15a7 7 0 0 0 14 0",
    "M3 13l2 2",
    "M21 13l-2 2",
  ],
};

/** Tent */
export const tentIcon: IconDefinition = {
  name: "tent",
  category: "places",
  tags: ["camp", "camping", "outdoor", "shelter"],
  paths: ["M3 20L12 4l9 16z", "M9.5 20l2.5-8 2.5 8"],
  colors: [palette.orange, undefined],
};

/** Parking */
export const parkingIcon: IconDefinition = {
  name: "parking",
  category: "places",
  tags: ["garage", "lot", "vehicle", "sign"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
    "M9 17V7h4a2.5 2.5 0 0 1 0 5H9",
  ],
  colors: [palette.blue, undefined],
};

/** Road */
export const roadIcon: IconDefinition = {
  name: "road",
  category: "places",
  tags: ["highway", "street", "lane", "path"],
  paths: ["M7 21L10 3h4l3 18", "M12 5v2", "M12 10v3", "M12 16v3"],
};

/** Hotel bed */
export const hotelIcon: IconDefinition = {
  name: "hotel",
  category: "places",
  tags: ["bed", "lodging", "stay", "accommodation"],
  paths: [
    "M5 21V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16",
    "M3 21h18",
    "M8 6h3v3H8z",
    "M13 6h3v3h-3z",
    "M8 11h3v3H8z",
    "M13 11h3v3h-3z",
    "M10 21v-4h4v4",
  ],
};

/** Lighthouse */
export const lighthouseIcon: IconDefinition = {
  name: "lighthouse",
  category: "places",
  tags: ["beacon", "coast", "tower", "sea"],
  paths: [
    "M9 21l1.5-14h3L15 21",
    "M6 21h12",
    "M10 7V4h4v3",
    "M9 4l3-2 3 2",
    "M10 14h4",
    "M3 6h3",
    "M18 6h3",
  ],
};

/** Mountain */
export const mountainIcon: IconDefinition = {
  name: "mountain",
  category: "places",
  tags: ["peak", "hill", "landscape", "outdoor"],
  paths: ["M3 19l6-10 4 6 3-4 5 8z"],
  colors: [palette.green],
};

/** Storefront */
export const storeIcon: IconDefinition = {
  name: "store",
  category: "places",
  tags: ["shop", "market", "retail", "storefront"],
  paths: [
    "M3 9l2-5h14l2 5",
    "M3 9a3 3 0 0 0 6 0a3 3 0 0 0 6 0a3 3 0 0 0 6 0",
    "M5 12v9h14v-9",
    "M10 21v-5h4v5",
  ],
};

/** Gas station */
export const gasStationIcon: IconDefinition = {
  name: "gas-station",
  category: "places",
  tags: ["fuel", "petrol", "gas", "pump"],
  paths: [
    "M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15",
    "M3 21h12",
    "M7 8h6v4H7z",
    "M14 9h2a2 2 0 0 1 2 2v8a1.5 1.5 0 0 0 3 0V8l-2-2",
  ],
  colors: [palette.red, palette.red, undefined, undefined],
};

/** School building with a flag */
export const schoolIcon: IconDefinition = {
  name: "school",
  category: "places",
  tags: ["education", "campus", "building", "classroom"],
  paths: [
    "M4 10l8-6 8 6",
    "M6 10v11h12V10",
    "M2 21h20",
    "M10 21v-4a2 2 0 0 1 4 0v4",
    "M12 4V2",
  ],
};

/** Bank with columns */
export const bankIcon: IconDefinition = {
  name: "bank",
  category: "places",
  tags: ["finance", "institution", "columns", "vault"],
  paths: [
    "M3 9l9-6 9 6",
    "M3 9h18",
    "M6 11v7M10 11v7M14 11v7M18 11v7",
    "M4 18h16",
    "M3 21h18",
  ],
  colors: [palette.amber, palette.amber, undefined, undefined, undefined],
};

/** Park tree */
export const parkIcon: IconDefinition = {
  name: "park",
  category: "places",
  tags: ["tree", "garden", "outdoor", "public"],
  paths: [
    "M12 3a5 5 0 0 1 5 5c0 3-2.5 4-5 4s-5-1-5-4a5 5 0 0 1 5-5z",
    "M12 12v9",
    "M8 21h8",
  ],
  colors: [palette.green, undefined, undefined],
};

/** Stadium field */
export const stadiumIcon: IconDefinition = {
  name: "stadium",
  category: "places",
  tags: ["arena", "sports", "field", "venue"],
  paths: ["M3 8a9 6 0 0 1 18 0v8a9 6 0 0 1-18 0z", "M12 8v8"],
  colors: [palette.green, undefined],
};

/** Beach umbrella with waves */
export const beachIcon: IconDefinition = {
  name: "beach",
  category: "places",
  tags: ["sea", "sand", "umbrella", "holiday"],
  paths: [
    "M4 12a8 8 0 0 1 16 0z",
    "M12 12v8",
    "M3 21c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0",
  ],
  colors: [palette.orange, undefined, palette.sky],
};

/** Fountain with water jet */
export const fountainIcon: IconDefinition = {
  name: "fountain",
  category: "places",
  tags: ["water", "plaza", "spray", "park"],
  paths: [
    "M3 16h18v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z",
    "M12 16v-4",
    "M7 12h10",
    "M12 12V4",
    "M9 8.5L6.5 6",
    "M15 8.5L17.5 6",
  ],
  colors: [
    palette.sky,
    undefined,
    undefined,
    palette.sky,
    palette.sky,
    palette.sky,
  ],
};
