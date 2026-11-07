/**
 * HLS 引擎：hls.js（可选依赖，用到 .m3u8 时才动态加载）。
 * - 支持 MSE 的浏览器用 hls.js：提供清晰度档位与自适应码率（auto）
 * - 没有安装 hls.js 或不支持 MSE（例如 iOS Safari）时，浏览器能原生播放 HLS 就退回原生
 * - 致命错误：网络错误重新加载、媒体错误尝试恢复，各最多 2 次，仍失败才报告
 */
import { attachNative, canPlayNatively, unsupportedError } from "./native.js";
import { loadOptionalModule, type ModuleLoader } from "./optional-module.js";
import { levelLabel } from "./detect.js";
import {
  AUTO_QUALITY,
  PlayerError,
  type EngineLevel,
  type MediaEngine,
  type MediaEngineFactory,
} from "./types.js";

/** 本包用到的 hls.js 最小接口（不直接依赖 hls.js 的类型，未安装时也能编译） */
export interface HlsLevelLike {
  height?: number;
  bitrate?: number;
  name?: string;
}

export interface HlsErrorData {
  fatal?: boolean;
  type?: string;
  details?: string;
}

export interface HlsInstanceLike {
  loadSource(url: string): void;
  attachMedia(media: HTMLMediaElement): void;
  on(event: string, listener: (event: string, data: unknown) => void): void;
  startLoad(startPosition?: number): void;
  recoverMediaError(): void;
  destroy(): void;
  readonly levels: HlsLevelLike[];
  currentLevel: number;
  readonly autoLevelEnabled?: boolean;
}

export interface HlsConstructorLike {
  new (config?: Record<string, unknown>): HlsInstanceLike;
  isSupported(): boolean;
  readonly Events: {
    MANIFEST_PARSED: string;
    ERROR: string;
    LEVEL_SWITCHED?: string;
  };
  readonly ErrorTypes: { NETWORK_ERROR: string; MEDIA_ERROR: string };
}

export interface HlsEngineOptions {
  /** 自定义加载方式，默认 `() => import('hls.js')` */
  load?: ModuleLoader;
  /** 传给 `new Hls(config)` 的配置 */
  config?: Record<string, unknown>;
  /** 浏览器能原生播放 HLS 时优先用原生（默认 false：有 hls.js 时用 hls.js，以便切换清晰度） */
  preferNative?: boolean;
}

const MAX_RECOVERIES = 2;

function pickHls(mod: unknown): HlsConstructorLike | null {
  if (typeof mod !== "function") return null;
  const candidate = mod as Partial<HlsConstructorLike>;
  if (typeof candidate.isSupported !== "function" || !candidate.Events)
    return null;
  return mod as HlsConstructorLike;
}

export const loadHlsModule: ModuleLoader = () => import("hls.js");

/** HLS 档位 → 清晰度列表（id 为档位下标） */
export function hlsLevels(levels: HlsLevelLike[]): EngineLevel[] {
  return levels.map((level, index) => ({
    id: String(index),
    label: level.name?.trim() || levelLabel(level.height, level.bitrate, index),
    height: level.height,
    bitrate: level.bitrate,
  }));
}

export function attachHls(
  Hls: HlsConstructorLike,
  video: HTMLVideoElement,
  url: string,
  callbacks: {
    onLevels?: (levels: EngineLevel[]) => void;
    onError?: (error: PlayerError) => void;
  },
  config?: Record<string, unknown>,
): MediaEngine {
  const hls = new Hls(config);
  let destroyed = false;
  let networkRetries = 0;
  let mediaRetries = 0;
  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    hls.destroy();
  };
  try {
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (!destroyed) callbacks.onLevels?.(hlsLevels(hls.levels ?? []));
    });
    hls.on(Hls.Events.ERROR, (_event, raw) => {
      const data = (raw ?? {}) as HlsErrorData;
      if (destroyed || !data.fatal) return;
      if (
        data.type === Hls.ErrorTypes.NETWORK_ERROR &&
        networkRetries < MAX_RECOVERIES
      ) {
        networkRetries += 1;
        hls.startLoad();
        return;
      }
      if (
        data.type === Hls.ErrorTypes.MEDIA_ERROR &&
        mediaRetries < MAX_RECOVERIES
      ) {
        mediaRetries += 1;
        hls.recoverMediaError();
        return;
      }
      const code =
        data.type === Hls.ErrorTypes.NETWORK_ERROR ? "network" : "media";
      callbacks.onError?.(
        new PlayerError(
          code,
          `HLS 播放失败${data.details ? `（${data.details}）` : ""}`,
        ),
      );
    });
    hls.loadSource(url);
    hls.attachMedia(video);
  } catch (error) {
    try {
      destroy();
    } catch {
      /* Preserve the initialization error. */
    }
    throw error;
  }
  return {
    kind: "hls",
    levels: () => hlsLevels(hls.levels ?? []),
    currentLevel: () =>
      hls.autoLevelEnabled === false && hls.currentLevel >= 0
        ? String(hls.currentLevel)
        : AUTO_QUALITY,
    setLevel: (id) => {
      // 设置 currentLevel 会立即切换并保持当前播放位置；-1 为自适应
      const index = id === AUTO_QUALITY ? -1 : Number(id);
      if (
        !destroyed &&
        Number.isInteger(index) &&
        index >= -1 &&
        index < hls.levels.length
      )
        hls.currentLevel = index;
    },
    destroy,
  };
}

/** 创建 HLS 引擎工厂 */
export function createHlsEngine(
  options: HlsEngineOptions = {},
): MediaEngineFactory {
  const load = options.load ?? loadHlsModule;
  return {
    kind: "hls",
    handles: (type) => type === "hls",
    attach: async (video, { url, onLevels, onError, signal }) => {
      signal?.throwIfAborted();
      const native = canPlayNatively(video, "hls");
      if (options.preferNative && native) return attachNative(video, url);
      let Hls: HlsConstructorLike;
      try {
        Hls = await loadOptionalModule(load, pickHls, "hls.js", signal);
      } catch (error) {
        signal?.throwIfAborted();
        if (native) return attachNative(video, url);
        throw error;
      }
      if (!Hls.isSupported()) {
        if (native) return attachNative(video, url);
        throw unsupportedError("hls");
      }
      return attachHls(Hls, video, url, { onLevels, onError }, options.config);
    },
  };
}
