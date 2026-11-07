/**
 * 播放器的浏览器能力 hooks：全屏（含 webkit 前缀 / iOS 视频全屏）、画中画、录屏，以及控制条的自动隐藏、短暂提示。
 * 能力在挂载后检测（SSR 安全），不支持时对应按钮隐藏。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TooltipContext } from "./ControlButton.js";
import {
  FULLSCREEN_EVENTS,
  enterFullscreen,
  exitFullscreen,
  getFullscreenElement,
  isPictureInPicture,
  nextVideoFrame,
  supportsElementFullscreen,
  supportsPictureInPicture,
  supportsRecording,
  supportsVideoFullscreen,
  togglePictureInPicture,
} from "./features.js";
import {
  nextRecordingStatus,
  startRecordingSession,
  type RecordingEvent,
  type RecordingResult,
  type RecordingSession,
  type RecordingStatus,
} from "./recorder.js";
import { PlayerError } from "./engines/types.js";
import { clampVolume } from "./audio.js";

type ElementRef<T> = React.RefObject<T | null>;

const NOTICE_MS = 2400;

const IDLE_HIDE_MS = 2200;

/** 指针活动后显示控制条，静止一段时间后隐藏 */
export function useIdleActive() {
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const wake = useCallback(() => {
    setActive(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(false), IDLE_HIDE_MS);
  }, []);
  return { active, setActive, wake };
}

/** 画面上方的短暂提示（截图 / 录制结果、速度变化、错误） */
export function useNotice() {
  const [notice, setNotice] = useState<{
    message: string;
    tone: "info" | "error";
  } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const showNotice = useCallback(
    (message: string, tone: "info" | "error" = "info") => {
      setNotice({ message, tone });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setNotice(null), NOTICE_MS);
    },
    [],
  );
  return { notice, showNotice };
}

export function useFullscreen(
  rootRef: ElementRef<HTMLDivElement>,
  videoRef: ElementRef<HTMLVideoElement>,
  onChange?: () => void,
  hostKey = "video",
) {
  const [fullscreen, setFullscreen] = useState(false);
  const [supported, setSupported] = useState(false);
  const changeRef = useRef(onChange);
  changeRef.current = onChange;

  useEffect(() => {
    setSupported(
      supportsElementFullscreen(rootRef.current) ||
        supportsVideoFullscreen(videoRef.current),
    );
    const handle = () => {
      const root = rootRef.current;
      setFullscreen(!!root && getFullscreenElement() === root);
      changeRef.current?.();
    };
    for (const name of FULLSCREEN_EVENTS)
      document.addEventListener(name, handle);
    return () => {
      for (const name of FULLSCREEN_EVENTS)
        document.removeEventListener(name, handle);
    };
  }, [rootRef, videoRef, hostKey]);

  const toggle = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    if (getFullscreenElement() === root) exitFullscreen();
    else enterFullscreen(root, videoRef.current);
  }, [rootRef, videoRef]);

  return { fullscreen, supported, toggle };
}

export function usePictureInPicture(
  videoRef: ElementRef<HTMLVideoElement>,
  sourceKey: string,
  hostKey = "video",
) {
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setSupported(supportsPictureInPicture(video));
    const sync = () => setActive(isPictureInPicture(video));
    sync();
    const events = [
      "enterpictureinpicture",
      "leavepictureinpicture",
      "webkitpresentationmodechanged",
    ];
    for (const name of events) video.addEventListener(name, sync);
    return () => {
      for (const name of events) video.removeEventListener(name, sync);
    };
  }, [videoRef, sourceKey, hostKey]);

  const toggle = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    await togglePictureInPicture(video);
  }, [videoRef]);

  return { active, supported, toggle };
}

export interface UseRecordingOptions {
  baseName: string;
  maxDurationSeconds?: number;
  onResult: (result: RecordingResult) => void;
  onError: (error: PlayerError) => void;
}

