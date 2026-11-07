/**
 * 播放源 → 引擎的生命周期：换片 / 换清晰度 / 重试时销毁旧引擎再接新引擎，卸载时销毁。
 * 清晰度两种来源：
 * - 播放源的 `qualities`（多个地址）：切换时换地址，并在新地址读到元数据后回到原来的位置与播放状态
 * - 引擎自带的档位（HLS / DASH）：交给引擎切换（引擎自己保持位置），额外提供「自动」
 * 浏览器不能直接播放的协议（RTMP / RTSP 等）不选引擎，直接报错并说明需要服务端网关。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  initialQualityId,
  levelLabel,
  normalizeSource,
  resolvePlayback,
  sortedQualities,
} from "./engines/detect.js";
import {
  defaultEngines,
  selectEngine,
  unsupportedError,
} from "./engines/index.js";
import {
  isAudioSource,
  protocolHint,
  unsupportedProtocol,
} from "./engines/formats.js";
import {
  AUTO_QUALITY,
  PlayerError,
  type EngineLevel,
  type MediaEngine,
  type MediaEngineFactory,
  type PlayerSource,
} from "./engines/types.js";

export interface QualityOption {
  id: string;
  label: string;
}

export interface ResumeState {
  time: number;
  playing: boolean;
}

/** 播放源的稳定标识：对象每次渲染重新创建也不会导致重新加载 */
export function sourceKeyOf(src: string | PlayerSource): string {
  return typeof src === "string" ? `s:${src}` : `o:${JSON.stringify(src)}`;
}

/** sourceKeyOf 的逆运算 */
export function sourceFromKey(key: string): PlayerSource {
  if (key.startsWith("o:")) {
    try {
      return normalizeSource(JSON.parse(key.slice(2)) as PlayerSource);
    } catch {
      return { src: "" };
    }
  }
  return { src: key.startsWith("s:") ? key.slice(2) : key };
}

/** 清晰度选项：多地址优先；否则引擎档位（多于一个时）+ 自动 */
export function qualityOptionsFor(
  source: PlayerSource,
  levels: EngineLevel[],
): QualityOption[] {
  const list = sortedQualities(source);
  if (list.length > 0) {
    return list.map((item, index) => ({
      id: item.id,
      label: item.label || levelLabel(item.height, item.bitrate, index),
    }));
  }
  if (levels.length <= 1) return [];
  const sorted = [...levels].sort((a, b) => (b.height ?? 0) - (a.height ?? 0));
  return [
    { id: AUTO_QUALITY, label: "自动" },
    ...sorted.map(({ id, label }) => ({ id, label })),
  ];
}

interface UseMediaEngineOptions {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** Native audio/video hosts can change without changing the source. */
  hostKey?: string;
  src: string | PlayerSource;
  engines?: readonly MediaEngineFactory[];
  onError: (error: PlayerError) => void;
  /** 引擎接好之后（例如重新设置播放速度） */
  onAttached?: (engine: MediaEngine) => void;
}

