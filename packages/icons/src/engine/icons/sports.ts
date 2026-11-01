// Sports icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Basketball with seams */
export const basketballIcon: IconDefinition = {
  name: "basketball",
  category: "sports",
  tags: ["ball", "court", "hoop", "sport"],
  paths: [
    "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z",
    "M12 2v20",
    "M2 12h20",
    "M5.6 4.6C8.5 8 8.5 16 5.6 19.4",
    "M18.4 4.6C15.5 8 15.5 16 18.4 19.4",
  ],
  colors: [palette.orange, undefined, undefined, undefined, undefined],
};

/** Soccer ball with central pentagon */
export const soccerBallIcon: IconDefinition = {
  name: "soccer-ball",
  category: "sports",
  tags: ["football", "ball", "pitch", "sport"],
  paths: [
    "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z",
    "M12 8.5l3.2 2.3-1.2 3.8h-4l-1.2-3.8z",
    "M12 8.5V2",
    "M15.2 10.8l5.5-1.8",
    "M14 14.6l2.6 4.1",
    "M10 14.6l-2.6 4.1",
    "M8.8 10.8l-5.5-1.8",
  ],
};

/** American football with laces */
export const footballIcon: IconDefinition = {
  name: "football",
  category: "sports",
  tags: ["american", "gridiron", "ball", "sport"],
  paths: [
    "M2.5 12Q12 2 21.5 12Q12 22 2.5 12z",
    "M7.5 12h9",
    "M9.5 10.3v3.4",
    "M12 10v4",
    "M14.5 10.3v3.4",
  ],
};

/** Tennis racket with strings */
export const tennisRacketIcon: IconDefinition = {
  name: "tennis-racket",
  category: "sports",
  tags: ["racquet", "tennis", "court", "sport"],
  paths: [
    "M14 3a6 6 0 1 0 0 12a6 6 0 1 0 0-12z",
    "M14 3v12",
    "M8 9h12",
    "M9.8 13.2L3 20",
  ],
};

/** Baseball with seams */
export const baseballIcon: IconDefinition = {
  name: "baseball",
  category: "sports",
  tags: ["ball", "diamond", "bat", "sport"],
  paths: [
    "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z",
    "M5.5 4.5C8.5 8 8.5 16 5.5 19.5",
    "M18.5 4.5C15.5 8 15.5 16 18.5 19.5",
  ],
};

/** Bowling ball with three finger holes */
export const bowlingBallIcon: IconDefinition = {
  name: "bowling-ball",
  category: "sports",
  tags: ["bowl", "alley", "ball", "sport"],
  paths: [
    "M12 4a9 9 0 1 0 0 18a9 9 0 1 0 0-18z",
    "M11 8a1 1 0 1 0 2 0a1 1 0 1 0-2 0z",
    "M8.5 12.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0z",
    "M13.5 12.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0z",
  ],
};

/** Golf flag beside a ball */
export const golfIcon: IconDefinition = {
  name: "golf",
  category: "sports",
  tags: ["flag", "hole", "course", "sport"],
  paths: [
    "M9 3v18",
    "M9 3.5l8 3-8 3",
    "M5 21h8",
    "M15.5 18.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0z",
  ],
  colors: [undefined, palette.red, undefined, undefined],
};

/** Runner in mid-stride */
export const runningIcon: IconDefinition = {
  name: "running",
  category: "sports",
  tags: ["run", "jog", "sprint", "athlete"],
  paths: [
    "M12.5 4.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0z",
    "M14 7L11 15",
    "M12.7 10.5l3.3 2.2 1.8-2",
    "M12.7 10.5l-3 1-1.5 2",
    "M11 15l3.5 1-1.5 4.5",
    "M11 15l-2.5 3-3 1.5",
  ],
};

/** Swimmer above waves */
export const swimmingIcon: IconDefinition = {
  name: "swimming",
  category: "sports",
  tags: ["swim", "pool", "water", "sport"],
  paths: [
    "M15 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0z",
    "M4 13.5L15.5 10.5",
    "M11 11.7l-3.5-3.7",
    "M2 18c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0",
  ],
};