export function useRecording(
  videoRef: ElementRef<HTMLVideoElement>,
  options: UseRecordingOptions,
) {
  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [supported, setSupported] = useState(false);
  const sessionRef = useRef<RecordingSession | null>(null);
  const statusRef = useRef<RecordingStatus>("idle");
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const dispatch = useCallback((event: RecordingEvent) => {
    statusRef.current = nextRecordingStatus(statusRef.current, event);
    setStatus(statusRef.current);
  }, []);

  useEffect(() => {
    setSupported(supportsRecording(videoRef.current));
  }, [videoRef]);

  // 录制中每 250ms 刷新已录时长
  useEffect(() => {
    if (status !== "recording") return;
    const session = sessionRef.current;
    const timer = setInterval(() => {
      if (session) setElapsed((Date.now() - session.startedAt) / 1000);
    }, 250);
    return () => clearInterval(timer);
  }, [status]);

  // 卸载时停止录制（不再回调）
  useEffect(
    () => () => {
      const session = sessionRef.current;
      sessionRef.current = null;
      if (session) void session.stop().catch(() => undefined);
    },
    [],
  );

  const start = useCallback(async (): Promise<boolean> => {
    const video = videoRef.current;
    if (!video || statusRef.current !== "idle") return false;
    dispatch({ type: "start" });
    try {
      // 暂停时先播放，否则录到的只有一帧
      if (video.paused) {
        const played = video.play() as Promise<void> | undefined;
        await played?.catch?.(() => undefined);
      }
      await nextVideoFrame(video);
      const session = startRecordingSession(video, {
        baseName: optionsRef.current.baseName,
        maxDurationSeconds: optionsRef.current.maxDurationSeconds,
      });
      sessionRef.current = session;
      setElapsed(0);
      dispatch({ type: "started" });
      session.result.then(
        (result) => {
          if (sessionRef.current !== session) return;
          sessionRef.current = null;
          dispatch({ type: "finished" });
          optionsRef.current.onResult(result);
        },
        (error: unknown) => {
          if (sessionRef.current !== session) return;
          sessionRef.current = null;
          dispatch({ type: "error" });
          optionsRef.current.onError(
            error instanceof PlayerError
              ? error
              : new PlayerError("unknown", "录制失败"),
          );
        },
      );
      return true;
    } catch (error) {
      dispatch({ type: "error" });
      optionsRef.current.onError(
        error instanceof PlayerError
          ? error
          : new PlayerError("unknown", "录制失败"),
      );
      return false;
    }
  }, [videoRef, dispatch]);

  const stop = useCallback(async (): Promise<RecordingResult | null> => {
    const session = sessionRef.current;
    if (!session || statusRef.current !== "recording") return null;
    dispatch({ type: "stop" });
    try {
      return await session.stop();
    } catch {
      return null;
    }
  }, [dispatch]);

  return { status, elapsed, supported, start, stop };
}

/** 把静音 / 音量 / 循环 / 倍速同步到 video 元素（各自变化时才写） */
export function useMediaElementSync(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  state: { muted: boolean; volume: number; loop: boolean; rate: number },
  hostKey = "video",
): void {
  const { muted, volume, loop, rate } = state;
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, videoRef, hostKey]);
  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume;
  }, [volume, videoRef, hostKey]);
  useEffect(() => {
    if (videoRef.current) videoRef.current.loop = loop;
  }, [loop, videoRef, hostKey]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    video.defaultPlaybackRate = rate;
  }, [rate, videoRef, hostKey]);
}

/**
 * 声音状态：静音、音量，以及「只因自动播放而静音」（用户第一次主动播放或点「开启声音」时恢复声音）
 */
export function useSound(initial: {
  muted: boolean;
  autoMuted: boolean;
  defaultVolume: number;
}) {
  const [muted, setMuted] = useState(initial.muted);
  const [autoMuted, setAutoMuted] = useState(initial.autoMuted);
  const [volume, setVolume] = useState(() =>
    clampVolume(initial.defaultVolume),
  );

  const enableSound = useCallback(() => {
    setAutoMuted(false);
    setMuted(false);
    setVolume((value) => (value > 0 ? value : 1));
  }, []);

  const toggleMute = useCallback(() => {
    setAutoMuted(false);
    if (muted && volume === 0) setVolume(1);
    setMuted(!muted);
  }, [muted, volume]);

  const changeVolume = useCallback((next: number) => {
    const value = clampVolume(next);
    setAutoMuted(false);
    setVolume(value);
    setMuted(value === 0);
  }, []);

  return {
    muted,
    autoMuted,
    volume,
    setMuted,
    setVolume,
    enableSound,
    toggleMute,
    changeVolume,
  };
}

/** 悬停提示的挂载容器：全屏时挂到播放器根元素里（挂到 body 的提示在全屏时看不见） */
export function useTooltipContext(
  fullscreen: boolean,
  root: HTMLElement | null,
): TooltipContext {
  return useMemo<TooltipContext>(
    () => ({ container: fullscreen ? root : null, fullscreen }),
    [fullscreen, root],
  );
}
