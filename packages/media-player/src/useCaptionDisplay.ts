import { useEffect, useState } from "react";
import {
  captionAt,
  parseSubtitles,
  subtitlePlainText,
  type SubtitleCue,
} from "./subtitles.js";
import type { PlayerTrack } from "./captions.js";

/** Abort stale subtitle requests; only the current track can update visible text. */
export function useCaptionDisplay(
  track: PlayerTrack | undefined,
  current: number,
  videoRef: React.RefObject<HTMLVideoElement | null>,
  crossOrigin?: string,
  selectedIndex = 0,
  customChrome = false,
  hostKey = "video",
) {
  const src = track?.src;
  const [loaded, setLoaded] = useState<{
    src: string;
    cues: SubtitleCue[];
  } | null>(null);
  useEffect(() => {
    if (!src) return;
    const abort = new AbortController();
    void (async () => {
      try {
        const response = await fetch(src, {
          signal: abort.signal,
          credentials:
            crossOrigin === "use-credentials" ? "include" : "same-origin",
        });
        if (!response.ok) throw new Error("Subtitle request failed");
        const cues = parseSubtitles(await response.text());
        if (!abort.signal.aborted) setLoaded({ src, cues });
      } catch {
        /* Native WebVTT remains available when fetch/CORS is unavailable. */
      }
    })();
    return () => abort.abort();
  }, [src, crossOrigin]);
  const active = loaded?.src === src && src !== undefined;
  const [nativeText, setNativeText] = useState<{
    src: string;
    text: string;
  } | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!customChrome || !src || !video) return;
    const element = video.querySelectorAll("track")[selectedIndex];
    const selected = element?.track;
    if (!selected) return;
    const emit = () => {
      const cues = selected.activeCues;
      const lines: string[] = [];
      if (cues)
        for (let i = 0; i < cues.length; i++) {
          const cue = cues[i] as TextTrackCue & { text?: string };
          if (cue?.text) lines.push(subtitlePlainText(cue.text));
        }
      setNativeText({ src, text: lines.join("\n") });
    };
    selected.mode = "hidden";
    selected.addEventListener?.("cuechange", emit);
    emit();
    return () => selected.removeEventListener?.("cuechange", emit);
  }, [customChrome, src, selectedIndex, videoRef, hostKey]);
  useEffect(() => {
    const video = videoRef.current;
    if ((!active && !customChrome) || !video || !src) return;
    let nativePresentation =
      document.pictureInPictureElement === video ||
      !!(video as HTMLVideoElement & { webkitDisplayingFullscreen?: boolean })
        .webkitDisplayingFullscreen;
    const sync = () => {
      const elements = video.querySelectorAll("track");
      const tracks =
        customChrome && elements.length
          ? Array.from(elements).map((el) => el.track)
          : video.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        if (!tracks[i]) continue;
        if (i === selectedIndex)
          tracks[i].mode = nativePresentation ? "showing" : "hidden";
        else tracks[i].mode = "disabled";
      }
    };
    const show = () => {
      nativePresentation = true;
      sync();
    };
    const hide = () => {
      nativePresentation = false;
      sync();
    };
    sync();
    const listeners: Array<[string, () => void]> = [
      ["loadedmetadata", sync],
      ["webkitbeginfullscreen", show],
      ["webkitendfullscreen", hide],
      ["enterpictureinpicture", show],
      ["leavepictureinpicture", hide],
    ];
    for (const [name, listener] of listeners)
      video.addEventListener(name, listener);
    return () => {
      for (const [name, listener] of listeners)
        video.removeEventListener(name, listener);
    };
  }, [active, src, videoRef, selectedIndex, customChrome, hostKey]);
  return active && loaded
    ? captionAt(loaded.cues, current)
    : nativeText && nativeText.src === src
      ? nativeText.text
      : "";
}