/** Skateboard with trucks and wheels */
export const skateboardIcon: IconDefinition = {
  name: "skateboard",
  category: "sports",
  tags: ["skate", "deck", "board", "street"],
  paths: [
    "M5 11h14a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4z",
    "M7 15v2",
    "M17 15v2",
    "M5.5 18.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0z",
    "M15.5 18.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0z",
  ],
};

/** Skier on a slope */
export const skiingIcon: IconDefinition = {
  name: "skiing",
  category: "sports",
  tags: ["ski", "snow", "winter", "slope"],
  paths: [
    "M12 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0z",
    "M13 8.5L11 14",
    "M12.45 10l4.4-1.3",
    "M12.45 10l-3 2",
    "M11 14l3 2.5-1.5 3.5",
    "M11 14l-2 6.5",
    "M3 21.5L21 18.5",
  ],
};

/** Referee whistle with sound */
export const whistleIcon: IconDefinition = {
  name: "whistle",
  category: "sports",
  tags: ["referee", "blow", "sound", "sport"],
  paths: ["M4 9h10a4 4 0 0 1 0 8H4z", "M4 11H2.5v4H4", "M20 9.5a4 4 0 0 1 0 7"],
  colors: [undefined, undefined, palette.sky],
};

/** Stopwatch with crown and hand */
export const stopwatchIcon: IconDefinition = {
  name: "stopwatch",
  category: "sports",
  tags: ["timer", "time", "clock", "race"],
  paths: [
    "M4 13a8 8 0 1 0 16 0a8 8 0 1 0-16 0z",
    "M9.5 2.5h5",
    "M12 2.5V5",
    "M12 13V9",
    "M12 13l3 2",
    "M18.5 6.5l1.5-1.5",
  ],
  colors: [palette.red, undefined, undefined, undefined, undefined, undefined],
};

/** Medal on a ribbon */
export const goldMedalIcon: IconDefinition = {
  name: "gold-medal",
  category: "sports",
  tags: ["award", "prize", "winner", "ribbon"],
  paths: [
    "M6.5 2.5h4L12 9",
    "M17.5 2.5h-4L12 9",
    "M5.5 15.5a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0-13 0z",
    "M9 15.5a3 3 0 1 0 6 0a3 3 0 1 0-6 0z",
  ],
  colors: [palette.red, palette.red, palette.amber, palette.amber],
};

/** Podium with three steps */
export const podiumIcon: IconDefinition = {
  name: "podium",
  category: "sports",
  tags: ["winner", "first", "rank", "stand"],
  paths: ["M2 11h6V4h8v10h6v7H2z", "M8 11v10", "M16 14v7"],
  colors: [palette.amber, undefined, undefined],
};

/** Kettlebell with handle */
export const kettlebellIcon: IconDefinition = {
  name: "kettlebell",
  category: "sports",
  tags: ["weights", "gym", "strength", "fitness"],
  paths: [
    "M6 15a6 6 0 1 0 12 0a6 6 0 1 0-12 0z",
    "M8.5 10V7a3.5 3.5 0 0 1 7 0v3",
  ],
};

/** Jump rope with grips */
export const jumpRopeIcon: IconDefinition = {
  name: "jump-rope",
  category: "sports",
  tags: ["skipping", "cardio", "rope", "fitness"],
  paths: ["M4 6v5a8 6 0 0 0 16 0V6", "M2 6h4", "M18 6h4"],
};

/** Bow with nocked arrow */
export const archeryIcon: IconDefinition = {
  name: "archery",
  category: "sports",
  tags: ["bow", "arrow", "target", "sport"],
  paths: [
    "M5 3.5Q19 12 5 20.5",
    "M5 3.5v17",
    "M5 12h15",
    "M16.5 9l3.5 3-3.5 3",
  ],
  colors: [palette.brown, undefined, undefined, undefined],
};
