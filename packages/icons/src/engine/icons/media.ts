// Media and playback icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";

/** Triangle pointing right */
export const playIcon: IconDefinition = {
  name: "play",
  category: "media",
  tags: ["start", "resume", "run"],
  paths: [
    "M7 6.68A1.5 1.5 0 0 1 9.29 5.41L17.92 10.72A1.5 1.5 0 0 1 17.92 13.28L9.29 18.59A1.5 1.5 0 0 1 7 17.32Z",
  ],
};

/** Two vertical bars */
export const pauseIcon: IconDefinition = {
  name: "pause",
  category: "media",
  tags: ["hold", "break", "wait"],
  paths: [
    "M7 4h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1Z",
    "M15 4h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1Z",
  ],
};

/** Square */
export const stopIcon: IconDefinition = {
  name: "stop",
  category: "media",
  tags: ["halt", "end", "finish"],
  paths: [
    "M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2Z",
  ],
};

/** Triangle pointing right against a bar */
export const skipForwardIcon: IconDefinition = {
  name: "skip-forward",
  category: "media",
  tags: ["next", "track", "forward"],
  paths: [
    "M5 7.8A1.5 1.5 0 0 1 7.33 6.55L13.63 10.75A1.5 1.5 0 0 1 13.63 13.25L7.33 17.45A1.5 1.5 0 0 1 5 16.2Z",
    "M19 5v14",
  ],
};

/** Triangle pointing left against a bar */
export const skipBackIcon: IconDefinition = {
  name: "skip-back",
  category: "media",
  tags: ["previous", "track", "back"],
  paths: [
    "M19 7.8A1.5 1.5 0 0 0 16.67 6.55L10.37 10.75A1.5 1.5 0 0 0 10.37 13.25L16.67 17.45A1.5 1.5 0 0 0 19 16.2Z",
    "M5 5v14",
  ],
};

/** Two triangles pointing right */
export const fastForwardIcon: IconDefinition = {
  name: "fast-forward",
  category: "media",
  tags: ["forward", "speed", "seek"],
  paths: [
    "M3 8.24A1.2 1.2 0 0 1 4.87 7.24L10.5 11A1.2 1.2 0 0 1 10.5 13L4.87 16.76A1.2 1.2 0 0 1 3 15.76Z",
    "M12 8.24A1.2 1.2 0 0 1 13.87 7.24L19.5 11A1.2 1.2 0 0 1 19.5 13L13.87 16.76A1.2 1.2 0 0 1 12 15.76Z",
  ],
};

/** Two triangles pointing left */
export const rewindIcon: IconDefinition = {
  name: "rewind",
  category: "media",
  tags: ["backward", "seek", "reverse"],
  paths: [
    "M21 8.24A1.2 1.2 0 0 0 19.13 7.24L13.5 11A1.2 1.2 0 0 0 13.5 13L19.13 16.76A1.2 1.2 0 0 0 21 15.76Z",
    "M12 8.24A1.2 1.2 0 0 0 10.13 7.24L4.5 11A1.2 1.2 0 0 0 4.5 13L10.13 16.76A1.2 1.2 0 0 0 12 15.76Z",
  ],
};

/** Speaker with two sound waves */
export const volumeIcon: IconDefinition = {
  name: "volume",
  category: "media",
  tags: ["sound", "audio", "loud", "speaker"],
  paths: [
    "M11 5L6.5 9H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2.5l4.5 4Z",
    "M15.5 8.5a5 5 0 0 1 0 7",
    "M18.5 5.5a9.2 9.2 0 0 1 0 13",
  ],
};

/** Speaker with one sound wave */
export const volume1Icon: IconDefinition = {
  name: "volume-1",
  category: "media",
  tags: ["sound", "audio", "quiet", "speaker"],
  paths: [
    "M11 5L6.5 9H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2.5l4.5 4Z",
    "M15.5 8.5a5 5 0 0 1 0 7",
  ],
};

