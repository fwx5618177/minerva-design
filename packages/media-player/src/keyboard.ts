/**
 * 播放器快捷键（纯函数）：按键 → 动作。修饰键（⌘ / Ctrl / Alt）一律不处理，留给宿主应用。
 * 音频与视频是同一个播放器，快捷键完全一致（截图 / 录制 / 全屏 / 字幕 / 画中画在音频界面里不可用，按键不拦截）。
 *
 * | 按键 | 动作 |
 * | Space / K | 播放 / 暂停 |  ← / → | ±5 秒 |  Shift + ← / → | ±15 秒 |  ↑ / ↓ | 音量 ±10% |
 * | M | 静音 |  L | 循环 |  < / > | 减速 / 加速 |  [ / ] | A-B 循环的 A / B 点 |  \ | 清除 A-B |
 * | Shift + N / P | 下一首 / 上一首（播放列表） |  F | 全屏 |  S | 截图 |  R | 录制 |  C | 字幕 |  P | 画中画 |
 */

export type PlayerKeyAction =
  | "toggle-play"
  | "seek-back"
  | "seek-forward"
  | "volume-up"
  | "volume-down"
  | "toggle-mute"
  | "toggle-fullscreen"
  | "screenshot"
  | "toggle-record"
  | "speed-down"
  | "speed-up"
  | "toggle-captions"
  | "toggle-pip"
  | "seek-back-long"
  | "seek-forward-long"
  | "toggle-loop"
  | "ab-set-a"
  | "ab-set-b"
  | "ab-clear"
  | "next-track"
  | "previous-track";

export interface KeyInput {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  /** 焦点在按钮上时空格交给按钮自己 */
  onButton?: boolean;
}

const KEY_ACTIONS: Record<string, PlayerKeyAction> = {
  k: "toggle-play",
  arrowleft: "seek-back",
  arrowright: "seek-forward",
  arrowup: "volume-up",
  arrowdown: "volume-down",
  m: "toggle-mute",
  f: "toggle-fullscreen",
  s: "screenshot",
  r: "toggle-record",
  "<": "speed-down",
  ">": "speed-up",
  c: "toggle-captions",
  p: "toggle-pip",
  l: "toggle-loop",
  "[": "ab-set-a",
  "]": "ab-set-b",
  "\\": "ab-clear",
};

/** 按住 Shift 时的动作（< > 本身就需要 Shift，不在这里） */
const SHIFT_ACTIONS: Record<string, PlayerKeyAction> = {
  arrowleft: "seek-back-long",
  arrowright: "seek-forward-long",
  n: "next-track",
  p: "previous-track",
};

export function keyAction(input: KeyInput): PlayerKeyAction | null {
  if (input.metaKey || input.ctrlKey || input.altKey) return null;
  const key = input.key.toLowerCase();
  if (key === " ") return input.onButton ? null : "toggle-play";
  if (input.shiftKey && SHIFT_ACTIONS[key]) return SHIFT_ACTIONS[key];
  return KEY_ACTIONS[key] ?? null;
}

/** 可选的播放速度 */
export const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;

/** 相邻的播放速度（到头时保持不变） */
export function stepPlaybackRate(current: number, direction: 1 | -1): number {
  const rates = PLAYBACK_RATES as readonly number[];
  const index = rates.findIndex((rate) => Math.abs(rate - current) < 0.001);
  if (index < 0) {
    // 不在列表里：找最近的一档再移动
    const next =
      direction > 0
        ? rates.find((rate) => rate > current)
        : [...rates].reverse().find((rate) => rate < current);
    return next ?? current;
  }
  return rates[Math.min(rates.length - 1, Math.max(0, index + direction))];
}

export function formatRate(rate: number): string {
  return rate === 1 ? "正常" : `${rate}x`;
}

/** 键盘：音量每次调整的幅度 */
export const VOLUME_STEP = 0.1;
/** 键盘：前进 / 后退的秒数（与进度条键盘操作一致） */
export const KEY_SEEK_SECONDS = 5;
/** Shift + 方向键 / 控制条的长跳转秒数 */
export const LONG_SEEK_SECONDS = 15;

/** 执行按键动作需要的播放器能力（由播放器组件提供，便于单独测试） */
export interface KeyActionContext {
  show: {
    fullscreen?: boolean;
    screenshot?: boolean;
    record?: boolean;
    speed?: boolean;
    captions?: boolean;
    pip?: boolean;
  };
  hasSound: boolean;
  hasCaptions: boolean;
  togglePlay: () => void;
  seekBy: (deltaSeconds: number) => void;
  changeVolume: (delta: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  screenshot: () => void;
  toggleRecord: () => void;
  stepSpeed: (direction: 1 | -1) => void;
  toggleCaptions: () => void;
  togglePip: () => void;
  /** 以下为可选能力：不提供时对应按键不拦截 */
  toggleLoop?: () => void;
  abRepeat?: (command: "set-a" | "set-b" | "clear") => void;
  nextTrack?: () => void;
  previousTrack?: () => void;
}

/**
 * 执行一个按键动作；对应能力不可用（没有声音、按钮被隐藏、没有字幕等）时返回 false，
 * 调用方据此不拦截按键
 */
export function runKeyAction(
  action: PlayerKeyAction,
  ctx: KeyActionContext,
): boolean {
  const when = (enabled: boolean | undefined, run: () => void): boolean => {
    if (!enabled) return false;
    run();
    return true;
  };
  switch (action) {
    case "toggle-play":
      return when(true, ctx.togglePlay);
    case "seek-back":
      return when(true, () => ctx.seekBy(-KEY_SEEK_SECONDS));
    case "seek-forward":
      return when(true, () => ctx.seekBy(KEY_SEEK_SECONDS));
    case "volume-up":
      return when(ctx.hasSound, () => ctx.changeVolume(VOLUME_STEP));
    case "volume-down":
      return when(ctx.hasSound, () => ctx.changeVolume(-VOLUME_STEP));
    case "toggle-mute":
      return when(ctx.hasSound, ctx.toggleMute);
    case "toggle-fullscreen":
      return when(ctx.show.fullscreen, ctx.toggleFullscreen);
    case "screenshot":
      return when(ctx.show.screenshot, ctx.screenshot);
    case "toggle-record":
      return when(ctx.show.record, ctx.toggleRecord);
    case "speed-down":
      return when(ctx.show.speed, () => ctx.stepSpeed(-1));
    case "speed-up":
      return when(ctx.show.speed, () => ctx.stepSpeed(1));
    case "toggle-captions":
      return when(ctx.show.captions && ctx.hasCaptions, ctx.toggleCaptions);
    case "toggle-pip":
      return when(ctx.show.pip, ctx.togglePip);
    case "seek-back-long":
      return when(true, () => ctx.seekBy(-LONG_SEEK_SECONDS));
    case "seek-forward-long":
      return when(true, () => ctx.seekBy(LONG_SEEK_SECONDS));
    case "toggle-loop":
      return when(!!ctx.toggleLoop, () => ctx.toggleLoop?.());
    case "ab-set-a":
      return when(!!ctx.abRepeat, () => ctx.abRepeat?.("set-a"));
    case "ab-set-b":
      return when(!!ctx.abRepeat, () => ctx.abRepeat?.("set-b"));
    case "ab-clear":
      return when(!!ctx.abRepeat, () => ctx.abRepeat?.("clear"));
    case "next-track":
      return when(!!ctx.nextTrack, () => ctx.nextTrack?.());
    case "previous-track":
      return when(!!ctx.previousTrack, () => ctx.previousTrack?.());
    default:
      return false;
  }
}
