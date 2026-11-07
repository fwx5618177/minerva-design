/**
 * DASH 引擎：dash.js（可选依赖，用到 .mpd 时才动态加载）。
 * - 通过 MSE 播放 MPEG-DASH（点播与直播，直播由清单的 `type="dynamic"` 自动判断）
 * - 清晰度：视频码率档位（没有视频时为音频档位）+「自动」（自适应码率 ABR）
 * - 同时兼容 dash.js v5（`getRepresentationsByType`）与 v4（`getBitrateInfoListFor`）的接口
 * - 错误按 dash.js 的错误码映射为 network / media / unsupported
 */
import { levelLabel } from "./detect.js";
import { unsupportedError } from "./native.js";
import { loadOptionalModule, type ModuleLoader } from "./optional-module.js";
import {
  AUTO_QUALITY,
  PlayerError,
  type EngineLevel,
  type MediaEngine,
  type MediaEngineFactory,
} from "./types.js";

type DashMediaType = "video" | "audio";

/** 一个码率档位（v5 Representation / v4 BitrateInfo 的公共部分） */
export interface DashRepresentationLike {
  /** v5 Representation 的 id（按 id 切换最准确） */
  id?: string;
  height?: number;
  bandwidth?: number;
  /** v4 BitrateInfo */
  bitrate?: number;
}

/** 本包用到的 dash.js 播放器最小接口（不直接依赖 dash.js 的类型，未安装时也能编译） */
export interface DashPlayerLike {
  initialize(view?: HTMLMediaElement, url?: string, autoPlay?: boolean): void;
  on(type: string, listener: (event: unknown) => void): void;
  updateSettings(settings: Record<string, unknown>): void;
  reset(): void;
  destroy?(): void;
  /** v5 */
  getRepresentationsByType?(type: DashMediaType): DashRepresentationLike[];
  setRepresentationForTypeById?(
    type: DashMediaType,
    id: string,
    force?: boolean,
  ): void;
  setRepresentationForTypeByIndex?(
    type: DashMediaType,
    index: number,
    force?: boolean,
  ): void;
  /** v4 */
  getBitrateInfoListFor?(type: DashMediaType): DashRepresentationLike[];
  setQualityFor?(type: DashMediaType, index: number, force?: boolean): void;
}

export interface DashMediaPlayerFactoryLike {
  (): { create(): DashPlayerLike };
  readonly events?: { STREAM_INITIALIZED?: string; ERROR?: string };
}

export interface DashModuleLike {
  MediaPlayer: DashMediaPlayerFactoryLike;
  supportsMediaSource?: () => boolean;
}

export interface DashEngineOptions {
  /** 自定义加载方式，默认 `() => import('dashjs')` */
  load?: ModuleLoader;
  /** 传给 `player.updateSettings(settings)` 的配置（例如 `{ streaming: { delay: { liveDelay: 4 } } }`） */
  settings?: Record<string, unknown>;
}

function pickDash(mod: unknown): DashModuleLike | null {
  if (!mod || (typeof mod !== "object" && typeof mod !== "function"))
    return null;
  const candidate = mod as Partial<DashModuleLike>;
  return typeof candidate.MediaPlayer === "function"
    ? (mod as DashModuleLike)
    : null;
}

export const loadDashModule: ModuleLoader = () => import("dashjs");

/** dash.js 的错误事件 → PlayerError（v5：`{ error: { code, message } }`；v4 旧格式：`{ error: 'download' }`） */
export function dashError(raw: unknown): PlayerError {
  const payload = (raw ?? {}) as { error?: unknown };
  const inner = payload.error;
  const detail =
    inner && typeof inner === "object"
      ? (inner as { code?: unknown; message?: unknown })
      : {};
  const code = typeof detail.code === "number" ? detail.code : null;
  const message = typeof detail.message === "string" ? detail.message : "";
  const suffix = message
    ? `（${message}）`
    : code !== null
      ? `（错误码 ${code}）`
      : "";
  if (code === 23)
    return new PlayerError(
      "unsupported",
      `当前浏览器不支持 DASH 所需的 MSE${suffix}`,
    );
  if (code === 24 || (code !== null && code >= 100)) {
    return new PlayerError(
      "unsupported",
      `DASH 加密内容无法播放（DRM）${suffix}`,
    );
  }
  // 清单 / 分片 / 时间同步 / 地址解析：11–19（10 是清单解析失败，属于内容问题）
  const network =
    (code !== null && code >= 11 && code <= 19) ||
    (typeof inner === "string" && /download|manifest/i.test(inner));
  return new PlayerError(
    network ? "network" : "media",
    `DASH 播放失败${suffix}`,
  );
}

