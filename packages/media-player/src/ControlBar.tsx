/**
 * 底部控制条（音频、视频共用）：进度条 + 按钮行
 * [上一首] 播放 / 暂停 [下一首]、[快退 / 快进]、音量、时间（点击切换剩余时间）｜ [A-B]、循环、截图、录制、画中画、
 * [下载]、设置（清晰度 / 速度 / 字幕）、全屏。
 * 音频界面：进度由波形承担（这里不再画进度条），显示快退快进与 A-B；截图 / 录制 / 画中画 / 全屏不显示。
 * 不支持的能力不显示按钮；使用方也可用 controls 属性隐藏任意按钮。
 */
import { usePlayerText } from "./i18n.js";
import React from "react";
import {
  VscDebugPause,
  VscDebugStop,
  VscDeviceCamera,
  VscMultipleWindows,
  VscPlay,
  VscRecord,
  VscScreenFull,
  VscScreenNormal,
  VscSync,
} from "react-icons/vsc";
import type { AudioTrackState } from "./audio.js";
import type { AbRange } from "./abRepeat.js";
import { LONG_SEEK_SECONDS, KEY_SEEK_SECONDS } from "./keyboard.js";
import {
  AbButton,
  DownloadButton,
  SkipButton,
  TrackButton,
} from "./TransportButtons.js";
import ControlButton, { type RenderTooltip } from "./ControlButton.js";
import ProgressBar from "./ProgressBar.js";
import SettingsMenu, { type CaptionOption } from "./SettingsMenu.js";
import VolumeControl from "./VolumeControl.js";
import { formatTime } from "./format.js";
import type { RecordingStatus } from "./recorder.js";
import type { QualityOption } from "./useMediaEngine.js";
import styles from "./styles.module.scss";

/** 可隐藏的控制项（默认全部显示；loop 默认跟随 showLoopToggle） */
export interface PlayerControls {
  play?: boolean;
  progress?: boolean;
  volume?: boolean;
  time?: boolean;
  loop?: boolean;
  screenshot?: boolean;
  record?: boolean;
  pip?: boolean;
  settings?: boolean;
  quality?: boolean;
  speed?: boolean;
  captions?: boolean;
  fullscreen?: boolean;
  /** 快退 / 快进按钮（默认只在音频界面显示） */
  skip?: boolean;
  /** A-B 循环按钮（默认只在音频界面显示；快捷键 [ / ] 始终可用） */
  abRepeat?: boolean;
  /** 上一首 / 下一首（有播放列表时） */
  playlist?: boolean;
  /** 下载按钮（传了 onDownload 时） */
  download?: boolean;
}

/** 合并使用方的开关与浏览器能力：不支持的能力一律隐藏 */
export function resolveControls(
  controls: PlayerControls | undefined,
  showLoopToggle: boolean,
  supported: {
    screenshot: boolean;
    record: boolean;
    pip: boolean;
    fullscreen: boolean;
  },
  context: { audio?: boolean; playlist?: boolean; download?: boolean } = {},
): Required<PlayerControls> {
  const on = (key: keyof PlayerControls, fallback = true) =>
    controls?.[key] ?? fallback;
  return {
    play: on("play"),
    progress: on("progress"),
    volume: on("volume"),
    time: on("time"),
    loop: on("loop", showLoopToggle || context.audio === true),
    screenshot: on("screenshot") && supported.screenshot,
    record: on("record") && supported.record,
    pip: on("pip") && supported.pip,
    settings: on("settings"),
    quality: on("quality"),
    speed: on("speed"),
    captions: on("captions"),
    fullscreen: on("fullscreen") && supported.fullscreen,
    skip: on("skip", context.audio === true),
    abRepeat: on("abRepeat", context.audio === true),
    playlist: on("playlist") && context.playlist === true,
    download: on("download") && context.download === true,
  };
}

