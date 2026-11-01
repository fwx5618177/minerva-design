// Music icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";

/** Single eighth note */
export const musicNoteIcon: IconDefinition = {
  name: "music-note",
  category: "music",
  tags: ["note", "eighth", "melody", "sound"],
  paths: [
    "M5.5 18a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0",
    "M10.5 18V4",
    "M10.5 4c3 1.5 4.5 3.5 4.5 7",
  ],
};

/** Acoustic guitar */
export const guitarIcon: IconDefinition = {
  name: "guitar",
  category: "music",
  tags: ["strings", "acoustic", "chords", "instrument"],
  paths: [
    "M9.5 13.5A4 4 0 1 1 14.5 13.5A5 5 0 0 1 9.5 13.5Z",
    "M10.5 17.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
    "M10 20.5h4",
    "M10.5 6.6V3.5",
    "M13.5 6.6V3.5",
    "M9.5 3.5h5v-2h-5z",
    "M9.5 2.5H7.5",
    "M14.5 2.5h2",
  ],
};

/** Piano keys */
export const pianoIcon: IconDefinition = {
  name: "piano",
  category: "music",
  tags: ["keyboard", "keys", "ivory", "instrument"],
  paths: [
    "M3 4h18v16H3z",
    "M7.5 13v7",
    "M12 13v7",
    "M16.5 13v7",
    "M6 4v9h3V4",
    "M15 4v9h3V4",
  ],
};

/** Microphone on a stand */
export const micStandIcon: IconDefinition = {
  name: "mic-stand",
  category: "music",
  tags: ["microphone", "vocals", "singing", "stage"],
  paths: [
    "M9 3h6v8a3 3 0 0 1-6 0z",
    "M6 9.5a6 6 0 0 0 12 0",
    "M12 15.5V21",
    "M8 21h8",
  ],
};

/** Concert harp */
export const harpIcon: IconDefinition = {
  name: "harp",
  category: "music",
  tags: ["strings", "orchestra", "classical", "instrument"],
  paths: [
    "M4 20C4 8 8 4 16 3",
    "M16 3l4 18",
    "M3 21h18",
    "M8 18V10",
    "M11 18V8",
    "M14 18V6",
  ],
};

/** Bass drum with tension lines */
export const drumIcon: IconDefinition = {
  name: "drum",
  category: "music",
  tags: ["percussion", "beat", "rhythm", "band"],
  paths: [
    "M3 7a9 3 0 1 0 18 0a9 3 0 1 0-18 0",
    "M3 7v10a9 3 0 0 0 18 0V7",
    "M7.5 10.5l4.5 7 4.5-7",
  ],
};

/** Metronome with pendulum */
export const metronomeIcon: IconDefinition = {
  name: "metronome",
  category: "music",
  tags: ["tempo", "beat", "timing", "practice"],
  paths: ["M9 3h6l4.5 18h-15z", "M12 17.5L15.5 7", "M12.9 12.5h1.6"],
};

/** Tuning fork with sound waves */
export const tuningForkIcon: IconDefinition = {
  name: "tuning-fork",
  category: "music",
  tags: ["pitch", "tune", "vibration", "note"],
  paths: [
    "M8 3v7a4 4 0 0 0 8 0V3",
    "M12 14v7",
    "M4.5 6.5a4 4 0 0 0 0 6",
    "M19.5 6.5a4 4 0 0 1 0 6",
  ],
};

/** Vinyl record */
export const vinylIcon: IconDefinition = {
  name: "vinyl",
  category: "music",
  tags: ["record", "lp", "turntable", "album"],
  paths: [
    "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0",
    "M7 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0",
    "M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
  ],
};

/** Compact disc */
export const discIcon: IconDefinition = {
  name: "disc",
  category: "music",
  tags: ["cd", "compact", "album", "media"],
  paths: [
    "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0",
    "M10 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M6.5 8.5a7 7 0 0 1 3-2.5",
  ],
};

/** Audio cassette tape */
export const cassetteIcon: IconDefinition = {
  name: "cassette",
  category: "music",
  tags: ["tape", "mixtape", "retro", "audio"],
  paths: [
    "M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
    "M6.5 11.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M13.5 11.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M7 15.5h10",
  ],
};

/** Loudspeaker */
export const speakerIcon: IconDefinition = {
  name: "speaker",
  category: "music",
  tags: ["audio", "woofer", "sound", "stereo"],
  paths: [
    "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
    "M9 15a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    "M11 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
  ],
};

/** Portable radio */
export const radioIcon: IconDefinition = {
  name: "radio",
  category: "music",
  tags: ["fm", "broadcast", "tuner", "antenna"],
  paths: [
    "M3 9h18v11H3z",
    "M14 9L19 3",
    "M6 12.5h12",
    "M5.5 16.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0",
    "M14 15.5h4",
    "M14 18.5h4",
  ],
};

/** Graphic equalizer sliders */
export const equalizerIcon: IconDefinition = {
  name: "equalizer",
  category: "music",
  tags: ["eq", "sliders", "mixer", "audio"],
  paths: [
    "M4 21v-7",
    "M4 10V3",
    "M2 14h4",
    "M12 21v-9",
    "M12 8V3",
    "M10 8h4",
    "M20 21v-5",
    "M20 12V3",
    "M18 16h4",
  ],
};

/** Audio waveform bars */
export const soundwaveIcon: IconDefinition = {
  name: "soundwave",
  category: "music",
  tags: ["waveform", "audio", "voice", "bars"],
  paths: ["M3 10v4", "M7 6v12", "M11 3v18", "M15 8v8", "M19 10v4"],
};

/** Playlist with a note */
export const playlistIcon: IconDefinition = {
  name: "playlist",
  category: "music",
  tags: ["queue", "tracks", "songs", "list"],
  paths: [
    "M4 6h11",
    "M4 12h11",
    "M4 18h6",
    "M15 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M19 18V5",
  ],
};

/** Speech bubble with a note (lyrics) */
export const lyricsIcon: IconDefinition = {
  name: "lyrics",
  category: "music",
  tags: ["words", "karaoke", "song", "subtitles"],
  paths: [
    "M4 4h16v12h-6l-4 4v-4H4z",
    "M9.5 13.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
    "M12.5 13.5V8.5l3-1V11",
  ],
};

/** Headset with boom microphone */
export const headsetIcon: IconDefinition = {
  name: "headset",
  category: "music",
  tags: ["call", "support", "voice", "mic"],
  paths: [
    "M4 13v-1a8 8 0 0 1 16 0v1",
    "M3 13h3v6H3z",
    "M18 13h3v6h-3z",
    "M18 19c0 2-1.5 2.5-3.5 2.5H12",
  ],
};
