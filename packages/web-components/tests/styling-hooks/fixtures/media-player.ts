import type { WcHookScenario } from "../types";
import type { MinervaMediaPlayer } from "../../../src/components/media-player/media-player";

/** Dispatches media events on the element's <audio> / <video> (no media pipeline in tests) */
const fire = async (root: HTMLElement, ...events: string[]) => {
  const player = root.querySelector<MinervaMediaPlayer>(
    "minerva-media-player",
  )!;
  await player.updateComplete;
  const media = player.element!;
  Object.defineProperty(media, "duration", { configurable: true, value: 120 });
  for (const name of events) media.dispatchEvent(new Event(name));
  await player.updateComplete;
};

export default [
  {
    name: "video with title, paused",
    html: `<minerva-media-player src="/clip.mp4"><span slot="heading">Clip</span></minerva-media-player>`,
    setup: (root) => fire(root, "loadedmetadata"),
  },
  {
    name: "audio, playing and buffering",
    html: `<minerva-media-player src="/song.mp3"><span slot="heading">Song</span></minerva-media-player>`,
    setup: (root) => fire(root, "loadedmetadata", "play", "waiting"),
  },
  {
    name: "video buffering (spinner over the video)",
    html: `<minerva-media-player src="/clip.mp4"></minerva-media-player>`,
    setup: (root) => fire(root, "play", "waiting"),
  },
  {
    name: "ended",
    html: `<minerva-media-player src="/song.mp3"></minerva-media-player>`,
    setup: (root) => fire(root, "loadedmetadata", "ended"),
  },
  {
    name: "error",
    html: `<minerva-media-player src="/broken.mp4"></minerva-media-player>`,
    setup: (root) => fire(root, "error"),
  },
] satisfies WcHookScenario[];
