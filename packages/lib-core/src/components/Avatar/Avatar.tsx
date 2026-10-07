import React, { useState } from "react";
import type { AvatarProps } from "./types";
import styles from "./avatar.module.scss";
import useI18n from "../../hooks/useI18n";

/**
 * Avatar component
 * @param src - The source URL of the avatar image
 * @param name - The name to be displayed inside the avatar
 * @param shape - The shape of the avatar (circle, square, rounded)
 * @param size - The size of the avatar (small, medium, large)
 * @param className - Additional classes to be added to the avatar
 * @param stacked - Whether the avatar should have smaller margins for tighter stacking
 * @param ref - Ref to the root <span> element
 * @returns An avatar component
 */
const Avatar = ({
  src,
  name = "",
  shape = "circle",
  size = "medium",
  className = "",
  stacked = false,
  ref,
}: AvatarProps) => {
  const { t } = useI18n();
  // The src that failed to load; derived instead of reset in an effect so a
  // new src is tried again automatically.
  const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);
  const showImage = Boolean(src) && failedSrc !== src;
  const label = name || t("avatar.default");
  const avatarClasses = `${styles.avatar} ${styles[shape]} ${styles[size]} ${stacked ? styles.stacked : ""} ${className}`;
  const initial = name ? name.charAt(0).toUpperCase() : "";

  if (showImage) {
    return (
      <span ref={ref} className={avatarClasses}>
        <img
          alt={label}
          className={styles.avatarImg}
          src={src}
          draggable={false}
          onError={() => setFailedSrc(src)}
        />
      </span>
    );
  }

  // Initials are exposed as a single image named after the person, so screen
  // readers announce "Alice" instead of the letter "A".
  return (
    <span ref={ref} className={avatarClasses} role="img" aria-label={label}>
      <span className={styles.avatarText} aria-hidden="true">
        {initial}
      </span>
    </span>
  );
};

export default React.memo(Avatar);
