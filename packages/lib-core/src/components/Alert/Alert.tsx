import React, { useCallback, useId, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import {
  IconChevronDown,
  IconChevronUp,
  IconCircleCheckFilled,
  IconCircleInfoFilled,
  IconCircleXFilled,
  IconTriangleAlertFilled,
  IconX,
} from "../../internal/icons";
import type { AlertProps } from "./types";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { useMergedRefs } from "../../internal/mergeRefs";
import {
  isFocusInsideOrLost,
  moveFocusBeforeRemoval,
} from "../../internal/focusAfterRemoval";
import { hooks } from "../../internal/stylingHooks";
import styles from "./alert.module.scss";

const iconMap = {
  info: <IconCircleInfoFilled />,
  success: <IconCircleCheckFilled />,
  warning: <IconTriangleAlertFilled />,
  danger: <IconCircleXFilled />,
};

const ANIMATION_NAMES = ["slideIn", "fadeIn", "bounce", "zoom"] as const;

/**
 * Alert 警告提示组件
 * @description 用于页面中展示重要的提示信息，适用于系统级通知、操作反馈等场景
 * @param {string} color - 警告提示的语义颜色（决定图标与 role），可选值：info、success、warning、danger
 * @param {string} variant - 警告提示的视觉样式，可选值：subtle、outline、solid
 * @param {AlertSize} size - 警告提示的尺寸，可选值：small、medium、large
 * @param {boolean} showIcon - 是否显示图标
 * @param {ReactNode} icon - 自定义图标
 * @param {boolean} closable - 是否可关闭
 * @param {ReactNode} closeIcon - 自定义关闭图标
 * @param {function} onClose - 关闭时的回调函数
 * @param {boolean} animation - 是否显示动画效果
 * @param {AnimationName} animationName - 动画类型，可选值：slideIn、fadeIn、bounce、zoom
 * @param {boolean} elevation - 是否显示阴影
 * @param {boolean} rounded - 是否圆角
 * @param {number|string} borderRadius - 自定义圆角大小
 * @param {boolean} collapsible - 是否可以展开收起
 * @param {boolean} expanded - 是否展开（受控）
 * @param {boolean} defaultExpanded - 默认是否展开（非受控）
 * @param {function} onExpand - 展开收起的回调函数
 * @param {string} closeLabel - 关闭按钮的无障碍名称（默认本地化）
 * @param {string} expandLabel - 展开按钮的无障碍名称（默认本地化）
 * @param {string} collapseLabel - 收起按钮的无障碍名称（默认本地化）
 * @param {string} iconLabel - 图标的无障碍名称（默认本地化）
 * @param {FocusTarget} returnFocus - 关闭后接收焦点的元素（元素 / ref / 函数），缺省时移到下一个可聚焦元素
 * @param {Ref} ref - 根元素的 ref
 */
const Alert = ({
  title,
  children,
  color = "info",
  variant = "subtle",
  size = "medium",
  showIcon = true,
  icon,
  closable = false,
  closeIcon,
  onClose,
  animation = true,
  animationName = "slideIn",
  className,
  style,
  action,
  banner = false,
  elevation = false,
  rounded = true,
  borderRadius,
  collapsible = false,
  expanded: expandedProp,
  defaultExpanded,
  onExpand,
  closeLabel,
  expandLabel,
  collapseLabel,
  iconLabel,
  returnFocus,
  role,
  ref,
  ...rest
}: AlertProps) => {
  const { t } = useI18n();
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(rootRef, ref);
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Alert", {
      prop: "expanded",
      value: expandedProp,
      defaultProp: "defaultExpanded",
      defaultValue: defaultExpanded,
      handlerProp: "onExpand",
      handler: onExpand,
      locked: !collapsible,
    });
  }
  const [expanded, setExpanded] = useControllableState({
    value: expandedProp,
    defaultValue: defaultExpanded ?? true,
    onChange: onExpand,
    name: "Alert",
    prop: "expanded",
  });
  const contentId = useId();
  // The toggle lives in the title, so without a title nothing can be collapsed
  const isCollapsible = collapsible && Boolean(title);

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClose?.(e);
      // Move focus out before the alert disappears so it never falls to
      // <body> (unless onClose already moved it elsewhere on purpose)
      const root = rootRef.current;
      if (root && isFocusInsideOrLost(root)) {
        moveFocusBeforeRemoval(root, returnFocus);
      }
      setVisible(false);
    },
    [onClose, returnFocus],
  );

  // onExpand is called by the setter itself, never inside a state updater,
  // so StrictMode's double-invoked updaters cannot call it twice.
  const handleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, [setExpanded]);

  if (!visible) return null;

  const classes = cn(
    styles.alert,
    styles[color],
    styles[variant],
    styles[size],
    {
      [styles.withIcon]: showIcon,
      [styles.withTitle]: title,
      [styles.banner]: banner,
      [styles.withAnimation]: animation,
      [styles[`animation-${animationName}`]]:
        animation && ANIMATION_NAMES.includes(animationName),
      [styles.withElevation]: elevation,
      [styles.rounded]: rounded,
      [styles.expanded]: expanded,
      [styles.collapsible]: isCollapsible,
    },
    className,
  );
  const hasContent =
    children !== undefined &&
    children !== null &&
    children !== false &&
    children !== "";

  const customStyle = {
    ...style,
    ...(borderRadius != null && { borderRadius }),
  };

  return (
    <div
      {...rest}
      ref={mergedRef}
      className={classes}
      style={customStyle}
      // Danger and warning interrupt (alert); info and success are polite
      role={
        role ?? (color === "danger" || color === "warning" ? "alert" : "status")
      }
      {...hooks("alert", "root", {
        state: isCollapsible ? (expanded ? "open" : "closed") : undefined,
        size,
        variant,
        color,
      })}
    >
      {showIcon && (
        <span
          className={styles.icon}
          role="img"
          aria-label={iconLabel ?? t(`alert.icon.${color}`)}
          {...hooks("alert", "icon")}
        >
          {icon || iconMap[color]}
        </span>
      )}

      <div className={styles.content}>
        {title && (
          <div className={styles.title} {...hooks("alert", "title")}>
            {title}
            {isCollapsible && (
              <button
                type="button"
                className={styles.expandButton}
                onClick={handleExpand}
                aria-label={
                  expanded
                    ? (collapseLabel ?? t("alert.collapse"))
                    : (expandLabel ?? t("alert.expand"))
                }
                aria-expanded={expanded}
                aria-controls={expanded && hasContent ? contentId : undefined}
                {...hooks("alert", "trigger")}
              >
                {expanded ? <IconChevronUp /> : <IconChevronDown />}
              </button>
            )}
          </div>
        )}
        {hasContent && (!isCollapsible || expanded) && (
          <div
            id={contentId}
            className={styles.message}
            {...hooks("alert", "description")}
          >
            {children}
          </div>
        )}
      </div>

      {action && (
        <div className={styles.action} {...hooks("alert", "action")}>
          {action}
        </div>
      )}

      {closable && (
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label={closeLabel ?? t("alert.close")}
          type="button"
          {...hooks("alert", "close-button")}
        >
          {closeIcon || <IconX />}
        </button>
      )}
    </div>
  );
};

export default Alert;
