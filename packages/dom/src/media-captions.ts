// Captions of the web media players (React / Vue / Angular MediaPlayer,
// <minerva-media-player>): the players render their tracks as <track>
// children of the <audio> / <video> and draw the active cue themselves, so
// captions look the same in every browser and work for audio too.
import {
  activeCueText,
  cueText,
  isSrtSource,
  loadCaptions,
  type MediaCue,
  type MediaTrack,
} from "@minerva/core";

/** Options of {@link bindMediaCaptions}. */
export interface MediaCaptionsOptions {
  /**
   * CORS mode of the player (`crossOrigin` of the media element): the
   * fallback fetch sends credentials only for `use-credentials`.
   */
  crossOrigin?: string | null;
  /** Reads a captions file (defaults to `fetch`). */
  fetchText?: (url: string) => Promise<string>;
}

const fetchTextWith =
  (crossOrigin?: string | null) =>
  async (url: string): Promise<string> => {
    if (typeof fetch !== "function") throw new Error("fetch is unavailable");
    const response = await fetch(url, {
      credentials:
        crossOrigin === "use-credentials" ? "include" : "same-origin",
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
  };

/** Plain text of a TextTrack's active cues (one cue per line). */
export function textTrackCueText(track: TextTrack | null | undefined): string {
  const cues = track?.activeCues;
  if (!cues) return "";
  const lines: string[] = [];
  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i] as (TextTrackCue & { text?: string }) | undefined;
    const text = cueText(cue?.text ?? "");
    if (text) lines.push(text);
  }
  return lines.join("\n");
}

/**
 * Shows the captions of `tracks[index]` (`-1` = off) of a media element whose
 * <track> children render `tracks` in order: the selected TextTrack is
 * `hidden` (loaded, not drawn by the browser) and `onText` receives the text
 * of its active cues on each `cuechange`. SRT files, failed <track> loads and
 * media without TextTrack support fall back to fetching and parsing the file
 * (`loadCaptions`), synchronized on `timeupdate`. While the video is in the
 * browser's own fullscreen (iOS) or picture-in-picture window, where the
 * overlay can't be seen, the track is `showing` instead.
 *
 * Returns the cleanup (removes the listeners, disables the tracks).
 */
export function bindMediaCaptions(
  media: HTMLMediaElement,
  tracks: readonly MediaTrack[],
  index: number,
  onText: (text: string) => void,
  options: MediaCaptionsOptions = {},
): () => void {
  const elements = Array.from(media.children).filter(
    (el): el is HTMLTrackElement => el.localName === "track",
  );
  const textTrackOf = (el: HTMLTrackElement | undefined) => {
    try {
      return el?.track ?? null;
    } catch {
      return null;
    }
  };
  const setMode = (el: HTMLTrackElement | undefined, mode: TextTrackMode) => {
    const track = textTrackOf(el);
    if (track && track.mode !== mode) track.mode = mode;
  };
  elements.forEach((el, i) => {
    if (i !== index) setMode(el, "disabled");
  });

  let last: string | null = null;
  const emit = (text: string) => {
    if (text === last) return;
    last = text;
    onText(text);
  };

  const selected = index >= 0 ? tracks[index] : undefined;
  if (!selected) {
    emit("");
    return () => undefined;
  }

  const cleanups: Array<() => void> = [];
  const on = (
    target: EventTarget,
    type: string,
    listener: EventListener,
  ): void => {
    target.addEventListener(type, listener);
    cleanups.push(() => target.removeEventListener(type, listener));
  };
  let disposed = false;

  const fallback = () => {
    let cues: MediaCue[] = [];
    const update = () => emit(activeCueText(cues, media.currentTime));
    emit("");
    on(media, "timeupdate", update);
    on(media, "seeked", update);
    loadCaptions(
      selected.src,
      options.fetchText ?? fetchTextWith(options.crossOrigin),
    ).then(
      (loaded) => {
        if (disposed) return;
        cues = loaded;
        update();
      },
      () => {
        if (!disposed) emit("");
      },
    );
  };

  const element = elements[index];
  const textTrack = textTrackOf(element);
  if (element && textTrack && !isSrtSource(selected.src)) {
    textTrack.mode = "hidden";
    let native = true;
    const onCueChange = () => {
      if (native) emit(textTrackCueText(textTrack));
    };
    on(textTrack, "cuechange", onCueChange);
    on(element, "error", () => {
      if (!native || disposed) return;
      native = false;
      fallback();
    });
    const show = () => {
      if (native) textTrack.mode = "showing";
    };
    const hide = () => {
      if (native) textTrack.mode = "hidden";
    };
    on(media, "webkitbeginfullscreen", show);
    on(media, "webkitendfullscreen", hide);
    on(media, "enterpictureinpicture", show);
    on(media, "leavepictureinpicture", hide);
    onCueChange();
  } else {
    setMode(element, "disabled");
    fallback();
  }

  return () => {
    disposed = true;
    for (const cleanup of cleanups.splice(0)) cleanup();
    setMode(element, "disabled");
  };
}
