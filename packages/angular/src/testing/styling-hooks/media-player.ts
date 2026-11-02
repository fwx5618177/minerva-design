import { Component } from "@angular/core";
import { fireEvent } from "@testing-library/dom";
import { MnMediaPlayer } from "../../components/data";
import type { HookScenario } from "../types";

@Component({
  imports: [MnMediaPlayer],
  template: `<mn-media-player
      id="video"
      src="/clip.mp4"
      title="Clip"
    /><mn-media-player
      id="audio"
      src="/song.mp3"
      title="Song"
    /><mn-media-player id="ended" src="/song.mp3" /><mn-media-player
      id="broken"
      src="/broken.mp4"
    /><mn-media-player
      id="captioned"
      src="/song.mp3"
      title="Talk"
      [tracks]="tracks"
    />`,
})
class Fixture {
  readonly tracks = [
    {
      src: "data:text/vtt,WEBVTT",
      srclang: "en",
      label: "English",
      default: true,
    },
  ];
}

/** Fires media events on a player (no media pipeline in tests) */
const fire = (root: HTMLElement, id: string, ...events: string[]) => {
  const media = root.querySelector<HTMLMediaElement>(
    `#${id} audio, #${id} video`,
  )!;
  Object.defineProperty(media, "duration", { configurable: true, value: 120 });
  for (const name of events) fireEvent(media, new Event(name));
};

export default [
  {
    name: "video, audio playing and buffering, ended, error, captions menu",
    component: Fixture,
    setup: async ({ fixture, root }) => {
      fire(root, "video", "loadedmetadata", "play", "waiting");
      fire(root, "audio", "loadedmetadata", "play", "waiting");
      fire(root, "ended", "loadedmetadata", "ended");
      fire(root, "broken", "error");
      await fixture.whenStable();
      root
        .querySelector<HTMLElement>('#captioned [aria-haspopup="menu"]')!
        .click();
      fixture.detectChanges();
      await fixture.whenStable();
    },
  },
] satisfies HookScenario[];
