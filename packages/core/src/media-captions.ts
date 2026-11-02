// Captions / subtitles of the media players: a small WebVTT + SRT parser, the
// active cue at a playback time, data: URL decoding and the remembered track
// choice. Platform-neutral: no DOM, no `fetch`, no storage globals (callers
// inject them).

/** A captions / subtitles file of a media player. */
export interface MediaTrack {
  /** URL of the WebVTT (`.vtt`) or SubRip (`.srt`) file (data: URLs work). */
  src: string;
  /** BCP 47 language of the track (`en`, `fr-CA`). */
  srclang?: string;
  /** Name shown in the captions menu. */
  label: string;
  /** `subtitles` (translation, default) or `captions` (transcription + sounds). */
  kind?: "subtitles" | "captions";
  /** Selected when the user has not chosen a track yet. */
  default?: boolean;
}

/** A parsed cue: shown from `start` (inclusive) to `end` (exclusive), seconds. */
export interface MediaCue {
  start: number;
  end: number;
  text: string;
}

/** What the players emit when the captions choice changes (`-1` = off). */
export interface MediaTrackChange {
  index: number;
  track: MediaTrack | null;
}

const TIMING =
  /^\s*((?:\d+:)?\d{1,2}:\d{1,2}(?:[.,]\d{1,3})?)\s*-->\s*((?:\d+:)?\d{1,2}:\d{1,2}(?:[.,]\d{1,3})?)/;

/** `01:02:03.500`, `02:03,5` -> seconds (NaN when malformed). */
export function parseCueTime(value: string): number {
  const parts = value.trim().replace(",", ".").split(":");
  if (parts.length < 2 || parts.length > 3) return Number.NaN;
  let seconds = 0;
  for (const part of parts) {
    if (!/^\d+(?:\.\d+)?$/.test(part)) return Number.NaN;
    seconds = seconds * 60 + Number(part);
  }
  return seconds;
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
  lrm: "\u200e",
  rlm: "\u200f",
};

/**
 * Plain text of a cue payload: strips WebVTT / SRT markup (`<v Name>`, `<b>`,
 * `<i>`, `<c.class>`, `<00:01.000>` timestamps, `<font>`, `{\an8}`) and
 * decodes the character references.
 */
export function cueText(raw: string): string {
  return raw
    .replace(/\r\n?/g, "\n")
    .replace(/\{\\[^}]*\}/g, "")
    .replace(/<[^>\n]*>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, name: string) => {
      if (name[0] === "#") {
        const code =
          name[1] === "x" || name[1] === "X"
            ? Number.parseInt(name.slice(2), 16)
            : Number.parseInt(name.slice(1), 10);
        return Number.isFinite(code) && code > 0 && code <= 0x10ffff
          ? String.fromCodePoint(code)
          : match;
      }
      return ENTITIES[name.toLowerCase()] ?? match;
    })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function parseBlocks(text: string): MediaCue[] {
  const cues: MediaCue[] = [];
  const blocks = text
    .replace(/^\uFEFF/, "")
    .replace(/\r\n?/g, "\n")
    .split(/\n[ \t]*\n/);
  for (const block of blocks) {
    const lines = block.split("\n");
    const at = lines.findIndex((line) => line.includes("-->"));
    if (at < 0) continue;
    const head = lines[0]?.trim() ?? "";
    // WebVTT NOTE / STYLE / REGION blocks never carry cues.
    if (/^(NOTE|STYLE|REGION)(\s|$)/.test(head) && at !== 0) continue;
    const timing = TIMING.exec(lines[at] ?? "");
    if (!timing) continue;
    const start = parseCueTime(timing[1] ?? "");
    const end = parseCueTime(timing[2] ?? "");
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      continue;
    }
    const content = cueText(lines.slice(at + 1).join("\n"));
    if (content) cues.push({ start, end, text: content });
  }
  return cues.sort((a, b) => a.start - b.start || a.end - b.end);
}

/** Cues of a WebVTT file (header, NOTE / STYLE / REGION blocks skipped). */
export function parseVtt(text: string): MediaCue[] {
  return parseBlocks(text.replace(/^\uFEFF?WEBVTT[^\n]*(\n|$)/, "\n"));
}

/** Cues of a SubRip (SRT) file. */
export const parseSrt = (text: string): MediaCue[] => parseBlocks(text);

/** Cues of a WebVTT or SRT file (detected from the `WEBVTT` header). */
export function parseCaptions(text: string): MediaCue[] {
  return /^\uFEFF?WEBVTT/.test(text) ? parseVtt(text) : parseSrt(text);
}

/** Text of the cues shown at `time` (overlapping cues on separate lines). */
export function activeCueText(cues: readonly MediaCue[], time: number): string {
  if (!Number.isFinite(time)) return "";
  const lines: string[] = [];
  for (const cue of cues) {
    if (cue.start > time) break;
    if (time < cue.end) lines.push(cue.text);
  }
  return lines.join("\n");
}