export function useMediaEngine({
  videoRef,
  hostKey = "video",
  src,
  engines,
  onError,
  onAttached,
}: UseMediaEngineOptions) {
  const sourceKey = sourceKeyOf(src);
  const source = useMemo(() => sourceFromKey(sourceKey), [sourceKey]);
  // 清晰度按播放源记录：换片后自动回到新播放源的默认清晰度
  const [picked, setPicked] = useState<{ key: string; id: string } | null>(
    null,
  );
  const quality =
    picked?.key === sourceKey ? picked.id : initialQualityId(source);
  const [levels, setLevels] = useState<EngineLevel[]>([]);
  const [nonce, setNonce] = useState(0);
  const [engineKind, setEngineKind] = useState<string | null>(null);
  const engineRef = useRef<MediaEngine | null>(null);
  const resumeRef = useRef<ResumeState | null>(null);
  const enginesRef = useRef(engines);
  enginesRef.current = engines;
  const errorRef = useRef(onError);
  errorRef.current = onError;
  const attachedRef = useRef(onAttached);
  attachedRef.current = onAttached;

  // 换片：丢弃上一个播放源待恢复的位置
  useEffect(() => {
    resumeRef.current = null;
  }, [sourceKey]);

  const hasQualities = (source.qualities?.length ?? 0) > 0;
  const playback = resolvePlayback(
    source,
    hasQualities ? quality : AUTO_QUALITY,
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!playback.url) return;
    let cancelled = false;
    const controller = new AbortController();
    const protocol = unsupportedProtocol(playback.url);
    const factory = protocol
      ? null
      : selectEngine(
          playback.type,
          enginesRef.current ?? defaultEngines(),
          video,
        );
    if (!factory) {
      const error = protocol
        ? new PlayerError("unsupported", protocolHint(protocol))
        : unsupportedError(playback.type);
      // 推迟到本轮副作用之后报告：播放器换片时的重置（清空错误）不会把它冲掉
      void Promise.resolve().then(() => {
        if (!cancelled) errorRef.current(error);
      });
      return () => {
        cancelled = true;
      };
    }
    const adopt = (engine: MediaEngine) => {
      if (cancelled) {
        engine.destroy();
        return;
      }
      engineRef.current = engine;
      setEngineKind(engine.kind);
      attachedRef.current?.(engine);
    };
    const fail = (error: unknown) => {
      if (cancelled) return;
      errorRef.current(
        error instanceof PlayerError
          ? error
          : new PlayerError(
              "unknown",
              error instanceof Error ? error.message : String(error),
            ),
      );
    };
    try {
      const result = factory.attach(video, {
        signal: controller.signal,
        source,
        url: playback.url,
        type: playback.type,
        onLevels: (next) => {
          if (!cancelled) setLevels(next);
        },
        onError: fail,
      });
      if (
        result &&
        typeof (result as Promise<MediaEngine>).then === "function"
      ) {
        (result as Promise<MediaEngine>).then(adopt, fail);
      } else {
        adopt(result as MediaEngine);
      }
    } catch (error) {
      fail(error);
    }
    return () => {
      cancelled = true;
      controller.abort();
      // A different DOM host needs the same playback position after attachment.
      // The source-key effect clears this resume when the URL changes as well.
      if (videoRef.current !== video) {
        resumeRef.current = { time: video.currentTime, playing: !video.paused };
      }
      engineRef.current?.destroy();
      engineRef.current = null;
      setLevels([]);
      setEngineKind(null);
    };
  }, [videoRef, hostKey, source, playback.url, playback.type, nonce]);

  const options = useMemo(
    () => qualityOptionsFor(source, levels),
    [source, levels],
  );
  // 只有声音的提示（读到元数据前用；之后以有没有画面为准）
  const audioHint = isAudioSource({
    url: playback.url,
    type:
      source.qualities?.find((item) => item.id === quality)?.type ??
      source.type,
    mimeType: source.mimeType,
    audioOnly: source.audioOnly,
  });

  /** 切换清晰度；保持当前位置与播放状态 */
  const setQuality = useCallback(
    (id: string) => {
      const video = videoRef.current;
      if (!options.some((option) => option.id === id) || id === quality) return;
      if (hasQualities) {
        if (video)
          resumeRef.current = {
            time: video.currentTime,
            playing: !video.paused,
          };
      } else {
        engineRef.current?.setLevel(id);
      }
      setPicked({ key: sourceKey, id });
    },
    [videoRef, options, quality, hasQualities, sourceKey],
  );

  /** 重新加载（错误后重试）：回到出错前的位置 */
  const reload = useCallback(() => {
    const video = videoRef.current;
    if (video && video.currentTime > 0) {
      resumeRef.current = { time: video.currentTime, playing: !video.paused };
    }
    setNonce((value) => value + 1);
  }, [videoRef]);

  /** 读到元数据时取出待恢复的位置（只取一次） */
  const takeResume = useCallback((): ResumeState | null => {
    const value = resumeRef.current;
    resumeRef.current = null;
    return value;
  }, []);

  return {
    source,
    sourceKey,
    quality,
    qualityOptions: options,
    setQuality,
    reload,
    takeResume,
    engineKind,
    playbackType: playback.type,
    playbackUrl: playback.url,
    audioHint,
  };
}
