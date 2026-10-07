import React, { useId } from "react";
import { RiInboxLine } from "react-icons/ri";
import styles from "./empty.module.scss";
import type { EmptyProps, EmptySize } from "./types";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";

/** Default icon; decorative, the description names the empty state */
const DefaultIcon = () => (
  <RiInboxLine size={40} className={styles.defaultIcon} aria-hidden="true" />
);

/** Built-in illustration (decorative) */
const DefaultSvg = () => (
  <svg
    className={styles.defaultIcon}
    aria-hidden="true"
    focusable="false"
    width="64"
    height="41"
    viewBox="0 0 64 41"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(0 1)" fill="none" fillRule="evenodd">
      <ellipse
        style={{ fill: "var(--surface-muted-color)" }}
        cx="32"
        cy="33"
        rx="32"
        ry="7"
      />
      <g fillRule="nonzero" style={{ stroke: "var(--border-strong-color)" }}>
        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
        <path
          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
          style={{ fill: "var(--surface-color)" }}
        />
      </g>
    </g>
  </svg>
);

const isRenderable = (node: React.ReactNode) =>
  node != null && node !== false && node !== "";

/** Stable `ui-empty-state-size-*` hook names (shared with @novel-isr/ui) */
const HOOK_SIZE: Record<EmptySize, string> = {
  small: "compact",
  medium: "default",
  large: "lg",
};

/**
 * 空状态组件
 * @param icon 自定义图标（null / false 不渲染图标）
 * @param title 标题（作为无障碍名称）
 * @param action 主操作
 * @param secondaryAction 次要操作
 * @param size 尺寸档位（无边框布局）
 * @param description 描述文字
 * @param className 自定义类名
 * @param style 自定义样式
 * @param children 底部内容
 * @param useSvg 是否用 svg 图标
 * @param width 宽度
 * @param height 高度
 * @param backgroundColor 背景颜色
 * @param showShadow 是否显示阴影
 * @param color 字体颜色
 * @param ref 根元素的 ref
 * @returns {React.ReactNode} 空状态组件
 */
const Empty = ({
  icon,
  title,
  description: descriptionProp,
  action,
  secondaryAction,
  size,
  className,
  style,
  children,
  useSvg = false,
  width,
  height,
  backgroundColor,
  showShadow,
  color,
  ref,
  ...rest
}: EmptyProps) => {
  const { t } = useI18n();
  // Only an omitted description falls back to the default (null hides it)
  const description =
    descriptionProp === undefined ? t("empty.description") : descriptionProp;
  const descriptionId = useId();
  const titleId = useId();
  const hasTitle = isRenderable(title);
  const hasDescription = isRenderable(description);
  const hideIcon = icon === null || icon === false;

  return (
    <div
      ref={ref}
      className={cn(
        styles.empty,
        showShadow && styles.showShadow,
        size && styles.sized,
        size && styles[`size-${size}`],
        "ui-empty-state",
        size && `ui-empty-state-size-${HOOK_SIZE[size]}`,
        className,
      )}
      style={{
        width,
        height,
        backgroundColor,
        color,
        ...style,
      }}
      role="status"
      // Named by the visible title (or the description), which may be any
      // ReactNode, unless the consumer names the region explicitly
      aria-labelledby={
        rest["aria-label"] !== undefined
          ? undefined
          : hasTitle
            ? titleId
            : hasDescription
              ? descriptionId
              : undefined
      }
      aria-describedby={hasTitle && hasDescription ? descriptionId : undefined}
      {...rest}
    >
      {!hideIcon && (
        <div className={cn(styles.iconWrapper, "ui-empty-state-icon")}>
          {icon || (useSvg ? <DefaultSvg /> : <DefaultIcon />)}
        </div>
      )}
      {hasTitle && (
        <div id={titleId} className={cn(styles.title, "ui-empty-state-title")}>
          {title}
        </div>
      )}
      {hasDescription && (
        <div
          id={descriptionId}
          className={cn(styles.description, "ui-empty-state-description")}
        >
          {description}
        </div>
      )}
      {(isRenderable(action) || isRenderable(secondaryAction)) && (
        <div className={cn(styles.actions, "ui-empty-state-actions")}>
          {action}
          {secondaryAction}
        </div>
      )}
      {isRenderable(children) && (
        <div className={styles.footer}>{children}</div>
      )}
    </div>
  );
};

export default React.memo(Empty);
