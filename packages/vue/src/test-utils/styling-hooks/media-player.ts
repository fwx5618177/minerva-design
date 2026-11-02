import { h } from "vue";
import { fireEvent } from "@testing-library/vue";
import { MediaPlayer } from "../../components/MediaPlayer";
import type { HookScenario } from "./types";

/** Fires media events (no media pipeline in tests) */
const fire = async (container: HTMLElement, ...events: string[]) => {
  const media = container.querySelector<HTMLMediaElement>("audio, video")!;
  Object.defineProperty(media, "duration", { configurable: true, value: 120 });
  for (const name of events) await fireEvent(media, new Event(name));
};

export default [
  {
    name: "video with title, paused",
    render: () => h(MediaPlayer, { src: "/clip.mp4", title: "Clip" }),
    setup: ({ container }) => fire(container, "loadedmetadata"),
  },
  {
    name: "audio, playing and buffering",
    render: () => h(MediaPlayer, { src: "/song.mp3", title: "Song" }),
    setup: ({ container }) =>
      fire(container, "loadedmetadata", "play", "waiting"),
  },
  {
    name: "video buffering (spinner over the video)",
    render: () => h(MediaPlayer, { src: "/clip.mp4" }),
    setup: ({ container }) => fire(container, "play", "waiting"),
  },
  {
    name: "ended",
    render: () => h(MediaPlayer, { src: "/song.mp3" }),
    setup: ({ container }) => fire(container, "loadedmetadata", "ended"),
  },
  {
    name: "audio with captions, menu open",
    render: () =>
      h(MediaPlayer, {
        src: "/song.mp3",
        title: "Song",
        tracks: [
          {
            src: "data:text/vtt,WEBVTT",
            srclang: "en",
            label: "English",
            default: true,
          },
        ],
      }),
    setup: async ({ container }) => {
      await fire(container, "loadedmetadata");
      await fireEvent.click(
        container.querySelector<HTMLElement>('[aria-haspopup="menu"]')!,
      );
    },
  },
  {
    name: "error",
    render: () => h(MediaPlayer, { src: "/broken.mp4" }),
    setup: ({ container }) => fire(container, "error"),
  },
] satisfies HookScenario[];
