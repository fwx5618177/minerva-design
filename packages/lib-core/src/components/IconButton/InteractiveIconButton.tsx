import React from "react";
import {
  FaHeart,
  FaStar,
  FaBookmark,
  FaThumbsUp,
  FaUserPlus,
  FaShare,
  FaBell,
  FaThumbtack,
  FaArchive,
  FaLock,
  FaDownload,
  FaEye,
  FaClock,
  FaThumbsDown,
  FaFlag,
  FaTimes as FaClose,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import type {
  InteractiveIconProps,
  InteractiveIconType,
} from "./interactive-types";
import { interactiveIconsMap } from "./interactive-config";
import { useControllableState } from "../../internal/useControllableState";
import IconButton from "./IconButton";

const iconMap: Record<InteractiveIconType, IconType> = {
  favorite: FaHeart,
  star: FaStar,
  bookmark: FaBookmark,
  like: FaThumbsUp,
  follow: FaUserPlus,
  share: FaShare,
  notification: FaBell,
  pin: FaThumbtack,
  archive: FaArchive,
  lock: FaLock,
  download: FaDownload,
  visibility: FaEye,
  clock: FaClock,
  rate: FaStar,
  thumbDown: FaThumbsDown,
  flag: FaFlag,
  close: FaClose,
};

/**
 * A preset toggle icon button (favorite, like, bookmark, ...). Exposes its
 * state with aria-pressed; works controlled (`pressed`) or uncontrolled
 * (`defaultPressed`).
 */
const InteractiveIconButton = ({
  ref,
  type,
  pressed,
  defaultPressed,
  initialState = false,
  onChange,
  className,
  size = "medium",
  shape = "circle",
  disabled = false,
  ariaLabel,
  "aria-label": ariaLabelAttr,
}: InteractiveIconProps) => {
  const [isActive, setIsActive] = useControllableState({
    value: pressed,
    defaultValue: defaultPressed ?? initialState,
    onChange,
  });
  const config = interactiveIconsMap[type];
  const Icon = iconMap[type];

  return (
    <IconButton
      ref={ref}
      icon={<Icon aria-hidden focusable={false} />}
      active={isActive}
      aria-pressed={isActive}
      ariaLabel={ariaLabelAttr ?? ariaLabel ?? config.label}
      onClick={() => setIsActive((prev) => !prev)}
      showTooltip
      className={className}
      size={size}
      shape={shape}
      disabled={disabled}
      color={isActive ? config.activeColor : config.inactiveColor}
      activeColor={config.activeColor}
      bgColor={isActive ? config.activeBgColor : config.inactiveBgColor}
      hoverColor={
        isActive ? config.activeHoverColor : config.inactiveHoverColor
      }
      fillColor={isActive ? config.activeFillColor : config.inactiveFillColor}
      tooltip={{
        content: isActive ? config.activeTooltip : config.inactiveTooltip,
      }}
    />
  );
};

export default React.memo(InteractiveIconButton);
