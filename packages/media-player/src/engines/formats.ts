/**
 * 主流媒体格式表（纯数据 + 纯函数）：扩展名 / MIME → 播放格式、探测用的 MIME、是否只有声音。
 * 格式推断（detect.ts）、能力矩阵（capabilities.ts）与音频界面判断共用这一张表。
 */
import type { MediaSourceType } from "./types.js";

export type ResolvedSourceType = Exclude<MediaSourceType, "auto">;

export interface FormatEntry {
  type: ResolvedSourceType;
  /** 探测（canPlayType）用的 MIME */
  mime: string;
  /** 只有声音（显示音频界面） */
  audio?: boolean;
}

/** 扩展名（小写）→ 格式 */
export const EXTENSION_FORMATS: Readonly<Record<string, FormatEntry>> = {
  // 自适应流 / 直播
  m3u8: { type: "hls", mime: "application/vnd.apple.mpegurl" },
  m3u: { type: "hls", mime: "application/vnd.apple.mpegurl" },
  mpd: { type: "dash", mime: "application/dash+xml" },
  flv: { type: "flv", mime: "video/x-flv" },
  ts: { type: "mpegts", mime: "video/mp2t" },
  m2ts: { type: "mpegts", mime: "video/mp2t" },
  mts: { type: "mpegts", mime: "video/mp2t" },
  // 渐进式视频
  mp4: { type: "mp4", mime: "video/mp4" },
  m4v: { type: "mp4", mime: "video/mp4" },
  mov: { type: "mov", mime: "video/quicktime" },
  webm: { type: "webm", mime: "video/webm" },
  ogv: { type: "ogg", mime: "video/ogg" },
  mkv: { type: "mkv", mime: "video/x-matroska" },
  // 纯音频
  mp3: { type: "audio", mime: "audio/mpeg", audio: true },
  aac: { type: "audio", mime: "audio/aac", audio: true },
  m4a: { type: "audio", mime: "audio/mp4", audio: true },
  m4b: { type: "audio", mime: "audio/mp4", audio: true },
  ogg: { type: "audio", mime: "audio/ogg", audio: true },
  oga: { type: "audio", mime: "audio/ogg", audio: true },
  opus: { type: "audio", mime: 'audio/ogg; codecs="opus"', audio: true },
  weba: { type: "audio", mime: "audio/webm", audio: true },
  wav: { type: "audio", mime: "audio/wav", audio: true },
  flac: { type: "audio", mime: "audio/flac", audio: true },
  // 浏览器普遍解不了的音频：仍按音频识别，canPlay / 错误提示给出转码建议
  amr: { type: "audio", mime: "audio/amr", audio: true },
  awb: { type: "audio", mime: "audio/amr-wb", audio: true },
  wma: { type: "audio", mime: "audio/x-ms-wma", audio: true },
  aif: { type: "audio", mime: "audio/aiff", audio: true },
  aiff: { type: "audio", mime: "audio/aiff", audio: true },
  caf: { type: "audio", mime: "audio/x-caf", audio: true },
  ape: { type: "audio", mime: "audio/ape", audio: true },
  ac3: { type: "audio", mime: "audio/ac3", audio: true },
  mka: { type: "audio", mime: "audio/x-matroska", audio: true },
};

