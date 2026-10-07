import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import type { MessageProps } from "./types";
import styles from "./message.module.scss";

const Message: React.FC<MessageProps> = ({
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
  closeAriaLabel = "Close",
  maxWidth,
  zIndex,
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  // Time already elapsed before the current (un-paused) run, so that
  // resuming after a hover continues instead of restarting the countdown.
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (duration > 0 && !isPaused) {
      const startTime = Date.now() - elapsedRef.current;
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        elapsedRef.current = elapsed;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);

        if (remaining === 0) {
          clearInterval(timer);
          onClose?.(id);
        }
      }, 10);

      return () => clearInterval(timer);
    }
  }, [duration, isPaused, id, onClose]);

  const handleClose = () => {
    onClose?.(id);
  };

  return (
    <div
      className={`${styles.message} ${styles[type]} ${className}`}
      style={{
        maxWidth,
        zIndex,
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      role="alert"
      aria-description={description}
    >
      <div className={styles.content}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{content}</span>
      </div>
      {showClose && (
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label={closeAriaLabel}
        >
          <IoClose />
        </button>
      )}
      {showProgress && duration > 0 && (
        <div
          className={`${styles.progressBar} ${isPaused ? styles.paused : ""}`}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
};

export default Message;
