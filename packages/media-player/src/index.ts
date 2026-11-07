/**
 * minerva-design/media-player
 *
 * 自绘的 React 媒体播放器与配套纯函数。音频、视频是同一个组件（MediaPlayer；VideoPlayer 是它的别名，
 * AudioPlayer = kind="audio"）：可插拔播放引擎（原生 / hls.js / dash.js / mpegts.js）、兼容矩阵与 canPlay、
 * 清晰度、播放速度、循环、A-B 循环、播放列表、媒体会话、字幕、画中画、截图、录制、音频界面（真实波形）。
 * 独立消费者导入编译后的 style.css；仓库源码条件下由宿主处理 SCSS Module。
 */
export {
  MediaPlayer,
  VideoPlayer,
  AudioPlayer,
  default,
  type AudioPlayerProps,
} from "./VideoPlayer.js";
export type {
  MediaDownloadInfo,
  MediaKind,
  MediaPlayerHandle,
  MediaPlayerProps,
  VideoMetadata,
  VideoPlayerHandle,
  VideoPlayerProps,
} from "./playerTypes.js";
export type { PlayerControls } from "./ControlBar.js";
export type { RenderTooltip, TooltipContext } from "./ControlButton.js";
export { SEEK_STEP_SECONDS, timeRangesToArray } from "./ProgressBar.js";
export {
  clampTime,
  formatTime,
  frameWidth,
  ratioFromPointer,
} from "./format.js";
export {
  AUDIO_PROBE_MIN_PLAYED_SECONDS,
  clampVolume,
  detectAudioTrack,
  nextAudioTrackState,
  playedSeconds,
  type AudioProbeTarget,
  type AudioTrackState,
} from "./audio.js";
// 播放源与引擎
export {
  AUTO_QUALITY,
  PlayerError,
  type EngineAttachOptions,
  type EngineLevel,
  type MediaEngine,
  type MediaEngineFactory,
  type MediaQuality,
  type MediaSourceType,
  type PlayerErrorCode,
  type PlayerSource,
  type PlayerSource as MediaSourceDescriptor,
} from "./engines/types.js";
export {
  detectSourceType,
  extensionOfUrl,
  initialQualityId,
  normalizeSource,
  resolvePlayback,
  sortedQualities,
  type ResolvedSourceType,
} from "./engines/detect.js";
export {
  baseMime,
  formatOfMime,
  isAudioSource,
  probeMimeFor,
  protocolHint,
  unsupportedProtocol,
} from "./engines/formats.js";
export {
  FORMAT_MATRIX,
  browserProbe,
  canPlay,
  getCapabilities,
  type CanPlayOptions,
  type CanPlayResult,
  type Capabilities,
  type CapabilityProbe,
  type CodecCapability,
  type FormatCapability,
  type PlayConfidence,
} from "./engines/capabilities.js";
export {
  AUDIO_CODECS,
  audioCodecName,
  audioCodecSupport,
  audioUnsupportedHint,
  codecsOfMime,
  type AudioCodecSpec,
  type AudioCodecSupport,
} from "./engines/audioCodecs.js";
export { defaultEngines, selectEngine } from "./engines/index.js";
export {
  PROGRESSIVE_TYPES,
  attachNative,
  canPlayNatively,
  nativeEngine,
} from "./engines/native.js";
export {
  createHlsEngine,
  hlsLevels,
  type HlsEngineOptions,
} from "./engines/hls.js";
export { createFlvEngine, type FlvEngineOptions } from "./engines/flv.js";
export {
  createDashEngine,
  dashError,
  dashLevels,
  type DashEngineOptions,
  type DashModuleLike,
  type DashPlayerLike,
} from "./engines/dash.js";
// 音频：波形、A-B 循环、播放列表、媒体会话
export {
  MAX_WAVEFORM_BYTES,
  PEAK_RESOLUTION,
  browserAudioDecoder,
  canDecodeWaveform,
  clearWaveformCache,
  computePeaks,
  computePeaksChunked,
  loadWaveform,
  resamplePeaks,
  waveformBars,
  type AudioDecoder,
  type DecodedAudio,
  type WaveformData,
} from "./peaks.js";
export type { WaveformOption, WaveformState } from "./useWaveform.js";
export {
  EMPTY_AB,
  MIN_AB_SPAN,
  abActive,
  abLoopTarget,
  applyAbCommand,
  cycleAb,
  setAbPoint,
  type AbCommand,
  type AbRange,
} from "./abRepeat.js";
export {
  RESTART_THRESHOLD_SECONDS,
  clampPlaylistIndex,
  nextTrackIndex,
  previousTrackAction,
  type PlaylistItem,
  type PreviousAction,
} from "./playlist.js";
export {
  SESSION_ACTIONS,
  createSessionMetadata,
  getMediaSession,
  sessionHandlerFor,
  type MediaSessionLike,
  type SessionHandlers,
} from "./mediaSession.js";
export { qualityOptionsFor, type QualityOption } from "./useMediaEngine.js";
// 截图 / 录制 / 字幕 / 快捷键 / 能力检测
export {
  captureFrame,
  downloadBlob,
  mediaFileName,
  type ScreenshotMeta,
} from "./screenshot.js";
// 视频列表封面：后台随机抽帧，与播放进度独立。
export { captureVideoThumbnail } from "./thumbnail.js";
export {
  RECORDER_MIME_CANDIDATES,
  nextRecordingStatus,
  pickRecorderMimeType,
  recordingExtension,
  startRecordingSession,
  type RecordingEvent,
  type RecordingMeta,
  type RecordingResult,
  type RecordingStatus,
} from "./recorder.js";
export {
  applyCaptionMode,
  defaultCaptionIndex,
  mediaErrorMessage,
  type PlayerTrack,
} from "./captions.js";
export {
  KEY_SEEK_SECONDS,
  LONG_SEEK_SECONDS,
  PLAYBACK_RATES,
  keyAction,
  stepPlaybackRate,
  type PlayerKeyAction,
} from "./keyboard.js";
export {
  getFullscreenElement,
  supportsElementFullscreen,
  supportsPictureInPicture,
  supportsRecording,
  supportsScreenshot,
} from "./features.js";

export {
  playerMessages,
  createPlayerText,
  type PlayerMessages,
  type PlayerLocale,
  type PlayerMessageKey,
} from "./i18n.js";
export { parseSubtitles, captionAt, type SubtitleCue } from "./subtitles.js";

export type {
  PlayerChromeState,
  PlayerRootProps,
  PlayerMediaProps,
} from "./chrome.js";
