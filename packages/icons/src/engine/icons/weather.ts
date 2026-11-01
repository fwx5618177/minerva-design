// Weather icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Sun with rays */
export const sunRaysIcon: IconDefinition = {
  name: "sun-rays",
  category: "weather",
  tags: ["day", "bright", "light", "summer"],
  paths: [
    "M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8",
    "M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  ],
  colors: [palette.amber, undefined],
};

/** Crescent moon with stars */
export const moonStarsIcon: IconDefinition = {
  name: "moon-stars",
  category: "weather",
  tags: ["night", "dark", "sleep", "stars"],
  paths: [
    "M12 3a9 9 0 0 0 0 18a5 9 0 0 1 0-18z",
    "M18 3v4M16 5h4",
    "M20 13v4M18 15h4",
  ],
};

/** Cloud with falling rain */
export const cloudDrizzleIcon: IconDefinition = {
  name: "cloud-drizzle",
  category: "weather",
  tags: ["rain", "shower", "wet", "storm"],
  paths: [
    "M7 17h10a4 4 0 0 0 0-8 5 5 0 0 0-9.6-1A4 4 0 0 0 7 17z",
    "M8 20v2M12 20v2M16 20v2",
  ],
};

/** Cloud with snowflakes */
export const cloudSnowIcon: IconDefinition = {
  name: "cloud-snow",
  category: "weather",
  tags: ["snow", "winter", "cold", "flurry"],
  paths: [
    "M7 17h10a4 4 0 0 0 0-8 5 5 0 0 0-9.6-1A4 4 0 0 0 7 17z",
    "M8 19v3M6.5 20.5h3",
    "M16 19v3M14.5 20.5h3",
  ],
};

/** Cloud with lightning bolt */
export const cloudLightningIcon: IconDefinition = {
  name: "cloud-lightning",
  category: "weather",
  tags: ["storm", "thunder", "electric", "bolt"],
  paths: [
    "M7 17h10a4 4 0 0 0 0-8 5 5 0 0 0-9.6-1A4 4 0 0 0 7 17z",
    "M13 12l-3 5h4l-3 5",
  ],
  colors: [undefined, palette.amber],
};

/** Arched rainbow */
export const rainbowIcon: IconDefinition = {
  name: "rainbow",
  category: "weather",
  tags: ["spectrum", "arc", "colors", "pride"],
  paths: [
    "M2 18a10 10 0 0 1 20 0",
    "M5 18a7 7 0 0 1 14 0",
    "M8 18a4 4 0 0 1 8 0",
  ],
  colors: [palette.red, palette.amber, palette.blue],
};

/** Open umbrella */
export const umbrellaIcon: IconDefinition = {
  name: "umbrella",
  category: "weather",
  tags: ["rain", "shelter", "protect", "canopy"],
  paths: ["M3 12a9 9 0 0 1 18 0z", "M12 12v7a2 2 0 0 1-4 0"],
};

/** Six-armed snowflake */
export const snowflakeIcon: IconDefinition = {
  name: "snowflake",
  category: "weather",
  tags: ["snow", "winter", "cold", "frost"],
  paths: [
    "M12 3v18",
    "M3.8 7.5l16.4 9",
    "M3.8 16.5l16.4-9",
    "M9.5 4.5L12 7l2.5-2.5",
    "M9.5 19.5L12 17l2.5 2.5",
  ],
};

/** Sun rising over the horizon */
export const sunriseIcon: IconDefinition = {
  name: "sunrise",
  category: "weather",
  tags: ["dawn", "morning", "horizon", "sun"],
  paths: [
    "M2 18h20",
    "M7 18a5 5 0 0 1 10 0",
    "M12 9v2M5.6 11.6l1.3 1.3M18.4 11.6l-1.3 1.3",
  ],
};

/** Sun setting below the horizon */
export const sunsetIcon: IconDefinition = {
  name: "sunset",
  category: "weather",
  tags: ["dusk", "evening", "horizon", "sun"],
  paths: [
    "M2 18h20",
    "M7 18a5 5 0 0 1 10 0",
    "M12 4v6",
    "M9.5 7.5L12 10l2.5-2.5",
  ],
};

/** Three gusts of wind */
export const windIcon: IconDefinition = {
  name: "wind",
  category: "weather",
  tags: ["breeze", "air", "gust", "blow"],
  paths: [
    "M3 8h11a2.5 2.5 0 1 0-2.5-2.5",
    "M3 12h15a2.5 2.5 0 1 1-2.5 2.5",
    "M3 16h5",
  ],
};

/** Thermometer beside a sun */
export const thermometerSunIcon: IconDefinition = {
  name: "thermometer-sun",
  category: "weather",
  tags: ["temperature", "heat", "hot", "climate"],
  paths: [
    "M4 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0z",
    "M11.5 9a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0",
    "M15 3.5V2",
    "M18.9 5.1l1.05-1.05",
    "M20.5 9H22",
    "M18.9 12.9l1.05 1.05",
  ],
  colors: [
    undefined,
    palette.amber,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
};

/** Funnel-shaped tornado */
export const tornadoIcon: IconDefinition = {
  name: "tornado",
  category: "weather",
  tags: ["twister", "storm", "wind", "funnel"],
  paths: [
    "M4 5c4 1.5 12 1.5 16 0",
    "M7 10c3 1 7 1 10 0",
    "M9.5 15c2 .8 3.5.8 5 0",
    "M11 20h2",
  ],
};

/** Fog banks drifting across the view */
export const fogIcon: IconDefinition = {
  name: "fog",
  category: "weather",
  tags: ["mist", "haze", "visibility", "cloud"],
  paths: ["M3 8h18", "M6 12h12", "M3 16h18", "M6 20h12"],
};

/** Partly cloudy with the sun peeking out */
export const cloudSunIcon: IconDefinition = {
  name: "cloud-sun",
  category: "weather",
  tags: ["partly", "day", "forecast", "fair"],
  paths: [
    "M6 19h10a4 4 0 0 0 0-8 5 5 0 0 0-9.6-1A4 4 0 0 0 6 19z",
    "M15 5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0",
  ],
  colors: [undefined, palette.amber],
};

/** Cloud with falling hailstones */
export const cloudHailIcon: IconDefinition = {
  name: "cloud-hail",
  category: "weather",
  tags: ["hail", "ice", "storm", "pellets"],
  paths: [
    "M7 17h10a4 4 0 0 0 0-8 5 5 0 0 0-9.6-1A4 4 0 0 0 7 17z",
    "M8 20h.01M12 21h.01M16 20h.01",
  ],
};