export interface ControlBarProps {
  skipSeconds?: number;
  playbackRates?: readonly number[];
  show: Required<PlayerControls>;
  renderTooltip?: RenderTooltip;
  paused: boolean;
  onTogglePlay: () => void;
  current: number;
  duration: number;
  buffered: Array<[number, number]>;
  onSeek: (time: number) => void;
  onDragChange: (dragging: boolean) => void;
  muted: boolean;
  volume: number;
  audio: AudioTrackState;
  onToggleMute: () => void;
  onVolume: (volume: number) => void;
  loop: boolean;
  onToggleLoop: () => void;
  onScreenshot: () => void;
  recordStatus: RecordingStatus;
  recordElapsed: number;
  onToggleRecord: () => void;
  pipActive: boolean;
  onTogglePip: () => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  qualityOptions: QualityOption[];
  quality: string;
  onQuality: (id: string) => void;
  rate: number;
  onRate: (rate: number) => void;
  captions: CaptionOption[];
  captionIndex: number;
  onCaption: (index: number) => void;
  onMenuOpenChange: (open: boolean) => void;
  /** 音频界面：进度由波形承担 */
  audioMode?: boolean;
  onSkip?: (delta: number) => void;
  ab?: AbRange;
  onAbCycle?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onDownload?: () => void;
  /** 时间显示为剩余时间 */
  remaining?: boolean;
  onToggleRemaining?: () => void;
}

/** 时间文字：已播放 / 总时长，或 -剩余 / 总时长 */
function timeText(
  props: Pick<ControlBarProps, "current" | "duration" | "remaining">,
): string {
  const { current, duration, remaining } = props;
  if (remaining && Number.isFinite(duration) && duration > 0) {
    return `-${formatTime(Math.max(0, duration - current))} / ${formatTime(duration)}`;
  }
  return `${formatTime(current)} / ${formatTime(duration)}`;
}

