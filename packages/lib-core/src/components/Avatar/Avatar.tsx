import React, { useState } from "react";
import { cn } from "../../utils/cn";
import type { AvatarProps } from "./types";
import styles from "./avatar.module.scss";
import useI18n from "../../hooks/useI18n";
import { hooks } from "../../internal/stylingHooks";

const CJK = /[\u3400-\u9fff\uf900-\ufaff]/;

/**
 * Initials of a name: the first CJK character, otherwise the uppercased first
 * letters of the first two words ("Ada Lovelace" -> "AL", "张三" -> "张").
 */
function getAvatarInitials(name?: string): string {
  const trimmed = name?.trim() ?? "";
  if (!trimmed) return "";
  if (CJK.test(trimmed[0])) return trimmed[0];
  return trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Avatar: a picture of a person, falling back to their initials (or custom
 * fallback content) when there is no image or it fails to load.
 */
const Avatar = ({
  src,
  name = "",
  alt,
  "aria-label": ariaLabel,
  fallback,
  children,
  shape = "circle",
  size = "medium",
  className = "",
  stacked = false,
  style,
  ref,
  ...rest
}: AvatarProps) => {
  const { t } = useI18n();
  // The src that failed to load; derived instead of reset in an effect so a
  // new src is tried again automatically.
  const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);
  const showImage = Boolean(src) && failedSrc !== src;
  const label = ariaLabel ?? (name || t("avatar.default"));
  const numericSize = typeof size === "number";

  const rootProps = {
    ...rest,
    ref,
    className: cn(
      styles.avatar,
      styles[shape],
      !numericSize && styles[size],
      stacked && styles.stacked,
      className,
    ),
    style: numericSize
      ? ({
          "--avatar-size": `${size}px`,
          width: size,
          height: size,
          ...style,
        } as React.CSSProperties)
      : style,
    ...hooks("avatar", "root", {
      size: numericSize ? undefined : size,
      shape,
    }),
  };

  if (showImage) {
    return (
      <span {...rootProps}>
        <img
          alt={alt ?? label}
          className={styles.avatarImg}
          src={src}
          draggable={false}
          onError={() => setFailedSrc(src)}
          {...hooks("avatar", "image")}
        />
      </span>
    );
  }

  const content = fallback ?? (getAvatarInitials(name) || children);

  // The fallback is exposed as a single image named after the person, so
  // screen readers announce "Alice" instead of the letter "A".
  return (
    <span role="img" aria-label={label} {...rootProps}>
      <span
        className={styles.avatarText}
        aria-hidden="true"
        {...hooks("avatar", "fallback")}
      >
        {content}
      </span>
    </span>
  );
};

export default React.memo(Avatar);
