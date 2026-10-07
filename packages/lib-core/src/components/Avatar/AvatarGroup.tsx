import React from "react";
import styles from "./avatarGroup.module.scss";
import { AvatarGroupProps } from "./types";

/**
 * AvatarGroup component
 * @param count - The count of additional avatars
 * @param className - Additional classes to be added to the avatar group
 * @param children - The avatars to be displayed in the group
 * @returns An avatar group component
 */
const AvatarGroup: React.FC<React.PropsWithChildren<AvatarGroupProps>> = ({
  count,
  className = "",
  children,
}) => {
  return (
    <div
      className={`${styles.avatarGroup} ${className}`}
      aria-label={count ? `Avatar group with ${count} more` : "Avatar group"}
    >
      {React.Children.map(children, (child, index) => (
        <div className={styles.avatarGroupItem} key={index}>
          {child}
        </div>
      ))}
      {count ? <div className={styles.count}>+{count}</div> : null}
    </div>
  );
};

export default React.memo(AvatarGroup);
