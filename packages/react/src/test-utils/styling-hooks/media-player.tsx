import { fireEvent } from "@testing-library/react";
import { MediaPlayer } from "../../components/MediaPlayer";
import type { HookScenario } from "./types";

const media = (container: HTMLElement) =>
  container.querySelector<HTMLMediaElement>("audio, video")!;

/** Fakes loaded metadata (jsdom has no media pipeline) */
const loaded = (container: HTMLElement) => {
  const element = media(container);
  Object.defineProperty(element, "duration", {
    configurable: true,
    value: 120,
  });
  fireEvent(element, new Event("loadedmetadata"));
};

export default [
  {
    name: "video with title, paused",
    element: <MediaPlayer src="/clip.mp4" title="Clip" />,
    setup: ({ container }) => loaded(container),
  },
  {
    name: "audio, playing and buffering",
    element: <MediaPlayer src="/song.mp3" title="Song" />,
    setup: ({ container }) => {
      loaded(container);
      fireEvent(media(container), new Event("play"));
      fireEvent(media(container), new Event("waiting"));
    },
  },
  {
    name: "video buffering (spinner over the video)",
    element: <MediaPlayer src="/clip.mp4" />,
    setup: ({ container }) => {
      fireEvent(media(container), new Event("play"));
      fireEvent(media(container), new Event("waiting"));
    },
  },
  {
    name: "ended",
    element: <MediaPlayer src="/song.mp3" />,
    setup: ({ container }) => {
      loaded(container);
      fireEvent(media(container), new Event("ended"));
    },
  },
  {
    name: "audio with captions, menu open",
    element: (
      <MediaPlayer
        src="/song.mp3"
        title="Song"
        tracks={[
          {
            src: "data:text/vtt,WEBVTT",
            srclang: "en",
            label: "English",
            default: true,
          },
        ]}
      />
    ),
    setup: async ({ user, container }) => {
      loaded(container);
      await user.click(
        container.querySelector<HTMLElement>('[aria-haspopup="menu"]')!,
      );
    },
  },
  {
    name: "error",
    element: <MediaPlayer src="/broken.mp4" />,
    setup: ({ container }) => {
      Object.defineProperty(media(container), "error", {
        configurable: true,
        value: { code: 4, message: "Unsupported media source" },
      });
      fireEvent(media(container), new Event("error"));
    },
  },
] satisfies HookScenario[];
