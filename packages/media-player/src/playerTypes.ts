/**
 * 播放器的公开类型：属性、通过 ref 控制的接口、元数据。
 * 音频与视频是同一个组件（MediaPlayer），所以只有一套类型；VideoPlayer* 是历史名称，与 MediaPlayer* 完全相同。
 */
import type React from "react";
import type {
  PlayerChromeState,
  PlayerRootProps,
  PlayerMediaProps,
} from "./chrome.js";
import type { PlayerMessages } from "./i18n.js";
import type { AudioTrackState } from "./audio.js";
import type { PlayerControls } from "./ControlBar.js";
import type { RenderTooltip } from "./ControlButton.js";
import type { PlayerTrack } from "./captions.js";
import type { RecordingMeta } from "./recorder.js";
import type { ScreenshotMeta } from "./screenshot.js";
import type {
  MediaEngineFactory,
  PlayerError,
  PlayerSource,
} from "./engines/types.js";
import type { PlaylistItem } from "./playlist.js";
import type { WaveformOption } from "./useWaveform.js";

/**
 * 显示哪种界面：auto（默认）先按地址 / MIME 判断，读到元数据后以有没有画面为准；
 * audio / video 强制使用音频 / 视频界面（引擎、控制、快捷键都一样，只是画面区域不同）
 */
export type MediaKind = "auto" | "video" | "audio";

/** onDownload 回调的参数 */
export interface MediaDownloadInfo {
  /** 当前播放源（播放列表时为当前曲目） */
  src: string | PlayerSource;
  /** 实际播放的地址（多清晰度时为当前清晰度） */
  url: string;
  title: string;
}

export interface VideoMetadata {
  width: number;
  height: number;
  duration: number;
}

