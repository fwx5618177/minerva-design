import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import type { MessageProps } from "./types";
import styles from "./message.module.scss";
import useI18n from "../../hooks/useI18n";

/** Refresh rate of the progress bar (the close timer itself is exact) */
const PROGRESS_INTERVAL = 50;

const Message = ({
  id,
  type = "info",
  content,
  duration = 3000,
  showClose = false,
  icon,
  className = "",
  style,
  onClose,
  showProgress = true,
  pauseOnHover = true,
  onClick,
  description,
  closeAriaLabel,
  maxWidth,
  zIndex,
}: MessageProps) => {
  const { t } = useI18n();
  const [progress, setProgress] = useState(100);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Pausing also applies while keyboard focus is inside the message, so
  // keyboard / screen reader users get time to read it and reach the button.
  const isPaused = pauseOnHover && (hovered || focused);
  // Time already elapsed before the current (un-paused) run, so that
  // resuming after a pause continues instead of restarting the countdown.
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (duration <= 0 || isPaused) return;
    const startTime = Date.now() - elapsedRef.current;
    const closeTimer = setTimeout(
      () => onClose?.(id),
      Math.max(0, duration - elapsedRef.current),
    );
    const progressTimer = showProgress
      ? setInterval(() => {
          const elapsed = Date.now() - startTime;
          setProgress(Math.max(0, 100 - (elapsed / duration) * 100));
        }, PROGRESS_INTERVAL)
      : undefined;

    return () => {
      elapsedRef.current = Math.min(duration, Date.now() - startTime);
      clearTimeout(closeTimer);
      clearInterval(progressTimer);
    };
  }, [duration, isPaused, id, onClose, showProgress]);

  const handleClose = () => {
    onClose?.(id);
  };

  // Errors and warnings interrupt (alert); everything else is announced
  // politely (status) so it does not cut off the screen reader.
  const role = type === "error" || type === "warning" ? "alert" : "status";

  const body = (
    <>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{content}</span>
    </>
  );

  return (
    <div
      className={`${styles.message} ${styles[type]} ${className}`}
      style={{
        maxWidth,
        zIndex,
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
      role={role}
      aria-description={description}
    >
      {onClick ? (
        // Clickable messages expose their content as a real button so the
        // action is reachable with the keyboard (Tab, Enter / Space).
        <button
          type="button"
          className={`${styles.content} ${styles.contentButton}`}
          onClick={onClick}
        >
          {body}
        </button>
      ) : (
        <div className={styles.content}>{body}</div>
      )}
      {showClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label={closeAriaLabel ?? t("message.close")}
        >
          <IoClose aria-hidden="true" />
        </button>
      )}
      {showProgress && duration > 0 && (
        <div
          className={`${styles.progressBar} ${isPaused ? styles.paused : ""}`}
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Message;
