import React, { useCallback, useId, useState } from "react";
import classNames from "classnames";
import {
  IoInformationCircle,
  IoCheckmarkCircle,
  IoWarning,
  IoCloseCircle,
  IoClose,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import type { AlertProps } from "./types";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import styles from "./alert.module.scss";

const iconMap = {
  info: <IoInformationCircle />,
  success: <IoCheckmarkCircle />,
  warning: <IoWarning />,
  error: <IoCloseCircle />,
};

const ANIMATION_NAMES = ["slideIn", "fadeIn", "bounce", "zoom"] as const;

/**
 * Alert 警告提示组件
 * @description 用于页面中展示重要的提示信息，适用于系统级通知、操作反馈等场景
 * @param {AlertVariant} variant - 警告提示的类型，可选值：info、success、warning、error
 * @param {AlertSize} size - 警告提示的尺寸，可选值：small、medium、large
 * @param {AlertType} type - 警告提示的样式类型，可选值：default、outlined、filled
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
 * @param {Ref} ref - 根元素的 ref
 */
const Alert = ({
  title,
  children,
  variant: variantProp = "info",
  size = "medium",
  type = "default",
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
  outlined = false,
  filled = false,
  banner = false,
  elevation = false,
  rounded = true,
  borderRadius,
  collapsible = false,
  expanded: expandedProp,
  defaultExpanded = true,
  onExpand,
  closeLabel,
  expandLabel,
  collapseLabel,
  iconLabel,
  role,
  ref,
  ...rest
}: AlertProps) => {
  const { t } = useI18n();
  const variant = variantProp === "danger" ? "error" : variantProp;
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useControllableState({
    value: expandedProp,
    defaultValue: defaultExpanded,
    onChange: onExpand,
  });
  const contentId = useId();
  // The toggle lives in the title, so without a title nothing can be collapsed
  const isCollapsible = collapsible && Boolean(title);

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setVisible(false);
      onClose?.(e);
    },
    [onClose],
  );

  // onExpand is called by the setter itself, never inside a state updater,
  // so StrictMode's double-invoked updaters cannot call it twice.
  const handleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, [setExpanded]);

  if (!visible) return null;

  const classes = classNames(
    styles.alert,
    styles[variant],
    styles[size],
    styles[type],
    {
      [styles.withIcon]: showIcon,
      [styles.withTitle]: title,
      [styles.outlined]: outlined,
      [styles.filled]: filled,
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
      ref={ref}
      className={classes}
      style={customStyle}
      // Errors and warnings interrupt (alert); info and success are polite
      role={
        role ??
        (variant === "error" || variant === "warning" ? "alert" : "status")
      }
    >
      {showIcon && (
        <span
          className={styles.icon}
          role="img"
          aria-label={iconLabel ?? t(`alert.icon.${variant}`)}
        >
          {icon || iconMap[variant]}
        </span>
      )}

      <div className={styles.content}>
        {title && (
          <div className={styles.title}>
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
              >
                {expanded ? <IoChevronUp /> : <IoChevronDown />}
              </button>
            )}
          </div>
        )}
        {hasContent && (!isCollapsible || expanded) && (
          <div id={contentId} className={styles.message}>
            {children}
          </div>
        )}
      </div>

      {action && <div className={styles.action}>{action}</div>}

      {closable && (
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label={closeLabel ?? t("alert.close")}
          type="button"
        >
          {closeIcon || <IoClose />}
        </button>
      )}
    </div>
  );
};

export default Alert;
