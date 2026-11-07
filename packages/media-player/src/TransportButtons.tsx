/**
 * 控制条上的传输类按钮：快退 / 快进（带秒数的图标）、上一首 / 下一首、A-B 循环、下载。
 * 音频与视频共用；默认只在音频界面里显示快退快进与 A-B（视频的控制条浮在画面上，保持精简，快捷键照常可用）。
 */
import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { VscCloudDownload } from "react-icons/vsc";
import { abButtonLabel, abState, type AbRange } from "./abRepeat.js";
import ControlButton, { type RenderTooltip } from "./ControlButton.js";
import styles from "./styles.module.scss";

/** 圆弧箭头 + 秒数（后退为逆时针，前进为顺时针） */
const SkipIcon: React.FC<{ seconds: number; forward: boolean }> = ({
  seconds,
  forward,
}) => (
  <svg
    className={styles.skipIcon}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    aria-hidden="true"
    style={forward ? { transform: "scaleX(-1)" } : undefined}
  >
    <path
      d="M12 4.5a7.5 7.5 0 1 1-7.1 5.1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M4.2 4.6v5.4h5.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x="12.6"
      y="15.6"
      textAnchor="middle"
      fontSize="7.5"
      fontWeight="600"
      fill="currentColor"
      style={
        forward
          ? { transform: "scaleX(-1)", transformOrigin: "12.6px 0" }
          : undefined
      }
    >
      {seconds}
    </text>
  </svg>
);

export const SkipButton: React.FC<{
  seconds: number;
  forward: boolean;
  shortcut?: string;
  optional?: boolean;
  renderTooltip?: RenderTooltip;
  onSkip: (delta: number) => void;
}> = ({
  seconds,
  forward,
  shortcut,
  optional = false,
  renderTooltip,
  onSkip,
}) => {
  const label = `${forward ? "前进" : "后退"} ${seconds} 秒`;
  return (
    <ControlButton
      tooltip={shortcut ? `${label}（${shortcut}）` : label}
      renderTooltip={renderTooltip}
      className={optional ? styles.optional : undefined}
      aria-label={label}
      onClick={() => onSkip(forward ? seconds : -seconds)}
    >
      <SkipIcon seconds={seconds} forward={forward} />
    </ControlButton>
  );
};

export const TrackButton: React.FC<{
  next: boolean;
  disabled: boolean;
  renderTooltip?: RenderTooltip;
  onClick: () => void;
}> = ({ next, disabled, renderTooltip, onClick }) => (
  <ControlButton
    tooltip={next ? "下一首（Shift+N）" : "上一首（Shift+P）"}
    renderTooltip={renderTooltip}
    aria-label={next ? "下一首" : "上一首"}
    disabled={disabled}
    onClick={onClick}
  >
    {next ? <MdSkipNext /> : <MdSkipPrevious />}
  </ControlButton>
);

export const AbButton: React.FC<{
  range: AbRange;
  renderTooltip?: RenderTooltip;
  onClick: () => void;
}> = ({ range, renderTooltip, onClick }) => {
  const state = abState(range);
  const label = abButtonLabel(range);
  return (
    <ControlButton
      tooltip={`${label}（[ / ] / \\）`}
      renderTooltip={renderTooltip}
      className={styles.abButton}
      active={state !== "none"}
      aria-label={label}
      aria-pressed={state === "ab"}
      data-ab={state}
      onClick={onClick}
    >
      <span aria-hidden="true">{state === "a" ? "A·" : "A-B"}</span>
    </ControlButton>
  );
};

export const DownloadButton: React.FC<{
  renderTooltip?: RenderTooltip;
  onClick: () => void;
}> = ({ renderTooltip, onClick }) => (
  <ControlButton
    tooltip="下载 / 导出"
    renderTooltip={renderTooltip}
    className={styles.optional}
    aria-label="下载"
    onClick={onClick}
  >
    <VscCloudDownload />
  </ControlButton>
);
