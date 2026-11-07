/**
 * FLV / MPEG-TS 引擎：mpegts.js（bilibili flv.js 的维护版，可选依赖，用到时才动态加载）。
 * 通过 MSE 把 FLV / TS 转封装为浏览器能播的 fMP4，支持点播与直播（`isLive`：HTTP-FLV / WebSocket-FLV，
 * ws / wss 地址默认按直播处理）。
 */
import { loadOptionalModule, type ModuleLoader } from "./optional-module.js";
import { unsupportedError } from "./native.js";
import { isWebSocketUrl } from "./formats.js";
import {
  PlayerError,
  type MediaEngine,
  type MediaEngineFactory,
} from "./types.js";

/** 本包用到的 mpegts.js 最小接口 */
export interface MpegtsPlayerLike {
  attachMediaElement(media: HTMLMediaElement): void;
  detachMediaElement(): void;
  load(): void;
  unload(): void;
  destroy(): void;
  on(event: string, listener: (...args: unknown[]) => void): void;
}

export interface MpegtsModuleLike {
  isSupported(): boolean;
  createPlayer(
    source: { type: string; url: string; isLive?: boolean; hasAudio?: boolean },
    config?: Record<string, unknown>,
  ): MpegtsPlayerLike;
  readonly Events: { ERROR: string };
  readonly ErrorTypes?: { NETWORK_ERROR?: string; MEDIA_ERROR?: string };
}

export interface FlvEngineOptions {
  /** 自定义加载方式，默认 `() => import('mpegts.js')` */
  load?: ModuleLoader;
  /** 传给 `mpegts.createPlayer(source, config)` 的配置 */
  config?: Record<string, unknown>;
}

function pickMpegts(mod: unknown): MpegtsModuleLike | null {
  if (!mod || (typeof mod !== "object" && typeof mod !== "function"))
    return null;
  const candidate = mod as Partial<MpegtsModuleLike>;
  if (
    typeof candidate.createPlayer !== "function" ||
    typeof candidate.isSupported !== "function"
  ) {
    return null;
  }
  return mod as MpegtsModuleLike;
}

export const loadMpegtsModule: ModuleLoader = () => import("mpegts.js");

export function attachMpegts(
  mpegts: MpegtsModuleLike,
  video: HTMLVideoElement,
  input: { url: string; type: "flv" | "mpegts"; isLive?: boolean },
  onError?: (error: PlayerError) => void,
  config?: Record<string, unknown>,
): MediaEngine {
  const player = mpegts.createPlayer(
    { type: input.type, url: input.url, isLive: input.isLive },
    config,
  );
  let destroyed = false;
  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    // 顺序与 mpegts.js 文档一致；任何一步失败都不影响后续释放
    for (const step of [
      () => player.unload(),
      () => player.detachMediaElement(),
      () => player.destroy(),
    ]) {
      try {
        step();
      } catch {
        // 忽略：已经释放
      }
    }
  };
  try {
    player.on(mpegts.Events.ERROR, (type, detail) => {
      if (destroyed) return;
      const network =
        typeof type === "string" && type === mpegts.ErrorTypes?.NETWORK_ERROR;
      const suffix =
        typeof detail === "string" && detail ? `（${detail}）` : "";
      onError?.(
        new PlayerError(
          network ? "network" : "media",
          `${input.type.toUpperCase()} 播放失败${suffix}`,
        ),
      );
    });
    player.attachMediaElement(video);
    player.load();
  } catch (error) {
    destroy();
    throw error;
  }
  return {
    kind: "flv",
    levels: () => [],
    currentLevel: () => "auto",
    setLevel: () => undefined,
    destroy,
  };
}

/** 创建 FLV / MPEG-TS 引擎工厂 */
export function createFlvEngine(
  options: FlvEngineOptions = {},
): MediaEngineFactory {
  const load = options.load ?? loadMpegtsModule;
  return {
    kind: "flv",
    handles: (type) => type === "flv" || type === "mpegts",
    attach: async (video, { url, type, source, onError, signal }) => {
      signal?.throwIfAborted();
      const mpegts = await loadOptionalModule(
        load,
        pickMpegts,
        "mpegts.js",
        signal,
      );
      if (!mpegts.isSupported()) throw unsupportedError(type);
      return attachMpegts(
        mpegts,
        video,
        {
          url,
          type: type === "flv" ? "flv" : "mpegts",
          isLive: source.isLive ?? (isWebSocketUrl(url) || undefined),
        },
        onError,
        options.config,
      );
    },
  };
}
