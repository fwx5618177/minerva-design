// Platform-neutral helpers of the media players (React / Vue / Angular
// MediaPlayer, <minerva-media-player>, the mini-program players and the
// React Native MediaControls): time formatting, media type inference,
// playback rates and the keyboard map.

/** Kind of media a player renders. */
export type MediaKind = "audio" | "video";

/** Default playback rates of the speed button. */
export const DEFAULT_PLAYBACK_RATES: readonly number[] = [
  0.5, 0.75, 1, 1.25, 1.5, 2,
];

/** Default skip step of the back / forward buttons (seconds). */
export const DEFAULT_SKIP_SECONDS = 10;

/** Seek step of the arrow keys (seconds). */
export const MEDIA_KEY_SEEK_STEP = 5;

/** Volume step of the arrow keys (0..1). */
export const MEDIA_KEY_VOLUME_STEP = 0.1;

const AUDIO_EXTENSIONS = new Set([
  "mp3",
  "m4a",
  "aac",
  "wav",
  "oga",
  "ogg",
  "opus",
  "flac",
  "weba",
]);

/**
 * Kind of media from an explicit `type`, a MIME type (`audio/mpeg`) or the
 * file extension of `src` (query and hash ignored). Defaults to video.
 */
export function inferMediaType(
  src?: string | null,
  mimeType?: string | null,
  type?: MediaKind | null,
): MediaKind {
  if (type === "audio" || type === "video") return type;
  const mime = mimeType?.trim().toLowerCase();
  if (mime?.startsWith("audio/")) return "audio";
  if (mime?.startsWith("video/")) return "video";
  const path = (src ?? "").split(/[?#]/)[0] ?? "";
  const dot = path.lastIndexOf(".");
  const ext = dot >= 0 ? path.slice(dot + 1).toLowerCase() : "";
  return AUDIO_EXTENSIONS.has(ext) ? "audio" : "video";
}

const finite = (n: number | null | undefined): number =>
  typeof n === "number" && Number.isFinite(n) && n > 0 ? n : 0;

/**
 * `m:ss`, or `h:mm:ss` when the time (or the `duration` it is shown next
 * to) reaches an hour. Negative, NaN and infinite values show `0:00`.
 */
export function formatMediaTime(seconds: number, duration?: number): string {
  const total = Math.floor(finite(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  const ss = String(secs).padStart(2, "0");
  if (hours > 0 || finite(duration) >= 3600) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${ss}`;
  }
  return `${minutes}:${ss}`;
}

/** Clamps a seek target to `0..duration` (no upper bound while unknown). */
export function clampMediaTime(seconds: number, duration?: number): number {
  const value = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const max = finite(duration);
  return max > 0 ? Math.min(value, max) : value;
}

/** Played fraction (0..1) of the media. */
export const mediaProgress = (currentTime: number, duration: number): number =>
  finite(duration) > 0
    ? Math.min(1, Math.max(0, finite(currentTime) / duration))
    : 0;

/** Clamps a volume to 0..1 (rounded to two decimals). */
export const clampVolume = (volume: number): number =>
  Number.isFinite(volume)
    ? Math.round(Math.min(1, Math.max(0, volume)) * 100) / 100
    : 1;

/** The rate after `current` in `rates` (wraps around; first when unknown). */
export function nextPlaybackRate(
  current: number,
  rates: readonly number[] = DEFAULT_PLAYBACK_RATES,
): number {
  if (rates.length === 0) return current;
  const index = rates.indexOf(current);
  return rates[(index + 1) % rates.length] ?? current;
}

/** `1.25` -> `1.25×`, `1` -> `1×`. */
export const formatPlaybackRate = (rate: number): string =>
  `${Number(rate.toFixed(2))}×`;

/** Minimal `TimeRanges` shape (DOM media `buffered`). */
export interface MediaTimeRanges {
  readonly length: number;
  start(index: number): number;
  end(index: number): number;
}

/**
 * End of the buffered range that contains `currentTime` (or of the last range
 * before it): what the seek bar shows as loaded.
 */
export function bufferedEnd(
  ranges: MediaTimeRanges | null | undefined,
  currentTime: number,
): number {
  if (!ranges || ranges.length === 0) return 0;
  let end = 0;
  for (let i = 0; i < ranges.length; i++) {
    const start = ranges.start(i);
    const stop = ranges.end(i);
    if (currentTime >= start && currentTime <= stop) return stop;
    if (stop <= currentTime) end = stop;
  }
  return end;
}

/**
 * Icons of the control bar: SVG path data on a 24×24 box, filled with
 * `currentColor` (Material Symbols shapes, Apache-2.0).
 */
export const MEDIA_ICON_PATHS = {
  play: "M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.3A1 1 0 0 0 8 5.14z",
  pause: "M7 5h3.5v14H7zm6.5 0H17v14h-3.5z",
  skipBack:
    "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z",
  skipForward:
    "M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z",
  volume:
    "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.47 4.47 0 0 0 16.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",
  muted:
    "M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z",
  fullscreen:
    "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z",
  exitFullscreen:
    "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z",
  pictureInPicture:
    "M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z",
} as const;

/** Name of a control bar icon. */
export type MediaIconName = keyof typeof MEDIA_ICON_PATHS;

/** What a key does when the player has the focus. */
export type MediaKeyAction =
  | { type: "toggle" }
  | { type: "seek"; delta: number }
  | { type: "volume"; delta: number }
  | { type: "mute" }
  | { type: "fullscreen" };

/**
 * Space / K play-pause, ← / → seek by 5 s, ↑ / ↓ volume, M mute,
 * F fullscreen. `null` for other keys (and modified keys).
 */
export function mediaKeyAction(
  key: string,
  modifiers: { ctrlKey?: boolean; metaKey?: boolean; altKey?: boolean } = {},
): MediaKeyAction | null {
  if (modifiers.ctrlKey || modifiers.metaKey || modifiers.altKey) return null;
  switch (key) {
    case " ":
    case "Spacebar":
    case "k":
    case "K":
      return { type: "toggle" };
    case "ArrowLeft":
      return { type: "seek", delta: -MEDIA_KEY_SEEK_STEP };
    case "ArrowRight":
      return { type: "seek", delta: MEDIA_KEY_SEEK_STEP };
    case "ArrowUp":
      return { type: "volume", delta: MEDIA_KEY_VOLUME_STEP };
    case "ArrowDown":
      return { type: "volume", delta: -MEDIA_KEY_VOLUME_STEP };
    case "m":
    case "M":
      return { type: "mute" };
    case "f":
    case "F":
      return { type: "fullscreen" };
    default:
      return null;
  }
}
