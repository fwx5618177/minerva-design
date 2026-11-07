/**
 * 播放源与播放引擎（可插拔）的类型。
 *
 * - 播放源 `PlayerSource`：一个地址，或带多个清晰度的描述
 * - 引擎 `MediaEngineFactory`：把某种格式接到 `<video>` 上（原生 / hls.js / dash.js / mpegts.js / 使用方自定义）
 */

/**
 * 播放源格式；`auto` 表示按地址 / 扩展名 / MIME 推断。
 * - 渐进式（原生）：mp4（含 m4v）/ webm / mov / ogg（ogv）/ mkv（尝试原生）/ audio（mp3 / aac / m4a / ogg / opus / wav / flac）
 * - 流媒体：hls（hls.js）/ dash（dash.js）/ flv、mpegts（mpegts.js）
 */
export type MediaSourceType =
  | "mp4"
  | "webm"
  | "mov"
  | "ogg"
  | "mkv"
  | "audio"
  | "hls"
  | "flv"
  | "mpegts"
  | "dash"
  | "auto";

/** 一个清晰度（多地址清晰度切换） */
export interface MediaQuality {
  id: string;
  label: string;
  src: string;
  /** 画面高度（px），用于排序与默认选择 */
  height?: number;
  /** 码率（bit/s） */
  bitrate?: number;
  /** 这个清晰度的格式；省略时沿用播放源的 type */
  type?: MediaSourceType;
}

/** 播放源描述 */
export interface PlayerSource {
  src: string;
  type?: MediaSourceType;
  /** MIME（例如 `application/x-mpegURL`），可帮助推断格式 */
  mimeType?: string;
  /** 多个清晰度；有它时 `src` 只作为默认清晰度缺失时的兜底 */
  qualities?: MediaQuality[];
  /** 默认清晰度 id（省略时选列表中第一个） */
  defaultQuality?: string;
  /** 直播流（mpegts.js 用；HLS / DASH 由清单自动判断）。ws / wss 地址默认按直播处理 */
  isLive?: boolean;
  /** 只有声音（显示音频界面）；省略时按 MIME / 扩展名判断，读到元数据后以有没有画面为准 */
  audioOnly?: boolean;
}

/** 引擎内部的清晰度（例如 HLS 的码率档位） */
export interface EngineLevel {
  id: string;
  label: string;
  height?: number;
  bitrate?: number;
}

/** 自动清晰度（HLS / DASH 自适应码率） */
export const AUTO_QUALITY = "auto";

export type PlayerErrorCode =
  | "engine-missing"
  | "unsupported"
  | "network"
  | "decode"
  | "media"
  | "tainted"
  | "not-ready"
  | "unknown";

/** 播放器错误：code 供程序判断，message 给人看 */
export class PlayerError extends Error {
  readonly code: PlayerErrorCode;
  constructor(code: PlayerErrorCode, message: string) {
    super(message);
    this.name = "PlayerError";
    this.code = code;
  }
}

/** 一个已经接到 `<video>` 上的引擎实例 */
export interface MediaEngine {
  readonly kind: string;
  /** 引擎提供的清晰度（HLS / DASH 档位）；没有时为空 */
  levels(): EngineLevel[];
  /** 当前清晰度 id，自适应时为 `auto` */
  currentLevel(): string;
  /** 切换清晰度（`auto` 表示自适应） */
  setLevel(id: string): void;
  /** 释放资源（换片 / 卸载时调用），之后不会再回调 */
  destroy(): void;
}

export interface EngineCallbacks {
  /** 清晰度列表变化（例如 HLS / DASH 清单解析完成） */
  onLevels?: (levels: EngineLevel[]) => void;
  /** 无法恢复的错误 */
  onError?: (error: PlayerError) => void;
}

export interface EngineAttachOptions extends EngineCallbacks {
  /** Cancel a pending engine import before it can attach to a reused media element. */
  signal?: AbortSignal;
  source: PlayerSource;
  /** 实际要播放的地址（已按清晰度选好） */
  url: string;
  /** 已解析的格式（不会是 auto） */
  type: Exclude<MediaSourceType, "auto">;
}

/** 引擎工厂：判断能否处理某种格式，并把地址接到 `<video>` 上 */
export interface MediaEngineFactory {
  readonly kind: string;
  /** 是否处理这种格式（只看格式，不加载依赖） */
  handles(type: Exclude<MediaSourceType, "auto">): boolean;
  /** 接到 video 上；可能需要动态加载依赖，因此可以是异步的 */
  attach(
    video: HTMLVideoElement,
    options: EngineAttachOptions,
  ): MediaEngine | Promise<MediaEngine>;
}

/** 任意错误 → PlayerError */
export function toPlayerError(error: unknown, fallback: string): PlayerError {
  if (error instanceof PlayerError) return error;
  const message =
    error instanceof Error && error.message ? error.message : fallback;
  return new PlayerError("unknown", message);
}

/** 播放（忽略自动播放策略等导致的拒绝） */
export function safePlay(video: HTMLVideoElement): Promise<void> {
  const result = video.play() as Promise<void> | undefined;
  if (result && typeof result.catch === "function")
    return result.catch(() => undefined);
  return Promise.resolve();
}
