import React from "react";
import { cn } from "../../utils/cn";
import styles from "./avatarGroup.module.scss";
import type { AvatarGroupProps } from "./types";
import useI18n from "../../hooks/useI18n";
import { hooks } from "../../internal/stylingHooks";

/**
 * AvatarGroup: overlapping avatars with an optional "+N" indicator.
 *
 * `max` limits the visible avatars (the hidden ones are added to the
 * indicator); `count` adds a number of avatars that are not rendered at all.
 */
const AvatarGroup = ({
  count,
  max,
  className = "",
  children,
  "aria-label": ariaLabel,
  ref,
  ...rest
}: AvatarGroupProps) => {
  const { t } = useI18n();
  // null / false / undefined children (conditional avatars) are not counted
  const avatars = React.Children.toArray(children);
  const visible = max === undefined ? avatars : avatars.slice(0, max);
  const extra = (count ?? 0) + avatars.length - visible.length;

  return (
    <div
      ref={ref}
      role="group"
      className={cn(styles.avatarGroup, className)}
      aria-label={
        ariaLabel ??
        (extra > 0
          ? t("avatar.groupWithMore", { count: extra })
          : t("avatar.group"))
      }
      {...rest}
      {...hooks("avatar-group", "root")}
    >
      {visible.map((child, index) => (
        <div
          key={React.isValidElement(child) ? (child.key ?? index) : index}
          className={styles.avatarGroupItem}
          {...hooks("avatar-group", "item")}
        >
          {child}
        </div>
      ))}
      {extra > 0 ? (
        <div
          className={styles.count}
          aria-hidden="true"
          {...hooks("avatar-group", "count")}
        >
          +{extra}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(AvatarGroup);
