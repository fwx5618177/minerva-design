import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { IoClose } from "react-icons/io5";
import type { TagProps } from "./types";
import styles from "./tag.module.scss";
import useI18n from "../../hooks/useI18n";

const RIPPLE_DURATION = 600;

/** Short size names used by the stable `ui-tag-size-*` styling hooks */
const SIZE_HOOK = { small: "sm", medium: "md", large: "lg" } as const;

/** Color names used by the stable `ui-tag-color-*` styling hooks */
const COLOR_HOOK = {
  default: "gray",
  primary: "brand",
  success: "success",
  warning: "warning",
  error: "danger",
  info: "info",
} as const;

interface Ripple {
  id: number;
  style: React.CSSProperties;
}

/**
 * Tag: a small label for marking and categorizing.
 *
 * The root is a plain (non-interactive) element. When `clickable`, the content
 * is rendered as a native <button> (which also draws the ripple); when
 * `closable`, the close control is a sibling <button>, so interactive
 * elements are never nested. Native attributes are forwarded to the root.
 */
const Tag = ({
  children,
  variant = "default",
  size = "medium",
  shape = "rounded",
  closable = false,
  onClose,
  clickable = false,
  onClick,
  pressed,
  icon,
  bordered = false,
  elevation = false,
  bgColor,
  textColor,
  borderColor,
  className,
  style,
  disabled = false,
  closeIcon,
  closeLabel,
  ripple = true,
  ref,
  ...rest
}: TagProps) => {
  const { t } = useI18n();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextRippleId = useRef(0);
  const rippleTimers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const timers = rippleTimers.current;
    return () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    // The close button is not part of the tag's main action / ripple.
    e.stopPropagation();
    if (!disabled) onClose?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    addRipple(e);
    onClick?.(e);
  };

  // The ripple is drawn over the whole tag, from where its main action (the
  // native button) was pressed.
  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple) return;
    const tag = e.currentTarget.parentElement as HTMLElement;
    const rect = tag.getBoundingClientRect();
    // keyboard-activated clicks (detail === 0) ripple from the center
    const fromKeyboard = e.detail === 0;
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    const id = nextRippleId.current++;
    const next: Ripple = {
      id,
      style: {
        width: diameter,
        height: diameter,
        left: fromKeyboard
          ? rect.width / 2 - radius
          : e.clientX - rect.left - radius,
        top: fromKeyboard
          ? rect.height / 2 - radius
          : e.clientY - rect.top - radius,
      },
    };
    setRipples((prev) => [...prev, next]);

    const timer = setTimeout(() => {
      rippleTimers.current.delete(timer);
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, RIPPLE_DURATION);
    rippleTimers.current.add(timer);
  };

  const tagStyles: React.CSSProperties = {
    ...style,
    backgroundColor: bgColor,
    color: textColor,
    borderColor: borderColor,
  };

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.content}>{children}</span>
    </>
  );

  return (
    <div
      {...rest}
      ref={ref}
      className={classNames(
        styles.tag,
        styles[variant],
        styles[size],
        styles[shape],
        {
          [styles.clickable]: clickable && !disabled,
          [styles.bordered]: bordered,
          [styles.elevation]: elevation,
          [styles.disabled]: disabled,
        },
        // Stable styling hooks (not used for styling by the library)
        "ui-tag",
        `ui-tag-size-${SIZE_HOOK[size]}`,
        `ui-tag-color-${COLOR_HOOK[variant]}`,
        className,
      )}
      style={tagStyles}
    >
      {clickable ? (
        <button
          type="button"
          className={styles.action}
          onClick={handleClick}
          disabled={disabled}
          aria-pressed={pressed}
        >
          {content}
        </button>
      ) : (
        content
      )}
      {closable && (
        <button
          type="button"
          className={classNames(styles.closeIcon, "ui-tag-close")}
          onClick={handleClose}
          disabled={disabled}
          aria-label={closeLabel ?? t("tag.close")}
          title={closeLabel ?? t("tag.close")}
        >
          {closeIcon || <IoClose aria-hidden focusable={false} />}
        </button>
      )}
      {ripples.map((r) => (
        <span key={r.id} className={styles.ripple} style={r.style} />
      ))}
    </div>
  );
};

export default Tag;