/** MIME（不含参数，小写比较）→ 格式；顺序有意义：HLS 的 audio/mpegurl 要先于 audio/* */
const MIME_FORMATS: Array<[RegExp, ResolvedSourceType]> = [
  [/^(application|audio)\/(x-)?mpegurl$/i, "hls"],
  [/^application\/vnd\.apple\.mpegurl$/i, "hls"],
  [/^application\/dash\+xml$/i, "dash"],
  [/^video\/(x-)?flv$/i, "flv"],
  [/^video\/mp2t$/i, "mpegts"],
  [/^video\/webm$/i, "webm"],
  [/^video\/quicktime$/i, "mov"],
  [/^video\/(x-)?m4v$/i, "mp4"],
  [/^video\/mp4$/i, "mp4"],
  [/^(video|application)\/ogg$/i, "ogg"],
  [/^video\/(x-)?matroska$/i, "mkv"],
  [/^audio\//i, "audio"],
];

/** MIME 去掉参数（`video/mp4; codecs=...` → `video/mp4`） */
export function baseMime(mimeType: string | undefined): string {
  return (mimeType?.split(";")[0] ?? "").trim().toLowerCase();
}

/** MIME → 格式；不认识时为 null */
export function formatOfMime(
  mimeType: string | undefined,
): ResolvedSourceType | null {
  const mime = baseMime(mimeType);
  if (!mime) return null;
  for (const [pattern, type] of MIME_FORMATS) {
    if (pattern.test(mime)) return type;
  }
  return null;
}

/** 只取路径部分的扩展名（去掉查询串、片段），小写 */
export function extensionOfUrl(url: string): string {
  const path = url.split(/[?#]/)[0] ?? "";
  const name = path.split("/").pop() ?? "";
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
}

/** 浏览器里不能直接播放的推流 / 传输协议（需要服务端网关转成 HLS / FLV / WebRTC） */
const GATEWAY_PROTOCOLS = [
  "rtmp",
  "rtmps",
  "rtmpt",
  "rtsp",
  "rtsps",
  "srt",
  "udp",
  "rtp",
  "mms",
];

/** 地址是浏览器无法直接播放的协议时返回协议名（小写），否则 null */
export function unsupportedProtocol(url: string): string | null {
  const match = /^([a-z][a-z0-9+.-]*):/i.exec(url.trim());
  const protocol = match?.[1]?.toLowerCase();
  return protocol && GATEWAY_PROTOCOLS.includes(protocol) ? protocol : null;
}

/** 不支持协议的说明（给人看） */
export function protocolHint(protocol: string): string {
  return (
    `浏览器无法直接播放 ${protocol.toUpperCase()} 地址：` +
    "请在服务端用网关（例如 SRS / nginx-rtmp / MediaMTX / FFmpeg）转成 HLS（.m3u8）、HTTP-FLV 或 WebRTC 再播放"
  );
}

/** WebSocket 地址（ws / wss）：mpegts.js 的 WebSocket-FLV 直播 */
export function isWebSocketUrl(url: string): boolean {
  return /^wss?:\/\//i.test(url.trim());
}

/** 用于能力探测的 MIME：显式 MIME 优先（可带 codecs），其次扩展名，最后按格式给默认值 */
export function probeMimeFor(
  url: string,
  type: ResolvedSourceType,
  mimeType?: string,
): string | null {
  if (mimeType && formatOfMime(mimeType) === type) return mimeType;
  const dataMime = /^data:([^;,]+)/i.exec(url)?.[1];
  if (dataMime && formatOfMime(dataMime) === type) return dataMime;
  const entry = EXTENSION_FORMATS[extensionOfUrl(url)];
  if (entry && entry.type === type) return entry.mime;
  return DEFAULT_MIME[type] ?? null;
}

const DEFAULT_MIME: Partial<Record<ResolvedSourceType, string>> = {
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  ogg: "video/ogg",
  mkv: "video/x-matroska",
  hls: "application/vnd.apple.mpegurl",
  dash: "application/dash+xml",
  flv: "video/x-flv",
  mpegts: "video/mp2t",
};

/**
 * 是否只有声音（决定一开始显示音频界面）：显式 audioOnly → MIME 为 audio/*（HLS 的 audio/mpegurl 除外）
 * → 扩展名为纯音频。读到元数据后以实际画面尺寸为准（见 VideoPlayer）。
 */
export function isAudioSource(input: {
  url: string;
  type?: MediaSourceType;
  mimeType?: string;
  audioOnly?: boolean;
}): boolean {
  if (typeof input.audioOnly === "boolean") return input.audioOnly;
  if (input.type === "audio") return true;
  const mimeFormat =
    formatOfMime(input.mimeType) ??
    formatOfMime(/^data:([^;,]+)/i.exec(input.url)?.[1]);
  if (mimeFormat) return mimeFormat === "audio";
  if (input.type && input.type !== "auto") return false;
  return EXTENSION_FORMATS[extensionOfUrl(input.url)]?.audio === true;
}
