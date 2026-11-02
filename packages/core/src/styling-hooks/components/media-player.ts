import { defineHooks } from "../types";

export default defineHooks({
  description:
    "An audio or video player with themed custom controls: play / pause, skip, seek bar, time, volume, playback speed and fullscreen",
  react: ["MediaPlayer"],
  wc: "minerva-media-player",
  parts: {
    root: { description: "The outermost element (the focusable player)" },
    media: { description: "The native <audio> or <video> element" },
    title: { description: "The title of the media (audio bar, video overlay)" },
    controls: { description: "The control bar" },
    button: {
      description:
        "A control button (play, skip, mute, speed, captions, fullscreen, picture-in-picture)",
    },
    seek: {
      description: "The seek bar (role=slider) with the buffered range",
    },
    time: { description: "The current time / duration text" },
    volume: { description: "The volume bar (role=slider)" },
    spinner: { description: "The loading indicator (while buffering)" },
    error: { description: "The error message (media that can't be played)" },
    captions: {
      description:
        "The captions overlay showing the active cue (video: over the picture, audio: below the title)",
    },
    "captions-menu": {
      description: "The captions menu (role=menu): Off and one item per track",
    },
  },
  states: {
    loading: true,
    invalid: true,
    status: ["playing", "paused", "ended"],
    variant: ["audio", "video"],
  },
});
