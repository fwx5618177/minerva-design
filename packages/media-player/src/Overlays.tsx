/**
 * 画面上的浮层：加载中、错误（可重试）、短暂提示（截图 / 录制结果）、录制中标记、开启声音、顶部标题栏。
 */
import React from "react";
import { PlayerText, usePlayerText } from "./i18n.js";
import { VscLoading, VscRefresh, VscUnmute, VscWarning } from "react-icons/vsc";
import { formatTime } from "./format.js";
import styles from "./styles.module.scss";

export const LoadingOverlay: React.FC = () => {
  const text = usePlayerText();
  return (
    <div
      className={styles.loading}
      role="status"
      aria-label={text("加载中")}
      data-testid="video-loading"
    >
      <VscLoading className={styles.spinner} />
    </div>
  );
};

export const ErrorOverlay: React.FC<{
  message: string;
  onRetry: () => void;
}> = ({ message, onRetry }) => (
  <div className={styles.errorOverlay} role="alert" data-testid="video-error">
    <VscWarning className={styles.errorIcon} />
    <span className={styles.errorText}>{message}</span>
    <button
      type="button"
      className={styles.retry}
      onClick={(event) => {
        event.stopPropagation();
        onRetry();
      }}
    >
      <VscRefresh />
      <span>
        <PlayerText>重试</PlayerText>
      </span>
    </button>
  </div>
);

export const NoticeOverlay: React.FC<{
  message: string;
  tone: "info" | "error";
}> = ({ message, tone }) => (
  <div
    className={`${styles.notice} ${tone === "error" ? styles.noticeError : ""}`}
    role={tone === "error" ? "alert" : "status"}
    data-testid="video-notice"
  >
    {message}
  </div>
);

export const RecordingBadge: React.FC<{ elapsed: number }> = ({ elapsed }) => (
  <div className={styles.recBadge} aria-hidden="true">
    <span className={styles.recDot} />
    REC {formatTime(elapsed)}
  </div>
);

/** 自动播放静音起播时的「开启声音」（小卡片只有图标） */
export const UnmuteButton: React.FC<{
  compact: boolean;
  onClick: () => void;
}> = ({ compact, onClick }) => {
  const text = usePlayerText();
  return (
    <button
      type="button"
      className={
        compact ? `${styles.unmute} ${styles.unmuteCompact}` : styles.unmute
      }
      aria-label={text("开启声音")}
      title={compact ? text("开启声音") : undefined}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <VscUnmute />
      {!compact && (
        <span>
          <PlayerText>开启声音</PlayerText>
        </span>
      )}
    </button>
  );
};

/** 顶部：标题 + 额外操作（与控制条一起浮现） */
export const TopBar: React.FC<{
  title: string;
  showTitle: boolean;
  actions?: React.ReactNode;
}> = ({ title, showTitle, actions }) => (
  <div className={styles.top}>
    {showTitle ? (
      <span className={styles.title} title={title}>
        {title}
      </span>
    ) : (
      <span />
    )}
    {actions && <div className={styles.actions}>{actions}</div>}
  </div>
);