/** Whether `src` names a SubRip file (`.srt`, or an `application/x-subrip` data: URL). */
export function isSrtSource(src: string): boolean {
  if (/^data:/i.test(src)) return /^data:[^,;]*(subrip|srt)/i.test(src);
  const path = src.split(/[?#]/)[0] ?? "";
  return /\.srt$/i.test(path);
}

const BASE64 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function decodeBase64(value: string): string {
  const clean = value.replace(/[^A-Za-z0-9+/]/g, "");
  let hex = "";
  let buffer = 0;
  let bits = 0;
  for (const char of clean) {
    buffer = (buffer << 6) | BASE64.indexOf(char);
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      hex += `%${((buffer >> bits) & 0xff).toString(16).padStart(2, "0")}`;
    }
  }
  try {
    return decodeURIComponent(hex);
  } catch {
    // Not UTF-8: read the bytes as Latin-1.
    return hex.replace(/%([0-9a-f]{2})/g, (_, byte: string) =>
      String.fromCharCode(Number.parseInt(byte, 16)),
    );
  }
}

/** Text of a `data:` URL (percent-encoded or base64), `null` for other URLs. */
export function decodeDataUrl(src: string): string | null {
  const match = /^data:([^,]*),([\s\S]*)$/i.exec(src.trim());
  if (!match) return null;
  const meta = match[1] ?? "";
  const body = match[2] ?? "";
  if (/;base64$/i.test(meta)) return decodeBase64(body);
  try {
    return decodeURIComponent(body);
  } catch {
    return body;
  }
}

/**
 * Cues of a captions file: decodes data: URLs in place, otherwise reads the
 * text with `fetchText` (`fetch`, `Taro.request`, `uni.request`…).
 */
export async function loadCaptions(
  src: string,
  fetchText: (url: string) => Promise<string>,
): Promise<MediaCue[]> {
  const inline = decodeDataUrl(src);
  const text = inline ?? (await fetchText(src));
  return isSrtSource(src) ? parseSrt(text) : parseCaptions(text);
}

/** Storage key of the remembered captions choice. */
export const MEDIA_CAPTIONS_STORAGE_KEY = "minerva-media-player-captions";

/** Remembered form of a choice: `"off"`, or the track language (label when none). */
export const captionsPreference = (track: MediaTrack | null): string =>
  track ? track.srclang || track.label : "off";

const primary = (lang: string) => lang.toLowerCase().split(/[-_]/)[0] ?? "";

/**
 * Index of the track to show (`-1` = off): the remembered choice (`"off"`,
 * a language — exact, then primary subtag — or a label), else the first
 * `default` track, else off.
 */
export function pickCaptionsTrack(
  tracks: readonly MediaTrack[],
  preference?: string | null,
): number {
  if (tracks.length === 0) return -1;
  if (preference === "off") return -1;
  if (preference) {
    const wanted = preference.toLowerCase();
    let index = tracks.findIndex((t) => t.srclang?.toLowerCase() === wanted);
    if (index < 0) {
      index = tracks.findIndex(
        (t) => !!t.srclang && primary(t.srclang) === primary(wanted),
      );
    }
    if (index < 0) {
      index = tracks.findIndex((t) => t.label.toLowerCase() === wanted);
    }
    if (index >= 0) return index;
  }
  return tracks.findIndex((t) => t.default);
}

/** Minimal synchronous key-value storage (`localStorage`, mini-program storage). */
export interface CaptionsStorage {
  getItem(key: string): string | null | undefined;
  setItem(key: string, value: string): void;
}

/** The remembered captions choice (`null` when none or storage fails). */
export function readCaptionsPreference(
  storage?: CaptionsStorage | null,
): string | null {
  try {
    const value = storage?.getItem(MEDIA_CAPTIONS_STORAGE_KEY);
    return typeof value === "string" && value ? value : null;
  } catch {
    return null;
  }
}

/** Remembers a captions choice (storage failures ignored). */
export function writeCaptionsPreference(
  storage: CaptionsStorage | null | undefined,
  track: MediaTrack | null,
): void {
  try {
    storage?.setItem(MEDIA_CAPTIONS_STORAGE_KEY, captionsPreference(track));
  } catch {
    // Private mode, quota, sandboxed frame: the choice is not remembered.
  }
}

/**
 * Track the captions key (C) switches to: off when one is shown, else the
 * last used one (`previous`), else the first track. `null` without tracks.
 */
export function toggledCaptionsTrack(
  tracks: readonly MediaTrack[],
  current: number,
  previous: number,
): number | null {
  if (tracks.length === 0) return null;
  if (current >= 0) return -1;
  return previous >= 0 && previous < tracks.length ? previous : 0;
}