export interface VideoPlayerProps {
  /** Host presentation adapter; the playback engine and state are shared. */
  renderChrome?: (state: PlayerChromeState) => React.ReactNode;
  rootProps?: PlayerRootProps | ((state: PlayerChromeState) => PlayerRootProps);
  mediaProps?: PlayerMediaProps;
  /** Native audio element for adapters whose public contract requires one. */
  mediaElement?: "audio" | "video";
  /** 媒体地址，或带格式 / 多清晰度的播放源描述（有 playlist 时可省略） */
  src?: string | PlayerSource;
  /** 名称：用于 aria-label「视频 X」/「音频 X」、标题与截图 / 录制的文件名 */
  title?: string;
  /** 界面：auto（默认）/ video / audio，见 MediaKind */
  kind?: MediaKind;
  /** 播放列表（音频、视频都可用）：上一首 / 下一首，播完自动下一首；有它时 src 被忽略 */
  playlist?: readonly PlaylistItem[];
  /** 初始曲目下标，默认 0 */
  defaultPlaylistIndex?: number;
  onPlaylistIndexChange?: (index: number) => void;
  /** 媒体会话（系统媒体键 / 锁屏控件）里的艺术家、专辑 */
  artist?: string;
  album?: string;
  /** 开始播放时接管系统媒体会话（Media Session API），默认 true；compact 不接管 */
  mediaSession?: boolean;
  /** 音频界面的波形：auto（能读到字节就解码真实波形，否则装饰波形）/ decorative / 峰值数组（0–1） */
  waveform?: WaveformOption;
  /** 传入时控制条显示「下载」按钮，点击时回调（由使用方决定下载 / 另存为 / 导出） */
  onDownload?: (info: MediaDownloadInfo) => void;
  variant?: "full" | "compact";
  /** 自动播放（静音起播，并显示「开启声音」按钮） */
  autoPlay?: boolean;
  /** 不自动播放时是否默认静音（自动播放总是静音起播） */
  defaultMuted?: boolean;
  defaultLoop?: boolean;
  /** 初始音量 0–1，默认 1 */
  defaultVolume?: number;
  /** 初始播放速度，默认 1 */
  defaultPlaybackRate?: number;
  /** 控制条里显示「循环播放」开关（等同 controls.loop） */
  showLoopToggle?: boolean;
  /** 悬停时在左上角显示标题 */
  showTitle?: boolean;
  /** 隐藏某些控制项，例如 `{ screenshot: false, record: false }` */
  controls?: PlayerControls | boolean;
  /** External media state, applied whenever the prop changes. */
  muted?: boolean;
  loop?: boolean;
  preload?: "none" | "metadata" | "auto";
  playbackRates?: readonly number[];
  skipSeconds?: number;
  height?: number | string;
  aspectRatio?: string;
  pictureInPicture?: boolean;
  style?: React.CSSProperties;
  theme?: "light" | "dark";
  locale?: string;
  messages?: Partial<PlayerMessages>;
  "aria-label"?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onRateChange?: (rate: number) => void;
  onVolumeChange?: (detail: { volume: number; muted: boolean }) => void;
  onLoadedMetadata?: (detail: { duration: number }) => void;
  onTrackChange?: (detail: {
    index: number;
    track: PlayerTrack | null;
  }) => void;
  /** 封面图（不传时停在第一帧附近作为封面） */
  poster?: string;
  /** 从第几秒开始播放 */
  startTime?: number;
  /** 跨域视频需要截图 / 录制时设为 'anonymous'（服务器需返回 CORS 头） */
  crossOrigin?: "" | "anonymous" | "use-credentials";
  /** 字幕（WebVTT） */
  tracks?: readonly PlayerTrack[];
  /** Optional isolation key for remembered subtitle language. */
  captionStorageKey?: string;
  /** 替换默认引擎（hls.js → mpegts.js → 原生），例如追加 dash.js */
  engines?: readonly MediaEngineFactory[];
  /** 最长录制时长（秒），默认 600 */
  maxRecordingSeconds?: number;
  /** 截图格式，默认 PNG */
  screenshotType?: "image/png" | "image/jpeg" | "image/webp";
  /** 额外操作（右上角，与控制条一起浮现），例如「在旁边看」 */
  actions?: React.ReactNode;
  /** 最大宽度（px） */
  maxWidth?: number;
  /** 最大高度（数字为 px，字符串为 CSS 长度，例如 '60vh'）；宽度按比例收窄 */
  maxHeight?: number | string;
  className?: string;
  /** 内部 video 元素的类名 / 测试标识 */
  videoClassName?: string;
  videoTestId?: string;
  /** 自定义控制按钮的提示（默认用原生 title） */
  renderTooltip?: RenderTooltip;
  onMetadata?: (info: VideoMetadata) => void;
  /** 判断出有没有音轨时回调（只回调一次确定值） */
  onAudioTrack?: (state: Exclude<AudioTrackState, "unknown">) => void;
  /** 尺寸可能变化（读到元数据、进出全屏）时回调，例如让 CodeMirror 重新测量 */
  onLayoutChange?: () => void;
  /** 截图完成；不传时直接下载。返回 Promise 时等待其完成再提示；返回 false 表示未保存（不提示） */
  onScreenshot?: (
    blob: Blob,
    meta: ScreenshotMeta,
  ) => void | boolean | Promise<void | boolean>;
  /** 录制完成；不传时直接下载；返回 false 表示未保存（不提示） */
  onRecording?: (
    blob: Blob,
    meta: RecordingMeta,
  ) => void | boolean | Promise<void | boolean>;
  onError?: (error: PlayerError) => void;
  onTimeUpdate?: (current: number, duration: number) => void;
  onEnded?: () => void;
  onQualityChange?: (id: string) => void;
}

/** 通过 ref 控制播放器 */
export interface VideoPlayerHandle {
  readonly video: HTMLVideoElement | null;
  readonly element: HTMLMediaElement | null;
  play(): Promise<void>;
  pause(): void;
  seek(time: number): void;
  setPlaybackRate(rate: number): void;
  setQuality(id: string): void;
  /** 截取当前画面（只返回 Blob，不触发 onScreenshot / 下载） */
  screenshot(): Promise<Blob>;
  startRecording(): Promise<boolean>;
  stopRecording(): Promise<Blob | null>;
  toggleFullscreen(): void;
  /** 播放列表：下一首 / 上一首（超过 3 秒时先回到开头） */
  next(): void;
  previous(): void;
  /** A-B 循环：设置区间（秒）/ 清除 */
  setAbRepeat(a: number, b: number): void;
  clearAbRepeat(): void;
}

export type MediaPlayerProps = VideoPlayerProps;
export type MediaPlayerHandle = VideoPlayerHandle;
