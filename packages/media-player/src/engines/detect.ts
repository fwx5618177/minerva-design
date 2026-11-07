/**
 * 播放源格式推断与清晰度选择（纯函数，便于测试）。
 * 顺序：显式 type → MIME → 地址扩展名（忽略查询串 / 片段，不区分大小写）→ 地址里的常见提示
 * （例如 `format=m3u8`）→ 原生。格式表见 formats.ts。
 */
import {
  AUTO_QUALITY,
  type MediaQuality,
  type MediaSourceType,
  type PlayerSource,
} from "./types.js";
import {
  EXTENSION_FORMATS,
  extensionOfUrl,
  formatOfMime,
  isWebSocketUrl,
  type ResolvedSourceType,
} from "./formats.js";

export { extensionOfUrl, type ResolvedSourceType };

/** 推断格式；推断不出来时为 mp4（交给原生 `<video>`） */
export function detectSourceType(
  url: string,
  type: MediaSourceType = "auto",
  mimeType?: string,
): ResolvedSourceType {
  if (type !== "auto") return type;
  const fromMime = formatOfMime(mimeType);
  if (fromMime) return fromMime;
  // blob: / data: 地址没有扩展名可看：data: 读自身的 MIME，其余交给原生（读到元数据后再判断有无画面）
  if (/^data:/i.test(url))
    return formatOfMime(/^data:([^;,]*)/i.exec(url)?.[1]) ?? "mp4";
  if (/^blob:/i.test(url)) return "mp4";
  const ext = extensionOfUrl(url);
  const entry = EXTENSION_FORMATS[ext];
  if (entry) return entry.type;
  if (/[?&](format|type|ext)=m3u8\b/i.test(url) || /\.m3u8\b/i.test(url))
    return "hls";
  if (/[?&](format|type|ext)=(mpd|dash)\b/i.test(url) || /\.mpd\b/i.test(url))
    return "dash";
  if (/[?&](format|type|ext)=flv\b/i.test(url) || /\.flv\b/i.test(url))
    return "flv";
  // WebSocket 推流一般是 FLV（mpegts.js 的 WebSocket-FLV）
  if (isWebSocketUrl(url)) return "flv";
  return "mp4";
}

/** 字符串或描述 → 统一的描述 */
export function normalizeSource(src: string | PlayerSource): PlayerSource {
  return typeof src === "string" ? { src } : src;
}

/** 描述里的清晰度（按高度从高到低；没有高度的保持原顺序排在后面） */
export function sortedQualities(source: PlayerSource): MediaQuality[] {
  const list = source.qualities?.filter((item) => item && item.src) ?? [];
  return list
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const ha = a.item.height ?? -1;
      const hb = b.item.height ?? -1;
      return ha === hb ? a.index - b.index : hb - ha;
    })
    .map(({ item }) => item);
}

/** 初始清晰度 id：defaultQuality 存在时用它，否则用列表第一个；没有多清晰度时为 auto */
export function initialQualityId(source: PlayerSource): string {
  const list = source.qualities ?? [];
  if (list.length === 0) return AUTO_QUALITY;
  if (
    source.defaultQuality &&
    list.some((item) => item.id === source.defaultQuality)
  ) {
    return source.defaultQuality;
  }
  return list[0].id;
}

/** 当前清晰度对应的地址与格式（多清晰度时取对应条目，否则用 src） */
export function resolvePlayback(
  source: PlayerSource,
  qualityId: string,
): { url: string; type: ResolvedSourceType } {
  const quality = source.qualities?.find((item) => item.id === qualityId);
  const url = quality?.src ?? source.src;
  const declared = quality?.type ?? source.type ?? "auto";
  return {
    url,
    type: detectSourceType(
      url,
      declared,
      quality ? undefined : source.mimeType,
    ),
  };
}

/** 清晰度显示名：有高度时为 1080p，否则用码率（kbps），都没有时为「档位 N」 */
export function levelLabel(
  height: number | undefined,
  bitrate: number | undefined,
  index: number,
) {
  if (height && height > 0) return `${height}p`;
  if (bitrate && bitrate > 0) return `${Math.round(bitrate / 1000)} kbps`;
  return `档位 ${index + 1}`;
}