const ControlBar: React.FC<ControlBarProps> = (props) => {
  const text = usePlayerText();
  const { show, renderTooltip, paused, recordStatus } = props;
  const recording = recordStatus === "recording" || recordStatus === "stopping";
  return (
    <div className={styles.controls}>
      {show.progress && !props.audioMode && (
        <ProgressBar
          current={props.current}
          duration={props.duration}
          buffered={props.buffered}
          ab={props.ab}
          onSeek={props.onSeek}
          onDragChange={props.onDragChange}
        />
      )}
      <div className={styles.bar}>
        {show.playlist && (
          <TrackButton
            next={false}
            disabled={!props.hasPrevious && props.current <= 0}
            renderTooltip={renderTooltip}
            onClick={() => props.onPrevious?.()}
          />
        )}
        {show.play && (
          <ControlButton
            tooltip={paused ? "播放（空格）" : "暂停（空格）"}
            renderTooltip={renderTooltip}
            aria-label={paused ? "播放" : "暂停"}
            onClick={props.onTogglePlay}
          >
            {paused ? <VscPlay /> : <VscDebugPause />}
          </ControlButton>
        )}
        {show.playlist && (
          <TrackButton
            next
            disabled={!props.hasNext}
            renderTooltip={renderTooltip}
            onClick={() => props.onNext?.()}
          />
        )}
        {show.skip && props.onSkip && (
          <>
            {props.skipSeconds === undefined && (
              <SkipButton
                seconds={LONG_SEEK_SECONDS}
                forward={false}
                shortcut="Shift+←"
                optional
                renderTooltip={renderTooltip}
                onSkip={props.onSkip}
              />
            )}
            <SkipButton
              seconds={props.skipSeconds ?? KEY_SEEK_SECONDS}
              forward={false}
              shortcut="←"
              renderTooltip={renderTooltip}
              onSkip={props.onSkip}
            />
            <SkipButton
              seconds={props.skipSeconds ?? KEY_SEEK_SECONDS}
              forward
              shortcut="→"
              renderTooltip={renderTooltip}
              onSkip={props.onSkip}
            />
            {props.skipSeconds === undefined && (
              <SkipButton
                seconds={LONG_SEEK_SECONDS}
                forward
                shortcut="Shift+→"
                optional
                renderTooltip={renderTooltip}
                onSkip={props.onSkip}
              />
            )}
          </>
        )}
        {show.volume && (
          <VolumeControl
            muted={props.muted}
            volume={props.volume}
            audio={props.audio}
            onToggleMute={props.onToggleMute}
            onVolume={props.onVolume}
            renderTooltip={renderTooltip}
          />
        )}
        {show.time && (
          <button
            type="button"
            className={styles.time}
            data-testid="video-time"
            data-remaining={props.remaining ? "true" : undefined}
            title={props.remaining ? "显示已播放时间" : "显示剩余时间"}
            aria-label={`${text(props.remaining ? "剩余" : "已播放")} ${timeText(props)}, ${text("点击切换")}`}
            onClick={(event) => {
              event.stopPropagation();
              props.onToggleRemaining?.();
            }}
          >
            {timeText(props)}
          </button>
        )}
        <span className={styles.spacer} />
        {show.abRepeat && props.onAbCycle && props.ab && (
          <AbButton
            range={props.ab}
            renderTooltip={renderTooltip}
            onClick={props.onAbCycle}
          />
        )}
        {show.loop && (
          <ControlButton
            tooltip={props.loop ? "关闭循环" : "循环播放"}
            renderTooltip={renderTooltip}
            active={props.loop}
            aria-label="循环播放"
            aria-pressed={props.loop}
            onClick={props.onToggleLoop}
          >
            <VscSync />
          </ControlButton>
        )}
        {show.screenshot && (
          <ControlButton
            tooltip="截图（S）"
            renderTooltip={renderTooltip}
            className={styles.optional}
            aria-label="截图"
            onClick={props.onScreenshot}
          >
            <VscDeviceCamera />
          </ControlButton>
        )}
        {show.record && (
          <>
            {recording && (
              <span
                className={styles.recordTime}
                data-testid="video-record-time"
              >
                {formatTime(props.recordElapsed)}
              </span>
            )}
            <ControlButton
              tooltip={recording ? "停止录制（R）" : "录制（R）"}
              renderTooltip={renderTooltip}
              className={`${styles.optional} ${recording ? styles.recording : ""}`}
              aria-label={recording ? "停止录制" : "开始录制"}
              aria-pressed={recording}
              disabled={
                recordStatus === "starting" || recordStatus === "stopping"
              }
              onClick={props.onToggleRecord}
            >
              {recording ? <VscDebugStop /> : <VscRecord />}
            </ControlButton>
          </>
        )}
        {show.pip && (
          <ControlButton
            tooltip={props.pipActive ? "退出画中画（P）" : "画中画（P）"}
            renderTooltip={renderTooltip}
            className={styles.optional}
            active={props.pipActive}
            aria-label={props.pipActive ? "退出画中画" : "画中画"}
            aria-pressed={props.pipActive}
            onClick={props.onTogglePip}
          >
            <VscMultipleWindows />
          </ControlButton>
        )}
        {show.download && props.onDownload && (
          <DownloadButton
            renderTooltip={renderTooltip}
            onClick={props.onDownload}
          />
        )}
        {show.settings && (
          <SettingsMenu
            playbackRates={props.playbackRates}
            qualityOptions={show.quality ? props.qualityOptions : []}
            quality={props.quality}
            onQuality={props.onQuality}
            showSpeed={show.speed}
            rate={props.rate}
            onRate={props.onRate}
            captions={show.captions ? props.captions : []}
            captionIndex={props.captionIndex}
            onCaption={props.onCaption}
            renderTooltip={renderTooltip}
            onOpenChange={props.onMenuOpenChange}
          />
        )}
        {show.fullscreen && (
          <ControlButton
            tooltip={props.fullscreen ? "退出全屏（F）" : "全屏（F）"}
            renderTooltip={renderTooltip}
            aria-label={props.fullscreen ? "退出全屏" : "全屏"}
            onClick={props.onToggleFullscreen}
          >
            {props.fullscreen ? <VscScreenNormal /> : <VscScreenFull />}
          </ControlButton>
        )}
      </div>
    </div>
  );
};

export default ControlBar;
