import React from "react";
import { AvatarProps } from "./types";
import styles from "./avatar.module.scss";

/**
 * Avatar component
 * @param src - The source URL of the avatar image
 * @param name - The name to be displayed inside the avatar
 * @param shape - The shape of the avatar (circle, square, rounded)
 * @param size - The size of the avatar (small, medium, large)
 * @param className - Additional classes to be added to the avatar
 * @param stacked - Whether the avatar should have smaller margins for tighter stacking
 * @returns An avatar component
 */
const Avatar: React.FC<AvatarProps> = ({
  src,
  name = "",
  shape = "circle",
  size = "medium",
  className = "",
  stacked = false,
  ...props
}) => {
  const showText = !src;
  const avatarClasses = `${styles.avatar} ${styles[shape]} ${styles[size]} ${stacked ? styles.stacked : ""} ${className}`;
  const initial = name ? name.charAt(0).toUpperCase() : "";

  return (
    <span className={avatarClasses} {...props} aria-label={name || "avatar"}>
      {!showText && (
        <img
          alt={name || "avatar"}
          className={styles.avatarImg}
          src={src}
          draggable={false}
        />
      )}
      {showText && <span className={styles.avatarText}>{initial}</span>}
    </span>
  );
};

export default React.memo(Avatar);
