import React from "react";
import styles from "./avatarGroup.module.scss";
import type { AvatarGroupProps } from "./types";
import useI18n from "../../hooks/useI18n";

/**
 * AvatarGroup component
 * @param count - The count of additional avatars
 * @param className - Additional classes to be added to the avatar group
 * @param children - The avatars to be displayed in the group
 * @param ariaLabel - Accessible label of the group (localized default)
 * @param ref - Ref to the root <div> element
 * @returns An avatar group component
 */
const AvatarGroup = ({
  count,
  className = "",
  children,
  ariaLabel,
  ref,
}: AvatarGroupProps) => {
  const { t } = useI18n();
  return (
    <div
      ref={ref}
      role="group"
      className={`${styles.avatarGroup} ${className}`}
      aria-label={
        ariaLabel ??
        (count ? t("avatar.groupWithMore", { count }) : t("avatar.group"))
      }
    >
      {React.Children.map(children, (child) => (
        <div className={styles.avatarGroupItem}>{child}</div>
      ))}
      {count ? (
        <div className={styles.count} aria-hidden="true">
          +{count}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(AvatarGroup);