/** 当前可选的档位：优先视频，没有视频时用音频（纯音频 DASH） */
function representations(player: DashPlayerLike): {
  type: DashMediaType;
  list: DashRepresentationLike[];
} {
  const read = (type: DashMediaType) => {
    try {
      return (
        player.getRepresentationsByType?.(type) ??
        player.getBitrateInfoListFor?.(type) ??
        []
      );
    } catch {
      return [];
    }
  };
  const video = read("video");
  return video.length > 0
    ? { type: "video", list: video }
    : { type: "audio", list: read("audio") };
}

/** DASH 档位 → 清晰度列表（id 为档位下标） */
export function dashLevels(
  list: readonly DashRepresentationLike[],
): EngineLevel[] {
  return list.map((item, index) => {
    const bitrate = item.bandwidth ?? item.bitrate;
    return {
      id: String(index),
      label: levelLabel(item.height, bitrate, index),
      height: item.height,
      bitrate,
    };
  });
}

export function attachDash(
  dashjs: DashModuleLike,
  video: HTMLVideoElement,
  url: string,
  callbacks: {
    onLevels?: (levels: EngineLevel[]) => void;
    onError?: (error: PlayerError) => void;
  },
  settings?: Record<string, unknown>,
): MediaEngine {
  const player = dashjs.MediaPlayer().create();
  const events = dashjs.MediaPlayer.events ?? {};
  let destroyed = false;
  let manual: string | null = null;
  const abr = (type: DashMediaType, auto: boolean) =>
    player.updateSettings({
      streaming: { abr: { autoSwitchBitrate: { [type]: auto } } },
    });

  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    if (player.destroy) player.destroy();
    else player.reset();
  };
  try {
    player.on(events.STREAM_INITIALIZED ?? "streamInitialized", () => {
      if (!destroyed)
        callbacks.onLevels?.(dashLevels(representations(player).list));
    });
    player.on(events.ERROR ?? "error", (raw) => {
      if (!destroyed) callbacks.onError?.(dashError(raw));
    });
    if (settings) player.updateSettings(settings);
    // 自动播放跟随 video 的 autoplay（播放器负责静音起播）
    player.initialize(video, url, video.autoplay);
  } catch (error) {
    try {
      destroy();
    } catch {
      /* Preserve the initialization error. */
    }
    throw error;
  }
  return {
    kind: "dash",
    levels: () => dashLevels(representations(player).list),
    currentLevel: () => manual ?? AUTO_QUALITY,
    setLevel: (id) => {
      const { type, list } = representations(player);
      if (id === AUTO_QUALITY) {
        manual = null;
        abr(type, true);
        return;
      }
      const index = Number(id);
      if (!Number.isInteger(index) || index < 0 || index >= list.length) return;
      manual = id;
      abr(type, false);
      const target = list[index];
      try {
        if (target.id && player.setRepresentationForTypeById) {
          player.setRepresentationForTypeById(type, target.id, true);
        } else if (player.setRepresentationForTypeByIndex) {
          player.setRepresentationForTypeByIndex(type, index, true);
        } else {
          player.setQualityFor?.(type, index, true);
        }
      } catch {
        // 流还没初始化完：保持手动档位，ABR 已关闭
      }
    },
    destroy: () => {
      try {
        destroy();
      } catch {
        /* The host may already have released it. */
      }
    },
  };
}

/** 创建 DASH 引擎工厂 */
export function createDashEngine(
  options: DashEngineOptions = {},
): MediaEngineFactory {
  const load = options.load ?? loadDashModule;
  return {
    kind: "dash",
    handles: (type) => type === "dash",
    attach: async (video, { url, onLevels, onError, signal }) => {
      signal?.throwIfAborted();
      const dashjs = await loadOptionalModule(load, pickDash, "dashjs", signal);
      if (dashjs.supportsMediaSource && !dashjs.supportsMediaSource()) {
        throw unsupportedError("dash");
      }
      return attachDash(
        dashjs,
        video,
        url,
        { onLevels, onError },
        options.settings,
      );
    },
  };
}
