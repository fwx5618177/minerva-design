/**
 * 音频界面的「画面」部分：封面（poster 或播放 / 暂停圆标，点击切换播放）+ 标题 + 操作 + 波形进度。
 * 这里只替换视频的画面区域；引擎、控制条、快捷键、声音、播放列表等全部与视频共用（见 MediaPlayer）。
 */
import React from "react";
import { VscDebugPause, VscPlay } from "react-icons/vsc";
import type { AbRange } from "./abRepeat.js";
import type { WaveformState } from "./useWaveform.js";
import Waveform from "./Waveform.js";
import styles from "./audio-visual.module.scss";

export { waveformBars } from "./peaks.js";

export interface AudioVisualProps {
  title: string;
  poster?: string;
  showTitle: boolean;
  current: number;
  duration: number;
  paused: boolean;
  compact: boolean;
  actions?: React.ReactNode;
  /** 行尾的额外按钮（例如「开启声音」），不覆盖波形 */
  trailing?: React.ReactNode;
  /** 真实波形峰值；null 时显示装饰波形 */
  peaks: readonly number[] | null;
  waveformState: WaveformState;
  buffered?: ReadonlyArray<readonly [number, number]>;
  ab?: AbRange;
  seekable: boolean;
  onSeek: (time: number) => void;
  onDragChange?: (dragging: boolean) => void;
  onTogglePlay: () => void;
}

const AudioVisual: React.FC<AudioVisualProps> = ({
  title,
  poster,
  showTitle,
  current,
  duration,
  paused,
  compact,
  actions,
  trailing,
  peaks,
  waveformState,
  buffered,
  ab,
  seekable,
  onSeek,
  onDragChange,
  onTogglePlay,
}) => (
  <div
    className={[
      styles.visual,
      compact ? styles.compact : "",
      paused ? "" : styles.playing,
    ]
      .filter(Boolean)
      .join(" ")}
    data-testid="audio-visual"
  >
    <span
      className={styles.cover}
      aria-hidden="true"
      onClick={(event) => {
        event.stopPropagation();
        onTogglePlay();
      }}
    >
      {poster ? (
        <img src={poster} alt="" draggable={false} />
      ) : paused ? (
        <VscPlay />
      ) : (
        <VscDebugPause />
      )}
    </span>
    <div className={styles.body}>
      {(showTitle || actions) && (
        <div className={styles.head}>
          {showTitle && (
            <span className={styles.title} title={title}>
              {title}
            </span>
          )}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      <Waveform
        seed={title}
        peaks={peaks}
        state={waveformState}
        current={current}
        duration={duration}
        buffered={buffered}
        ab={ab}
        seekable={seekable}
        onSeek={onSeek}
        onDragChange={onDragChange}
      />
    </div>
    {trailing}
  </div>
);

export default AudioVisual;
