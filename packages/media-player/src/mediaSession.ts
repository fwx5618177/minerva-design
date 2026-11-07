/**
 * 媒体会话（Media Session API）：系统播放控件 / 锁屏 / 键盘媒体键显示标题、封面，并能播放、暂停、快进快退、
 * 上一首 / 下一首。页面上可能有多个播放器：谁开始播放谁接管会话；卸载时只清理自己接管的会话。
 * 不支持的浏览器（或不支持某个动作）静默跳过。
 */
import { useEffect, useRef } from "react";

export type SessionAction =
  | "play"
  | "pause"
  | "stop"
  | "seekbackward"
  | "seekforward"
  | "seekto"
  | "previoustrack"
  | "nexttrack";

export interface SessionActionDetails {
  action?: string;
  seekOffset?: number;
  seekTime?: number;
  fastSeek?: boolean;
}

/** navigator.mediaSession 的最小接口（便于测试替换） */
export interface MediaSessionLike {
  metadata: unknown;
  playbackState?: string;
  setActionHandler(
    action: SessionAction,
    handler: ((details: SessionActionDetails) => void) | null,
  ): void;
  setPositionState?(state?: {
    duration: number;
    playbackRate: number;
    position: number;
  }): void;
}

export const SESSION_ACTIONS: readonly SessionAction[] = [
  "play",
  "pause",
  "stop",
  "seekbackward",
  "seekforward",
  "seekto",
  "previoustrack",
  "nexttrack",
];

/** 默认快进 / 快退秒数（系统没有给 seekOffset 时） */
export const SESSION_SEEK_SECONDS = 10;

export function getMediaSession(): MediaSessionLike | null {
  if (typeof navigator === "undefined") return null;
  const session = (navigator as { mediaSession?: MediaSessionLike })
    .mediaSession;
  return session && typeof session.setActionHandler === "function"
    ? session
    : null;
}

export interface SessionInfo {
  title: string;
  artist?: string;
  album?: string;
  artwork?: string;
}

type MetadataCtor = new (init: {
  title: string;
  artist?: string;
  album?: string;
  artwork?: Array<{ src: string }>;
}) => unknown;

/** MediaMetadata（没有构造函数时用普通对象） */
export function createSessionMetadata(info: SessionInfo): unknown {
  const init = {
    title: info.title,
    artist: info.artist ?? "",
    album: info.album ?? "",
    artwork: info.artwork ? [{ src: info.artwork }] : [],
  };
  const Ctor = (globalThis as { MediaMetadata?: MetadataCtor }).MediaMetadata;
  if (typeof Ctor !== "function") return init;
  try {
    return new Ctor(init);
  } catch {
    return init;
  }
}

export interface SessionHandlers {
  play: () => void;
  pause: () => void;
  seekTo: (time: number) => void;
  seekBy: (delta: number) => void;
  previous?: () => void;
  next?: () => void;
}

/** 动作 → 播放器操作（纯函数，便于测试） */
export function sessionHandlerFor(
  action: SessionAction,
  handlers: SessionHandlers,
): ((details: SessionActionDetails) => void) | null {
  switch (action) {
    case "play":
      return () => handlers.play();
    case "pause":
    case "stop":
      return () => handlers.pause();
    case "seekbackward":
      return (details) =>
        handlers.seekBy(-(details.seekOffset ?? SESSION_SEEK_SECONDS));
    case "seekforward":
      return (details) =>
        handlers.seekBy(details.seekOffset ?? SESSION_SEEK_SECONDS);
    case "seekto":
      return (details) => {
        if (typeof details.seekTime === "number")
          handlers.seekTo(details.seekTime);
      };
    case "previoustrack":
      return handlers.previous ? () => handlers.previous?.() : null;
    case "nexttrack":
      return handlers.next ? () => handlers.next?.() : null;
    default:
      return null;
  }
}

function setHandler(
  session: MediaSessionLike,
  action: SessionAction,
  handler: ((details: SessionActionDetails) => void) | null,
) {
  try {
    session.setActionHandler(action, handler);
  } catch {
    // 浏览器不支持这个动作
  }
}

/** 当前接管会话的播放器 */
let owner: symbol | null = null;

export interface UseMediaSessionOptions {
  enabled: boolean;
  playing: boolean;
  info: SessionInfo;
  handlers: SessionHandlers;
  /** 有上一首 / 下一首（播放列表）时才注册对应动作 */
  hasPrevious: boolean;
  hasNext: boolean;
  position: { current: number; duration: number; rate: number };
}

export function useMediaSession(options: UseMediaSessionOptions): void {
  const { enabled, playing, info, hasPrevious, hasNext, position } = options;
  const { title, artist, album, artwork } = info;
  const idRef = useRef<symbol>(Symbol("media-player"));
  const handlersRef = useRef(options.handlers);
  handlersRef.current = options.handlers;

  // 开始播放时接管会话：元数据 + 动作
  useEffect(() => {
    const session = getMediaSession();
    if (!enabled || !session || !playing) return;
    owner = idRef.current;
    session.metadata = createSessionMetadata({ title, artist, album, artwork });
    const proxy: SessionHandlers = {
      play: () => handlersRef.current.play(),
      pause: () => handlersRef.current.pause(),
      seekTo: (time) => handlersRef.current.seekTo(time),
      seekBy: (delta) => handlersRef.current.seekBy(delta),
      previous: hasPrevious
        ? () => handlersRef.current.previous?.()
        : undefined,
      next: hasNext ? () => handlersRef.current.next?.() : undefined,
    };
    for (const action of SESSION_ACTIONS)
      setHandler(session, action, sessionHandlerFor(action, proxy));
  }, [enabled, playing, title, artist, album, artwork, hasPrevious, hasNext]);

  // 播放状态
  useEffect(() => {
    const session = getMediaSession();
    if (!enabled || !session || owner !== idRef.current) return;
    session.playbackState = playing ? "playing" : "paused";
  }, [enabled, playing]);

  // 进度（系统控件里的进度条）
  const { current, duration, rate } = position;
  const second = Math.floor(current);
  const currentRef = useRef(current);
  currentRef.current = current;
  useEffect(() => {
    const session = getMediaSession();
    if (
      !enabled ||
      !session ||
      owner !== idRef.current ||
      !session.setPositionState
    )
      return;
    if (!Number.isFinite(duration) || duration <= 0) return;
    try {
      session.setPositionState({
        duration,
        playbackRate: rate > 0 ? rate : 1,
        position: Math.min(duration, Math.max(0, currentRef.current)),
      });
    } catch {
      // 部分浏览器在元数据未就绪时会抛错
    }
    // 只在整秒、时长、速度变化时更新
  }, [enabled, second, duration, rate, playing]);

  // 卸载：清理自己接管的会话
  useEffect(
    () => () => {
      const session = getMediaSession();
      if (!session || owner !== idRef.current) return;
      owner = null;
      for (const action of SESSION_ACTIONS) setHandler(session, action, null);
      session.metadata = null;
      session.playbackState = "none";
    },
    [],
  );
}