/** Speaker with a cross */
export const volumeOffIcon: IconDefinition = {
  name: "volume-off",
  category: "media",
  tags: ["mute", "silent", "no sound"],
  paths: [
    "M11 5L6.5 9H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2.5l4.5 4Z",
    "M16 9.5l5 5",
    "M21 9.5l-5 5",
  ],
};

/** Microphone */
export const micIcon: IconDefinition = {
  name: "mic",
  category: "media",
  tags: ["microphone", "record", "voice", "audio"],
  paths: [
    "M12 2.5a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3Z",
    "M5.5 11a6.5 6.5 0 0 0 13 0",
    "M12 17.5V21",
  ],
};

/** Microphone with a slash */
export const micOffIcon: IconDefinition = {
  name: "mic-off",
  category: "media",
  tags: ["mute", "microphone off", "silent"],
  paths: [
    "M12 2.5a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3Z",
    "M5.5 11a6.5 6.5 0 0 0 13 0",
    "M12 17.5V21",
    "M3 3l18 18",
  ],
};

/** Photo camera */
export const cameraIcon: IconDefinition = {
  name: "camera",
  category: "media",
  tags: ["photo", "picture", "snapshot", "capture"],
  paths: [
    "M3 9a2 2 0 0 1 2-2h2.5L9 4.5h6L16.5 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
    "M8.5 13a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0",
  ],
};

/** Framed picture with mountains */
export const imageIcon: IconDefinition = {
  name: "image",
  category: "media",
  tags: ["picture", "photo", "gallery", "landscape"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2Z",
    "M7 8.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0",
    "M3 18l6-6 5 5 2.5-2.5 4.5 4.5",
  ],
};

/** Video camera */
export const videoIcon: IconDefinition = {
  name: "video",
  category: "media",
  tags: ["camera", "film", "record", "movie"],
  paths: [
    "M4.5 6h9a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-9a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2Z",
    "M15.5 10.5l6-3.5v10l-6-3.5",
  ],
};

/** Beamed musical notes */
export const musicIcon: IconDefinition = {
  name: "music",
  category: "media",
  tags: ["song", "audio", "note", "melody"],
  paths: [
    "M8.5 17V5.5L20 3v12",
    "M8.5 9.5L20 7",
    "M3.5 17a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
    "M15 15a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
  ],
};

/** Headphones */
export const headphonesIcon: IconDefinition = {
  name: "headphones",
  category: "media",
  tags: ["audio", "listen", "headset", "music"],
  paths: [
    "M3 16v-4a9 9 0 0 1 18 0v4",
    "M4.5 13.5h1.5a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1 -1.5 1.5h-1.5a1.5 1.5 0 0 1 -1.5 -1.5v-4.5a1.5 1.5 0 0 1 1.5 -1.5Z",
    "M18 13.5h1.5a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1 -1.5 1.5h-1.5a1.5 1.5 0 0 1 -1.5 -1.5v-4.5a1.5 1.5 0 0 1 1.5 -1.5Z",
  ],
};

/** Two arrows forming a loop */
export const repeatIcon: IconDefinition = {
  name: "repeat",
  category: "media",
  tags: ["loop", "cycle", "replay"],
  paths: [
    "M17 3l3 3-3 3",
    "M4 11v-1a4 4 0 0 1 4-4h12",
    "M7 21l-3-3 3-3",
    "M20 13v1a4 4 0 0 1-4 4H4",
  ],
};

/** Crossing arrows */
export const shuffleIcon: IconDefinition = {
  name: "shuffle",
  category: "media",
  tags: ["random", "mix", "playlist"],
  paths: [
    "M3 6h2.5c5.5 0 7.5 12 13 12H21",
    "M3 18h2.5c5.5 0 7.5-12 13-12H21",
    "M18 3l3 3-3 3",
    "M18 15l3 3-3 3",
  ],
};

/** Film strip */
export const filmIcon: IconDefinition = {
  name: "film",
  category: "media",
  tags: ["movie", "cinema", "reel", "video"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2Z",
    "M7.5 3v18",
    "M16.5 3v18",
    "M3 12h18",
    "M3 7.5h4.5",
    "M3 16.5h4.5",
    "M16.5 7.5H21",
    "M16.5 16.5H21",
  ],
};
